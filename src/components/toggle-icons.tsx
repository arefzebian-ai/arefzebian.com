"use client";

import styles from "./toggle-icons.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  SVG,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const enabledGestures = { "Grid InActive": { hover: true }, "Column InActive": { hover: true } };

const cycleOrder = ["Grid Active", "Column Active", "Grid InActive", "Column InActive"];

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Grid Active",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Grid Active" | "Column Active" | "Grid InActive" | "Column InActive";
  click?: any;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ToggleIcons = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, click, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Grid Active", enabledGestures, ref: refBinding, variant });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onTapGridActive = activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    if (click) {
      const res = await click(...args);
      if (res === false) return false;
    }
  });

  const isDisplayed = () => {
    if (gestureVariant === "Column InActive-hover") return true;
    if ((["Column Active", "Column InActive"] as readonly unknown[]).includes(baseVariant)) return true;
    return false;
  };

  const isDisplayed1 = () => {
    if (gestureVariant === "Column InActive-hover") return false;
    if ((["Column Active", "Column InActive"] as readonly unknown[]).includes(baseVariant)) return false;
    return true;
  };

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.toggleIcons, styles.root, className, classNames)}
        data-name="Grid Active"
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="Grid Active"
        onTap={onTapGridActive}
        ref={refBinding}
        style={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          opacity: 1,
          ...style,
        }}
        variants={{
          "Grid InActive-hover": { opacity: 0.5 },
          "Column InActive-hover": { opacity: 0.5 },
          "Grid InActive": { opacity: 0.3 },
          "Column InActive": { opacity: 0.3 },
        }}
        {...addPropertyOverrides(
          {
            "Grid InActive-hover": { "data-name": undefined },
            "Column InActive-hover": { "data-name": undefined },
            "Grid InActive": { "data-name": "Grid InActive" },
            "Column Active": { "data-name": "Column Active" },
            "Column InActive": { "data-name": "Column InActive" },
          },
          baseVariant,
          gestureVariant,
        )}
      >
        {isDisplayed() && (
          <SVG
            className={styles.graphic}
            data-name="Graphic - 1"
            layout="position"
            layoutDependency={layoutDependency}
            layoutId="Graphic 1"
            opacity={1}
            svg={
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><path d="M 0.609 0.579 L 7.809 0.579 L 7.809 16.579 L 0.609 16.579 Z M 6.309 0.579 L 16.309 0.579 L 16.309 16.579 L 6.309 16.579 Z" fill="rgb(255, 255, 255)"></path></svg>'
            }
            svgContentId={10436105566}
            withExternalLayout
            {...addPropertyOverrides(
              {
                "Column Active": { svgContentId: 10225700514 },
                "Column InActive": { svgContentId: 10225700514 },
              },
              baseVariant,
              gestureVariant,
            )}
          />
        )}
        {isDisplayed1() && (
          <SVG
            className={styles.graphic2}
            data-name="Graphic - 2"
            layout="position"
            layoutDependency={layoutDependency}
            layoutId="Graphic 2"
            opacity={1}
            svg={
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><path d="M 0.609 0.579 L 8 0.579 L 8 7.97 L 0.609 7.97 Z M 9.465 0.579 L 16.856 0.579 L 16.856 7.97 L 9.465 7.97 Z M 9.465 9.141 L 16.856 9.141 L 16.856 16.532 L 9.465 16.532 Z M 0.609 9.141 L 8 9.141 L 8 16.532 L 0.609 16.532 Z" fill="rgb(255, 255, 255)"></path></svg>'
            }
            svgContentId={9319008157}
            withExternalLayout
          />
        )}
      </motion.div>
    </VariantScope>
  );
});

export default ToggleIcons;

ToggleIcons.displayName = "Toggle Icons";

ToggleIcons.defaultProps = { height: 25, width: 25 };
