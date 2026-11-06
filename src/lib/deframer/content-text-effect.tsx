"use client";

// Text "appear" effects of RichText (`effect={{ type: "appear", tokenization, trigger, … }}`).
// Text is split into characters / words / lines (or whole blocks for "element"),
// each token is server-rendered with the effect's start style, and the tokens
// animate to their resting state on mount, when the text scrolls into view, or
// when a scroll target becomes visible. Same markup as the original runtime:
//   <span style="white-space:nowrap"><span style="display:inline-block;opacity:0.001;transform:…">c</span>…</span>

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { animate, frame, inView, stagger, useReducedMotionConfig } from "motion/react";

export type Tokenization = "character" | "word" | "line" | "element";

export interface TextEffect {
  type: "appear";
  tokenization?: Tokenization;
  trigger?: "onMount" | "onInView" | "onScrollTarget";
  target?: { ref?: RefObject<Element | null>; offset?: number };
  threshold?: number;
  effect?: Record<string, any>;
  transition?: Record<string, any>;
  startDelay?: number;
  repeat?: boolean;
}

export interface Tokenizer {
  text(text: string): ReactNode;
  props(style: CSSProperties | undefined): { ref: (el: HTMLElement | null) => void; style: CSSProperties } | undefined;
}

/** Resting values every animated property returns to. */
const restingValues: Record<string, number | string> = {
  opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0, filter: "none",
};

function keyframesFor(effect: Record<string, any>, reduceMotion: boolean) {
  const keyframes: Record<string, [unknown, unknown]> = {};
  for (const key in effect) {
    if (!(key in restingValues) || effect[key] === undefined) continue;
    if (reduceMotion && key !== "opacity") continue;
    keyframes[key] = [effect[key], restingValues[key]];
  }
  return keyframes;
}

function transformString(effect: Record<string, any>): string {
  const parts: string[] = [];
  const num = (key: string) => typeof effect[key] === "number";
  if (num("x")) parts.push(`translateX(${effect.x}px)`);
  if (num("y")) parts.push(`translateY(${effect.y}px)`);
  if (num("scale")) parts.push(`scale(${effect.scale})`);
  if (num("rotate")) parts.push(`rotate(${effect.rotate}deg)`);
  if (num("rotateX")) parts.push(`rotateX(${effect.rotateX}deg)`);
  if (num("rotateY")) parts.push(`rotateY(${effect.rotateY}deg)`);
  if (num("skewX")) parts.push(`skewX(${effect.skewX}deg)`);
  if (num("skewY")) parts.push(`skewY(${effect.skewY}deg)`);
  return parts.join(" ");
}

/** Start style of every token; once the effect has played (and won't replay) tokens render at rest. */
function initialTokenStyle(config: TextEffect, canAnimate: boolean): CSSProperties | undefined {
  const effect = config.effect;
  if (!effect) return undefined;
  if (config.tokenization === "element") {
    return canAnimate ? { opacity: effect.opacity, filter: effect.filter, transform: transformString(effect) } : undefined;
  }
  if (!canAnimate) return { display: "inline-block" };
  return { display: "inline-block", opacity: effect.opacity, filter: effect.filter, transform: transformString(effect) };
}

// Splits on grapheme-ish units so emoji sequences and flags stay together.
const characterPattern = /\p{Regional_Indicator}{2}|\p{Emoji}\p{Emoji_Modifier}?\p{Variation_Selector}?(?:‍\p{Emoji}\p{Emoji_Modifier}?\p{Variation_Selector}?)*|./gu;

function tokenizeText(text: string, tokenization: Tokenization, register: () => (el: HTMLElement | null) => void, style: CSSProperties | undefined): ReactNode {
  const words = text.split(" ");
  const last = words.length - 1;
  switch (tokenization) {
    case "character":
    case "line":
      // Lines are found after layout by grouping characters on the same offsetTop.
      return words.map((word, index) => (
        <Fragment key={word + index + (index === last)}>
          {/* Always nowrap: per-letter inline-blocks otherwise wrap mid-word (e.g. "visualization"). */}
          <span style={{ whiteSpace: "nowrap" }}>
            {word.match(characterPattern)?.map((char, i) => (
              <span key={char + i} ref={register()} style={style}>
                {char}
              </span>
            ))}
          </span>
          {index === last ? null : " "}
        </Fragment>
      ));
    case "word":
      return words.map((word, index) => (
        <Fragment key={word + index + (index === last)}>
          <span ref={register()} style={style}>
            {word}
          </span>
          {index === last ? null : " "}
        </Fragment>
      ));
    default:
      return text;
  }
}

function lineGroups(elements: HTMLElement[]): HTMLElement[][] {
  const groups: HTMLElement[][] = [];
  let current: HTMLElement[] = [];
  let lastTop: number | null = null;
  for (const element of elements) {
    const top = element.offsetTop;
    const height = element.offsetHeight;
    if (!height || lastTop === null || top === lastTop) current.push(element);
    else {
      groups.push(current);
      current = [element];
    }
    if (height) lastTop = top;
  }
  groups.push(current);
  return groups;
}

function runAppear(config: TextEffect, elements: HTMLElement[], reduceMotion: boolean, done: () => void): () => void {
  const effect = config.effect ?? {};
  const transition = config.transition ?? {};
  const startDelay = config.startDelay ?? 0;
  const step = transition.delay ?? 0;
  if (reduceMotion) {
    // Only opacity animates; drop the server-rendered offsets right away.
    for (const element of elements) element.style.transform = element.style.filter = "";
  }
  const enter = keyframesFor(effect, reduceMotion);
  const leave = reduceMotion ? { opacity: effect.opacity } : effect;
  let groups: HTMLElement[][] = [];
  let cancelled = false;

  if (config.tokenization === "line") {
    frame.read(() => {
      if (cancelled) return;
      groups = lineGroups(elements);
      frame.update(() => {
        const animations = groups.map((group, i) => animate(group, enter as any, { ...transition, restDelta: 0.001, delay: startDelay + i * step }));
        void Promise.all(animations).then(done);
      });
    });
  } else {
    groups = [elements];
    void animate(elements, enter as any, { ...transition, restDelta: 0.001, delay: stagger(step, { startDelay }) }).then(done);
  }

  // Leaving the viewport with `repeat` plays the effect backwards.
  return () => {
    cancelled = true;
    if (!config.repeat) return;
    if (config.tokenization === "line") {
      groups.forEach((group, i) => void animate(group, leave, { ...transition, restDelta: 0.001, delay: startDelay + i * step }));
    } else if (elements.length) {
      void animate(elements, leave, { ...transition, restDelta: 0.001, delay: stagger(step, { startDelay }) });
    }
  };
}

/** Returns a tokenizer factory for RichText; plays the effect after mount. */
export function useTextEffect(config: TextEffect | undefined, containerRef: RefObject<HTMLElement | null>) {
  const reduceMotion = !!useReducedMotionConfig();
  // Register committed DOM nodes only. A render (including a discarded StrictMode
  // useMemo calculation) must never replace the list owned by committed refs.
  const elements = useRef(new Set<HTMLElement>());
  const state = useRef({ hasMounted: false, hasAnimatedOnce: false, isAnimating: false, effect: config, reduceMotion });
  state.current.effect = config;
  state.current.reduceMotion = reduceMotion;

  const trigger = config?.trigger ?? "onMount";
  const target = config?.target;
  const threshold = config?.threshold;
  const enabled = !!config;
  const tokenization: Tokenization | undefined = config ? config.tokenization ?? "character" : undefined;
  // The original runtime renders each text as one span when the visitor prefers reduced motion
  // (only opacity animates). The server can't know, so switch after hydration; only texts with an
  // effect switch (every text re-rendering once after hydration is wasted work, and on a page with
  // many texts React reports the chain of updates as an update loop).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (enabled && reduceMotion) setHydrated(true);
  }, [enabled, reduceMotion]);
  const collapsed = reduceMotion && hydrated && tokenization !== "element";

  useEffect(() => {
    if (!enabled) return;
    state.current.hasMounted = true;
    const play = () => {
      const current = state.current;
      const effect = current.effect;
      if (!effect || (effect.repeat !== true && current.hasAnimatedOnce) || current.isAnimating) return;
      const list = [...elements.current].sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      if (!list.length) return;
      current.hasAnimatedOnce = true;
      current.isAnimating = true;
      return runAppear({ ...effect, tokenization: effect.tokenization ?? "character" }, list, current.reduceMotion, () => {
        current.isAnimating = false;
      });
    };
    if (trigger === "onMount") {
      play();
      return;
    }
    if (trigger === "onInView") {
      const element = containerRef.current;
      return element ? inView(element, play as any, { amount: threshold ?? 0 }) : undefined;
    }
    if (trigger === "onScrollTarget") {
      const element = target?.ref?.current;
      if (!element) return;
      return inView(element, play as any, {
        amount: threshold ?? 0,
        root: document as any,
        margin: target?.offset ? (`${target.offset}px 0px 0px 0px` as any) : undefined,
      });
    }
  }, [enabled, containerRef, target, threshold, trigger]);

  return useMemo(
    () => ({
      getTokenizer(): Tokenizer | undefined {
        if (!enabled || !tokenization) return undefined;
        const register = () => {
          let attached: HTMLElement | null = null;
          return (el: HTMLElement | null) => {
            if (attached) elements.current.delete(attached);
            attached = el;
            if (el) elements.current.add(el);
          };
        };
        const { hasMounted, hasAnimatedOnce, effect } = state.current;
        // After an onMount effect ran (or a one-shot effect played), new tokens render at rest.
        const settled = (hasMounted && (effect?.trigger ?? "onMount") === "onMount") ||
          (hasAnimatedOnce && !effect?.repeat && (effect?.trigger === "onInView" || effect?.trigger === "onScrollTarget"));
        const style = effect ? initialTokenStyle({ ...effect, tokenization }, !settled) : undefined;
        return {
          text: (text) =>
            collapsed ? (
              <span ref={register()} style={style}>
                {text}
              </span>
            ) : (
              tokenizeText(text, tokenization, register, style)
            ),
          props: (blockStyle) => (tokenization === "element" ? { ref: register(), style: { ...blockStyle, ...style } } : undefined),
        };
      },
    }),
    [enabled, tokenization, collapsed],
  );
}
