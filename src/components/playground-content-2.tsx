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
import { playgroundItems } from "@/lib/playground-items";

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

const toggleAppear = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: { delay: 0.5, duration: 2, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const,
  x: 0,
  y: 0,
} as const;

const toggleAppearInitial = {
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
} as const;

const itemAppearInitial = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 80,
} as const;

function itemAppear(index: number) {
  return {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
    transition: {
      delay: 0.7 + index * 0.1,
      duration: 2,
      ease: [0.23, 0.98, 0.56, 1],
      type: "tween" as const,
    },
  x: 0,
  y: 0,
  };
}

function itemViewportY(
  index: number,
  viewportY: number,
  componentHeight: number | undefined,
  baseVariant: string,
) {
  if (baseVariant === "1 Column Desktop") {
    return viewportY + ((componentHeight || 12508) - 9345) / 2 + 45 + index * 470;
  }
  if (baseVariant === "1 Column Mobile") {
    return viewportY + ((componentHeight || 9859) - 8394) / 2 + 44 + index * 420;
  }
  if (baseVariant === "3 Column Mobile") {
    return viewportY + ((componentHeight || 1315) - 2694) / 2 + 44 + Math.floor(index / 3) * 380;
  }
  return viewportY + ((componentHeight || 637) - 1175) / 2 + 45 + Math.floor(index / 8) * 380;
}

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "8 Column Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "8 Column Desktop" | "1 Column Desktop" | "1 Column Mobile" | "3 Column Mobile";
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
                animate={toggleAppear}
                className={styles.toggle}
                data-appear-id="9gxcx5"
                data-name="Toggle"
                initial={toggleAppearInitial}
                layoutDependency={layoutDependency}
                layoutId="Toggle"
                optimized
                style={{ transformPerspective: 1200 }}
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
                      "1 Column Mobile": { onTap: switchTo_1ColumnMobile },
                      "3 Column Mobile": { onTap: switchTo_1ColumnMobile },
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
                            "1 Column Desktop": {
                              click: onTapTo_1ColumnDesktop,
                              variant: matchVariant("Column Active"),
                            },
                            "1 Column Mobile": {
                              click: switchTo_1ColumnMobile,
                              variant: matchVariant("Column Active"),
                            },
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
                      "1 Column Mobile": { onTap: onTapTo_3ColumnMobile },
                      "3 Column Mobile": { onTap: onTapTo_3ColumnMobile },
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
                            "1 Column Desktop": {
                              click: onTap,
                              variant: matchVariant("Grid InActive"),
                            },
                            "1 Column Mobile": {
                              click: onTapTo_3ColumnMobile,
                              variant: matchVariant("Grid InActive"),
                            },
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
          {playgroundItems.map((item, index) => {
            const n = index + 1;
            const layoutSuffix = n === 1 ? "" : ` ${n}`;

            return (
          <ComponentViewportProvider
                key={item.caption}
            height={370}
            width={`max((${viewportWidth} - 70px) / 8, 20px)`}
                y={itemViewportY(index, viewportY, componentViewport?.height, "8 Column Desktop")}
            {...addPropertyOverrides(
              {
                "1 Column Desktop": {
                  width: `max(${viewportWidth} * 0.4, 20px)`,
                      y: itemViewportY(index, viewportY, componentViewport?.height, "1 Column Desktop"),
                },
                "1 Column Mobile": {
                  width: `max(${viewportWidth}, 20px)`,
                      y: itemViewportY(index, viewportY, componentViewport?.height, "1 Column Mobile"),
                },
                "3 Column Mobile": {
                  width: `max((${viewportWidth} - 20px) / 3, 20px)`,
                      y: itemViewportY(index, viewportY, componentViewport?.height, "3 Column Mobile"),
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
                  animate={itemAppear(index)}
              className={styles.playgroundItem}
                  data-appear-id={`playground-item-${n}`}
                  initial={itemAppearInitial}
              isModuleExternal
              layoutDependency={layoutDependency}
                  layoutId={`PlaygroundItem${layoutSuffix} container`}
              nodeId="PlaygroundItem"
              optimized
              rendersWithMotion
              scopeId="PlaygroundContent2"
            >
              <PlaygroundItem
                height="100%"
                    layoutId={`PlaygroundItem${layoutSuffix}`}
                    caption={item.caption}
                style={{ width: "100%" }}
                    variant={matchVariant(item.variant)}
                width="100%"
                    setVideo={item.setVideo}
                    {...(item.thumbnail
                      ? { thumbnail: addImageAlt(item.thumbnail, "") }
                      : {})}
                    {...(item.video ? { video: item.video } : {})}
                    {...(item.videoPoster
                      ? { videoPoster: addImageAlt(item.videoPoster, "") }
                      : {})}
              />
            </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
          </ComponentViewportProvider>
            );
          })}
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
