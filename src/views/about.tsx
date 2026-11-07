"use client";

import "@/styles/fonts/inter.css";
import styles from "./about.module.css";
import {
  asPage,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getLoadingLazyAtYPosition,
  getRootLayoutProp,
  HTMLStyle,
  Image as Image1,
  matchVariant,
  PropertyOverrides,
  RichText,
  runTasksWithYield,
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import ExperienceRow from "@/components/experience-row";
import InfoContent from "@/components/info-content";
import * as body30 from "@/styles/text/body-30";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";

const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);
const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Desktop: "hidden-desktop",
  Phone: "hidden-about-phone",
  Tablet: "hidden-about-tablet",
};

const animation = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 30 };

const transition1 = { delay: 0.1, duration: 2, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const textEffect = {
  effect: animation,
  repeat: false,
  startDelay: 0.2,
  tokenization: "line",
  transition: transition1,
  trigger: "onMount",
  type: "appear",
} as const;

const transition2 = { delay: 0.2, duration: 0.5, ease: [0, 0, 1, 1], type: "tween" } as const;

const animation1 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition2,
  x: 0,
  y: 0,
} as const;

const animation2 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 0,
};

const transition3 = { delay: 1.1, duration: 0.5, ease: [0, 0, 1, 1], type: "tween" } as const;

const animation3 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition3,
  x: 0,
  y: 0,
} as const;

const transition4 = { delay: 1.2, duration: 0.5, ease: [0, 0, 1, 1], type: "tween" } as const;

const animation4 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition4,
  x: 0,
  y: 0,
} as const;

const transition5 = { delay: 0.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation5 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition5,
  x: 0,
  y: 0,
} as const;

const animation6 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  x: 0,
  y: 20,
};

const transition6 = { delay: 1.2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation7 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition6,
  x: 0,
  y: 0,
} as const;

const transition7 = { delay: 0.8, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation8 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition7,
  x: 0,
  y: 0,
} as const;

const animation9 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 20,
};

const transition8 = { delay: 0.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation10 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition8,
  x: 0,
  y: 0,
} as const;

const transition9 = { delay: 1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation11 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition9,
  x: 0,
  y: 0,
} as const;

const transition10 = { delay: 1.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation12 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition10,
  x: 0,
  y: 0,
} as const;

const animation13 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition6,
  x: 0,
  y: 0,
} as const;

const transition11 = { delay: 1.3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation14 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition11,
  x: 0,
  y: 0,
} as const;

const transition12 = { delay: 1.4, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation15 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition12,
  x: 0,
  y: 0,
} as const;

const animation16 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition12,
  x: 0,
  y: 0,
} as const;

const transition13 = { delay: 1.5, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation17 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition13,
  x: 0,
  y: 0,
} as const;

const transition14 = { delay: 1.6, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation18 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition14,
  x: 0,
  y: 0,
} as const;

const transition15 = { delay: 1.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation19 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition15,
  x: 0,
  y: 0,
} as const;

const transition16 = { delay: 1.8, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation20 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition16,
  x: 0,
  y: 0,
} as const;

const transition17 = { delay: 1.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation21 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition17,
  x: 0,
  y: 0,
} as const;

const transition18 = { delay: 2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation22 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition18,
  x: 0,
  y: 0,
} as const;

const transition19 = { delay: 2.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation23 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition19,
  x: 0,
  y: 0,
} as const;

const transition20 = { delay: 2.2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation24 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition20,
  x: 0,
  y: 0,
} as const;

const transition21 = { delay: 2.3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation25 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition21,
  x: 0,
  y: 0,
} as const;

const animation26 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition21,
  x: 0,
  y: 0,
} as const;

const transition22 = { delay: 2.4, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation27 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition22,
  x: 0,
  y: 0,
} as const;

const transition23 = { delay: 2.5, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation28 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition23,
  x: 0,
  y: 0,
} as const;

const transition24 = { delay: 2.6, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation29 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition24,
  x: 0,
  y: 0,
} as const;

const transition25 = { delay: 2.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation30 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition25,
  x: 0,
  y: 0,
} as const;

const transition26 = { delay: 2.8, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation31 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition26,
  x: 0,
  y: 0,
} as const;

const transition27 = { delay: 2.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation32 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition27,
  x: 0,
  y: 0,
} as const;

const transition28 = { delay: 3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation33 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition28,
  x: 0,
  y: 0,
} as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Desktop" | "Phone" | "Tablet";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const AboutPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body30.className, body13Uppercase.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const componentScopeId = "lihNgWMKM";

  useCustomCursors({});

  return (
    <GeneratedComponentContext.Provider
      value={{
        activeVariantId: baseVariant,
        humanReadableVariantMap: { Desktop: "Desktop", Phone: "Phone", Tablet: "Tablet" },
        primaryVariantId: "Desktop",
        hiddenClassNames,
      }}
    >
      <LayoutGroup id={layoutId ?? componentScopeId}>
        <HTMLStyle value="html body { background: rgb(255, 255, 255); }" />
        <motion.div
          {...restProps}
          className={cx(scopingClassNames, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div className={styles.sectionIntro} data-name="Section Intro">
              <div className={styles.frame}>
                <div className={styles.frame2}>
                  <RichText
                    className={styles.formaRepresentsTheEpitome}
                    data-name="Forma represents the epitome of forward-thinking design, where bold concepts meet refined execution. This project was born from a desire to create an experience that captures attention but also leaves a lasting impression."
                    effect={textEffect}
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-30" dir="auto">
                        Hi, I’m Aref.
                      </p>
                      <p className="text-body-30" dir="auto">
                        <br className="trailing-break" />
                      </p>
                      <p className="text-body-30" dir="auto">
                        I’m an industrial designer interested in what happens when different disciplines
                        overlap. I’ve worked across furniture, consumer products, accessories, packaging,
                        visualization, branding, and digital experiences.
                      </p>
                      <p className="text-body-30" dir="auto">
                        <br className="trailing-break" />
                      </p>
                      <p className="text-body-30" dir="auto">
                        I’m fascinated by how people interact with objects, technology, and the spaces around
                        them, and I believe the best design comes from considering all of those things
                        together.
                      </p>
                      <p className="text-body-30" dir="auto">
                        <br className="trailing-break" />
                      </p>
                      <p className="text-body-30" dir="auto">
                        My work is driven by curiosity, iteration, and the belief that thoughtful design can
                        make even the most complex ideas feel effortless.
                      </p>
                    </>
                  </RichText>
                </div>
                <div className={styles.sticky} data-name="Sticky" />
              </div>
              <div className={styles.imageWrapper} data-name="Image Wrapper">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      animate: animation4,
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 2999,
                        intrinsicWidth: 2000,
                        loading: getLoadingLazyAtYPosition(viewportY + 1385),
                        pixelHeight: 2999,
                        pixelWidth: 2000,
                        sizes: `max(${viewportWidth} - 40px, 1px)`,
                        src: "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999",
                        srcSet:
                          "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=1024&lossless=1&width=2000&height=2999 682w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=2048&lossless=1&width=2000&height=2999 1365w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999 2000w",
                      },
                    },
                    Tablet: {
                      animate: animation3,
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 2999,
                        intrinsicWidth: 2000,
                        loading: getLoadingLazyAtYPosition(viewportY + 1435),
                        pixelHeight: 2999,
                        pixelWidth: 2000,
                        sizes: `max((${viewportWidth} - 40px) * 0.5, 1px)`,
                        src: "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999",
                        srcSet:
                          "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=1024&lossless=1&width=2000&height=2999 682w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=2048&lossless=1&width=2000&height=2999 1365w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999 2000w",
                      },
                    },
                  }}
                >
                  <Image1WithOptimizedAppearEffect
                    animate={animation1}
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 2999,
                      intrinsicWidth: 2000,
                      loading: getLoadingLazyAtYPosition(viewportY + 200),
                      pixelHeight: 2999,
                      pixelWidth: 2000,
                      sizes: `max((${viewportWidth} - 80px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999",
                      srcSet:
                        "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=1024&lossless=1&width=2000&height=2999 682w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=2048&lossless=1&width=2000&height=2999 1365w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?lossless=1&width=2000&height=2999 2000w",
                    }}
                    className={styles.image}
                    data-appear-id="1uod47b"
                    data-name="Image"
                    initial={animation2}
                    optimized
                  />
                </PropertyOverrides>
              </div>
            </div>
            <div className={styles.container} data-name="Container">
              <div className={styles.experience} data-name="Experience">
                <div className={styles.experienceTitle} data-name="Title">
                  <PropertyOverrides breakpoint={baseVariant} overrides={{ Phone: { animate: animation7 } }}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation5}
                      className={styles.text}
                      data-appear-id="6061f0"
                      fonts={["Inter"]}
                      initial={animation6}
                      optimized
                      style={{ transformPerspective: 1200 }}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase" dir="auto">
                          EXPERIENCE
                        </p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </PropertyOverrides>
                </div>
                <div className={styles.experienceContent} data-name="Content">
                  <div className={styles.textLineWrapper} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2301.05 },
                        Tablet: { y: viewportY + 2194.55 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1166.05}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation8}
                          className={styles.experienceRow}
                          data-appear-id="1jx3smm"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { variant: matchVariant("Experience Row - mobile") } }}
                          >
                            <ExperienceRow
                              role="Jr Industrial Designer"
                              height="100%"
                              style={{ width: "100%" }}
                              company="Leadoff Studio"
                              variant={matchVariant("Experience Row")}
                              dates="May 2026 — Present"
                              width="100%"
                            />
                          </PropertyOverrides>
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2349.05 },
                        Tablet: { y: viewportY + 2242.55 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1214.05}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation10}
                          className={styles.experienceRow2}
                          data-appear-id="trk3ww"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { variant: matchVariant("Experience Row - mobile") } }}
                          >
                            <ExperienceRow
                              role="Industrial Design Intern"
                              height="100%"
                              style={{ width: "100%" }}
                              company="Leadoff Studio"
                              variant={matchVariant("Experience Row")}
                              dates="December 2025 — May 2026"
                              width="100%"
                            />
                          </PropertyOverrides>
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2397.05 },
                        Tablet: { y: viewportY + 2290.55 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1262.05}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation11}
                          className={styles.experienceRow3}
                          data-appear-id="18rock5"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { variant: matchVariant("Experience Row - mobile") } }}
                          >
                            <ExperienceRow
                              role="Jr Industrial Designer"
                              height="100%"
                              style={{ width: "100%" }}
                              company="General Populace"
                              variant={matchVariant("Experience Row")}
                              dates="September 2024 — December 2025"
                              width="100%"
                            />
                          </PropertyOverrides>
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2445.05 },
                        Tablet: { y: viewportY + 2338.55 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1310.05}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation12}
                          className={styles.experienceRow4}
                          data-appear-id="18a3eu0"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { variant: matchVariant("Experience Row - mobile") } }}
                          >
                            <ExperienceRow
                              role="Industrial Design Intern"
                              height="100%"
                              style={{ width: "100%" }}
                              company="General Populace"
                              variant={matchVariant("Experience Row")}
                              dates="June 2024 — September 2024"
                              width="100%"
                            />
                          </PropertyOverrides>
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                </div>
              </div>
              <div className={styles.education} data-name="Education">
                <div className={styles.educationTitle} data-name="Title">
                  <RichTextWithOptimizedAppearEffect
                    animate={animation7}
                    className={styles.text2}
                    data-appear-id="1gdzomk"
                    fonts={["Inter"]}
                    initial={animation6}
                    optimized
                    style={{ transformPerspective: 1200 }}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-13-uppercase" dir="auto">
                        EDUCATION
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
                <div className={styles.educationContent} data-name="Content">
                  <div className={styles.textLineWrapper2} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2687.1 },
                        Tablet: { y: viewportY + 2550.6 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1502.1}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation13}
                          className={styles.experienceRow5}
                          data-appear-id="b2ee94"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <ExperienceRow
                            role={"Savannah College of Art & Design"}
                            height="100%"
                            style={{ width: "100%" }}
                            company="BFA - INDUSTRIAL DESIGN"
                            variant={matchVariant("Experience Row")}
                            dates="2021 — 2025"
                            width="100%"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { width: `max(${viewportWidth} - 40px, 50px)`, y: viewportY + 2735.1 },
                        Tablet: { y: viewportY + 2598.6 },
                      }}
                    >
                      <ComponentViewportProvider
                        height={38}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1550.1}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation14}
                          className={styles.experienceRow6}
                          data-appear-id="1ajo15h"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { variant: matchVariant("Experience Row - mobile") } }}
                          >
                            <ExperienceRow
                              role="Dubai English Speaking College"
                              height="100%"
                              style={{ width: "100%" }}
                              company="GCSE"
                              variant={matchVariant("Experience Row")}
                              dates="2019 — 2021"
                              width="100%"
                            />
                          </PropertyOverrides>
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                </div>
              </div>
              <div className={styles.skills} data-name="Skills">
                <div className={styles.skillsTitle} data-name="Title">
                  <RichTextWithOptimizedAppearEffect
                    animate={animation15}
                    className={styles.text3}
                    data-appear-id="1maxxud"
                    fonts={["Inter"]}
                    initial={animation6}
                    optimized
                    style={{ transformPerspective: 1200 }}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-13-uppercase" dir="auto">
                        Skills
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
                <div className={styles.skillsContent} data-name="Content">
                  <div className={styles.textLineWrapper3} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 2977.15 }, Tablet: { y: viewportY + 2810.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 1742.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation16}
                          className={styles.infoContent}
                          data-appear-id="1tfhehu"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title={"Hand & Digital /Sketching"}
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{ Phone: { y: viewportY + 2994.15 }, Tablet: { y: viewportY + 2827.65 } }}
                  >
                    <ComponentViewportProvider
                      height={16}
                      width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                      y={viewportY + 1759.15}
                    >
                      <ContainerWithOptimizedAppearEffect
                        animate={animation17}
                        className={styles.infoContent2}
                        data-appear-id="gst54b"
                        initial={animation9}
                        optimized
                        rendersWithMotion
                      >
                        <InfoContent
                          height="100%"
                          style={{ width: "100%" }}
                          width="100%"
                          title="Shop Tools"
                        />
                      </ContainerWithOptimizedAppearEffect>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{ Phone: { y: viewportY + 3011.15 }, Tablet: { y: viewportY + 2844.65 } }}
                  >
                    <ComponentViewportProvider
                      height={16}
                      width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                      y={viewportY + 1776.15}
                    >
                      <ContainerWithOptimizedAppearEffect
                        animate={animation18}
                        className={styles.infoContent3}
                        data-appear-id="13q286w"
                        initial={animation9}
                        optimized
                        rendersWithMotion
                      >
                        <InfoContent
                          height="100%"
                          style={{ width: "100%" }}
                          width="100%"
                          title="UI/UX Design"
                        />
                      </ContainerWithOptimizedAppearEffect>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{ Phone: { y: viewportY + 3028.15 }, Tablet: { y: viewportY + 2861.65 } }}
                  >
                    <ComponentViewportProvider
                      height={16}
                      width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                      y={viewportY + 1793.15}
                    >
                      <ContainerWithOptimizedAppearEffect
                        animate={animation19}
                        className={styles.infoContent4}
                        data-appear-id="q8ht06"
                        initial={animation9}
                        optimized
                        rendersWithMotion
                      >
                        <InfoContent
                          height="100%"
                          style={{ width: "100%" }}
                          width="100%"
                          title="Motion Design"
                        />
                      </ContainerWithOptimizedAppearEffect>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                  <div className={styles.textLineWrapper4} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3045.15 }, Tablet: { y: viewportY + 2878.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 1810.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation20}
                          className={styles.infoContent5}
                          data-appear-id="ys87a0"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="FMCG Design Knowledge"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper5} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3062.15 }, Tablet: { y: viewportY + 2895.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 1827.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation21}
                          className={styles.infoContent6}
                          data-appear-id="1oy3qas"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Manufacturing Processes"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper6} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3079.15 }, Tablet: { y: viewportY + 2912.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1844.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation22}
                          className={styles.infoContent7}
                          data-appear-id="1ugq9ym"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Website Design"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper7} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3096.15 }, Tablet: { y: viewportY + 2929.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1861.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation23}
                          className={styles.infoContent8}
                          data-appear-id="1jpojb7"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Art Direction"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper8} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3113.15 }, Tablet: { y: viewportY + 2946.65 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 1878.15}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation24}
                          className={styles.infoContent9}
                          data-appear-id="1b0abs6"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Design Systems"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                </div>
              </div>
              <div className={styles.software} data-name="Software">
                <div className={styles.softwareTitle} data-name="Title">
                  <RichTextWithOptimizedAppearEffect
                    animate={animation25}
                    className={styles.text4}
                    data-appear-id="qevs7x"
                    fonts={["Inter"]}
                    initial={animation6}
                    optimized
                    style={{ transformPerspective: 1200 }}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-13-uppercase" dir="auto">
                        Software
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
                <div className={styles.softwareContent} data-name="Content">
                  <div className={styles.textLineWrapper9} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3315.2 }, Tablet: { y: viewportY + 3118.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 2030.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation26}
                          className={styles.infoContent10}
                          data-appear-id="1o1abxq"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent height="100%" style={{ width: "100%" }} width="100%" title="Rhino " />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper10} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3332.2 }, Tablet: { y: viewportY + 3135.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 2047.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation27}
                          className={styles.infoContent11}
                          data-appear-id="7idj8v"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Solidworks"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper11} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3349.2 }, Tablet: { y: viewportY + 3152.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 2064.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation28}
                          className={styles.infoContent12}
                          data-appear-id="f9cfo7"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent height="100%" style={{ width: "100%" }} width="100%" title="Cursor" />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper12} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3366.2 }, Tablet: { y: viewportY + 3169.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`max(max(${viewportWidth} - 40px, 50px) * 0.5, 1px)`}
                        y={viewportY + 2081.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation29}
                          className={styles.infoContent13}
                          data-appear-id="1xta2t4"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent height="100%" style={{ width: "100%" }} width="100%" title="Figma" />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper13} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3383.2 }, Tablet: { y: viewportY + 3186.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 2098.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation30}
                          className={styles.infoContent14}
                          data-appear-id="14qzn4s"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="Adobe CS"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper14} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3400.2 }, Tablet: { y: viewportY + 3203.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 2115.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation31}
                          className={styles.infoContent15}
                          data-appear-id="1cjctjt"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent height="100%" style={{ width: "100%" }} width="100%" title="Vizcom" />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper15} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3417.2 }, Tablet: { y: viewportY + 3220.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 2132.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation32}
                          className={styles.infoContent16}
                          data-appear-id="ys460t"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent height="100%" style={{ width: "100%" }} width="100%" title="Keyshot" />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                  <div className={styles.textLineWrapper16} data-name="Text Line Wrapper">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 3434.2 }, Tablet: { y: viewportY + 3237.7 } }}
                    >
                      <ComponentViewportProvider
                        height={16}
                        width={`calc(max(${viewportWidth} - 40px, 50px) * 0.5)`}
                        y={viewportY + 2149.2}
                      >
                        <ContainerWithOptimizedAppearEffect
                          animate={animation33}
                          className={styles.infoContent17}
                          data-appear-id="ebcbsv"
                          initial={animation9}
                          optimized
                          rendersWithMotion
                        >
                          <InfoContent
                            height="100%"
                            style={{ width: "100%" }}
                            width="100%"
                            title="AI, ML, and LLMs"
                          />
                        </ContainerWithOptimizedAppearEffect>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(AboutPage);

AboutPage.displayName = "About";

AboutPage.defaultProps = { height: 2563, width: 1200 };

AboutPage.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [() => forwardLoader(ExperienceRow, {}, context), () => forwardLoader(InfoContent, {}, context)],
      context,
    );
  },
};
