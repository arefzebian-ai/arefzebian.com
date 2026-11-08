"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./aether-draft.module.css";
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

const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-aether-draft-phone",
  Desktop: "hidden-desktop",
  Tablet: "hidden-aether-draft-tablet",
};

const animation = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 50 };

const transition1 = { delay: 0.1, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const textEffect = {
  effect: animation,
  repeat: false,
  startDelay: 0.2,
  tokenization: "line",
  transition: transition1,
  trigger: "onMount",
  type: "appear",
} as const;

const animation1 = { opacity: 1, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 40 };

const transition2 = { delay: 0.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const transition3 = { delay: 0, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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
  from: { alias: "works5", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works5", name: "worksSlug", type: "Identifier" },
    { collection: "works5", name: "title", type: "Identifier" },
    { collection: "works5", name: "category", type: "Identifier" },
    { collection: "works5", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works5", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works5", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works5", name: "sortingNumber", type: "Identifier" },
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
  from: { alias: "works6", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works6", name: "worksSlug", type: "Identifier" },
    { collection: "works6", name: "title", type: "Identifier" },
    { collection: "works6", name: "category", type: "Identifier" },
    { collection: "works6", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works6", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works6", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works6", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works7", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works7", name: "worksSlug", type: "Identifier" },
    { collection: "works7", name: "title", type: "Identifier" },
    { collection: "works7", name: "category", type: "Identifier" },
    { collection: "works7", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works7", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works7", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works7", name: "sortingNumber", type: "Identifier" },
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

const AetherDraftPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
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

  const componentScopeId = "zuV8HAtvu";

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
                      Reignite the Thrill of Driving
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
                            2024
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
                            Automotive
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
                    intrinsicHeight: 2544,
                    intrinsicWidth: 4096,
                    pixelHeight: 2544,
                    pixelWidth: 4096,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/JXFIRGkElzOkfYcZSNKfN3D6H0.png?width=4096&height=2544",
                    srcSet:
                      "https://framerusercontent.com/images/JXFIRGkElzOkfYcZSNKfN3D6H0.png?scale-down-to=512&width=4096&height=2544 512w,https://framerusercontent.com/images/JXFIRGkElzOkfYcZSNKfN3D6H0.png?scale-down-to=1024&width=4096&height=2544 1024w,https://framerusercontent.com/images/JXFIRGkElzOkfYcZSNKfN3D6H0.png?scale-down-to=2048&width=4096&height=2544 2048w,https://framerusercontent.com/images/JXFIRGkElzOkfYcZSNKfN3D6H0.png?width=4096&height=2544 4096w",
                  }}
                  className={styles.sectionHeaderImage}
                  data-appear-id="1ck46tx"
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
                      Aether is an electric vehicle concept developed at SCAD to reignite the thrill of
                      driving for a new generation. Designed for spontaneous adventures, Aether challenges the
                      passive future of autonomy with a bold vision for personal freedom and road expression.
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
                          intrinsicHeight: 2539,
                          intrinsicWidth: 3809,
                          pixelHeight: 2539,
                          pixelWidth: 3809,
                          sizes: "160px",
                          src: "https://framerusercontent.com/images/3XFuQPPtuAvWn5Ui2NInxBDJCog.png?width=3809&height=2539",
                          srcSet:
                            "https://framerusercontent.com/images/3XFuQPPtuAvWn5Ui2NInxBDJCog.png?scale-down-to=512&width=3809&height=2539 512w,https://framerusercontent.com/images/3XFuQPPtuAvWn5Ui2NInxBDJCog.png?scale-down-to=1024&width=3809&height=2539 1024w,https://framerusercontent.com/images/3XFuQPPtuAvWn5Ui2NInxBDJCog.png?scale-down-to=2048&width=3809&height=2539 2048w,https://framerusercontent.com/images/3XFuQPPtuAvWn5Ui2NInxBDJCog.png?width=3809&height=2539 3809w",
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
                              See More
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
                              Aether
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
                              Brand Guidelines
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
                          scopeId="AetherDraftPage"
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
                            id="Material6"
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
                          scopeId="AetherDraftPage"
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
                            id="Material7"
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
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1728,
                  intrinsicWidth: 2304,
                  pixelHeight: 1728,
                  pixelWidth: 2304,
                  positionX: "center",
                  positionY: "bottom",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/xi03o2raiyWtAuSwvU6Oa2TEeRs.jpeg?lossless=1&width=2304&height=1728",
                  srcSet:
                    "https://framerusercontent.com/images/xi03o2raiyWtAuSwvU6Oa2TEeRs.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/xi03o2raiyWtAuSwvU6Oa2TEeRs.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/xi03o2raiyWtAuSwvU6Oa2TEeRs.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/xi03o2raiyWtAuSwvU6Oa2TEeRs.jpeg?lossless=1&width=2304&height=1728 2304w",
                }}
                className={styles.sectionContentBanner}
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
                        intrinsicHeight: 1728,
                        intrinsicWidth: 2304,
                        pixelHeight: 1728,
                        pixelWidth: 2304,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?lossless=1&width=2304&height=1728",
                        srcSet:
                          "https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?lossless=1&width=2304&height=1728 2304w",
                      },
                      fitImageDimension: "height",
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1728,
                      intrinsicWidth: 2304,
                      pixelHeight: 1728,
                      pixelWidth: 2304,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?lossless=1&width=2304&height=1728",
                      srcSet:
                        "https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/8eS8HMtJuhStQZXjy8ri9FKQ.jpeg?lossless=1&width=2304&height=1728 2304w",
                    }}
                    className={styles.banner}
                    data-name="Banner"
                  />
                </PropertyOverrides>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1728,
                        intrinsicWidth: 2304,
                        pixelHeight: 1728,
                        pixelWidth: 2304,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?lossless=1&width=2304&height=1728",
                        srcSet:
                          "https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?lossless=1&width=2304&height=1728 2304w",
                      },
                      fitImageDimension: "height",
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1728,
                      intrinsicWidth: 2304,
                      pixelHeight: 1728,
                      pixelWidth: 2304,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?lossless=1&width=2304&height=1728",
                      srcSet:
                        "https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/unz2UKC1pxlovdPnB7sS1loPBTc.jpeg?lossless=1&width=2304&height=1728 2304w",
                    }}
                    className={styles.banner2}
                    data-name="Banner"
                  />
                </PropertyOverrides>
              </div>
              <div className={styles.content1_2} data-name="Content 1">
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1728,
                        intrinsicWidth: 2304,
                        pixelHeight: 1728,
                        pixelWidth: 2304,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?lossless=1&width=2304&height=1728",
                        srcSet:
                          "https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?lossless=1&width=2304&height=1728 2304w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1728,
                      intrinsicWidth: 2304,
                      pixelHeight: 1728,
                      pixelWidth: 2304,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?lossless=1&width=2304&height=1728",
                      srcSet:
                        "https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=512&lossless=1&width=2304&height=1728 512w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=1024&lossless=1&width=2304&height=1728 1024w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?scale-down-to=2048&lossless=1&width=2304&height=1728 2048w,https://framerusercontent.com/images/bci7WnKgMF0MqCcL3Fq09NbBc9s.jpeg?lossless=1&width=2304&height=1728 2304w",
                    }}
                    className={styles.banner3}
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
                            Aether is a fully functioning electric concept car designed and built at SCAD.
                            Conceived as an entry level sports car, its mission was to reignite the thrill of
                            driving for a new generation.
                          </p>
                        </>
                      ),
                    },
                  }}
                >
                  <RichText
                    className={styles.content1_3}
                    data-name="Content 1"
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        Aether is a fully functioning electric concept car designed and built at SCAD.
                        Conceived as an entry level sports car, its mission was to reignite the thrill of
                        driving for a new generation.
                      </p>
                    </>
                  </RichText>
                </PropertyOverrides>
              </div>
              <div className={styles.content1_4} data-name="Content 1">
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
                            I focused on the steering wheel and interior, using physical prototypes, form
                            studies, and material exploration to refine the driver experience. As the car
                            evolved, my role expanded into branding, working closely with the team throughout.
                          </p>
                        </>
                      ),
                    },
                  }}
                >
                  <RichText
                    className={styles.content1_5}
                    data-name="Content 1"
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        I focused on the steering wheel and interior, using physical prototypes, form studies,
                        and material exploration to refine the driver experience. As the car evolved, my role
                        expanded into branding, working closely with the team throughout.
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
                        intrinsicHeight: 2358,
                        intrinsicWidth: 1320,
                        pixelHeight: 2358,
                        pixelWidth: 1320,
                        positionX: "center",
                        positionY: "bottom",
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?lossless=1&width=1320&height=2358",
                        srcSet:
                          "https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?scale-down-to=1024&lossless=1&width=1320&height=2358 573w,https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?scale-down-to=2048&lossless=1&width=1320&height=2358 1146w,https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?lossless=1&width=1320&height=2358 1320w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 2358,
                      intrinsicWidth: 1320,
                      pixelHeight: 2358,
                      pixelWidth: 1320,
                      positionX: "center",
                      positionY: "bottom",
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?lossless=1&width=1320&height=2358",
                      srcSet:
                        "https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?scale-down-to=1024&lossless=1&width=1320&height=2358 573w,https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?scale-down-to=2048&lossless=1&width=1320&height=2358 1146w,https://framerusercontent.com/images/efdlRND8J5SaD1Z2GMmUuaneJZ0.jpg?lossless=1&width=1320&height=2358 1320w",
                    }}
                    className={styles.banner4}
                    data-name="Banner"
                  />
                </PropertyOverrides>
              </div>
              <div className={styles.mediaPortraits} data-name="Media Portraits">
                <div className={styles.imageWrapper} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "",
                          fit: "fill",
                          intrinsicHeight: 1920,
                          intrinsicWidth: 1920,
                          pixelHeight: 1920,
                          pixelWidth: 1920,
                          positionX: "left",
                          positionY: "center",
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?lossless=1&width=1920&height=1920",
                          srcSet:
                            "https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?scale-down-to=512&lossless=1&width=1920&height=1920 512w,https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?scale-down-to=1024&lossless=1&width=1920&height=1920 1024w,https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?lossless=1&width=1920&height=1920 1920w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1920,
                        intrinsicWidth: 1920,
                        pixelHeight: 1920,
                        pixelWidth: 1920,
                        positionX: "left",
                        positionY: "center",
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?lossless=1&width=1920&height=1920",
                        srcSet:
                          "https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?scale-down-to=512&lossless=1&width=1920&height=1920 512w,https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?scale-down-to=1024&lossless=1&width=1920&height=1920 1024w,https://framerusercontent.com/images/PvxWNj5GysKRM3hebsyfDOxFo.png?lossless=1&width=1920&height=1920 1920w",
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
                          intrinsicHeight: 1080,
                          intrinsicWidth: 1080,
                          pixelHeight: 1080,
                          pixelWidth: 1080,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?lossless=1&width=1080&height=1080",
                          srcSet:
                            "https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?lossless=1&width=1080&height=1080 1080w",
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
                        src: "https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?lossless=1&width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/kExDquco6j6uCDbeLBoyl7Fyug.gif?lossless=1&width=1080&height=1080 1080w",
                      }}
                      className={styles.image2}
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
                                  <LayoutGroup id={`works5-${worksId}`} key={worksId}>
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
                                  <LayoutGroup id={`works6-${worksIdWorks}`} key={worksIdWorks}>
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
                                  <LayoutGroup id={`works7-${worksId2}`} key={worksId2}>
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

export default asPage(AetherDraftPage);

AetherDraftPage.displayName = "Halv";

AetherDraftPage.defaultProps = { height: 5872, width: 1200 };

AetherDraftPage.loader = {
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
