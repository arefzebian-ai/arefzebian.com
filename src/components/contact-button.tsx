"use client";

import "@/styles/fonts/inter.css";
import styles from "./contact-button.module.css";
import {
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  Link,
  RichText,
  SmartComponentScopedContainer,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import { Icon as Material } from "@/vendor/material";
import * as body15Uppercase from "@/styles/text/body-15-uppercase";

const cycleOrder = ["Variant 1", "Variant 2"];

const variantClassNames = { "Variant 2": styles.variant2 };

const transition1 = { duration: 0, type: "tween" } as const;

const transition2 = { delay: 0, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const getProps = ({ color, height, id, label, width, ...props }: any) => ({
  ...props,
  label: label ?? "get in touch",
  variant: props.variant ?? "Variant 1",
  color: color ?? props.zMidt7FK3 ?? "rgb(255, 255, 255)",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Variant 1" | "Variant 2";
  color?: string;
  link?: string;
  label?: string;
  // Props passed by their original id.
  zMidt7FK3?: unknown;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ContactButton = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, color, link, label, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Variant 1", ref: refBinding, variant, variantClassNames });

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

  const scopingClassNames = cx(styles.contactButton, body15Uppercase.className);

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides({ "Variant 2": { transition: transition2 } }, baseVariant, gestureVariant)}
    >
      <Link href={link} motionChild nodeId="Variant 1">
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(scopingClassNames, styles.root, className, classNames)} ${styles.component}`}
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
            fonts={["Inter"]}
            layoutDependency={layoutDependency}
            layoutId="text"
            style={{ "--color-4": color }}
            text={label}
            verticalAlignment="top"
            withExternalLayout
          >
            <>
              <motion.p className="text-body-15-uppercase" style={{ "--df-text-color": "var(--color-4)" }}>
                get in touch
              </motion.p>
            </>
          </RichText>
          <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
            <ComponentViewportProvider>
              <SmartComponentScopedContainer
                className={styles.material}
                isAuthoredByUser
                isModuleExternal
                layoutDependency={layoutDependency}
                layoutId="Material container"
                nodeId="Material"
                rendersWithMotion
                scopeId="ContactButton"
              >
                <Material
                  color={color}
                  height="100%"
                  iconSearch="Home"
                  iconSelection="ArrowForward"
                  iconStyle15="Filled"
                  iconStyle2="Filled"
                  iconStyle7="Filled"
                  id="Material12"
                  layoutId="Material12"
                  mirrored={false}
                  selectByList
                  style={{ height: "100%", width: "100%" }}
                  width="100%"
                />
              </SmartComponentScopedContainer>
            </ComponentViewportProvider>
            <ComponentViewportProvider>
              <SmartComponentScopedContainer
                className={styles.material2}
                isAuthoredByUser
                isModuleExternal
                layoutDependency={layoutDependency}
                layoutId="Material container 2"
                nodeId="Material"
                rendersWithMotion
                scopeId="ContactButton"
              >
                <Material
                  color={color}
                  height="100%"
                  iconSearch="Home"
                  iconSelection="ArrowForward"
                  iconStyle15="Filled"
                  iconStyle2="Filled"
                  iconStyle7="Filled"
                  id="Material13"
                  layoutId="Material13"
                  mirrored={false}
                  selectByList
                  style={{ height: "100%", width: "100%" }}
                  width="100%"
                />
              </SmartComponentScopedContainer>
            </ComponentViewportProvider>
          </motion.div>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default ContactButton;

ContactButton.displayName = "Contact Button";

ContactButton.defaultProps = { height: 15, width: 118.5 };
