"use client";

import "@/styles/fonts/inter.css";
import styles from "./works-list-view.module.css";
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
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  useQueryData,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import UnderlineButton from "@/components/underline-button";
import ImageCursorListView from "@/components/image-cursor-list-view";
import ProjectsListRow from "@/components/projects-list-row";
import Works, { worksCount } from "@/cms/works";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";

import { polishedEase } from "@/lib/motion";
const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-works-list-view-phone",
  Desktop: "hidden-desktop",
  Tablet: "hidden-works-list-view-tablet",
};

const transition1 = { delay: 0.2, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const transition2 = { delay: 0.25, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const transition3 = { delay: 0.3, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const transition4 = { delay: 0.35, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const transition5 = { delay: 0.4, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const animation6 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 30,
};

const query = () => ({
  from: { alias: "works58", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 0 },
  select: [
    { collection: "works58", name: "title", type: "Identifier" },
    { collection: "works58", name: "sector", type: "Identifier" },
    { collection: "works58", name: "year", type: "Identifier" },
    { collection: "works58", name: "client", type: "Identifier" },
    { collection: "works58", name: "worksSlug", type: "Identifier" },
    { collection: "works58", name: "id", type: "Identifier" },
  ],
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const transition6 = { delay: 0.5, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation7 = {
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

const query1 = () => ({
  from: { alias: "works59", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works59", name: "title", type: "Identifier" },
    { collection: "works59", name: "sector", type: "Identifier" },
    { collection: "works59", name: "year", type: "Identifier" },
    { collection: "works59", name: "client", type: "Identifier" },
    { collection: "works59", name: "worksSlug", type: "Identifier" },
    { collection: "works59", name: "id", type: "Identifier" },
  ],
});

const transition7 = { delay: 0.6, duration: 1, ease: polishedEase, type: "tween" } as const;

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

const query2 = () => ({
  from: { alias: "works60", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [
    { collection: "works60", name: "title", type: "Identifier" },
    { collection: "works60", name: "sector", type: "Identifier" },
    { collection: "works60", name: "year", type: "Identifier" },
    { collection: "works60", name: "client", type: "Identifier" },
    { collection: "works60", name: "worksSlug", type: "Identifier" },
    { collection: "works60", name: "id", type: "Identifier" },
  ],
});

const transition8 = { delay: 0.7, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation9 = {
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

const query3 = () => ({
  from: { alias: "works61", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 3 },
  select: [
    { collection: "works61", name: "title", type: "Identifier" },
    { collection: "works61", name: "sector", type: "Identifier" },
    { collection: "works61", name: "year", type: "Identifier" },
    { collection: "works61", name: "client", type: "Identifier" },
    { collection: "works61", name: "worksSlug", type: "Identifier" },
    { collection: "works61", name: "id", type: "Identifier" },
  ],
});

const transition9 = { delay: 0.8, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation10 = {
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

const query4 = () => ({
  from: { alias: "works62", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 4 },
  select: [
    { collection: "works62", name: "title", type: "Identifier" },
    { collection: "works62", name: "sector", type: "Identifier" },
    { collection: "works62", name: "year", type: "Identifier" },
    { collection: "works62", name: "client", type: "Identifier" },
    { collection: "works62", name: "worksSlug", type: "Identifier" },
    { collection: "works62", name: "id", type: "Identifier" },
  ],
});

const transition10 = { delay: 0.9, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation11 = {
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

const query5 = () => ({
  from: { alias: "works63", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 5 },
  select: [
    { collection: "works63", name: "title", type: "Identifier" },
    { collection: "works63", name: "sector", type: "Identifier" },
    { collection: "works63", name: "year", type: "Identifier" },
    { collection: "works63", name: "client", type: "Identifier" },
    { collection: "works63", name: "worksSlug", type: "Identifier" },
    { collection: "works63", name: "id", type: "Identifier" },
  ],
});

const transition11 = { delay: 1, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation12 = {
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

const query6 = () => ({
  from: { alias: "works64", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 6 },
  select: [
    { collection: "works64", name: "worksSlug", type: "Identifier" },
    { collection: "works64", name: "title", type: "Identifier" },
    { collection: "works64", name: "sector", type: "Identifier" },
    { collection: "works64", name: "year", type: "Identifier" },
    { collection: "works64", name: "client", type: "Identifier" },
    { collection: "works64", name: "id", type: "Identifier" },
  ],
});

const transition12 = { delay: 1.1, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation13 = {
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

const query7 = () => ({
  from: { alias: "works65", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 7 },
  select: [
    { collection: "works65", name: "worksSlug", type: "Identifier" },
    { collection: "works65", name: "title", type: "Identifier" },
    { collection: "works65", name: "sector", type: "Identifier" },
    { collection: "works65", name: "year", type: "Identifier" },
    { collection: "works65", name: "client", type: "Identifier" },
    { collection: "works65", name: "id", type: "Identifier" },
  ],
});

const transition13 = { delay: 1.2, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation14 = {
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

const query8 = () => ({
  from: { alias: "works66", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 8 },
  select: [
    { collection: "works66", name: "worksSlug", type: "Identifier" },
    { collection: "works66", name: "title", type: "Identifier" },
    { collection: "works66", name: "sector", type: "Identifier" },
    { collection: "works66", name: "year", type: "Identifier" },
    { collection: "works66", name: "client", type: "Identifier" },
    { collection: "works66", name: "id", type: "Identifier" },
  ],
});

const transition14 = { delay: 1.3, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation15 = {
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

const query9 = () => ({
  from: { alias: "works67", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 9 },
  select: [
    { collection: "works67", name: "worksSlug", type: "Identifier" },
    { collection: "works67", name: "title", type: "Identifier" },
    { collection: "works67", name: "sector", type: "Identifier" },
    { collection: "works67", name: "year", type: "Identifier" },
    { collection: "works67", name: "client", type: "Identifier" },
    { collection: "works67", name: "id", type: "Identifier" },
  ],
});

const transition15 = { delay: 1.4, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation16 = {
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

const query10 = () => ({
  from: { alias: "works68", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 10 },
  select: [
    { collection: "works68", name: "worksSlug", type: "Identifier" },
    { collection: "works68", name: "title", type: "Identifier" },
    { collection: "works68", name: "sector", type: "Identifier" },
    { collection: "works68", name: "year", type: "Identifier" },
    { collection: "works68", name: "client", type: "Identifier" },
    { collection: "works68", name: "id", type: "Identifier" },
  ],
});

const transition16 = { delay: 1.5, duration: 1, ease: polishedEase, type: "tween" } as const;

const animation17 = {
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

const query11 = () => ({
  from: { alias: "works69", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 11 },
  select: [
    { collection: "works69", name: "worksSlug", type: "Identifier" },
    { collection: "works69", name: "title", type: "Identifier" },
    { collection: "works69", name: "sector", type: "Identifier" },
    { collection: "works69", name: "year", type: "Identifier" },
    { collection: "works69", name: "client", type: "Identifier" },
    { collection: "works69", name: "id", type: "Identifier" },
  ],
});

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Desktop",
});

const cursor = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "EckK1gZJx",
} as const;

const cursor1 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "bFGp9JOqK",
} as const;

const cursor2 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "dJzArKBF6",
} as const;

const cursor3 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "R6a0dZtzp",
} as const;

const cursor4 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "jnIuY2KAb",
} as const;

const cursor5 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "zvrrPQ1kq",
} as const;

const cursor6 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "DDLhiiMol",
} as const;

const cursor7 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "xdqssMj8N",
} as const;

const cursor8 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "zqpSuOnQM",
} as const;

const cursor9 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "ugwyBxOT2",
} as const;

const cursor10 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "PYNNlXGNY",
} as const;

const cursor11 = {
  alignment: "start",
  component: ImageCursorListView,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "x5PRKGeBA",
} as const;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Desktop" | "Phone" | "Tablet";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const WorksListViewPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body40.className, body13Uppercase.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const isDisplayed = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Phone") return false;
    return true;
  };

  const componentScopeId = "TSeLRL3x2";

  useCustomCursors({
    "10dykt": cursor7,
    "15mcos8": cursor5,
    "172rah6": cursor2,
    "18goolb": cursor3,
    "1a9wgw7": cursor11,
    "1bn4fi2": cursor,
    "1hgnnf3": cursor6,
    "1jitljs": cursor8,
    "1nvv01v": cursor1,
    cnsdga: cursor4,
    csaqqo: cursor10,
    zexnde: cursor9,
  });

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
            <section className={styles.sectionHeader} data-name="Section Header">
              <div className={styles.sectionHeader2} data-name="Section Header">
                <div className={styles.titleWrapper} data-name="Title Wrapper">
                  <RichText
                    className={styles.allProjects8}
                    data-name="All Projects (8)"
                    fonts={["Inter"]}
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        All Projects ({worksCount})
                      </p>
                    </>
                  </RichText>
                  <ComponentViewportProvider height={18}>
                    <Container className={styles.underlineButton}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{
                          Phone: { link: "/works/grid-view" },
                          Tablet: { link: "/works/grid-view" },
                        }}
                      >
                        <UnderlineButton
                          link="/works/grid-view"
                          height="100%"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="Grid view"
                          color="rgb(0, 0, 0)"
                        />
                      </PropertyOverrides>
                    </Container>
                  </ComponentViewportProvider>
                </div>
              </div>
            </section>
            <div className={styles.sectionProjects} data-name="Section Projects">
              <div className={styles.frame}>
                <RichTextWithOptimizedAppearEffect
                  animate={animation}
                  className={styles.client}
                  data-appear-id="kcc4fx"
                  data-name="Client"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-13-uppercase">Project</p>
                  </>
                </RichTextWithOptimizedAppearEffect>
                {isDisplayed() && (
                  <RichTextWithOptimizedAppearEffect
                    animate={animation2}
                    className={cx(styles.project, "hidden-works-list-view-phone")}
                    data-appear-id="1nj0ilw"
                    data-name="Project"
                    fonts={["Inter"]}
                    initial={animation1}
                    optimized
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-13-uppercase">Client</p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                )}
                <RichTextWithOptimizedAppearEffect
                  animate={animation3}
                  className={styles.industry}
                  data-appear-id="npb5tm"
                  data-name="Industry"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-13-uppercase">Industry</p>
                  </>
                </RichTextWithOptimizedAppearEffect>
                <RichTextWithOptimizedAppearEffect
                  animate={animation4}
                  className={styles.year}
                  data-appear-id="1cn2st"
                  data-name="Year"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-13-uppercase" style={{ "--df-text-alignment": "right" }}>
                      Year
                    </p>
                  </>
                </RichTextWithOptimizedAppearEffect>
              </div>
              <div className={styles.projects} data-name="Projects">
                <div className={styles.project1} data-name="Project 1">
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
                      {(collection, paginationInfo, loadMore) => {
                        return (
                          <>
                            {collection?.map(
                              ({ client, id: worksId, title, worksSlug: slug, sector, year }: any, index) => {
                                title ??= "";
                                sector ??= "";
                                year ??= "";
                                client ??= "";
                                slug ??= "";
                                return (
                                  <LayoutGroup id={`works58-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href="/halv" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation5}
                                                className={styles.project1ListRow}
                                                data-appear-id={`zm5yeb-${index}`}
                                                data-cursor="1bn4fi2"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector}
                                                    title={title}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year}
                                                    width="100%"
                                                    client={client}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project2} data-name="Project 2">
                  <ChildrenCanSuspend>
                    <QueryData query={query1()}>
                      {(collection1, paginationInfo1, loadMore1) => {
                        return (
                          <>
                            {collection1?.map(
                              (
                                {
                                  client: clientWorks,
                                  id: worksIdWorks,
                                  title: titleWorks,
                                  worksSlug: slugWorks,
                                  sector: sectorWorks,
                                  year: yearWorks,
                                }: any,
                                index1,
                              ) => {
                                titleWorks ??= "";
                                sectorWorks ??= "";
                                yearWorks ??= "";
                                clientWorks ??= "";
                                slugWorks ??= "";
                                return (
                                  <LayoutGroup id={`works59-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/aether" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.project2Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation7}
                                                className={styles.project2ListRow}
                                                data-appear-id={`1m5ig9b-${index1}`}
                                                data-cursor="1nvv01v"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sectorWorks}
                                                    title={titleWorks}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={yearWorks}
                                                    width="100%"
                                                    client={clientWorks}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project3} data-name="Project 3">
                  <ChildrenCanSuspend>
                    <QueryData query={query2()}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  client: client2,
                                  id: worksId2,
                                  title: title2,
                                  worksSlug: slug2,
                                  sector: sector2,
                                  year: year2,
                                }: any,
                                index2,
                              ) => {
                                title2 ??= "";
                                sector2 ??= "";
                                year2 ??= "";
                                client2 ??= "";
                                slug2 ??= "";
                                return (
                                  <LayoutGroup id={`works60-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href="/revimo" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.project3Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation8}
                                                className={styles.project3ListRow}
                                                data-appear-id={`ix6ngx-${index2}`}
                                                data-cursor="172rah6"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector2}
                                                    title={title2}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year2}
                                                    width="100%"
                                                    client={client2}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project4} data-name="Project 4">
                  <ChildrenCanSuspend>
                    <QueryData query={query3()}>
                      {(collection3, paginationInfo3, loadMore3) => {
                        return (
                          <>
                            {collection3?.map(
                              (
                                {
                                  client: client3,
                                  id: worksId3,
                                  title: title3,
                                  worksSlug: slug3,
                                  sector: sector3,
                                  year: year3,
                                }: any,
                                index3,
                              ) => {
                                title3 ??= "";
                                sector3 ??= "";
                                year3 ??= "";
                                client3 ??= "";
                                slug3 ??= "";
                                return (
                                  <LayoutGroup id={`works61-${worksId3}`} key={worksId3}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug3 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.project4Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation9}
                                                className={styles.project4ListRow}
                                                data-appear-id={`1vgg2o4-${index3}`}
                                                data-cursor="18goolb"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector3}
                                                    title={title3}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year3}
                                                    width="100%"
                                                    client={client3}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project5} data-name="Project 5">
                  <ChildrenCanSuspend>
                    <QueryData query={query4()}>
                      {(collection4, paginationInfo4, loadMore4) => {
                        return (
                          <>
                            {collection4?.map(
                              (
                                {
                                  client: client4,
                                  id: worksId4,
                                  title: title4,
                                  worksSlug: slug4,
                                  sector: sector4,
                                  year: year4,
                                }: any,
                                index4,
                              ) => {
                                title4 ??= "";
                                sector4 ??= "";
                                year4 ??= "";
                                client4 ??= "";
                                slug4 ??= "";
                                return (
                                  <LayoutGroup id={`works62-${worksId4}`} key={worksId4}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug4 }}>
                                      <Link href="/creature" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.project5Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation10}
                                                className={styles.project5ListRow}
                                                data-appear-id={`194ahhd-${index4}`}
                                                data-cursor="cnsdga"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector4}
                                                    title={title4}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year4}
                                                    width="100%"
                                                    client={client4}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project6} data-name="Project 6">
                  <ChildrenCanSuspend>
                    <QueryData query={query5()}>
                      {(collection5, paginationInfo5, loadMore5) => {
                        return (
                          <>
                            {collection5?.map(
                              (
                                {
                                  client: client5,
                                  id: worksId5,
                                  title: title5,
                                  worksSlug: slug5,
                                  sector: sector5,
                                  year: year5,
                                }: any,
                                index5,
                              ) => {
                                title5 ??= "";
                                sector5 ??= "";
                                year5 ??= "";
                                client5 ??= "";
                                slug5 ??= "";
                                return (
                                  <LayoutGroup id={`works63-${worksId5}`} key={worksId5}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug5 }}>
                                      <Link
                                        href="/pelagostone"
                                        motionChild
                                        nodeId="link"
                                        openInNewTab={false}
                                      >
                                        <motion.a className={cx(styles.project6Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation11}
                                                className={styles.project6ListRow}
                                                data-appear-id={`14wdy38-${index5}`}
                                                data-cursor="15mcos8"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector5}
                                                    title={title5}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year5}
                                                    width="100%"
                                                    client={client5}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project7} data-name="Project 7">
                  <ChildrenCanSuspend>
                    <QueryData query={query6()}>
                      {(collection6, paginationInfo6, loadMore6) => {
                        return (
                          <>
                            {collection6?.map(
                              (
                                {
                                  client: client6,
                                  id: worksId6,
                                  title: title6,
                                  worksSlug: slug6,
                                  sector: sector6,
                                  year: year6,
                                }: any,
                                index6,
                              ) => {
                                slug6 ??= "";
                                title6 ??= "";
                                sector6 ??= "";
                                year6 ??= "";
                                client6 ??= "";
                                return (
                                  <LayoutGroup id={`works64-${worksId6}`} key={worksId6}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug6 }}>
                                      <Link href={`/works/grid-view/${slug6}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project7Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation12}
                                                className={styles.project7ListRow}
                                                data-appear-id={`pjwwj6-${index6}`}
                                                data-cursor="1hgnnf3"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector6}
                                                    title={title6}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year6}
                                                    width="100%"
                                                    client={client6}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project8} data-name="Project 8">
                  <ChildrenCanSuspend>
                    <QueryData query={query7()}>
                      {(collection7, paginationInfo7, loadMore7) => {
                        return (
                          <>
                            {collection7?.map(
                              (
                                {
                                  client: client7,
                                  id: worksId7,
                                  title: title7,
                                  worksSlug: slug7,
                                  sector: sector7,
                                  year: year7,
                                }: any,
                                index7,
                              ) => {
                                slug7 ??= "";
                                title7 ??= "";
                                sector7 ??= "";
                                year7 ??= "";
                                client7 ??= "";
                                return (
                                  <LayoutGroup id={`works65-${worksId7}`} key={worksId7}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug7 }}>
                                      <Link href={`/works/grid-view/${slug7}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project8Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation13}
                                                className={styles.project8ListRow}
                                                data-appear-id={`1pxt5f-${index7}`}
                                                data-cursor="10dykt"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector7}
                                                    title={title7}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year7}
                                                    width="100%"
                                                    client={client7}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project9} data-name="Project 9">
                  <ChildrenCanSuspend>
                    <QueryData query={query8()}>
                      {(collection8, paginationInfo8, loadMore8) => {
                        return (
                          <>
                            {collection8?.map(
                              (
                                {
                                  client: client8,
                                  id: worksId8,
                                  title: title8,
                                  worksSlug: slug8,
                                  sector: sector8,
                                  year: year8,
                                }: any,
                                index8,
                              ) => {
                                slug8 ??= "";
                                title8 ??= "";
                                sector8 ??= "";
                                year8 ??= "";
                                client8 ??= "";
                                return (
                                  <LayoutGroup id={`works66-${worksId8}`} key={worksId8}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug8 }}>
                                      <Link href={`/works/grid-view/${slug8}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project9Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation14}
                                                className={styles.project9ListRow}
                                                data-appear-id={`1t1s1zh-${index8}`}
                                                data-cursor="1jitljs"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector8}
                                                    title={title8}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year8}
                                                    width="100%"
                                                    client={client8}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project10} data-name="Project 10">
                  <ChildrenCanSuspend>
                    <QueryData query={query9()}>
                      {(collection9, paginationInfo9, loadMore9) => {
                        return (
                          <>
                            {collection9?.map(
                              (
                                {
                                  client: client9,
                                  id: worksId9,
                                  title: title9,
                                  worksSlug: slug9,
                                  sector: sector9,
                                  year: year9,
                                }: any,
                                index9,
                              ) => {
                                slug9 ??= "";
                                title9 ??= "";
                                sector9 ??= "";
                                year9 ??= "";
                                client9 ??= "";
                                return (
                                  <LayoutGroup id={`works67-${worksId9}`} key={worksId9}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug9 }}>
                                      <Link href={`/works/grid-view/${slug9}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project10Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation15}
                                                className={styles.project10ListRow}
                                                data-appear-id={`yl48o7-${index9}`}
                                                data-cursor="zexnde"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector9}
                                                    title={title9}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year9}
                                                    width="100%"
                                                    client={client9}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project11} data-name="Project 11">
                  <ChildrenCanSuspend>
                    <QueryData query={query10()}>
                      {(collection10, paginationInfo10, loadMore10) => {
                        return (
                          <>
                            {collection10?.map(
                              (
                                {
                                  client: client10,
                                  id: worksId10,
                                  title: title10,
                                  worksSlug: slug10,
                                  sector: sector10,
                                  year: year10,
                                }: any,
                                index10,
                              ) => {
                                slug10 ??= "";
                                title10 ??= "";
                                sector10 ??= "";
                                year10 ??= "";
                                client10 ??= "";
                                return (
                                  <LayoutGroup id={`works68-${worksId10}`} key={worksId10}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug10 }}>
                                      <Link href={`/works/grid-view/${slug10}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project11Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation16}
                                                className={styles.project11ListRow}
                                                data-appear-id={`dqrntr-${index10}`}
                                                data-cursor="csaqqo"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector10}
                                                    title={title10}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year10}
                                                    width="100%"
                                                    client={client10}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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
                <div className={styles.project12} data-name="Project 12">
                  <ChildrenCanSuspend>
                    <QueryData query={query11()}>
                      {(collection11, paginationInfo11, loadMore11) => {
                        return (
                          <>
                            {collection11?.map(
                              (
                                {
                                  client: client11,
                                  id: worksId11,
                                  title: title11,
                                  worksSlug: slug11,
                                  sector: sector11,
                                  year: year11,
                                }: any,
                                index11,
                              ) => {
                                slug11 ??= "";
                                title11 ??= "";
                                sector11 ??= "";
                                year11 ??= "";
                                client11 ??= "";
                                return (
                                  <LayoutGroup id={`works69-${worksId11}`} key={worksId11}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug11 }}>
                                      <Link href={`/works/grid-view/${slug11}`} motionChild nodeId="link">
                                        <motion.a className={cx(styles.project12Link, styles.link2)}>
                                          <ComponentViewportProvider
                                            height={27}
                                            width={`calc(${viewportWidth} - 40px)`}
                                          >
                                            <PropertyOverrides
                                              breakpoint={baseVariant}
                                              overrides={{ Phone: { "data-cursor": undefined } }}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation17}
                                                className={styles.project12ListRow}
                                                data-appear-id={`c8srnm-${index11}`}
                                                data-cursor="1a9wgw7"
                                                initial={animation6}
                                                optimized
                                                rendersWithMotion
                                              >
                                                <PropertyOverrides
                                                  breakpoint={baseVariant}
                                                  overrides={{
                                                    Phone: { variant: matchVariant("List View - Mobile") },
                                                  }}
                                                >
                                                  <ProjectsListRow
                                                    height="100%"
                                                    sector={sector11}
                                                    title={title11}
                                                    style={{ width: "100%" }}
                                                    variant={matchVariant("List View - Desktop")}
                                                    year={year11}
                                                    width="100%"
                                                    client={client11}
                                                  />
                                                </PropertyOverrides>
                                              </ContainerWithOptimizedAppearEffect>
                                            </PropertyOverrides>
                                          </ComponentViewportProvider>
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

export default asPage(WorksListViewPage);

WorksListViewPage.displayName = "Works";

WorksListViewPage.defaultProps = { height: 1275, width: 1200 };

WorksListViewPage.loader = {
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
        () => forwardLoader(UnderlineButton, {}, context),
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry1.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry2.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry3.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry4.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry5.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry6.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry7.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry8.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry9.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry10.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry11.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectsListRow, {}, context)),
            context,
          );
        },
      ],
      context,
    );
  },
};
