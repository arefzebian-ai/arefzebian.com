"use client";

// Overlays: the state behind the original runtime's "Overlay" interactions (modals, menus,
// dropdowns). Generated modules define a small `Overlay` render-prop wrapper
// that calls useOverlayState and portals its content themselves; anchored
// panels use <Floating> (./floating.tsx). Custom cursors live in ./cursors.tsx.

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { frame } from "motion/react";
import { afterPaint } from "./interaction-utils";

export { Floating } from "./floating";
export { useCustomCursors, CustomCursorHost } from "./cursors";

// ---------------------------------------------------------------------------
// Document scroll lock

/** Number of open overlays currently blocking document scrolling. */
let scrollLocks = 0;

function writeDocumentOverflow(hidden: boolean): void {
  // Batched into motion's render step like the original runtime, so it lands with the overlay's first frame.
  frame.render(() => {
    const style = document.documentElement.style;
    if (hidden) style.setProperty("overflow", "hidden");
    else style.removeProperty("overflow");
  });
}

/**
 * Each overlay instance holds at most one lock; the page only scrolls again
 * once every blocking overlay has released its lock.
 */
function useDocumentScrollLock(enabled: boolean) {
  const holding = useRef(false);
  const setLocked = useCallback(
    (locked: boolean) => {
      if (!enabled || locked === holding.current) return;
      holding.current = locked;
      scrollLocks += locked ? 1 : -1;
      if (locked ? scrollLocks === 1 : scrollLocks === 0) writeDocumentOverflow(locked);
    },
    [enabled],
  );
  // Unmounting while open (e.g. navigating away) must not leave the page frozen.
  useEffect(() => () => {
    void afterPaint().then(() => setLocked(false));
  }, [setLocked]);
  return setLocked;
}

// ---------------------------------------------------------------------------
// useOverlayState

export interface OverlayOptions {
  /** Lock page scrolling while visible. The original runtime's default is true. */
  blockDocumentScrolling?: boolean;
  /** Close when Escape is pressed. */
  dismissWithEsc?: boolean;
}

/**
 * `[visible, setVisible]` for one overlay. The setter waits for the click that
 * triggered it to paint, then updates in a transition (as the original runtime does).
 */
export function useOverlayState({ blockDocumentScrolling = true, dismissWithEsc = false }: OverlayOptions = {}) {
  const [visible, setVisibleState] = useState(false);
  const setScrollLocked = useDocumentScrollLock(blockDocumentScrolling !== false);

  const setVisible = useCallback(
    async (show: boolean) => {
      await afterPaint();
      startTransition(() => setVisibleState(show));
      setScrollLocked(show);
    },
    [setScrollLocked],
  );

  useEffect(() => {
    if (!dismissWithEsc) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      void setVisible(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismissWithEsc, setVisible]);

  return [visible, setVisible] as const;
}
