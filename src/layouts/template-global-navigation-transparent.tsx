"use client";

import styles from "./template-global-navigation-transparent.module.css";
import {
  asLayoutTemplate,
  ComponentViewportProvider,
  Container,
  cx,
  GeneratedComponentContext,
  HTMLStyle,
  PropertyOverrides,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  withVariantAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion } from "motion/react";
import * as React from "react";
import Footer from "@/components/footer";
import EnaLogo from "@/components/ena-logo";
import NavigationNEW from "@/components/navigation";

const NavigationWithVariantAppearEffect = withVariantAppearEffect(NavigationNEW);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199px)",
  Phone: "(max-width: 809px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-template-global-navigation-tablet",
  Phone: "hidden-template-global-navigation-phone",
  Desktop: "hidden-desktop",
};

const getProps = ({ height, id, visible, width, ...props }: any) => ({
  ...props,
  visible: visible ?? true,
  variant: props.variant ?? "Desktop",
});

const cursor = {
  alignment: "start",
  component: EnaLogo,
  offset: { x: 15, y: -15 },
  placement: "top",
  variant: "kVz36CBeh",
} as const;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Desktop" | "Phone" | "Tablet";
  scrollSection?: React.RefObject<HTMLElement | null>;
  visible?: boolean;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const TemplateGlobalNavigationTransparent = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, scrollSection, visible, children, ...restProps } =
    getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  useCustomCursors({ "1ghf82t": cursor });

  return (
    <GeneratedComponentContext.Provider
      value={{ isLayoutTemplate: true, primaryVariantId: "Desktop", hiddenClassNames }}
    >
      <LayoutGroup id={layoutId ?? defaultLayoutId}>
        <HTMLStyle value=":root body { background: rgb(0, 0, 0); }" />
        <motion.div
          {...restProps}
          className={cx(styles.layout, styles.root, className)}
          data-layout-template
          ref={refBinding}
          style={style}
        >
          <ComponentViewportProvider height={67} width="100vw" y={0}>
            <Container className={styles.navigation} layoutScroll rendersWithMotion>
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{
                  Tablet: {
                    __fx_targets: [{ ref: scrollSection, target: "Navigation Tablet Fill" }],
                    variant: "Navigation Tablet",
                  },
                  Phone: {
                    __fx_targets: [{ ref: scrollSection, target: "Navigation Mobile Fill" }],
                    variant: "Navigation Mobile",
                  },
                }}
              >
                <NavigationWithVariantAppearEffect
                  __fx_animateOnce={false}
                  __fx_targets={[{ ref: scrollSection, target: "Navigation Desktop Fill" }]}
                  __fx_threshold={0}
                  __fx_variantAppearEffectEnabled
                  height="100%"
                  style={{ width: "100%" }}
                  variant="Navigation Desktop"
                  width="100%"
                />
              </PropertyOverrides>
            </Container>
          </ComponentViewportProvider>
          {children}
          <div className={styles.frame} />
          {visible && (
            <ComponentViewportProvider height={631} width="100vw" y={1000}>
              <Container className={styles.frame2}>
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Tablet: { variant: "Footer Dark - Tablet" },
                    Phone: { variant: "Footer Dark - Mobile" },
                  }}
                >
                  <Footer
                    height="100%"
                    style={{ width: "100%" }}
                    variant="Footer Dark - Desktop"
                    width="100%"
                  />
                </PropertyOverrides>
              </Container>
            </ComponentViewportProvider>
          )}
        </motion.div>
        <div id="template-overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asLayoutTemplate(TemplateGlobalNavigationTransparent);

TemplateGlobalNavigationTransparent.displayName = "Template - Global Navigation Transparent";

TemplateGlobalNavigationTransparent.defaultProps = { height: 800, width: 1200 };
