"use client";

// Shared building blocks for the motion effects: the FX value set every effect
// writes to, `__fx_` prop parsing, reduced-motion checks, a shared
// IntersectionObserver with the original runtime's "appear" threshold semantics, and the
// scroll-range maths used by scroll-target triggers.

import { useCallback, useContext, useEffect, useInsertionEffect, useLayoutEffect, useRef, type Ref, type RefObject } from "react";
import { MotionConfigContext, frame, motionValue, scrollInfo, type MotionValue } from "motion/react";
import { RouterContext } from "../contexts";

// ---------------------------------------------------------------------------
// FX values

/** Animatable channels an effect may drive. Order matters only for iteration. */
export const FX_KEYS = ["opacity", "x", "y", "scale", "rotate", "rotateX", "rotateY", "skewX", "skewY", "transformPerspective"] as const;
export type FXKey = (typeof FX_KEYS)[number];
export type FXValues = Record<FXKey, MotionValue<number>>;
export type FXTarget = Partial<Record<FXKey, number>> & { transition?: any };

/** Identity value of every channel (opacity/scale multiply, the rest add). */
export const FX_DEFAULTS: Record<FXKey, number> = {
  opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0, transformPerspective: 0,
};

export const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
export const isObject = (value: unknown): value is Record<string, any> => typeof value === "object" && value !== null;
export const isVariantLabel = (value: unknown) => typeof value === "string" || Array.isArray(value);

export function makeFXValues(initial?: Record<string, unknown>): FXValues {
  const values = {} as FXValues;
  for (const key of FX_KEYS) values[key] = motionValue(isNumber(initial?.[key]) ? initial![key] as number : FX_DEFAULTS[key]);
  return values;
}

/** Jump every channel to `target` (falling back to identity). */
export function setFXValues(values: FXValues, target: Record<string, unknown> | undefined) {
  for (const key of FX_KEYS) values[key].set(isNumber(target?.[key]) ? (target![key] as number) : FX_DEFAULTS[key]);
}

/** Effects that run add `will-change: transform`, exactly like the original runtime. */
export const WILL_CHANGE = Object.freeze({ willChange: "transform" });
export const NO_STYLE = Object.freeze({});

// ---------------------------------------------------------------------------
// `__fx_` props

export const FX_PREFIX = "__fx_";

/** Split `__fx_<key>` props whose key is in `keys` from the rest. */
export function splitPrefixedProps(props: Record<string, any>, keys: Set<string>): [Record<string, any>, Record<string, any>] {
  const options: Record<string, any> = {};
  const rest: Record<string, any> = {};
  for (const key in props) {
    const stripped = key.startsWith(FX_PREFIX) ? key.slice(FX_PREFIX.length) : undefined;
    if (stripped !== undefined && keys.has(stripped)) options[stripped] = props[key];
    else rest[key] = props[key];
  }
  return [options, rest];
}

// ---------------------------------------------------------------------------
// Reduced motion

/**
 * Returns a function telling whether motion should be reduced right now.
 * The original runtime honours `prefers-reduced-motion` only when the site opts in, which it
 * expresses as `<MotionConfig reducedMotion="user">`. The check is a function
 * (called inside effects) so that server and hydration renders never differ.
 */
export function useShouldReduceMotion(): () => boolean {
  const { reducedMotion } = useContext(MotionConfigContext);
  return useCallback(() => {
    if (reducedMotion === "always") return true;
    if (reducedMotion !== "user" || typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [reducedMotion]);
}

// ---------------------------------------------------------------------------
// Refs

// A code boundary can hydrate its layer after the outer effect has committed.
// Ref attachment does not render that outer owner again, so in-view observers
// subscribe to the physical lifetime instead of sampling current only once.
const elementRefListeners = new WeakMap<RefObject<Element | null>, Set<(element: Element | null) => void>>();

function publishElementRef(ref: RefObject<Element | null>) {
  const listeners = elementRefListeners.get(ref);
  if (listeners) for (const listener of [...listeners]) if (listeners.has(listener)) listener(ref.current);
}

function subscribeElementRef(ref: RefObject<Element | null>, listener: (element: Element | null) => void) {
  let listeners = elementRefListeners.get(ref);
  if (!listeners) elementRefListeners.set(ref, listeners = new Set());
  listeners.add(listener);
  listener(ref.current);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) elementRefListeners.delete(ref);
  };
}

/** Own one forwarded assignment, including React 19's callback cleanup. */
function bindElementRef<T extends Element>(target: Ref<T> | undefined, node: T) {
  if (typeof target === "function") {
    const cleanup = target(node);
    return { target, release: typeof cleanup === "function" ? cleanup : () => { target(null); } };
  }
  if (target) (target as { current: T | null }).current = node;
  return { target, release: () => { if (target) (target as { current: T | null }).current = null; } };
}

/** Keep Motion's physical ref stable while forwarding each committed owner's lifetime. */
export function useForwardedElementRef<T extends Element>(forwardedRef: Ref<T> | undefined) {
  const elementRef = useRef<T | null>(null);
  const forwarded = useRef(forwardedRef);
  const binding = useRef<ReturnType<typeof bindElementRef<T>> | null>(null);
  const attachment = useRef<object | null>(null);
  const release = useCallback(() => {
    const previous = binding.current;
    binding.current = null;
    previous?.release();
  }, []);
  // Publish only committed refs, before React attaches layout refs. An abandoned
  // render must not replace the owner used when the current node detaches.
  useInsertionEffect(() => { forwarded.current = forwardedRef; }, [forwardedRef]);
  const setRef = useCallback((node: T | null) => {
    const token = {};
    attachment.current = token;
    release();
    elementRef.current = node;
    if (!node) { publishElementRef(elementRef); return; }
    binding.current = bindElementRef(forwarded.current, node);
    publishElementRef(elementRef);
    return () => {
      if (attachment.current !== token) return;
      attachment.current = null;
      elementRef.current = null;
      release();
      publishElementRef(elementRef);
    };
  }, [release]);
  // Motion deliberately keeps its own DOM ref stable when an external ref
  // changes. Transfer that owner here, without remounting the visual element.
  useLayoutEffect(() => {
    const node = elementRef.current;
    if (node && binding.current?.target !== forwardedRef) {
      release();
      binding.current = bindElementRef(forwardedRef, node);
    }
  }, [forwardedRef, release]);
  return [elementRef, setRef] as const;
}

/** Changes whenever the route (page + path variables) changes. */
export function useRouteKey(): string | undefined {
  const router = useContext(RouterContext);
  return router ? `${router.currentRouteId}-${JSON.stringify(router.currentPathVariables ?? {})}` : undefined;
}

/** Calls `callback` with the latest value of `fn` without re-subscribing. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

// ---------------------------------------------------------------------------
// Shared IntersectionObserver ("appear" semantics)

type IntersectionCallback = (entry: IntersectionObserverEntry) => void;
type IntersectionSubscription = { callback: IntersectionCallback };
const observers = new Map<string, { observer: IntersectionObserver; callbacks: Map<Element, Set<IntersectionSubscription>> }>();

/** Observe `element` with an observer shared by every caller using the same options. */
export function observeIntersection(element: Element, callback: IntersectionCallback, options: { rootMargin?: string; threshold?: number[] } = {}) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const key = JSON.stringify([options.rootMargin ?? "", options.threshold ?? []]);
  let shared = observers.get(key);
  if (!shared) {
    const callbacks = new Map<Element, Set<IntersectionSubscription>>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const subscriptions = callbacks.get(entry.target);
        if (!subscriptions) continue;
        // A wrapper and its inner FX can share the same DOM node. Deliver to
        // every active owner; additions during delivery wait for a new entry.
        for (const subscription of [...subscriptions]) {
          if (subscriptions.has(subscription)) subscription.callback(entry);
        }
      }
    }, options);
    shared = { observer, callbacks };
    observers.set(key, shared);
  }
  const { observer, callbacks } = shared;
  let subscriptions = callbacks.get(element);
  if (!subscriptions) {
    subscriptions = new Set();
    callbacks.set(element, subscriptions);
  }
  // Separate registrations of the same function still have independent owners.
  const subscription = { callback };
  // Native observe() is a no-op for an already observed target. Restart only
  // that target so a late owner receives a fresh measurement, not a stale entry
  // or an indefinite wait for the next threshold crossing.
  if (subscriptions.size) observer.unobserve(element);
  subscriptions.add(subscription);
  observer.observe(element);
  return () => {
    if (!subscriptions.delete(subscription)) return;
    if (!subscriptions.size) {
      observer.unobserve(element);
      callbacks.delete(element);
    }
    if (!callbacks.size) {
      observer.disconnect();
      observers.delete(key);
    }
  };
}

const PERCENT_THRESHOLDS = Array.from({ length: 100 }, (_, i) => i * 0.01);

/**
 * The original runtime's in-view test: the visible share of an element is measured against
 * the smaller of its own height and the viewport height, so tall sections can
 * still reach thresholds like 0.5.
 */
function isIntersectingWithThreshold(entry: IntersectionObserverEntry, threshold: number) {
  const { boundingClientRect, intersectionRect, isIntersecting } = entry;
  if (boundingClientRect.height === 0) return isIntersecting;
  const visible = intersectionRect.height / Math.min(boundingClientRect.height, window.innerHeight);
  return isIntersecting && visible >= threshold;
}

/**
 * Calls `onChange(true)` when the element enters the viewport past `threshold`
 * and `onChange(false)` when it leaves (never again after the first appear
 * when `once`).
 */
export function useAppearInView(
  ref: RefObject<Element | null>,
  onChange: (appears: boolean) => void,
  { enabled = true, once = false, threshold = 0, rootMargin = "0px 0px 0px 0px" }: { enabled?: boolean; once?: boolean; threshold?: number; rootMargin?: string },
) {
  const latest = useLatest(onChange);
  useEffect(() => {
    if (!enabled) return;
    let isInView = false;
    let hasAppeared = false;
    let stop = () => {};
    const unsubscribe = subscribeElementRef(ref, element => {
      stop();
      stop = element ? observeIntersection(element, (entry) => {
        const intersecting = isIntersectingWithThreshold(entry, threshold ?? 0);
        if (intersecting && !isInView) {
          if (once && hasAppeared) return;
          hasAppeared = true;
          isInView = true;
          latest.current(true);
        } else if (!intersecting && isInView) {
          isInView = false;
          if (!once) latest.current(false);
        }
      }, { rootMargin, threshold: PERCENT_THRESHOLDS }) : () => {};
    });
    return () => { unsubscribe(); stop(); };
  }, [ref, enabled, once, threshold, rootMargin]);
}

// ---------------------------------------------------------------------------
// Scroll

export interface ScrollAxis {
  current: number;
  progress: number;
  scrollLength: number;
  containerLength: number;
}

/**
 * Subscribe to page (or element-relative) vertical scroll; returns the unsubscribe function.
 *
 * Unsubscribing waits for the next frame's read step: motion's unsubscribe cancels the
 * container's pending measure, which every subscriber shares. On a client navigation the
 * old page's effects unsubscribe (passive cleanups) after the new page's have subscribed
 * (layout effects), and would cancel their first measure: the new page's scroll effects
 * then sit at their first keyframe until the reader scrolls.
 */
export function onScroll(callback: (y: ScrollAxis) => void, options?: { target?: Element; offset?: any }) {
  if (typeof document === "undefined") return () => {};
  const stop = scrollInfo((info: any) => callback(info.y), options as any);
  return () => void frame.read(stop);
}

export interface ScrollTarget<T = unknown> {
  ref?: RefObject<Element | null>;
  offset?: number;
  target: T;
}

/** Distance from the top of the document, ignoring transforms. */
export function documentOffsetTop(element: Element) {
  let top = 0;
  let current: Element | null = element;
  while (current && current !== document.documentElement) {
    if (!(current instanceof HTMLElement)) break;
    top += current.offsetTop;
    current = current.offsetParent;
  }
  return top;
}

/**
 * Scroll positions at which each scroll target becomes active: pairs of
 * [start, end] in document order. `onTarget(index)` is called for every target
 * that has a mounted ref, from last to first (callers `unshift`).
 */
export function scrollTargetInputRange(targets: ScrollTarget[], threshold: number, onTarget?: (index: number) => void) {
  const starts: number[] = [];
  const inputRange: number[] = [];
  for (let index = targets.length; index >= 0; index--) {
    const { ref, offset } = targets[index] ?? {};
    const element = ref?.current;
    if (!element) continue;
    const top = documentOffsetTop(element) - 1 - (offset ?? 0) - threshold;
    const end = Math.max(top + (element.clientHeight ?? 0), 0);
    const nextTop = starts[starts.length - 1];
    starts.push(top);
    inputRange.unshift(Math.max(top, 0), nextTop === undefined ? end : Math.min(end, Math.max(nextTop - 1, 0)));
    onTarget?.(index);
  }
  return inputRange;
}

/** True when the first target's ref is set (or it has none) — i.e. ranges can be computed. */
export function scrollTargetsReady<T>(targets: ScrollTarget<T>[] | undefined): targets is ScrollTarget<T>[] {
  const first = targets?.[0];
  return !!first && (!first.ref || !!first.ref.current);
}

/**
 * The original runtime's scroll-direction trigger: calls `onChange(target)` when the user has
 * scrolled at least 4px in `direction`, and `onChange(undefined)` when they
 * reverse.
 *
 * Like the original runtime, the tracking restarts whenever `onChange` changes identity (callers
 * pass an inline function, so: on every render of the host). A switch that
 * re-renders the host (a variant change) therefore forgets the direction it
 * reacted to, and scrolling back does not undo it.
 */
export function useScrollDirectionChange<T>(
  scrollDirection: { direction?: "up" | "down"; target?: T } | undefined,
  onChange: (target: T | undefined) => void,
  { repeat = true, enabled = true }: { repeat?: boolean; enabled?: boolean } = {},
) {
  const { direction, target } = scrollDirection ?? {};
  const routeKey = useRouteKey();
  useEffect(() => {
    if (!direction || !enabled) return;
    let lastOffset: number | undefined;
    let lastDirection: "up" | "down" | undefined;
    let changeOffset = 0;
    let current: T | undefined;
    return onScroll((y) => {
      if (!repeat && current === target) return;
      if (y.current > y.scrollLength || y.current < 0) return;
      const now = lastOffset !== undefined && y.current < lastOffset ? "up" : "down";
      lastOffset = y.current;
      if (now !== lastDirection) {
        lastDirection = now;
        changeOffset = y.current;
        return;
      }
      if (Math.abs(y.current - changeOffset) < 4) return;
      const next = now === direction ? target : undefined;
      if (next !== current) onChange(next);
      current = next;
    });
  }, [routeKey, direction, target, repeat, enabled, onChange]);
}

/** Structural equality for small JSON-like values (animation targets). */
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((key) => isEqual(a[key], b[key]));
}
