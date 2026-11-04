"use client";

// Component system: variant state machine, gestures, component viewport,
// containers and code boundaries, plus small helpers generated components use.
// Breakpoint handling (PropertyOverrides, useHydratedBreakpointVariants, …)
// lives in ./breakpoints and is re-exported here.

import {
  Children,
  Component as ReactComponent,
  createContext,
  createRef,
  forwardRef,
  isValidElement,
  cloneElement,
  startTransition,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  use,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";
import { LayoutGroup, motion } from "motion/react";
import { ComponentViewportContext, GeneratedComponentContext, RouterContext, type ComponentViewport } from "./contexts";
import { cloneWithProps, hiddenLayerClassNames, useRegisterBreakpointClassNames } from "./breakpoints";

export {
  AutoBreakpointVariant,
  PropertyOverrides,
  removeHiddenBreakpointLayers,
  removeHiddenBreakpointLayersV2,
  useHydratedBreakpointVariants,
} from "./breakpoints";
export { GeneratedComponentContext };

type Props = Record<string, any>;
const isBrowser = typeof window !== "undefined";

export function cx(...classNames: unknown[]): string {
  return classNames.filter(Boolean).join(" ");
}

/** Lazily initialised value that never changes for the component's lifetime. */
export function useConstant<T>(init: () => T): T {
  const ref = useRef<T | null>(null);
  if (ref.current === null) ref.current = init();
  return ref.current;
}

// ---------------------------------------------------------------------------
// Render target. Converted sites are always the published preview.

export const RenderTarget = {
  canvas: "CANVAS",
  export: "EXPORT",
  thumbnail: "THUMBNAIL",
  preview: "PREVIEW",
  current: (): string => "PREVIEW",
  hasRestrictions: (): boolean => false,
} as const;

export function useIsOnCanvas(): boolean {
  return false;
}
export function useIsStaticRenderer(): boolean {
  return false;
}
/** Whether the target renders a still image (canvas, export): never on a published site. */
export function isStaticRenderer(): boolean {
  return false;
}

// ---------------------------------------------------------------------------
// Variant state

/** Pass to `setVariant` to advance to the next variant in `cycleOrder`. */
export const CycleVariantState: unique symbol = Symbol("cycle");

type Gesture = "hover" | "pressed" | "loading" | "error";
type EnabledGestures = Record<string, Partial<Record<Gesture, boolean>>>;

function gestureFor(enabled: Partial<Record<Gesture, boolean>> | undefined, s: { isHovered: boolean; isPressed: boolean; isLoading: boolean; isError: boolean }): Gesture | undefined {
  if (!enabled) return undefined;
  if (enabled.error && s.isError) return "error";
  if (enabled.loading && s.isLoading) return "loading";
  if (enabled.pressed && s.isPressed) return "pressed";
  if (enabled.hover && s.isHovered) return "hover";
  return undefined;
}

function nextInCycle(cycleOrder: string[], current: string): string {
  const index = cycleOrder.indexOf(current);
  return cycleOrder[(index + 1) % cycleOrder.length] ?? current;
}

/** Crawlers and automation never wait for visibility before updating variants. */
const isBot = isBrowser && (navigator.webdriver || /bot|-google|google-|yandex|ia_archiver|crawl|spider/i.test(navigator.userAgent));

/**
 * Runs a state update now, or once the page is visible again (and, when
 * `checkViewport` is set, once `ref` is in view) — offscreen components don't
 * animate between variants nobody sees.
 */
function isElementInViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
}

function useRunWhenVisible(ref?: RefObject<Element | null>) {
  const cleanups = useRef<{ visibility?: () => void; viewport?: () => void }>({});
  // The update still waiting for the page / element to be visible. React Strict Mode runs the effect
  // cleanup below and then the effect again; a waiting update must survive that, because the state
  // change it applies has already been recorded (a repeat `setVariant` would be a no-op).
  const waiting = useRef<{ callback: () => void; checkViewport: boolean } | undefined>(undefined);
  const latestRun = useRef<(callback: () => void, checkViewport?: boolean) => void>(() => {});
  useEffect(() => {
    const entry = waiting.current;
    if (entry) latestRun.current(entry.callback, entry.checkViewport);
    return () => {
      cleanups.current.visibility?.();
      cleanups.current.viewport?.();
    };
  }, []);
  const runWhenVisible = useCallback(
    (callback: () => void, checkViewport = false) => {
      if (isBot) return callback();
      const entry = {
        callback: () => {
          if (waiting.current === entry) waiting.current = undefined;
          callback();
        },
        checkViewport,
      };
      const run = () => {
        const element = ref?.current;
        if (!checkViewport || !element || typeof IntersectionObserver === "undefined") return entry.callback();
        // Apply immediately when already on-screen. Waiting only on IntersectionObserver
        // can drop the update (e.g. React Strict Mode effect cleanups cancel the observer
        // before its first async callback), which leaves appear variants stuck at opacity 0.
        if (isElementInViewport(element)) return entry.callback();
        waiting.current = entry;
        cleanups.current.viewport?.();
        const observer = new IntersectionObserver(([intersection]) => {
          if (!intersection?.isIntersecting) return;
          cleanups.current.viewport?.();
          entry.callback();
        });
        observer.observe(element);
        cleanups.current.viewport = () => {
          observer.disconnect();
          cleanups.current.viewport = undefined;
        };
      };
      if (!document.hidden) return run();
      waiting.current = entry;
      cleanups.current.visibility?.();
      const onVisible = () => {
        if (document.hidden) return;
        cleanups.current.visibility?.();
        run();
      };
      document.addEventListener("visibilitychange", onVisible);
      cleanups.current.visibility = () => {
        document.removeEventListener("visibilitychange", onVisible);
        cleanups.current.visibility = undefined;
      };
    },
    [ref],
  );
  latestRun.current = runWhenVisible;
  return runWhenVisible;
}

interface VariantStateOptions {
  variant?: string;
  defaultVariant: string;
  transitions?: Record<string, object>;
  enabledGestures?: EnabledGestures;
  cycleOrder?: string[];
  variantProps?: Record<string, Record<string, Props>>;
  variantClassNames?: Record<string, string>;
  ref?: RefObject<Element | null>;
}

/**
 * The state machine behind every generated component with variants.
 *
 * - `baseVariant`: the `variant` prop when it is one of `cycleOrder`, else
 *   `defaultVariant`; changed internally by `setVariant` (incl. CycleVariantState).
 * - `gestureVariant`: `${baseVariant}-${gesture}` for the enabled gesture that is
 *   active (priority error > loading > pressed > hover).
 * - `variants`: motion `animate` labels — base (unless default) then gesture.
 * - `classNames`: the variant class plus the gesture name.
 */
export function useVariantState({
  variant,
  defaultVariant,
  transitions,
  enabledGestures,
  cycleOrder = [],
  variantProps = {},
  variantClassNames = {},
  ref,
}: VariantStateOptions) {
  const [, forceUpdate] = useReducer((n: number) => n + 1, 0);
  const runWhenVisible = useRunWhenVisible(ref);
  const validVariants = useConstant(() => new Set(cycleOrder));
  const safeBase = (target: string | undefined) => (target && validVariants.has(target) ? target : defaultVariant);

  // Generated components pass module constants; keep them (and the mutable
  // interaction flags) in a ref so callbacks stay stable.
  const state = useConstant(() => ({
    isHovered: false,
    isPressed: false,
    isError: false,
    hoverChanged: false,
    pressChanged: false,
    baseVariant: safeBase(variant),
    gestureVariant: undefined as string | undefined,
    lastVariant: variant,
    loaded: {} as Record<string, boolean>,
    defaultVariant,
    enabledGestures,
    cycleOrder,
    transitions,
  }));

  const resolve = useCallback((target: string | undefined): [string, string | undefined] => {
    const base = target && validVariants.has(target) ? target : state.defaultVariant;
    const gesture = gestureFor(state.enabledGestures?.[base], { ...state, isLoading: false });
    return [base, gesture ? `${base}-${gesture}` : undefined];
  }, []);

  const update = useCallback((target: string | undefined, checkViewport = false, clearError = false) => {
    const [base, gesture] = resolve(target);
    if (base === state.baseVariant && gesture === state.gestureVariant) return;
    if (clearError) state.isError = false;
    state.baseVariant = base || state.defaultVariant;
    state.gestureVariant = gesture;
    const rerender = () => startTransition(forceUpdate);
    // Interactions apply immediately; programmatic changes wait for visibility.
    if (state.isHovered || state.isPressed || state.hoverChanged || state.pressChanged) rerender();
    else runWhenVisible(rerender, checkViewport);
  }, [resolve, runWhenVisible]);

  const setGestureState = useCallback(({ isHovered, isPressed, isError }: { isHovered?: boolean; isPressed?: boolean; isError?: boolean }) => {
    // Like the original runtime, an omitted flag also counts as "changed": after any gesture
    // the next update renders immediately instead of waiting for visibility.
    state.hoverChanged = isHovered !== state.isHovered;
    state.pressChanged = isPressed !== state.isPressed;
    if (isHovered !== undefined) state.isHovered = isHovered;
    if (isPressed !== undefined) state.isPressed = isPressed;
    if (isError !== undefined) state.isError = isError;
    update(state.baseVariant);
  }, [update]);

  const setVariant = useCallback((proposed: string | typeof CycleVariantState, pauseOffscreen = false) => {
    const target = proposed === CycleVariantState ? nextInCycle(state.cycleOrder, state.baseVariant || state.defaultVariant) : proposed;
    update(target, pauseOffscreen, true);
  }, [update]);

  const clearLoadingGesture = useCallback(() => {
    state.loaded[state.baseVariant] = true;
    runWhenVisible(() => startTransition(forceUpdate), true);
  }, [runWhenVisible]);

  // A changed `variant` prop wins over internal state (resolved during render
  // so the new variant paints in the same frame). Track the raw prop in
  // `lastVariant` so internal setVariant advances aren't treated as prop changes.
  if (variant !== state.lastVariant) {
    const [base, gesture] = resolve(variant);
    state.lastVariant = variant;
    state.baseVariant = base;
    state.gestureVariant = gesture;
  }

  const { baseVariant, gestureVariant, isHovered, isPressed, isError, loaded } = state;
  const addVariantProps = useAddVariantProps(baseVariant, gestureVariant, variantProps);
  const loadedHere = loaded[baseVariant];

  return useMemo(() => {
    const gestures = state.enabledGestures?.[baseVariant];
    const isLoading = !isError && !!gestures?.loading && !loadedHere;
    const gesture = isLoading ? `${baseVariant}-loading` : gestureVariant;
    const variants: string[] = [];
    if (baseVariant !== state.defaultVariant) variants.push(baseVariant);
    if (gesture) variants.push(gesture);

    const gestureHandlers: Props = {
      onMouseEnter: () => setGestureState({ isHovered: true }),
      onMouseLeave: () => setGestureState({ isHovered: false }),
    };
    if (gestures?.pressed) {
      gestureHandlers.onTapStart = () => setGestureState({ isPressed: true });
      gestureHandlers.onTapCancel = () => setGestureState({ isPressed: false });
      gestureHandlers.onTap = () => setGestureState({ isPressed: false });
    }
    const transitionsMap = state.transitions as Record<string, object> | undefined;
    return {
      variants,
      baseVariant,
      gestureVariant: gesture,
      isLoading,
      transition: transitionsMap ? transitionsMap[baseVariant] ?? transitionsMap.default : undefined,
      setVariant,
      setGestureState,
      clearLoadingGesture,
      addVariantProps,
      gestureHandlers,
      // A variant no stylesheet styles has no class (the original runtime's fallback variant class names nothing here).
      classNames: cx(variantClassNames[baseVariant], gestureFor(gestures, { isHovered, isPressed, isLoading, isError })),
    };
  }, [baseVariant, gestureVariant, isHovered, isPressed, isError, loadedHere, addVariantProps, setVariant, setGestureState, clearLoadingGesture, variantClassNames]);
}

/** Per-node props for the active variant (+ gesture variant) of legacy `variantProps`. */
export function useAddVariantProps(baseVariant?: string, gestureVariant?: string, variantProps?: Record<string, Record<string, Props>>) {
  return useCallback(
    (id: string): Props => {
      if (!variantProps || !baseVariant) return {};
      if (gestureVariant) return { ...variantProps[baseVariant]?.[id], ...variantProps[gestureVariant]?.[id] };
      return variantProps[baseVariant]?.[id] ?? {};
    },
    [baseVariant, gestureVariant, variantProps],
  );
}

/**
 * Wraps interaction callbacks (`activeVariantCallback`) and timers (`delay`)
 * so that they are cancelled when the base variant changes or on unmount.
 */
export function useActiveVariantCallback(baseVariant: string | undefined) {
  const pending = useConstant(() => ({ timers: new Set<ReturnType<typeof setTimeout>>(), rejects: new Set<(reason?: unknown) => void>() }));
  const cancelAll = useCallback(() => {
    pending.timers.forEach(clearTimeout);
    pending.timers.clear();
    pending.rejects.forEach((reject) => reject("Callback cancelled by variant change"));
    pending.rejects.clear();
  }, []);
  useEffect(() => cancelAll, []);
  useEffect(cancelAll, [baseVariant]);
  return useConstant(() => ({
    activeVariantCallback:
      (callback: (...args: any[]) => Promise<unknown> | unknown) =>
      async (...args: any[]) =>
        new Promise((resolve, reject) => {
          pending.rejects.add(reject);
          void Promise.resolve(callback(...args)).then(resolve);
        }).catch(() => {}),
    delay: async (callback: () => void, ms: number) => {
      await new Promise((resolve) => pending.timers.add(setTimeout(resolve, ms)));
      callback();
    },
  }));
}

/**
 * Calls `callbackMap[variant]` (or `.default`) whenever the variant becomes active.
 * Like the original runtime, the map from the first render is used for the instance's lifetime.
 */
export function useOnVariantChange(variant: string, callbackMap: Record<string, (() => void) | undefined>) {
  const initial = useRef(callbackMap);
  useEffect(() => {
    const map = initial.current;
    const callback = map[variant] ?? (variant in map ? undefined : map.default);
    callback?.();
  }, [variant]);
}

// ---------------------------------------------------------------------------
// Component viewport: the size/position of the slot an instance renders into,
// used by images (sizes, lazy loading) and nested width expressions.

export function useComponentViewport(): ComponentViewport {
  return useContext(ComponentViewportContext);
}

export const ComponentViewportProvider = forwardRef<unknown, ComponentViewport & { children?: ReactNode } & Props>(
  function ComponentViewportProvider({ width, height, y, children, ...rest }, ref) {
    useRegisterBreakpointClassNames();
    const viewport = useMemo(() => ({ width, height, y }), [width, height, y]);
    // Extra props (e.g. from an effect wrapper) and the ref go to the child.
    const content = Children.map(children, (child) => cloneWithProps(child, rest, ref ?? undefined));
    return <ComponentViewportContext.Provider value={viewport}>{content}</ComponentViewportContext.Provider>;
  },
);

// ---------------------------------------------------------------------------
// Code boundaries. Code components and overrides authored in the project are
// isolated: if one throws, it renders its fallback instead of breaking the page.

interface ExternalComponentInfo {
  level: number;
  scopeId?: string;
  nodeId?: string;
  parent?: ExternalComponentInfo;
}
const ExternalComponentContext = createContext<ExternalComponentInfo | undefined>(undefined);

function IsExternalComponent({ scopeId, nodeId, children }: { scopeId?: string; nodeId?: string; children: ReactNode }) {
  const parent = useContext(ExternalComponentContext);
  const value = useMemo(() => ({ level: (parent?.level ?? 0) + 1, scopeId, nodeId, parent }), [scopeId, nodeId, parent]);
  return <ExternalComponentContext.Provider value={value}>{children}</ExternalComponentContext.Provider>;
}

/** A node belongs to this project unless it sits inside an external (library) component. */
function isLocalNode(scopeId: string | undefined, nearest: ExternalComponentInfo | undefined, inComponentSlot: boolean): boolean {
  if (!nearest) return true;
  return nearest.level === 1 && inComponentSlot && scopeId === nearest.scopeId;
}

/**
 * A fallback that keeps the existing DOM instead of replacing it: in the browser it suspends too,
 * so the boundary above keeps what it shows. It settles after a moment, so React tries the content
 * again (and the fallback again while that still waits). A promise that never settled would leave
 * nothing to retry where there is no DOM to keep: a boundary React renders afresh in the browser
 * after a hydration mismatch, whose content waits for the web fonts, would stay empty for good.
 */
const RETRY_MS = 100;
let retry: Promise<void> | undefined;
function retrySoon(): Promise<void> {
  return (retry ??= new Promise((resolve) => setTimeout(() => { retry = undefined; resolve(); }, RETRY_MS)));
}
function KeepDomFallback(): ReactNode {
  if (!isBrowser) return <div hidden dangerouslySetInnerHTML={{ __html: "<!-- SuspenseThatPreservesDOM fallback rendered -->" }} />;
  throw retrySoon();
}

/** Suspense boundary for data loading that never swaps rendered content for a fallback. */
export function ChildrenCanSuspend({ children }: { children?: ReactNode }) {
  return <Suspense fallback={<KeepDomFallback />}>{children}</Suspense>;
}

class ClientErrorBoundary extends ReactComponent<{ fallback: ReactNode; message: string; children?: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_error: unknown, info: { componentStack?: string | null }) {
    console.error(this.props.message, info?.componentStack);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/** Older containers without scope/node ids just hide a crashed component. */
class DeprecatedContainerErrorBoundary extends ReactComponent<{ children?: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  componentDidCatch(_error: unknown, info: { componentStack?: string | null }) {
    console.error("Error in component (see previous log). This component has been hidden.", info?.componentStack);
    this.setState({ hasError: true });
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function crashMessage(kind: "component" | "override", scopeId?: string, nodeId?: string) {
  return `A code ${kind} crashed while rendering (code-crash:${scopeId}:${nodeId}).`;
}

/**
 * Server: a Suspense boundary (SSR turns render errors into its fallback and lets
 * the client retry). Client: the DOM-preserving boundary plus an error boundary.
 */
function CodeBoundary({ fallback, message, children }: { fallback: ReactNode; message: string; children: ReactNode }) {
  const guarded = (
    <ClientErrorBoundary fallback={fallback} message={message}>
      {children}
    </ClientErrorBoundary>
  );
  if (!isBrowser) return <Suspense fallback={fallback}>{guarded}</Suspense>;
  return (
    <ChildrenCanSuspend>
      <AfterWebFonts>{guarded}</AfterWebFonts>
    </ChildrenCanSuspend>
  );
}

/**
 * During the page's first FONT_WAIT_MS, code renders once the web fonts that are loading have
 * loaded: components and overrides often measure their text once at mount (line breaks,
 * widths), and on the published site the original runtime's larger bundle reaches them after the fonts.
 * Checked as each boundary renders (fonts start loading as stylesheets apply, and breakpoint
 * variants mount right after hydration); the server HTML stays meanwhile.
 */
const FONT_WAIT_MS = 3000;
const fontWaits = new WeakMap<Promise<unknown>, Promise<unknown>>();

function AfterWebFonts({ children }: { children: ReactNode }) {
  const remaining = FONT_WAIT_MS - performance.now();
  if (remaining > 0 && document.fonts?.status === "loading") {
    // One wait per loading round (`ready` is a new promise each round), so retries find it settled.
    const ready = document.fonts.ready;
    let wait = fontWaits.get(ready);
    if (!wait) fontWaits.set(ready, (wait = Promise.race([ready, new Promise((resolve) => setTimeout(resolve, remaining))])));
    return <AwaitWebFonts wait={wait}>{children}</AwaitWebFonts>;
  }
  return children;
}

// Keep use() unconditional within the component that suspends. The loading
// status/deadline can change before a retry: dropping use() in that same fiber
// violates React's suspended-render contract when a boundary mounts later.
function AwaitWebFonts({ wait, children }: { wait: Promise<unknown>; children: ReactNode }) {
  use(wait);
  return children;
}

interface BoundaryProps {
  scopeId?: string;
  nodeId?: string;
  isAuthoredByUser?: boolean;
  isModuleExternal?: boolean;
  inComponentSlot?: boolean;
}

function useCodeBoundary(children: ReactNode, { scopeId, nodeId, isAuthoredByUser, isModuleExternal, inComponentSlot }: BoundaryProps): ReactNode {
  const nearest = useContext(ExternalComponentContext);
  if (scopeId === undefined || nodeId === undefined) return <DeprecatedContainerErrorBoundary>{children}</DeprecatedContainerErrorBoundary>;
  const local = isLocalNode(scopeId, nearest, !!inComponentSlot);
  if (local && (isModuleExternal || isAuthoredByUser)) {
    children = (
      <CodeBoundary fallback={null} message={crashMessage("component", scopeId, nodeId)}>
        {children}
      </CodeBoundary>
    );
  }
  if (isModuleExternal) {
    children = (
      <IsExternalComponent scopeId={scopeId} nodeId={nodeId}>
        {children}
      </IsExternalComponent>
    );
  }
  return children;
}

/**
 * Applies a code override to a component. Overrides defined in this project are
 * wrapped in a boundary that falls back to the un-overridden component.
 */
export function withCodeBoundaryForOverrides<T extends ComponentType<any>>(
  Base: T,
  { scopeId, nodeId, override, inComponentSlot }: { scopeId?: string; nodeId?: string; override: (component: any) => ComponentType<any>; inComponentSlot?: boolean },
): ComponentType<any> {
  let Overridden: ComponentType<any> | undefined;
  let failure: unknown;
  try {
    Overridden = override(Base);
  } catch (error) {
    failure = error;
  }
  const Plain = Base as ComponentType<any>;
  // An override is usually a plain function component, which React 18 never
  // handed a ref (see jsx-runtime.ts); it keeps its own ref to the layer.
  const overrideRef = (ref: unknown) => (Overridden && canHoldRef(Overridden) ? { ref } : {});
  const WithOverride = forwardRef<unknown, Props>(function CodeBoundaryForOverrides(props, ref) {
    const nearest = useContext(ExternalComponentContext);
    const context = useContext(GeneratedComponentContext);
    const local = isLocalNode(scopeId, nearest, !!inComponentSlot);
    let content: ReactNode;
    if (!Overridden) {
      if (!local) throw failure;
      // Inside the boundary all the same: an override that only fails on the server (it reads
      // `window` as it wraps, onliftoff's withLogoLink) renders in it in the browser, and the
      // server HTML must have the same Suspense boundary to hydrate.
      content = (
        <CodeBoundary fallback={<Plain {...props} ref={ref} />} message={crashMessage("override", scopeId, nodeId)}>
          <Plain {...props} ref={ref} />
        </CodeBoundary>
      );
    } else if (!local) content = <Overridden {...props} {...overrideRef(ref)} />;
    else content = (
      <CodeBoundary fallback={<Plain {...props} ref={ref} />} message={crashMessage("override", scopeId, nodeId)}>
        <Overridden {...props} {...overrideRef(ref)} />
      </CodeBoundary>
    );
    // An override can wrap the original layer or return siblings beside it. When
    // that layer's breakpoint branch is absent, all of its override output must
    // go too. Inert markers delimit it without adding a layout/selector wrapper.
    const hidden = hiddenLayerClassNames(props.className, context);
    // Keep three child positions on both sides so useId inside content remains
    // stable. The pruner removes the server markers, including on visible branches.
    return hidden ? <>{!isBrowser && <template data-breakpoint-override-start="" className={hidden} />}{content}{!isBrowser && <template data-breakpoint-override-end="" />}</> : content;
  });
  if (failure) console.error(failure, crashMessage("override", scopeId, nodeId));
  return WithOverride;
}

/** Whether React 18 attaches a ref to this component type (anything but a plain function component). */
export function canHoldRef(type: unknown): boolean {
  return typeof type !== "function" || !!(type as { prototype?: { isReactComponent?: unknown } }).prototype?.isReactComponent;
}

// ---------------------------------------------------------------------------
// Containers: the `*-container` wrappers around component instances.

/** Strips the editor-only layout id inputs; published sites use explicit layoutIds. */
export function withGeneratedLayoutId<T extends ComponentType<any>>(Inner: T): T {
  const C = Inner as ComponentType<any>;
  const WithLayoutId = forwardRef<unknown, Props>(function WithGeneratedLayoutId(props, ref) {
    return <C {...props} layoutIdKey={undefined} duplicatedFrom={undefined} ref={ref} />;
  });
  return WithLayoutId as unknown as T;
}

function motionTag(tag: string | undefined): any {
  return (motion as any)[tag ?? "div"] ?? motion.div;
}

const ContainerInner = forwardRef<unknown, Props>(function Container(
  { children, layoutId, as, scopeId, nodeId, isAuthoredByUser, isModuleExternal, inComponentSlot, layoutIdKey, duplicatedFrom, rendersWithMotion, ...props },
  ref,
) {
  useRegisterBreakpointClassNames();
  const outerLayoutId = useConstant(() => (layoutId ? `${layoutId}-container` : undefined));
  const MotionTag = motionTag(as);
  // The instance inside takes the container's layout id (undefined clears its own).
  const instances = Children.map(children, (child) => (isValidElement(child) ? cloneElement(child as any, { layoutId }) : child));
  const content = useCodeBoundary(instances, { scopeId, nodeId, isAuthoredByUser, isModuleExternal, inComponentSlot });
  return (
    <MotionTag layoutId={outerLayoutId} {...props} ref={ref}>
      <LayoutGroup id={layoutId ?? ""} inherit={props.layout ? true : "id"}>
        {content}
      </LayoutGroup>
    </MotionTag>
  );
});

/** `<div class="df-xxx-container">` around a code or component instance. */
export const Container = withGeneratedLayoutId(ContainerInner);

/** Container variant used inside smart components; renders a motion element only when needed. */
export const SmartComponentScopedContainer = forwardRef<unknown, Props>(function SmartComponentScopedContainer(props, ref) {
  const { as, children, scopeId, nodeId, isAuthoredByUser, rendersWithMotion, isModuleExternal, inComponentSlot, ...rest } = props;
  useRegisterBreakpointClassNames();
  const content = useCodeBoundary(children, { scopeId, nodeId, isAuthoredByUser, isModuleExternal, inComponentSlot });
  if (rendersWithMotion) {
    const MotionTag = motionTag(as);
    return (
      <MotionTag {...rest} ref={ref} style={props.style}>
        {content}
      </MotionTag>
    );
  }
  const { layoutId, layoutDependency, ...domProps } = rest;
  const Tag = (as ?? "div") as any;
  return (
    <Tag {...domProps} ref={ref} style={props.style}>
      {content}
    </Tag>
  );
});

/** Renders `Component` with the remaining props. */
export const Instance = forwardRef<unknown, Props>(function Instance({ Component, ...props }, ref) {
  return Component ? <Component {...props} ref={ref} /> : null;
});

// ---------------------------------------------------------------------------
// Loaders, props mapping, presets

/** Runs a component's data loader (`Component.loader.load`) if it has one. */
export function forwardLoader(component: any, props?: unknown, context?: unknown): Promise<unknown> {
  const loader = component?.loader;
  return loader ? loader.load(props, context) : Promise.resolve(undefined);
}

/** Renames generated prop ids to their readable names using the module's `variables` annotation. */
export function withMappedReactProps<T extends ComponentType<any>>(Inner: T, info: any): ComponentType<any> {
  let mapping: Record<string, string> | undefined;
  try {
    const json = info?.__metadata__?.exports?.default?.annotations?.variables;
    mapping = json ? JSON.parse(json) : undefined;
  } catch {
    mapping = undefined;
  }
  const C = Inner as ComponentType<any>;
  return function MappedProps(rawProps: Props) {
    const props: Props = {};
    for (const key in rawProps) props[mapping?.[key] ?? key] = rawProps[key];
    return <C {...props} />;
  };
}

const ComponentPresetsContext = createContext<Record<string, Props>>({});

/** Site-wide default props for code components (e.g. YouTube), keyed by component identifier. */
export function ComponentPresetsProvider({ presets, children }: { presets: Record<string, Props>; children?: ReactNode }) {
  const stable = useRef(presets);
  if (JSON.stringify(presets) !== JSON.stringify(stable.current)) stable.current = presets;
  return <ComponentPresetsContext.Provider value={stable.current}>{children}</ComponentPresetsContext.Provider>;
}

export function ComponentPresetsConsumer({ componentIdentifier, children }: { componentIdentifier: string; children: (presetProps: Props) => ReactNode }) {
  const presets = useContext(ComponentPresetsContext);
  return <>{children(presets[componentIdentifier] ?? {})}</>;
}

// ---------------------------------------------------------------------------
// Refs

/** Stable refs created on demand by key (for dynamically generated layers). */
export function useDynamicRefs<T = any>() {
  const refs = useConstant(() => new Map<string, RefObject<T | null>>());
  return useCallback((key: string) => {
    let ref = refs.get(key);
    if (!ref) refs.set(key, (ref = createRef<T>()));
    return ref;
  }, []);
}

const siteRefs = new Map<string, RefObject<unknown>>();

/** Like useDynamicRefs, but shared by every component on the current page. */
export function useSiteRefs<T = any>() {
  const router = useContext(RouterContext);
  const page = router ? `${router.currentRouteId}:${JSON.stringify(router.currentPathVariables ?? {})}` : "";
  return useCallback(
    (key?: string) => {
      if (!key) return undefined;
      const id = `${page}-${key}`;
      let ref = siteRefs.get(id);
      if (!ref) siteRefs.set(id, (ref = createRef()));
      return ref as RefObject<T | null>;
    },
    [page],
  );
}
