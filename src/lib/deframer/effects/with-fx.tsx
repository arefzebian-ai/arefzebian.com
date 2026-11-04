"use client";

// withFX: the per-layer effects the original runtime encodes as `__fx_*` props.
//
// Each effect family owns its own set of FX motion values; withFX composes
// them per channel (opacity and scale multiply, everything else adds) and
// hands the composites to the wrapped motion component through `style`.
// Server render therefore paints every effect's *initial* state, and the
// effects only start moving once the element is hydrated.
//
//   appear     __fx_styleAppearEffectEnabled, enter/animate/exit, threshold,
//              animateOnce, targets (scroll targets), scrollDirection
//   transform  __fx_styleTransformEffectEnabled, transformTargets,
//              transformTrigger (onScroll | onInView | onScrollTarget),
//              transformViewportThreshold, spring
//   parallax   __fx_parallaxTransformEnabled, speed, offset, adjustPosition
//   loop       __fx_loopEffectEnabled, loop, loopTransition,
//              loopRepeatType (loop | mirror), loopRepeatDelay, loopPauseOffscreen
//   presence   initial/animate/exit objects of layers inside smart components
//              (__smartComponentFX), plus __fx_presence{Initial,Animate,Exit}

import { forwardRef, startTransition, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { animate, frame, isMotionValue, motionValue, transform, usePresence, useTransform, visualElementStore, type MotionValue } from "motion/react";
import {
  FX_DEFAULTS, FX_KEYS, FX_PREFIX, NO_STYLE, WILL_CHANGE, isEqual, isNumber, isObject, isVariantLabel, makeFXValues, observeIntersection,
  onScroll, scrollTargetInputRange, scrollTargetsReady, setFXValues, useAppearInView, useForwardedElementRef, useLatest, useRouteKey,
  useScrollDirectionChange, useShouldReduceMotion, type FXKey, type FXTarget, type FXValues, type ScrollTarget,
} from "./core";
import type { WithAnyProps } from "../types";

type ElementRef = RefObject<Element | null>;
type Effect = { values: FXValues; style: object };

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const useConstant = <T,>(init: () => T): T => {
  const ref = useRef<{ value: T }>(null);
  if (!ref.current) ref.current = { value: init() };
  return ref.current.value;
};

/** Tell motion the resting value so later variant animations start from it. */
function setBaseTarget(element: Element | null, key: FXKey, value: number) {
  const visualElement: any = element ? visualElementStore.get(element) : undefined;
  visualElement?.setBaseTarget(key, value);
}

/** Animate every channel of `values` towards `target` (identity for missing keys). */
function animateFX(values: FXValues, target: FXTarget, transition: any, reduce: boolean, element: Element | null) {
  return Promise.all(FX_KEYS.map((key) => new Promise<void>((resolve) => {
    const to = isNumber(target[key]) ? target[key]! : FX_DEFAULTS[key];
    setBaseTarget(element, key, to);
    // Reduced motion: only opacity animates, transforms jump.
    if (reduce && key !== "opacity") {
      values[key].set(to);
      return resolve();
    }
    animate(values[key], to, { restDelta: key === "scale" ? 0.001 : undefined, ...transition, onComplete: () => resolve() });
  })));
}

/**
 * A breakpoint/variant can switch an effect off after hydration (the server
 * painted the effect's initial state): fall back to the resting values.
 */
function useResetWhenDisabled(values: FXValues, enabled: boolean) {
  useEffect(() => {
    if (!enabled) setFXValues(values, undefined);
  }, [enabled]);
}

// ---------------------------------------------------------------------------
// Appear (in view, scroll targets, scroll direction)

const APPEAR_KEYS = new Set(["threshold", "animateOnce", "opacity", "targetOpacity", "x", "y", "scale", "transition", "rotate", "rotateX", "rotateY", "perspective", "enter", "exit", "animate", "styleAppearEffectEnabled", "targets", "scrollDirection"]);

function appearVariants(options: Record<string, any>) {
  const { opacity, targetOpacity, perspective, enter, exit, animate: animateTarget, transition, threshold, animateOnce, styleAppearEffectEnabled, targets, scrollDirection, ...rest } = options;
  return {
    // Legacy appear props (x/y/scale/...) describe the enter state directly.
    initial: enter ?? { ...rest, opacity: opacity ?? targetOpacity ?? 1, transformPerspective: perspective, transition },
    animate: animateTarget ?? { opacity: targetOpacity },
    exit: exit ?? {},
  } as Record<"initial" | "animate" | "exit", FXTarget>;
}

function useAppearFX(options: Record<string, any>, ref: ElementRef): Effect {
  const enabled = !!options.styleAppearEffectEnabled;
  const variants = appearVariants(options);
  const latestVariants = useLatest(variants);
  const values = useConstant(() => makeFXValues(enabled ? variants.initial : variants.animate));
  // The animation belongs to the mounted effect, including a retained Suspense
  // hide. Motion stops an unobserved value when useTransform's layout cleanup
  // removes its last listener. A passive owner survives that temporary hide;
  // its cleanup releases the values when this effect actually unmounts.
  useEffect(() => {
    if (!enabled) return;
    const onChange = () => {};
    const unsubscribe = FX_KEYS.map(key => values[key].on("change", onChange));
    return () => { for (const stop of unsubscribe) stop(); };
  }, [enabled, values]);
  const reduceMotion = useShouldReduceMotion();
  const routeKey = useRouteKey();
  const activeAnimation = useRef<Promise<unknown>>(Promise.resolve());

  const run = async (target: FXTarget, fromInitial = false) => {
    const { transition, ...to } = target;
    const fallback = latestVariants.current.animate.transition ?? options.transition;
    // Events wait on the animation active when they arrive, as in the original
    // runtime. Those waiting on the same promise resume together; appending
    // every event to a tail instead replays stale scroll states afterward.
    await activeAnimation.current;
    if (fromInitial) setFXValues(values, latestVariants.current.initial);
    activeAnimation.current = animateFX(values, to, transition ?? fallback, reduceMotion(), ref.current);
  };

  // Plain in-view trigger.
  const playing = useRef({ last: !enabled });
  useAppearInView(ref, (appears) => {
    if (playing.current.last === appears) return;
    playing.current.last = appears;
    run(appears ? latestVariants.current.animate : latestVariants.current.exit, appears);
  }, { enabled: enabled && !options.targets && !options.scrollDirection, once: !!options.animateOnce, threshold: options.threshold });

  // Scroll targets: initial before the first target, animate inside, exit after.
  useEffect(() => {
    const targets: ScrollTarget[] | undefined = options.targets;
    if (!enabled || !targets || options.scrollDirection) return;
    const played: Record<string, boolean> = { initial: true };
    let last = "initial";
    return onScroll((y) => {
      if (!scrollTargetsReady(targets)) return;
      const inputRange = scrollTargetInputRange(targets, (options.threshold ?? 0) * y.containerLength);
      if (!isNumber(inputRange[0])) return;
      const outputRange = ["animate", "animate"];
      if (inputRange[0] > 1) {
        inputRange.unshift(0, inputRange[0] - 1);
        outputRange.unshift("initial", "initial");
      }
      if (options.exit) {
        inputRange.push(inputRange[inputRange.length - 1] + 1);
        outputRange.push("exit");
      }
      if (inputRange.length !== outputRange.length) return;
      const variant = transform(y.current, inputRange, outputRange) as "initial" | "animate" | "exit";
      if (options.animateOnce && played[variant]) return;
      played[variant] = true;
      if (variant === last) return;
      last = variant;
      run(latestVariants.current[variant]);
    });
  }, [routeKey, enabled && !!options.targets && !options.scrollDirection]);

  useScrollDirectionChange(options.scrollDirection, (target: FXTarget | undefined) => run(target ?? latestVariants.current.animate), {
    enabled,
    repeat: !options.animateOnce,
  });

  useResetWhenDisabled(values, enabled);
  return useMemo(() => ({ values, style: enabled ? WILL_CHANGE : NO_STYLE }), [enabled]);
}

// ---------------------------------------------------------------------------
// Scroll transform

const TRANSFORM_KEYS = new Set(["transformViewportThreshold", "styleTransformEffectEnabled", "transformTargets", "spring", "transformTrigger"]);

/** Smooth every channel through a spring instead of setting it directly. */
function makeSetter(values: FXValues, spring: any) {
  if (!spring) return (key: FXKey, value: number) => values[key].set(value);
  return (key: FXKey, value: number) => {
    if (values[key].get() === value) return;
    animate(values[key], value, { ...spring, restDelta: 0.001 });
  };
}

function useTransformFX(options: Record<string, any>, ref: ElementRef): Effect {
  const { styleTransformEffectEnabled: enabled, transformTargets, transformTrigger, spring, transformViewportThreshold = 0 } = options;
  const reduceMotion = useShouldReduceMotion();
  // Reduced motion keeps only the opacity part of the effect, from the first render in the browser:
  // the layout effect below runs before the motion component renders values it is handed.
  const values = useConstant(() => makeFXValues(enabled ? (reduceMotion() ? { opacity: transformTargets?.[0]?.target?.opacity ?? 1 } : transformTargets?.[0]?.target) : undefined));
  const routeKey = useRouteKey();
  const active = !!enabled && !!transformTargets;
  const springKey = JSON.stringify(spring ?? null);

  useIsomorphicLayoutEffect(() => {
    if (!active) return;
    const reduce = reduceMotion();
    const set = makeSetter(values, spring);
    // Reduced motion keeps only the opacity part of the effect.
    if (reduce) setFXValues(values, { opacity: transformTargets[0]?.target?.opacity ?? 1 });
    const channels = FX_KEYS.filter((key) => !reduce || key === "opacity");

    if (transformTrigger === "onScrollTarget") {
      return onScroll((y) => {
        if (!scrollTargetsReady(transformTargets)) return;
        const outputs: Record<string, number[]> = {};
        for (const key of FX_KEYS) outputs[key] = [];
        const inputRange = scrollTargetInputRange(transformTargets, transformViewportThreshold * y.containerLength, (index) => {
          const previous = transformTargets[index - 1]?.target;
          const current = transformTargets[index]?.target;
          for (const key of FX_KEYS) outputs[key].unshift(previous?.[key] ?? 0, current?.[key] ?? 0);
        });
        if (inputRange.length === 0) return;
        for (const key of channels) {
          if (outputs[key].length !== inputRange.length || outputs[key][0] === undefined) continue;
          set(key, transform(y.current, inputRange, outputs[key]) as number);
        }
      });
    }

    // onScroll (page progress) or onInView (element entering until its end reaches the viewport end).
    const element = ref.current;
    if (transformTrigger === "onInView" && !element) return;
    const outputs: Record<string, number[]> = {};
    for (const key of FX_KEYS) outputs[key] = transformTargets.map((t: ScrollTarget<any>) => t.target?.[key]);
    return onScroll((y) => {
      for (const key of channels) {
        if (outputs[key].length !== 2 || outputs[key][0] === undefined) continue;
        set(key, transform(y.progress, [0, 1], outputs[key]) as number);
      }
    }, transformTrigger === "onInView" ? { target: element!, offset: ["start end", "end end"] } : undefined);
  }, [routeKey, active, transformTrigger, transformTargets, transformViewportThreshold, springKey]);

  useResetWhenDisabled(values, !!enabled);
  return useMemo(() => ({ values, style: enabled ? WILL_CHANGE : NO_STYLE }), [enabled]);
}

// ---------------------------------------------------------------------------
// Parallax

const PARALLAX_KEYS = new Set(["speed", "adjustPosition", "offset", "parallaxTransformEnabled"]);

/** Vertical offset for a layer moving at `speed`% of the scroll speed. */
function parallaxY(scrollY: number, originalTop: number, speed: number, offset: number, adjustPosition: boolean) {
  const factor = speed / 100 - 1;
  const start = adjustPosition ? (originalTop - offset) * factor : 0;
  return start - scrollY * factor;
}

function useParallaxFX(options: Record<string, any>, ref: ElementRef, visibilityStyle: unknown) {
  const { speed = 100, offset = 0, adjustPosition = false, parallaxTransformEnabled: enabled } = options;
  const y = useConstant(() => motionValue(0));
  // With adjustPosition the layer stays hidden until its resting position is known.
  const visibility = useConstant(() => motionValue<any>(adjustPosition && enabled ? "hidden" : visibilityStyle));
  const reduceMotion = useShouldReduceMotion();
  const routeKey = useRouteKey();

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || speed === 100) {
      if (enabled) visibility.set(visibilityStyle ?? "initial");
      return;
    }
    let originalTop: number | null = null;
    let stopScroll = () => {};
    const stopObserving = observeIntersection(element, (entry) => {
      stopObserving();
      originalTop = entry.boundingClientRect.top;
      frame.update(() => {
        if (adjustPosition) visibility.set(visibilityStyle ?? "initial");
        if (reduceMotion()) return;
        stopScroll = onScroll((scroll) => y.set(parallaxY(scroll.current, originalTop!, speed, offset, adjustPosition)));
      });
    });
    return () => {
      stopObserving();
      stopScroll();
      y.set(0);
    };
  }, [routeKey, enabled, speed, offset, adjustPosition]);

  const style = useMemo(() => (enabled ? { ...WILL_CHANGE, ...(adjustPosition || visibilityStyle !== undefined ? { visibility } : {}) } : NO_STYLE), [enabled, adjustPosition, visibilityStyle]);
  return { y, style };
}

// ---------------------------------------------------------------------------
// Loop

const LOOP_KEYS = new Set(["loopEffectEnabled", "loopTransition", "loop", "loopRepeatType", "loopRepeatDelay", "loopPauseOffscreen"]);

function useLoopFX(options: Record<string, any>, ref: ElementRef): Effect {
  const { loopEffectEnabled, loop, loopTransition, loopRepeatType, loopRepeatDelay = 0, loopPauseOffscreen } = options;
  const values = useConstant(() => makeFXValues());
  const reduceMotion = useShouldReduceMotion();
  const enabled = !!loopEffectEnabled && !!loop;
  const config = useLatest({ loop, loopTransition, loopRepeatType, loopRepeatDelay });
  const [running, setRunningState] = useState(!loopPauseOffscreen);
  const setRunning = (value: boolean) => startTransition(() => setRunningState(value));

  useEffect(() => {
    if (!enabled) return;
    const element = ref.current;
    let shouldRun = false;
    let mirrored = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current: Promise<unknown> | undefined;
    let generation = 0;

    // One iteration: identity → loop target (or back again when mirroring).
    const iterate = (): Promise<unknown> => {
      const { loop: target, loopTransition: transition, loopRepeatType: repeatType } = config.current;
      // The loop can be taken away while an iteration is due (a breakpoint variant without one):
      // nothing animates, as nothing loops; the effect's cleanup stops the loop.
      if (!target) return Promise.resolve();
      const mirror = mirrored && repeatType === "mirror";
      const from = mirror ? target : FX_DEFAULTS;
      const to = mirror ? FX_DEFAULTS : target;
      mirrored = !mirrored;
      const reduce = reduceMotion();
      return Promise.all(FX_KEYS.map((key) => {
        if (reduce && key !== "opacity") return undefined;
        values[key].jump(from[key] ?? FX_DEFAULTS[key]);
        const value = to[key] ?? from[key];
        if (!isNumber(value)) return undefined;
        return new Promise<void>((resolve) => animate(values[key], value, { ...(transition || {}), onComplete: () => resolve() }));
      }));
    };
    const runLoop = async (id: number) => {
      while (shouldRun && id === generation) {
        current = iterate();
        await current;
        if (!shouldRun || id !== generation) return;
        await new Promise((resolve) => { timer = setTimeout(resolve, (config.current.loopRepeatDelay ?? 0) * 1000); });
      }
    };
    const start = () => {
      if (shouldRun) return;
      shouldRun = true;
      setRunning(true);
      void runLoop(++generation);
    };
    const stop = (pause = true) => {
      clearTimeout(timer);
      for (const key of FX_KEYS) values[key].stop();
      setFXValues(values, undefined);
      mirrored = false;
      generation++;
      if (pause) {
        shouldRun = false;
        setRunning(false);
      }
    };
    // Pause while the tab is hidden, resume when it comes back.
    const onVisibility = () => {
      if (document.hidden) stop(false);
      else if (shouldRun) {
        shouldRun = false;
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    let stopObserving = () => {};
    let isIntersecting = false;
    if (loopPauseOffscreen && element) {
      stopObserving = observeIntersection(element, (entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) return start();
        // Let the current iteration finish before resting off screen.
        void Promise.resolve(current).then(() => !isIntersecting && stop());
      });
    } else start();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopObserving();
      stop();
    };
  }, [enabled, loopPauseOffscreen]);

  return useMemo(() => ({ values, style: enabled && (running || !loopPauseOffscreen) ? WILL_CHANGE : NO_STYLE }), [enabled, running, loopPauseOffscreen]);
}

// ---------------------------------------------------------------------------
// Presence (smart-component layers with object initial/animate/exit)

const PRESENCE_KEYS = new Set(["presenceInitial", "presenceAnimate", "presenceExit"]);

function usePresenceFX(options: Record<string, any>, ref: ElementRef, enabled: boolean, style: any): Effect {
  const initial = options.presenceInitial ?? options.initial;
  const animateTarget = options.presenceAnimate ?? options.animate;
  const exit = options.presenceExit ?? options.exit;
  const [isPresent, safeToRemove] = usePresence(enabled);
  const reduceMotion = useShouldReduceMotion();
  const state = useRef({ lastPresence: false, lastAnimate: animateTarget, running: false });
  const values = useConstant(() => {
    const base = initial ?? style;
    if (!isObject(base)) return makeFXValues();
    const defaults: Record<string, number> = {};
    for (const key in base) if (isNumber(base[key])) defaults[key] = base[key];
    return makeFXValues(defaults);
  });

  const run = (target: unknown, instant = false) => {
    const element = ref.current;
    const transition = isObject(target) ? target.transition : undefined;
    const reduce = reduceMotion();
    return Promise.all(FX_KEYS.map((key) => new Promise<void>((resolve) => {
      if (reduce && key !== "opacity") return resolve();
      values[key].stop();
      let value: any = isObject(target) ? target[key] ?? FX_DEFAULTS[key] : FX_DEFAULTS[key];
      if (isMotionValue(value)) value = value.get();
      if (!isNumber(value)) return resolve();
      setBaseTarget(element, key, value);
      if (instant) {
        values[key].set(value);
        return resolve();
      }
      animate(values[key], value, { ...transition, velocity: 0, onComplete: () => resolve() });
    })));
  };

  useEffect(() => {
    if (!enabled) {
      safeToRemove?.();
      return;
    }
    if (!ref.current) return;
    const current = state.current;
    if (isPresent !== current.lastPresence) {
      current.lastPresence = isPresent;
      if (isPresent) {
        if (initial && animateTarget) {
          current.running = true;
          void run(animateTarget).then(() => { current.running = false; });
        }
      } else if (exit) {
        current.running = true;
        void run(exit).then(() => { current.running = false; safeToRemove?.(); });
      } else safeToRemove?.();
      return;
    }
    if (!animateTarget || isEqual(animateTarget, current.lastAnimate)) return;
    current.lastAnimate = animateTarget;
    // A variant switch while idle snaps; one mid-animation re-targets smoothly.
    void run(animateTarget, !current.running).then(() => { current.running = false; });
  });

  return useMemo(() => ({ values, style: enabled && animateTarget ? WILL_CHANGE : NO_STYLE }), [enabled, !!animateTarget]);
}

// ---------------------------------------------------------------------------
// withFX

const GROUPS = { parallax: PARALLAX_KEYS, appear: APPEAR_KEYS, transform: TRANSFORM_KEYS, loop: LOOP_KEYS, presence: PRESENCE_KEYS } as const;
type Group = keyof typeof GROUPS;

/** Sort props into effect groups; every `__fx_*` and FX marker prop is consumed. */
function extractFXOptions(props: Record<string, any>) {
  const groups: Record<Group, Record<string, any>> = { parallax: {}, appear: {}, transform: {}, loop: {}, presence: { initial: props.initial, animate: props.animate, exit: props.exit } };
  const forwarded: Record<string, any> = {};
  for (const key in props) {
    if (key === "__targetOpacity" || key === "__perspectiveFX" || key === "__smartComponentFX") continue;
    if (!key.startsWith(FX_PREFIX)) {
      forwarded[key] = props[key];
      continue;
    }
    const option = key.slice(FX_PREFIX.length);
    for (const group in GROUPS) {
      if (GROUPS[group as Group].has(option)) {
        groups[group as Group][option] = props[key];
        break;
      }
    }
  }
  // Older sites enable an effect implicitly by setting one of its options.
  const { parallax, appear } = groups;
  parallax.parallaxTransformEnabled = parallax.parallaxTransformEnabled === true || (!("parallaxTransformEnabled" in parallax) && "speed" in parallax);
  appear.styleAppearEffectEnabled = appear.styleAppearEffectEnabled === true || (!("styleAppearEffectEnabled" in appear) && "animateOnce" in appear);
  return { ...groups, forwarded };
}

const add = (values: number[]) => values.reduce((sum, v) => sum + v, 0);
const multiply = (values: number[]) => values.reduce((product, v) => product * v, 1);

export const withFX = <T,>(Component: T): WithAnyProps<T> => forwardRef<any, any>(function WithFX(props, forwardedRef) {
  const { parallax, appear, transform: transformOptions, loop, presence, forwarded } = extractFXOptions(props);
  const inSmartComponent = !!props.__smartComponentFX;
  const [ref, setRef] = useForwardedElementRef(forwardedRef);

  const presenceFX = usePresenceFX(presence, ref, inSmartComponent, props.style);
  const parallaxFX = useParallaxFX(parallax, ref, props.style?.visibility);
  const transformFX = useTransformFX(transformOptions, ref);
  const appearFX = useAppearFX(appear, ref);
  const loopFX = useLoopFX(loop, ref);

  // Motion values the layer already carries in `style` join the composition.
  const styleValues = FX_KEYS.map((key) => {
    const value = props.style?.[key];
    return isMotionValue(value) && isNumber(value.get()) ? (value as MotionValue<number>) : undefined;
  });
  const layerOpacity = useConstant(() => motionValue(1));
  if (layerOpacity.get() !== (props.__targetOpacity ?? 1)) layerOpacity.set(props.__targetOpacity ?? 1);
  const sources = useMemo(() => {
    const sets = [appearFX.values, loopFX.values, presenceFX.values, transformFX.values];
    const channel = {} as Record<FXKey, MotionValue<number>[]>;
    FX_KEYS.forEach((key, i) => {
      channel[key] = sets.map((set) => set[key]);
      if (styleValues[i]) channel[key].push(styleValues[i]!);
    });
    channel.y.push(parallaxFX.y);
    channel.opacity.push(layerOpacity);
    // transformPerspective was never animated by loop/presence.
    channel.transformPerspective = [transformFX.values.transformPerspective, appearFX.values.transformPerspective];
    return channel;
  }, styleValues);

  const style: Record<string, any> = {
    opacity: useTransform(sources.opacity, multiply),
    scale: useTransform(sources.scale, multiply),
    x: useTransform(sources.x, add),
    y: useTransform(sources.y, add),
    rotate: useTransform(sources.rotate, add),
    rotateX: useTransform(sources.rotateX, add),
    rotateY: useTransform(sources.rotateY, add),
    skewX: useTransform(sources.skewX, add),
    skewY: useTransform(sources.skewY, add),
  };
  const perspective = useTransform(sources.transformPerspective, add);
  if (props.__perspectiveFX === undefined) style.transformPerspective = perspective;

  // Shared layouts retain scroll-driven appearance values across CMS routes.
  // Match the original runtime's route reset, after the new render commits.
  // Update the composites too: Motion's layout cleanup can cancel their queued
  // recomputation during a Suspense/StrictMode reattachment.
  const routeKey = useRouteKey();
  const lastRoute = useRef(routeKey);
  useIsomorphicLayoutEffect(() => {
    const changed = lastRoute.current !== routeKey;
    lastRoute.current = routeKey;
    if (!changed || routeKey === undefined || !appear.styleAppearEffectEnabled || !(appear.targets || appear.scrollDirection)) return;
    setFXValues(appearFX.values, appearVariants(appear).initial);
    for (const key of FX_KEYS) {
      const value = style[key];
      if (!isMotionValue(value)) continue;
      const combine = key === "opacity" || key === "scale" ? multiply : add;
      value.set(combine(sources[key].map(source => source.get())));
    }
  }, [routeKey, appear.styleAppearEffectEnabled]);

  // Suspense detaches Motion's visual element and useTransform subscriptions
  // while source animations can continue. A retained child need not render on
  // reveal, so its composite can still hold the pre-hide value after the source
  // settles. Recompute from the current sources before synchronizing the visual
  // element, and touch only composites this layer still owns.
  useIsomorphicLayoutEffect(() => {
    const visual = ref.current ? visualElementStore.get(ref.current) : undefined;
    if (!visual) return;
    let changed = false;
    for (const key of FX_KEYS) {
      const value = style[key];
      if (!isMotionValue(value) || visual.values.get(key) !== value) continue;
      const combine = key === "opacity" || key === "scale" ? multiply : add;
      value.set(combine(sources[key].map(source => source.get())));
      const current = value.get();
      if (visual.getStaticValue(key) === current) continue;
      visual.setStaticValue(key, current);
      changed = true;
    }
    if (changed) visual.scheduleRender();
  });

  // Inside smart components object targets are played by the presence effect;
  // only variant labels go to motion (the original runtime's `motionGestures`).
  const gestures = inSmartComponent && !presence.presenceInitial
    ? { initial: isVariantLabel(props.initial) ? props.initial : undefined, animate: isVariantLabel(props.animate) ? props.animate : undefined, exit: isVariantLabel(props.exit) ? props.exit : undefined }
    : {};

  // Motion animates `initial`/`animate` objects (an optimized appear outside smart
  // components) on the presence values handed over as `values`, so the appear
  // composes with the other effects instead of overwriting their composite.
  const Inner = Component as any;
  return (
    <Inner
      {...forwarded}
      {...gestures}
      values={presenceFX.values}
      ref={setRef}
      style={{ ...props.style, ...parallaxFX.style, ...transformFX.style, ...loopFX.style, ...style, ...appearFX.style, ...presenceFX.style }}
    />
  );
}) as unknown as WithAnyProps<T>;

/** Deprecated alias kept by the original runtime for old sites. */
export const withParallaxTransform = withFX;
