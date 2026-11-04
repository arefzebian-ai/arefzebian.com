"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./rivited-draft.module.css";
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
import TextLink from "@/components/text-link";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import * as body20 from "@/styles/text/body-20";
import * as body14 from "@/styles/text/body-14";
import * as body40 from "@/styles/text/body-40";

const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-rivited-draft-tablet",
  Phone: "hidden-rivited-draft-phone",
  Desktop: "hidden-desktop",
};

const animation = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 50 };

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

const animation1 = { opacity: 1, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 40 };

const transition2 = { delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const transition3 = { delay: 0, duration: 3, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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
  from: { alias: "works43", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works43", name: "worksSlug", type: "Identifier" },
    { collection: "works43", name: "title", type: "Identifier" },
    { collection: "works43", name: "category", type: "Identifier" },
    { collection: "works43", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works43", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works43", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works43", name: "sortingNumber", type: "Identifier" },
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
  from: { alias: "works44", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works44", name: "worksSlug", type: "Identifier" },
    { collection: "works44", name: "title", type: "Identifier" },
    { collection: "works44", name: "category", type: "Identifier" },
    { collection: "works44", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works44", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works44", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works44", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works45", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works45", name: "worksSlug", type: "Identifier" },
    { collection: "works45", name: "title", type: "Identifier" },
    { collection: "works45", name: "category", type: "Identifier" },
    { collection: "works45", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works45", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works45", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works45", name: "sortingNumber", type: "Identifier" },
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

const RivitedDraftPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body14.className, body40.className, body20.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const ref1 = React.useRef<HTMLDivElement>(null);

  const componentScopeId = "DSTDDwCYe";

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
              <div className={styles.title} data-name="Title">
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
                      The precision and elegance of aviation design
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
                            Taya Everett
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
                            Accessory Design
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
                    intrinsicHeight: 2731,
                    intrinsicWidth: 4096,
                    pixelHeight: 2731,
                    pixelWidth: 4096,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/W0oJKajTB17D8flIsYWInZfNg50.webp?width=4096&height=2731",
                    srcSet:
                      "https://framerusercontent.com/images/W0oJKajTB17D8flIsYWInZfNg50.webp?scale-down-to=512&width=4096&height=2731 512w,https://framerusercontent.com/images/W0oJKajTB17D8flIsYWInZfNg50.webp?scale-down-to=1024&width=4096&height=2731 1024w,https://framerusercontent.com/images/W0oJKajTB17D8flIsYWInZfNg50.webp?scale-down-to=2048&width=4096&height=2731 2048w,https://framerusercontent.com/images/W0oJKajTB17D8flIsYWInZfNg50.webp?width=4096&height=2731 4096w",
                  }}
                  className={styles.sectionHeaderImage}
                  data-appear-id="1mi9z8h"
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
                      Fashion designer Taya Everett invited me to collaborate on two steel handbag concepts
                      for her collection Riveted -a tribute to her childhood spent in airport hangars. The
                      designs draw from aviation and re-constructivist influences, mirroring the collection’s
                      sharp geometry and structural beauty. The project was featured in the SCAD Atlanta
                      Fashion Show and selected for Vogue’s Digital Runway showcase.
                    </p>
                  </>
                </RichText>
              </div>
            </div>
            <div className={styles.sectionContent} data-name="Section Content">
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 3512,
                  intrinsicWidth: 3861,
                  pixelHeight: 3512,
                  pixelWidth: 3861,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/maHtWy0CP8pKMmRtiUstoH4g4.webp?lossless=1&width=3861&height=3512",
                  srcSet:
                    "https://framerusercontent.com/images/maHtWy0CP8pKMmRtiUstoH4g4.webp?scale-down-to=512&lossless=1&width=3861&height=3512 512w,https://framerusercontent.com/images/maHtWy0CP8pKMmRtiUstoH4g4.webp?scale-down-to=1024&lossless=1&width=3861&height=3512 1024w,https://framerusercontent.com/images/maHtWy0CP8pKMmRtiUstoH4g4.webp?scale-down-to=2048&lossless=1&width=3861&height=3512 2048w,https://framerusercontent.com/images/maHtWy0CP8pKMmRtiUstoH4g4.webp?lossless=1&width=3861&height=3512 3861w",
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
                          intrinsicHeight: 4128,
                          intrinsicWidth: 3096,
                          pixelHeight: 4128,
                          pixelWidth: 3096,
                          positionX: "center",
                          positionY: "bottom",
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?lossless=1&width=3096&height=4128",
                          srcSet:
                            "https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=1024&lossless=1&width=3096&height=4128 768w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=2048&lossless=1&width=3096&height=4128 1536w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=4096&lossless=1&width=3096&height=4128 3072w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?lossless=1&width=3096&height=4128 3096w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 4128,
                        intrinsicWidth: 3096,
                        pixelHeight: 4128,
                        pixelWidth: 3096,
                        positionX: "center",
                        positionY: "bottom",
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?lossless=1&width=3096&height=4128",
                        srcSet:
                          "https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=1024&lossless=1&width=3096&height=4128 768w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=2048&lossless=1&width=3096&height=4128 1536w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?scale-down-to=4096&lossless=1&width=3096&height=4128 3072w,https://framerusercontent.com/images/G5hO2YYJmMw7Qickbtxs50E4OE.jpeg?lossless=1&width=3096&height=4128 3096w",
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
                          intrinsicHeight: 3957,
                          intrinsicWidth: 2968,
                          pixelHeight: 3957,
                          pixelWidth: 2968,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?lossless=1&width=2968&height=3957",
                          srcSet:
                            "https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?scale-down-to=1024&lossless=1&width=2968&height=3957 768w,https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?scale-down-to=2048&lossless=1&width=2968&height=3957 1536w,https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?lossless=1&width=2968&height=3957 2968w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 3957,
                        intrinsicWidth: 2968,
                        pixelHeight: 3957,
                        pixelWidth: 2968,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?lossless=1&width=2968&height=3957",
                        srcSet:
                          "https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?scale-down-to=1024&lossless=1&width=2968&height=3957 768w,https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?scale-down-to=2048&lossless=1&width=2968&height=3957 1536w,https://framerusercontent.com/images/NB15EBBWozvPEzclc3Dhjk4SIU.jpeg?lossless=1&width=2968&height=3957 2968w",
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
                    Tablet: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 8256,
                        intrinsicWidth: 6192,
                        pixelHeight: 8256,
                        pixelWidth: 6192,
                        sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256",
                        srcSet:
                          "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=1024&lossless=1&width=6192&height=8256 768w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=2048&lossless=1&width=6192&height=8256 1536w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=4096&lossless=1&width=6192&height=8256 3072w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256 6192w",
                      },
                    },
                    Phone: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 8256,
                        intrinsicWidth: 6192,
                        pixelHeight: 8256,
                        pixelWidth: 6192,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256",
                        srcSet:
                          "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=1024&lossless=1&width=6192&height=8256 768w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=2048&lossless=1&width=6192&height=8256 1536w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=4096&lossless=1&width=6192&height=8256 3072w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256 6192w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 8256,
                      intrinsicWidth: 6192,
                      pixelHeight: 8256,
                      pixelWidth: 6192,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256",
                      srcSet:
                        "https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=1024&lossless=1&width=6192&height=8256 768w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=2048&lossless=1&width=6192&height=8256 1536w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?scale-down-to=4096&lossless=1&width=6192&height=8256 3072w,https://framerusercontent.com/images/AP3dCDklJd3g06gCaHWLF7MG0.jpeg?lossless=1&width=6192&height=8256 6192w",
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
                            The Riveted Bags are studies in steel, inspired by aircraft fuselages and the
                            brutal elegance of reconstruction.
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
                        The Riveted Bags are studies in steel, inspired by aircraft fuselages and the brutal
                        elegance of reconstruction.
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
                            With special thanks to industrial designer Camden Jones, who designed and helped
                            fabricate the second bag.
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
                        With special thanks to industrial designer Camden Jones, who designed and helped
                        fabricate the second bag.
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
                        intrinsicHeight: 8256,
                        intrinsicWidth: 6192,
                        pixelHeight: 8256,
                        pixelWidth: 6192,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?lossless=1&width=6192&height=8256",
                        srcSet:
                          "https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=1024&lossless=1&width=6192&height=8256 768w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=2048&lossless=1&width=6192&height=8256 1536w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=4096&lossless=1&width=6192&height=8256 3072w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?lossless=1&width=6192&height=8256 6192w",
                      },
                    },
                  }}
                >
                  <Image1
                    background={{
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 8256,
                      intrinsicWidth: 6192,
                      pixelHeight: 8256,
                      pixelWidth: 6192,
                      sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?lossless=1&width=6192&height=8256",
                      srcSet:
                        "https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=1024&lossless=1&width=6192&height=8256 768w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=2048&lossless=1&width=6192&height=8256 1536w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?scale-down-to=4096&lossless=1&width=6192&height=8256 3072w,https://framerusercontent.com/images/V1ZjDozBtf3XVoeryx6sFnqE7E.jpeg?lossless=1&width=6192&height=8256 6192w",
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
                          intrinsicHeight: 3024,
                          intrinsicWidth: 4032,
                          pixelHeight: 3024,
                          pixelWidth: 4032,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?lossless=1&width=4032&height=3024",
                          srcSet:
                            "https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=512&lossless=1&width=4032&height=3024 512w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=1024&lossless=1&width=4032&height=3024 1024w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=2048&lossless=1&width=4032&height=3024 2048w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?lossless=1&width=4032&height=3024 4032w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 3024,
                        intrinsicWidth: 4032,
                        pixelHeight: 3024,
                        pixelWidth: 4032,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?lossless=1&width=4032&height=3024",
                        srcSet:
                          "https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=512&lossless=1&width=4032&height=3024 512w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=1024&lossless=1&width=4032&height=3024 1024w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?scale-down-to=2048&lossless=1&width=4032&height=3024 2048w,https://framerusercontent.com/images/G2c0AR4IrXVFPBPahFzd1nL5es.jpeg?lossless=1&width=4032&height=3024 4032w",
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
                          intrinsicHeight: 3024,
                          intrinsicWidth: 4032,
                          pixelHeight: 3024,
                          pixelWidth: 4032,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          src: "https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?lossless=1&width=4032&height=3024",
                          srcSet:
                            "https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=512&lossless=1&width=4032&height=3024 512w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=1024&lossless=1&width=4032&height=3024 1024w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=2048&lossless=1&width=4032&height=3024 2048w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?lossless=1&width=4032&height=3024 4032w",
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 3024,
                        intrinsicWidth: 4032,
                        pixelHeight: 3024,
                        pixelWidth: 4032,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?lossless=1&width=4032&height=3024",
                        srcSet:
                          "https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=512&lossless=1&width=4032&height=3024 512w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=1024&lossless=1&width=4032&height=3024 1024w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?scale-down-to=2048&lossless=1&width=4032&height=3024 2048w,https://framerusercontent.com/images/Dh6vrv0K2KpdQ44iQhcxwWZsbc.jpeg?lossless=1&width=4032&height=3024 4032w",
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
                        Tablet: { link: "/works/grid-view" },
                        Phone: { link: "/works/grid-view", label: "View All" },
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
              <div className={styles.container} data-name="Container">
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
                                  <LayoutGroup id={`works43-${worksId}`} key={worksId}>
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
                                  <LayoutGroup id={`works44-${worksIdWorks}`} key={worksIdWorks}>
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
                                  <LayoutGroup id={`works45-${worksId2}`} key={worksId2}>
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

export default asPage(RivitedDraftPage);

RivitedDraftPage.displayName = "Halv";

RivitedDraftPage.defaultProps = { height: 6065, width: 1200 };

RivitedDraftPage.loader = {
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
