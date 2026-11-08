/**
 * Site-wide load-in (appear) motion, aligned to the Nolan Barret reference:
 * https://nolan-barret.framer.website
 *
 * Content / UI: fade + rise 20px, 1s tween, ease [0.23, 0.98, 0.56, 1]
 * Media / large blocks: fade + rise 80px, 2s tween, same ease
 * Stagger: ~0.1s steps, typically starting around 0.6–0.7s
 */

export const LOAD_IN_EASE = [0.23, 0.98, 0.56, 1] as const;

/** Soft footer / floating chrome used on the reference site. */
export const LOAD_IN_FOOTER_EASE = [0.12, 0.23, 0.13, 0.96] as const;

export const LOAD_IN_CONTENT_Y = 20;
export const LOAD_IN_MEDIA_Y = 80;

export const LOAD_IN_CONTENT_DURATION = 1;
export const LOAD_IN_MEDIA_DURATION = 2;

export function loadInTransition(delay: number, kind: "content" | "media" = "content") {
  return {
    delay,
    duration: kind === "media" ? LOAD_IN_MEDIA_DURATION : LOAD_IN_CONTENT_DURATION,
    ease: LOAD_IN_EASE,
    type: "tween" as const,
  };
}

export function loadInInitial(kind: "content" | "media" = "content") {
  return {
    opacity: 0.001,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    x: 0,
    y: kind === "media" ? LOAD_IN_MEDIA_Y : LOAD_IN_CONTENT_Y,
  };
}
