"use client";

import "@/styles/fonts/inter.css";
import styles from "./works-grid-view.module.css";
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
import UnderlineButton from "@/components/underline-button";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import * as body40 from "@/styles/text/body-40";

const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-works-grid-view-phone",
  Desktop: "hidden-desktop",
  Tablet: "hidden-works-grid-view-tablet",
};

const transition1 = { delay: 0.4, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
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
  transformPerspective: 1200,
  x: 0,
  y: 100,
};

const query = () => ({
  from: { alias: "works49", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 0 },
  select: [
    { collection: "works49", name: "title", type: "Identifier" },
    { collection: "works49", name: "subtitle", type: "Identifier" },
    { collection: "works49", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works49", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works49", name: "worksSlug", type: "Identifier" },
    { collection: "works49", name: "id", type: "Identifier" },
  ],
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const transition2 = { delay: 0.5, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

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

const query1 = () => ({
  from: { alias: "works50", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works50", name: "title", type: "Identifier" },
    { collection: "works50", name: "subtitle", type: "Identifier" },
    { collection: "works50", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works50", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works50", name: "worksSlug", type: "Identifier" },
    { collection: "works50", name: "id", type: "Identifier" },
  ],
});

const transition3 = { delay: 0.6, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation3 = {
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

const query2 = () => ({
  from: { alias: "works51", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 2 },
  select: [
    { collection: "works51", name: "title", type: "Identifier" },
    { collection: "works51", name: "subtitle", type: "Identifier" },
    { collection: "works51", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works51", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works51", name: "worksSlug", type: "Identifier" },
    { collection: "works51", name: "id", type: "Identifier" },
  ],
});

const transition4 = { delay: 0.7, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation4 = {
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

const query3 = () => ({
  from: { alias: "works52", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 3 },
  select: [
    { collection: "works52", name: "title", type: "Identifier" },
    { collection: "works52", name: "subtitle", type: "Identifier" },
    { collection: "works52", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works52", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works52", name: "worksSlug", type: "Identifier" },
    { collection: "works52", name: "id", type: "Identifier" },
  ],
});

const transition5 = { delay: 0.8, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation5 = {
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

const query4 = () => ({
  from: { alias: "works53", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 4 },
  select: [
    { collection: "works53", name: "title", type: "Identifier" },
    { collection: "works53", name: "subtitle", type: "Identifier" },
    { collection: "works53", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works53", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works53", name: "worksSlug", type: "Identifier" },
    { collection: "works53", name: "id", type: "Identifier" },
  ],
});

const transition6 = { delay: 0.9, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation6 = {
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
  from: { alias: "works54", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  offset: { type: "LiteralValue", value: 5 },
  select: [
    { collection: "works54", name: "title", type: "Identifier" },
    { collection: "works54", name: "subtitle", type: "Identifier" },
    { collection: "works54", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works54", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works54", name: "worksSlug", type: "Identifier" },
    { collection: "works54", name: "id", type: "Identifier" },
  ],
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

const WorksGridViewPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

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

  const componentScopeId = "crs7BF5yA";

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
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        All Projects (6)
                      </p>
                    </>
                  </RichText>
                  <PropertyOverrides breakpoint={baseVariant} overrides={{ Phone: { y: viewportY + 372 } }}>
                    <ComponentViewportProvider height={18}>
                      <Container className={styles.underlineButton}>
                        <PropertyOverrides
                          breakpoint={baseVariant}
                          overrides={{
                            Phone: { link: "/works/list-view" },
                            Tablet: { link: "/works/list-view" },
                          }}
                        >
                          <UnderlineButton
                            link="/works/list-view"
                            height="100%"
                            variant={matchVariant("Default")}
                            newTab={false}
                            width="100%"
                            label="List view"
                            color="rgb(0, 0, 0)"
                          />
                        </PropertyOverrides>
                      </Container>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                </div>
              </div>
            </section>
            <section className={styles.sectionProjects} data-name="Section Projects">
              <div className={styles.projectsRow} data-name="Projects Row">
                <div className={styles.frame}>
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
                      {(collection, paginationInfo, loadMore) => {
                        return (
                          <>
                            {collection?.map(
                              (
                                {
                                  subtitle,
                                  id: worksId,
                                  thumbnailVideoPortrait,
                                  title,
                                  worksSlug: slug,
                                  thumbnailPortrait,
                                }: any,
                                index,
                              ) => {
                                title ??= "";
                                subtitle ??= "";
                                slug ??= "";
                                return (
                                  <LayoutGroup id={`works49-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href="/halv" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 430,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation}
                                                className={styles.projectCard}
                                                data-appear-id={`tlqu1e-${index}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitle}
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
                                  subtitle: subtitleWorks,
                                  id: worksIdWorks,
                                  thumbnailVideoPortrait: thumbnailVideoPortraitWorks,
                                  title: titleWorks,
                                  worksSlug: slugWorks,
                                  thumbnailPortrait: thumbnailPortraitWorks,
                                }: any,
                                index1,
                              ) => {
                                titleWorks ??= "";
                                subtitleWorks ??= "";
                                slugWorks ??= "";
                                return (
                                  <LayoutGroup id={`works50-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/aether" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link3, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 900,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation2}
                                                className={styles.projectCard2}
                                                data-appear-id={`7wyv8o-${index1}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitleWorks}
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
                <div className={styles.frame3}>
                  <ChildrenCanSuspend>
                    <QueryData query={query2()}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  subtitle: subtitle2,
                                  id: worksId2,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait2,
                                  title: title2,
                                  worksSlug: slug2,
                                  thumbnailPortrait: thumbnailPortrait2,
                                }: any,
                                index2,
                              ) => {
                                title2 ??= "";
                                subtitle2 ??= "";
                                slug2 ??= "";
                                return (
                                  <LayoutGroup id={`works51-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link4, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 1370,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation3}
                                                className={styles.projectCard3}
                                                data-appear-id={`i0dk9u-${index2}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitle2}
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
              <div className={styles.projectsRow2} data-name="Projects Row 2">
                <div className={styles.frame4}>
                  <ChildrenCanSuspend>
                    <QueryData query={query3()}>
                      {(collection3, paginationInfo3, loadMore3) => {
                        return (
                          <>
                            {collection3?.map(
                              (
                                {
                                  subtitle: subtitle3,
                                  id: worksId3,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait3,
                                  title: title3,
                                  worksSlug: slug3,
                                  thumbnailPortrait: thumbnailPortrait3,
                                }: any,
                                index3,
                              ) => {
                                title3 ??= "";
                                subtitle3 ??= "";
                                slug3 ??= "";
                                return (
                                  <LayoutGroup id={`works52-${worksId3}`} key={worksId3}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug3 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link5, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 1840,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation4}
                                                className={styles.projectCard4}
                                                data-appear-id={`171c9u0-${index3}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitle3}
                                                  videoWide1
                                                  title={title3}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait3}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait3)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait3)}
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
                <div className={styles.frame5}>
                  <ChildrenCanSuspend>
                    <QueryData query={query4()}>
                      {(collection4, paginationInfo4, loadMore4) => {
                        return (
                          <>
                            {collection4?.map(
                              (
                                {
                                  subtitle: subtitle4,
                                  id: worksId4,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait4,
                                  title: title4,
                                  worksSlug: slug4,
                                  thumbnailPortrait: thumbnailPortrait4,
                                }: any,
                                index4,
                              ) => {
                                title4 ??= "";
                                subtitle4 ??= "";
                                slug4 ??= "";
                                return (
                                  <LayoutGroup id={`works53-${worksId4}`} key={worksId4}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug4 }}>
                                      <Link href="/creature" motionChild nodeId="link" openInNewTab={false}>
                                        <motion.a className={cx(styles.link6, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 2310,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation5}
                                                className={styles.projectCard5}
                                                data-appear-id={`1x978hb-${index4}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitle4}
                                                  videoWide1
                                                  title={title4}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait4}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait4)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait4)}
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
                <div className={styles.frame6}>
                  <ChildrenCanSuspend>
                    <QueryData query={query5()}>
                      {(collection5, paginationInfo5, loadMore5) => {
                        return (
                          <>
                            {collection5?.map(
                              (
                                {
                                  subtitle: subtitle5,
                                  id: worksId5,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait5,
                                  title: title5,
                                  worksSlug: slug5,
                                  thumbnailPortrait: thumbnailPortrait5,
                                }: any,
                                index5,
                              ) => {
                                title5 ??= "";
                                subtitle5 ??= "";
                                slug5 ??= "";
                                return (
                                  <LayoutGroup id={`works54-${worksId5}`} key={worksId5}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug5 }}>
                                      <Link
                                        href="/pelagostone"
                                        motionChild
                                        nodeId="link"
                                        openInNewTab={false}
                                      >
                                        <motion.a className={cx(styles.link7, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: {
                                                width: `max(${viewportWidth} - 40px, 1px)`,
                                                y: viewportY + 2780,
                                              },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <ContainerWithOptimizedAppearEffect
                                                animate={animation6}
                                                className={styles.projectCard6}
                                                data-appear-id={`7aduy5-${index5}`}
                                                initial={animation1}
                                                optimized
                                                rendersWithMotion
                                                style={{ transformPerspective: 1200 }}
                                              >
                                                <ProjectCard
                                                  subtitle={subtitle5}
                                                  videoWide1
                                                  title={title5}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait5}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait5)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait5)}
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
            </section>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(WorksGridViewPage);

WorksGridViewPage.displayName = "All Works";

WorksGridViewPage.defaultProps = { height: 1756, width: 1200 };

WorksGridViewPage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const queryCacheEntry = queryCache.get(query(), locale, priority);
    const queryCacheEntry1 = queryCache.get(query1(), locale, priority);
    const queryCacheEntry2 = queryCache.get(query2(), locale, priority);
    const queryCacheEntry3 = queryCache.get(query3(), locale, priority);
    const queryCacheEntry4 = queryCache.get(query4(), locale, priority);
    const queryCacheEntry5 = queryCache.get(query5(), locale, priority);
    return runTasksWithYield(
      [
        () => queryCacheEntry.preload(),
        () => queryCacheEntry1.preload(),
        () => queryCacheEntry2.preload(),
        () => queryCacheEntry3.preload(),
        () => queryCacheEntry4.preload(),
        () => queryCacheEntry5.preload(),
        () => forwardLoader(UnderlineButton, {}, context),
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
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry5.readMaybeAsync(), context)) ?? [];
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
