"use client";

// withVariantAppearEffect: switches a component instance's variant when it
// scrolls into view (visible/obscured variant ids), when scroll targets are
// reached (`targets` → per-target variant, `exitTarget`), or when the user
// scrolls in a direction (`scrollDirection`).

import { forwardRef, startTransition, useEffect, useRef, useState } from "react";
import { transform } from "motion/react";
import {
  isNumber, onScroll, scrollTargetInputRange, scrollTargetsReady, splitPrefixedProps, useAppearInView, useForwardedElementRef,
  useRouteKey, useScrollDirectionChange, type ScrollTarget,
} from "./core";
import type { WithAnyProps } from "../types";

const KEYS = new Set(["visibleVariantId", "obscuredVariantId", "threshold", "animateOnce", "variantAppearEffectEnabled", "targets", "exitTarget", "scrollDirection"]);

/** Scroll ranges mapping to target indexes (-1 = before the first / after the exit target). */
function targetRanges(targets: ScrollTarget<string>[], threshold: number, exitTarget: unknown) {
  const outputRange: number[] = [];
  const inputRange = scrollTargetInputRange(targets, threshold, (index) => outputRange.unshift(index, index));
  if (exitTarget) {
    const last = inputRange[inputRange.length - 1];
    if (!isNumber(last)) return undefined;
    inputRange.push(last + 1);
    outputRange.push(-1);
  }
  const first = inputRange[0];
  if (!isNumber(first)) return undefined;
  if (first <= 1) return { inputRange, outputRange };
  return { inputRange: [0, Math.max(first - 1, 0), ...inputRange], outputRange: [-1, -1, ...outputRange] };
}

export const withVariantAppearEffect = <T,>(Component: T): WithAnyProps<T> => forwardRef<any, any>(function WithVariantAppearEffect(props, forwardedRef) {
  const [options, rest] = splitPrefixedProps(props, KEYS);
  const { visibleVariantId, obscuredVariantId, animateOnce, threshold, variantAppearEffectEnabled, exitTarget, scrollDirection } = options;
  const targets = options.targets as ScrollTarget<string>[] | undefined;
  const [activeVariant, setActiveVariant] = useState<string | undefined>(obscuredVariantId);
  const setVariant = (variant: string | undefined) => startTransition(() => setActiveVariant(variant));
  const [ref, setRef] = useForwardedElementRef(forwardedRef);
  const appeared = useRef(false);
  const routeKey = useRouteKey();

  useAppearInView(ref, (appears) => {
    if (targets || scrollDirection) return;
    if (animateOnce && appeared.current) return;
    if (appeared.current === appears) return;
    appeared.current = appears;
    setVariant(appears ? visibleVariantId : obscuredVariantId);
  }, { enabled: !!variantAppearEffectEnabled, once: !!animateOnce, threshold });

  // Scroll targets: the variant of the target whose range contains the scroll position.
  const lastRoute = useRef(routeKey);
  useEffect(() => {
    const list = targets;
    if (scrollDirection || !list) return;
    if (lastRoute.current !== routeKey) {
      lastRoute.current = routeKey;
      setVariant(obscuredVariantId);
    }
    const played: Record<number, boolean> = {};
    let current: string | undefined;
    return onScroll((y) => {
      if (!scrollTargetsReady(list)) return;
      const ranges = targetRanges(list, (threshold ?? 0) * y.containerLength, exitTarget);
      if (!ranges || ranges.inputRange.length !== ranges.outputRange.length) return;
      const index = Math.floor(transform(y.current, ranges.inputRange, ranges.outputRange) as number);
      if (animateOnce && played[index]) return;
      played[index] = true;
      const variant = list[index]?.target;
      if (variant === current) return;
      current = variant;
      setVariant(variant);
    });
  }, [routeKey, animateOnce, threshold, targets, props.variant, scrollDirection, exitTarget]);

  useScrollDirectionChange<string>(scrollDirection, setVariant, { enabled: !!variantAppearEffectEnabled, repeat: !animateOnce });

  const Inner = Component as any;
  if ("variantAppearEffectEnabled" in options && variantAppearEffectEnabled !== true) return <Inner {...rest} ref={forwardedRef} />;
  return <Inner {...rest} variant={activeVariant ?? props.variant} ref={setRef} />;
}) as unknown as WithAnyProps<T>;
