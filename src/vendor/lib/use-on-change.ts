// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useEffect } from "react";

//@ts-ignore
import { isMotionValue } from "@/vendor/lib/is-motion-value";
export function useOnChange(value?, callback?): any {
  useEffect(() =>
    // @ts-ignore this should be detected as a MV :shrug:
    isMotionValue(value) ? value.onChange(callback) : undefined,
  );
}
export function useMultiOnChange(values?, handler?): any {
  useEffect(() => {
    const subscriptions = values.map((value?) => value.onChange(handler));
    return () => subscriptions.forEach((unsubscribe?) => unsubscribe());
  });
}
