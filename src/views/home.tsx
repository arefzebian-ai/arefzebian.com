"use client";

import "@/styles/fonts/inter.css";
import styles from "./home.module.css";
import {
  addImageAlt,
  asPage,
  ChildrenCanSuspend,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getLoadingLazyAtYPosition,
  getRootLayoutProp,
  HTMLStyle,
  Image as Image1,
  inBrowser,
  isSet,
  Link,
  matchVariant,
  PathVariablesContext,
  PropertyOverrides,
  queryCache,
  RichText,
  runTasksWithYield,
  runWithYield,
  toResponsiveImage,
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  useQueryData,
  useSiteRefs,
  withCodeBoundaryForOverrides,
  withOptimizedAppearEffect,
  withVariantAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import CTAButton from "@/components/cta-button";
import TextLink from "@/components/text-link";
import ScrollToViewMore from "@/components/scroll-to-view-more";
import ProjectCard from "@/components/project-card";
import HeroLoader from "@/components/hero-loader";
import { withScrollBlockerOverride } from "@/code/stop-scroll";
import { useHeroIntroStarted, whenHeroIntroStarted } from "@/lib/hero-intro";
import Blog from "@/cms/blog";
import Works from "@/cms/works";
import * as body20 from "@/styles/text/body-20";
import * as h1 from "@/styles/text/h1";
import * as h2 from "@/styles/text/h2";
import * as bodyH1Style from "@/styles/text/body-h1-style";

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const MotionDivWithOptimizedAppearEffect = withOptimizedAppearEffect(motion.div);
const HeroLoaderWithVariantAppearEffect = withVariantAppearEffect(HeroLoader);
const MotionDivWithScrollBlockerOverride = withCodeBoundaryForOverrides(motion.div, {
  nodeId: "layer",
  override: withScrollBlockerOverride,
  scopeId: "HomePage",
});
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Desktop: "hidden-desktop",
  Phone: "hidden-home-phone",
  Tablet: "hidden-home-tablet",
};

const transition1 = { delay: 2.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition1,
  x: 0,
  y: 0,
} as const;

const animation1 = {
  opacity: 1,
  rotate: -2,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 50,
};

const transition2 = { delay: 2.8, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation2 = {
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

const transition3 = { delay: 2.6, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const transition4 = { delay: 2.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const animation5 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 40,
};

const transition5 = { delay: 2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation6 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition5,
  x: 0,
  y: 0,
} as const;

const animation7 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 50,
};

const transition6 = { delay: 3.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation8 = {
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

const animation9 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 130,
};

const query = () => ({
  from: { alias: "works20", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 6 },
  select: [],
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = () => ({
  from: { alias: "works21", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 0 },
  select: [
    { collection: "works21", name: "title", type: "Identifier" },
    { collection: "works21", name: "subtitle", type: "Identifier" },
    { collection: "works21", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works21", name: "thumbnailWide", type: "Identifier" },
    { collection: "works21", name: "thumbnailSquare", type: "Identifier" },
    { collection: "works21", name: "thumbnailVideoWide", type: "Identifier" },
    { collection: "works21", name: "worksSlug", type: "Identifier" },
    { collection: "works21", name: "id", type: "Identifier" },
  ],
});

const query2 = () => ({
  from: { alias: "works22", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [
    { collection: "works22", name: "title", type: "Identifier" },
    { collection: "works22", name: "subtitle", type: "Identifier" },
    { collection: "works22", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works22", name: "thumbnailWide", type: "Identifier" },
    { collection: "works22", name: "thumbnailSquare", type: "Identifier" },
    { collection: "works22", name: "thumbnailVideoSquare", type: "Identifier" },
    { collection: "works22", name: "worksSlug", type: "Identifier" },
    { collection: "works22", name: "id", type: "Identifier" },
  ],
});

const query3 = () => ({
  from: { alias: "works23", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 3 },
  select: [
    { collection: "works23", name: "title", type: "Identifier" },
    { collection: "works23", name: "subtitle", type: "Identifier" },
    { collection: "works23", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works23", name: "thumbnailWide", type: "Identifier" },
    { collection: "works23", name: "thumbnailSquare", type: "Identifier" },
    { collection: "works23", name: "thumbnailVideoSquare", type: "Identifier" },
    { collection: "works23", name: "worksSlug", type: "Identifier" },
    { collection: "works23", name: "id", type: "Identifier" },
  ],
});

const query4 = () => ({
  from: { alias: "works24", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works24", name: "title", type: "Identifier" },
    { collection: "works24", name: "subtitle", type: "Identifier" },
    { collection: "works24", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works24", name: "thumbnailWide", type: "Identifier" },
    { collection: "works24", name: "thumbnailSquare", type: "Identifier" },
    { collection: "works24", name: "thumbnailVideoWide", type: "Identifier" },
    { collection: "works24", name: "worksSlug", type: "Identifier" },
    { collection: "works24", name: "id", type: "Identifier" },
  ],
});

const query5 = () => ({
  from: { alias: "blog16", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 0 },
  select: [
    { collection: "blog16", name: "thumbnail", type: "Identifier" },
    { collection: "blog16", name: "blogSlug", type: "Identifier" },
    { collection: "blog16", name: "id", type: "Identifier" },
  ],
});

const query6 = () => ({
  from: { alias: "blog17", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [],
});

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

const HomePage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(
    styles.page,
    h1.className,
    bodyH1Style.className,
    h2.className,
    body20.className,
  );

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const elementId = "trigger";

  const dynamicRef = useSiteRefs<HTMLDivElement>();

  const isDisplayed = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Phone") return false;
    return true;
  };

  const isDisplayed1 = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Phone") return true;
    return false;
  };

  const ref1 = React.useRef<HTMLElement>(null);

  const componentScopeId = "mSWM2gwDI";

  // The hero copy, CTA and scroll hint start their authored delays when the hero loader starts
  // (not when the page is parsed), so a slow hydration can't play them before the image has grown.
  // Until then they sit in their `initial` state. They don't use the head script's optimized appear.
  const heroIntroStarted = useHeroIntroStarted();
  const heroIntro = (target: object, initial: object) => (heroIntroStarted ? target : initial);
  const ctaAppearAfter = whenHeroIntroStarted();

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
        <HTMLStyle value="html body { background: rgb(0, 0, 0); }" />
        <motion.div
          {...restProps}
          className={cx(scopingClassNames, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div
              className={styles.navVariantTrigger}
              data-name="Nav Variant Trigger"
              id={elementId}
              ref={dynamicRef(elementId)}
            />
            <div className={styles.sectionHeader} data-name="Section Header">
              <div className={styles.content} data-name="Content">
                <div className={styles.contentHeading} data-name="Heading">
                  {isDisplayed() && (
                    <div className={cx(styles.line, "hidden-home-phone")} data-name="Line 1">
                      <RichTextWithOptimizedAppearEffect
                        animate={heroIntro(animation, animation1)}
                        className={styles.text}
                        data-appear-id="uhtmf4"
                        fonts={["Inter"]}
                        initial={animation1}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <h1
                            className="text-h1"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                          >
                            I'm Aref Zebian
                          </h1>
                        </>
                      </RichTextWithOptimizedAppearEffect>
                    </div>
                  )}
                  {isDisplayed() && (
                    <div className={cx(styles.line2, "hidden-home-phone")} data-name="Line 2">
                      <RichTextWithOptimizedAppearEffect
                        animate={heroIntro(animation2, animation1)}
                        className={styles.text2}
                        data-appear-id="odk6ck"
                        fonts={["Inter"]}
                        initial={animation1}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            className="text-body-h1-style"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                          >
                            Industrial Designer based in nyc
                          </p>
                        </>
                      </RichTextWithOptimizedAppearEffect>
                    </div>
                  )}
                  {isDisplayed1() && (
                    <div
                      className={cx(styles.mobile, "hidden-desktop", "hidden-home-tablet")}
                      data-name="Mobile"
                    >
                      <div className={styles.frame}>
                        <RichTextWithOptimizedAppearEffect
                          animate={heroIntro(animation3, animation1)}
                          className={styles.redefiningCreativity}
                          data-appear-id="1k8jdbx"
                          data-name="Redefining creativity for the future with flawless execution."
                          fonts={["Inter"]}
                          initial={animation1}
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <h1 className="text-h1" dir="auto">
                              I'm Aref
                            </h1>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                      <div className={styles.frame2}>
                        <RichTextWithOptimizedAppearEffect
                          animate={heroIntro(animation, animation1)}
                          className={styles.redefiningCreativity2}
                          data-appear-id="gkk1jq"
                          data-name="Redefining creativity for the future with flawless execution."
                          fonts={["Inter"]}
                          initial={animation1}
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <h1 className="text-h1" dir="auto">
                              Industrial Designer
                            </h1>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                      {isDisplayed() && (
                        <div className={cx(styles.frame3, "hidden-home-phone")}>
                          <RichTextWithOptimizedAppearEffect
                            animate={heroIntro(animation2, animation1)}
                            className={styles.redefiningCreativity3}
                            data-appear-id="1mpd3q1"
                            data-name="Redefining creativity for the future with flawless execution."
                            fonts={["Inter"]}
                            initial={animation1}
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <h1 className="text-h1">flawless execution.</h1>
                            </>
                          </RichTextWithOptimizedAppearEffect>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <MotionDivWithOptimizedAppearEffect
                  animate={heroIntro(animation4, animation5)}
                  className={styles.button}
                  data-appear-id="1upzk6g"
                  data-name="Button"
                  initial={animation5}
                >
                  <PropertyOverrides breakpoint={baseVariant} overrides={{ Phone: { y: undefined } }}>
                    <ComponentViewportProvider height={37} y={viewportY + 598.82}>
                      <Container className={styles.ctaButton}>
                        <PropertyOverrides
                          breakpoint={baseVariant}
                          overrides={{
                            Phone: { link: "/works/grid-view" },
                            Tablet: { link: "/works/grid-view" },
                          }}
                        >
                          <CTAButton
                            appearAfter={ctaAppearAfter}
                            link="/works/grid-view"
                            height="100%"
                            variant={matchVariant("Appear")}
                            width="100%"
                            label="View Projects"
                          />
                        </PropertyOverrides>
                      </Container>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                </MotionDivWithOptimizedAppearEffect>
              </div>
              <MotionDivWithScrollBlockerOverride className={styles.loader} data-name="Loader">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{ Phone: { height: 910, y: undefined } }}
                >
                  <ComponentViewportProvider height={1000} width={viewportWidth} y={viewportY}>
                    <Container className={styles.heroLoader} id="7pj11p" rendersWithMotion>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{
                          Phone: {
                            __fx_obscuredVariantId: "Mobile - Initial",
                            __fx_visibleVariantId: "Mobile Step 1",
                            variant: matchVariant("Mobile Step 2"),
                          },
                        }}
                      >
                        <HeroLoaderWithVariantAppearEffect
                          __fx_animateOnce
                          __fx_obscuredVariantId="Initial State"
                          __fx_threshold={0.5}
                          __fx_variantAppearEffectEnabled
                          __fx_visibleVariantId="Step 1"
                          height="100%"
                          image1={addImageAlt(
                            {
                              pixelHeight: 5071,
                              pixelWidth: 7606,
                              src: "https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?width=7606&height=5071",
                              srcSet:
                                "https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=512&width=7606&height=5071 512w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=1024&width=7606&height=5071 1024w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=2048&width=7606&height=5071 2048w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=4096&width=7606&height=5071 4096w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?width=7606&height=5071 7606w",
                            },
                            "",
                          )}
                          image3={addImageAlt(
                            {
                              pixelHeight: 1143,
                              pixelWidth: 2048,
                              src: "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143",
                              srcSet:
                                "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=512&width=2048&height=1143 512w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=1024&width=2048&height=1143 1024w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143 2048w",
                            },
                            "",
                          )}
                          style={{ height: "100%", width: "100%" }}
                          image2={addImageAlt(
                            {
                              pixelHeight: 1080,
                              pixelWidth: 1920,
                              src: "https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?width=1920&height=1080",
                              srcSet:
                                "https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?scale-down-to=512&width=1920&height=1080 512w,https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?scale-down-to=1024&width=1920&height=1080 1024w,https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?width=1920&height=1080 1920w",
                            },
                            "",
                          )}
                          variant={matchVariant("Step 2")}
                          width="100%"
                        />
                      </PropertyOverrides>
                    </Container>
                  </ComponentViewportProvider>
                </PropertyOverrides>
              </MotionDivWithScrollBlockerOverride>
              <div className={styles.bottomRow} data-name="Bottom Row">
                {isDisplayed() && (
                  <div className={cx(styles.frame4, "hidden-home-phone")}>
                    <ComponentViewportProvider height={15} y={viewportY + 965}>
                      <ContainerWithOptimizedAppearEffect
                        animate={heroIntro(animation6, animation7)}
                        className={styles.scrollToViewMore}
                        data-appear-id="9ijin1"
                        initial={animation7}
                        rendersWithMotion
                      >
                        <PropertyOverrides
                          breakpoint={baseVariant}
                          overrides={{ Tablet: { link: "/#projects" } }}
                        >
                          <ScrollToViewMore
                            height="100%"
                            link="/#projects"
                            variant={matchVariant("Variant 1")}
                            width="100%"
                          />
                        </PropertyOverrides>
                      </ContainerWithOptimizedAppearEffect>
                    </ComponentViewportProvider>
                  </div>
                )}
                <MotionDivWithOptimizedAppearEffect
                  animate={animation8}
                  className={styles.frame5}
                  data-appear-id="118mmyn"
                  initial={animation9}
                  optimized
                >
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
                      {(collection, paginationInfo, loadMore) => {
                        return <></>;
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </MotionDivWithOptimizedAppearEffect>
              </div>
            </div>
            <section
              className={styles.sectionFeaturedProjects}
              data-name="Section Featured Projects"
              id="projects"
              ref={ref1}
            >
              <div className={styles.sectionFeaturedHeading} data-name="Heading">
                <RichText
                  className={styles.featuredProjects}
                  data-name="Featured Projects"
                  fonts={["Inter"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2 className="text-h2">Featured Projects</h2>
                  </>
                </RichText>
                <PropertyOverrides breakpoint={baseVariant} overrides={{ Phone: { y: undefined } }}>
                  <ComponentViewportProvider height={16} y={viewportY + 1122.4}>
                    <Container className={styles.headingTextLink}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{
                          Phone: { link: "/works/grid-view", label: "View All" },
                          Tablet: { link: "/works/grid-view" },
                        }}
                      >
                        <TextLink
                          link="/works/grid-view"
                          height="100%"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="View All Projects"
                          color="rgb(0, 0, 0)"
                        />
                      </PropertyOverrides>
                    </Container>
                  </ComponentViewportProvider>
                </PropertyOverrides>
              </div>
              <div className={styles.projectsRow} data-name="Projects Row">
                <div className={styles.frame6}>
                  <ChildrenCanSuspend>
                    <QueryData query={query1()}>
                      {(collection1, paginationInfo1, loadMore1) => {
                        return (
                          <>
                            {collection1?.map(
                              (
                                {
                                  subtitle,
                                  id: worksId,
                                  title,
                                  worksSlug: slug,
                                  thumbnailVideoWide,
                                  thumbnailWide,
                                  thumbnailSquare,
                                  thumbnailPortrait,
                                }: any,
                                index,
                              ) => {
                                title ??= "";
                                subtitle ??= "";
                                slug ??= "";
                                return (
                                  <LayoutGroup id={`works21-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href="/halv" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                height: 455,
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: undefined,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={456}
                                              width={`max((${viewportWidth} - 60px) * 0.6, 1px)`}
                                              y={viewportY + 1158.4}
                                            >
                                              <Container className={styles.projectCard}>
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: {
                                                      style: { width: "100%" },
                                                      variant: matchVariant(
                                                        "Project Card - Wide - Tablet/Mobile",
                                                      ),
                                                    },
                                                    Tablet: {
                                                      variant: matchVariant(
                                                        "Project Card - Wide - Tablet/Mobile",
                                                      ),
                                                    },
                                                  }}
                                                >
                                                  <ProjectCard
                                                    subtitle={subtitle}
                                                    thumbnailWide={toResponsiveImage(thumbnailWide)}
                                                    videoWide1={isSet(thumbnailVideoWide)}
                                                    videoWide={thumbnailVideoWide}
                                                    title={title}
                                                    height="100%"
                                                    thumbnailSquare={toResponsiveImage(thumbnailSquare)}
                                                    videoSquare1
                                                    style={{ height: "100%", width: "100%" }}
                                                    thumbnailPortrait={toResponsiveImage(thumbnailPortrait)}
                                                    variant={matchVariant("Project Card - Wide 2")}
                                                    width="100%"
                                                    videoPortrait1
                                                  />
                                                </PropertyOverrides>
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame7}>
                  <ChildrenCanSuspend>
                    <QueryData query={query2()}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  subtitle: subtitleWorks,
                                  thumbnailVideoSquare,
                                  id: worksIdWorks,
                                  title: titleWorks,
                                  worksSlug: slugWorks,
                                  thumbnailWide: thumbnailWideWorks,
                                  thumbnailSquare: thumbnailSquareWorks,
                                  thumbnailPortrait: thumbnailPortraitWorks,
                                }: any,
                                index1,
                              ) => {
                                titleWorks ??= "";
                                subtitleWorks ??= "";
                                slugWorks ??= "";
                                return (
                                  <LayoutGroup id={`works22-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/revimo" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link3, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                height: 455,
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: undefined,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={456}
                                              width={`max((${viewportWidth} - 60px) * 0.4, 1px)`}
                                              y={viewportY + 1158.4}
                                            >
                                              <Container className={styles.projectCard2}>
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: {
                                                      style: { width: "100%" },
                                                      variant: matchVariant(
                                                        "Project Card - Square - Tablet/Mobile",
                                                      ),
                                                    },
                                                    Tablet: {
                                                      variant: matchVariant(
                                                        "Project Card - Square - Tablet/Mobile",
                                                      ),
                                                    },
                                                  }}
                                                >
                                                  <ProjectCard
                                                    subtitle={subtitleWorks}
                                                    thumbnailWide={toResponsiveImage(thumbnailWideWorks)}
                                                    videoWide1
                                                    videoSquare={thumbnailVideoSquare}
                                                    title={titleWorks}
                                                    height="100%"
                                                    thumbnailSquare={toResponsiveImage(thumbnailSquareWorks)}
                                                    videoSquare1={isSet(thumbnailVideoSquare)}
                                                    style={{ height: "100%", width: "100%" }}
                                                    thumbnailPortrait={toResponsiveImage(
                                                      thumbnailPortraitWorks,
                                                    )}
                                                    variant={matchVariant("Project Card - Square")}
                                                    width="100%"
                                                    videoPortrait1
                                                  />
                                                </PropertyOverrides>
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
              </div>
              <div className={styles.projectsRow2} data-name="Projects Row">
                <div className={styles.frame8}>
                  <ChildrenCanSuspend>
                    <QueryData query={query3()}>
                      {(collection3, paginationInfo3, loadMore3) => {
                        return (
                          <>
                            {collection3?.map(
                              (
                                {
                                  subtitle: subtitle2,
                                  thumbnailVideoSquare: thumbnailVideoSquareWorks,
                                  id: worksId2,
                                  title: title2,
                                  worksSlug: slug2,
                                  thumbnailWide: thumbnailWide2,
                                  thumbnailSquare: thumbnailSquare2,
                                  thumbnailPortrait: thumbnailPortrait2,
                                }: any,
                                index2,
                              ) => {
                                title2 ??= "";
                                subtitle2 ??= "";
                                slug2 ??= "";
                                return (
                                  <LayoutGroup id={`works23-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link4, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                height: 455,
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: undefined,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={456}
                                              width={`max((${viewportWidth} - 60px) * 0.4, 1px)`}
                                              y={viewportY + 1634.4}
                                            >
                                              <Container className={styles.projectCard3}>
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: {
                                                      style: { width: "100%" },
                                                      variant: matchVariant(
                                                        "Project Card - Square - Tablet/Mobile",
                                                      ),
                                                    },
                                                    Tablet: {
                                                      variant: matchVariant(
                                                        "Project Card - Square - Tablet/Mobile",
                                                      ),
                                                    },
                                                  }}
                                                >
                                                  <ProjectCard
                                                    subtitle={subtitle2}
                                                    thumbnailWide={toResponsiveImage(thumbnailWide2)}
                                                    videoWide1
                                                    videoSquare={thumbnailVideoSquareWorks}
                                                    title={title2}
                                                    height="100%"
                                                    thumbnailSquare={toResponsiveImage(thumbnailSquare2)}
                                                    videoSquare1={isSet(thumbnailVideoSquareWorks)}
                                                    style={{ height: "100%", width: "100%" }}
                                                    thumbnailPortrait={toResponsiveImage(thumbnailPortrait2)}
                                                    variant={matchVariant("Project Card - Square")}
                                                    width="100%"
                                                    videoPortrait1
                                                  />
                                                </PropertyOverrides>
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame9}>
                  <ChildrenCanSuspend>
                    <QueryData query={query4()}>
                      {(collection4, paginationInfo4, loadMore4) => {
                        return (
                          <>
                            {collection4?.map(
                              (
                                {
                                  subtitle: subtitle3,
                                  id: worksId3,
                                  title: title3,
                                  worksSlug: slug3,
                                  thumbnailVideoWide: thumbnailVideoWideWorks,
                                  thumbnailWide: thumbnailWide3,
                                  thumbnailSquare: thumbnailSquare3,
                                  thumbnailPortrait: thumbnailPortrait3,
                                }: any,
                                index3,
                              ) => {
                                title3 ??= "";
                                subtitle3 ??= "";
                                slug3 ??= "";
                                return (
                                  <LayoutGroup id={`works24-${worksId3}`} key={worksId3}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug3 }}>
                                      <Link href="/aether" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link5, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                height: 455,
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: undefined,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={456}
                                              width={`max((${viewportWidth} - 60px) * 0.6, 1px)`}
                                              y={viewportY + 1634.4}
                                            >
                                              <Container className={styles.projectCard4}>
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: {
                                                      style: { width: "100%" },
                                                      variant: matchVariant(
                                                        "Project Card - Wide - Tablet/Mobile",
                                                      ),
                                                    },
                                                    Tablet: {
                                                      variant: matchVariant(
                                                        "Project Card - Wide - Tablet/Mobile",
                                                      ),
                                                    },
                                                  }}
                                                >
                                                  <ProjectCard
                                                    subtitle={subtitle3}
                                                    thumbnailWide={toResponsiveImage(thumbnailWide3)}
                                                    videoWide1={isSet(thumbnailVideoWideWorks)}
                                                    videoWide={thumbnailVideoWideWorks}
                                                    title={title3}
                                                    height="100%"
                                                    thumbnailSquare={toResponsiveImage(thumbnailSquare3)}
                                                    videoSquare1
                                                    style={{ height: "100%", width: "100%" }}
                                                    thumbnailPortrait={toResponsiveImage(thumbnailPortrait3)}
                                                    variant={matchVariant("Project Card - Wide 2")}
                                                    width="100%"
                                                    videoPortrait1
                                                  />
                                                </PropertyOverrides>
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
              </div>
            </section>
            <div className={styles.sectionJournal} data-name="Section Journal">
              <div className={styles.frame10}>
                <RichText
                  className={styles.faqS}
                  data-name="FAQ’s"
                  fonts={["Inter"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2 className="text-h2" dir="auto">
                      About Me
                    </h2>
                  </>
                </RichText>
                <PropertyOverrides breakpoint={baseVariant} overrides={{ Phone: { y: undefined } }}>
                  <ComponentViewportProvider height={16} y={viewportY + 2251.6}>
                    <Container className={styles.sectionJournalTextLink}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{
                          Phone: { link: "/about", label: "Read All" },
                          Tablet: { link: "/about" },
                        }}
                      >
                        <TextLink
                          link="/about"
                          height="100%"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="Read More"
                          color="rgb(0, 0, 0)"
                        />
                      </PropertyOverrides>
                    </Container>
                  </ComponentViewportProvider>
                </PropertyOverrides>
              </div>
              <div className={styles.sectionJournalContainer} data-name="Container">
                <div className={styles.frame11}>
                  <ChildrenCanSuspend>
                    <QueryData query={query5()}>
                      {(collection5, paginationInfo5, loadMore5) => {
                        return (
                          <>
                            {collection5?.map(
                              ({ id: blogId, thumbnail, blogSlug: slugBlog }: any, index4) => {
                                slugBlog ??= "";
                                return (
                                  <LayoutGroup id={`blog16-${blogId}`} key={blogId}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slugBlog }}>
                                      <Link href="/about" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.sectionJournalLink, styles.link2)}>
                                          <div className={styles.articleCard} data-name="Article Card">
                                            <div
                                              className={styles.articleCardContainer}
                                              data-name="Container"
                                            >
                                              <div className={styles.imageWrapper} data-name="Image Wrapper">
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: {
                                                      background: {
                                                        alt: "",
                                                        fit: "fill",
                                                        intrinsicHeight: 2999,
                                                        intrinsicWidth: 2000,
                                                        pixelHeight: 7762,
                                                        pixelWidth: 5175,
                                                        sizes: `max(${viewportWidth} - 40px, 1px)`,
                                                        ...toResponsiveImage(thumbnail),
                                                        ...{ positionX: "center", positionY: "top" },
                                                      },
                                                    },
                                                    Tablet: {
                                                      background: {
                                                        alt: "",
                                                        fit: "fill",
                                                        intrinsicHeight: 2999,
                                                        intrinsicWidth: 2000,
                                                        loading: getLoadingLazyAtYPosition(
                                                          viewportY + 2298.8,
                                                        ),
                                                        pixelHeight: 7762,
                                                        pixelWidth: 5175,
                                                        sizes: `max((${viewportWidth} - 80px) / 3, 1px)`,
                                                        ...toResponsiveImage(thumbnail),
                                                        ...{ positionX: "center", positionY: "top" },
                                                      },
                                                    },
                                                  }}
                                                >
                                                  <Image1
                                                    background={{
                                                      alt: "",
                                                      fit: "fill",
                                                      intrinsicHeight: 2999,
                                                      intrinsicWidth: 2000,
                                                      loading: getLoadingLazyAtYPosition(viewportY + 2298.8),
                                                      pixelHeight: 2999,
                                                      pixelWidth: 2000,
                                                      positionX: "center",
                                                      positionY: "top",
                                                      sizes: `max((${viewportWidth} - 80px) / 3, 1px)`,
                                                      src: "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?width=2000&height=2999",
                                                      srcSet:
                                                        "https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=1024&width=2000&height=2999 682w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?scale-down-to=2048&width=2000&height=2999 1365w,https://framerusercontent.com/images/82uTDfKgVXQ8kS6RecGXyhIWYE.jpg?width=2000&height=2999 2000w",
                                                    }}
                                                    className={styles.image}
                                                    data-name="Image"
                                                  />
                                                </PropertyOverrides>
                                              </div>
                                            </div>
                                          </div>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.details} data-name="Details">
                  <div className={styles.detailsHeading} data-name="Heading">
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { text: undefined }, Tablet: { text: undefined } }}
                    >
                      <RichText
                        className={styles.aLetter}
                        data-name="A Letter From the Founders"
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-20" dir="auto">
                            I’m Aref, <br />a designer with generalist tendencies and a passion for creating
                            products that reflect how we actually live.
                          </p>
                        </>
                      </RichText>
                    </PropertyOverrides>
                  </div>
                </div>
                <div className={styles.frame12}>
                  <ChildrenCanSuspend>
                    <QueryData query={query6()}>
                      {(collection6, paginationInfo6, loadMore6) => {
                        return <></>;
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
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

export default asPage(HomePage);

HomePage.displayName = "Home";

HomePage.defaultProps = { height: 3007, width: 1200 };

HomePage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const queryCacheEntry = queryCache.get(query(), locale, priority);
    const queryCacheEntry1 = queryCache.get(query1(), locale, priority);
    const queryCacheEntry2 = queryCache.get(query2(), locale, priority);
    const queryCacheEntry3 = queryCache.get(query3(), locale, priority);
    const queryCacheEntry4 = queryCache.get(query4(), locale, priority);
    const queryCacheEntry5 = queryCache.get(query5(), locale, priority);
    const queryCacheEntry6 = queryCache.get(query6(), locale, priority);
    return runTasksWithYield(
      [
        () => queryCacheEntry.preload(),
        () => queryCacheEntry1.preload(),
        () => queryCacheEntry2.preload(),
        () => queryCacheEntry3.preload(),
        () => queryCacheEntry4.preload(),
        () => queryCacheEntry5.preload(),
        () => queryCacheEntry6.preload(),
        () => forwardLoader(CTAButton, {}, context),
        () => forwardLoader(HeroLoader, {}, context),
        () => forwardLoader(ScrollToViewMore, {}, context),
        () => forwardLoader(TextLink, {}, context),
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry1.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry2.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry3.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry4.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
      ],
      context,
    );
  },
};
