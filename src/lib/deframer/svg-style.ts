"use client";

// Motion's SVG render props retain raw styles from the first render. A code
// override that renders fitted text hidden, then reveals it in an effect, keeps
// an invisible SVG even after its style prop changes. Stable MotionValues let
// the SVG renderer subscribe to the changes, as its HTML renderer already does.

import { useLayoutEffect, useRef } from "react";
import { isMotionValue, motionValue, type MotionValue, type MotionStyle } from "motion/react";

/** Live styles for an SVG, preserving caller-owned values and native animations. */
export function useSVGStyle(style: MotionStyle | undefined): MotionStyle {
  const tracked = useRef(new Map<string, { value: MotionValue; input: unknown }>());
  const result: Record<string, any> = { ...style };
  for (const [key, input] of Object.entries(style ?? {})) {
    if (input === undefined || isMotionValue(input)) continue;
    if (!tracked.current.has(key)) tracked.current.set(key, { value: motionValue(input ?? ""), input });
  }
  for (const [key, entry] of tracked.current) {
    const input = (style as Record<string, any> | undefined)?.[key];
    result[key] = isMotionValue(input) ? input : entry.value;
  }
  useLayoutEffect(() => {
    for (const [key, entry] of tracked.current) {
      const input = (style as Record<string, any> | undefined)?.[key];
      if (isMotionValue(input) || Object.is(input, entry.input)) continue;
      // Update only when the incoming style changes. Resetting an unchanged
      // value on every render would overwrite an initial/animate animation.
      entry.input = input;
      entry.value.set(input ?? "");
    }
  });
  return result as MotionStyle;
}
