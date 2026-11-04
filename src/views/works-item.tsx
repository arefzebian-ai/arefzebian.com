"use client";

import "@/styles/fonts/inter.css";
import styles from "./works-item.module.css";
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
  getWhereExpressionFromPathVariables,
  HTMLStyle,
  Image as Image1,
  isSet,
  Link,
  matchVariant,
  NotFoundError,
  PathVariablesContext,
  PropertyOverrides,
  queryCache,
  ResolveLinks,
  RichText,
  runTasksWithYield,
  runWithYield,
  toImageSrc,
  toResponsiveImage,
  useComponentViewport,
  useCurrentPathVariables,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  useQueryData,
  useSiteRefs,
  withFonts,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";

import TextLink from "@/components/text-link";
import ProjectCard from "@/components/project-card";
import ContactButton from "@/components/contact-button";
import Works from "@/cms/works";
import * as body14 from "@/styles/text/body-14";
import * as body30 from "@/styles/text/body-30";
import * as h2 from "@/styles/text/h2";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body15 from "@/styles/text/body-15";

// Browser-only code: loaded after hydration, as on the published site.
const Video = clientOnly(() => import("@/vendor/video-2").then((m) => m.Video));

const Image1WithOptimizedAppearEffect = withOptimizedAppearEffect(Image1);
const VideoFonts = getFonts(Video);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-works-item-tablet",
  Phone: "hidden-works-item-phone",
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

const query = (nextProject1) => ({
  from: { alias: "works55", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works55", name: "worksSlug", type: "Identifier" },
    { collection: "works55", name: "title", type: "Identifier" },
    { collection: "works55", name: "category", type: "Identifier" },
    { collection: "works55", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works55", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works55", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works55", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextProject1 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = (nextProject2) => ({
  from: { alias: "works56", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works56", name: "worksSlug", type: "Identifier" },
    { collection: "works56", name: "title", type: "Identifier" },
    { collection: "works56", name: "category", type: "Identifier" },
    { collection: "works56", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works56", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works56", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works56", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextProject2 },
    type: "BinaryOperation",
  },
});

const query2 = (nextProject3) => ({
  from: { alias: "works57", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works57", name: "worksSlug", type: "Identifier" },
    { collection: "works57", name: "title", type: "Identifier" },
    { collection: "works57", name: "category", type: "Identifier" },
    { collection: "works57", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works57", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works57", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works57", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: nextProject3 },
    type: "BinaryOperation",
  },
});

const detailQuery = (where) => ({
  from: { alias: "worksItem", data: Works, type: "Collection" },
  select: [
    { collection: "worksItem", name: "title", type: "Identifier" },
    { collection: "worksItem", name: "subtitle", type: "Identifier" },
    { collection: "worksItem", name: "client", type: "Identifier" },
    { collection: "worksItem", name: "year", type: "Identifier" },
    { collection: "worksItem", name: "category", type: "Identifier" },
    { collection: "worksItem", name: "description", type: "Identifier" },
    { collection: "worksItem", name: "projectsLiveSite", type: "Identifier" },
    { collection: "worksItem", name: "imageHeader", type: "Identifier" },
    { collection: "worksItem", name: "image1", type: "Identifier" },
    { collection: "worksItem", name: "image2", type: "Identifier" },
    { collection: "worksItem", name: "video1", type: "Identifier" },
    { collection: "worksItem", name: "video1Poster", type: "Identifier" },
    { collection: "worksItem", name: "image3", type: "Identifier" },
    { collection: "worksItem", name: "image4", type: "Identifier" },
    { collection: "worksItem", name: "video2", type: "Identifier" },
    { collection: "worksItem", name: "video2Poster", type: "Identifier" },
    { collection: "worksItem", name: "image5", type: "Identifier" },
    { collection: "worksItem", name: "nextProject1", type: "Identifier" },
    { collection: "worksItem", name: "nextProject2", type: "Identifier" },
    { collection: "worksItem", name: "nextProject3", type: "Identifier" },
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
  N78BlVPND?: unknown;
  aJJ9h7Xco?: unknown;
  AdQKsUDlm?: unknown;
  yRsLFnglq?: unknown;
  LCRPqXxUJ?: unknown;
  JYRHm8PNO?: unknown;
  g46U63gN0?: unknown;
  a3spYSJHR?: unknown;
  jUt5NVyTP?: unknown;
  pW3MNFJ7D?: unknown;
  PJB6ymizw?: unknown;
  Gg8l4qhhg?: unknown;
  TErE3tTeX?: unknown;
  f_Sg4kgdw?: unknown;
  a__QrCl6g?: unknown;
  hnigq7Yu6?: unknown;
  CQgwAnXta?: unknown;
  kg3cYGlTU?: unknown;
  ZPVx2_9aZ?: unknown;
  bsvesamxD?: unknown;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const Component = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const currentPathVariables = useCurrentPathVariables();
  const [currentRouteData] = useQueryData(
    detailQuery(getWhereExpressionFromPathVariables(currentPathVariables, "worksItem")),
  );
  if (!currentRouteData)
    throw new NotFoundError(`No data matches path variables: ${JSON.stringify(currentPathVariables)}`);

  const {
    style,
    className,
    layoutId,
    variant,
    title = currentRouteData["title"] ?? "",
    subtitle = currentRouteData["subtitle"] ?? "",
    client = currentRouteData["client"] ?? "",
    year = currentRouteData["year"] ?? "",
    category = currentRouteData["category"] ?? "",
    description = currentRouteData["description"] ?? "",
    projectsLiveSite = currentRouteData["projectsLiveSite"] ?? "",
    imageHeader = currentRouteData["imageHeader"],
    image1 = currentRouteData["image1"],
    image2 = currentRouteData["image2"],
    video1 = currentRouteData["video1"],
    video1Poster = currentRouteData["video1Poster"],
    image3 = currentRouteData["image3"],
    image4 = currentRouteData["image4"],
    video2 = currentRouteData["video2"],
    video2Poster = currentRouteData["video2Poster"],
    image5 = currentRouteData["image5"],
    nextProject1 = currentRouteData["nextProject1"] ?? 0,
    nextProject2 = currentRouteData["nextProject2"] ?? 0,
    nextProject3 = currentRouteData["nextProject3"] ?? 0,
    ...restProps
  } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(
    styles.page,
    body30.className,
    body13Uppercase.className,
    body15.className,
    body14.className,
    h2.className,
  );

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const elementId = "trigger";

  const dynamicRef = useSiteRefs<HTMLDivElement>();

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
            <div
              className={styles.navVariantTrigger}
              data-name="Nav Variant Trigger"
              id={elementId}
              ref={dynamicRef(elementId)}
            />
            <div className={styles.sectionHeader} data-name="Section Header">
              <div className={styles.title} data-name="Title">
                <RichText
                  className={styles.redefiningHighPerformanceBikes}
                  data-name="Redefining high performance bikes for the next generation of athletes"
                  effect={textEffect}
                  fonts={["Inter"]}
                  text={subtitle}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p className="text-body-30" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                      Redefining high performance bikes
                    </p>
                    <p className="text-body-30" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                      for the next generation of athletes
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
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            className="text-body-13-uppercase"
                            style={{ "--df-text-color": "rgb(255, 255, 255)" }}
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
                        fonts={["Inter"]}
                        text={client}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-15" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                            North Inc.
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
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            className="text-body-13-uppercase"
                            style={{ "--df-text-color": "rgb(255, 255, 255)" }}
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
                        fonts={["Inter"]}
                        text={year}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-15" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                            2023
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
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p
                            className="text-body-13-uppercase"
                            style={{ "--df-text-color": "rgb(255, 255, 255)" }}
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
                        fonts={["Inter"]}
                        text={category}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-15" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
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
                    pixelHeight: 900,
                    pixelWidth: 1440,
                    sizes: viewportWidth,
                    ...toResponsiveImage(imageHeader),
                  }}
                  className={styles.sectionHeaderImage}
                  data-appear-id="1k6pbzq"
                  initial={animation3}
                  optimized
                />
              </PropertyOverrides>
            </div>
            <div className={styles.sectionDetails} data-name="Section Details">
              <div className={styles.sectionDetailsContainer} data-name="Container">
                <div className={styles.sectionDetailsFrame}>
                  <RichText
                    className={styles.projectDescription}
                    data-name="Project Description"
                    fonts={["Inter"]}
                    verticalAlignment="center"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-14">Project Description</p>
                    </>
                  </RichText>
                  <RichText
                    children={description}
                    className={styles.yagaIsAnIndependent}
                    data-name="YAGA is an independent music festival embracing queer and trans identities by connecting Brazilian and international subcultures under one roof. Founded upon the idea that two people on opposite sides of the world may share more in common than neighbors . Earning features by Art Forum, Billboard and Pitchfork, YAGA combined performances from some of the most influential and up-and-coming contemporary names both locally and globally, hosting a lineup that featured artists such as Sophie, Linn da Quebrada, Arca and Badsista, among others."
                    fonts={["Inter"]}
                    stylesPresetsClassNames={{ p: "text-body-14" }}
                    verticalAlignment="top"
                    withExternalLayout
                  />
                </div>
                <ResolveLinks
                  links={[
                    { href: projectsLiveSite, implicitPathVariables: undefined },
                    { href: projectsLiveSite, implicitPathVariables: undefined },
                    { href: projectsLiveSite, implicitPathVariables: undefined },
                  ]}
                >
                  {(resolvedLinks) => (
                    <ComponentViewportProvider height={15}>
                      <Container className={styles.contactButton}>
                        <PropertyOverrides
                          breakpoint={baseVariant}
                          overrides={{
                            Tablet: { link: resolvedLinks[1] },
                            Phone: { link: resolvedLinks[2] },
                          }}
                        >
                          <ContactButton
                            label="View live site"
                            link={resolvedLinks[0]}
                            height="100%"
                            variant={matchVariant("Variant 1")}
                            width="100%"
                            color="rgb(0, 0, 0)"
                          />
                        </PropertyOverrides>
                      </Container>
                    </ComponentViewportProvider>
                  )}
                </ResolveLinks>
              </div>
            </div>
            <div className={styles.sectionContent} data-name="Section Content">
              <div className={styles.imageWide} data-name="Image Wide">
                <Image1
                  background={{
                    alt: "Here comes the alt text",
                    fit: "fill",
                    pixelHeight: 5071,
                    pixelWidth: 7606,
                    sizes: `max(${viewportWidth} - 40px, 1px)`,
                    ...toResponsiveImage(image1),
                  }}
                  className={styles.image}
                />
              </div>
              <div className={styles.mediaPortraits} data-name="Media Portraits">
                <div className={styles.mediaPortraitsImageWrapper} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "Here comes the alt text",
                          fit: "fill",
                          pixelHeight: 6842,
                          pixelWidth: 5131,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          ...toResponsiveImage(image2),
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "Here comes the alt text",
                        fit: "fill",
                        pixelHeight: 6842,
                        pixelWidth: 5131,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        ...toResponsiveImage(image2),
                      }}
                      className={styles.image2}
                    />
                  </PropertyOverrides>
                </div>
                <div className={styles.mediaPortraitsVideoWrapper} data-name="Video Wrapper">
                  <ComponentViewportProvider>
                    <Container
                      className={styles.video}
                      isAuthoredByUser
                      isModuleExternal
                      nodeId="VideoModule"
                      scopeId="WorksItemPage"
                    >
                      <Video
                        backgroundColor="rgba(0, 0, 0, 0)"
                        borderRadius={0}
                        bottomLeftRadius={0}
                        bottomRightRadius={0}
                        controls={false}
                        height="100%"
                        id="VideoModule"
                        isMixedBorderRadius={false}
                        loop
                        muted
                        objectFit="cover"
                        playing
                        poster={toImageSrc(video1Poster)}
                        posterEnabled
                        srcFile={video1}
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
              </div>
              <div className={styles.imageWide2} data-name="Image Wide">
                <Image1
                  background={{
                    alt: "Here comes the alt text",
                    fit: "fill",
                    pixelHeight: 1124,
                    pixelWidth: 2000,
                    sizes: `max(${viewportWidth} - 40px, 1px)`,
                    ...toResponsiveImage(image3),
                  }}
                  className={styles.image3}
                />
              </div>
              <div className={styles.mediaSquare} data-name="Media Square">
                <div className={styles.mediaSquareImageWrapper} data-name="Image Wrapper">
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{
                      Phone: {
                        background: {
                          alt: "Here comes the alt text",
                          fit: "fill",
                          pixelHeight: 2000,
                          pixelWidth: 2000,
                          sizes: `calc(${viewportWidth} - 40px)`,
                          ...toResponsiveImage(image4),
                        },
                      },
                    }}
                  >
                    <Image1
                      background={{
                        alt: "Here comes the alt text",
                        fit: "fill",
                        pixelHeight: 2000,
                        pixelWidth: 2000,
                        sizes: `max((${viewportWidth} - 60px) / 2, 1px)`,
                        ...toResponsiveImage(image4),
                      }}
                      className={styles.image4}
                    />
                  </PropertyOverrides>
                </div>
                <div className={styles.mediaSquareVideoWrapper} data-name="Video Wrapper">
                  <ComponentViewportProvider>
                    <Container
                      className={styles.video2}
                      isAuthoredByUser
                      isModuleExternal
                      nodeId="VideoModule"
                      scopeId="WorksItemPage"
                    >
                      <Video
                        backgroundColor="rgba(0, 0, 0, 0)"
                        borderRadius={0}
                        bottomLeftRadius={0}
                        bottomRightRadius={0}
                        controls={false}
                        height="100%"
                        id="VideoModule2"
                        isMixedBorderRadius={false}
                        loop
                        muted
                        objectFit="cover"
                        playing
                        poster={toImageSrc(video2Poster)}
                        posterEnabled
                        srcFile={video2}
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
              </div>
              <div className={styles.imageWide3} data-name="Image Wide">
                <Image1
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 1124,
                    pixelWidth: 2000,
                    sizes: `max(${viewportWidth} - 40px, 1px)`,
                    ...toResponsiveImage(image5),
                  }}
                  className={styles.image5}
                />
              </div>
            </div>
            <div className={styles.sectionMoreProjects} data-name="Section more Projects">
              <div className={styles.heading} data-name="Heading">
                <RichText
                  className={styles.text}
                  fonts={["Inter"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2 className="text-h2">More Projects</h2>
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
              <div className={styles.sectionMoreContainer} data-name="Container">
                <div className={styles.frame11}>
                  <ChildrenCanSuspend>
                    <QueryData query={query(nextProject1)}>
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
                                  <LayoutGroup id={`works55-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href={`/works/grid-view/${slug}`} motionChild nodeId="link">
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
                    <QueryData query={query1(nextProject2)}>
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
                                  <LayoutGroup id={`works56-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href={`/works/grid-view/${slugWorks}`} motionChild nodeId="link">
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
                    <QueryData query={query2(nextProject3)}>
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
                                  <LayoutGroup id={`works57-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href={`/works/grid-view/${slug2}`} motionChild nodeId="link">
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

const WorksItemPage = withFonts(Component) as typeof Component;
export default asPage(WorksItemPage);

WorksItemPage.displayName = "Works";

WorksItemPage.defaultProps = { height: 5723, width: 1200 };

addFonts(WorksItemPage, [...VideoFonts], { supportsExplicitInterCodegen: true });

WorksItemPage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const detailResultPromise = runWithYield(
      () =>
        queryCache
          .get(
            detailQuery(getWhereExpressionFromPathVariables(context.pathVariables, "worksItem")),
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
              () => queryCache.get(query(detailData?.["nextProject1"]), locale, priority).preload(),
              () => queryCache.get(query1(detailData?.["nextProject2"]), locale, priority).preload(),
              () => queryCache.get(query2(detailData?.["nextProject3"]), locale, priority).preload(),
            ],
            context,
          );
        },
        () => forwardLoader(ContactButton, {}, context),
        () => forwardLoader(TextLink, {}, context),
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query(detailData?.["nextProject1"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query1(detailData?.["nextProject2"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const [detailData] = (await detailResultPromise) ?? [];
          const parentData =
            (await runWithYield(
              () => queryCache.get(query2(detailData?.["nextProject3"]), locale, priority).readMaybeAsync(),
              context,
            )) ?? [];
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
