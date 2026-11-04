"use client";

import "@/styles/fonts/inter.css";
import styles from "./adress-link.module.css";
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
  withFX,
  withOptimizedAppearEffect,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body15 from "@/styles/text/body-15";

const RichTextWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(withFX(RichText));

const cycleOrder = ["Variant 1", "Variant 2"];

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const transition2 = { delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const animation = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition2,
  x: 0,
  y: 0,
} as const;

const animation1 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 20,
};

const transition3 = { delay: 0.9, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const animation2 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition3,
  x: 0,
  y: 0,
} as const;

const getProps = ({ height, id, line1, line2, width, ...props }: any) => ({
  ...props,
  line2: line2 ?? "Copenhagen, Denmark, 1051",
  line1: line1 ?? "12 Nyhavn Street",
  variant: props.variant ?? "Variant 1",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Variant 1" | "Variant 2";
  link?: string;
  line1?: string;
  line2?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const AdressLink = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, link, line1, line2, ...restProps } = getProps(props);

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

  const scopingClassNames = cx(styles.adressLink, body15.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <Link href={link} motionChild nodeId="Variant 1" openInNewTab>
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
          <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
            <motion.div
              className={styles.frame2}
              layoutDependency={layoutDependency}
              layoutId="layer 2"
              style={{ opacity: 0.4 }}
              variants={{ "Variant 2": { opacity: 1 } }}
            >
              <RichTextWithFXWithOptimizedAppearEffect
                __perspectiveFX={false}
                __smartComponentFX
                __targetOpacity={1}
                animate={animation}
                className={styles.mondayToFriday9}
                data-appear-id="1rw6xj1"
                data-name={"Monday to Friday: 9:00 AM – 6:00 PM Saturday & Sunday: Closed"}
                fonts={["Inter"]}
                initial={animation1}
                layoutDependency={layoutDependency}
                layoutId="text"
                optimized
                style={{ "--df-paragraph-spacing": "0px" }}
                text={line1}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p className="text-body-15">12 Nyhavn Street</motion.p>
                </>
              </RichTextWithFXWithOptimizedAppearEffect>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.frame3}
            layoutDependency={layoutDependency}
            layoutId="layer 3"
            style={{ opacity: 0.4 }}
            variants={{ "Variant 2": { opacity: 1 } }}
          >
            <RichTextWithFXWithOptimizedAppearEffect
              __perspectiveFX={false}
              __smartComponentFX
              __targetOpacity={1}
              animate={animation2}
              className={styles.mondayToFriday9_2}
              data-appear-id="pbcn75"
              data-name={"Monday to Friday: 9:00 AM – 6:00 PM Saturday & Sunday: Closed"}
              fonts={["Inter"]}
              initial={animation1}
              layoutDependency={layoutDependency}
              layoutId="text 2"
              optimized
              style={{ "--df-paragraph-spacing": "0px" }}
              text={line2}
              verticalAlignment="top"
              withExternalLayout
            >
              <>
                <motion.p className="text-body-15">Copenhagen, Denmark, 1051</motion.p>
              </>
            </RichTextWithFXWithOptimizedAppearEffect>
          </motion.div>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default AdressLink;

AdressLink.displayName = "Adress Link";

AdressLink.defaultProps = { height: 34, width: 256 };
