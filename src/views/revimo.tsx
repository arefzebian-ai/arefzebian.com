"use client";

import "@/styles/fonts/inter.css";
import "@/styles/fonts/favorit-light.css";
import styles from "./revimo.module.css";
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

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const MotionDivWithOptimizedAppearEffect = withOptimizedAppearEffect(motion.div);

const breakpoints = {
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Desktop: "hidden-desktop",
  Phone: "hidden-revimo-phone",
  Tablet: "hidden-revimo-tablet",
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
  from: { alias: "works40", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works40", name: "title", type: "Identifier" },
    { collection: "works40", name: "category", type: "Identifier" },
    { collection: "works40", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works40", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works40", name: "worksSlug", type: "Identifier" },
    { collection: "works40", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works40", name: "sortingNumber", type: "Identifier" },
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
  from: { alias: "works41", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works41", name: "title", type: "Identifier" },
    { collection: "works41", name: "category", type: "Identifier" },
    { collection: "works41", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works41", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works41", name: "worksSlug", type: "Identifier" },
    { collection: "works41", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works41", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 2 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works42", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works42", name: "title", type: "Identifier" },
    { collection: "works42", name: "category", type: "Identifier" },
    { collection: "works42", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works42", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works42", name: "worksSlug", type: "Identifier" },
    { collection: "works42", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works42", name: "sortingNumber", type: "Identifier" },
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

const RevimoPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
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

  const componentScopeId = "urd6VSiAL";

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
                        Revimo Niko
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
                        Revival Of Motion
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
                            data-appear-id="1dxjiz"
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
                            data-appear-id="d2i75o"
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
                          data-appear-id="6pzyzm"
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
                          data-appear-id="mxsc9c"
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
                              Revimo Niko
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
                          data-appear-id="3cdqoz"
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
                          data-appear-id="nng7xu"
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
                    className={cx(styles.content3, "hidden-revimo-tablet", "hidden-revimo-phone")}
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
                  intrinsicHeight: 1080,
                  intrinsicWidth: 1920,
                  pixelHeight: 1080,
                  pixelWidth: 1920,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?lossless=1&width=1920&height=1080",
                  srcSet:
                    "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=512&lossless=1&width=1920&height=1080 512w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=1024&lossless=1&width=1920&height=1080 1024w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?lossless=1&width=1920&height=1080 1920w",
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
                      Blending a patient lift with a powered wheelchair, this innovative mobility solution
                      enhances independence and simplifies care. Designed for simplicity, safety, and
                      reliability, it empowers users to move freely and live fully.
                    </p>
                  </>
                </RichText>
                <div className={styles.sectionDetailsContainer} data-name="Container">
                  <Link href="/revimo-casestudy" motionChild nodeId="Case Study Card" openInNewTab={false}>
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
                            intrinsicHeight: 1080,
                            intrinsicWidth: 1920,
                            pixelHeight: 1080,
                            pixelWidth: 1920,
                            sizes: "160px",
                            src: "https://framerusercontent.com/images/MXmfvBG2NO0TI5xzHi53x3toVQ.png?width=1920&height=1080",
                            srcSet:
                              "https://framerusercontent.com/images/MXmfvBG2NO0TI5xzHi53x3toVQ.png?scale-down-to=512&width=1920&height=1080 512w,https://framerusercontent.com/images/MXmfvBG2NO0TI5xzHi53x3toVQ.png?scale-down-to=1024&width=1920&height=1080 1024w,https://framerusercontent.com/images/MXmfvBG2NO0TI5xzHi53x3toVQ.png?width=1920&height=1080 1920w",
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
                                Revimo
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
                                ID + Branding
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
                            scopeId="RevimoPage"
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
                              id="Material3"
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
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1080,
                  intrinsicWidth: 1920,
                  pixelHeight: 1080,
                  pixelWidth: 1920,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?lossless=1&width=1920&height=1080",
                  srcSet:
                    "https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?scale-down-to=512&lossless=1&width=1920&height=1080 512w,https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?scale-down-to=1024&lossless=1&width=1920&height=1080 1024w,https://framerusercontent.com/images/ICr5EwHLldTZdZRFfMc7yMRgQ.png?lossless=1&width=1920&height=1080 1920w",
                }}
                className={styles.banner}
                data-name="Banner"
              />
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  intrinsicHeight: 1080,
                  intrinsicWidth: 1920,
                  pixelHeight: 1080,
                  pixelWidth: 1920,
                  positionX: "center",
                  positionY: "center",
                  sizes: `calc(${viewportWidth} - 40px)`,
                  src: "https://framerusercontent.com/images/dZfHt9Or8qkGgZhTYyLAXYMk.png?lossless=1&width=1920&height=1080",
                  srcSet:
                    "https://framerusercontent.com/images/dZfHt9Or8qkGgZhTYyLAXYMk.png?scale-down-to=512&lossless=1&width=1920&height=1080 512w,https://framerusercontent.com/images/dZfHt9Or8qkGgZhTYyLAXYMk.png?scale-down-to=1024&lossless=1&width=1920&height=1080 1024w,https://framerusercontent.com/images/dZfHt9Or8qkGgZhTYyLAXYMk.png?lossless=1&width=1920&height=1080 1920w",
                }}
                className={styles.banner2}
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
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?lossless=1&width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?lossless=1&width=1080&height=1080 1080w",
                      },
                    },
                    Tablet: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                        src: "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=512&width=1080&height=1080 512w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=1024&width=1080&height=1080 1024w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?width=1080&height=1080 1080w",
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
                      sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?lossless=1&width=1080&height=1080",
                      srcSet:
                        "https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/B3BUyvLk0HYwkh2l5VKwWQFvFo.png?lossless=1&width=1080&height=1080 1080w",
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
                            Aleksandr Malashchenko founded ReviMo after witnessing the challenges of
                            caregiving during his grandfather’s stroke.
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
                        Aleksandr Malashchenko founded ReviMo after witnessing the challenges of caregiving
                        during his grandfather’s stroke.
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
                            With a Ph.D. and aerospace R&amp;D roots, Aleks had the system. General Populace
                            shaped the story, design, and touchpoints to bring it to life.
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
                        With a Ph.D. and aerospace R&amp;D roots, Aleks had the system. General Populace
                        shaped the story, design, and touchpoints to bring it to life.
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
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?lossless=1&width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?lossless=1&width=1080&height=1080 1080w",
                      },
                    },
                    Tablet: {
                      background: {
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
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
                      intrinsicHeight: 1080,
                      intrinsicWidth: 1080,
                      pixelHeight: 1080,
                      pixelWidth: 1080,
                      sizes: `max((${viewportWidth} - 50px) / 2, 1px)`,
                      src: "https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?lossless=1&width=1080&height=1080",
                      srcSet:
                        "https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/FoyEL7Pb5Yk2YadbU3MI9vWXiPM.png?lossless=1&width=1080&height=1080 1080w",
                    }}
                    className={styles.banner4}
                    data-name="Banner"
                  />
                </PropertyOverrides>
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
                  src: "https://framerusercontent.com/images/NtiZRJqApLZGuayL3g1YuIjAykA.png?lossless=1&width=2752&height=1536",
                  srcSet:
                    "https://framerusercontent.com/images/NtiZRJqApLZGuayL3g1YuIjAykA.png?scale-down-to=512&lossless=1&width=2752&height=1536 512w,https://framerusercontent.com/images/NtiZRJqApLZGuayL3g1YuIjAykA.png?scale-down-to=1024&lossless=1&width=2752&height=1536 1024w,https://framerusercontent.com/images/NtiZRJqApLZGuayL3g1YuIjAykA.png?scale-down-to=2048&lossless=1&width=2752&height=1536 2048w,https://framerusercontent.com/images/NtiZRJqApLZGuayL3g1YuIjAykA.png?lossless=1&width=2752&height=1536 2752w",
                }}
                className={styles.banner5}
                data-name="Banner"
              />
              <div className={styles.content1_5} data-name="Content 1">
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
                        src: "https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?lossless=1&width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?lossless=1&width=1080&height=1080 1080w",
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
                      src: "https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?lossless=1&width=1080&height=1080",
                      srcSet:
                        "https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/jCVtmxC4COQM4S2zSswbGzncQcE.png?lossless=1&width=1080&height=1080 1080w",
                    }}
                    className={styles.banner6}
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
                        intrinsicHeight: 1080,
                        intrinsicWidth: 1080,
                        pixelHeight: 1080,
                        pixelWidth: 1080,
                        sizes: `calc(${viewportWidth} - 40px)`,
                        src: "https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?lossless=1&width=1080&height=1080",
                        srcSet:
                          "https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?lossless=1&width=1080&height=1080 1080w",
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
                      src: "https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?lossless=1&width=1080&height=1080",
                      srcSet:
                        "https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?scale-down-to=512&lossless=1&width=1080&height=1080 512w,https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?scale-down-to=1024&lossless=1&width=1080&height=1080 1024w,https://framerusercontent.com/images/Gc4YQrwI5pSTLJQaLJ2nZ9jvpY.jpg?lossless=1&width=1080&height=1080 1080w",
                    }}
                    className={styles.banner7}
                    data-name="Banner"
                  />
                </PropertyOverrides>
              </div>
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
                                  <LayoutGroup id={`works40-${worksId}`} key={worksId}>
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
                                  <LayoutGroup id={`works41-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/aether" motionChild nodeId="link" openInNewTab={false}>
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
                                  <LayoutGroup id={`works42-${worksId2}`} key={worksId2}>
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

export default asPage(RevimoPage);

RevimoPage.displayName = "Halv";

RevimoPage.defaultProps = { height: 7032, width: 1200 };

RevimoPage.loader = {
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
