// Small browser helpers shared by overlays, floating panels and forms.

/**
 * Resolve after the browser has painted the current frame. The original runtime defers
 * state changes triggered by clicks/typing this way so the interaction paints
 * first (better INP). Falls back to a macrotask when frames are throttled.
 */
export function afterPaint(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame !== "function" || document.visibilityState === "hidden") {
      setTimeout(resolve, 0);
      return;
    }
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
}

export function classNames(...names: unknown[]): string {
  return names.filter((name) => typeof name === "string" && name).join(" ");
}

export function isEmptyObject(value: object | null | undefined): boolean {
  if (!value) return true;
  for (const _ in value) return false;
  return true;
}
