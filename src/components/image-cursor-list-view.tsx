"use client";

import styles from "./image-cursor-list-view.module.css";
import {
  addFonts,
  addPropertyOverrides,
  ChildrenCanSuspend,
  clientOnly,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  getFonts,
  getLoadingLazyAtYPosition,
  Image,
  isSet,
  Link,
  PathVariablesContext,
  SmartComponentScopedContainer,
  toImageSrc,
  toResponsiveImage,
  useComponentViewport,
  useFallbackRef,
  useQueryData,
  useVariantState,
  VariantScope,
  withFonts,
} from "@/deframer";
import { LayoutGroup, motion } from "motion/react";
import * as React from "react";

import Works from "@/cms/works";

// Browser-only code: loaded after hydration, as on the published site.
const Video = clientOnly(() => import("@/vendor/video-2").then((m) => m.Video));

const VideoFonts = getFonts(Video);

const cycleOrder = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
  "Project 6",
  "Project 7",
  "Project 8",
  "Project 9",
  "Project 10",
  "Project 11",
  "Project 12",
];

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const humanReadableVariantMap = {
  "Project 1": "Project 1",
  "Project 10": "Project 10",
  "Project 11": "Project 11",
  "Project 12": "Project 12",
  "Project 2": "Project 2",
  "Project 3": "Project 3",
  "Project 4": "Project 4",
  "Project 5": "Project 5",
  "Project 6": "Project 6",
  "Project 7": "Project 7",
  "Project 8": "Project 8",
  "Project 9": "Project 9",
  /* ids used elsewhere */ EckK1gZJx: "Project 1",
  ugwyBxOT2: "Project 10",
  PYNNlXGNY: "Project 11",
  x5PRKGeBA: "Project 12",
  bFGp9JOqK: "Project 2",
  dJzArKBF6: "Project 3",
  R6a0dZtzp: "Project 4",
  jnIuY2KAb: "Project 5",
  zvrrPQ1kq: "Project 6",
  DDLhiiMol: "Project 7",
  xdqssMj8N: "Project 8",
  zqpSuOnQM: "Project 9",
};

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "Project 1",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: keyof typeof humanReadableVariantMap;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const Component = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportY = componentViewport?.y || 0;

  const {
    style,
    className,
    layoutId,
    variant,
    slug,
    thumbnailPortrait,
    thumbnailVideoPortrait,
    thumbnailVideoPortaitPoster,
    idc3IXLDDDR: worksId,
    ...restProps
  } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Project 1",
    ref: refBinding,
    variant,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.imageCursorListView, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Project 1"
        ref={refBinding}
        style={style}
      >
        <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
          <ChildrenCanSuspend>
            <QueryData
              query={{
                from: { alias: "works", data: Works, type: "Collection" },
                limit: { type: "LiteralValue", value: 1 },
                offset: { type: "LiteralValue", value: 0 },
                select: [
                  { collection: "works", name: "worksSlug", type: "Identifier" },
                  { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                  { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                  { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                  { collection: "works", name: "id", type: "Identifier" },
                ],
              }}
              {...addPropertyOverrides(
                {
                  "Project 2": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 1 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 7": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 6 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 3": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 2 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 5": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 4 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 11": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 10 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 4": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 3 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 10": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 9 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 12": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 11 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 8": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 7 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 9": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 8 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                  "Project 6": {
                    query: {
                      from: { alias: "works", data: Works, type: "Collection" },
                      limit: { type: "LiteralValue", value: 1 },
                      offset: { type: "LiteralValue", value: 5 },
                      select: [
                        { collection: "works", name: "worksSlug", type: "Identifier" },
                        { collection: "works", name: "thumbnailPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortrait", type: "Identifier" },
                        { collection: "works", name: "thumbnailVideoPortaitPoster", type: "Identifier" },
                        { collection: "works", name: "id", type: "Identifier" },
                      ],
                    },
                  },
                },
                baseVariant,
                gestureVariant,
              )}
            >
              {(collection, paginationInfo, loadMore) => (
                <>
                  {collection?.map(
                    (
                      {
                        id: worksId,
                        thumbnailVideoPortrait,
                        thumbnailVideoPortaitPoster,
                        worksSlug: slug,
                        thumbnailPortrait,
                      }: any,
                      index,
                    ) => {
                      slug ??= "";
                      const visible = isSet(thumbnailPortrait);
                      const visible1 = isSet(thumbnailVideoPortrait);
                      return (
                        <LayoutGroup id={`works-${worksId}`} key={worksId}>
                          <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                            <Link href={`/works/grid-view/${slug}`} motionChild nodeId="link">
                              <motion.a
                                className={cx(styles.link, styles.link2)}
                                layoutDependency={layoutDependency}
                                layoutId="layer 2"
                              >
                                {visible && (
                                  <Image
                                    background={{
                                      alt: "",
                                      fit: "fill",
                                      loading: getLoadingLazyAtYPosition(
                                        viewportY + ((componentViewport?.height || 210) - 210) / 2,
                                      ),
                                      sizes: "Infinitypx",
                                      ...toResponsiveImage(thumbnailPortrait),
                                    }}
                                    className={styles.image}
                                    layoutDependency={layoutDependency}
                                    layoutId="image"
                                    {...addPropertyOverrides(
                                      {
                                        "Project 7": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 5": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 11": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 4": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 10": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 12": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 8": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 9": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                        "Project 6": {
                                          background: {
                                            alt: "",
                                            fit: "fill",
                                            loading: getLoadingLazyAtYPosition(
                                              viewportY + ((componentViewport?.height || 200) - 210) / 2,
                                            ),
                                            sizes: "Infinitypx",
                                            ...toResponsiveImage(thumbnailPortrait),
                                          },
                                        },
                                      },
                                      baseVariant,
                                      gestureVariant,
                                    )}
                                  />
                                )}
                                {visible1 && (
                                  <ComponentViewportProvider>
                                    <SmartComponentScopedContainer
                                      className={styles.video}
                                      isAuthoredByUser
                                      isModuleExternal
                                      layoutDependency={layoutDependency}
                                      layoutId="VideoModule container"
                                      nodeId="VideoModule"
                                      rendersWithMotion
                                      scopeId="ImageCursorListView"
                                    >
                                      <Video
                                        backgroundColor="rgba(0, 0, 0, 0)"
                                        borderRadius={0}
                                        bottomLeftRadius={0}
                                        bottomRightRadius={0}
                                        controls={false}
                                        height="100%"
                                        id="VideoModule4"
                                        isMixedBorderRadius={false}
                                        layoutId="VideoModule4"
                                        loop
                                        muted
                                        objectFit="cover"
                                        playing
                                        poster={toImageSrc(thumbnailVideoPortaitPoster)}
                                        posterEnabled
                                        srcFile={thumbnailVideoPortrait}
                                        srcType="Upload"
                                        srcUrl="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4"
                                        startTime={0}
                                        style={{ height: "100%", width: "100%" }}
                                        topLeftRadius={0}
                                        topRightRadius={0}
                                        volume={25}
                                        width="100%"
                                      />
                                    </SmartComponentScopedContainer>
                                  </ComponentViewportProvider>
                                )}
                              </motion.a>
                            </Link>
                          </PathVariablesContext.Provider>
                        </LayoutGroup>
                      );
                    },
                  )}
                </>
              )}
            </QueryData>
          </ChildrenCanSuspend>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

const ImageCursorListView = withFonts(Component) as typeof Component;
export default ImageCursorListView;

ImageCursorListView.displayName = "Image Cursor - List View";

ImageCursorListView.defaultProps = { height: 210, width: 168 };

addFonts(ImageCursorListView, [...VideoFonts], { supportsExplicitInterCodegen: true });
