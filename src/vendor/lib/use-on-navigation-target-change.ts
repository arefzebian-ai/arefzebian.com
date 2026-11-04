// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useIsInCurrentNavigationTarget } from "@/deframer";
import { useEffect } from "react";

export function useOnEnter(onEnter?, enabled?): any {
  return useOnSpecificTargetChange(true, onEnter, enabled);
}
export function useOnExit(onExit?, enabled?): any {
  return useOnSpecificTargetChange(false, onExit, enabled);
}
function useOnSpecificTargetChange(goal?, callback?, enabled = true) {
  const isInTarget = useIsInCurrentNavigationTarget();
  useEffect(() => {
    if (enabled && isInTarget === goal) callback();
  }, [isInTarget]);
}
