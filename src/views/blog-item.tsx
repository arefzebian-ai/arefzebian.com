"use client";

import "@/styles/fonts/inter.css";
import "@/styles/fonts/inter-tight.css";
import styles from "./blog-item.module.css";
import {
  asPage,
  ChildrenCanSuspend,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getLoadingLazyAtYPosition,
  getRootLayoutProp,
  getWhereExpressionFromPathVariables,
  HTMLStyle,
  Image as Image1,
  Link,
  matchVariant,
  NotFoundError,
  PathVariablesContext,
  PropertyOverrides,
  queryCache,
  RichText,
  runTasksWithYield,
  runWithYield,
  toResponsiveImage,
  useComponentViewport,
  useCurrentPathVariables,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  useLocaleInfo,
  useQueryData,
  withCodeBoundaryForOverrides,
  withFX,
  withMappedReactProps,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import { Clipboard_Share } from "@/vendor/share-article";
import ShareArticleButton, * as ShareArticleButtonInfo from "@/components/share-article-button";
import TextLink from "@/components/text-link";
import GlobalLineAnimationGlobal from "@/components/global/line-animation-global";
import ArticleCard from "@/components/article-card";
import Blog from "@/cms/blog";
import * as h1 from "@/styles/text/h1";
import * as body17Formatted from "@/styles/text/body-17-formatted";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as h2_30 from "@/styles/text/h2-30";
import * as body25 from "@/styles/text/body-25";
import * as body15 from "@/styles/text/body-15";

const ShareArticleButtonClipboard_Share = withCodeBoundaryForOverrides(ShareArticleButton, {
  nodeId: "ShareArticleButton",
  override: Clipboard_Share,
  scopeId: "BlogItemPage",
});
const ShareArticleButtonClipboard_Sharey5yqy2WithMappedReactPropsa6oa4n = withMappedReactProps(
  ShareArticleButtonClipboard_Share,
  ShareArticleButtonInfo,
);
const MotionDivWithOptimizedAppearEffect = withOptimizedAppearEffect(motion.div);
const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const Image1WithFX = withFX(Image1);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-blog-item-phone",
  Tablet: "hidden-blog-item-tablet",
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

const textEffect1 = {
  effect: animation,
  repeat: false,
  startDelay: 0.4,
  tokenization: "line",
  transition: transition1,
  trigger: "onMount",
  type: "appear",
} as const;

const transition2 = { delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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
  y: 40,
};

const transition3 = { delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const animation3 = {
  opacity: 0.4,
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

const transition4 = { delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const transition5 = { delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const animation5 = {
  opacity: 0.4,
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

const transition6 = { delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const transition7 = { delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const convertFromEnum = (value, activeLocale) => {
  switch (value) {
    case "sCQeHbqPX":
      return "Article Card 1x1";
    case "SPTmDaq0c":
      return "Article Card - Wide";
    default:
      return "Article Card 1x1";
  }
};

const query = (nextArticle1) => ({
  from: { alias: "blog", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "blog", name: "blogSlug", type: "Identifier" },
    { collection: "blog", name: "aspectRatio", type: "Identifier" },
    { collection: "blog", name: "thumbnail", type: "Identifier" },
    { collection: "blog", name: "title", type: "Identifier" },
    { collection: "blog", name: "category", type: "Identifier" },
    { collection: "blog", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "blog", name: "sortOrder", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextArticle1 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = (nextArticle2) => ({
  from: { alias: "blog2", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "blog2", name: "blogSlug", type: "Identifier" },
    { collection: "blog2", name: "aspectRatio", type: "Identifier" },
    { collection: "blog2", name: "thumbnail", type: "Identifier" },
    { collection: "blog2", name: "title", type: "Identifier" },
    { collection: "blog2", name: "category", type: "Identifier" },
    { collection: "blog2", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "blog2", name: "sortOrder", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextArticle2 },
    type: "BinaryOperation",
  },
});

const query2 = (nextArticle3) => ({
  from: { alias: "blog3", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "blog3", name: "blogSlug", type: "Identifier" },
    { collection: "blog3", name: "aspectRatio", type: "Identifier" },
    { collection: "blog3", name: "thumbnail", type: "Identifier" },
    { collection: "blog3", name: "title", type: "Identifier" },
    { collection: "blog3", name: "category", type: "Identifier" },
    { collection: "blog3", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "blog3", name: "sortOrder", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextArticle3 },
    type: "BinaryOperation",
  },
});

const detailQuery = (where) => ({
  from: { alias: "blogItem", data: Blog, type: "Collection" },
  select: [
    { collection: "blogItem", name: "title", type: "Identifier" },
    { collection: "blogItem", name: "subtitleQuote", type: "Identifier" },
    { collection: "blogItem", name: "thumbnail", type: "Identifier" },
    { collection: "blogItem", name: "date", type: "Identifier" },
    { collection: "blogItem", name: "photography", type: "Identifier" },
    { collection: "blogItem", name: "content", type: "Identifier" },
    { collection: "blogItem", name: "nextArticle1", type: "Identifier" },
    { collection: "blogItem", name: "nextArticle2", type: "Identifier" },
    { collection: "blogItem", name: "nextArticle3", type: "Identifier" },
  ],
  where,
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
  // Props passed by their original id.
  bvNpENgkp?: unknown;
  w8dqqnK_M?: unknown;
  pgABsoEkt?: unknown;
  sfetmLoj2?: unknown;
  ovVt9yovh?: unknown;
  bCTwTAJTZ?: unknown;
  CARShPzCs?: unknown;
  C_Hh0R67D?: unknown;
  BLBypI8qw?: unknown;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const BlogItemPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { activeLocale } = useLocaleInfo();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const currentPathVariables = useCurrentPathVariables();
  const [currentRouteData] = useQueryData(
    detailQuery(getWhereExpressionFromPathVariables(currentPathVariables, "blogItem")),
  );
  if (!currentRouteData)
    throw new NotFoundError(`No data matches path variables: ${JSON.stringify(currentPathVariables)}`);

  const {
    style,
    className,
    layoutId,
    variant,
    title = currentRouteData["title"] ?? "",
    subtitleQuote = currentRouteData["subtitleQuote"] ?? "",
    thumbnail = currentRouteData["thumbnail"],
    date = currentRouteData["date"] ?? "",
    photography = currentRouteData["photography"] ?? "",
    content = currentRouteData["content"] ?? "",
    nextArticle1 = currentRouteData["nextArticle1"] ?? 0,
    nextArticle2 = currentRouteData["nextArticle2"] ?? 0,
    nextArticle3 = currentRouteData["nextArticle3"] ?? 0,
    ...restProps
  } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(
    styles.page,
    h1.className,
    body25.className,
    body13Uppercase.className,
    body15.className,
    h2_30.className,
    body17Formatted.className,
  );

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

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
      <LayoutGroup id={layoutId ?? defaultLayoutId}>
        <HTMLStyle value="html body { background: rgb(0, 0, 0); }" />
        <motion.div
          {...restProps}
          className={cx(scopingClassNames, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div className={styles.sectionArticleIntro} data-name="Section Article Intro">
              <ComponentViewportProvider
                height={1}
                width={`calc(${viewportWidth} - 40px)`}
                y={viewportY + 150}
              >
                <Container className={styles.sectionArticleAnimationGlobal}>
                  <GlobalLineAnimationGlobal
                    height="100%"
                    colour="rgba(0, 0, 0, 0.1)"
                    style={{ height: "100%", width: "100%" }}
                    variant={matchVariant("Line animate on appear")}
                    width="100%"
                  />
                </Container>
              </ComponentViewportProvider>
              <div className={styles.topRow} data-name="Top Row">
                <div className={styles.titleWrapper} data-name="Title Wrapper">
                  <div className={styles.frame}>
                    <RichText
                      className={styles.text}
                      data-name="How has Aesop changed the cosmetic packaging industry?"
                      effect={textEffect}
                      fonts={["Inter"]}
                      text={title}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <h1 className="text-h1" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                          How has Aesop changed the cosmetic packaging industry?
                        </h1>
                      </>
                    </RichText>
                  </div>
                  <div className={styles.frame2}>
                    <RichText
                      className={styles.thisRecognitionCelebrates}
                      data-name="This recognition celebrates our commitment to pushing the boundaries of creativity and innovation in design."
                      effect={textEffect1}
                      fonts={["Inter"]}
                      text={subtitleQuote}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-25">
                          Minimalism highlights what matters by removing what doesn’t. It’s design with
                          intention and clarity.
                        </p>
                      </>
                    </RichText>
                  </div>
                </div>
              </div>
              <div className={styles.bottomRow} data-name="Bottom Row">
                <div className={styles.share} data-name="Share">
                  <MotionDivWithOptimizedAppearEffect
                    animate={animation1}
                    className={styles.shareFrame}
                    data-appear-id="luevsg"
                    initial={animation2}
                    optimized
                  >
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { y: viewportY + 150 + 324.69 + 60 } }}
                    >
                      <ComponentViewportProvider height={32} y={viewportY + 150 + 367.25 + 152.1}>
                        <Container className={styles.shareArticleButtonClipboard} rendersWithMotion>
                          <ShareArticleButtonClipboard_Sharey5yqy2WithMappedReactPropsa6oa4n
                            height="100%"
                            id="h3g5dr0qg"
                            variant={matchVariant("Share Article")}
                            width="100%"
                          />
                        </Container>
                      </ComponentViewportProvider>
                    </PropertyOverrides>
                  </MotionDivWithOptimizedAppearEffect>
                </div>
                <div className={styles.frame3}>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: { width: `calc(${viewportWidth} - 40px)`, y: viewportY + 150 + 324.69 + 112 },
                    }}
                  >
                    <ComponentViewportProvider
                      height={1}
                      width={`max((${viewportWidth} - 60px) / 2, 1px)`}
                      y={viewportY + 150 + 367.25}
                    >
                      <Container className={styles.globalLineAnimationGlobal}>
                        <GlobalLineAnimationGlobal
                          height="100%"
                          colour="rgba(0, 0, 0, 0.1)"
                          style={{ height: "100%", width: "100%" }}
                          variant={matchVariant("Line Animation 03")}
                          width="100%"
                        />
                      </Container>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                  <div className={styles.frame4}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation3}
                      className={styles.date}
                      data-appear-id="w45s1i"
                      data-name="date"
                      fonts={["Inter"]}
                      initial={animation2}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">date</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation4}
                      className={styles.text15thDec2024}
                      data-appear-id="1bv44w4"
                      data-name="15th Dec 2024"
                      fonts={["Inter"]}
                      initial={animation2}
                      optimized
                      text={date}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-15" style={{ "--df-text-alignment": "right" }}>
                          21.06.2025
                        </p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        width: `calc(${viewportWidth} - 40px)`,
                        y: viewportY + 150 + 324.69 + 112 + 97.05,
                      },
                    }}
                  >
                    <ComponentViewportProvider
                      height={1}
                      width={`max((${viewportWidth} - 60px) / 2, 1px)`}
                      y={viewportY + 150 + 367.25 + 97.05}
                    >
                      <Container className={styles.globalLineAnimationGlobal2}>
                        <GlobalLineAnimationGlobal
                          height="100%"
                          colour="rgba(0, 0, 0, 0.1)"
                          style={{ height: "100%", width: "100%" }}
                          variant={matchVariant("Line Animation 04")}
                          width="100%"
                        />
                      </Container>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                  <div className={styles.frame5}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation5}
                      className={styles.photos}
                      data-appear-id="xdw30z"
                      data-name="photos"
                      fonts={["Inter"]}
                      initial={animation2}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">photos</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation6}
                      className={styles.annaSurokin}
                      data-appear-id="1gxd3dp"
                      data-name="Anna Surokin"
                      fonts={["Inter"]}
                      initial={animation2}
                      optimized
                      text={photography}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-15" style={{ "--df-text-alignment": "right" }}>
                          Anna Surokin
                        </p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                </div>
              </div>
            </div>
            <MotionDivWithOptimizedAppearEffect
              animate={animation7}
              className={styles.articleImage}
              data-appear-id="1jdhl3h"
              data-name="Article Image"
              initial={animation2}
              optimized
            >
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{
                  Phone: {
                    background: {
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1334,
                      intrinsicWidth: 2000,
                      loading: getLoadingLazyAtYPosition(viewportY + 150 + 720.79),
                      pixelHeight: 1334,
                      pixelWidth: 2000,
                      sizes: viewportWidth,
                      ...toResponsiveImage(thumbnail),
                    },
                  },
                  Tablet: {
                    background: {
                      alt: "",
                      fit: "fill",
                      intrinsicHeight: 1334,
                      intrinsicWidth: 2000,
                      loading: getLoadingLazyAtYPosition(viewportY + 150 + 671.35),
                      pixelHeight: 1334,
                      pixelWidth: 2000,
                      sizes: viewportWidth,
                      ...toResponsiveImage(thumbnail),
                    },
                  },
                }}
              >
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stiffness: 500,
                    type: "spring",
                  }}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.3,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onScroll"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    intrinsicHeight: 1334,
                    intrinsicWidth: 2000,
                    loading: getLoadingLazyAtYPosition(viewportY + 150 + 591.35),
                    pixelHeight: 1334,
                    pixelWidth: 2000,
                    sizes: viewportWidth,
                    ...toResponsiveImage(thumbnail),
                  }}
                  className={styles.blogThumbnail}
                  data-name="Blog Thumbnail"
                  style={{ transformPerspective: 1200 }}
                />
              </PropertyOverrides>
            </MotionDivWithOptimizedAppearEffect>
            <div className={styles.sectionArticle} data-name="Section Article">
              <div className={styles.article} data-name="Article">
                <RichText
                  children={content}
                  className={styles.howHasAesopChanged}
                  data-name="How has Aesop changed the cosmetic packaging industry?"
                  fonts={["GF;Inter Tight-regular"]}
                  stylesPresetsClassNames={{ h2: "text-h2-30", p: "text-body-17-formatted" }}
                  verticalAlignment="top"
                  withExternalLayout
                />
              </div>
            </div>
            <div className={styles.sectionJournal} data-name="Section Journal">
              <div className={styles.frame6}>
                <RichText
                  className={styles.faqS}
                  data-name="FAQ’s"
                  fonts={["Inter"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2 className="text-h2-30">Read more</h2>
                  </>
                </RichText>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: { y: viewportY + 150 + 1391.79 + 10 },
                    Tablet: { y: viewportY + 150 + 1577.35 + 10 },
                  }}
                >
                  <ComponentViewportProvider height={16} y={viewportY + 150 + 1497.35 + 10}>
                    <Container className={styles.textLink}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{
                          Phone: { link: "/blog-unused", label: "Read All" },
                          Tablet: { link: "/blog-unused" },
                        }}
                      >
                        <TextLink
                          link="/blog-unused"
                          height="100%"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="Read All Articles"
                          color="rgb(0, 0, 0)"
                        />
                      </PropertyOverrides>
                    </Container>
                  </ComponentViewportProvider>
                </PropertyOverrides>
              </div>
              <div className={styles.container} data-name="Container">
                <div className={styles.frame7}>
                  <ChildrenCanSuspend>
                    <QueryData query={query(nextArticle1)}>
                      {(collection, paginationInfo, loadMore) => {
                        return (
                          <>
                            {collection?.map(
                              (
                                { category, title, aspectRatio, id: blogId, thumbnail, blogSlug: slug }: any,
                                index,
                              ) => {
                                slug ??= "";
                                title ??= "";
                                category ??= "";
                                return (
                                  <LayoutGroup id={`blog-${blogId}`} key={blogId}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slug }}>
                                      <Link href={`/blog-unused/${slug}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max((${viewportWidth} - 40px) * 1, 1px)`,
                                                y: viewportY + 150 + 1391.79 + 76,
                                              },
                                              Tablet: {
                                                width: `max(max((${viewportWidth} - 80px) / 3, 1px) * 1, 1px)`,
                                                y: viewportY + 150 + 1577.35 + 76,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={484}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                              y={viewportY + 150 + 1497.35 + 76}
                                            >
                                              <Container className={styles.articleCard}>
                                                <ArticleCard
                                                  title={title}
                                                  height="100%"
                                                  category={category}
                                                  style={{ width: "100%" }}
                                                  variant={matchVariant(
                                                    convertFromEnum(aspectRatio, activeLocale),
                                                  )}
                                                  width="100%"
                                                  image={toResponsiveImage(thumbnail)}
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
                <div className={styles.frame8}>
                  <ChildrenCanSuspend>
                    <QueryData query={query1(nextArticle2)}>
                      {(collection1, paginationInfo1, loadMore1) => {
                        return (
                          <>
                            {collection1?.map(
                              (
                                {
                                  category: categoryBlog,
                                  title: titleBlog,
                                  aspectRatio: aspectRatioBlog,
                                  id: blogIdBlog,
                                  thumbnail: thumbnailBlog,
                                  blogSlug: slugBlog,
                                }: any,
                                index1,
                              ) => {
                                slugBlog ??= "";
                                titleBlog ??= "";
                                categoryBlog ??= "";
                                return (
                                  <LayoutGroup id={`blog2-${blogIdBlog}`} key={blogIdBlog}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slugBlog }}>
                                      <Link href={`/blog-unused/${slugBlog}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.link3, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 150 + 1391.79 + 76 + 504,
                                              },
                                              Tablet: { y: viewportY + 150 + 1577.35 + 76 },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={484}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                              y={viewportY + 150 + 1497.35 + 76}
                                            >
                                              <Container className={styles.articleCard2}>
                                                <ArticleCard
                                                  title={titleBlog}
                                                  height="100%"
                                                  category={categoryBlog}
                                                  style={{ width: "100%" }}
                                                  variant={matchVariant(
                                                    convertFromEnum(aspectRatioBlog, activeLocale),
                                                  )}
                                                  width="100%"
                                                  image={toResponsiveImage(thumbnailBlog)}
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
                <div className={styles.frame9}>
                  <ChildrenCanSuspend>
                    <QueryData query={query2(nextArticle3)}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  category: category2,
                                  title: title2,
                                  aspectRatio: aspectRatio2,
                                  id: blogId2,
                                  thumbnail: thumbnail2,
                                  blogSlug: slug2,
                                }: any,
                                index2,
                              ) => {
                                slug2 ??= "";
                                title2 ??= "";
                                category2 ??= "";
                                return (
                                  <LayoutGroup id={`blog3-${blogId2}`} key={blogId2}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slug2 }}>
                                      <Link href={`/blog-unused/${slug2}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.link4, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 150 + 1391.79 + 76 + 1008,
                                              },
                                              Tablet: { y: viewportY + 150 + 1577.35 + 76 },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={484}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                              y={viewportY + 150 + 1497.35 + 76}
                                            >
                                              <Container className={styles.articleCard3}>
                                                <ArticleCard
                                                  title={title2}
                                                  height="100%"
                                                  category={category2}
                                                  style={{ width: "100%" }}
                                                  variant={matchVariant(
                                                    convertFromEnum(aspectRatio2, activeLocale),
                                                  )}
                                                  width="100%"
                                                  image={toResponsiveImage(thumbnail2)}
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

export default asPage(BlogItemPage);

BlogItemPage.displayName = "Page";

BlogItemPage.defaultProps = { height: 3825, width: 1200 };

BlogItemPage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const detailResultPromise = runWithYield(
      () =>
        queryCache
          .get(
            detailQuery(getWhereExpressionFromPathVariables(context.pathVariables, "blogItem")),
            locale,
            priority,
          )
          .readMaybeAsync(),
      context,
    );
    return runTasksWithYield(
      [
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          return runTasksWithYield(
            [
              () => queryCache.get(query(detailData?.["nextArticle1"]), locale, priority).preload(),
              () => queryCache.get(query1(detailData?.["nextArticle2"]), locale, priority).preload(),
              () => queryCache.get(query2(detailData?.["nextArticle3"]), locale, priority).preload(),
            ],
            context,
          );
        },
        () => forwardLoader(GlobalLineAnimationGlobal, {}, context),
        () => forwardLoader(ShareArticleButton, {}, context),
        () => forwardLoader(TextLink, {}, context),
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query(detailData?.["nextArticle1"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query1(detailData?.["nextArticle2"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query2(detailData?.["nextArticle3"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
      ],
      context,
    );
  },
};
