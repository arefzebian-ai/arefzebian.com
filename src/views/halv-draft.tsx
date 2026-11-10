"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./halv-draft.module.css";
import {
  asPage,
  ChildrenCanSuspend,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getRootLayoutProp,
  HTMLStyle,
  Image as Image1,
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
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import TextLink from "@/components/text-link";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import * as body20 from "@/styles/text/body-20";
import * as body14 from "@/styles/text/body-14";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";
import * as body13 from "@/styles/text/body-13";

import { polishedEase } from "@/lib/motion";
const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-halv-draft-phone",
  Desktop: "hidden-desktop",
  Tablet: "hidden-halv-draft-tablet",
};

const animation = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 50 };

const transition1 = { delay: 0.1, duration: 2, ease: polishedEase, type: "tween" } as const;

const textEffect = {
  effect: animation,
  repeat: false,
  startDelay: 0.4,
  tokenization: "line",
  transition: transition1,
  trigger: "onMount",
  type: "appear",
} as const;

const animation1 = { opacity: 1, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 40 };

const transition2 = { delay: 0.1, duration: 1, ease: polishedEase, type: "tween" } as const;

const textEffect1 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.3,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const textEffect2 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.35,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const textEffect3 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.5,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const textEffect4 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.55,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const textEffect5 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.7,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const textEffect6 = {
  effect: animation1,
  repeat: false,
  startDelay: 0.75,
  tokenization: "word",
  transition: transition2,
  trigger: "onMount",
  type: "appear",
} as const;

const transition3 = { delay: 0, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation2 = {
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

const animation3 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1.1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 0,
};

const transition4 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const animation4 = {
  backgroundColor: "rgb(255, 255, 255)",
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition4,
} as const;

const query = () => ({
  from: { alias: "works14", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works14", name: "worksSlug", type: "Identifier" },
    { collection: "works14", name: "title", type: "Identifier" },
    { collection: "works14", name: "category", type: "Identifier" },
    { collection: "works14", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works14", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works14", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works14", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 2 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = () => ({
  from: { alias: "works15", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works15", name: "worksSlug", type: "Identifier" },
    { collection: "works15", name: "title", type: "Identifier" },
    { collection: "works15", name: "category", type: "Identifier" },
    { collection: "works15", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works15", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works15", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works15", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works16", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works16", name: "worksSlug", type: "Identifier" },
    { collection: "works16", name: "title", type: "Identifier" },
    { collection: "works16", name: "category", type: "Identifier" },
    { collection: "works16", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works16", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works16", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works16", name: "sortingNumber", type: "Identifier" },
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

const HalvDraftPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(
    styles.page,
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

  const elementId = "trigger";

  const dynamicRef = useSiteRefs<HTMLDivElement>();

  const componentScopeId = "dgPj6Z59p";

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
              <div className={styles.sectionHeaderTitle} data-name="Title">
                <RichText
                  className={styles.redefiningHighPerformanceBikes}
                  data-name="Redefining high performance bikes for the next generation of athletes"
                  effect={textEffect}
                  fonts={["CUSTOMV2;Favorit Light"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p
                      dir="auto"
                      style={{
                        "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                        "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                        "--df-font-size": "30px",
                        "--df-font-weight": "300",
                        "--df-letter-spacing": "-0.02em",
                        "--df-line-height": "110%",
                        "--df-text-color": "rgb(255, 255, 255)",
                      }}
                    >
                      A concept TV that divides space
                    </p>
                  </>
                </RichText>
              </div>
              <div className={styles.bottomRow} data-name="Bottom Row">
                <div className={styles.frame} data-name="Frame 1000002734">
                  <div className={styles.frame2} data-name="Frame 1000002731">
                    <div className={styles.frame3}>
                      <RichText
                        className={styles.client}
                        data-name="Client"
                        effect={textEffect1}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "13px",
                              "--df-font-weight": "300",
                              "--df-line-height": "117%",
                              "--df-text-color": "rgb(255, 255, 255)",
                              "--df-text-transform": "uppercase",
                            }}
                          >
                            Client
                          </p>
                        </>
                      </RichText>
                    </div>
                    <div className={styles.frame4}>
                      <RichText
                        className={styles.adidas}
                        data-name="Adidas"
                        effect={textEffect2}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "15px",
                              "--df-font-weight": "300",
                              "--df-letter-spacing": "-0.03em",
                              "--df-line-height": "100%",
                              "--df-text-alignment": "left",
                              "--df-text-color": "rgb(255, 255, 255)",
                            }}
                          >
                            SCAD
                          </p>
                        </>
                      </RichText>
                    </div>
                  </div>
                  <div className={styles.frame5} data-name="Frame 1000002732">
                    <div className={styles.frame6}>
                      <RichText
                        className={styles.year}
                        data-name="year"
                        effect={textEffect3}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "13px",
                              "--df-font-weight": "300",
                              "--df-line-height": "117%",
                              "--df-text-color": "rgb(255, 255, 255)",
                              "--df-text-transform": "uppercase",
                            }}
                          >
                            year
                          </p>
                        </>
                      </RichText>
                    </div>
                    <div className={styles.frame7}>
                      <RichText
                        className={styles.text2025}
                        data-name="2025"
                        effect={textEffect4}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "15px",
                              "--df-font-weight": "300",
                              "--df-letter-spacing": "-0.03em",
                              "--df-line-height": "100%",
                              "--df-text-alignment": "left",
                              "--df-text-color": "rgb(255, 255, 255)",
                            }}
                          >
                            2025
                          </p>
                        </>
                      </RichText>
                    </div>
                  </div>
                  <div className={styles.frame8} data-name="Frame 1000002733">
                    <div className={styles.frame9}>
                      <RichText
                        className={styles.role}
                        data-name="role"
                        effect={textEffect5}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "13px",
                              "--df-font-weight": "300",
                              "--df-line-height": "117%",
                              "--df-text-color": "rgb(255, 255, 255)",
                              "--df-text-transform": "uppercase",
                            }}
                          >
                            role
                          </p>
                        </>
                      </RichText>
                    </div>
                    <div className={styles.frame10}>
                      <RichText
                        className={styles.artDirectionDesign}
                        data-name="Art Direction, Design"
                        effect={textEffect6}
                        fonts={["CUSTOMV2;Favorit Light"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            dir="auto"
                            style={{
                              "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                              "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                              "--df-font-size": "15px",
                              "--df-font-weight": "300",
                              "--df-letter-spacing": "-0.03em",
                              "--df-line-height": "100%",
                              "--df-text-alignment": "left",
                              "--df-text-color": "rgb(255, 255, 255)",
                            }}
                          >
                            Industrial Design
                          </p>
                        </>
                      </RichText>
                    </div>
                  </div>
                </div>
              </div>
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{ Phone: { animate: undefined, initial: undefined, optimized: undefined } }}
              >
                <Image1WithOptimizedAppearEffect
                  animate={animation2}
                  background={{
                    alt: "",
                    fit: "fill",
                    intrinsicHeight: 5071,
                    intrinsicWidth: 7606,
                    pixelHeight: 5071,
                    pixelWidth: 7606,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?width=7606&height=5071",
                    srcSet:
                      "https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=512&width=7606&height=5071 512w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=1024&width=7606&height=5071 1024w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=2048&width=7606&height=5071 2048w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?scale-down-to=4096&width=7606&height=5071 4096w,https://framerusercontent.com/images/I7mCQbQB792wkaxlUvC2MVMU.jpg?width=7606&height=5071 7606w",
                  }}
                  className={styles.sectionHeaderImage}
                  data-appear-id="somurg"
                  initial={animation3}
                  optimized
                />
              </PropertyOverrides>
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
                      Halv is a freestanding television and bookshelf that shapes the space around it.
                      Designed for open interiors, it brings the television away from the wall, dividing a
                      room while creating space for books, objects, and everyday life on the other side. A
                      sculptural denim Micarta frame and transparent shelving balance material presence with
                      visual openness.
                    </p>
                    <p className="text-body-14" dir="auto">
                      <br className="trailing-break" />
                    </p>
                    <p className="text-body-14" dir="auto">
                      The project grew from a question: how can a single object influence the way we inhabit a
                      room? Six months of research, material exploration, and fabrication led to a full-scale
                      working prototype.
                    </p>
                  </>
                </RichText>
                <div className={styles.sectionDetailsContainer} data-name="Container">
                  <Link href="/halv-casestudy" motionChild nodeId="Case Study Card" openInNewTab={false}>
                    <motion.a
                      className={cx(styles.caseStudyCard, styles.caseStudyCard2)}
                    data-name="Case Study Card"
                    whileHover={animation4}
                  >
                    <div className={styles.thumbnailWrapper} data-name="Thumbnail Wrapper">
                      <Image1
                        background={{
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 2160,
                          intrinsicWidth: 3841,
                          pixelHeight: 2160,
                          pixelWidth: 3841,
                          sizes: "160px",
                          src: "https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?width=3841&height=2160",
                          srcSet:
                            "https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?width=3841&height=2160 3841w",
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
                              Halv
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
                  </motion.a>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.sectionContent} data-name="Section Content">
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 4808,
                  intrinsicWidth: 7606,
                  pixelHeight: 4808,
                  pixelWidth: 7606,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?lossless=1&width=7606&height=4808",
                  srcSet:
                    "https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?scale-down-to=512&lossless=1&width=7606&height=4808 512w,https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?scale-down-to=1024&lossless=1&width=7606&height=4808 1024w,https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?scale-down-to=2048&lossless=1&width=7606&height=4808 2048w,https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?scale-down-to=4096&lossless=1&width=7606&height=4808 4096w,https://framerusercontent.com/images/EF5gsZo64yjdAWdvY3nUZ2ME.jpg?lossless=1&width=7606&height=4808 7606w",
                }}
                className={styles.sectionContentBanner}
                data-name="Banner"
              />
              <div className={styles.mediaPortraits} data-name="Media Portraits">
                <div className={styles.imageWrapper} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 6842,
                          intrinsicWidth: 5131,
                          pixelHeight: 6842,
                          pixelWidth: 5131,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?width=5131&height=6842",
                          srcSet:
                            "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=1024&width=5131&height=6842 767w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=2048&width=5131&height=6842 1535w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=4096&width=5131&height=6842 3071w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?width=5131&height=6842 5131w",
                        },
                      },
                      Tablet: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 6842,
                          intrinsicWidth: 5131,
                          pixelHeight: 6842,
                          pixelWidth: 5131,
                          sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                          src: "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?width=5131&height=6842",
                          srcSet:
                            "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=1024&width=5131&height=6842 767w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=2048&width=5131&height=6842 1535w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=4096&width=5131&height=6842 3071w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?width=5131&height=6842 5131w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 6842,
                        intrinsicWidth: 5131,
                        pixelHeight: 6842,
                        pixelWidth: 5131,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?lossless=1&width=5131&height=6842",
                        srcSet:
                          "https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=1024&lossless=1&width=5131&height=6842 767w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=2048&lossless=1&width=5131&height=6842 1535w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?scale-down-to=4096&lossless=1&width=5131&height=6842 3071w,https://framerusercontent.com/images/1OOWUTPyjJgedAlidbvrgxMLUjU.jpg?lossless=1&width=5131&height=6842 5131w",
                      }}
                      className={styles.image}
                    />
                  </PropertyOverrides>
                </div>
                <div className={styles.imageWrapper2} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 4032,
                          intrinsicWidth: 3024,
                          pixelHeight: 4032,
                          pixelWidth: 3024,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032",
                          srcSet:
                            "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=1024&width=3024&height=4032 768w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=2048&width=3024&height=4032 1536w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032 3024w",
                        },
                      },
                      Tablet: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 4032,
                          intrinsicWidth: 3024,
                          pixelHeight: 4032,
                          pixelWidth: 3024,
                          sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                          src: "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032",
                          srcSet:
                            "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=1024&width=3024&height=4032 768w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=2048&width=3024&height=4032 1536w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032 3024w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 4032,
                        intrinsicWidth: 3024,
                        pixelHeight: 4032,
                        pixelWidth: 3024,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?lossless=1&width=3024&height=4032",
                        srcSet:
                          "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=1024&lossless=1&width=3024&height=4032 768w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=2048&lossless=1&width=3024&height=4032 1536w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?lossless=1&width=3024&height=4032 3024w",
                      }}
                      className={styles.image2}
                    />
                  </PropertyOverrides>
                </div>
              </div>
              <div className={styles.content1} data-name="Content 1">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 6885,
                        intrinsicWidth: 5164,
                        pixelHeight: 6885,
                        pixelWidth: 5164,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?width=5164&height=6885",
                        srcSet:
                          "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=1024&width=5164&height=6885 768w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=2048&width=5164&height=6885 1536w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=4096&width=5164&height=6885 3072w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?width=5164&height=6885 5164w",
                      },
                    },
                    Tablet: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 6885,
                        intrinsicWidth: 5164,
                        pixelHeight: 6885,
                        pixelWidth: 5164,
                        sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?width=5164&height=6885",
                        srcSet:
                          "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=1024&width=5164&height=6885 768w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=2048&width=5164&height=6885 1536w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=4096&width=5164&height=6885 3072w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?width=5164&height=6885 5164w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 6885,
                      intrinsicWidth: 5164,
                      pixelHeight: 6885,
                      pixelWidth: 5164,
                      sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?lossless=1&width=5164&height=6885",
                      srcSet:
                        "https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=1024&lossless=1&width=5164&height=6885 768w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=2048&lossless=1&width=5164&height=6885 1536w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?scale-down-to=4096&lossless=1&width=5164&height=6885 3072w,https://framerusercontent.com/images/V09gapK4Dd5Xs6rBaXZ0Ym4mME.jpg?lossless=1&width=5164&height=6885 5164w",
                    }}
                    className={styles.banner}
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
                            We carry modern routines through outdated rooms
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
                        We carry modern routines through outdated rooms
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
                            Halv is a TV concept that puts the power back in the hands of the user—designed to
                            adapt to your space, not the other way around.
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
                        Halv is a TV concept that puts the power back in the hands of the user—designed to
                        adapt to your space, not the other way around.
                      </p>
                    </>
                  </RichText>
                </PropertyOverrides>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 6021,
                        intrinsicWidth: 4516,
                        pixelHeight: 6021,
                        pixelWidth: 4516,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?width=4516&height=6021",
                        srcSet:
                          "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=1024&width=4516&height=6021 768w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=2048&width=4516&height=6021 1536w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=4096&width=4516&height=6021 3072w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?width=4516&height=6021 4516w",
                      },
                    },
                    Tablet: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 6021,
                        intrinsicWidth: 4516,
                        pixelHeight: 6021,
                        pixelWidth: 4516,
                        sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?width=4516&height=6021",
                        srcSet:
                          "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=1024&width=4516&height=6021 768w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=2048&width=4516&height=6021 1536w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=4096&width=4516&height=6021 3072w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?width=4516&height=6021 4516w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 6021,
                      intrinsicWidth: 4516,
                      pixelHeight: 6021,
                      pixelWidth: 4516,
                      sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?lossless=1&width=4516&height=6021",
                      srcSet:
                        "https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=1024&lossless=1&width=4516&height=6021 768w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=2048&lossless=1&width=4516&height=6021 1536w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?scale-down-to=4096&lossless=1&width=4516&height=6021 3072w,https://framerusercontent.com/images/YMfHbRJ7CJ9VzpV50BRAmsPt45s.jpg?lossless=1&width=4516&height=6021 4516w",
                    }}
                    className={styles.banner2}
                    data-name="Banner"
                  />
                </PropertyOverrides>
              </div>
              <div className={styles.mediaPortraits2} data-name="Media Portraits">
                <div className={styles.imageWrapper3} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 7072,
                          intrinsicWidth: 5304,
                          pixelHeight: 7072,
                          pixelWidth: 5304,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?width=5304&height=7072",
                          srcSet:
                            "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=1024&width=5304&height=7072 768w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=2048&width=5304&height=7072 1536w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=4096&width=5304&height=7072 3072w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?width=5304&height=7072 5304w",
                        },
                      },
                      Tablet: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 7072,
                          intrinsicWidth: 5304,
                          pixelHeight: 7072,
                          pixelWidth: 5304,
                          sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                          src: "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?width=5304&height=7072",
                          srcSet:
                            "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=1024&width=5304&height=7072 768w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=2048&width=5304&height=7072 1536w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=4096&width=5304&height=7072 3072w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?width=5304&height=7072 5304w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 7072,
                        intrinsicWidth: 5304,
                        pixelHeight: 7072,
                        pixelWidth: 5304,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?lossless=1&width=5304&height=7072",
                        srcSet:
                          "https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=1024&lossless=1&width=5304&height=7072 768w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=2048&lossless=1&width=5304&height=7072 1536w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?scale-down-to=4096&lossless=1&width=5304&height=7072 3072w,https://framerusercontent.com/images/PtTWZQSPbhSrn4uQ0bUV5xWrY0.jpg?lossless=1&width=5304&height=7072 5304w",
                      }}
                      className={styles.image3}
                    />
                  </PropertyOverrides>
                </div>
                <div className={styles.imageWrapper4} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 7072,
                          intrinsicWidth: 5304,
                          pixelHeight: 7072,
                          pixelWidth: 5304,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?width=5304&height=7072",
                          srcSet:
                            "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=1024&width=5304&height=7072 768w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=2048&width=5304&height=7072 1536w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=4096&width=5304&height=7072 3072w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?width=5304&height=7072 5304w",
                        },
                      },
                      Tablet: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 7072,
                          intrinsicWidth: 5304,
                          pixelHeight: 7072,
                          pixelWidth: 5304,
                          sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                          src: "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?width=5304&height=7072",
                          srcSet:
                            "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=1024&width=5304&height=7072 768w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=2048&width=5304&height=7072 1536w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=4096&width=5304&height=7072 3072w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?width=5304&height=7072 5304w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 7072,
                        intrinsicWidth: 5304,
                        pixelHeight: 7072,
                        pixelWidth: 5304,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?lossless=1&width=5304&height=7072",
                        srcSet:
                          "https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=1024&lossless=1&width=5304&height=7072 768w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=2048&lossless=1&width=5304&height=7072 1536w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?scale-down-to=4096&lossless=1&width=5304&height=7072 3072w,https://framerusercontent.com/images/SCu9VMHudIjiyP3AJisxX1x38.jpg?lossless=1&width=5304&height=7072 5304w",
                      }}
                      className={styles.image4}
                    />
                  </PropertyOverrides>
                </div>
              </div>
            </div>
            <div className={styles.sectionMoreProjects} data-name="Section more Projects">
              <div className={styles.heading} data-name="Heading">
                <RichText
                  className={styles.text}
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
                <div className={styles.frame11}>
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
                                slug ??= "";
                                title ??= "";
                                category ??= "";
                                return (
                                  <LayoutGroup id={`works14-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link
                                        href={`/${slug}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link, styles.link2)}>
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
                <div className={styles.frame12}>
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
                                slugWorks ??= "";
                                titleWorks ??= "";
                                categoryWorks ??= "";
                                return (
                                  <LayoutGroup id={`works15-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link
                                        href={`/${slugWorks}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link3, styles.link2)}>
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
                <div className={styles.frame13}>
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
                                slug2 ??= "";
                                title2 ??= "";
                                category2 ??= "";
                                return (
                                  <LayoutGroup id={`works16-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link
                                        href={`/${slug2}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link4, styles.link2)}>
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

export default asPage(HalvDraftPage);

HalvDraftPage.displayName = "Page";

HalvDraftPage.defaultProps = { height: 6278, width: 1200 };

HalvDraftPage.loader = {
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
