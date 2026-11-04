"use client";

import styles from "./scroll-to-view-more.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  Link,
  RichText,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const cycleOrder = ["Variant 1", "Variant 2"];

const transition1 = { delay: 0, duration: 0.4, ease: [0.12, 0.23, 0.5, 1], type: "tween" } as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Variant 1",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Variant 1" | "Variant 2";
  link?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ScrollToViewMore = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, link, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Variant 1", ref: refBinding, variant });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterVariant1 = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Variant 2");
  });

  const onMouseLeaveVariant2 = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Variant 1");
  });

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <Link href={link} motionChild nodeId="Variant 1" smoothScroll>
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(styles.scrollToViewMore, styles.root, className, classNames)} ${styles.component}`}
          data-name={baseVariant}
          data-highlight
          layoutDependency={layoutDependency}
          layoutId="Variant 1"
          onMouseEnter={onMouseEnterVariant1}
          ref={refBinding}
          style={style}
          {...addPropertyOverrides(
            { "Variant 2": { onMouseLeave: onMouseLeaveVariant2 } },
            baseVariant,
            gestureVariant,
          )}
        >
          <RichText
            className={styles.text}
            data-name="scroll to view more"
            fonts={["GF;Switzer-500"]}
            layoutDependency={layoutDependency}
            layoutId="scroll to view more"
            style={{ opacity: 0.4 }}
            variants={{ "Variant 2": { opacity: 1 } }}
            verticalAlignment="top"
            withExternalLayout
          >
            <>
              <motion.p
                style={{
                  "--font-selector": "R0Y7U3dpdHplci01MDA=",
                  "--df-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                  "--df-font-size": "13px",
                  "--df-font-weight": "500",
                  "--df-line-height": "117%",
                  "--df-text-color": "rgb(255, 255, 255)",
                  "--df-text-transform": "uppercase",
                }}
              >
                scroll to view more
              </motion.p>
            </>
          </RichText>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default ScrollToViewMore;

ScrollToViewMore.displayName = "Scroll to view more";

ScrollToViewMore.defaultProps = { height: 15, width: 144 };
