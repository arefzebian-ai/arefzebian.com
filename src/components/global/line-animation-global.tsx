"use client";

import styles from "./line-animation-global.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  useActiveVariantCallback,
  useFallbackRef,
  useOnVariantChange,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const cycleOrder = [
  "Line Animation",
  "Line Animation Active",
  "Line animate on appear",
  "Line Active",
  "Line Animation 03",
  "Line Animation 03 Active",
  "Line Animation 04",
  "Line Animation 04 Active",
];

const variantClassNames = {
  "Line Animation Active": styles.lineAnimationActive,
  "Line animate on appear": styles.lineAnimateOnAppear,
  "Line Animation 03": styles.lineAnimation03,
  "Line Active": styles.lineActive,
  "Line Animation 04": styles.lineAnimation04,
  "Line Animation 03 Active": styles.lineAnimation03Active,
  "Line Animation 04 Active": styles.lineAnimation04Active,
};

const transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } as const;

const transition2 = { delay: 0.2, duration: 2, ease: [0.65, 0, 0.13, 1], type: "tween" } as const;

const transition3 = { delay: 0, duration: 2, ease: [0.65, 0, 0.13, 1], type: "tween" } as const;

const getProps = ({ colour, height, id, width, ...props }: any) => ({
  ...props,
  colour: colour ?? "var(--token-line, rgba(0, 0, 0, 0.2))",
  variant: props.variant ?? "Line Animation",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?:
    | "Line Animation"
    | "Line Animation Active"
    | "Line animate on appear"
    | "Line Active"
    | "Line Animation 03"
    | "Line Animation 03 Active"
    | "Line Animation 04"
    | "Line Animation 04 Active";
  colour?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const GlobalLineAnimationGlobal = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, colour, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Line Animation",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);

  const onAppearLineAnimateOnAppear = activeVariantCallback(async () => {
    setVariant("Line Active");
  });

  const onAppearLineAnimation03 = activeVariantCallback(async () => {
    await delay(() => setVariant("Line Animation 03 Active"), 300);
  });

  const onAppearLineAnimation04 = activeVariantCallback(async () => {
    await delay(() => setVariant("Line Animation 04 Active"), 400);
  });

  useOnVariantChange(baseVariant, {
    "Line animate on appear": onAppearLineAnimateOnAppear,
    "Line Animation 03": onAppearLineAnimation03,
    "Line Animation 04": onAppearLineAnimation04,
  });

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides(
        {
          "Line Animation Active": { transition: transition2 },
          "Line Active": { transition: transition3 },
          "Line Animation 03 Active": { transition: transition2 },
          "Line Animation 04 Active": { transition: transition2 },
        },
        baseVariant,
        gestureVariant,
      )}
    >
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.lineAnimationGlobal, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Line Animation"
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          {
            "Line animate on appear": { "data-highlight": true },
            "Line Animation 03": { "data-highlight": true },
            "Line Animation 04": { "data-highlight": true },
          },
          baseVariant,
          gestureVariant,
        )}
      >
        <motion.div
          className={styles.line}
          data-name="Line"
          layoutDependency={layoutDependency}
          layoutId="Line"
          style={{ backgroundColor: colour }}
        />
      </motion.div>
    </VariantScope>
  );
});

export default GlobalLineAnimationGlobal;

GlobalLineAnimationGlobal.displayName = "Global / Line Animation Global";

GlobalLineAnimationGlobal.defaultProps = { height: 1, width: 787 };
