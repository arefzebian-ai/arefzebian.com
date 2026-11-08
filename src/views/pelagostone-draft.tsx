"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./pelagostone-draft.module.css";
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
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";
import * as body13 from "@/styles/text/body-13";

// Browser-only code: loaded after hydration, as on the published site.
import { polishedEase } from "@/lib/motion";
const Video = clientOnly(() => import("@/vendor/video").then((m) => m.Video));

const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);
const VideoFonts = getFonts(Video);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-pelagostone-draft-phone",
  Tablet: "hidden-pelagostone-draft-tablet",
  Desktop: "hidden-desktop",
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

const query = () => ({
  from: { alias: "works28", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works28", name: "worksSlug", type: "Identifier" },
    { collection: "works28", name: "title", type: "Identifier" },
    { collection: "works28", name: "category", type: "Identifier" },
    { collection: "works28", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works28", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works28", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works28", name: "sortingNumber", type: "Identifier" },
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
  from: { alias: "works29", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works29", name: "worksSlug", type: "Identifier" },
    { collection: "works29", name: "title", type: "Identifier" },
    { collection: "works29", name: "category", type: "Identifier" },
    { collection: "works29", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works29", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works29", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works29", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works30", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works30", name: "worksSlug", type: "Identifier" },
    { collection: "works30", name: "title", type: "Identifier" },
    { collection: "works30", name: "category", type: "Identifier" },
    { collection: "works30", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works30", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works30", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works30", name: "sortingNumber", type: "Identifier" },
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

  const componentScopeId = "esDIozgKL";

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
                      Cultivating life from sea to soil
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
                            Website
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
                    intrinsicHeight: 1778,
                    intrinsicWidth: 2983,
                    pixelHeight: 1778,
                    pixelWidth: 2983,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?width=2983&height=1778",
                    srcSet:
                      "https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=512&width=2983&height=1778 512w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=1024&width=2983&height=1778 1024w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?scale-down-to=2048&width=2983&height=1778 2048w,https://framerusercontent.com/images/Wxgx5fO3EQ2HAq7VmGiyf3IC24.jpg?width=2983&height=1778 2983w",
                  }}
                  className={styles.sectionHeaderImage}
                  data-appear-id="12jf30k"
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
                      A simple-to-manufacture, meaningful, and aesthetically pleasing design solution to help
                      combat ghost fishing and ocean waste
                    </p>
                  </>
                </RichText>
                <div className={styles.sectionDetailsContainer} data-name="Container">
                  <div className={styles.caseStudyCard} data-name="Case Study Card">
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
                          scopeId="PelagostoneDraftPage"
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
                            id="Material4"
                            mirrored={false}
                            selectByList
                            style={{ height: "100%", width: "100%" }}
                            width="100%"
                          />
                        </Container>
                      </ComponentViewportProvider>
                      <ComponentViewportProvider>
                        <Container
                          className={styles.material2}
                          isAuthoredByUser
                          isModuleExternal
                          nodeId="Material"
                          rendersWithMotion
                          scopeId="PelagostoneDraftPage"
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
                            id="Material5"
                            mirrored={false}
                            selectByList
                            style={{ height: "100%", width: "100%" }}
                            width="100%"
                          />
                        </Container>
                      </ComponentViewportProvider>
                    </div>
                  </div>
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
                    scopeId="PelagostoneDraftPage"
                  >
                    <Video
                      backgroundColor="rgb(240, 240, 238)"
                      borderRadius={0}
                      bottomLeftRadius={0}
                      bottomRightRadius={0}
                      controls={false}
                      height="100%"
                      id="Video2"
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
                                  <LayoutGroup id={`works28-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link
                                        href={{ pathVariables: { worksSlug: slug }, webPageId: "SnqHkHzUy" }}
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
                                  <LayoutGroup id={`works29-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link
                                        href={{
                                          pathVariables: { worksSlug: slugWorks },
                                          webPageId: "SnqHkHzUy",
                                        }}
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
                                  <LayoutGroup id={`works30-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link
                                        href={{ pathVariables: { worksSlug: slug2 }, webPageId: "SnqHkHzUy" }}
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

const PelagostoneDraftPage = withFonts(Component) as typeof Component;
export default asPage(PelagostoneDraftPage);

PelagostoneDraftPage.displayName = "Halv";

PelagostoneDraftPage.defaultProps = { height: 6002, width: 1200 };

addFonts(PelagostoneDraftPage, [...VideoFonts], { supportsExplicitInterCodegen: true });

PelagostoneDraftPage.loader = {
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
