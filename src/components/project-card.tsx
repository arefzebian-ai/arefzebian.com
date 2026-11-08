"use client";

import "@/styles/fonts/inter.css";
import styles from "./project-card.module.css";
import {
  addFonts,
  addPropertyOverrides,
  clientOnly,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  getFonts,
  getLoadingLazyAtYPosition,
  Image,
  isSet,
  RichText,
  SmartComponentScopedContainer,
  toImageSrc,
  toResponsiveImage,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
  withFonts,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

import * as body14 from "@/styles/text/body-14";

// Browser-only code: loaded after hydration, as on the published site.
const Video = clientOnly(() => import("@/vendor/video-2").then((m) => m.Video));

const VideoFonts = getFonts(Video);

const cycleOrder = [
  "Project Card - Portrait",
  "Project Card - Wide 2",
  "Project Card - Square",
  "Project Card - Portrait - Hover",
  "Project Card - Square - Hover",
  "Project Card - Wide",
  "Project Card - Portrait - Tablet / Mobile",
  "Project Card - Wide - Tablet/Mobile",
  "Project Card - Square - Tablet/Mobile",
];

const variantClassNames = {
  "Project Card - Square - Tablet/Mobile": styles.projectCardSquareTablet,
  "Project Card - Wide 2": styles.projectCardWide2,
  "Project Card - Wide - Tablet/Mobile": styles.projectCardWideTablet,
  "Project Card - Square - Hover": styles.projectCardSquareHover,
  "Project Card - Wide": styles.projectCardWide,
  "Project Card - Square": styles.projectCardSquare,
};

const transition1 = { delay: 0, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const getProps = ({
  height,
  id,
  subtitle,
  title,
  videoPortrait1,
  videoSquare1,
  videoWide1,
  width,
  ...props
}: any) => ({
  ...props,
  subtitle: subtitle ?? "Subtitle",
  videoWide1: videoWide1 ?? true,
  title: title ?? "Project Name",
  videoSquare1: videoSquare1 ?? true,
  variant: props.variant ?? "Project Card - Portrait",
  videoPortrait1: videoPortrait1 ?? true,
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?:
    | "Project Card - Portrait"
    | "Project Card - Wide 2"
    | "Project Card - Square"
    | "Project Card - Portrait - Hover"
    | "Project Card - Square - Hover"
    | "Project Card - Wide"
    | "Project Card - Portrait - Tablet / Mobile"
    | "Project Card - Wide - Tablet/Mobile"
    | "Project Card - Square - Tablet/Mobile";
  title?: string;
  subtitle?: string;
  thumbnailPortrait?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  thumbnailWide?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  thumbnailSquare?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  videoPortrait?: string;
  videoWide?: string;
  videoSquare?: string;
  videoPortrait1?: boolean;
  videoPortraitPoster?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  videoWide1?: boolean;
  videoWidePoster?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  videoSquare1?: boolean;
  videoSquarePoster?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const Component = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const {
    style,
    className,
    layoutId,
    variant,
    title,
    subtitle,
    thumbnailPortrait,
    thumbnailWide,
    thumbnailSquare,
    videoPortrait,
    videoWide,
    videoSquare,
    videoPortrait1,
    videoPortraitPoster,
    videoWide1,
    videoWidePoster,
    videoSquare1,
    videoSquarePoster,
    ...restProps
  } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({
      cycleOrder,
      defaultVariant: "Project Card - Portrait",
      ref: refBinding,
      variant,
      variantClassNames,
    });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterProjectCardPortrait = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Project Card - Portrait - Hover");
  });

  const onMouseEnterProjectCardWide = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Project Card - Wide");
  });

  const onMouseEnterProjectCardSquare = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Project Card - Square - Hover");
  });

  const onMouseLeaveProjectCardPortraitHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Project Card - Portrait");
  });

  const onMouseLeaveProjectCardSquareHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Project Card - Square");
  });

  const onMouseLeaveProjectCardWide = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Project Card - Wide 2");
  });

  const scopingClassNames = cx(styles.projectCard, body14.className);

  const visible = isSet(thumbnailPortrait);

  const visible1 = isSet(thumbnailWide);

  const visible2 = isSet(thumbnailSquare);

  const isDisplayed = (value, value1, value2) => {
    if (baseVariant === "Project Card - Wide 2") return value1;
    if (baseVariant === "Project Card - Square") return value2;
    return value;
  };

  const isDisplayed1 = (value, value1, value2) => {
    if (
      (
        [
          "Project Card - Wide 2",
          "Project Card - Wide",
          "Project Card - Wide - Tablet/Mobile",
        ] as readonly unknown[]
      ).includes(baseVariant)
    )
      return value1;
    if (
      (
        [
          "Project Card - Square",
          "Project Card - Square - Hover",
          "Project Card - Square - Tablet/Mobile",
        ] as readonly unknown[]
      ).includes(baseVariant)
    )
      return value2;
    return value;
  };

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name="Project Card - Portrait"
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="Project Card Portrait"
        onMouseEnter={onMouseEnterProjectCardPortrait}
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          {
            "Project Card - Square - Tablet/Mobile": {
              "data-name": "Project Card - Square - Tablet/Mobile",
              "data-highlight": undefined,
              onMouseEnter: undefined,
            },
            "Project Card - Wide 2": {
              "data-name": "Project Card - Wide",
              onMouseEnter: onMouseEnterProjectCardWide,
            },
            "Project Card - Wide - Tablet/Mobile": {
              "data-name": "Project Card - Wide - Tablet/Mobile",
              "data-highlight": undefined,
              onMouseEnter: undefined,
            },
            "Project Card - Square - Hover": {
              "data-name": "Project Card - Square - Hover",
              onMouseEnter: undefined,
              onMouseLeave: onMouseLeaveProjectCardSquareHover,
            },
            "Project Card - Wide": {
              "data-name": "Project Card - Wide",
              onMouseEnter: undefined,
              onMouseLeave: onMouseLeaveProjectCardWide,
            },
            "Project Card - Portrait - Hover": {
              "data-name": "Project Card - Portrait - Hover",
              onMouseLeave: onMouseLeaveProjectCardPortraitHover,
            },
            "Project Card - Square": {
              "data-name": "Project Card - Square",
              onMouseEnter: onMouseEnterProjectCardSquare,
            },
            "Project Card - Portrait - Tablet / Mobile": {
              "data-name": "Project Card - Portrait - Tablet / Mobile",
              "data-highlight": undefined,
              onMouseEnter: undefined,
            },
          },
          baseVariant,
          gestureVariant,
        )}
      >
        <motion.div
          className={styles.container}
          data-name="Container"
          layoutDependency={layoutDependency}
          layoutId="Container"
        >
          <Image
            background={{ alt: "", fit: "fill" }}
            className={styles.media}
            data-name="Media"
            layoutDependency={layoutDependency}
            layoutId="Media"
            style={{ scale: 1.03 }}
            variants={{
              "Project Card - Square - Hover": { scale: 1 },
              "Project Card - Wide": { scale: 1 },
              "Project Card - Portrait - Hover": { scale: 1 },
            }}
            {...addPropertyOverrides(
              {
                "Project Card - Square - Tablet/Mobile": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 476) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailSquare),
                  },
                },
                "Project Card - Wide 2": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 456) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailWide),
                  },
                },
                "Project Card - Wide - Tablet/Mobile": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 456) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailWide),
                  },
                },
                "Project Card - Square - Hover": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 476) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailSquare),
                  },
                },
                "Project Card - Wide": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 456) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailWide),
                  },
                },
                "Project Card - Square": {
                  background: {
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(
                      viewportY + ((componentViewport?.height || 456) - 476) / 2,
                    ),
                    sizes: `max(${viewportWidth}, 1px)`,
                    ...toResponsiveImage(thumbnailSquare),
                  },
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            {isDisplayed(visible, visible1, visible2) && (
              <Image
                background={{
                  alt: "",
                  fit: "fill",
                  loading: getLoadingLazyAtYPosition(
                    viewportY + ((componentViewport?.height || 455) - 455) / 2,
                  ),
                  sizes: `max(${viewportWidth}, 1px)`,
                  ...toResponsiveImage(thumbnailPortrait),
                }}
                className={styles.thumbnail}
                data-name="Thumbnail"
                layoutDependency={layoutDependency}
                layoutId="Thumbnail"
                {...addPropertyOverrides(
                  {
                    "Project Card - Square - Tablet/Mobile": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 476) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailSquare),
                      },
                    },
                    "Project Card - Wide 2": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 456) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailWide),
                      },
                    },
                    "Project Card - Wide - Tablet/Mobile": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 456) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailWide),
                      },
                    },
                    "Project Card - Square - Hover": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 476) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailSquare),
                      },
                    },
                    "Project Card - Wide": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 456) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailWide),
                      },
                    },
                    "Project Card - Square": {
                      background: {
                        alt: "",
                        fit: "fill",
                        loading: getLoadingLazyAtYPosition(
                          viewportY + ((componentViewport?.height || 456) - 476) / 2,
                        ),
                        sizes: `max(${viewportWidth}, 1px)`,
                        ...toResponsiveImage(thumbnailSquare),
                      },
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              />
            )}
            {isDisplayed1(videoPortrait1, videoWide1, videoSquare1) && (
              <ComponentViewportProvider>
                <SmartComponentScopedContainer
                  className={styles.video}
                  isAuthoredByUser
                  isModuleExternal
                  layoutDependency={layoutDependency}
                  layoutId="VideoModule container"
                  nodeId="VideoModule"
                  rendersWithMotion
                  scopeId="ProjectCard"
                >
                  <Video
                    backgroundColor="rgba(0, 0, 0, 0)"
                    borderRadius={0}
                    bottomLeftRadius={0}
                    bottomRightRadius={0}
                    controls={false}
                    height="100%"
                    id="VideoModule3"
                    isMixedBorderRadius={false}
                    layoutId="VideoModule3"
                    loop
                    muted
                    objectFit="cover"
                    playing
                    poster={toImageSrc(videoPortraitPoster)}
                    posterEnabled
                    srcFile={videoPortrait}
                    srcType="Upload"
                    srcUrl="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4"
                    startTime={0}
                    style={{ height: "100%", width: "100%" }}
                    topLeftRadius={0}
                    topRightRadius={0}
                    volume={25}
                    width="100%"
                    {...addPropertyOverrides(
                      {
                        "Project Card - Square - Tablet/Mobile": {
                          poster: toImageSrc(videoSquarePoster),
                          srcFile: videoSquare,
                        },
                        "Project Card - Wide 2": { poster: toImageSrc(videoWidePoster), srcFile: videoWide },
                        "Project Card - Wide - Tablet/Mobile": {
                          poster: toImageSrc(videoWidePoster),
                          srcFile: videoWide,
                        },
                        "Project Card - Square - Hover": {
                          poster: toImageSrc(videoSquarePoster),
                          srcFile: videoSquare,
                        },
                        "Project Card - Wide": { poster: toImageSrc(videoWidePoster), srcFile: videoWide },
                        "Project Card - Square": {
                          poster: toImageSrc(videoSquarePoster),
                          srcFile: videoSquare,
                        },
                      },
                      baseVariant,
                      gestureVariant,
                    )}
                  />
                </SmartComponentScopedContainer>
              </ComponentViewportProvider>
            )}
            <motion.div
              className={styles.overlay}
              data-name="Overlay"
              layoutDependency={layoutDependency}
              layoutId="Overlay"
              style={{
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                opacity: 0.3,
              }}
            />
          </Image>
          <motion.div
            className={styles.projectInfo}
            data-name="Project Info"
            layoutDependency={layoutDependency}
            layoutId="Project Info"
          >
            <motion.div
              className={styles.projectInfoContainer}
              data-name="Container"
              layoutDependency={layoutDependency}
              layoutId="Container 2"
            >
              <motion.div
                className={styles.topRow}
                data-name="Top Row"
                layoutDependency={layoutDependency}
                layoutId="Top Row"
              >
                <RichText
                  className={styles.visionOne}
                  data-name="Vision One"
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId="Vision One"
                  text={title}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <motion.p className="text-body-14" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                      Project Name
                    </motion.p>
                  </>
                </RichText>
              </motion.div>
              <motion.div
                className={styles.bottomRow}
                data-name="Bottom Row"
                layoutDependency={layoutDependency}
                layoutId="Bottom Row"
              >
                <RichText
                  className={styles.shapingVisionsDefiningMoments}
                  data-name="Shaping visions, defining moments"
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId="text"
                  style={{ opacity: 0.4 }}
                  text={subtitle}
                  variants={{
                    "Project Card - Square - Hover": { opacity: 1 },
                    "Project Card - Wide": { opacity: 1 },
                    "Project Card - Portrait - Hover": { opacity: 1 },
                  }}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <motion.p className="text-body-14" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                      Project Type
                    </motion.p>
                  </>
                </RichText>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

const ProjectCard = withFonts(Component) as typeof Component;
export default ProjectCard;

ProjectCard.displayName = "Project Card";

ProjectCard.defaultProps = { height: 455, width: 364 };

addFonts(ProjectCard, [...VideoFonts], { supportsExplicitInterCodegen: true });
