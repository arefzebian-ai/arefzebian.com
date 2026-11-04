"use client";

// Helpers that keep server and client renders identical.

import { forwardRef, useEffect, useId, useMemo, useState, useSyncExternalStore, type ComponentType } from "react";
import { canHoldRef } from "./component";

/**
 * Deterministic stand-in for `Math.random()` inside a hook initializer
 * (`useRef("x-" + Math.random().toString(36))`). Code components use that to
 * mint class names; a random value differs between server and browser and
 * breaks hydration. The converter rewrites such calls to
 * `useStableRandom(props)`: the value is derived from the component's props,
 * which are the same on both sides (instances with equal props produce equal
 * CSS, so sharing a value is harmless). Without a seed it falls back to useId.
 */
export function useStableRandom(seed?: unknown): number {
  const id = useId();
  return hash(seed === undefined ? id : stableSerialize(seed, 0)) / 4294967296;
}

/** A CSS-only UUID scope uses React's hydration identity. The argument is still
 * evaluated at the call site, retaining the original generator's calls/effects.
 * Encoding every code point keeps the token CSS-safe without merging distinct IDs. */
export function useStableScopeId(_sourceId: unknown): string {
  return "scope-" + Array.from(useId(), character => character.codePointAt(0)!.toString(16)).join("-");
}

function hash(text: string): number {
  let value = 2166136261;
  for (let i = 0; i < text.length; i++) value = Math.imul(value ^ text.charCodeAt(i), 16777619);
  return value >>> 0;
}

/** JSON-like serialization that ignores functions, React elements and deep structures. */
function stableSerialize(value: unknown, depth: number): string {
  if (value === null || typeof value !== "object") return typeof value === "function" || typeof value === "symbol" ? "" : JSON.stringify(value) ?? "";
  if ("$$typeof" in (value as object) || depth > 3) return "";
  if (Array.isArray(value)) return `[${value.map((v) => stableSerialize(v, depth + 1)).join(",")}]`;
  return `{${Object.keys(value as object)
    .sort()
    .map((key) => `${key}:${stableSerialize((value as Record<string, unknown>)[key], depth + 1)}`)
    .join(",")}}`;
}

/**
 * Client-only code override (a `withX` HOC from a module that cannot be loaded on
 * the server). The layer renders un-overridden on the server and during
 * hydration; the override module is then loaded and applied in the browser.
 */
export function lazyOverride(load: () => Promise<(Component: any) => any>) {
  let loaded: ((Component: any) => any) | undefined;
  let loading: Promise<void> | undefined;
  return function override(Base: any) {
    return forwardRef(function LazyOverride(props: any, ref) {
      const [hoc, setHoc] = useState(() => loaded);
      useEffect(() => {
        if (hoc) return;
        let active = true;
        loading ??= load().then((value) => {
          loaded = value;
        });
        void loading.then(() => active && setHoc(() => loaded));
        return () => {
          active = false;
        };
      }, [hoc]);
      const Component = useMemo(() => (hoc ? hoc(Base) : Base), [hoc]);
      // React 18 gave no ref to a plain function component (the usual override HOC).
      return <Component {...props} {...(canHoldRef(Component) ? { ref } : {})} />;
    });
  };
}

const subscribeNever = () => () => {};

/**
 * Client-only code component (from a module that cannot be loaded on the server): renders
 * nothing on the server and while hydrating, then loads its module in the browser and
 * renders it, as the original runtime's bundle renders code components once they load. Unlike
 * `next/dynamic`, it puts no Suspense boundary of its own around the component: a component
 * that suspends after mounting (a react-three-fiber `<Canvas>` while its models and textures
 * load) suspends into the code boundary around it, which keeps the rendered DOM as the original runtime's
 * does, instead of a boundary that would hide it (`display: none`) and detach its refs
 * while effects that read them keep running.
 */
export function clientOnly<P = any>(load: () => Promise<ComponentType<P> | { default: ComponentType<P> }>): ComponentType<P> {
  let loaded: ComponentType<P> | undefined;
  let loading: Promise<void> | undefined;
  function ClientOnly(props: P & {}) {
    // False on the server and while hydrating (the server snapshot), true for every later render.
    const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
    const [Component, setComponent] = useState(() => loaded);
    useEffect(() => {
      if (Component) return;
      let active = true;
      loading ??= load().then((value) => {
        loaded = "default" in value ? value.default : value;
      });
      void loading.then(() => active && setComponent(() => loaded));
      return () => {
        active = false;
      };
    }, [Component]);
    // React 19 passes `ref` as a prop: it reaches the component as next/dynamic's did.
    return hydrated && Component ? <Component {...props} /> : null;
  }
  return ClientOnly as ComponentType<P>;
}
