"use client";

import styles from "./playground-content-2.module.css";
import {
  addImageAlt,
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  forwardLoader,
  matchVariant,
  runTasksWithYield,
  SmartComponentScopedContainer,
  Transition,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
  withFX,
  withOptimizedAppearEffect,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import PlaygroundItem from "@/components/playground-item";
import ToggleIcons from "@/components/toggle-icons";

const MotionDivWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(withFX(motion.div));
const SmartComponentScopedContainerWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(
  withFX(SmartComponentScopedContainer),
);

const cycleOrder = ["8 Column Desktop", "1 Column Desktop", "1 Column Mobile", "3 Column Mobile"];

const variantClassNames = {
  "1 Column Desktop": styles.variant1ColumnDesktop,
  "1 Column Mobile": styles.variant1ColumnMobile,
  "3 Column Mobile": styles.variant3ColumnMobile,
};

const transition1 = { damping: 70, delay: 0, mass: 1, stiffness: 400, type: "spring" } as const;

const transition2 = { damping: 60, delay: 0, mass: 1, stiffness: 150, type: "spring" } as const;

const transition3 = { damping: 60, delay: 0, mass: 1, stiffness: 350, type: "spring" } as const;

const transition4 = { duration: 0, type: "tween" } as const;

const transition5 = { delay: 0.5, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation = {
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
  y: 80,
};

const transition6 = { delay: 0.7, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation2 = {
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

const animation3 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 80,
};

const transition7 = { delay: 0.8, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation4 = {
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

const transition8 = { delay: 0.9, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation5 = {
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

const transition9 = { delay: 1, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation6 = {
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

const transition10 = { delay: 1.1, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation7 = {
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

const transition11 = { delay: 1.2, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation8 = {
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

const transition12 = { delay: 1.3, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation9 = {
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

const transition13 = { delay: 1.4, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation10 = {
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

const transition14 = { delay: 1.5, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation11 = {
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

const transition15 = { delay: 1.6, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation12 = {
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

const transition16 = { delay: 1.7, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation13 = {
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

const transition17 = { delay: 1.8, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation14 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition17,
  x: 0,
  y: 0,
} as const;

const transition18 = { delay: 1.9, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation15 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition18,
  x: 0,
  y: 0,
} as const;

const transition19 = { delay: 2, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation16 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition19,
  x: 0,
  y: 0,
} as const;

const transition20 = { delay: 2.1, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation17 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition20,
  x: 0,
  y: 0,
} as const;

const transition21 = { delay: 2.3, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation18 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition21,
  x: 0,
  y: 0,
} as const;

const transition22 = { delay: 2.4, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation19 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition22,
  x: 0,
  y: 0,
} as const;

const transition23 = { delay: 2.5, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation20 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition23,
  x: 0,
  y: 0,
} as const;

const transition24 = { delay: 2.6, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation21 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition24,
  x: 0,
  y: 0,
} as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "8 Column Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "8 Column Desktop" | "1 Column Desktop" | "1 Column Mobile" | "3 Column Mobile";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const PlaygroundContent2 = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "8 Column Desktop",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onTap = activeVariantCallback(async () => {
    setVariant("8 Column Desktop");
  });

  const onTapTo_3ColumnMobile = activeVariantCallback(async () => {
    setVariant("3 Column Mobile");
  });

  const onTapTo_1ColumnDesktop = activeVariantCallback(async () => {
    setVariant("1 Column Desktop");
  });

  const switchTo_1ColumnMobile = activeVariantCallback(async () => {
    setVariant("1 Column Mobile");
  });

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides(
        {
          "1 Column Desktop": { transition: transition2 },
          "1 Column Mobile": { transition: transition3 },
          "3 Column Mobile": { transition: transition3 },
        },
        baseVariant,
        gestureVariant,
      )}
    >
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.playgroundContent2, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="8 Column Desktop"
        ref={refBinding}
        style={style}
      >
        <motion.div
          className={styles.stickyArea}
          data-name="Sticky Area"
          layoutDependency={layoutDependency}
          layoutId="Sticky Area"
        >
          <Transition value={transition4}>
            <motion.div
              className={styles.sticky}
              data-name="Sticky"
              layoutDependency={layoutDependency}
              layoutId="Sticky"
            >
              <MotionDivWithFXWithOptimizedAppearEffect
                __perspectiveFX={false}
                __smartComponentFX
                __targetOpacity={1}
                animate={animation}
                className={styles.toggle}
                data-appear-id="9gxcx5"
                data-name="Toggle"
                initial={animation1}
                layoutDependency={layoutDependency}
                layoutId="Toggle"
                optimized
                style={{ transformPerspective: 1200 }}
                {...addPropertyOverrides(
                  {
                    "1 Column Desktop": { "data-highlight": true, onTap: onTap },
                    "1 Column Mobile": { "data-highlight": true, onTap: onTapTo_3ColumnMobile },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              >
                <motion.div
                  className={styles.gridToggle}
                  data-name="Grid Toggle"
                  data-highlight
                  layoutDependency={layoutDependency}
                  layoutId="Grid Toggle"
                  onTap={onTapTo_1ColumnDesktop}
                  {...addPropertyOverrides(
                    {
                      "1 Column Mobile": { onTap: onTapTo_3ColumnMobile },
                      "3 Column Mobile": { onTap: onTapTo_3ColumnMobile },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <ComponentViewportProvider height={25} width="25px" y={viewportY + 10}>
                    <SmartComponentScopedContainer
                      className={styles.gridToggleIcons}
                      isModuleExternal
                      layoutDependency={layoutDependency}
                      layoutId="ToggleIcons container"
                      nodeId="ToggleIcons"
                      rendersWithMotion
                      scopeId="PlaygroundContent2"
                    >
                      <ToggleIcons
                        height="100%"
                        click={onTapTo_1ColumnDesktop}
                        layoutId="ToggleIcons"
                        style={{ height: "100%", width: "100%" }}
                        variant={matchVariant("Column InActive")}
                        width="100%"
                        {...addPropertyOverrides(
                          {
                            "1 Column Mobile": { click: switchTo_1ColumnMobile },
                            "3 Column Mobile": { click: switchTo_1ColumnMobile },
                          },
                          baseVariant,
                          gestureVariant,
                        )}
                      />
                    </SmartComponentScopedContainer>
                  </ComponentViewportProvider>
                </motion.div>
                <motion.div
                  className={styles.singleToggle}
                  data-name="Single Toggle"
                  data-highlight
                  layoutDependency={layoutDependency}
                  layoutId="Single Toggle"
                  onTap={onTap}
                  {...addPropertyOverrides(
                    {
                      "1 Column Mobile": { onTap: switchTo_1ColumnMobile },
                      "3 Column Mobile": { onTap: switchTo_1ColumnMobile },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <ComponentViewportProvider height={25} width="25px" y={viewportY + 10}>
                    <SmartComponentScopedContainer
                      className={styles.singleToggleIcons}
                      isModuleExternal
                      layoutDependency={layoutDependency}
                      layoutId="ToggleIcons 2 container"
                      nodeId="ToggleIcons"
                      rendersWithMotion
                      scopeId="PlaygroundContent2"
                    >
                      <ToggleIcons
                        height="100%"
                        click={onTap}
                        layoutId="ToggleIcons 2"
                        style={{ height: "100%", width: "100%" }}
                        variant={matchVariant("Grid Active")}
                        width="100%"
                        {...addPropertyOverrides(
                          {
                            "1 Column Mobile": { click: onTapTo_3ColumnMobile },
                            "3 Column Mobile": { click: onTapTo_3ColumnMobile },
                          },
                          baseVariant,
                          gestureVariant,
                        )}
                      />
                    </SmartComponentScopedContainer>
                  </ComponentViewportProvider>
                </motion.div>
              </MotionDivWithFXWithOptimizedAppearEffect>
            </motion.div>
          </Transition>
        </motion.div>
        <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation2}
              className={styles.playgroundItem}
              data-appear-id="6cib4s"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 768,
                    pixelWidth: 1376,
                    src: "https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?width=1376&height=768",
                    srcSet:
                      "https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?scale-down-to=512&width=1376&height=768 512w,https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?scale-down-to=1024&width=1376&height=768 1024w,https://framerusercontent.com/images/pVC10RhrCd68xkBYfvpVIMQ1M.png?width=1376&height=768 1376w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem"
                caption="CREATURE_01.jpg"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 470,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 420,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation4}
              className={styles.playgroundItem2}
              data-appear-id="1y08861"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 2 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/BwNwmQ8SWffQEcupuccHxbtDjYE.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 2"
                caption="AN_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("1x1")}
                video="https://framerusercontent.com/assets/DCaQwMwnJP4quSKDyym7IKTHYTo.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 940,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 840,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation5}
              className={styles.playgroundItem3}
              data-appear-id="d3io8l"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 3 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1920,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?width=1080&height=1920",
                    srcSet:
                      "https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?scale-down-to=1024&width=1080&height=1920 576w,https://framerusercontent.com/images/TvL1dzucijcjyW1liP9XRiX79Q.jpg?width=1080&height=1920 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 3"
                caption="a14_01.mp4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/gr2WzRNeInA50fCUdRAc7WLvTE.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 1410,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 1260,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 380,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation6}
              className={styles.playgroundItem4}
              data-appear-id="1pvtn1j"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 4 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 2088,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?width=1671&height=2088",
                    srcSet:
                      "https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/C3xTm9HjRkEhBVkbxCv7iw4nxc.jpg?width=1671&height=2088 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 4"
                caption="AESOP_02.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 1880,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 1680,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 380,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation7}
              className={styles.playgroundItem5}
              data-appear-id="1o064t1"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 5 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1255,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?width=1671&height=1255",
                    srcSet:
                      "https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/mKgdyEYEZwfNkJV4XjfkuCmAzlA.jpg?width=1671&height=1255 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 5"
                caption="IH_01.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x3")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 2350,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 2100,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 380,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation8}
              className={styles.playgroundItem6}
              data-appear-id="935tub"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 6 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1280,
                    pixelWidth: 720,
                    src: "https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?width=720&height=1280",
                    srcSet:
                      "https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?scale-down-to=1024&width=720&height=1280 576w,https://framerusercontent.com/images/dg1nbwz6AZXU0MHdKwzPUIm3U.jpg?width=720&height=1280 720w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 6"
                caption="AD_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/QRk2hV1ufOTcJ1bw36TMOdgP0.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 2820,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 2520,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 760,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation9}
              className={styles.playgroundItem7}
              data-appear-id="1cc0uqs"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 7 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1672,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?width=1671&height=1672",
                    srcSet:
                      "https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?scale-down-to=1024&width=1671&height=1672 1023w,https://framerusercontent.com/images/TsY9kAen4NYtSQqktgojui46INo.jpg?width=1671&height=1672 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 7"
                caption="DCT_01.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("1x1")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 3290,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 2940,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 760,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation10}
              className={styles.playgroundItem8}
              data-appear-id="16fzuiw"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 8 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/B35fpBzGgBeqnPC8xxl4QJn8vs.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 8"
                caption="MOS_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/3SJlSeuNxEx0U8skA0YwfKpP4I0.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 3760,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 3360,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 760,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation11}
              className={styles.playgroundItem9}
              data-appear-id="1uwh4a2"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 9 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 2088,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?width=1671&height=2088",
                    srcSet:
                      "https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/ss9pIktuepNVDlbdIEGdJhZHk.jpg?width=1671&height=2088 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 9"
                caption="NOTH_01.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 4230,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 3780,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1140,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation12}
              className={styles.playgroundItem10}
              data-appear-id="1jmptt6"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 10 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 2088,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?width=1671&height=2088",
                    srcSet:
                      "https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?scale-down-to=1024&width=1671&height=2088 819w,https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?scale-down-to=2048&width=1671&height=2088 1638w,https://framerusercontent.com/images/BBPTmdQEz3J1wpS21h6Tc30K6s.jpg?width=1671&height=2088 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 10"
                caption="HBT_01.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 4700,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 4200,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1140,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation13}
              className={styles.playgroundItem11}
              data-appear-id="1o9gz6m"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 11 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1672,
                    pixelWidth: 1672,
                    src: "https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?width=1672&height=1672",
                    srcSet:
                      "https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?scale-down-to=512&width=1672&height=1672 512w,https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?scale-down-to=1024&width=1672&height=1672 1024w,https://framerusercontent.com/images/3O2Ze5ElUQncjS00uZ4OWncyGc8.jpg?width=1672&height=1672 1672w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 11"
                caption="CHR_01.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("1x1")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 5170,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 4620,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1140,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation14}
              className={styles.playgroundItem12}
              data-appear-id="16bud5k"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 12 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1255,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?width=1671&height=1255",
                    srcSet:
                      "https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/aOb0NVeConBw1VFQ9jXMJnYy0.jpg?width=1671&height=1255 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 12"
                caption="HBT_02.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x3")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 5640,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 5040,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1520,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation15}
              className={styles.playgroundItem13}
              data-appear-id="i8unh7"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 13 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/k8laITuag7pBrI4uXpLJZ2OGFo.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 13"
                caption="MNC_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/URBDcsxwIhPaHKfprBG2mB6AM.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 6110,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 5460,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1520,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation16}
              className={styles.playgroundItem14}
              data-appear-id="a2zhff"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 14 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1256,
                    pixelWidth: 1673,
                    src: "https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?width=1673&height=1256",
                    srcSet:
                      "https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?scale-down-to=512&width=1673&height=1256 512w,https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?scale-down-to=1024&width=1673&height=1256 1024w,https://framerusercontent.com/images/oKeKPndRTeXeDR8oN0jgzcVBplM.jpg?width=1673&height=1256 1673w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 14"
                caption="RNC_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x3")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 6580,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 5880,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1520,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation17}
              className={styles.playgroundItem15}
              data-appear-id="178naph"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 15 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1672,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?width=1671&height=1672",
                    srcSet:
                      "https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?scale-down-to=1024&width=1671&height=1672 1023w,https://framerusercontent.com/images/zkZpUA5XPtgy0lKc67X9t0R95Kg.jpg?width=1671&height=1672 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 15"
                caption="HBT_03.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("1x1")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 380}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 7050,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 6300,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1900,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation18}
              className={styles.playgroundItem16}
              data-appear-id="8ek44g"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 16 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/Fr2TlDvbzLj1gk7UIqZhW3gmVHI.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 16"
                caption="MNC_02.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/hALaQkAvGiCaZqDX48GqTaYfZlw.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 760}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 7520,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 6720,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1900,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation18}
              className={styles.playgroundItem17}
              data-appear-id="iajtje"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 17 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 1255,
                    pixelWidth: 1671,
                    src: "https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?width=1671&height=1255",
                    srcSet:
                      "https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?scale-down-to=512&width=1671&height=1255 512w,https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?scale-down-to=1024&width=1671&height=1255 1024w,https://framerusercontent.com/images/M6pDPC4vSAJfk7HMQWvswpygYp0.jpg?width=1671&height=1255 1671w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 17"
                caption="HBT_04.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x3")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 760}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 7990,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 7140,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 1900,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation19}
              className={styles.playgroundItem18}
              data-appear-id="butdt4"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 18 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                thumbnail={addImageAlt(
                  {
                    pixelHeight: 2089,
                    pixelWidth: 1673,
                    src: "https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?width=1673&height=2089",
                    srcSet:
                      "https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?scale-down-to=1024&width=1673&height=2089 820w,https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?scale-down-to=2048&width=1673&height=2089 1640w,https://framerusercontent.com/images/pkEt5KUvm3s4pSBEkDERGGYOA.jpg?width=1673&height=2089 1673w",
                  },
                  "",
                )}
                height="100%"
                layoutId="PlaygroundItem 18"
                caption="DCT_02.JPG"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                width="100%"
                setVideo={false}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 760}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 8460,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 7560,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 2280,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation20}
              className={styles.playgroundItem19}
              data-appear-id="1yyneen"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 19 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/0iYtT5Rt63Hbdw9HIucgp2mYkk.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 19"
                caption="INF_01.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("4x5")}
                video="https://framerusercontent.com/assets/yG3gOK8uIUOPnteFR12tKLwQVY4.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
          <ComponentViewportProvider
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
            y={viewportY + ((componentViewport?.height || 637) - 1175) / 2 + 45 + 760}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                  y: viewportY + ((componentViewport?.height || 12508) - 9345) / 2 + 45 + 8930,
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                  y: viewportY + ((componentViewport?.height || 9859) - 8394) / 2 + 44 + 7980,
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                  y: viewportY + ((componentViewport?.height || 1315) - 2694) / 2 + 44 + 2280,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          >
            <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation21}
              className={styles.playgroundItem20}
              data-appear-id="13uxn0c"
              initial={animation3}
              isModuleExternal
              layoutDependency={layoutDependency}
              layoutId="PlaygroundItem 20 container"
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                videoPoster={addImageAlt(
                  {
                    pixelHeight: 1350,
                    pixelWidth: 1080,
                    src: "https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?width=1080&height=1350",
                    srcSet:
                      "https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?scale-down-to=1024&width=1080&height=1350 819w,https://framerusercontent.com/images/faXaQjVdIylM8HOyi5VLSuPnLM.jpg?width=1080&height=1350 1080w",
                  },
                  "",
                )}
                layoutId="PlaygroundItem 20"
                caption="AN_02.MP4"
                style={{ width: "100%" }}
                variant={matchVariant("1x1")}
                video="https://framerusercontent.com/assets/fMrbc2QxVQCzMQ9uDZ1sVu84hFg.mp4"
                width="100%"
                setVideo
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

export default PlaygroundContent2;

PlaygroundContent2.displayName = "Playground Content 2";

PlaygroundContent2.defaultProps = { height: 637, width: 1170 };

PlaygroundContent2.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [() => forwardLoader(ToggleIcons, {}, context), () => forwardLoader(PlaygroundItem, {}, context)],
      context,
    );
  },
};
