// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useMemo } from "react";
import { RenderTarget } from "@/deframer";

export function useRenderTarget(): any {
  const currentRenderTarget = useMemo(() => RenderTarget.current(), []);
  return currentRenderTarget;
}

export function useIsOnCanvas(): any {
  const onCanvas = useMemo(() => RenderTarget.current() === RenderTarget.canvas, []);
  return onCanvas;
}
