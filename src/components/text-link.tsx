"use client";

import "@/styles/fonts/inter.css";
import styles from "./text-link.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  Link,
  RichText,
  Transition,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body15Uppercase from "@/styles/text/body-15-uppercase";

const cycleOrder = ["Default", "Line IN"];

const variantClassNames = { "Line IN": styles.lineIn };

const transition1 = { duration: 0, type: "tween" } as const;

const transition2 = { delay: 0, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const transition3 = { delay: 0, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const getProps = ({ color, height, id, label, link, newTab, width, ...props }: any) => ({
  ...props,
  link: link ?? props.aFOmVa1og,
  variant: props.variant ?? "Default",
  newTab: newTab ?? props.WEIlJRVLb ?? false,
  label: label ?? props.X4kGlDs4u ?? "LINK",
  color: color ?? props.Z9XW1W3fa ?? "var(--token-ffffff, rgb(255, 255, 255))",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Default" | "Line IN";
  label?: string;
  color?: string;
  link?: string;
  newTab?: boolean;
  // Props passed by their original id.
  aFOmVa1og?: unknown;
  WEIlJRVLb?: unknown;
  X4kGlDs4u?: unknown;
  Z9XW1W3fa?: unknown;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const TextLink = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, label, color, link, newTab, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Default", ref: refBinding, variant, variantClassNames });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterDefaultValue = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Line IN");
  });

  const onMouseLeaveLineIN = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Default");
  });

  const scopingClassNames = cx(styles.textLink, body15Uppercase.className);

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides({ "Line IN": { transition: transition2 } }, baseVariant, gestureVariant)}
    >
      <Link href={link} motionChild nodeId="Default" openInNewTab={newTab}>
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(scopingClassNames, styles.root, className, classNames)} ${styles.component}`}
          data-name={baseVariant}
          data-highlight
          layoutDependency={layoutDependency}
          layoutId="Default"
          onMouseEnter={onMouseEnterDefaultValue}
          ref={refBinding}
          style={style}
          {...addPropertyOverrides(
            { "Line IN": { onMouseEnter: undefined, onMouseLeave: onMouseLeaveLineIN } },
            baseVariant,
            gestureVariant,
          )}
        >
          <Transition value={transition3}>
            <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
              <RichText
                className={styles.label}
                data-name="Label"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="Label"
                style={{ "--color-2": color }}
                text={label}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p
                    className="text-body-15-uppercase"
                    style={{ "--df-text-color": "var(--color-2)" }}
                  >
                    LINK
                  </motion.p>
                </>
              </RichText>
              <RichText
                className={styles.label2}
                data-name="Label"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="Label 2"
                style={{ "--color-2": color }}
                text={label}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p
                    className="text-body-15-uppercase"
                    style={{ "--df-text-color": "var(--color-2)" }}
                  >
                    LINK
                  </motion.p>
                </>
              </RichText>
            </motion.div>
          </Transition>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default TextLink;

TextLink.displayName = "Text link";

TextLink.defaultProps = { height: 16, width: 32 };
