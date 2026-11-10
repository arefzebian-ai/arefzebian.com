"use client";

import styles from "./hero-loader.module.css";
import {
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  forwardLoader,
  matchVariant,
  runTasksWithYield,
  SmartComponentScopedContainer,
  toResponsiveImage,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useOnVariantChange,
  useVariantState,
  VariantScope,
  withFX,
  withOptimizedAppearEffect,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import LoaderImage from "@/components/loader-image";
import { markHeroIntroStarted, resetHeroIntro } from "@/lib/hero-intro";
import { heroLoaderTransition } from "@/lib/motion";

const MotionDivWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(withFX(motion.div));

const cycleOrder = [
  "Initial State",
  "Step 1",
  "Step 2",
  "Mobile - Initial",
  "Mobile Step 1",
  "Mobile Step 2",
];

const variantClassNames = {
  "Mobile - Initial": styles.mobileInitial,
  "Step 1": styles.step1,
  "Step 2": styles.step2,
  "Mobile Step 1": styles.mobileStep1,
  "Mobile Step 2": styles.mobileStep2,
};

const transition1 = heroLoaderTransition;

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
  y: 90,
};

const getProps = ({ height, id, image1, image2, image3, width, ...props }: any) => ({
  ...props,
  image1: image1 ?? {
    pixelHeight: 1080,
    pixelWidth: 1920,
    src: "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?width=1920&height=1080",
    srcSet:
      "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=512&width=1920&height=1080 512w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=1024&width=1920&height=1080 1024w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?width=1920&height=1080 1920w",
  },
  image3: image3 ?? {
    pixelHeight: 4032,
    pixelWidth: 3024,
    src: "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032",
    srcSet:
      "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=1024&width=3024&height=4032 768w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=2048&width=3024&height=4032 1536w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032 3024w",
  },
  image2: image2 ?? {
    pixelHeight: 1143,
    pixelWidth: 2048,
    src: "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143",
    srcSet:
      "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=512&width=2048&height=1143 512w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=1024&width=2048&height=1143 1024w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143 2048w",
  },
  variant: props.variant ?? "Initial State",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Initial State" | "Step 1" | "Step 2" | "Mobile - Initial" | "Mobile Step 1" | "Mobile Step 2";
  image1?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  image2?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  image3?: {
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

const HeroLoader = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportHeight = componentViewport?.height || 800;
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, image1, image2, image3, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Initial State",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);

  // The loader entering its first running step is the start of the homepage intro: the copy and the
  // CTA run their delays from here (see lib/hero-intro.ts).
  const onAppearStep1 = activeVariantCallback(async () => {
    markHeroIntroStarted();
    await delay(() => setVariant("Step 2", true), 2000);
  });

  const onAppearMobileStep1 = activeVariantCallback(async () => {
    markHeroIntroStarted();
    await delay(() => setVariant("Mobile Step 2", true), 2000);
  });

  React.useEffect(() => resetHeroIntro, []);

  const isDisplayed = () => {
    if ((["Mobile - Initial", "Mobile Step 1", "Mobile Step 2"] as readonly unknown[]).includes(baseVariant))
      return false;
    return true;
  };

  useOnVariantChange(baseVariant, { "Step 1": onAppearStep1, "Mobile Step 1": onAppearMobileStep1 });

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.heroLoader, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Initial State"
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          { "Step 1": { "data-highlight": true }, "Mobile Step 1": { "data-highlight": true } },
          baseVariant,
          gestureVariant,
        )}
      >
        <motion.div
          className={styles.container}
          data-name="Container"
          layoutDependency={layoutDependency}
          layoutId="Container"
          style={{ transformPerspective: 1200 }}
        >
          <MotionDivWithFXWithOptimizedAppearEffect
            className={styles.imageWrapper}
            data-appear-id="wmx15q"
            data-name="Image Wrapper"
            layoutDependency={layoutDependency}
            layoutId="Image Wrapper"
            {...addPropertyOverrides(
              {
                "Mobile - Initial": {
                  __perspectiveFX: false,
                  __smartComponentFX: true,
                  __targetOpacity: 1,
                  animate: animation,
                  initial: animation1,
                  optimized: true,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <ComponentViewportProvider
              height={viewportHeight * 1 * 0.2 * 1}
              width={`calc(${viewportWidth} / 5)`}
              y={
                viewportY +
                viewportHeight -
                (-200 + viewportHeight * 1) +
                0 +
                (viewportHeight * 1 - (viewportHeight * 1 * 0.2 + 0)) / 2 +
                (viewportHeight * 1 * 0.2 - (viewportHeight * 1 * 0.2 * 1 + 0)) / 2
              }
              {...addPropertyOverrides(
                {
                  "Mobile - Initial": {
                    width: `calc(${viewportWidth} / 4)`,
                    y:
                      viewportY +
                      viewportHeight -
                      (0 + viewportHeight * 1) +
                      0 +
                      (viewportHeight * 1 - (viewportHeight * 1 * 0.2 + 0)) / 2 +
                      (viewportHeight * 1 * 0.2 - (viewportHeight * 1 * 0.2 * 1 + 0)) / 2,
                  },
                  "Step 1": {
                    height: Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 * 1,
                    y:
                      viewportY +
                      (viewportHeight - (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 + 0)) / 2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 + 0)) /
                        2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 * 1 + 0)) /
                        2,
                  },
                  "Step 2": {
                    height: Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 * 1,
                    width: viewportWidth,
                    y:
                      viewportY +
                      (viewportHeight - (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 + 0)) / 2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 + 0)) /
                        2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 * 1 + 0)) /
                        2,
                  },
                  "Mobile Step 1": {
                    height: Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 * 1,
                    width: `calc(${viewportWidth} / 4)`,
                    y:
                      viewportY +
                      (viewportHeight - (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 + 0)) / 2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 + 0)) /
                        2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 0.2 * 1 + 0)) /
                        2,
                  },
                  "Mobile Step 2": {
                    height: Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 * 1,
                    width: viewportWidth,
                    y:
                      viewportY +
                      (viewportHeight - (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 + 0)) / 2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 + 0)) /
                        2 +
                      (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 -
                        (Math.max(0, (viewportHeight - 0 - 0) / 1) * 1 * 1 * 1 + 0)) /
                        2,
                  },
                },
                baseVariant,
                gestureVariant,
              )}
            >
              <SmartComponentScopedContainer
                className={styles.loaderImage}
                layoutDependency={layoutDependency}
                layoutId="LoaderImage container"
                rendersWithMotion
              >
                <LoaderImage
                  image1={toResponsiveImage(image1)}
                  height="100%"
                  image3={toResponsiveImage(image3)}
                  layoutId="LoaderImage"
                  style={{ height: "100%", width: "100%" }}
                  variant={matchVariant("Initial State")}
                  width="100%"
                  image2={toResponsiveImage(image2)}
                />
              </SmartComponentScopedContainer>
            </ComponentViewportProvider>
            {isDisplayed() && (
              <motion.div
                className={styles.whiteOverlay}
                data-name="White Overlay"
                layoutDependency={layoutDependency}
                layoutId="White Overlay"
              />
            )}
          </MotionDivWithFXWithOptimizedAppearEffect>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

export default HeroLoader;

HeroLoader.displayName = "Hero Loader";

HeroLoader.defaultProps = { height: 800, width: 1200 };

HeroLoader.loader = {
  load: (props, context) => {
    return runTasksWithYield([() => forwardLoader(LoaderImage, {}, context)], context);
  },
};
