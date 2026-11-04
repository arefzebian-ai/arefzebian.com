"use client";

// Small helpers shared by the content primitives.

import { useCallback, useRef, type ForwardedRef, type MutableRefObject } from "react";
import { motion } from "motion/react";

/** The motion component for an `as` tag (the original runtime: htmlElementAsMotionComponent). */
export function motionElement(as?: string): any {
  return as && as !== "search" && as !== "slot" && as !== "template" ? (motion as any)[as] ?? motion.div : motion.div;
}

/** The original runtime's transformTemplate for `center`: keeps the generated transform and prepends the centering translate. */
export function transformTemplateForCenter(center?: boolean | "x" | "y") {
  return (_: unknown, generated: string) => {
    if (center === true) return `translate(-50%, -50%) ${generated}`;
    if (center === "x") return `translateX(-50%) ${generated}`;
    if (center === "y") return `translateY(-50%) ${generated}`;
    return generated || "none";
  };
}

/** An object ref that also forwards the node to the caller's (object or callback) ref. */
export function useMergedRef<T>(forwardedRef: ForwardedRef<T> | undefined): [MutableRefObject<T | null>, (node: T | null) => void] {
  const own = useRef<T | null>(null);
  const forwarded = useRef(forwardedRef);
  forwarded.current = forwardedRef;
  const setRef = useCallback((node: T | null) => {
    own.current = node;
    const target = forwarded.current;
    if (typeof target === "function") target(node);
    else if (target) target.current = node;
  }, []);
  return [own, setRef];
}
