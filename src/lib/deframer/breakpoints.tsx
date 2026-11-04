"use client";

// Breakpoints for pages and layout templates.
//
// pages are one component whose breakpoint variants (Desktop / Tablet /
// Phone) are picked by media query. Published sites solve "server HTML must look
// right at every width" like this, and so do we:
//
//  1. Server: every <PropertyOverrides> renders one branch per distinct set of
//     overrides, each wrapped in `<div class="ssr-variant hidden-phone …">`, and
//     layers hidden in some breakpoint carry its hidden class (`hidden-phone`). A
//     `<style data-breakpoint-css>` hides that class inside the
//     breakpoint's media query, so there is no flash before JavaScript runs.
//  2. Before hydration: the layers hidden at the current width are removed from
//     the DOM (the original runtime: removeHiddenBreakpointLayersV2 in its entry script; here: a
//     tiny inline script that prunes them while the HTML is parsed, including
//     Suspense content React streams later and swaps in).
//  3. Hydration: useHydratedBreakpointVariants already returns the variant that
//     matches the window, and PropertyOverrides renders only that branch (still
//     inside its ssr-variant wrapper), which is exactly the pruned DOM.
//  4. After hydration PropertyOverrides keeps rendering the active branch and
//     breakpoint changes come from matchMedia listeners.
//
// Pages and templates name each breakpoint's hidden class explicitly
// (`hiddenClassNames = { Phone: "hidden-phone" }`, passed to
// useHydratedBreakpointVariants and in GeneratedComponentContext). The original runtime's own
// code only has variant class names; the hidden class then ends with the
// variant class's hash (`df-v-72rtr7` → `hidden-72rtr7`).

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { useServerInsertedHTML } from "./host";
import { useInstantTransition } from "motion/react";
import { GeneratedComponentContext } from "./contexts";
// React 18's createElement (defaultProps applied), as the original runtime has it.
import { createElement } from "./jsx-runtime";
import { withCSS } from "./styles";

const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// ---------------------------------------------------------------------------
// Hydration detection

const noopSubscribe = () => () => {};

/**
 * Whether this component's first render was the server's or the hydration render (false for
 * components that mount later on the client, e.g. after a client-side navigation), for decisions
 * taken once at mount. It never changes afterwards, so it costs no re-render: React reads the
 * server snapshot only while hydrating, and once it has, the browser snapshot of this instance
 * answers the same, which leaves React nothing to update after hydration. (The usual
 * `useSyncExternalStore(subscribe, () => false, () => true)` flips after hydration and so
 * re-renders every caller synchronously; for a page that is the whole page a second time, in one
 * long task.)
 */
export function useMountedWhileHydrating(): boolean {
  const hydrated = useRef(false);
  return useSyncExternalStore(
    noopSubscribe,
    () => hydrated.current,
    () => (hydrated.current = true),
  );
}

// ---------------------------------------------------------------------------
// Hidden classes

/** Breakpoint variant -> class name: hidden classes, or (the original runtime's code) variant classes. */
type ClassNameMap = Record<string, string>;

/** The context a page or template provides, with its explicit hidden classes. */
type BreakpointContext = { variantClassNames?: ClassNameMap; hiddenClassNames?: ClassNameMap; primaryVariantId?: string };

/** `df-v-72rtr7` → `72rtr7` */
export function variantHashFromClassName(className: string): string | undefined {
  return className.split("-")[2];
}

/** The class that hides a layer at `variant`: named in the map, or derived from a variant class. */
function hiddenClassFor(classNames: ClassNameMap | undefined, variant: string): string | undefined {
  const className = classNames?.[variant];
  if (!className) return undefined;
  if (className.startsWith("hidden-")) return className;
  const hash = variantHashFromClassName(className);
  return hash ? `hidden-${hash}` : undefined;
}

/** The breakpoint class map a page or template provides: its hidden classes if named. */
function breakpointClassNames(context: BreakpointContext | undefined): ClassNameMap | undefined {
  return context?.hiddenClassNames ?? context?.variantClassNames;
}

/** Only the containing generated component's breakpoint classes, not arbitrary hidden-* styles. */
export function hiddenLayerClassNames(className: unknown, context: BreakpointContext | undefined): string {
  const names = breakpointClassNames(context);
  if (!names || typeof className !== "string") return "";
  const hidden = new Set(Object.keys(names).map((variant) => hiddenClassFor(names, variant)));
  return className.split(/\s+/).filter((name) => hidden.has(name)).join(" ");
}

// Server registry: which hidden class belongs to a breakpoint variant. Only a
// fallback for modules that don't pass their class names (keys are then assumed
// unique site-wide); converted pages and templates always pass them.

const hiddenByVariant = new Map<string, string>();
const seenClassNameMaps = new WeakSet<object>();

function registerClassNames(classNames: ClassNameMap | undefined): void {
  if (!classNames || seenClassNameMaps.has(classNames)) return;
  seenClassNameMaps.add(classNames);
  for (const variant of Object.keys(classNames)) {
    const hidden = hiddenClassFor(classNames, variant);
    if (hidden) hiddenByVariant.set(variant, hidden);
  }
}

/**
 * Kit components rendered inside a page read its GeneratedComponentContext;
 * on the server that's how we learn the page's breakpoint classes (the page
 * provides them only through that context).
 */
export function useRegisterBreakpointClassNames(): void {
  const context = useContext(GeneratedComponentContext) as BreakpointContext | undefined;
  if (!isBrowser) registerClassNames(breakpointClassNames(context));
}

// ---------------------------------------------------------------------------
// Pre-hydration pruning script.
//
// This function is serialized with toString() into an inline <script>, so it
// must be self-contained, plain ES5, and reference nothing outside itself. It
// can also be called directly in the browser (removeHiddenBreakpointLayersV2).

function installBreakpointPruner(pairs: Array<[string, string]>): void {
  var w = window as any;
  var d = document;
  var state = w.__breakpointPruner;
  if (!state) {
    state = w.__breakpointPruner = { active: {}, known: {}, overrides: [], deferred: [], emptyWrappers: [] };

    var isHidden = function (element: Element) {
      var list = element.classList;
      for (var i = 0; i < list.length; i++) {
        var name = list[i];
        if (name.indexOf("hidden-") === 0 && state.active[name]) return true;
      }
      return false;
    };
    var isOverrideMarker = function (node: any, edge: string) {
      return node && node.nodeName === "TEMPLATE" && node.hasAttribute("data-breakpoint-override-" + edge);
    };
    // React owns hidden S: containers while it assembles streamed segments.
    // Removing anything inside one can delete a P: insertion target before $RS
    // runs ($RS, unlike $RC, requires that target). Wait for React to move the
    // completed content into its boundary; the observer prunes it there instead.
    // React writes these ids after the render's identifierPrefix (Astro's islands
    // render with one: `r1S:2`, `r1P:c`), so the marker ends the id, before its index.
    var segmentId = /S:[0-9a-z]+$/;
    var targetId = /P:[0-9a-z]+$/;
    var inStreamSegment = function (node: any) {
      for (var parent = node.parentElement; parent; parent = parent.parentElement) {
        if (parent.hidden && segmentId.test(parent.id)) return true;
      }
      return false;
    };
    var isSegmentTarget = function (node: any) {
      return node.nodeName === "TEMPLATE" && targetId.test(node.id);
    };
    var hasSegmentTarget = function (node: any) {
      if (node.nodeType !== 1) return false;
      if (isSegmentTarget(node)) return true;
      var templates = node.getElementsByTagName("template");
      for (var i = 0; i < templates.length; i++) if (isSegmentTarget(templates[i])) return true;
      return false;
    };
    // A hidden override may add wrappers or fragment siblings around its layer.
    // Wait for its closing marker if HTML is still arriving, then remove the
    // entire range, including nested Suspense templates. React drops late streamed
    // content when its pending-boundary template is no longer in the document.
    var removeOverride = function (start: any, finish?: boolean) {
      var parent = start.parentNode;
      if (!parent) return true;
      if (inStreamSegment(start)) return false;
      // Another page/template's asset registration can arrive after this marker.
      for (var c = 0; c < start.classList.length; c++) if (!finish && !state.known[start.classList[c]]) return false;
      var depth = 1;
      var end = start.nextSibling;
      for (; end; end = end.nextSibling) {
        if (isOverrideMarker(end, "start")) depth++;
        if (isOverrideMarker(end, "end") && --depth === 0) break;
      }
      if (!end) return false;
      if (isHidden(start)) {
        for (var child = start.nextSibling; child !== end; child = child.nextSibling) if (hasSegmentTarget(child)) return false;
        while (start.nextSibling !== end) parent.removeChild(start.nextSibling);
      }
      // Visible content stays in place. Markers are server-only and must also go
      // before hydration; they must not change :first-child / :nth-child styling.
      parent.removeChild(end);
      parent.removeChild(start);
      removeIfEmptyWrapper(parent);
      return true;
    };
    var settleOverrides = function (finish?: boolean) {
      var waiting = state.overrides;
      state.overrides = [];
      for (var i = 0; i < waiting.length; i++) if (!removeOverride(waiting[i], finish)) state.overrides.push(waiting[i]);
    };
    // Only remove nodes owned by the hidden branch. An unconditional Suspense
    // boundary can remain in the client tree when its last DOM child disappears.
    // Explicit override ranges above remove conditional boundaries with their owner.
    var removeNode = function (node: any) {
      if (isOverrideMarker(node, "start")) {
        if (!removeOverride(node) && state.overrides.indexOf(node) < 0) state.overrides.push(node);
        return;
      }
      var parent = node.parentNode;
      if (!parent) return;
      if (inStreamSegment(node) || hasSegmentTarget(node)) {
        if (state.deferred.indexOf(node) < 0) state.deferred.push(node);
        return;
      }
      parent.removeChild(node);
      removeIfEmptyWrapper(parent);
    };
    var removeIfEmptyWrapper = function (parent: any) {
      if (parent.nodeType !== 1 || parent.firstChild) return;
      if (!parent.classList.contains("ssr-variant") && !(parent.nodeName === "LI" && parent.classList.contains("ticker-item"))) return;
      // A branch can be pruned while the parser is still inside its wrapper.
      // Its next (visible) branch may arrive in another network chunk. A following
      // sibling at any ancestor proves the parser has moved beyond this wrapper;
      // otherwise wait for more DOM or the end of parsing before removing it.
      if (d.readyState === "loading") {
        var cursor = parent;
        while (cursor && !cursor.nextSibling) cursor = cursor.parentNode;
        if (!cursor) {
          if (state.emptyWrappers.indexOf(parent) < 0) state.emptyWrappers.push(parent);
          return;
        }
      }
      removeNode(parent);
    };
    var sweep = function (root: ParentNode) {
      var candidates = root.querySelectorAll('[class*="hidden-"]');
      for (var i = 0; i < candidates.length; i++) if (isOverrideMarker(candidates[i], "start") || isHidden(candidates[i])) removeNode(candidates[i]);
    };
    var settleDeferred = function () {
      var waiting = state.deferred;
      state.deferred = [];
      for (var i = 0; i < waiting.length; i++) if (d.documentElement.contains(waiting[i])) removeNode(waiting[i]);
    };
    var settleEmptyWrappers = function () {
      var waiting = state.emptyWrappers;
      state.emptyWrappers = [];
      for (var i = 0; i < waiting.length; i++) if (d.documentElement.contains(waiting[i])) removeIfEmptyWrapper(waiting[i]);
    };
    var observer = new MutationObserver(function (records) {
      for (var r = 0; r < records.length; r++) {
        var added = records[r].addedNodes;
        for (var a = 0; a < added.length; a++) {
          var node = added[a] as any;
          if (node.nodeType === 1) {
            if (isOverrideMarker(node, "start") || isHidden(node)) removeNode(node);
            else if (node.firstElementChild) sweep(node);
          }
        }
      }
      settleDeferred();
      settleOverrides(readyToFinish);
      settleEmptyWrappers();
      if (readyToFinish) complete();
    });
    observer.observe(d.documentElement, { childList: true, subtree: true });
    state.sweep = function () {
      sweep(d);
      settleDeferred();
      settleOverrides();
      settleEmptyWrappers();
    };
    var readyToFinish = false;
    var complete = function () {
      // React can commit streamed boundaries on an animation frame after
      // DOMContentLoaded. Keep observing until their deferred layers are pruned.
      if (state.deferred.length || state.overrides.length || state.emptyWrappers.length) return;
      observer.disconnect();
      // Like the original runtime: once pruned, the hiding rules are no longer needed.
      var idle = w.requestIdleCallback || function (callback: () => void) { setTimeout(callback, 1); };
      idle(function () {
        var styles = d.querySelectorAll("style[data-breakpoint-css]");
        for (var i = 0; i < styles.length; i++) styles[i].parentNode!.removeChild(styles[i]);
      });
    };
    var finish = function () {
      readyToFinish = true;
      state.sweep();
      settleOverrides(true);
      complete();
    };
    if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", finish);
    else setTimeout(finish, 0);
  }

  // A group's first breakpoint is the default when none of its queries match.
  var matched = false;
  for (var i = 0; i < pairs.length; i++) {
    state.known[pairs[i][0]] = true;
    if (w.matchMedia(pairs[i][1]).matches) state.active[pairs[i][0]] = matched = true;
  }
  if (!matched && pairs.length) state.active[pairs[0][0]] = true;
  state.sweep();
}

/** `pairs`: [hidden class, media query]. */
function breakpointCSS(pairs: Array<[string, string]>): string {
  return pairs.map(([hidden, query]) => `@media${query}{.${hidden}{display:none!important}}`).join("");
}

/**
 * Streams the breakpoint CSS and the pruning script into the document head for
 * the breakpoints of one page/template, as soon as their hidden classes are known.
 */
function useBreakpointServerAssets(mediaQueries: Record<string, string>, classNames?: ClassNameMap): void {
  // Variant keys (e.g. "Desktop") repeat across a page and its template; the
  // module's own class names identify its hidden classes unambiguously.
  const hiddenOf = (variant: string) => (classNames ? hiddenClassFor(classNames, variant) : hiddenByVariant.get(variant));
  const sent = useRef<Set<string>>(null);
  useServerInsertedHTML(() => {
    sent.current ??= new Set();
    const pairs: Array<[string, string]> = [];
    for (const [variantId, query] of Object.entries(mediaQueries)) {
      const hidden = hiddenOf(variantId);
      if (!hidden || sent.current.has(hidden)) continue;
      sent.current.add(hidden);
      pairs.push([hidden, query]);
    }
    if (pairs.length === 0) return null;
    return (
      <>
        <style data-breakpoint-css="" dangerouslySetInnerHTML={{ __html: breakpointCSS(pairs) }} />
        <script dangerouslySetInnerHTML={{ __html: `(${installBreakpointPruner.toString()})(${JSON.stringify(pairs)})` }} />
      </>
    );
  });
}

// ---------------------------------------------------------------------------
// useHydratedBreakpointVariants

function activeVariantFromWindow(mediaQueries: Record<string, string>): string | undefined {
  for (const [variant, query] of Object.entries(mediaQueries)) {
    if (window.matchMedia(query).matches) return variant;
  }
  return undefined;
}

/**
 * Returns `[baseVariant, basePropsVariant]` for a page/template with breakpoint
 * variants. On the server both are `initial`. In the browser `baseVariant` is
 * the variant whose media query matches; `basePropsVariant` stays `initial`
 * for the hydration render when `hydratedWithInitial` is set (then catches up
 * in a layout effect). Pages are generated with `hydratedWithInitial = false`.
 *
 * `classNames` (optional: the hidden classes by breakpoint, or the original runtime's
 * variant class names) lets the server know the hidden classes without
 * waiting for a descendant to read GeneratedComponentContext.
 */
export function useHydratedBreakpointVariants(
  initial: string,
  mediaQueries: Record<string, string>,
  hydratedWithInitial = true,
  classNames?: ClassNameMap,
): readonly [string, string] {
  useBreakpointServerAssets(mediaQueries, classNames);
  const isHydrating = useMountedWhileHydrating();
  const state = useRef<{ base: string; props: string }>(null);
  if (state.current === null) {
    const base = isBrowser ? activeVariantFromWindow(mediaQueries) ?? initial : initial;
    state.current = { base, props: hydratedWithInitial && isHydrating ? initial : base };
  }
  const [, forceUpdate] = useReducer((n: number) => n + 1, 0);
  const instantTransition = useInstantTransition();
  const hydratedWithInitialRef = useRef(hydratedWithInitial && isHydrating);

  const setActiveVariant = useCallback(
    (variant: string) => {
      const current = state.current!;
      if (variant === current.base && variant === current.props) return;
      // Breakpoint switches apply without animating variant transitions.
      instantTransition(() => {
        current.base = current.props = variant;
        startTransition(forceUpdate);
      });
    },
    [instantTransition],
  );

  useIsomorphicLayoutEffect(() => {
    if (hydratedWithInitialRef.current) setActiveVariant(state.current!.base);
  }, []);

  useEffect(() => {
    const listeners = Object.entries(mediaQueries).map(([variant, query]) => {
      const mql = window.matchMedia(query);
      const onChange = (event: MediaQueryListEvent) => {
        if (event.matches) setActiveVariant(variant);
      };
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    });
    return () => listeners.forEach((remove) => remove());
  }, [mediaQueries, setActiveVariant]);

  return [state.current.base, state.current.props] as const;
}

/** Legacy API kept for old generated code; pruning is handled before hydration. */
export function removeHiddenBreakpointLayers(_initial?: unknown, _mediaQueries?: unknown, _variantClassNames?: unknown): void {}

/** Removes the layers hidden at the current width (`[{ hash, mediaQuery }]`). */
export function removeHiddenBreakpointLayersV2(breakpoints: Array<{ hash: string; mediaQuery?: string }>): void {
  if (!isBrowser) return;
  const pairs = breakpoints.filter((b) => b.mediaQuery).map((b) => [`hidden-${b.hash}`, b.mediaQuery!] as [string, string]);
  installBreakpointPruner(pairs);
}

// ---------------------------------------------------------------------------
// PropertyOverrides

type Props = Record<string, any>;

/** Variants a parent PropertyOverrides branch is rendered for (server/hydration only). */
/** Branch variants of the enclosing PropertyOverrides; `owner` (the module's class name map) scopes it to one component. */
const SSRParentVariantsContext = createContext<{ owner: object; variants: Set<string> } | undefined>(undefined);

const SSR_VARIANT_CLASS = "ssr-variant";

/** Deep equality for override values (plain data, arrays, React elements). */
function isEqual(a: unknown, b: unknown, depth = 0): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null || depth > 8) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (isValidElement(a) || isValidElement(b)) {
    return isValidElement(a) && isValidElement(b) && a.type === b.type && a.key === b.key && isEqual(a.props, b.props, depth + 1);
  }
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) return false;
  return keysA.every((key) => isEqual((a as Props)[key], (b as Props)[key], depth + 1));
}

function overridesChangeSomething(props: Props, overrides: Props): boolean {
  return Object.keys(overrides).some((key) => !isEqual(props[key], overrides[key]));
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): Ref<T> {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as { current: T | null }).current = value;
    }
  };
}

/** Clone an element with extra props, forwarding `ref` (combined with the element's own ref). */
export function cloneWithProps(child: ReactNode, props: Props, ref?: Ref<unknown>): ReactNode {
  if (!isValidElement(child)) return child;
  if (!ref) return Object.keys(props).length ? cloneElement(child, props) : child;
  const ownRef = (child.props as Props).ref as Ref<unknown> | undefined;
  return cloneElement(child as ReactElement<Props>, { ...props, ref: ownRef ? mergeRefs(ownRef, ref) : ref });
}

interface Branch {
  variants: string[];
  overrides?: Props;
}

/**
 * Group the breakpoint variants into branches: the primary variant together with
 * every variant whose overrides change nothing, plus one branch per variant
 * with effective overrides.
 */
function branchesFor(child: ReactElement, overrides: Record<string, Props | undefined>, variantIds: string[], primaryVariantId: string, parent?: Set<string>): Branch[] {
  const within = (ids: string[]) => (parent ? ids.filter((id) => parent.has(id)) : ids);
  const shared = [primaryVariantId];
  const branches: Branch[] = [];
  for (const variantId of variantIds) {
    if (variantId === primaryVariantId) continue;
    const variantOverrides = overrides[variantId];
    if (!variantOverrides || !overridesChangeSomething(child.props as Props, variantOverrides)) {
      shared.push(variantId);
      continue;
    }
    const variants = within([variantId]);
    if (variants.length) branches.push({ variants, overrides: variantOverrides });
  }
  if (branches.length === 0) return [];
  const sharedVariants = within(shared);
  if (sharedVariants.length) branches.unshift({ variants: sharedVariants });
  return branches;
}

function hiddenClassNames(shownIn: string[], classNames: ClassNameMap, parent?: Set<string>): string[] {
  const names: string[] = [];
  for (const variantId of Object.keys(classNames)) {
    if (shownIn.includes(variantId) || (parent && !parent.has(variantId))) continue;
    const hidden = hiddenClassFor(classNames, variantId);
    if (hidden) names.push(hidden);
  }
  return names;
}

const OverrideMode = {
  /** Client mount after hydration: just apply the active breakpoint's props. */
  PassThrough: 0,
  /** Hydration: render the active branch inside its ssr-variant wrapper. */
  ActiveBranch: 1,
  /** Server: render every branch, each hidden outside its breakpoints. */
  AllBranches: 2,
} as const;

/**
 * Where hydration rendered the active branch: its index among the server's branches (none: the child
 * alone), its key and hidden classes, for the breakpoint it was active in.
 */
interface ActiveSlot {
  breakpoint: string;
  index?: number;
  count: number;
  key: string;
  variants: string[];
  hidden: string[];
}

const PropertyOverridesWithoutCSS = forwardRef<unknown, Props>(function PropertyOverrides(props, ref) {
  const { breakpoint, overrides = {}, children, ...rest } = props;
  const context = useContext(GeneratedComponentContext) as BreakpointContext | undefined;
  const ancestor = useContext(SSRParentVariantsContext);
  const isHydrating = useMountedWhileHydrating();
  const [mode] = useState(() => (!isHydrating ? OverrideMode.PassThrough : isBrowser ? OverrideMode.ActiveBranch : OverrideMode.AllBranches));
  const slot = useRef<ActiveSlot | undefined>(undefined);
  useRegisterBreakpointClassNames();

  const only = Children.toArray(children);
  const child = only[0];
  const classNames = breakpointClassNames(context);
  if (!classNames || !context?.primaryVariantId || only.length !== 1 || !isValidElement(child) || mode === OverrideMode.PassThrough) {
    const props = { ...rest, ...(breakpoint ? overrides[breakpoint] : undefined) };
    return <>{Children.map(children, (c) => cloneWithProps(c, props, ref))}</>;
  }

  const { primaryVariantId } = context;
  const parent = ancestor?.owner === classNames ? ancestor.variants : undefined;
  // Refs can't be shared by several server branches; they mean nothing there anyway.
  const branchRef = mode === OverrideMode.ActiveBranch ? ref : undefined;
  const branchElement = (key: string, variants: string[], hidden: string[], branchProps: Props) => {
    const element = (
      <SSRParentVariantsContext.Provider key={key} value={{ owner: classNames, variants: new Set(variants) }}>
        {cloneWithProps(child, branchProps, branchRef)}
      </SSRParentVariantsContext.Provider>
    );
    return hidden.length ? createElement("div", { key, className: `${SSR_VARIANT_CLASS} ${hidden.join(" ")}` }, element) : element;
  };
  // After hydration, the active branch stays where hydration put it while its breakpoint does: new
  // props can group the breakpoints into other branches (a layout template given the next page's,
  // whose overrides then change nothing), and a branch in another place is new to React, which
  // would mount what it renders again (the layout's navigation, its state lost).
  const kept = mode === OverrideMode.ActiveBranch && slot.current?.breakpoint === breakpoint ? slot.current : undefined;
  if (kept) {
    const keptProps = { ...rest, ...(breakpoint ? overrides[breakpoint] : undefined) };
    if (kept.index === undefined) return cloneWithProps(child, keptProps, ref);
    const rendered: ReactNode[] = Array.from({ length: kept.count }, () => null);
    rendered[kept.index] = branchElement(kept.key, kept.variants, kept.hidden, keptProps);
    return <>{rendered}</>;
  }

  const branches = branchesFor(child, overrides, Object.keys(classNames), primaryVariantId, parent);
  if (branches.length === 0) {
    if (mode === OverrideMode.ActiveBranch && breakpoint) slot.current = { breakpoint, count: 1, key: "", variants: [], hidden: [] };
    return cloneWithProps(child, rest, ref);
  }

  const rendered: ReactNode[] = [];
  for (const branch of branches) {
    // Hydration renders only the active branch, but keeps the server's array
    // positions (null for pruned branches): React derives useId values from a
    // child's index and its siblings count, so ids inside match the server HTML.
    if (mode === OverrideMode.ActiveBranch && breakpoint && !branch.variants.includes(breakpoint)) {
      rendered.push(null);
      continue;
    }
    const key = branch.variants.join("+");
    const hidden = hiddenClassNames(branch.variants, classNames, parent);
    if (mode === OverrideMode.ActiveBranch && breakpoint) slot.current = { breakpoint, index: rendered.length, count: branches.length, key, variants: branch.variants, hidden };
    rendered.push(branchElement(key, branch.variants, hidden, branch.overrides ? { ...rest, ...branch.overrides } : rest));
  }
  return <>{rendered}</>;
});

/**
 * Applies per-breakpoint prop overrides to its single child:
 * `<PropertyOverrides breakpoint={baseVariant} overrides={{ [variantId]: props }}>`.
 */
export const PropertyOverrides = withCSS(PropertyOverridesWithoutCSS as any, `.${SSR_VARIANT_CLASS} { display: contents; }`, "PropertyOverrides") as any;
/** It hands its props, and a breakpoint's overrides, to its one child (route-link.tsx looks through it). */
PropertyOverrides.passesPropsToChild = true;

/**
 * Renders `component` with the breakpoint of the surrounding page mapped to its
 * own same-named variant ("Desktop", "Tablet", "Phone"), unless a variant is given.
 */
export function AutoBreakpointVariant({ component, props }: { component: any; props: Props }) {
  const context = useContext(GeneratedComponentContext);
  const element = createElement(component, props);
  if (props.variant != null || !context?.activeVariantId || !context.humanReadableVariantMap) return element;
  const overrides: Record<string, Props> = {};
  for (const [name, id] of Object.entries(context.humanReadableVariantMap)) overrides[id] = { variant: name };
  return (
    <PropertyOverrides overrides={overrides} breakpoint={context.activeVariantId}>
      {element}
    </PropertyOverrides>
  );
}
