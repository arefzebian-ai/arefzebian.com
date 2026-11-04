"use client";

// Custom cursors. Pages register `{ [hash]: cursorDefinition }` maps with
// useCustomCursors(); elements opt in with `data-cursor="<hash>"`. One
// cursor layer follows the pointer, hit-tests the element under it and renders
// that cursor's component (a generated component) with a spring.
//
// The original runtime mounts the layer once at the app root (CustomCursorHost), around its
// router: inside the app shell and the site's MotionConfig, outside the current
// page. If no host is mounted, the first non-empty registration mounts a
// standalone layer in its own React root so cursors still work; that root gets
// the same surroundings from the registering page (AppShellBridge): Next's
// router contexts, which a cursor's links and navigation hooks need, and the
// motion config. Touch-only devices get no cursor, nor sites set to reduce motion
// for visitors who ask for it.

import { Suspense, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ComponentType, type ContextType, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { HostContextsProvider, useHostContexts, type HostContexts } from "./host";
import { animate, cancelFrame, frame, MotionConfigContext, useMotionValue, useReducedMotionConfig, useSpring, useTransform, type Transition } from "motion/react";
import { injectCSS, withCSS } from "./styles";
import { isEmptyObject } from "./interaction-utils";

type Placement = "top" | "right" | "bottom" | "left";
type Alignment = "start" | "center" | "end";

export interface CursorDefinition {
  component: ComponentType<any>;
  variant?: string;
  transition?: Transition;
  offset?: { x: number; y: number };
  /** Positioned next to the pointer instead of replacing the native cursor. */
  placement?: Placement;
  alignment?: Alignment;
}
type CursorMap = Record<string, CursorDefinition>;

const HIDE_NATIVE_CURSOR = "df-cursor-none";
const NO_POINTER_EVENTS = "df-pointer-events-none";
const hostCSS = [
  `.${HIDE_NATIVE_CURSOR}, .${HIDE_NATIVE_CURSOR} * { cursor: none !important; }`,
  `.${NO_POINTER_EVENTS}, .${NO_POINTER_EVENTS} * { pointer-events: none !important; }`,
];

// ---------------------------------------------------------------------------
// Registry — one per document (module singleton; registration only happens in the browser).

const registrations = new Map<string, CursorMap>();
const listeners = new Set<() => void>();
const NO_CURSORS: CursorMap = {};
let activeCursors: CursorMap = NO_CURSORS;
let mountedHosts = 0;
let standalone: { root: Root; element: HTMLElement } | undefined;

function publish(): void {
  const merged: CursorMap = {};
  for (const map of registrations.values()) Object.assign(merged, map);
  activeCursors = isEmptyObject(merged) ? NO_CURSORS : merged;
  for (const listener of listeners) listener();
  if (activeCursors !== NO_CURSORS && mountedHosts === 0 && !standalone) mountStandaloneLayer();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

function mountStandaloneLayer(): void {
  const element = document.createElement("div");
  element.setAttribute("data-cursor-layer", "");
  document.body.appendChild(element);
  const root = createRoot(element);
  root.render(
    <AppShellBridge>
      <CursorLayer />
    </AppShellBridge>,
  );
  standalone = { root, element };
}

// ---------------------------------------------------------------------------
// App shell — what the standalone root needs from the app tree it isn't part of.

/** The contexts around the original runtime's cursor host: the framework's router (links, navigation hooks) and the site's motion config. */
interface AppShell {
  host: HostContexts;
  motion: ContextType<typeof MotionConfigContext>;
}

let appShell: AppShell | undefined;

function useAppShell(): AppShell {
  const host = useHostContexts();
  const motion = useContext(MotionConfigContext);
  return useMemo(() => ({ host, motion }), [host, motion]);
}

/** Provides the registering page's app shell inside the standalone root, following it as it changes (navigation). */
function AppShellBridge({ children }: { children: ReactNode }) {
  const shell = useSyncExternalStore(subscribe, () => appShell, () => undefined);
  if (!shell) return null;
  return (
    <HostContextsProvider value={shell.host}>
      <MotionConfigContext.Provider value={shell.motion}>{children}</MotionConfigContext.Provider>
    </HostContextsProvider>
  );
}

function unmountStandaloneLayer(): void {
  if (!standalone) return;
  const { root, element } = standalone;
  standalone = undefined;
  root.unmount();
  element.remove();
}

/** Register this page's/component's cursors for as long as it is mounted. */
export function useCustomCursors(cursors: CursorMap): void {
  injectCSS(hostCSS); // The original runtime's host stylesheet is present on every published page.
  const id = useId();
  const [definitions] = useState(cursors); // like the original runtime, the first map wins for the component's lifetime
  const shell = useAppShell();
  useLayoutEffect(() => {
    if (isEmptyObject(definitions) || appShell === shell) return;
    appShell = shell; // set before the layer mounts, so it renders inside the shell from its first render
    for (const listener of listeners) listener();
  }, [definitions, shell]);
  useLayoutEffect(() => {
    if (isEmptyObject(definitions)) return; // nothing to show: no listeners, no layer
    registrations.set(id, definitions);
    publish();
    return () => {
      registrations.delete(id);
      publish();
    };
  }, [id, definitions]);
}

/** App-root provider that owns the cursor layer (mount once around the page tree). */
export const CustomCursorHost = withCSS(
  function CustomCursorHost({ children }: { children?: ReactNode }) {
    useLayoutEffect(() => {
      mountedHosts++;
      unmountStandaloneLayer();
      return () => void mountedHosts--;
    }, []);
    return (
      <>
        {children}
        <CursorLayer />
      </>
    );
  },
  hostCSS,
  "df-lib-cursors-host",
);

// ---------------------------------------------------------------------------
// Layer

function CursorLayer() {
  const cursors = useSyncExternalStore(subscribe, () => activeCursors, () => NO_CURSORS);
  // As the original runtime: the site's reduced-motion setting decides (MotionConfig "user" follows the OS, "never" doesn't).
  const reducedMotion = useReducedMotionConfig();
  const canHover = useHoverCapability();
  if (reducedMotion || !canHover || cursors === NO_CURSORS) return null;
  return <CursorFollower cursors={cursors} />;
}

/** False on touch-only devices; starts false so server and first client render agree. */
function useHoverCapability(): boolean {
  const [canHover, setCanHover] = useState(false);
  useLayoutEffect(() => {
    const noHover = window.matchMedia("(any-hover: none)");
    const update = () => setCanHover(!noHover.matches);
    update();
    noHover.addEventListener("change", update);
    return () => noHover.removeEventListener("change", update);
  }, []);
  return canHover;
}

/** Hash of the nearest `data-cursor` ancestor under the point, following portals back to their trigger. */
function cursorHashAt(x: number, y: number): string | undefined {
  let element = document.elementFromPoint(x, y);
  while (element && element !== document.body) {
    const hash = element.getAttribute("data-cursor");
    if (hash) return hash;
    const portalOwner = element.getAttribute("data-portal-id");
    element = (portalOwner && document.getElementById(portalOwner)) || element.parentElement;
  }
  return undefined;
}

const alignmentShift: Record<Alignment, string> = { start: "0%", center: "-50%", end: "-100%" };

/** translate() that puts the cursor beside the pointer (placement) or centres it on the pointer. */
function anchorTranslate(placement: Placement | undefined, alignment: Alignment = "center"): string {
  const shift = alignmentShift[alignment];
  switch (placement) {
    case "top": return `${shift}, -100%`;
    case "right": return `0%, ${shift}`;
    case "bottom": return `${shift}, 0%`;
    case "left": return `-100%, ${shift}`;
    default: return "-50%, -50%";
  }
}

const cursorStyle = { position: "fixed", top: 0, left: 0, zIndex: 13 /* above the original runtime's max z-index */, pointerEvents: "none" } as const;

function CursorFollower({ cursors }: { cursors: CursorMap }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const cursorRef = useRef<HTMLElement>(null);
  const [hash, setHash] = useState<string | undefined>(() => cursorHashAt(pointerX.get(), pointerY.get()));

  // Re-hit-test when the registered cursors change (e.g. after navigation).
  useEffect(() => setHash(cursorHashAt(pointerX.get(), pointerY.get())), [cursors, pointerX, pointerY]);

  useEffect(() => {
    let x = pointerX.get();
    let y = pointerY.get();
    const hitTest = () => setHash(cursorHashAt(x, y));
    const follow = () => {
      pointerX.set(x);
      pointerY.set(y);
      animate(opacity, 1, { type: "tween", duration: 0.2 });
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return cancelFrame(hitTest);
      x = event.clientX;
      y = event.clientY;
      frame.read(hitTest, true);
      frame.update(follow);
    };
    // Hit-tested every frame, as the original runtime does: what lies under a still pointer changes when the
    // page scrolls or a variant swaps (a video that starts playing drops its cursor).
    frame.read(hitTest, true);
    // Taps go to the element under the cursor; mirror them to the cursor so its tap states animate.
    const mirrorToCursor = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      if (!cursor || event.target === cursor) return;
      const copy = new PointerEvent(event.type, {
        bubbles: true,
        cancelable: event.cancelable,
        composed: event.composed,
        pointerType: event.pointerType,
        pointerId: event.pointerId,
        isPrimary: event.isPrimary,
        button: event.button,
        buttons: event.buttons,
      });
      frame.update(() => cursorRef.current?.dispatchEvent(copy));
    };
    const fadeOut = () => void animate(opacity, 0, { type: "tween", duration: 0.2 });

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerdown", mirrorToCursor);
    document.addEventListener("pointerup", mirrorToCursor);
    document.addEventListener("mouseleave", fadeOut);
    window.addEventListener("blur", fadeOut);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", mirrorToCursor);
      document.removeEventListener("pointerup", mirrorToCursor);
      document.removeEventListener("mouseleave", fadeOut);
      window.removeEventListener("blur", fadeOut);
      cancelFrame(hitTest);
      cancelFrame(follow);
    };
  }, [pointerX, pointerY, opacity]);

  const cursor = hash ? cursors[hash] : undefined;
  const replacesNativeCursor = !!cursor && !cursor.placement && !cursor.alignment;
  useLayoutEffect(() => {
    document.body.classList.toggle(HIDE_NATIVE_CURSOR, replacesNativeCursor);
    return () => void document.body.classList.remove(HIDE_NATIVE_CURSOR);
  }, [replacesNativeCursor]);

  const springX = useSpring(pointerX, (cursor?.transition ?? { duration: 0 }) as any);
  const springY = useSpring(pointerY, (cursor?.transition ?? { duration: 0 }) as any);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  useLayoutEffect(() => {
    offsetX.set(cursor?.offset?.x ?? 0);
    offsetY.set(cursor?.offset?.y ?? 0);
  }, [cursor, offsetX, offsetY]);
  const x = useTransform([springX, offsetX], ([a, b]: number[]) => a + b);
  const y = useTransform([springY, offsetY], ([a, b]: number[]) => a + b);

  const translate = anchorTranslate(cursor?.placement, cursor?.alignment);
  const transformTemplate = useCallback((_: unknown, generated: string) => `translate(${translate}) ${generated}`, [translate]);

  if (!cursor?.component) return null;
  const Cursor = cursor.component;
  return (
    <Suspense>
      <Cursor
        ref={cursorRef}
        className={NO_POINTER_EVENTS}
        style={{ ...cursorStyle, x, y, opacity }}
        transformTemplate={transformTemplate}
        globalTapTarget
        variant={cursor.variant}
      />
    </Suspense>
  );
}
