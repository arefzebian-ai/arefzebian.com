"use client";

// <Floating>: a panel anchored to a trigger element (the original runtime "Overlay" with
// "Relative" positioning — dropdowns, hover cards, popovers). It is portalled
// into #template-overlay / #overlay / <body>, positioned against the anchor's
// bounding box, optionally flipped and clamped to stay on screen, and dismissed
// by an outside click / Escape or — in "safe area" (hover) mode — by the
// pointer leaving the anchor, the panel and the triangle connecting them.

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cancelFrame, frame, motion, motionValue, usePresence, type MotionValue } from "motion/react";
import { ResetOuterLinkContext } from "./route";

// Links inside the panel must not be treated as nested in an outer link (works as a context or a component).
const ResetOuterLink = ResetOuterLinkContext as any;

type Placement = "top" | "right" | "bottom" | "left";
type Alignment = "start" | "center" | "end";
interface Rect { x: number; y: number; width: number; height: number }
interface Point { x: number; y: number }

// ---------------------------------------------------------------------------
// Geometry

const alignmentFraction: Record<Alignment, number> = { start: 0, center: 0.5, end: 1 };
const isVertical = (placement: Placement) => placement === "top" || placement === "bottom";
const opposite: Record<Placement, Placement> = { top: "bottom", bottom: "top", left: "right", right: "left" };

/** Top-left corner of `size` placed on `placement` side of `anchor`, aligned along the other axis. */
function placeAgainst(anchor: Rect, size: Rect, placement: Placement, alignment: Alignment): Point {
  const t = alignmentFraction[alignment];
  if (isVertical(placement)) {
    return {
      x: anchor.x + (anchor.width - size.width) * t,
      y: placement === "top" ? anchor.y - size.height : anchor.y + anchor.height,
    };
  }
  return {
    x: placement === "left" ? anchor.x - size.width : anchor.x + anchor.width,
    y: anchor.y + (anchor.height - size.height) * t,
  };
}

/** Keep a span on screen: push it in from the start edge, else pull it back from the end edge. */
function clampToViewport(start: number, length: number, viewport: number, padding = 0): number {
  if (start < padding) return padding;
  if (start + length + padding > viewport) return viewport - length - padding;
  return start;
}

interface PlacementOptions {
  placement: Placement;
  alignment: Alignment;
  offset: Point;
  /** Viewport size when collision detection is on. */
  viewport?: { width: number; height: number };
  padding?: number;
}

/**
 * Where the panel goes. With collision detection, a panel overflowing the
 * viewport on its main axis flips to the opposite side (mirroring that axis'
 * offset), then both axes are clamped inside the viewport.
 */
function computeFloatingRect(anchor: Rect, size: Rect, options: PlacementOptions): [Placement, Rect] {
  const { alignment, offset, viewport, padding } = options;
  let placement = options.placement;
  const preferred = placeAgainst(anchor, size, placement, alignment);
  const rect = { x: preferred.x + offset.x, y: preferred.y + offset.y, width: size.width, height: size.height };
  if (!viewport) return [placement, rect];

  let { x: dx, y: dy } = offset;
  const overflowsY = rect.y < 0 || rect.y + rect.height > viewport.height;
  const overflowsX = rect.x < 0 || rect.x + rect.width > viewport.width;
  if (isVertical(placement) ? overflowsY : overflowsX) {
    placement = opposite[placement];
    if (isVertical(placement)) dy = -dy;
    else dx = -dx;
  }
  const flipped = placeAgainst(anchor, size, placement, alignment);
  return [
    placement,
    {
      x: clampToViewport(flipped.x + dx, size.width, viewport.width, padding),
      y: clampToViewport(flipped.y + dy, size.height, viewport.height, padding),
      width: size.width,
      height: size.height,
    },
  ];
}

/** transform-origin (as fractions) so scale/rotate animations grow out of the anchor side. */
function originFor(placement: Placement = "bottom", alignment: Alignment = "center"): Point {
  const t = alignmentFraction[alignment];
  switch (placement) {
    case "top": return { x: t, y: 1 };
    case "bottom": return { x: t, y: 0 };
    case "left": return { x: 1, y: t };
    case "right": return { x: 0, y: t };
  }
}

// --- Safe area: the triangle between the pointer (on the anchor) and the panel's near edge.

/** True when `point` lies inside (or on) the convex polygon `polygon`. */
function convexPolygonContains(polygon: Point[], point: Point): boolean {
  let side: boolean | undefined;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    if ((a.x === point.x && a.y === point.y) || (b.x === point.x && b.y === point.y)) return true;
    const cross = (point.x - a.x) * (b.y - a.y) - (point.y - a.y) * (b.x - a.x);
    if (cross === 0) continue;
    side ??= cross > 0;
    if (side !== cross > 0) return false;
  }
  return true;
}

/** Use `inner` instead of `outer` when `outer` falls inside the triangle formed with `inner` — widest triangle wins. */
const widerCorner = (outer: Point, inner: Point, others: Point[]) => (convexPolygonContains([inner, ...others], outer) ? inner : outer);

const POINTER_GAP = 4;
const ANCHOR_INSET = 5;

function safeAreaTriangle(pointer: Point, placement: Placement, panel: Rect, anchor: Rect): Point[] {
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min + ANCHOR_INSET), max - ANCHOR_INSET);
  const left = panel.x, top = panel.y, right = panel.x + panel.width, bottom = panel.y + panel.height;
  const tl = { x: left, y: top }, bl = { x: left, y: bottom }, tr = { x: right, y: top }, br = { x: right, y: bottom };
  switch (placement) {
    case "bottom": {
      const p = { x: pointer.x, y: clamp(pointer.y + POINTER_GAP, anchor.y, anchor.y + anchor.height) };
      return [p, widerCorner(tl, bl, [p, tr]), widerCorner(tr, br, [p, tl])];
    }
    case "top": {
      const p = { x: pointer.x, y: clamp(pointer.y - POINTER_GAP, anchor.y, anchor.y + anchor.height) };
      return [p, widerCorner(bl, tl, [p, br]), widerCorner(br, tr, [p, bl])];
    }
    case "left": {
      const p = { x: clamp(pointer.x - POINTER_GAP, anchor.x, anchor.x + anchor.width), y: pointer.y };
      return [p, widerCorner(br, bl, [p, tr]), widerCorner(tr, tl, [p, br])];
    }
    case "right": {
      const p = { x: clamp(pointer.x + POINTER_GAP, anchor.x, anchor.x + anchor.width), y: pointer.y };
      return [p, widerCorner(bl, br, [p, tl]), widerCorner(tl, tr, [p, bl])];
    }
  }
}

/** Style for the safe-area element, which lives inside the panel and stretches back over the anchor. */
function safeAreaStyle(pointer: Point, placement: Placement, anchor: Rect, panel: Rect): Partial<CSSStyleDeclaration> {
  const minX = Math.min(anchor.x, panel.x);
  const minY = Math.min(anchor.y, panel.y);
  const width = Math.max(anchor.x + anchor.width, panel.x + panel.width) - minX;
  const height = Math.max(anchor.y + anchor.height, panel.y + panel.height) - minY;
  const points = safeAreaTriangle(pointer, placement, panel, anchor).map((p) => `${p.x - minX}px ${p.y - minY}px`);
  const dx = Math.min(anchor.x - panel.x, 0);
  const dy = Math.min(anchor.y - panel.y, 0);
  const inset = {
    left: `${dy}px auto auto 0px`,
    right: `${dy}px 0px auto auto`,
    top: `0px auto auto ${dx}px`,
    bottom: `auto auto 0px ${dx}px`,
  }[placement];
  return { width: `${width}px`, height: `${height}px`, clipPath: `polygon(${points.join(", ")})`, inset };
}

// ---------------------------------------------------------------------------
// DOM helpers

/** A panel anchored inside fixed content must be fixed too; scrolling ancestors need continuous tracking. */
function inspectAnchorAncestors(anchor: HTMLElement) {
  let position: "absolute" | "fixed" = "absolute";
  let scrolls = false;
  for (let el: HTMLElement | null = anchor; el && el.tagName !== "BODY"; el = el.parentElement) {
    if (getComputedStyle(el).position === "fixed") position = "fixed";
    if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) scrolls = true;
    if (scrolls && position === "fixed") break;
  }
  return { position, scrolls };
}

function portalContainer(selector: string | undefined): Element {
  const custom = selector ? document.querySelector(selector) : null;
  return custom ?? document.getElementById("template-overlay") ?? document.getElementById("overlay") ?? document.body;
}

/**
 * Open floating panels register with their parent panel, so a hover panel
 * isn't dismissed while the pointer is inside a nested child panel.
 */
const FloatingStackContext = createContext<Set<HTMLElement>>(new Set());

// ---------------------------------------------------------------------------
// Component

export interface FloatingProps {
  /** Generated components pass their forwarded ref (\`ref ?? ref1\`), which may be a callback: nothing to measure then. */
  anchorRef: RefObject<HTMLElement | null> | ((instance: any) => void);
  placement?: Placement;
  alignment?: Alignment;
  offsetX?: number;
  offsetY?: number;
  /** Hover mode: dismiss when the pointer leaves anchor + panel + the triangle between them. */
  safeArea?: boolean;
  collisionDetection?: boolean;
  collisionDetectionPadding?: number;
  zIndex?: number;
  className?: string;
  portalSelector?: string;
  onDismiss?: () => void;
  children?: ReactNode;
  [prop: string]: any;
}

const NO_ANCHOR: RefObject<HTMLElement | null> = { current: null };

export function Floating({
  anchorRef: anchor,
  placement,
  alignment,
  offsetX,
  offsetY,
  safeArea,
  collisionDetection = false,
  collisionDetectionPadding,
  zIndex,
  className,
  portalSelector,
  onDismiss,
  children,
  ...rest
}: FloatingProps) {
  const anchorRef = typeof anchor === "function" || !anchor ? NO_ANCHOR : anchor;
  const panelRef = useRef<HTMLDivElement>(null);
  const safeAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<{ x: MotionValue<number>; y: MotionValue<number> }>(null);
  if (!originRef.current) {
    const initial = originFor(placement, alignment);
    originRef.current = { x: motionValue(initial.x), y: motionValue(initial.y) };
  }
  const origin = originRef.current;

  usePanelPosition({ anchorRef, panelRef, safeAreaRef, contentRef, origin, placement, alignment, offsetX, offsetY, safeArea, collisionDetection, collisionDetectionPadding });
  const childPanels = useDismissal({ anchorRef, panelRef, safeAreaRef, safeArea, onDismiss });

  if (typeof document === "undefined") return null;
  return createPortal(
    <motion.div
      ref={panelRef}
      className={className}
      // Hidden at the top-left until the layout effect has measured and placed it.
      style={{ top: 0, left: 0, visibility: "hidden", width: "auto", height: "auto", position: "absolute", zIndex }}
      {...rest}
    >
      {safeArea ? (
        <div ref={safeAreaRef} style={{ position: "absolute" }} data-safearea />
      ) : (
        <div style={{ position: "fixed", inset: 0 }} aria-hidden onClick={onDismiss} />
      )}
      <FloatingStackContext.Provider value={childPanels}>
        <ResetOuterLink value={undefined}>
          <div ref={contentRef}>{withTransformOrigin(children, origin)}</div>
        </ResetOuterLink>
      </FloatingStackContext.Provider>
    </motion.div>,
    portalContainer(portalSelector),
  );
}

function withTransformOrigin(child: ReactNode, origin: { x: MotionValue<number>; y: MotionValue<number> }) {
  if (!isValidElement<{ style?: unknown }>(child)) return null;
  const { style } = child.props;
  if (style !== undefined && (typeof style !== "object" || style === null)) return null;
  return cloneElement(child as any, { style: { ...(style as object), originX: origin.x, originY: origin.y } });
}

interface PositionArgs {
  anchorRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  safeAreaRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  origin: { x: MotionValue<number>; y: MotionValue<number> };
  placement?: Placement;
  alignment?: Alignment;
  offsetX?: number;
  offsetY?: number;
  safeArea?: boolean;
  collisionDetection: boolean;
  collisionDetectionPadding?: number;
}

/** Measure the anchor, place the panel, and keep it placed while ancestors scroll or the pointer moves. */
function usePanelPosition(args: PositionArgs) {
  const { anchorRef, panelRef, safeAreaRef, contentRef, origin, placement, alignment, offsetX, offsetY, safeArea, collisionDetection, collisionDetectionPadding } = args;
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (!anchor || !content || !placement || !alignment) return;

    const { position, scrolls } = inspectAnchorAncestors(anchor);
    const size = content.getBoundingClientRect(); // measured once, before any enter animation transforms it
    const options: PlacementOptions = {
      placement,
      alignment,
      offset: { x: offsetX ?? 0, y: offsetY ?? 0 },
      viewport: collisionDetection ? { width: window.innerWidth, height: window.innerHeight } : undefined,
      padding: collisionDetectionPadding,
    };

    let disposed = false;
    let anchorRect: Rect = anchor.getBoundingClientRect();
    let [currentPlacement, panelRect] = computeFloatingRect(anchorRect, size, options);
    let scroll = { x: 0, y: 0 };
    let pointer: Point | undefined; // the safe area is only drawn once the pointer has moved over the anchor

    const measure = () => {
      if (disposed) return;
      scroll = position === "fixed" ? { x: 0, y: 0 } : { x: window.scrollX, y: window.scrollY };
      anchorRect = anchor.getBoundingClientRect();
      [currentPlacement, panelRect] = computeFloatingRect(anchorRect, size, options);
    };
    const updateOrigin = () => {
      if (disposed) return;
      const next = originFor(currentPlacement, alignment);
      origin.x.set(next.x);
      origin.y.set(next.y);
    };
    const render = () => {
      if (disposed || !panelRef.current) return;
      Object.assign(panelRef.current.style, {
        position,
        visibility: "visible",
        left: `${panelRect.x + scroll.x}px`,
        top: `${panelRect.y + scroll.y}px`,
      });
      if (safeArea && pointer && safeAreaRef.current) Object.assign(safeAreaRef.current.style, safeAreaStyle(pointer, currentPlacement, anchorRect, panelRect));
    };

    measure();
    updateOrigin();
    render();

    // Inside a scroll container the anchor moves without window scroll events: track it every frame.
    const track = () => { measure(); frame.render(render); };
    if (scrolls) frame.read(track, true);

    const onPointerMove = (event: MouseEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      frame.read(measure);
      frame.update(updateOrigin);
      frame.render(render);
    };
    if (safeArea) anchor.addEventListener("mousemove", onPointerMove);

    return () => {
      disposed = true;
      cancelFrame(track);
      anchor.removeEventListener("mousemove", onPointerMove);
    };
  }, [anchorRef, panelRef, safeAreaRef, contentRef, origin, placement, alignment, offsetX, offsetY, safeArea, collisionDetection, collisionDetectionPadding]);
}

interface DismissArgs {
  anchorRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  safeAreaRef: RefObject<HTMLDivElement | null>;
  safeArea?: boolean;
  onDismiss?: () => void;
}

/** Presence bookkeeping and dismissal (Escape, or pointer leaving the hover safe area). */
function useDismissal({ anchorRef, panelRef, safeAreaRef, safeArea, onDismiss }: DismissArgs) {
  const childPanels = useRef<Set<HTMLElement>>(null);
  childPanels.current ??= new Set();
  const parentPanels = useContext(FloatingStackContext);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (isPresent) {
      panel.style.pointerEvents = "";
      parentPanels.add(panel);
      return;
    }
    // Exiting: let the exit animation run without catching the pointer.
    panel.style.pointerEvents = "none";
    parentPanels.delete(panel);
    safeToRemove?.();
  }, [isPresent, safeToRemove, panelRef, parentPanels]);

  useEffect(() => {
    if (!onDismiss) return;
    if (!safeArea) {
      const onKeyUp = (event: KeyboardEvent) => {
        if (event.key === "Escape") onDismiss();
      };
      window.addEventListener("keyup", onKeyUp);
      return () => window.removeEventListener("keyup", onKeyUp);
    }
    let latest: MouseEvent | undefined;
    const check = () => {
      if (!latest || childPanels.current!.size > 0) return;
      const keep = [anchorRef.current, panelRef.current, safeAreaRef.current];
      for (const element of document.elementsFromPoint(latest.clientX, latest.clientY)) {
        if (keep.includes(element as HTMLElement)) return;
      }
      onDismiss();
    };
    const onMouseMove = (event: MouseEvent) => {
      latest = event;
      frame.read(check);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelFrame(check);
    };
  }, [onDismiss, safeArea, anchorRef, panelRef, safeAreaRef]);

  return childPanels.current;
}
