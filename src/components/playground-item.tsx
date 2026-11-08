"use client";

import "@/styles/fonts/inter.css";
import styles from "./playground-item.module.css";
import {
  addFonts,
  clientOnly,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  getFonts,
  getLoadingLazyAtYPosition,
  Image,
  RichText,
  SmartComponentScopedContainer,
  toImageSrc,
  toResponsiveImage,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
  withFonts,
  withFX,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

import * as captionStyle from "@/styles/text/caption";

// Browser-only code: loaded after hydration, as on the published site.
const Video = clientOnly(() => import("@/vendor/video-2").then((m) => m.Video));

const VideoFonts = getFonts(Video);
const MotionDivWithFX = withFX(motion.div);

const cycleOrder = ["4x5", "4x3", "1x1"];

const variantClassNames = { "1x1": styles.variant1x1, "4x3": styles.variant4x3 };

const transition2 = { damping: 70, delay: 0, mass: 1, stiffness: 400, type: "spring" } as const;

const getProps = ({ caption, height, id, setVideo, width, ...props }: any) => ({
  ...props,
  caption: caption ?? "Caption.jpg",
  variant: props.variant ?? "4x5",
  setVideo: setVideo ?? false,
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "4x5" | "4x3" | "1x1";
  thumbnail?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  caption?: string;
  setVideo?: boolean;
  video?: string;
  videoPoster?: {
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
    thumbnail,
    caption,
    setVideo,
    video,
    videoPoster,
    ...restProps
  } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "4x5",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(styles.playgroundItem, captionStyle.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition2}>
      <MotionDivWithFX
        {...restProps}
        {...gestureHandlers}
        __perspectiveFX={false}
        __smartComponentFX
        __targetOpacity={1}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="4x5"
        ref={refBinding}
        style={{ ...style }}
      >
        <motion.div
          className={styles.contentWrapper}
          data-name="Content Wrapper"
          layoutDependency={layoutDependency}
          layoutId="Content Wrapper"
        >
          {setVideo && (
            <ComponentViewportProvider>
              <SmartComponentScopedContainer
                className={styles.video}
                isAuthoredByUser
                isModuleExternal
                layoutDependency={layoutDependency}
                layoutId="VideoModule container"
                nodeId="VideoModule"
                rendersWithMotion
                scopeId="PlaygroundItem"
              >
                <Video
                  backgroundColor="rgba(0, 0, 0, 0)"
                  borderRadius={0}
                  bottomLeftRadius={0}
                  bottomRightRadius={0}
                  controls={false}
                  height="100%"
                  id="VideoModule5"
                  isMixedBorderRadius={false}
                  layoutId="VideoModule5"
                  loop
                  muted
                  objectFit="cover"
                  playing
                  poster={toImageSrc(videoPoster)}
                  posterEnabled
                  srcFile={video}
                  srcType="Upload"
                  srcUrl="https://ena-supply.b-cdn.net/Chrysus/BB/logo%20animation.mp4"
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
          <Image
            background={{
              alt: "",
              fit: "fill",
              loading: getLoadingLazyAtYPosition(viewportY),
              sizes: `max(${viewportWidth}, 1px)`,
              ...toResponsiveImage(thumbnail),
            }}
            className={styles.image}
            layoutDependency={layoutDependency}
            layoutId="image"
          />
        </motion.div>
        <RichText
          className={styles.text}
          fonts={["Inter"]}
          layoutDependency={layoutDependency}
          layoutId="text"
          text={caption}
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p className="text-caption" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
              Caption.jpg
            </motion.p>
          </>
        </RichText>
      </MotionDivWithFX>
    </VariantScope>
  );
});

const PlaygroundItem = withFonts(Component) as typeof Component;
export default PlaygroundItem;

PlaygroundItem.displayName = "Playground Item";

PlaygroundItem.defaultProps = { height: 370, width: 281 };

addFonts(PlaygroundItem, [...VideoFonts], { supportsExplicitInterCodegen: true });
