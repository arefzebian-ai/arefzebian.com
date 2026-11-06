"use client";

import "@/styles/fonts/inter.css";
import styles from "./blog-unused.module.css";
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
  inBrowser,
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
  useLocaleInfo,
  useQueryData,
  withOptimizedAppearEffect,
  withVariantAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import GlobalLineAnimationGlobal from "@/components/global/line-animation-global";
import ArticleCard from "@/components/article-card";
import Blog from "@/cms/blog";
import * as body40 from "@/styles/text/body-40";

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const GlobalLineAnimationGlobalWithVariantAppearEffect = withVariantAppearEffect(GlobalLineAnimationGlobal);
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-blog-unused-tablet",
  Phone: "hidden-blog-unused-phone",
  Desktop: "hidden-desktop",
};

const transition1 = { delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 50,
};

const transition2 = { delay: 0.4, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation2 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition2,
  x: 0,
  y: 0,
} as const;

const animation3 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  x: 0,
  y: 60,
};

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

const query = () => ({
  from: { alias: "blog4", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 0 },
  select: [
    { collection: "blog4", name: "blogSlug", type: "Identifier" },
    { collection: "blog4", name: "aspectRatio", type: "Identifier" },
    { collection: "blog4", name: "thumbnail", type: "Identifier" },
    { collection: "blog4", name: "title", type: "Identifier" },
    { collection: "blog4", name: "category", type: "Identifier" },
    { collection: "blog4", name: "id", type: "Identifier" },
  ],
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const transition3 = { delay: 0.5, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation4 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition3,
  x: 0,
  y: 0,
} as const;

const query1 = () => ({
  from: { alias: "blog5", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "blog5", name: "blogSlug", type: "Identifier" },
    { collection: "blog5", name: "aspectRatio", type: "Identifier" },
    { collection: "blog5", name: "thumbnail", type: "Identifier" },
    { collection: "blog5", name: "title", type: "Identifier" },
    { collection: "blog5", name: "category", type: "Identifier" },
    { collection: "blog5", name: "id", type: "Identifier" },
  ],
});

const transition4 = { delay: 0.6, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation5 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition4,
  x: 0,
  y: 0,
} as const;

const query2 = () => ({
  from: { alias: "blog6", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [
    { collection: "blog6", name: "blogSlug", type: "Identifier" },
    { collection: "blog6", name: "aspectRatio", type: "Identifier" },
    { collection: "blog6", name: "thumbnail", type: "Identifier" },
    { collection: "blog6", name: "title", type: "Identifier" },
    { collection: "blog6", name: "category", type: "Identifier" },
    { collection: "blog6", name: "id", type: "Identifier" },
  ],
});

const transition5 = { delay: 0.7, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation6 = {
  opacity: 1,
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

const query3 = () => ({
  from: { alias: "blog7", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 3 },
  select: [
    { collection: "blog7", name: "blogSlug", type: "Identifier" },
    { collection: "blog7", name: "aspectRatio", type: "Identifier" },
    { collection: "blog7", name: "thumbnail", type: "Identifier" },
    { collection: "blog7", name: "title", type: "Identifier" },
    { collection: "blog7", name: "category", type: "Identifier" },
    { collection: "blog7", name: "id", type: "Identifier" },
  ],
});

const query4 = () => ({
  from: { alias: "blog7", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [
    { collection: "blog7", name: "blogSlug", type: "Identifier" },
    { collection: "blog7", name: "aspectRatio", type: "Identifier" },
    { collection: "blog7", name: "thumbnail", type: "Identifier" },
    { collection: "blog7", name: "title", type: "Identifier" },
    { collection: "blog7", name: "category", type: "Identifier" },
    { collection: "blog7", name: "id", type: "Identifier" },
  ],
});

const transition6 = { delay: 0.8, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation7 = {
  opacity: 1,
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

const query5 = () => ({
  from: { alias: "blog8", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 4 },
  select: [
    { collection: "blog8", name: "blogSlug", type: "Identifier" },
    { collection: "blog8", name: "aspectRatio", type: "Identifier" },
    { collection: "blog8", name: "thumbnail", type: "Identifier" },
    { collection: "blog8", name: "title", type: "Identifier" },
    { collection: "blog8", name: "category", type: "Identifier" },
    { collection: "blog8", name: "id", type: "Identifier" },
  ],
});

const query6 = () => ({
  from: { alias: "blog8", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 3 },
  select: [
    { collection: "blog8", name: "blogSlug", type: "Identifier" },
    { collection: "blog8", name: "aspectRatio", type: "Identifier" },
    { collection: "blog8", name: "thumbnail", type: "Identifier" },
    { collection: "blog8", name: "title", type: "Identifier" },
    { collection: "blog8", name: "category", type: "Identifier" },
    { collection: "blog8", name: "id", type: "Identifier" },
  ],
});

const transition7 = { delay: 0.9, duration: 1.5, ease: [0.25, 1, 0.5, 1], type: "tween" } as const;

const animation8 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition7,
  x: 0,
  y: 0,
} as const;

const query7 = () => ({
  from: { alias: "blog9", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 5 },
  select: [
    { collection: "blog9", name: "blogSlug", type: "Identifier" },
    { collection: "blog9", name: "aspectRatio", type: "Identifier" },
    { collection: "blog9", name: "thumbnail", type: "Identifier" },
    { collection: "blog9", name: "title", type: "Identifier" },
    { collection: "blog9", name: "category", type: "Identifier" },
    { collection: "blog9", name: "id", type: "Identifier" },
  ],
});

const query8 = () => ({
  from: { alias: "blog10", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 6 },
  select: [
    { collection: "blog10", name: "blogSlug", type: "Identifier" },
    { collection: "blog10", name: "aspectRatio", type: "Identifier" },
    { collection: "blog10", name: "thumbnail", type: "Identifier" },
    { collection: "blog10", name: "title", type: "Identifier" },
    { collection: "blog10", name: "category", type: "Identifier" },
    { collection: "blog10", name: "id", type: "Identifier" },
  ],
});

const query9 = () => ({
  from: { alias: "blog10", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 4 },
  select: [
    { collection: "blog10", name: "blogSlug", type: "Identifier" },
    { collection: "blog10", name: "aspectRatio", type: "Identifier" },
    { collection: "blog10", name: "thumbnail", type: "Identifier" },
    { collection: "blog10", name: "title", type: "Identifier" },
    { collection: "blog10", name: "category", type: "Identifier" },
    { collection: "blog10", name: "id", type: "Identifier" },
  ],
});

const query10 = () => ({
  from: { alias: "blog11", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 7 },
  select: [
    { collection: "blog11", name: "blogSlug", type: "Identifier" },
    { collection: "blog11", name: "aspectRatio", type: "Identifier" },
    { collection: "blog11", name: "thumbnail", type: "Identifier" },
    { collection: "blog11", name: "title", type: "Identifier" },
    { collection: "blog11", name: "category", type: "Identifier" },
    { collection: "blog11", name: "id", type: "Identifier" },
  ],
});

const query11 = () => ({
  from: { alias: "blog11", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 5 },
  select: [
    { collection: "blog11", name: "blogSlug", type: "Identifier" },
    { collection: "blog11", name: "aspectRatio", type: "Identifier" },
    { collection: "blog11", name: "thumbnail", type: "Identifier" },
    { collection: "blog11", name: "title", type: "Identifier" },
    { collection: "blog11", name: "category", type: "Identifier" },
    { collection: "blog11", name: "id", type: "Identifier" },
  ],
});

const query12 = () => ({
  from: { alias: "blog12", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 8 },
  select: [
    { collection: "blog12", name: "blogSlug", type: "Identifier" },
    { collection: "blog12", name: "aspectRatio", type: "Identifier" },
    { collection: "blog12", name: "thumbnail", type: "Identifier" },
    { collection: "blog12", name: "title", type: "Identifier" },
    { collection: "blog12", name: "category", type: "Identifier" },
    { collection: "blog12", name: "id", type: "Identifier" },
  ],
});

const query13 = () => ({
  from: { alias: "blog13", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 6 },
  select: [
    { collection: "blog13", name: "blogSlug", type: "Identifier" },
    { collection: "blog13", name: "aspectRatio", type: "Identifier" },
    { collection: "blog13", name: "thumbnail", type: "Identifier" },
    { collection: "blog13", name: "title", type: "Identifier" },
    { collection: "blog13", name: "category", type: "Identifier" },
    { collection: "blog13", name: "id", type: "Identifier" },
  ],
});

const query14 = () => ({
  from: { alias: "blog14", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 7 },
  select: [
    { collection: "blog14", name: "blogSlug", type: "Identifier" },
    { collection: "blog14", name: "aspectRatio", type: "Identifier" },
    { collection: "blog14", name: "thumbnail", type: "Identifier" },
    { collection: "blog14", name: "title", type: "Identifier" },
    { collection: "blog14", name: "category", type: "Identifier" },
    { collection: "blog14", name: "id", type: "Identifier" },
  ],
});

const query15 = () => ({
  from: { alias: "blog15", data: Blog, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 8 },
  select: [
    { collection: "blog15", name: "blogSlug", type: "Identifier" },
    { collection: "blog15", name: "aspectRatio", type: "Identifier" },
    { collection: "blog15", name: "thumbnail", type: "Identifier" },
    { collection: "blog15", name: "title", type: "Identifier" },
    { collection: "blog15", name: "category", type: "Identifier" },
    { collection: "blog15", name: "id", type: "Identifier" },
  ],
});

const animation10 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  x: 0,
  y: 50,
};

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

const BlogUnusedPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { activeLocale } = useLocaleInfo();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body40.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const isDisplayed = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Tablet") return false;
    return true;
  };

  const isDisplayed1 = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Tablet") return true;
    return false;
  };

  const componentScopeId = "RIiRMRkFB";

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
            <div className={styles.sectionBlogIntro} data-name="Section Blog Intro">
              <div className={styles.container} data-name="Container">
                <RichTextWithOptimizedAppearEffect
                  animate={animation}
                  className={styles.journal}
                  data-appear-id="16e2gct"
                  data-name="Journal"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-40" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                      Journal
                    </p>
                  </>
                </RichTextWithOptimizedAppearEffect>
              </div>
            </div>
            <section className={styles.sectionArticles} data-name="Section Articles">
              <ComponentViewportProvider
                height={1}
                width={`calc(${viewportWidth} - 40px)`}
                y={viewportY + 238}
              >
                <Container className={styles.globalLineAnimationGlobal} rendersWithMotion>
                  <GlobalLineAnimationGlobalWithVariantAppearEffect
                    __fx_animateOnce
                    __fx_obscuredVariantId="Line Animation"
                    __fx_threshold={0.5}
                    __fx_variantAppearEffectEnabled
                    __fx_visibleVariantId="Line Animation Active"
                    height="100%"
                    colour="rgba(0, 0, 0, 0.1)"
                    style={{ height: "100%", width: "100%" }}
                    variant={matchVariant("Line Animation Active")}
                    width="100%"
                  />
                </Container>
              </ComponentViewportProvider>
              <div className={styles.articleRow} data-name="Article Row">
                <div className={styles.frame}>
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
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
                                  <LayoutGroup id={`blog4-${blogId}`} key={blogId}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slug }}>
                                      <Link href={`/blog-unused/${slug}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                              Phone: { width: `max(${viewportWidth} - 40px, 1px)` },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={484}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                              y={viewportY + 279}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation2}
                                                className={styles.articleCard}
                                                data-appear-id={`1gr7w0-${index}`}
                                                initial={animation3}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
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
                                              </ContainerWithOptimizedAppearEffect>
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
                                  <LayoutGroup id={`blog5-${blogIdBlog}`} key={blogIdBlog}>
                                    <PathVariablesContext.Provider value={{ blogSlug: slugBlog }}>
                                      <Link href={`/blog-unused/${slugBlog}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.link3, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 803,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={484}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                              y={viewportY + 279}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation4}
                                                className={styles.articleCard2}
                                                data-appear-id={`j0fhd9-${index1}`}
                                                initial={animation3}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
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
                                              </ContainerWithOptimizedAppearEffect>
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
                {isDisplayed() && (
                  <div className={cx(styles.frame3, "hidden-blog-unused-tablet")}>
                    <ChildrenCanSuspend>
                      <QueryData query={query2()}>
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
                                    <LayoutGroup id={`blog6-${blogId2}`} key={blogId2}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug2 }}>
                                        <Link href={`/blog-unused/${slug2}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link4, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 1327,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 279}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation5}
                                                  className={styles.articleCard3}
                                                  data-appear-id={`1mopp3z-${index2}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
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
                                                </ContainerWithOptimizedAppearEffect>
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
                )}
              </div>
              <div className={styles.articleRow2} data-name="Article Row">
                <div className={styles.frame4}>
                  <ChildrenCanSuspend>
                    <PropertyOverrides breakpoint={baseVariant} overrides={{ Tablet: { query: query4() } }}>
                      <QueryData query={query3()}>
                        {(collection3, paginationInfo3, loadMore3) => {
                          return (
                            <>
                              {collection3?.map(
                                (
                                  {
                                    category: category3,
                                    title: title3,
                                    aspectRatio: aspectRatio3,
                                    id: blogId3,
                                    thumbnail: thumbnail3,
                                    blogSlug: slug3,
                                  }: any,
                                  index3,
                                ) => {
                                  slug3 ??= "";
                                  title3 ??= "";
                                  category3 ??= "";
                                  return (
                                    <LayoutGroup id={`blog7-${blogId3}`} key={blogId3}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug3 }}>
                                        <Link href={`/blog-unused/${slug3}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link5, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 1851,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 803}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation6}
                                                  className={styles.articleCard4}
                                                  data-appear-id={`1uz2f5h-${index3}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title3}
                                                    height="100%"
                                                    category={category3}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio3, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail3)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                    </PropertyOverrides>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame5}>
                  <ChildrenCanSuspend>
                    <PropertyOverrides breakpoint={baseVariant} overrides={{ Tablet: { query: query6() } }}>
                      <QueryData query={query5()}>
                        {(collection4, paginationInfo4, loadMore4) => {
                          return (
                            <>
                              {collection4?.map(
                                (
                                  {
                                    category: category4,
                                    title: title4,
                                    aspectRatio: aspectRatio4,
                                    id: blogId4,
                                    thumbnail: thumbnail4,
                                    blogSlug: slug4,
                                  }: any,
                                  index4,
                                ) => {
                                  slug4 ??= "";
                                  title4 ??= "";
                                  category4 ??= "";
                                  return (
                                    <LayoutGroup id={`blog8-${blogId4}`} key={blogId4}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug4 }}>
                                        <Link href={`/blog-unused/${slug4}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link6, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 2375,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 803}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation7}
                                                  className={styles.articleCard5}
                                                  data-appear-id={`11vy9a0-${index4}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title4}
                                                    height="100%"
                                                    category={category4}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio4, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail4)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                    </PropertyOverrides>
                  </ChildrenCanSuspend>
                </div>
                {isDisplayed() && (
                  <div className={cx(styles.frame6, "hidden-blog-unused-tablet")}>
                    <ChildrenCanSuspend>
                      <QueryData query={query7()}>
                        {(collection5, paginationInfo5, loadMore5) => {
                          return (
                            <>
                              {collection5?.map(
                                (
                                  {
                                    category: category5,
                                    title: title5,
                                    aspectRatio: aspectRatio5,
                                    id: blogId5,
                                    thumbnail: thumbnail5,
                                    blogSlug: slug5,
                                  }: any,
                                  index5,
                                ) => {
                                  slug5 ??= "";
                                  title5 ??= "";
                                  category5 ??= "";
                                  return (
                                    <LayoutGroup id={`blog9-${blogId5}`} key={blogId5}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug5 }}>
                                        <Link href={`/blog-unused/${slug5}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link7, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 2899,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 803}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation8}
                                                  className={styles.articleCard6}
                                                  data-appear-id={`zs8rgl-${index5}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title5}
                                                    height="100%"
                                                    category={category5}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio5, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail5)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                )}
              </div>
              <div className={styles.articleRow3} data-name="Article Row">
                <div className={styles.frame7}>
                  <ChildrenCanSuspend>
                    <PropertyOverrides breakpoint={baseVariant} overrides={{ Tablet: { query: query9() } }}>
                      <QueryData query={query8()}>
                        {(collection6, paginationInfo6, loadMore6) => {
                          return (
                            <>
                              {collection6?.map(
                                (
                                  {
                                    category: category6,
                                    title: title6,
                                    aspectRatio: aspectRatio6,
                                    id: blogId6,
                                    thumbnail: thumbnail6,
                                    blogSlug: slug6,
                                  }: any,
                                  index6,
                                ) => {
                                  slug6 ??= "";
                                  title6 ??= "";
                                  category6 ??= "";
                                  return (
                                    <LayoutGroup id={`blog10-${blogId6}`} key={blogId6}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug6 }}>
                                        <Link href={`/blog-unused/${slug6}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link8, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 3423,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 1327}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation6}
                                                  className={styles.articleCard7}
                                                  data-appear-id={`1y7wxos-${index6}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title6}
                                                    height="100%"
                                                    category={category6}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio6, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail6)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                    </PropertyOverrides>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame8}>
                  <ChildrenCanSuspend>
                    <PropertyOverrides breakpoint={baseVariant} overrides={{ Tablet: { query: query11() } }}>
                      <QueryData query={query10()}>
                        {(collection7, paginationInfo7, loadMore7) => {
                          return (
                            <>
                              {collection7?.map(
                                (
                                  {
                                    category: category7,
                                    title: title7,
                                    aspectRatio: aspectRatio7,
                                    id: blogId7,
                                    thumbnail: thumbnail7,
                                    blogSlug: slug7,
                                  }: any,
                                  index7,
                                ) => {
                                  slug7 ??= "";
                                  title7 ??= "";
                                  category7 ??= "";
                                  return (
                                    <LayoutGroup id={`blog11-${blogId7}`} key={blogId7}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug7 }}>
                                        <Link href={`/blog-unused/${slug7}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link9, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: { width: `max((${viewportWidth} - 60px) / 2, 1px)` },
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 3947,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 1327}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation7}
                                                  className={styles.articleCard8}
                                                  data-appear-id={`cj6jnv-${index7}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title7}
                                                    height="100%"
                                                    category={category7}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio7, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail7)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                    </PropertyOverrides>
                  </ChildrenCanSuspend>
                </div>
                {isDisplayed() && (
                  <div className={cx(styles.frame9, "hidden-blog-unused-tablet")}>
                    <ChildrenCanSuspend>
                      <QueryData query={query12()}>
                        {(collection8, paginationInfo8, loadMore8) => {
                          return (
                            <>
                              {collection8?.map(
                                (
                                  {
                                    category: category8,
                                    title: title8,
                                    aspectRatio: aspectRatio8,
                                    id: blogId8,
                                    thumbnail: thumbnail8,
                                    blogSlug: slug8,
                                  }: any,
                                  index8,
                                ) => {
                                  slug8 ??= "";
                                  title8 ??= "";
                                  category8 ??= "";
                                  return (
                                    <LayoutGroup id={`blog12-${blogId8}`} key={blogId8}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug8 }}>
                                        <Link href={`/blog-unused/${slug8}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link10, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Phone: {
                                                  width: `max(${viewportWidth} - 40px, 1px)`,
                                                  y: viewportY + 4471,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider
                                                height={484}
                                                width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                                y={viewportY + 1327}
                                              >
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation8}
                                                  className={styles.articleCard9}
                                                  data-appear-id={`1k4u460-${index8}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title8}
                                                    height="100%"
                                                    category={category8}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio8, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail8)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                )}
              </div>
              {isDisplayed1() && (
                <div
                  className={cx(styles.articleRowMobile, "hidden-desktop", "hidden-blog-unused-phone")}
                  data-name="Article Row - Mobile"
                >
                  <div className={styles.frame10}>
                    <ChildrenCanSuspend>
                      <QueryData query={query13()}>
                        {(collection9, paginationInfo9, loadMore9) => {
                          return (
                            <>
                              {collection9?.map(
                                (
                                  {
                                    category: category9,
                                    title: title9,
                                    aspectRatio: aspectRatio9,
                                    id: blogId9,
                                    thumbnail: thumbnail9,
                                    blogSlug: slug9,
                                  }: any,
                                  index9,
                                ) => {
                                  slug9 ??= "";
                                  title9 ??= "";
                                  category9 ??= "";
                                  return (
                                    <LayoutGroup id={`blog13-${blogId9}`} key={blogId9}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug9 }}>
                                        <Link href={`/blog-unused/${slug9}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link11, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: {
                                                  width: `max((${viewportWidth} - 60px) / 2, 1px)`,
                                                  y: viewportY + 1851,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider height={484}>
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation6}
                                                  className={styles.articleCard10}
                                                  data-appear-id={`1pp0zdw-${index9}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title9}
                                                    height="100%"
                                                    category={category9}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio9, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail9)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                  <div className={styles.frame11}>
                    <ChildrenCanSuspend>
                      <QueryData query={query14()}>
                        {(collection10, paginationInfo10, loadMore10) => {
                          return (
                            <>
                              {collection10?.map(
                                (
                                  {
                                    category: category10,
                                    title: title10,
                                    aspectRatio: aspectRatio10,
                                    id: blogId10,
                                    thumbnail: thumbnail10,
                                    blogSlug: slug10,
                                  }: any,
                                  index10,
                                ) => {
                                  slug10 ??= "";
                                  title10 ??= "";
                                  category10 ??= "";
                                  return (
                                    <LayoutGroup id={`blog14-${blogId10}`} key={blogId10}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug10 }}>
                                        <Link href={`/blog-unused/${slug10}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link12, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: {
                                                  width: `max((${viewportWidth} - 60px) / 2, 1px)`,
                                                  y: viewportY + 1851,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider height={484}>
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation6}
                                                  className={styles.articleCard11}
                                                  data-appear-id={`w2xg8-${index10}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title10}
                                                    height="100%"
                                                    category={category10}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio10, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail10)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
              )}
              {isDisplayed1() && (
                <div
                  className={cx(styles.articleRowMobile2, "hidden-desktop", "hidden-blog-unused-phone")}
                  data-name="Article Row - Mobile"
                >
                  <div className={styles.frame12}>
                    <ChildrenCanSuspend>
                      <QueryData query={query15()}>
                        {(collection11, paginationInfo11, loadMore11) => {
                          return (
                            <>
                              {collection11?.map(
                                (
                                  {
                                    category: category11,
                                    title: title11,
                                    aspectRatio: aspectRatio11,
                                    id: blogId11,
                                    thumbnail: thumbnail11,
                                    blogSlug: slug11,
                                  }: any,
                                  index11,
                                ) => {
                                  slug11 ??= "";
                                  title11 ??= "";
                                  category11 ??= "";
                                  return (
                                    <LayoutGroup id={`blog15-${blogId11}`} key={blogId11}>
                                      <PathVariablesContext.Provider value={{ blogSlug: slug11 }}>
                                        <Link href={`/blog-unused/${slug11}`} motionChild nodeId="link">
                                          <motion.a className={cx(styles.link13, styles.link2)}>
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{
                                                Tablet: {
                                                  width: `max((${viewportWidth} - 60px) / 2, 1px)`,
                                                  y: viewportY + 2375,
                                                },
                                              }}
                                            >
                                              <ComponentViewportProvider height={484}>
                                                <ContainerWithOptimizedAppearEffect
                                                  animate={animation6}
                                                  className={styles.articleCard12}
                                                  data-appear-id={`166fl2q-${index11}`}
                                                  initial={animation3}
                                                  optimized
                                                  rendersWithMotion
                                                  style={{ transformPerspective: 1200 }}
                                                >
                                                  <ArticleCard
                                                    title={title11}
                                                    height="100%"
                                                    category={category11}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant(
                                                      convertFromEnum(aspectRatio11, activeLocale),
                                                    )}
                                                    width="100%"
                                                    image={toResponsiveImage(thumbnail11)}
                                                  />
                                                </ContainerWithOptimizedAppearEffect>
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
                  <div className={styles.spacer} data-name="Spacer" />
                </div>
              )}
            </section>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(BlogUnusedPage);

BlogUnusedPage.displayName = "Blog";

BlogUnusedPage.defaultProps = { height: 2408, width: 1200 };

BlogUnusedPage.loader = {
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
    const queryCacheEntry7 = queryCache.get(query7(), locale, priority);
    const queryCacheEntry8 = queryCache.get(query8(), locale, priority);
    const queryCacheEntry9 = queryCache.get(query9(), locale, priority);
    const queryCacheEntry10 = queryCache.get(query10(), locale, priority);
    const queryCacheEntry11 = queryCache.get(query11(), locale, priority);
    const queryCacheEntry12 = queryCache.get(query12(), locale, priority);
    const queryCacheEntry13 = queryCache.get(query13(), locale, priority);
    const queryCacheEntry14 = queryCache.get(query14(), locale, priority);
    const queryCacheEntry15 = queryCache.get(query15(), locale, priority);
    return runTasksWithYield(
      [
        () => queryCacheEntry.preload(),
        () => queryCacheEntry1.preload(),
        () => queryCacheEntry2.preload(),
        () => queryCacheEntry3.preload(),
        () => queryCacheEntry4.preload(),
        () => queryCacheEntry5.preload(),
        () => queryCacheEntry6.preload(),
        () => queryCacheEntry7.preload(),
        () => queryCacheEntry8.preload(),
        () => queryCacheEntry9.preload(),
        () => queryCacheEntry10.preload(),
        () => queryCacheEntry11.preload(),
        () => queryCacheEntry12.preload(),
        () => queryCacheEntry13.preload(),
        () => queryCacheEntry14.preload(),
        () => queryCacheEntry15.preload(),
        () => forwardLoader(GlobalLineAnimationGlobal, {}, context),
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry1.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry2.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry3.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry5.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry7.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry8.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry10.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry12.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry13.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry14.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ArticleCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry15.readMaybeAsync(), context)) ?? [];
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
