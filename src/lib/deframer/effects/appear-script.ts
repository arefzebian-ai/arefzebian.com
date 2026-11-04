// Appear-on-load animations before hydration, as the published site plays them.
//
// The original runtime server-renders an appear layer in its `initial` state and starts its animation
// from an inline script as the page is parsed, so the page's first paint is already moving and its
// largest text or image paints without waiting for the page's JavaScript. The animation library
// takes over at hydration from where the browser got to (its "optimized appear" handoff: the
// `window.Motion…` functions below, keyed by the layer's appear id attribute), so nothing restarts.
//
// Here the same happens in two halves:
//
//  1. Render (server and hydration alike): each appear layer gets its plan as an attribute, the
//     browser's keyframes and timing for opacity and transform (`appearPlan`), computed with the
//     animation library's own spring and transform functions, so the curve the browser plays is the
//     one the library continues.
//  2. Browser, before hydration: `playAppearAnimations` (serialized into one inline <script> in the
//     head, so it is self-contained and refers to nothing outside itself) starts each plan once its
//     layer is parsed (layers of other breakpoints are pruned by then: breakpoints.tsx), until the
//     page has loaded or the library has mounted.
//
// Layers whose animation needs anything else (other properties, per-value transitions, repeats,
// keyframe lists) get no plan and animate at hydration, as before.

import {
  createGeneratorEasing,
  cubicBezierAsString,
  generateLinearEasing,
  getValueAsType,
  numberValueTypes,
  spring,
  supportedWaapiEasing,
  transformPropOrder,
} from "motion/react";

/** The attribute holding a layer's plan. */
export const APPEAR_PLAN_ATTRIBUTE = "data-appear";

/** What the browser plays for one layer: `[from, to]` per CSS property, one timing for all (ms). */
export interface AppearPlan {
  keyframes: { opacity?: [number, number]; transform?: [string, string] };
  delay: number;
  duration: number;
  easing: string;
}

type Values = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Values => typeof value === "object" && value !== null && !Array.isArray(value);

/** The animation library's name for each transform value in a CSS transform list. */
const TRANSFORM_FUNCTION: Record<string, string> = { x: "translateX", y: "translateY", z: "translateZ", transformPerspective: "perspective" };
const TRANSFORM_KEYS = new Set<string>(transformPropOrder);
const TEMPLATE_SLOT = "\u0000transform\u0000";

/** Browser timing for a transition the library would play as a spring or a tween; undefined for anything else. */
function timing(transition: unknown): Omit<AppearPlan, "keyframes"> | undefined {
  if (!isPlainObject(transition)) return undefined;
  // Per-value transitions (`{ opacity: { … } }`) and repeats are the library's to play.
  if (Object.values(transition).some((value) => isPlainObject(value)) || transition.repeat) return undefined;
  const delay = typeof transition.delay === "number" ? transition.delay * 1000 : 0;
  if (transition.type === "spring") {
    // Motion's public transition uses seconds; its low-level spring generator
    // accepts milliseconds. Keep the authored curve through the WAAPI handoff.
    const options = typeof transition.duration === "number" ? { ...transition, duration: transition.duration * 1000 } : transition;
    const { ease, duration } = createGeneratorEasing(options as any, 100, spring as any);
    const ms = duration * 1000;
    return { delay, duration: ms, easing: generateLinearEasing(ease, ms) };
  }
  // Without a type the library picks its own default per value (springs for transforms): the
  // generated code always names one, so anything else is left to the library.
  if (transition.type !== "tween" && transition.type !== "keyframes") return undefined;
  // The library's tween defaults: 0.3 s, easeInOut.
  const ease = transition.ease ?? "easeInOut";
  const easing = Array.isArray(ease) && ease.length === 4 && ease.every((n) => typeof n === "number") ? cubicBezierAsString(ease as [number, number, number, number]) : typeof ease === "string" ? (supportedWaapiEasing as Record<string, string>)[ease] : undefined;
  if (!easing) return undefined;
  return { delay, duration: (typeof transition.duration === "number" ? transition.duration : 0.3) * 1000, easing };
}

const defaultValue = (key: string) => (key.startsWith("scale") || key === "opacity" ? 1 : 0);

/**
 * A transform list naming every value that either state moves off its default (in both keyframes,
 * so they list the same functions and the browser interpolates them one by one), the way the
 * library writes it.
 */
function transformList(values: Values, keys: string[], template: string | undefined): string {
  const list = keys.map((key) => `${TRANSFORM_FUNCTION[key] ?? key}(${getValueAsType(values[key] ?? defaultValue(key), (numberValueTypes as Record<string, any>)[key])})`).join(" ");
  return template ? template.replace(TEMPLATE_SLOT, list) : list;
}

/**
 * The plan for an appear layer (`initial` → `animate`, with `animate.transition`), or undefined
 * when the browser can't play it alone. `style` holds transform values both states share
 * (`transformPerspective`); `transformTemplate` wraps the transform as the layer's own does.
 */
export function appearPlan(initial: unknown, animate: unknown, style?: unknown, transformTemplate?: unknown): AppearPlan | undefined {
  if (!isPlainObject(initial) || !isPlainObject(animate)) return undefined;
  // Generated code passes the same constant states on every render: plan each pair once.
  const plain = !transformTemplate && !(isPlainObject(style) && Object.keys(style).some((key) => TRANSFORM_KEYS.has(key)));
  const cached = plain ? plans.get(animate)?.get(initial) : undefined;
  if (cached !== undefined) return cached ?? undefined;
  const plan = planFor(initial, animate, style, transformTemplate);
  if (plain) {
    let byInitial = plans.get(animate);
    if (!byInitial) plans.set(animate, (byInitial = new WeakMap()));
    byInitial.set(initial, plan ?? null);
  }
  return plan;
}

const plans = new WeakMap<object, WeakMap<object, AppearPlan | null>>();

function planFor(initial: Values, animate: Values, style: unknown, transformTemplate: unknown): AppearPlan | undefined {
  const { transition, ...target } = animate;
  const when = timing(transition);
  if (!when) return undefined;
  const shared: Values = {};
  if (isPlainObject(style)) for (const key of TRANSFORM_KEYS) if (typeof style[key] === "number" || typeof style[key] === "string") shared[key] = style[key];
  const from: Values = { ...shared, ...initial };
  const to: Values = { ...shared, ...target };
  const transformKeys: string[] = [];
  let transformChanges = false;
  for (const key of new Set([...Object.keys(from), ...Object.keys(to)])) {
    const [a, b] = [from[key] ?? defaultValue(key), to[key] ?? defaultValue(key)];
    if ((typeof a !== "number" && typeof a !== "string") || (typeof b !== "number" && typeof b !== "string")) return undefined;
    if (TRANSFORM_KEYS.has(key)) {
      if (parseFloat(String(a)) !== defaultValue(key) || parseFloat(String(b)) !== defaultValue(key)) transformKeys.push(key);
      if (a !== b) transformChanges = true;
    } else if (key !== "opacity" && a !== b) return undefined;
  }
  transformKeys.sort((a, b) => transformPropOrder.indexOf(a) - transformPropOrder.indexOf(b));
  const keyframes: AppearPlan["keyframes"] = {};
  const opacity = [from.opacity ?? 1, to.opacity ?? 1];
  if (opacity[0] !== opacity[1]) {
    if (typeof opacity[0] !== "number" || typeof opacity[1] !== "number") return undefined;
    keyframes.opacity = [opacity[0], opacity[1]];
  }
  if (transformChanges) {
    const template = typeof transformTemplate === "function" ? String(transformTemplate({}, TEMPLATE_SLOT)) : undefined;
    if (template !== undefined && !template.includes(TEMPLATE_SLOT)) return undefined;
    keyframes.transform = [transformList(from, transformKeys, template), transformList(to, transformKeys, template)];
  }
  if (!keyframes.opacity && !keyframes.transform) return undefined;
  return { keyframes, ...when };
}

/**
 * Starts the plans of appear layers as they are parsed and hands them to the animation library,
 * which continues each from where the browser got to. Mirrors the library's own optimized-appear
 * start (motion's `startOptimizedAppearAnimation`): one shared start time, a dummy animation that
 * waits until the browser is ready to paint, and the `window.Motion…` handoff functions the library
 * calls at hydration. Serialized with toString() into an inline <script>: self-contained, no
 * syntax a bundler would rewrite into helpers.
 *
 * `idAttribute`: the library's appear id attribute; `planAttribute`: APPEAR_PLAN_ATTRIBUTE;
 * `reducedMotion`: the site's setting (`user` follows the visitor's preference, which jumps
 * transforms and keeps fades, as the library does).
 */
export function playAppearAnimations(idAttribute: string, planAttribute: string, reducedMotion: string): void {
  var w = window as any;
  var d = document;
  if (w.__appearAnimations) return;
  w.__appearAnimations = true;
  var reduce = reducedMotion === "always" || (reducedMotion === "user" && w.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var store = new Map<string, { animation: Animation; startTime: number | null }>();
  var complete = new Map<string, boolean>();
  var started = new WeakSet<Element>();
  var suspended = new Set<{ animation: Animation; startTime: number | null }>();
  var readyAnimation: Animation | undefined;
  var startFrameTime: number | undefined;
  var storeId = function (id: string, name: string) {
    return id + ": " + (name === "opacity" ? "opacity" : "transform");
  };
  var waapi = function (element: Element, name: string, keyframes: unknown[], options: KeyframeAnimationOptions) {
    var frames: Record<string, unknown[]> = {};
    frames[name] = keyframes;
    return element.animate(frames as Keyframe[] | PropertyIndexedKeyframes, { delay: options.delay, duration: options.duration, easing: options.easing, fill: "both", iterations: 1, direction: "normal" });
  };
  var resumeSuspended = function () {
    suspended.forEach(function (data) {
      data.animation.play();
      data.animation.startTime = data.startTime;
    });
    suspended.clear();
  };
  var handoff = function (id: string, name: string, frame: unknown) {
    var data = store.get(storeId(id, name));
    if (!data) return null;
    var cancel = function () {
      if (w.MotionCancelOptimisedAnimation) w.MotionCancelOptimisedAnimation(id, name, frame);
    };
    data.animation.onfinish = cancel;
    if (data.startTime === null || (w.MotionHandoffIsComplete && w.MotionHandoffIsComplete(id))) {
      cancel();
      return null;
    }
    return data.startTime;
  };
  var installHandoff = function () {
    w.MotionHandoffAnimation = handoff;
    w.MotionHasOptimisedAnimation = function (id: string, name?: string) {
      if (!id) return false;
      return name ? Boolean(store.get(storeId(id, name))) : complete.has(id);
    };
    w.MotionHandoffMarkAsComplete = function (id: string) {
      if (complete.has(id)) complete.set(id, true);
    };
    w.MotionHandoffIsComplete = function (id: string) {
      return complete.get(id) === true;
    };
    w.MotionCancelOptimisedAnimation = function (id: string, name: string, frame: any, canResume?: boolean) {
      var key = storeId(id, name);
      var data = store.get(key);
      if (!data) return;
      if (frame && canResume === undefined) {
        frame.postRender(function () {
          frame.postRender(function () {
            data!.animation.cancel();
          });
        });
      } else data.animation.cancel();
      if (frame && canResume) {
        suspended.add(data);
        frame.render(resumeSuspended);
      } else {
        store.delete(key);
        if (!store.size) w.MotionCancelOptimisedAnimation = undefined;
      }
    };
    w.MotionCheckAppearSync = function (visualElement: any, name: string, value: any) {
      var id = visualElement.props[idAttribute];
      if (!id) return;
      var external = visualElement.props.values && visualElement.props.values[name];
      if (!w.MotionHasOptimisedAnimation(id, name) || !external) return;
      var remove = value.on("change", function (latest: unknown) {
        if (external.get() !== latest) {
          // The last handoff can retire the cancel hook before this value changes.
          if (w.MotionCancelOptimisedAnimation) w.MotionCancelOptimisedAnimation(id, name);
          remove();
        }
      });
      return remove;
    };
  };
  var start = function (element: Element, id: string, name: string, keyframes: unknown[], options: KeyframeAnimationOptions) {
    var key = storeId(id, name);
    if (!readyAnimation) {
      installHandoff();
      // Chrome starts animations only once it is ready to paint: wait for that with one placeholder.
      readyAnimation = waapi(element, name, [keyframes[0], keyframes[0]], { duration: 10000, easing: "linear" });
      store.set(key, { animation: readyAnimation, startTime: null });
    }
    var play = function () {
      readyAnimation!.cancel();
      var animation = waapi(element, name, keyframes, options);
      if (startFrameTime === undefined) startFrameTime = performance.now();
      animation.startTime = startFrameTime;
      store.set(key, { animation: animation, startTime: startFrameTime });
    };
    complete.set(id, false);
    if (readyAnimation.ready) readyAnimation.ready.then(play).catch(function () {});
    else play();
  };
  var scan = function () {
    var layers = d.querySelectorAll("[" + planAttribute + "]");
    for (var i = 0; i < layers.length; i++) {
      var element = layers[i];
      // Streamed content waits in a hidden container until React moves it into place.
      if (started.has(element) || element.closest("[hidden]")) continue;
      started.add(element);
      var id = element.getAttribute(idAttribute);
      var plan: AppearPlan;
      try {
        plan = JSON.parse(element.getAttribute(planAttribute) || "");
      } catch (error) {
        continue;
      }
      if (!id || !plan || !plan.keyframes) continue;
      var options = { delay: plan.delay, duration: plan.duration, easing: plan.easing };
      if (plan.keyframes.opacity) start(element, id, "opacity", plan.keyframes.opacity, options);
      if (plan.keyframes.transform) {
        var to = plan.keyframes.transform[1];
        start(element, id, "transform", reduce ? [to, to] : plan.keyframes.transform, reduce ? { delay: 0, duration: 0, easing: "linear" } : options);
      }
    }
  };
  var tick = function () {
    if (w.MotionIsMounted) return;
    scan();
    if (d.readyState !== "complete") w.requestAnimationFrame(tick);
  };
  w.requestAnimationFrame(tick);
}
