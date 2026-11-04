"use client";

import styles from "./menu-hamburger-mobile.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const cycleOrder = ["Menu", "Close"];

const variantClassNames = { Close: styles.close };

const transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } as const;

const transition2 = { delay: 0, duration: 1, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const getProps = ({ background, height, id, width, ...props }: any) => ({
  ...props,
  background: background ?? "rgb(0, 0, 0)",
  variant: props.variant ?? "Menu",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Menu" | "Close";
  background?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const MenuHamburgerMobile = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, background, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Menu",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides({ Close: { transition: transition2 } }, baseVariant, gestureVariant)}
    >
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.menuHamburgerMobile, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Menu"
        ref={refBinding}
        style={style}
      >
        <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
          <motion.div
            className={styles.frame2}
            layoutDependency={layoutDependency}
            layoutId="layer 2"
            style={{ backgroundColor: background, rotate: 0 }}
            variants={{ Close: { rotate: 135 } }}
          />
          <motion.div
            className={styles.frame3}
            layoutDependency={layoutDependency}
            layoutId="layer 3"
            style={{ backgroundColor: background, rotate: 180 }}
            variants={{ Close: { rotate: 225 } }}
          />
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

export default MenuHamburgerMobile;

MenuHamburgerMobile.displayName = "Menu Hamburger Mobile";

MenuHamburgerMobile.defaultProps = { height: 32, width: 32 };
