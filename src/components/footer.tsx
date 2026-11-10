"use client";

import "@/styles/fonts/inter.css";
import "@/styles/fonts/favorit-light.css";
import styles from "./footer.module.css";
import {
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  forwardLoader,
  matchVariant,
  RichText,
  runTasksWithYield,
  SmartComponentScopedContainer,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
  withCodeBoundaryForOverrides,
  withVariantAppearEffect,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import { AutoCopyrightStatement } from "@/vendor/copyright-year";
import TimeDisplay from "@/code/workshop/time-display";
import * as body11Uppercase from "@/styles/text/body-11-uppercase";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body15 from "@/styles/text/body-15";
import GlobalLineAnimationGlobal from "@/components/global/line-animation-global";
import LinkOpacity from "@/components/link-opacity";

const GlobalLineAnimationGlobalWithVariantAppearEffect = withVariantAppearEffect(GlobalLineAnimationGlobal);
const RichTextAutoCopyrightStatement = withCodeBoundaryForOverrides(RichText, {
  nodeId: "RichText",
  override: AutoCopyrightStatement,
  scopeId: "Footer",
});

const cycleOrder = ["Footer Dark - Desktop", "Footer Dark - Tablet", "Footer Dark - Mobile"];

const variantClassNames = {
  "Footer Dark - Mobile": styles.footerDarkMobile,
  "Footer Dark - Tablet": styles.footerDarkTablet,
};

const transition1 = { damping: 60, delay: 0, mass: 1, stiffness: 500, type: "spring" } as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Footer Dark - Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Footer Dark - Desktop" | "Footer Dark - Tablet" | "Footer Dark - Mobile";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const Footer = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Footer Dark - Desktop",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(
    styles.footer,
    body13Uppercase.className,
    body15.className,
    body11Uppercase.className,
  );

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.footer
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Footer Dark Desktop"
        ref={refBinding}
        style={style}
      >
        <motion.div
          className={styles.frame}
          data-name="Footer"
          layoutDependency={layoutDependency}
          layoutId="Footer"
        >
          <motion.div className={styles.frame2} layoutDependency={layoutDependency} layoutId="layer">
            <ComponentViewportProvider
              height={1}
              width={`calc(${viewportWidth} - 40px)`}
              y={viewportY - 420.92 + (componentViewport?.height || 475)}
              {...addPropertyOverrides(
                { "Footer Dark - Mobile": { y: viewportY - 625.02 + (componentViewport?.height || 200) } },
                baseVariant,
                gestureVariant,
              )}
            >
              <SmartComponentScopedContainer
                className={styles.globalLineAnimationGlobal}
                layoutDependency={layoutDependency}
                layoutId="GlobalLineAnimationGlobal container"
                rendersWithMotion
              >
                <GlobalLineAnimationGlobalWithVariantAppearEffect
                  __fx_animateOnce
                  __fx_obscuredVariantId="Line Animation"
                  __fx_threshold={0.5}
                  __fx_variantAppearEffectEnabled
                  __fx_visibleVariantId="Line Animation Active"
                  height="100%"
                  layoutId="GlobalLineAnimationGlobal"
                  colour="rgba(255, 255, 255, 0.2)"
                  style={{ height: "100%", width: "100%" }}
                  variant={matchVariant("Line Animation Active")}
                  width="100%"
                />
              </SmartComponentScopedContainer>
            </ComponentViewportProvider>
          </motion.div>
          <motion.div className={styles.frame3} layoutDependency={layoutDependency} layoutId="layer 2">
            <motion.div
              className={styles.frame4}
              data-name="Frame 1000002759"
              layoutDependency={layoutDependency}
              layoutId="Frame 1000002759"
            >
              <RichText
                className={styles.sitemap}
                data-name="Sitemap"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="Sitemap"
                style={{ opacity: 0.4 }}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p
                    className="text-body-13-uppercase"
                    style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                  >
                    Sitemap
                  </motion.p>
                </>
              </RichText>
              <motion.div
                className={styles.frame5}
                data-name="Frame 1000002753"
                layoutDependency={layoutDependency}
                layoutId="Frame 1000002753"
              >
                <ComponentViewportProvider
                  height={15}
                  y={viewportY - 312.87 + (componentViewport?.height || 475)}
                  {...addPropertyOverrides(
                    {
                      "Footer Dark - Mobile": { y: viewportY - 516.97 + (componentViewport?.height || 200) },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <SmartComponentScopedContainer
                    className={styles.linkOpacity}
                    layoutDependency={layoutDependency}
                    layoutId="LinkOpacity container"
                    rendersWithMotion
                  >
                    <LinkOpacity
                      height="100%"
                      newTab={false}
                      layoutId="LinkOpacity"
                      link="/works/grid-view"
                      label="Work"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(255, 255, 255)"
                      {...addPropertyOverrides(
                        {
                          "Footer Dark - Mobile": { link: "/works/grid-view" },
                          "Footer Dark - Tablet": { link: "/works/grid-view" },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
                <ComponentViewportProvider
                  height={15}
                  y={viewportY - 292.87 + (componentViewport?.height || 475)}
                  {...addPropertyOverrides(
                    {
                      "Footer Dark - Mobile": { y: viewportY - 496.97 + (componentViewport?.height || 200) },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <SmartComponentScopedContainer
                    className={styles.linkOpacity2}
                    layoutDependency={layoutDependency}
                    layoutId="LinkOpacity 2 container"
                    rendersWithMotion
                  >
                    <LinkOpacity
                      height="100%"
                      newTab={false}
                      layoutId="LinkOpacity 2"
                      link="/about"
                      label="About"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(255, 255, 255)"
                      {...addPropertyOverrides(
                        {
                          "Footer Dark - Mobile": { link: "/about" },
                          "Footer Dark - Tablet": { link: "/about" },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
                <ComponentViewportProvider
                  height={15}
                  y={viewportY - 272.87 + (componentViewport?.height || 475)}
                  {...addPropertyOverrides(
                    {
                      "Footer Dark - Mobile": { y: viewportY - 476.97 + (componentViewport?.height || 200) },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <SmartComponentScopedContainer
                    className={styles.linkOpacity3}
                    layoutDependency={layoutDependency}
                    layoutId="LinkOpacity 3 container"
                    rendersWithMotion
                  >
                    <LinkOpacity
                      height="100%"
                      newTab={false}
                      layoutId="LinkOpacity 3"
                      link="/playground"
                      label="Playground"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(255, 255, 255)"
                      {...addPropertyOverrides(
                        {
                          "Footer Dark - Mobile": { link: "/playground" },
                          "Footer Dark - Tablet": { link: "/playground" },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
              </motion.div>
            </motion.div>
            <motion.div
              className={styles.frame6}
              data-name="Frame 1000002758"
              layoutDependency={layoutDependency}
              layoutId="Frame 1000002758"
            >
              <RichText
                className={styles.location}
                data-name="Location"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="Location"
                style={{ opacity: 0.4 }}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p
                    className="text-body-13-uppercase"
                    style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                  >
                    Location
                  </motion.p>
                </>
              </RichText>
              <motion.div
                className={styles.frame7}
                data-name="Frame 1000002753"
                layoutDependency={layoutDependency}
                layoutId="Frame 1000002753 2"
              >
                <RichText
                  className={styles.londonUk}
                  data-name="London, UK"
                  fonts={["Inter"]}
                  layoutDependency={layoutDependency}
                  layoutId="London, UK"
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <motion.p className="text-body-15" style={{ "--df-text-color": "rgb(255, 255, 255)" }}>
                      New York City, NY
                    </motion.p>
                  </>
                </RichText>
                <ComponentViewportProvider>
                  <SmartComponentScopedContainer
                    className={styles.timeDisplay}
                    isAuthoredByUser
                    layoutDependency={layoutDependency}
                    layoutId="TimeDisplay container"
                    nodeId="TimeDisplay"
                    rendersWithMotion
                    scopeId="Footer"
                  >
                    <TimeDisplay
                      color="var(--token-white, rgb(255, 255, 255))"
                      customLocation="Europe"
                      font={{
                        fontFamily: '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 300,
                        letterSpacing: "-0.03em",
                        lineHeight: "1em",
                      }}
                      height="100%"
                      id="TimeDisplay"
                      layoutId="TimeDisplay"
                      location="America/New_York"
                      useCustomLocation
                      width="100%"
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
              </motion.div>
            </motion.div>
            <motion.div
              className={styles.frame8}
              data-name="Frame 1000002757"
              layoutDependency={layoutDependency}
              layoutId="Frame 1000002757"
            >
              <RichText
                className={styles.socials}
                data-name="Socials"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="Socials"
                style={{ opacity: 0.4 }}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p
                    className="text-body-13-uppercase"
                    style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                  >
                    Socials
                  </motion.p>
                </>
              </RichText>
              <motion.div
                className={styles.frame9}
                data-name="Frame 1000002753"
                layoutDependency={layoutDependency}
                layoutId="Frame 1000002753 3"
              >
                <ComponentViewportProvider
                  height={15}
                  y={viewportY - 312.87 + (componentViewport?.height || 475)}
                  {...addPropertyOverrides(
                    {
                      "Footer Dark - Mobile": { y: viewportY - 167.87 + (componentViewport?.height || 200) },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <SmartComponentScopedContainer
                    className={styles.linkOpacity4}
                    layoutDependency={layoutDependency}
                    layoutId="LinkOpacity 4 container"
                    rendersWithMotion
                  >
                    <LinkOpacity
                      height="100%"
                      newTab
                      layoutId="LinkOpacity 4"
                      link="http://instagram.com/aref.zeb/"
                      label="Instagram"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(255, 255, 255)"
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
                <ComponentViewportProvider
                  height={15}
                  y={viewportY - 292.87 + (componentViewport?.height || 475)}
                  {...addPropertyOverrides(
                    {
                      "Footer Dark - Mobile": { y: viewportY - 147.87 + (componentViewport?.height || 200) },
                    },
                    baseVariant,
                    gestureVariant,
                  )}
                >
                  <SmartComponentScopedContainer
                    className={styles.linkOpacity5}
                    layoutDependency={layoutDependency}
                    layoutId="LinkOpacity 5 container"
                    rendersWithMotion
                  >
                    <LinkOpacity
                      height="100%"
                      newTab
                      layoutId="LinkOpacity 5"
                      link="https://www.linkedin.com/in/aref-zebian-b0375a26b"
                      label="LinkedIn"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(255, 255, 255)"
                    />
                  </SmartComponentScopedContainer>
                </ComponentViewportProvider>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className={styles.frame10} layoutDependency={layoutDependency} layoutId="layer 3">
            <motion.div className={styles.frame11} layoutDependency={layoutDependency} layoutId="layer 4">
              <RichTextAutoCopyrightStatement
                __fromCanvasComponent
                children={
                  <>
                    <motion.p className="text-body-11-uppercase" dir="auto">
                      ©AZid 2026
                    </motion.p>
                  </>
                }
                className={styles.luca2025}
                data-name="© Luca 2025"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="© Luca 2025"
                style={{ "--df-paragraph-spacing": "0px", opacity: 0.4 }}
                verticalAlignment="top"
                withExternalLayout
                {...addPropertyOverrides(
                  {
                    "Footer Dark - Mobile": {
                      children: (
                        <>
                          <motion.p className="text-body-11-uppercase" dir="auto">
                            ©AZId llc 2026
                          </motion.p>
                        </>
                      ),
                    },
                  },
                  baseVariant,
                  gestureVariant,
                )}
              />
            </motion.div>
            <motion.div
              className={styles.spacer}
              data-name="Spacer"
              layoutDependency={layoutDependency}
              layoutId="Spacer"
            />
          </motion.div>
        </motion.div>
      </motion.footer>
    </VariantScope>
  );
});

export default Footer;

Footer.displayName = "Footer";

Footer.defaultProps = { height: 475, width: 1200 };

Footer.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [
        () => forwardLoader(GlobalLineAnimationGlobal, {}, context),
        () => forwardLoader(LinkOpacity, {}, context),
      ],
      context,
    );
  },
};
