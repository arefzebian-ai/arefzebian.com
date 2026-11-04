"use client";

import "@/styles/fonts/inter.css";
import "@/styles/fonts/favorit-light.css";
import styles from "./pelagostone.module.css";
import {
  addFonts,
  asPage,
  ChildrenCanSuspend,
  clientOnly,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getFonts,
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
  withFonts,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import { Icon as Material } from "@/vendor/material";

import TextLink from "@/components/text-link";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import * as body20 from "@/styles/text/body-20";
import * as body14 from "@/styles/text/body-14";
import * as h2 from "@/styles/text/h2";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";
import * as body25 from "@/styles/text/body-25";
import * as body13 from "@/styles/text/body-13";

// Browser-only code: loaded after hydration, as on the published site.
const Video = clientOnly(() => import("@/vendor/video").then((m) => m.Video));

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const MotionDivWithOptimizedAppearEffect = withOptimizedAppearEffect(motion.div);
const VideoFonts = getFonts(Video);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-pelagostone-phone",
  Tablet: "hidden-pelagostone-tablet",
  Desktop: "hidden-desktop",
};

const animation = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 50 };

const transition1 = { delay: 0.08, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const textEffect = {
  effect: animation,
  repeat: false,
  startDelay: 0.4,
  tokenization: "line",
  transition: transition1,
  trigger: "onMount",
  type: "appear",
} as const;

const transition2 = { delay: 0.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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
  y: 20,
};

const transition3 = { delay: 0.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const transition4 = { delay: 1.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const transition5 = { delay: 1.2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation5 = {
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

const transition6 = { delay: 1.3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation6 = {
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

const transition7 = { delay: 1.4, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation7 = {
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

const transition8 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const animation8 = {
  backgroundColor: "rgb(255, 255, 255)",
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition8,
} as const;

const query = () => ({
  from: { alias: "works31", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works31", name: "title", type: "Identifier" },
    { collection: "works31", name: "category", type: "Identifier" },
    { collection: "works31", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works31", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works31", name: "worksSlug", type: "Identifier" },
    { collection: "works31", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works31", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 1 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = () => ({
  from: { alias: "works32", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works32", name: "title", type: "Identifier" },
    { collection: "works32", name: "category", type: "Identifier" },
    { collection: "works32", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works32", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works32", name: "worksSlug", type: "Identifier" },
    { collection: "works32", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works32", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works33", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works33", name: "title", type: "Identifier" },
    { collection: "works33", name: "category", type: "Identifier" },
    { collection: "works33", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works33", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works33", name: "worksSlug", type: "Identifier" },
    { collection: "works33", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works33", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 4 },
    type: "BinaryOperation",
  },
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

const Component = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(
    styles.page,
    h2.className,
    body25.className,
    body14.className,
    body13Uppercase.className,
    body13.className,
    body40.className,
    body20.className,
  );

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const ref1 = React.useRef<HTMLDivElement>(null);

  const isDisplayed = () => {
    if (!inBrowser()) return true;
    if ((["Tablet", "Phone"] as readonly unknown[]).includes(baseVariant)) return false;
    return true;
  };

  const componentScopeId = "f8qSYHcNI";

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
              id="trigger"
              ref={ref1}
            />
            <div className={styles.sectionHeader} data-name="Section Header">
              <div className={styles.content} data-name="Content">
                <div className={styles.title} data-name="Title">
                  <RichText
                    className={styles.title2}
                    data-name="Title"
                    effect={textEffect}
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <h2 className="text-h2" dir="auto">
                        Pelgostone
                      </h2>
                    </>
                  </RichText>
                  <RichText
                    className={styles.title3}
                    data-name="Title"
                    effect={textEffect}
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p
                        className="text-body-25"
                        dir="auto"
                        style={{ "--df-text-color": "rgb(153, 153, 153)" }}
                      >
                        Cultivating life from sea to soil
                      </p>
                    </>
                  </RichText>
                </div>
              </div>
              <div className={styles.sectionHeaderContainer} data-name="Container">
                <div className={styles.content2} data-name="Content">
                  <div className={styles.contentFrame}>
                    <div className={styles.chapter} data-name="Chapter">
                      <div className={styles.chapterFrame}>
                        <div className={styles.title4} data-name="Title">
                          <RichTextWithOptimizedAppearEffect
                            animate={animation1}
                            className={styles.text}
                            data-appear-id="1r5gj6e"
                            fonts={["Inter"]}
                            initial={animation2}
                            optimized
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p
                                className="text-body-14"
                                dir="auto"
                                style={{ "--df-text-color": "rgb(171, 171, 171)" }}
                              >
                                Categories:
                              </p>
                            </>
                          </RichTextWithOptimizedAppearEffect>
                        </div>
                      </div>
                      <div className={styles.chapterContent} data-name="Content">
                        <div className={styles.textLine} data-name="Text Line">
                          <RichTextWithOptimizedAppearEffect
                            animate={animation3}
                            className={styles.text2}
                            data-appear-id="1vz1fbd"
                            fonts={["Inter"]}
                            initial={animation2}
                            optimized
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p
                                className="text-body-14"
                                dir="auto"
                                style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                              >
                                Industrial Design
                              </p>
                            </>
                          </RichTextWithOptimizedAppearEffect>
                        </div>
                      </div>
                    </div>
                    <div className={styles.chapter2} data-name="Chapter">
                      <div className={styles.title5} data-name="Title">
                        <RichTextWithOptimizedAppearEffect
                          animate={animation4}
                          className={styles.text3}
                          data-appear-id="1psdfz2"
                          fonts={["Inter"]}
                          initial={animation2}
                          optimized
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <p
                              className="text-body-14"
                              dir="auto"
                              style={{ "--df-text-color": "rgb(171, 171, 171)" }}
                            >
                              Client:
                            </p>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                      <div className={styles.chapterTextLine} data-name="Text Line">
                        <RichTextWithOptimizedAppearEffect
                          animate={animation5}
                          className={styles.text4}
                          data-appear-id="64hw5l"
                          fonts={["Inter"]}
                          initial={animation2}
                          optimized
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <p
                              className="text-body-14"
                              dir="auto"
                              style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                            >
                              SCAD
                            </p>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                    </div>
                    <div className={styles.contact} data-name="Contact">
                      <div className={styles.contactTitle} data-name="Title">
                        <RichTextWithOptimizedAppearEffect
                          animate={animation6}
                          className={styles.text5}
                          data-appear-id="x6kntj"
                          fonts={["Inter"]}
                          initial={animation2}
                          optimized
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <p
                              className="text-body-14"
                              dir="auto"
                              style={{ "--df-text-color": "rgb(171, 171, 171)" }}
                            >
                              Year:
                            </p>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                      <div className={styles.contactContent} data-name="Content">
                        <MotionDivWithOptimizedAppearEffect
                          animate={animation7}
                          className={styles.textLine2}
                          data-appear-id="1i26xw4"
                          data-name="Text Line"
                          initial={animation2}
                          optimized
                        >
                          <RichText
                            className={styles.text6}
                            fonts={["Inter"]}
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p
                                className="text-body-14"
                                dir="auto"
                                style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                              >
                                2024
                              </p>
                            </>
                          </RichText>
                        </MotionDivWithOptimizedAppearEffect>
                      </div>
                    </div>
                  </div>
                </div>
                {isDisplayed() && (
                  <div
                    className={cx(styles.content3, "hidden-pelagostone-tablet", "hidden-pelagostone-phone")}
                    data-name="Content"
                  >
                    <div className={styles.contentContainer} data-name="Container" />
                  </div>
                )}
              </div>
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1778,
                  intrinsicWidth: 2983,
                  pixelHeight: 1778,
                  pixelWidth: 2983,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?lossless=1&width=2983&height=1778",
                  srcSet:
                    "https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=512&lossless=1&width=2983&height=1778 512w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=1024&lossless=1&width=2983&height=1778 1024w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=2048&lossless=1&width=2983&height=1778 2048w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?lossless=1&width=2983&height=1778 2983w",
                }}
                className={styles.sectionHeaderBanner}
                data-name="Banner"
              />
            </div>
            <div className={styles.sectionDetails} data-name="Section Details">
              <div className={styles.sectionDetailsFrame}>
                <RichText
                  className={styles.projectDescription}
                  data-name="Project Description"
                  fonts={["Inter"]}
                  verticalAlignment="center"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-14" dir="auto">
                      Project Description
                    </p>
                  </>
                </RichText>
                <RichText
                  className={styles.yagaIsAnIndependent}
                  data-name="YAGA is an independent music festival embracing queer and trans identities by connecting Brazilian and international subcultures under one roof. Founded upon the idea that two people on opposite sides of the world may share more in common than neighbors . Earning features by Art Forum, Billboard and Pitchfork, YAGA combined performances from some of the most influential and up-and-coming contemporary names both locally and globally, hosting a lineup that featured artists such as Sophie, Linn da Quebrada, Arca and Badsista, among others."
                  fonts={["Inter"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-14" dir="auto">
                      A simple-to-manufacture, meaningful, and aesthetically pleasing design solution to help
                      combat ghost fishing and ocean waste
                    </p>
                  </>
                </RichText>
                <div className={styles.sectionDetailsContainer} data-name="Container">
                  <Link
                    href="/pelagostone-casestudy"
                    motionChild
                    nodeId="Case Study Card"
                    openInNewTab={false}
                  >
                    <motion.a
                      className={cx(styles.caseStudyCard, styles.caseStudyCard2)}
                      data-name="Case Study Card"
                      whileHover={animation8}
                    >
                      <div className={styles.thumbnailWrapper} data-name="Thumbnail Wrapper">
                        <Image1
                          background={{
                            alt: "",
                            fit: "fill",
                            intrinsicHeight: 2160,
                            intrinsicWidth: 3840,
                            pixelHeight: 2160,
                            pixelWidth: 3840,
                            sizes: "160px",
                            src: "https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?width=3840&height=2160",
                            srcSet:
                              "https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?width=3840&height=2160 3840w",
                          }}
                          className={styles.thumbnail}
                          data-name="Thumbnail"
                        />
                      </div>
                      <div className={styles.details} data-name="Details">
                        <div className={styles.detailsTitle} data-name="Title">
                          <RichText
                            className={styles.relatedCaseStudy}
                            data-name="Related Case study"
                            fonts={["Inter"]}
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p className="text-body-13-uppercase" dir="auto">
                                Full Case study
                              </p>
                            </>
                          </RichText>
                        </div>
                        <div className={styles.details2} data-name="Details">
                          <RichText
                            className={styles.arrival}
                            data-name="Arrival"
                            fonts={["Inter"]}
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p className="text-body-13" dir="auto">
                                Pelagostone
                              </p>
                            </>
                          </RichText>
                          <RichText
                            className={styles.artDirectionWebsite}
                            data-name="Art Direction, Website"
                            fonts={["Inter"]}
                            verticalAlignment="top"
                            withExternalLayout
                          >
                            <>
                              <p className="text-body-13" dir="auto">
                                Industrial Design
                              </p>
                            </>
                          </RichText>
                        </div>
                      </div>
                      <div className={styles.caseStudyFrame}>
                        <ComponentViewportProvider>
                          <Container
                            className={styles.material}
                            isAuthoredByUser
                            isModuleExternal
                            nodeId="Material"
                            rendersWithMotion
                            scopeId="PelagostonePage"
                            style={{ rotate: -45 }}
                          >
                            <Material
                              color="rgb(0, 0, 0)"
                              height="100%"
                              iconSearch="Home"
                              iconSelection="ArrowForward"
                              iconStyle15="Filled"
                              iconStyle2="Filled"
                              iconStyle7="Filled"
                              id="Material"
                              mirrored={false}
                              selectByList
                              style={{ height: "100%", width: "100%" }}
                              width="100%"
                            />
                          </Container>
                        </ComponentViewportProvider>
                      </div>
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.sectionContent} data-name="Section Content">
              <div className={styles.mediaSquare} data-name="Media Square">
                <div className={styles.imageWrapper} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 1080,
                          intrinsicWidth: 1080,
                          pixelHeight: 1080,
                          pixelWidth: 1080,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?width=1080&height=1080",
                          srcSet:
                            "https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?scale-down-to=512&width=1080&height=1080 512w,https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?scale-down-to=1024&width=1080&height=1080 1024w,https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?width=1080&height=1080 1080w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?scale-down-to=512&width=1080&height=1080 512w,https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?scale-down-to=1024&width=1080&height=1080 1024w,https://framerusercontent.com/images/kLwUhCAvBmbnrzpJGHjJ4Ht5aM.png?width=1080&height=1080 1080w",
                      }}
                      className={styles.imageWrapperImage}
                    />
                  </PropertyOverrides>
                </div>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?scale-down-to=512&width=1080&height=1080 512w,https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?scale-down-to=1024&width=1080&height=1080 1024w,https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?width=1080&height=1080 1080w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1080,
                      intrinsicWidth: 1080,
                      pixelHeight: 1080,
                      pixelWidth: 1080,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?width=1080&height=1080",
                      srcSet:
                        "https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?scale-down-to=512&width=1080&height=1080 512w,https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?scale-down-to=1024&width=1080&height=1080 1024w,https://framerusercontent.com/images/Yg0nOMVsIva1a5yXec8Up06mc.png?width=1080&height=1080 1080w",
                    }}
                    className={styles.mediaSquareImage}
                  />
                </PropertyOverrides>
              </div>
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1920,
                  intrinsicWidth: 3414,
                  pixelHeight: 1920,
                  pixelWidth: 3414,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/Px0USlYSFvhUIiHCythP9LTXw.png?lossless=1&width=3414&height=1920",
                  srcSet:
                    "https://framerusercontent.com/images/Px0USlYSFvhUIiHCythP9LTXw.png?scale-down-to=512&lossless=1&width=3414&height=1920 512w,https://framerusercontent.com/images/Px0USlYSFvhUIiHCythP9LTXw.png?scale-down-to=1024&lossless=1&width=3414&height=1920 1024w,https://framerusercontent.com/images/Px0USlYSFvhUIiHCythP9LTXw.png?scale-down-to=2048&lossless=1&width=3414&height=1920 2048w,https://framerusercontent.com/images/Px0USlYSFvhUIiHCythP9LTXw.png?lossless=1&width=3414&height=1920 3414w",
                }}
                className={styles.banner}
                data-name="Banner"
              />
              <div className={styles.content1} data-name="Content 1">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 640,
                        intrinsicWidth: 960,
                        pixelHeight: 640,
                        pixelWidth: 960,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?lossless=1&width=960&height=640",
                        srcSet:
                          "https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?scale-down-to=512&lossless=1&width=960&height=640 512w,https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?lossless=1&width=960&height=640 960w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 640,
                      intrinsicWidth: 960,
                      pixelHeight: 640,
                      pixelWidth: 960,
                      sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?lossless=1&width=960&height=640",
                      srcSet:
                        "https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?scale-down-to=512&lossless=1&width=960&height=640 512w,https://framerusercontent.com/images/MhXICG72Ucdiml59DZ2jm9ZS0TE.webp?lossless=1&width=960&height=640 960w",
                    }}
                    className={styles.content1Banner}
                    data-name="Banner"
                  />
                </PropertyOverrides>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      children: (
                        <>
                          <p
                            className="text-body-20"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                          >
                            More than 650,000 marine animals die each year from ghost fishing.
                          </p>
                          <p
                            className="text-body-20"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                          >
                            WWF calls ghost gear “the deadliest marine plastic,” trapping wildlife and causing
                            slow, painful deaths.
                          </p>
                        </>
                      ),
                    },
                  }}
                >
                  <RichText
                    className={styles.content1_2}
                    data-name="Content 1"
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        More than 650,000 marine animals die each year from ghost fishing.
                      </p>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        WWF calls ghost gear “the deadliest marine plastic,” trapping wildlife and causing
                        slow, painful deaths.
                      </p>
                    </>
                  </RichText>
                </PropertyOverrides>
              </div>
              <div className={styles.content1_3} data-name="Content 1">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      children: (
                        <>
                          <p
                            className="text-body-20"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                          >
                            {
                              "To tackle this problem, I decided to design something that would cultivate life, made from the very waste that takes it. "
                            }
                          </p>
                          <p
                            className="text-body-20"
                            dir="auto"
                            style={{ "--df-text-color": "rgb(0, 0, 0)" }}
                          >
                            Amsterdam-based Reflow turns recycled fishing nets into 3D printing filament,
                            providing the material to bring this idea to life.
                          </p>
                        </>
                      ),
                    },
                  }}
                >
                  <RichText
                    className={styles.content1_4}
                    data-name="Content 1"
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        {
                          "To tackle this problem, I decided to design something that would cultivate life, made from the very waste that takes it. "
                        }
                      </p>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        Amsterdam-based Reflow turns recycled fishing nets into 3D printing filament,
                        providing the material to bring this idea to life.
                      </p>
                    </>
                  </RichText>
                </PropertyOverrides>
                <ComponentViewportProvider>
                  <Container
                    className={styles.video}
                    isModuleExternal
                    nodeId="Video"
                    scopeId="PelagostonePage"
                  >
                    <Video
                      backgroundColor="rgb(240, 240, 238)"
                      borderRadius={0}
                      bottomLeftRadius={0}
                      bottomRightRadius={0}
                      controls={false}
                      height="100%"
                      id="Video"
                      isMixedBorderRadius={false}
                      loop
                      muted
                      objectFit="scale-down"
                      playing
                      posterEnabled
                      srcFile="https://framerusercontent.com/assets/cM0x6A46FCqpYTLlFX4W6o7VBIU.mp4"
                      srcType="Upload"
                      srcUrl="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4"
                      startTime={0}
                      style={{ height: "100%", width: "100%" }}
                      topLeftRadius={0}
                      topRightRadius={0}
                      volume={25}
                      width="100%"
                    />
                  </Container>
                </ComponentViewportProvider>
              </div>
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1536,
                  intrinsicWidth: 2752,
                  pixelHeight: 1536,
                  pixelWidth: 2752,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/X57MqjU03N00dXckxAr26CAyxI.png?lossless=1&width=2752&height=1536",
                  srcSet:
                    "https://framerusercontent.com/images/X57MqjU03N00dXckxAr26CAyxI.png?scale-down-to=512&lossless=1&width=2752&height=1536 512w,https://framerusercontent.com/images/X57MqjU03N00dXckxAr26CAyxI.png?scale-down-to=1024&lossless=1&width=2752&height=1536 1024w,https://framerusercontent.com/images/X57MqjU03N00dXckxAr26CAyxI.png?scale-down-to=2048&lossless=1&width=2752&height=1536 2048w,https://framerusercontent.com/images/X57MqjU03N00dXckxAr26CAyxI.png?lossless=1&width=2752&height=1536 2752w",
                }}
                className={styles.banner2}
                data-name="Banner"
              />
            </div>
            <div className={styles.sectionMoreProjects} data-name="Section more Projects">
              <div className={styles.heading} data-name="Heading">
                <RichText
                  className={styles.headingText}
                  fonts={["CUSTOMV2;Favorit Light"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                        "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                        "--df-font-size": "32px",
                        "--df-font-weight": "300",
                        "--df-letter-spacing": "-0.03em",
                        "--df-line-height": "120%",
                      }}
                    >
                      More Projects
                    </h2>
                  </>
                </RichText>
                <ComponentViewportProvider height={16}>
                  <Container className={styles.textLink}>
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
              </div>
              <div className={styles.sectionMoreContainer} data-name="Container">
                <div className={styles.frame}>
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
                      {(collection, paginationInfo, loadMore) => {
                        return (
                          <>
                            {collection?.map(
                              (
                                {
                                  id: worksId,
                                  category,
                                  thumbnailVideoPortrait,
                                  title,
                                  worksSlug: slug,
                                  thumbnailPortrait,
                                }: any,
                                index,
                              ) => {
                                title ??= "";
                                category ??= "";
                                slug ??= "";
                                return (
                                  <LayoutGroup id={`works31-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href="/halv" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link, styles.caseStudyCard2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: { width: `max(${viewportWidth} - 40px, 1px)` },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard}>
                                                <ProjectCard
                                                  subtitle={category}
                                                  videoWide1
                                                  title={title}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait)}
                                                />
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
                <div className={styles.frame2}>
                  <ChildrenCanSuspend>
                    <QueryData query={query1()}>
                      {(collection1, paginationInfo1, loadMore1) => {
                        return (
                          <>
                            {collection1?.map(
                              (
                                {
                                  id: worksIdWorks,
                                  category: categoryWorks,
                                  thumbnailVideoPortrait: thumbnailVideoPortraitWorks,
                                  title: titleWorks,
                                  worksSlug: slugWorks,
                                  thumbnailPortrait: thumbnailPortraitWorks,
                                }: any,
                                index1,
                              ) => {
                                titleWorks ??= "";
                                categoryWorks ??= "";
                                slugWorks ??= "";
                                return (
                                  <LayoutGroup id={`works32-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/revimo" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link2, styles.caseStudyCard2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: { width: `max(${viewportWidth} - 40px, 1px)` },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard2}>
                                                <ProjectCard
                                                  subtitle={categoryWorks}
                                                  videoWide1
                                                  title={titleWorks}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortraitWorks}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(
                                                    thumbnailPortraitWorks,
                                                  )}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortraitWorks)}
                                                />
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
                <div className={styles.frame3}>
                  <ChildrenCanSuspend>
                    <QueryData query={query2()}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  id: worksId2,
                                  category: category2,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait2,
                                  title: title2,
                                  worksSlug: slug2,
                                  thumbnailPortrait: thumbnailPortrait2,
                                }: any,
                                index2,
                              ) => {
                                title2 ??= "";
                                category2 ??= "";
                                slug2 ??= "";
                                return (
                                  <LayoutGroup id={`works33-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link3, styles.caseStudyCard2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{ Phone: { width: `calc(${viewportWidth} - 40px)` } }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard3}>
                                                <ProjectCard
                                                  subtitle={category2}
                                                  videoWide1
                                                  title={title2}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait2}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait2)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait2)}
                                                />
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
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

const PelagostonePage = withFonts(Component) as typeof Component;
export default asPage(PelagostonePage);

PelagostonePage.displayName = "Halv";

PelagostonePage.defaultProps = { height: 6291, width: 1200 };

addFonts(PelagostonePage, [...VideoFonts], { supportsExplicitInterCodegen: true });

PelagostonePage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const queryCacheEntry = queryCache.get(query(), locale, priority);
    const queryCacheEntry1 = queryCache.get(query1(), locale, priority);
    const queryCacheEntry2 = queryCache.get(query2(), locale, priority);
    return runTasksWithYield(
      [
        () => queryCacheEntry.preload(),
        () => queryCacheEntry1.preload(),
        () => queryCacheEntry2.preload(),
        () => forwardLoader(TextLink, {}, context),
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
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
      ],
      context,
    );
  },
};
