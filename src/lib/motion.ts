export const polishedEase = [0.23, 0.98, 0.56, 1] as const;

/** Hero loader image rise — shared so sticky / intro motion stay in the same family. */
export const heroLoaderEase = [0.2, 0.93, 0.37, 1.01] as const;

export const heroLoaderTransition = {
  delay: 0,
  duration: 1.5,
  ease: heroLoaderEase,
  type: "tween",
} as const;

/** Sticky Back to Project mask-up: same curve/travel language as the hero loader. */
export const backButtonTransition = {
  delay: 0.6,
  duration: 1.5,
  ease: heroLoaderEase,
  type: "tween",
} as const;

export const backButtonReveal = {
  initial: { y: 90 },
  animate: { y: 0 },
} as const;

export const caseStudyImageSpring = {
  damping: 60,
  delay: 0,
  duration: 0.3,
  ease: [0.44, 0, 0.56, 1],
  mass: 1,
  stagger: 0,
  stiffness: 500,
  type: "spring",
} as const;
