/** Shared motion presets for Deframer / Motion appear effects. */

export const revealEase = [0.16, 1, 0.3, 1] as const;

export const revealTransition = {
  delay: 0,
  duration: 0.35,
  ease: revealEase,
  type: "tween",
} as const;

export const revealRest = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: revealTransition,
  x: 0,
  y: 0,
} as const;

export const revealHidden = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 8,
} as const;

export const interactDuration = 0.18;
