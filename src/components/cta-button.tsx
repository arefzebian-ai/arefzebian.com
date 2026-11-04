"use client";

import "@/styles/fonts/inter.css";
import "@/styles/fonts/switzer.css";
import styles from "./cta-button.module.css";
import {
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  Link,
  RichText,
  SmartComponentScopedContainer,
  Transition,
  useActiveVariantCallback,
  useFallbackRef,
  useOnVariantChange,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import { Icon as Material } from "@/vendor/material";
import * as body15Uppercase from "@/styles/text/body-15-uppercase";

const cycleOrder = [
  "Primary Button",
  "Primary Button Hover",
  "Grey Button",
  "Grey Button Hover",
  "Appear",
  "Button Reveal",
  "Button Hero",
  "Button Hero Hover",
];

const variantClassNames = {
  "Grey Button Hover": styles.greyButtonHover,
  "Primary Button Hover": styles.primaryButtonHover,
  "Button Hero Hover": styles.buttonHeroHover,
};

const transition1 = { delay: 0, duration: 1, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const transition2 = { delay: 2.9, duration: 1, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const transition3 = { duration: 0, type: "tween" } as const;

const transition4 = { delay: 0, duration: 0, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const getProps = ({ height, id, label, width, onLabelChange, appearAfter, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Primary Button",
  label: label ?? "View Projects",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?:
    | "Primary Button"
    | "Primary Button Hover"
    | "Grey Button"
    | "Grey Button Hover"
    | "Appear"
    | "Button Reveal"
    | "Button Hero"
    | "Button Hero Hover";
  link?: string;
  label?: string;
  /** With the "Appear" variant: resolves when the reveal may start (default: immediately). */
  appearAfter?: PromiseLike<unknown>;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const CTAButton = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, link, label, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({
      cycleOrder,
      defaultVariant: "Primary Button",
      ref: refBinding,
      variant,
      variantClassNames,
    });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterPrimaryButton = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Primary Button Hover");
  });

  const scopingClassNames = cx(styles.ctaButton, body15Uppercase.className);

  const onMouseLeavePrimaryButtonHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Primary Button");
  });

  const onMouseEnterGreyButton = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Grey Button Hover");
  });

  const onMouseLeaveGreyButtonHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Grey Button");
  });

  const onAppearAppear = activeVariantCallback(async () => {
    // `appearAfter`: hold the reveal until something else has happened (the homepage hero intro).
    if (props.appearAfter) await props.appearAfter;
    setVariant("Button Reveal", true);
  });

  const onAppearButtonReveal = activeVariantCallback(async () => {
    setVariant("Button Hero", true);
  });

  const onMouseEnterButtonHero = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Button Hero Hover");
  });

  const onMouseLeaveButtonHeroHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Button Hero");
  });

  useOnVariantChange(baseVariant, { "Button Reveal": onAppearButtonReveal, Appear: onAppearAppear });

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides({ "Button Reveal": { transition: transition2 } }, baseVariant, gestureVariant)}
    >
      <Link href={link} motionChild nodeId="Primary Button">
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(scopingClassNames, styles.root, className, classNames)} ${styles.component}`}
          data-border
          data-name={baseVariant}
          data-highlight
          layoutDependency={layoutDependency}
          layoutId="Primary Button"
          onMouseEnter={onMouseEnterPrimaryButton}
          ref={refBinding}
          style={{
            "--border-bottom-width": "1px",
            "--border-left-width": "1px",
            "--border-right-width": "1px",
            "--border-top-width": "1px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            opacity: 1,
            ...style,
          }}
          variants={{
            "Grey Button Hover": { backgroundColor: "rgb(227, 227, 227)" },
            "Grey Button": {
              "--border-bottom-width": "0px",
              "--border-left-width": "0px",
              "--border-right-width": "0px",
              "--border-top-width": "0px",
              backgroundColor: "rgb(235, 235, 235)",
            },
            "Primary Button Hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            "Button Reveal": { opacity: 1 },
            Appear: { opacity: 0 },
            "Button Hero": { opacity: 1 },
            "Button Hero Hover": { backgroundColor: "rgba(255, 255, 255, 0.2)", opacity: 1 },
          }}
          {...addPropertyOverrides(
            {
              "Grey Button Hover": { onMouseEnter: undefined, onMouseLeave: onMouseLeaveGreyButtonHover },
              "Grey Button": { onMouseEnter: onMouseEnterGreyButton },
              "Primary Button Hover": { onMouseLeave: onMouseLeavePrimaryButtonHover },
              "Button Reveal": { onMouseEnter: undefined },
              Appear: { onMouseEnter: undefined },
              "Button Hero": { onMouseEnter: onMouseEnterButtonHero },
              "Button Hero Hover": { onMouseEnter: undefined, onMouseLeave: onMouseLeaveButtonHeroHover },
            },
            baseVariant,
            gestureVariant,
          )}
        >
          <motion.div
            className={styles.contactButton}
            data-name="Contact Button"
            layoutDependency={layoutDependency}
            layoutId="Contact Button"
          >
            <RichText
              children={
                <>
                  <motion.p className="text-body-15-uppercase">View Projects</motion.p>
                </>
              }
              className={styles.text}
              fonts={["Inter"]}
              layoutDependency={layoutDependency}
              layoutId="text"
              text={label}
              verticalAlignment="top"
              withExternalLayout
              {...addPropertyOverrides(
                {
                  "Grey Button Hover": {
                    children: (
                      <>
                        <motion.p
                          style={{
                            "--font-selector": "RlM7U3dpdHplci1tZWRpdW0=",
                            "--df-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                            "--df-font-size": "15px",
                            "--df-font-weight": "500",
                            "--df-line-height": "117%",
                            "--df-text-alignment": "center",
                            "--df-text-transform": "uppercase",
                          }}
                        >
                          View Projects
                        </motion.p>
                      </>
                    ),
                    fonts: ["FS;Switzer-medium"],
                  },
                  "Grey Button": {
                    children: (
                      <>
                        <motion.p
                          style={{
                            "--font-selector": "RlM7U3dpdHplci1tZWRpdW0=",
                            "--df-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                            "--df-font-size": "15px",
                            "--df-font-weight": "500",
                            "--df-line-height": "117%",
                            "--df-text-alignment": "center",
                            "--df-text-transform": "uppercase",
                          }}
                        >
                          View Projects
                        </motion.p>
                      </>
                    ),
                    fonts: ["FS;Switzer-medium"],
                  },
                },
                baseVariant,
                gestureVariant,
              )}
            />
            <Transition
              value={transition3}
              {...addPropertyOverrides(
                {
                  "Grey Button Hover": { value: transition1 },
                  "Primary Button Hover": { value: transition1 },
                  "Button Reveal": { value: transition1 },
                  "Button Hero": { value: transition4 },
                  "Button Hero Hover": { value: transition1 },
                },
                baseVariant,
                gestureVariant,
              )}
            >
              <motion.div
                className={styles.arrowWrapper}
                data-name="Arrow Wrapper"
                layoutDependency={layoutDependency}
                layoutId="Arrow Wrapper"
              >
                <ComponentViewportProvider>
                  <SmartComponentScopedContainer
                    className={styles.arrow1}
                    data-name="Arrow 1"
                    isAuthoredByUser
                    isModuleExternal
                    layoutDependency={layoutDependency}
                    layoutId="Material container"
                    name="Arrow 1"
                    nodeId="Arrow 1"
                    rendersWithMotion
                    scopeId="CTAButton"
                  >
                    <Material
                      color="rgb(255, 255, 255)"
                      height="100%"
                      iconSearch="Home"
                      iconSelection="ArrowForward"
                      iconStyle15="Filled"
                      iconStyle2="Filled"
                      iconStyle7="Filled"
                      id="Material10"
                      layoutId="Material10"
                      mirrored={false}
                      name="Arrow 1"
                      selectByList
                      style={{ height: "100%", width: "100%" }}
                      width="100%"
                      {...addPropertyOverrides(
                        {
                          "Grey Button Hover": { color: "rgb(0, 0, 0)" },
                          "Grey Button": { color: "rgb(0, 0, 0)" },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
                <ComponentViewportProvider>
                  <SmartComponentScopedContainer
                    className={styles.arrow2}
                    data-name="Arrow 2"
                    isAuthoredByUser
                    isModuleExternal
                    layoutDependency={layoutDependency}
                    layoutId="Material container 2"
                    name="Arrow 2"
                    nodeId="Arrow 2"
                    rendersWithMotion
                    scopeId="CTAButton"
                  >
                    <Material
                      color="rgb(255, 255, 255)"
                      height="100%"
                      iconSearch="Home"
                      iconSelection="ArrowForward"
                      iconStyle15="Filled"
                      iconStyle2="Filled"
                      iconStyle7="Filled"
                      id="Material11"
                      layoutId="Material11"
                      mirrored={false}
                      name="Arrow 2"
                      selectByList
                      style={{ height: "100%", width: "100%" }}
                      width="100%"
                      {...addPropertyOverrides(
                        {
                          "Grey Button Hover": { color: "rgb(0, 0, 0)" },
                          "Grey Button": { color: "rgb(0, 0, 0)" },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
              </motion.div>
            </Transition>
          </motion.div>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default CTAButton;

CTAButton.displayName = "CTA Button";

CTAButton.defaultProps = { height: 37, width: 171 };
