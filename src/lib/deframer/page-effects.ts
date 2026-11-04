"use client";

// Page transitions (the original runtime's "page effects").
//
// A site can animate client-side navigations with the View Transitions
// API: the outgoing page (::view-transition-old(root)) plays the "exit" effect
// and the incoming one (::view-transition-new(root)) the "enter" effect. Each
// effect is a start state (opacity, translate, scale, rotations, optional mask)
// animated to/from rest with a tween or a spring. A per-route table
// `routes[fromRouteId][toRouteId]` overrides the site-wide `global` effect.
//
// The CSS is generated just before a navigation and removed once it finishes.
// Browsers without document.startViewTransition simply navigate. Reduced motion
// is honoured with a media query, exactly like the original runtime (the swap is instant).

import { spring } from "motion/react";

export interface PageTransitionTiming {
  type?: "tween" | "spring";
  delay?: number;
  duration?: number;
  ease?: number[];
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  durationBasedSpring?: boolean;
}

export interface PageEffectMask {
  type: "wipe" | "blinds" | "circle" | "inset" | "conic";
  angle?: number;
  width?: string;
  x?: string;
  y?: string;
  round?: number;
  sweepAngle?: number;
  angularDirection?: "clockwise" | "counter-clockwise";
}

export interface PageTransitionValues {
  opacity?: number;
  x?: string;
  y?: string;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  rotate3d?: boolean;
  mask?: PageEffectMask;
  transition: PageTransitionTiming;
}

export interface PageEffect {
  enter: PageTransitionValues;
  exit?: PageTransitionValues;
}

export interface SitePageEffects {
  global?: PageEffect;
  routes?: Record<string, Record<string, PageEffect | undefined> | undefined>;
}

/** The effect for a navigation: a route-pair override, else the site default. */
export function pageEffectFor(effects: SitePageEffects | undefined, fromRouteId: string, toRouteId: string): PageEffect | undefined {
  if (!effects) return undefined;
  return effects.routes?.[fromRouteId]?.[toRouteId] || effects.global || undefined;
}

// --- CSS generation ----------------------------------------------------------------

type Side = "enter" | "exit";
type Progress = "start" | "end";

const property = (name: string) => `--view-transition-${name}`;

/** The original runtime's default exit when a site only configures an enter effect. */
const defaultExit: PageTransitionValues = {
  opacity: 1,
  x: "0px",
  y: "0px",
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  transition: { type: "tween", delay: 0, duration: 0.2, ease: [0.27, 0, 0.51, 1], stiffness: 400, damping: 30, mass: 1 },
};

const restValues = { opacity: 1, x: "0px", y: "0px", scale: 1, rotate: 0, rotateX: 0, rotateY: 0 };

function unitOf(value: string | undefined): [number, "px" | "%"] {
  const text = value ?? "0%";
  return [parseFloat(text) || 0, text.endsWith("px") ? "px" : "%"];
}

/** Mask origin in viewport pixels (mask x/y are px or % of the viewport). */
function maskOrigin(mask: PageEffectMask) {
  const [x, xUnit] = unitOf(mask.x);
  const [y, yUnit] = unitOf(mask.y);
  return {
    x: xUnit === "px" ? x : (window.innerWidth * x) / 100,
    y: yUnit === "px" ? y : (window.innerHeight * y) / 100,
  };
}

/** The distance from the far edge, for inset(): "30%" -> "70%", "40px" -> "calc(100% - 40px)". */
function remainder(value: string | undefined) {
  const [amount, unit] = unitOf(value);
  return unit === "px" ? `calc(100% - ${amount}px)` : `${100 - amount}%`;
}

function maskImage(gradient: string) {
  return `mask-image: ${gradient}; -webkit-mask-image: ${gradient};`;
}

function registeredProperty(name: string, syntax: string, initial: string) {
  return `@property ${property(name)} { syntax: '${syntax}'; initial-value: ${initial}; inherits: false; }`;
}

/**
 * Each mask animates one registered custom property (so gradients can interpolate)
 * or a clip-path. The exit side's keyframes are played in reverse (rest -> start).
 */
interface MaskStyle {
  keyframe(mask: PageEffectMask, progress: Progress, side: Side): string;
  styles?(mask: PageEffectMask, side: Side): string;
  property?: string;
}

/** Whether a gradient mask sits at its full extent: the enter's end and the exit's start keyframe. */
const atFullExtent = (progress: Progress, side: Side) => (progress === "end") === (side === "enter");

const masks: Record<PageEffectMask["type"], MaskStyle> = {
  wipe: {
    keyframe: (_mask, progress, side) => `${property("wipe-offset")}: ${atFullExtent(progress, side) ? 1 : 0};`,
    styles(mask, side) {
      const offset = `var(${property("wipe-offset")})`;
      const width = mask.width ?? "0%";
      const [first, second] = side === "exit" ? ["transparent", "black"] : ["black", "transparent"];
      return maskImage(
        `linear-gradient(${(mask.angle ?? 0) + 90}deg, ` +
          `${first} calc(calc(0% - ${width}) + calc(calc(100% + ${width}) * ${offset})), ` +
          `${second} calc(calc(100% + ${width}) * ${offset}))`,
      );
    },
    property: registeredProperty("wipe-offset", "<number>", "0"),
  },
  blinds: {
    keyframe(mask, progress, side) {
      const [, unit] = unitOf(mask.width);
      return `${property("blinds-width")}: ${atFullExtent(progress, side) ? mask.width : `0${unit}`};`;
    },
    styles(mask, side) {
      const width = `var(${property("blinds-width")})`;
      const [first, second] = side === "exit" ? ["transparent", "black"] : ["black", "transparent"];
      return maskImage(
        `repeating-linear-gradient(${(mask.angle ?? 0) + 90}deg, ` +
          `${first} 0px, ${first} ${width}, ${second} ${width}, ${second} ${mask.width})`,
      );
    },
    property: registeredProperty("blinds-width", "<length-percentage>", "0px"),
  },
  circle: {
    keyframe: (_mask, progress) => `${property("circle-progress")}: ${progress === "start" ? 0 : 1};`,
    styles(mask) {
      const { x, y } = maskOrigin(mask);
      // Radius that covers the whole viewport from the origin.
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const edge = `calc(100% * var(${property("circle-progress")}))`;
      return maskImage(`radial-gradient(circle ${radius}px at ${mask.x} ${mask.y}, black ${edge}, transparent ${edge})`);
    },
    property: registeredProperty("circle-progress", "<number>", "0"),
  },
  inset: {
    keyframe: (mask, progress) =>
      progress === "start"
        ? `clip-path: inset(${mask.y} ${remainder(mask.x)} ${remainder(mask.y)} ${mask.x} round ${mask.round ?? 0}px);`
        : `clip-path: inset(0 round 0);`,
  },
  conic: {
    keyframe(mask, progress, side) {
      // Clockwise reveals grow the opaque arc; counter-clockwise ones shrink the transparent arc.
      const clockwise = mask.angularDirection === "clockwise";
      const atSweep = side === "exit" ? clockwise === (progress === "start") : clockwise === (progress === "end");
      return `${property("conic-offset")}: ${atSweep ? ((mask.sweepAngle ?? 360) / 360) * 100 : 0}%;`;
    },
    styles(mask, side) {
      const offset = `var(${property("conic-offset")})`;
      const transparentFirst = (side === "exit") === (mask.angularDirection === "clockwise");
      const [first, second] = transparentFirst ? ["transparent", "black"] : ["black", "transparent"];
      return maskImage(
        `conic-gradient(from ${mask.angle ?? 0}deg at ${mask.x} ${mask.y}, ` +
          `${first} 0%, ${first} ${offset}, ${second} ${offset}, ${second} 100%)`,
      );
    },
    property: registeredProperty("conic-offset", "<percentage>", "0%"),
  },
};

function keyframe(values: Partial<PageTransitionValues>, mask: PageEffectMask | undefined, progress: Progress, side: Side) {
  const v = { ...restValues, ...values };
  const transform =
    `translate(${v.x}, ${v.y}) scale(${v.scale}) ` + `rotateX(${v.rotateX}deg) rotateY(${v.rotateY}deg) rotateZ(${v.rotate}deg)`;
  const maskFrame = mask ? masks[mask.type]?.keyframe(mask, progress, side) ?? "" : "";
  return `opacity: ${v.opacity}; transform: ${transform}; ${maskFrame}`;
}

/** Springs become a CSS linear() easing sampled every 10ms, settling within 10s. */
function springTiming(timing: PageTransitionTiming) {
  const options = timing.durationBasedSpring
    ? { duration: (timing.duration ?? 0.3) * 1000, bounce: timing.bounce }
    : { stiffness: timing.stiffness, damping: timing.damping, mass: timing.mass };
  const generator = (spring as any)({ keyframes: [0, 1], ...options, restDelta: 0.001, restSpeed: 0.0001 });
  const points: number[] = [];
  let state = generator.next(0);
  points.push(state.value);
  let time = 10;
  for (; !state.done && time < 10000; time += 10) {
    state = generator.next(time);
    points.push(state.value);
  }
  if (points.length === 1) points.push(state.value);
  return { duration: `${time - 10}ms`, easing: `linear(${points.join(",")})` };
}

function timingOf(timing: PageTransitionTiming) {
  if (timing.type === "spring") return springTiming(timing);
  if (timing.type === "tween") return { duration: `${timing.duration ?? 0}s`, easing: `cubic-bezier(${(timing.ease ?? [0, 0, 1, 1]).join(",")})` };
  return { duration: "0s", easing: "linear" };
}

/** Keyframes + pseudo-element rules for one side. Enter animates start -> rest, exit rest -> start. */
function sideRules(side: Side, { transition, mask, ...values }: PageTransitionValues) {
  const name = `view-transition-${side}`;
  const { duration, easing } = timingOf(transition);
  const style = mask ? masks[mask.type] : undefined;
  const configured = keyframe(values, mask, "start", side);
  const rest = keyframe(restValues, mask, "end", side);
  const [from, to] = side === "enter" ? [configured, rest] : [rest, configured];
  return `
${mask && style?.property ? style.property : ""}
@keyframes ${name} { 0% { ${from} } 100% { ${to} } }
::view-transition-${side === "enter" ? "new" : "old"}(root) {
  animation-name: ${name};
  animation-duration: ${duration};
  animation-delay: ${transition.delay ?? 0}s;
  animation-timing-function: ${easing};
  animation-fill-mode: both;
  ${mask && style?.styles ? style.styles(mask, side) : ""}
}`;
}

/** The whole stylesheet for one navigation (browser only: masks measure the viewport). */
export function pageTransitionCSS({ enter, exit = defaultExit }: PageEffect): string {
  let css = `
@media (prefers-reduced-motion) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}`;
  // The default cross-fade blends with plus-lighter; masks, fades and delays need normal blending.
  if (exit.mask || enter.mask || exit.opacity || enter.opacity || exit.transition.delay || enter.transition.delay) {
    css += `\n::view-transition-old(*), ::view-transition-new(*) { mix-blend-mode: normal; }`;
  }
  css += `\n::view-transition-old(*), ::view-transition-new(*) { backface-visibility: hidden; }`;
  return css + sideRules("exit", exit) + sideRules("enter", enter);
}

// --- Running a transition ------------------------------------------------------------

const styleId = "view-transition-styles";

export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && typeof (document as any).startViewTransition === "function";
}

function whenIdle(callback: () => void) {
  if (typeof requestIdleCallback === "function") requestIdleCallback(callback);
  else setTimeout(callback, 50);
}

function installStyles(effect: PageEffect) {
  document.getElementById(styleId)?.remove();
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = pageTransitionCSS(effect);
  document.head.appendChild(style);
  return style;
}

/**
 * Runs `update` (which must resolve once the new page has rendered) inside a view
 * transition styled by `effect`. Without an effect or browser support it just updates.
 */
export function runPageTransition(effect: PageEffect | undefined, update: () => Promise<void> | void) {
  if (!effect || !supportsViewTransitions()) {
    void update();
    return undefined;
  }
  const style = installStyles(effect);
  const transition = (document as any).startViewTransition(() => update());
  Promise.all([transition.ready, transition.finished])
    .catch(() => {})
    .then(() => whenIdle(() => style.remove()));
  return transition as { skipTransition(): void; finished: Promise<void>; updateCallbackDone: Promise<void> };
}
