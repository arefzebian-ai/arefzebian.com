"use client";

import styles from "./template-global-navigation-fill.module.css";
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
  withFX,
} from "@/deframer";
import { LayoutGroup, motion } from "motion/react";
import * as React from "react";
import Footer from "@/components/footer";
import EnaLogo from "@/components/ena-logo";
import NavigationNEW from "@/components/navigation";

const ContainerWithFX = withFX(Container);

const breakpoints = {
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809px)",
  Tablet: "(min-width: 810px) and (max-width: 1199px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Desktop: "hidden-desktop",
  Phone: "hidden-template-global-navigation-fill-phone",
  Tablet: "hidden-template-global-navigation-fill-tablet",
};

const getProps = ({ footerVisible, height, id, width, ...props }: any) => ({
  ...props,
  footerVisible: footerVisible ?? true,
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
  footerVisible?: boolean;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const TemplateGlobalNavigationFill = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, footerVisible, children, ...restProps } = getProps(props);

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
            <Container className={styles.navigationNew} layoutScroll>
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{
                  Phone: { variant: "Navigation Mobile Fill" },
                  Tablet: { variant: "Navigation Tablet Fill" },
                }}
              >
                <NavigationNEW
                  height="100%"
                  style={{ width: "100%" }}
                  variant="Navigation Desktop Fill"
                  width="100%"
                />
              </PropertyOverrides>
            </Container>
          </ComponentViewportProvider>
          {children}
          <div className={styles.frame} />
          {footerVisible && (
            <ComponentViewportProvider height={631} width="100vw" y={1000}>
              <ContainerWithFX
                __perspectiveFX={false}
                __targetOpacity={1}
                className={styles.frame2}
                rendersWithMotion
                style={{ transformPerspective: 1200 }}
              >
                <PropertyOverrides
                  breakpoint={baseVariant}
                  overrides={{
                    Phone: { variant: "Footer Dark - Mobile" },
                    Tablet: { variant: "Footer Dark - Tablet" },
                  }}
                >
                  <Footer
                    height="100%"
                    style={{ width: "100%" }}
                    variant="Footer Dark - Desktop"
                    width="100%"
                  />
                </PropertyOverrides>
              </ContainerWithFX>
            </ComponentViewportProvider>
          )}
        </motion.div>
        <div id="template-overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asLayoutTemplate(TemplateGlobalNavigationFill);

TemplateGlobalNavigationFill.displayName = "Template - Global Navigation Fill";

TemplateGlobalNavigationFill.defaultProps = { height: 800, width: 1200 };
