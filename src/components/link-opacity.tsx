"use client";

import "@/styles/fonts/inter.css";
import styles from "./link-opacity.module.css";
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
import * as body15 from "@/styles/text/body-15";

const cycleOrder = ["Variant 1", "Variant 2 2", "Variant 3", "Variant 2 3", "Variant", "Variant 2"];

const variantClassNames = { "Variant 2": styles.variant2 };

const transition1 = { delay: 0, duration: 0.5, ease: [0.29, 0.58, 0.5, 1], type: "tween" } as const;

const getProps = ({ color, height, id, label, newTab, width, ...props }: any) => ({
  ...props,
  newTab: newTab ?? false,
  label: label ?? "About",
  variant: props.variant ?? "Variant 1",
  color: color ?? props.x5kdXetRb ?? "rgb(255, 255, 255)",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Variant 1" | "Variant 2 2" | "Variant 3" | "Variant 2 3" | "Variant" | "Variant 2";
  label?: string;
  link?: string;
  newTab?: boolean;
  color?: string;
  // Props passed by their original id.
  x5kdXetRb?: unknown;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const LinkOpacity = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, label, link, newTab, color, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Variant 1", ref: refBinding, variant, variantClassNames });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterVariant1 = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Variant 2 2");
  });

  const onMouseLeaveVariant2 = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Variant 1");
  });

  const onMouseEnterVariant3 = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Variant 2 3");
  });

  const onMouseLeaveVariant2Variant23 = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Variant 3");
  });

  const onMouseEnterVariant = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Variant 2");
  });

  const onMouseLeaveVariant2Variant2 = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Variant");
  });

  const onTapAbout = activeVariantCallback(async () => {
    setVariant("Variant 2");
  });

  const scopingClassNames = cx(styles.linkOpacity, body15.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <Link href={link} motionChild nodeId="Variant 1" openInNewTab={newTab}>
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(scopingClassNames, styles.root, className, classNames)} ${styles.component}`}
          data-name="Variant 1"
          data-highlight
          layoutDependency={layoutDependency}
          layoutId="Variant 1"
          onMouseEnter={onMouseEnterVariant1}
          ref={refBinding}
          style={style}
          {...addPropertyOverrides(
            {
              "Variant 3": { "data-name": undefined, onMouseEnter: onMouseEnterVariant3 },
              "Variant 2 3": {
                "data-name": "Variant 2",
                onMouseEnter: undefined,
                onMouseLeave: onMouseLeaveVariant2Variant23,
              },
              "Variant 2": {
                "data-name": "Variant 2",
                onMouseEnter: undefined,
                onMouseLeave: onMouseLeaveVariant2Variant2,
              },
              Variant: { "data-name": undefined, onMouseEnter: onMouseEnterVariant },
              "Variant 2 2": { "data-name": "Variant 2", onMouseLeave: onMouseLeaveVariant2 },
            },
            baseVariant,
            gestureVariant,
          )}
        >
          <RichText
            children={
              <>
                <motion.p className="text-body-15" style={{ "--df-text-color": "var(--color)" }}>
                  About
                </motion.p>
              </>
            }
            className={styles.about}
            data-name="About"
            fonts={["Inter"]}
            layoutDependency={layoutDependency}
            layoutId="About"
            style={{ "--color": color, opacity: 1 }}
            text={label}
            variants={{
              "Variant 3": { opacity: 0.4 },
              "Variant 2 3": { opacity: 1 },
              "Variant 2": { "--about-text-color": "var(--color)", opacity: 1 },
              Variant: { "--about-text-color": "var(--color)", opacity: 0.4 },
              "Variant 2 2": { opacity: 0.4 },
            }}
            verticalAlignment="top"
            withExternalLayout
            {...addPropertyOverrides(
              {
                "Variant 2": {
                  "data-highlight": true,
                  children: (
                    <>
                      <motion.p className="text-body-15" style={{ "--df-text-color": "var(--color)" }}>
                        {"12 Nyhavn Street "}
                      </motion.p>
                      <motion.p
                        className="text-body-15"
                        style={{ "--df-text-color": "var(--about-text-color, var(--color))" }}
                      >
                        Copenhagen, Denmark, 1051
                      </motion.p>
                    </>
                  ),
                  onTap: onTapAbout,
                  text: undefined,
                },
                Variant: {
                  children: (
                    <>
                      <motion.p className="text-body-15" style={{ "--df-text-color": "var(--color)" }}>
                        12 Nyhavn Street
                      </motion.p>
                      <motion.p
                        className="text-body-15"
                        style={{ "--df-text-color": "var(--about-text-color, var(--color))" }}
                      >
                        Copenhagen, Denmark, 1051
                      </motion.p>
                    </>
                  ),
                  text: undefined,
                },
              },
              baseVariant,
              gestureVariant,
            )}
          />
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default LinkOpacity;

LinkOpacity.displayName = "Link Opacity";

LinkOpacity.defaultProps = { height: 15, width: 39 };
