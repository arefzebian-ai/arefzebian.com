"use client";

// Appear-on-load ("optimized appear") and the text appear effect helper.
//
// The original runtime server-renders appear layers in their `initial` state and starts the
// animation from an inline script before hydration; the animation library continues it at
// hydration. So does the kit (effects/appear-script.ts): each appear layer carries its plan, an
// inline script in the head plays it as the page is parsed, and motion takes over at hydration
// (its optimized-appear handoff, keyed by its appear id attribute). Layers the browser can't play
// alone animate at hydration. Reduced motion (when the site opts in through
// <MotionConfig reducedMotion="user">) jumps transforms and fades opacity only, as the library does.

import { forwardRef, useContext, useEffect, useMemo, useRef, type CSSProperties, type RefObject } from "react";
import { ServerInsertedHTMLContext, useServerInsertedHTML } from "../host";
import { animate, frame, inView, MotionConfigContext, optimizedAppearDataAttribute, stagger } from "motion/react";
import { isNumber, useShouldReduceMotion } from "./core";
import { APPEAR_PLAN_ATTRIBUTE, appearPlan, playAppearAnimations } from "./appear-script";
import type { WithAnyProps } from "../types";

/** Requests (by their inserted-HTML context) whose head already has the appear script. */
const scriptSent = new WeakSet<object>();

/** Streams the appear script into the head once per server render. */
function useAppearScript(): void {
  const request = useContext(ServerInsertedHTMLContext) as object | null;
  const { reducedMotion = "never" } = useContext(MotionConfigContext);
  useServerInsertedHTML(() => {
    if (!request || scriptSent.has(request)) return null;
    scriptSent.add(request);
    const args = [optimizedAppearDataAttribute, APPEAR_PLAN_ATTRIBUTE, reducedMotion].map((arg) => JSON.stringify(arg)).join(",");
    return <script dangerouslySetInnerHTML={{ __html: `(${playAppearAnimations.toString()})(${args})` }} />;
  });
}

/**
 * An appear layer: its appear id under the animation library's attribute (which its handoff reads),
 * and, when the codegen marks it `optimized`, the plan the head script plays before hydration.
 */
export const withOptimizedAppearEffect = <T,>(Component: T): WithAnyProps<T> => forwardRef<any, any>(function WithOptimizedAppearEffect({ optimized, "data-appear-id": appearId, ...props }, ref) {
  useAppearScript();
  const plan = optimized && appearId ? appearPlan(props.initial, props.animate, props.style, props.transformTemplate) : undefined;
  const Inner = Component as any;
  const appear = appearId ? { [optimizedAppearDataAttribute]: appearId, ...(plan ? { [APPEAR_PLAN_ATTRIBUTE]: JSON.stringify(plan) } : {}) } : {};
  return <Inner ref={ref} {...props} {...appear} />;
}) as unknown as WithAnyProps<T>;

/**
 * Codegen marks appear targets with `optimizeAppear(prop, id, value)` so the original runtime
 * can collect them for its inline script. The value itself is what matters.
 */
export function optimizeAppear<T>(_prop: string, _id: string, value: T, _variantHash?: string): T {
  return value;
}

export function optimizeAppearTransformTemplate<T>(_id: string, template: T): T {
  return template;
}

// ---------------------------------------------------------------------------
// Text appear effect (RichText `textEffect`)
//
// Usage from RichText:
//
//   const fx = useTextAppearEffect(textEffect, containerRef);
//   // For every token span (character / word / line tokenization) — or, for
//   // "element" tokenization, every block element — render:
//   <span ref={fx.token} style={fx.tokenStyle}>{token}</span>
//
// `fx.tokenization` is the effective tokenization ("character" when unset)
// or undefined when there is no effect. Tokens are played in registration
// (= document) order; "line" groups tokens by their rendered line.

export type TextAppearTokenization = "character" | "word" | "line" | "element";

export interface TextAppearEffectConfig {
  type: "appear";
  effect: Record<string, any>;
  transition?: Record<string, any>;
  startDelay?: number;
  tokenization?: TextAppearTokenization;
  trigger?: "onMount" | "onInView" | "onScrollTarget";
  threshold?: number;
  repeat?: boolean;
  target?: { ref?: RefObject<Element | null>; offset?: number };
}

const TEXT_DEFAULTS: Record<string, number | string> = { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0, filter: "none" };

/** CSS transform for the enter state, written the way the original runtime serialises it. */
function enterTransform(effect: Record<string, any>) {
  const parts: string[] = [];
  if (isNumber(effect.x)) parts.push(`translateX(${effect.x}px)`);
  if (isNumber(effect.y)) parts.push(`translateY(${effect.y}px)`);
  if (isNumber(effect.scale)) parts.push(`scale(${effect.scale})`);
  if (isNumber(effect.rotate)) parts.push(`rotate(${effect.rotate}deg)`);
  if (isNumber(effect.rotateX)) parts.push(`rotateX(${effect.rotateX}deg)`);
  if (isNumber(effect.rotateY)) parts.push(`rotateY(${effect.rotateY}deg)`);
  if (isNumber(effect.skewX)) parts.push(`skewX(${effect.skewX}deg)`);
  if (isNumber(effect.skewY)) parts.push(`skewY(${effect.skewY}deg)`);
  return parts.join(" ");
}

/** Initial inline style of a token (server render and first client render). */
export function textEffectTokenStyle(config: TextAppearEffectConfig | undefined): CSSProperties | undefined {
  if (!config?.effect) return undefined;
  const { effect } = config;
  const enter: CSSProperties = { opacity: effect.opacity, filter: effect.filter, transform: enterTransform(effect) };
  return config.tokenization === "element" ? enter : { display: "inline-block", ...enter };
}

/** [from, to] keyframes for every animatable key of the enter state. */
function textKeyframes(effect: Record<string, any>, reduce: boolean) {
  const keyframes: Record<string, any[]> = {};
  for (const key in effect) {
    if (!(key in TEXT_DEFAULTS) || effect[key] === undefined) continue;
    if (reduce && key !== "opacity") continue;
    keyframes[key] = [effect[key], TEXT_DEFAULTS[key]];
  }
  return keyframes;
}

/** Group tokens into rendered lines (by their top offset). */
function lineGroups(tokens: HTMLElement[]) {
  const groups: HTMLElement[][] = [];
  let lastTop: number | undefined;
  for (const token of tokens) {
    const top = token.offsetTop;
    if (top !== lastTop) groups.push([]);
    groups[groups.length - 1].push(token);
    lastTop = top;
  }
  return groups;
}

/** Play the appear effect on already-rendered tokens. Returns a promise resolved when done. */
export function playTextAppearEffect(tokens: HTMLElement[], config: TextAppearEffectConfig, reduce = false): Promise<unknown> {
  if (tokens.length === 0) return Promise.resolve();
  const { transition = {}, startDelay = 0, tokenization = "character" } = config;
  const keyframes = textKeyframes(config.effect, reduce);
  const delay = transition.delay ?? 0;
  // Reduced motion: tokens keep only the fade, so drop the enter transform now.
  if (reduce) for (const token of tokens) Object.assign(token.style, { transform: "none", filter: "none" });
  if (tokenization !== "line") {
    return Promise.resolve(animate(tokens, keyframes as any, { ...transition, restDelta: 0.001, delay: stagger(delay, { startDelay }) } as any));
  }
  // Lines are groups animated together, so the stagger is applied per group.
  return new Promise((resolve) => {
    frame.read(() => {
      const groups = lineGroups(tokens);
      frame.update(() => {
        const runs = groups.map((group, i) => animate(group, keyframes as any, { ...transition, restDelta: 0.001, delay: startDelay + i * delay } as any));
        void Promise.all(runs).then(resolve);
      });
    });
  });
}

/** Return tokens to the enter state (used when a repeating effect leaves view). */
function resetTokens(tokens: HTMLElement[], config: TextAppearEffectConfig, reduce: boolean) {
  const effect = reduce ? { opacity: config.effect.opacity } : config.effect;
  const target: Record<string, any> = {};
  for (const key in effect) if (key in TEXT_DEFAULTS && effect[key] !== undefined) target[key] = effect[key];
  void animate(tokens, target as any, { ...config.transition, restDelta: 0.001 } as any);
}

/**
 * Hook driving a RichText `textEffect` of type "appear": returns the token
 * initial style and a callback ref to register tokens, and plays the effect
 * on mount / in view / scroll target as configured.
 */
export function useTextAppearEffect(config: TextAppearEffectConfig | undefined, containerRef: RefObject<Element | null>) {
  const tokens = useRef(new Set<HTMLElement>());
  const latest = useRef(config);
  latest.current = config;
  const reduceMotion = useShouldReduceMotion();
  const trigger = config?.trigger ?? "onMount";
  const threshold = config?.threshold;
  const scrollTarget = config?.target;

  useEffect(() => {
    if (!latest.current?.effect) return;
    let animating = false;
    let played = false;
    const list = () => [...tokens.current].filter((token) => token.isConnected);
    const play = () => {
      const effect = latest.current;
      if (!effect?.effect || animating || (played && !effect.repeat)) return;
      played = animating = true;
      const reduce = reduceMotion();
      void playTextAppearEffect(list(), effect, reduce).then(() => { animating = false; });
      // Repeating effects return to the enter state when they leave view.
      return effect.repeat ? () => resetTokens(list(), effect, reduce) : undefined;
    };
    if (trigger === "onMount") {
      play();
      return;
    }
    const element = trigger === "onScrollTarget" ? scrollTarget?.ref?.current : containerRef.current;
    if (!element) return;
    return inView(element, play, {
      amount: threshold ?? 0,
      margin: trigger === "onScrollTarget" && scrollTarget?.offset ? `${scrollTarget.offset}px 0px 0px 0px` : undefined,
    } as any);
  }, [trigger, threshold, scrollTarget, !!config?.effect]);

  return useMemo(() => ({
    tokenization: config?.effect ? (config.tokenization ?? "character") : undefined,
    tokenStyle: textEffectTokenStyle(config),
    token: (element: HTMLElement | null) => {
      if (element) tokens.current.add(element);
    },
  }), [config]);
}
