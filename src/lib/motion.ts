export const polishedEase = [0.23, 0.98, 0.56, 1] as const;

export const backButtonTransition = {
  delay: 0.6,
  duration: 1,
  ease: polishedEase,
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
