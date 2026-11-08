"use client";

import "@/styles/fonts/inter.css";
import styles from "./navigation.module.css";
import {
  addPropertyOverrides,
  ComponentViewportProvider,
  createLayoutDependency,
  cx,
  forwardLoader,
  Link,
  matchVariant,
  RichText,
  runTasksWithYield,
  SmartComponentScopedContainer,
  Transition,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
  withFX,
  withOptimizedAppearEffect,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import StopScroll from "@/vendor/stop-scroll-prod";
import * as bodyNavigationLinkMobile from "@/styles/text/body-navigation-link-mobile";
import * as link from "@/styles/text/link";
import * as bodyLogo from "@/styles/text/body-logo";
import TextLink from "@/components/text-link";
import ContactButton from "@/components/contact-button";
import MenuHamburgerMobile from "@/components/menu-hamburger-mobile";

const RichTextWithFX = withFX(RichText);
const RichTextWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(RichTextWithFX);
const SmartComponentScopedContainerWithFX = withFX(SmartComponentScopedContainer);
const SmartComponentScopedContainerWithFXWithOptimizedAppearEffect = withOptimizedAppearEffect(
  SmartComponentScopedContainerWithFX,
);

const cycleOrder = [
  "Navigation Desktop",
  "Navigation Desktop Fill",
  "Navigation Mobile",
  "Navigation Mobile Open",
  "Navigation Mobile Fill",
  "Navigation Mobile Open Fill",
  "Navigation Tablet",
  "Navigation Tablet Fill",
];

const variantClassNames = {
  "Navigation Mobile Open Fill": styles.navigationMobileOpenFill,
  "Navigation Mobile": styles.navigationMobile,
  "Navigation Tablet": styles.navigationTablet,
  "Navigation Mobile Open": styles.navigationMobileOpen,
  "Navigation Mobile Fill": styles.navigationMobileFill,
  "Navigation Tablet Fill": styles.navigationTabletFill,
};

const transition1 = { duration: 0, type: "tween" } as const;

const transition2 = { delay: 0, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const transition3 = { delay: 0, duration: 0.7, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const transition4 = { delay: 0.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition4,
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
  y: 44,
};

const transition5 = { delay: 0.2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation2 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition5,
  x: 0,
  y: 0,
} as const;

const transition6 = { delay: 0.3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation3 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition6,
  x: 0,
  y: 0,
} as const;

const transition7 = { delay: 0.5, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation4 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition7,
  x: 0,
  y: 0,
} as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Navigation Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?:
    | "Navigation Desktop"
    | "Navigation Desktop Fill"
    | "Navigation Mobile"
    | "Navigation Mobile Open"
    | "Navigation Mobile Fill"
    | "Navigation Mobile Open Fill"
    | "Navigation Tablet"
    | "Navigation Tablet Fill";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const NavigationNEW = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportHeight = componentViewport?.height || 200;
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Navigation Desktop",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(
    styles.navigation,
    bodyLogo.className,
    bodyNavigationLinkMobile.className,
    link.className,
  );

  const isDisplayed = () => {
    if (
      (
        [
          "Navigation Mobile",
          "Navigation Mobile Open",
          "Navigation Mobile Fill",
          "Navigation Mobile Open Fill",
        ] as readonly unknown[]
      ).includes(baseVariant)
    )
      return false;
    return true;
  };

  const isDisplayed1 = () => {
    if (
      (
        [
          "Navigation Mobile",
          "Navigation Mobile Open",
          "Navigation Mobile Fill",
          "Navigation Mobile Open Fill",
        ] as readonly unknown[]
      ).includes(baseVariant)
    )
      return true;
    return false;
  };

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onTap = activeVariantCallback(async () => {
    setVariant("Navigation Mobile Open");
  });

  const onTapNavigationMobileOpen = activeVariantCallback(async () => {
    setVariant("Navigation Mobile");
  });

  const onTapNavigationMobileFill = activeVariantCallback(async () => {
    setVariant("Navigation Mobile Open Fill");
  });

  const onTapNavigationMobileOpenFill = activeVariantCallback(async () => {
    setVariant("Navigation Mobile Fill");
  });

  const isDisplayed2 = () => {
    if (
      (["Navigation Mobile Open", "Navigation Mobile Open Fill"] as readonly unknown[]).includes(baseVariant)
    )
      return true;
    return false;
  };

  return (
    <VariantScope
      layoutGroup={layoutId ?? defaultLayoutId}
      animate={variants}
      transition={transition1}
      {...addPropertyOverrides(
        {
          "Navigation Mobile Open Fill": { transition: transition2 },
          "Navigation Mobile": { transition: transition2 },
          "Navigation Mobile Open": { transition: transition2 },
          "Navigation Mobile Fill": { transition: transition3 },
        },
        baseVariant,
        gestureVariant,
      )}
    >
      <motion.nav
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Navigation Desktop"
        ref={refBinding}
        style={style}
      >
        <Transition
          value={transition2}
          {...addPropertyOverrides(
            { "Navigation Mobile Fill": { value: transition3 } },
            baseVariant,
            gestureVariant,
          )}
        >
          <motion.div
            className={styles.container}
            data-name="Container"
            layoutDependency={layoutDependency}
            layoutId="Container"
            style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            variants={{
              "Navigation Desktop Fill": { backgroundColor: "rgb(255, 255, 255)" },
              "Navigation Mobile Open Fill": { backgroundColor: "rgb(255, 255, 255)" },
              "Navigation Mobile Open": { backgroundColor: "rgb(255, 255, 255)" },
              "Navigation Mobile Fill": { backgroundColor: "rgb(255, 255, 255)" },
              "Navigation Tablet Fill": { backgroundColor: "rgb(255, 255, 255)" },
            }}
          >
            <motion.div
              className={styles.menu}
              data-name="Menu"
              layoutDependency={layoutDependency}
              layoutId="Menu"
            >
              <Link href="/" motionChild nodeId="Logo">
                <motion.a
                  className={cx(styles.logo, styles.logo2)}
                  data-name="Logo"
                  layoutDependency={layoutDependency}
                  layoutId="Logo"
                >
                  <RichText
                    children={
                      <>
                        <motion.p className="text-body-logo">Aref Zebian</motion.p>
                      </>
                    }
                    className={styles.luca}
                    data-name="Luca"
                    fonts={["Inter"]}
                    layoutDependency={layoutDependency}
                    layoutId="Luca"
                    variants={{
                      "Navigation Desktop Fill": { "--luca-text-color": "rgb(0, 0, 0)" },
                      "Navigation Mobile Open Fill": { "--luca-text-color": "rgb(0, 0, 0)" },
                      "Navigation Mobile Open": { "--luca-text-color": "rgb(0, 0, 0)" },
                      "Navigation Mobile Fill": { "--luca-text-color": "rgb(0, 0, 0)" },
                      "Navigation Tablet Fill": { "--luca-text-color": "rgb(0, 0, 0)" },
                    }}
                    verticalAlignment="top"
                    withExternalLayout
                    {...addPropertyOverrides(
                      {
                        "Navigation Desktop Fill": {
                          children: (
                            <>
                              <motion.p
                                className="text-body-logo"
                                dir="auto"
                                style={{ "--df-text-color": "var(--luca-text-color, rgb(0, 0, 0))" }}
                              >
                                Aref Zebian
                              </motion.p>
                            </>
                          ),
                        },
                        "Navigation Mobile Open Fill": {
                          children: (
                            <>
                              <motion.p
                                className="text-body-logo"
                                dir="auto"
                                style={{ "--df-text-color": "var(--luca-text-color, rgb(0, 0, 0))" }}
                              >
                                Aref Zebian
                              </motion.p>
                            </>
                          ),
                        },
                        "Navigation Mobile Open": {
                          children: (
                            <>
                              <motion.p
                                className="text-body-logo"
                                dir="auto"
                                style={{ "--df-text-color": "var(--luca-text-color, rgb(0, 0, 0))" }}
                              >
                                Aref Zebian
                              </motion.p>
                            </>
                          ),
                        },
                        "Navigation Mobile Fill": {
                          children: (
                            <>
                              <motion.p
                                className="text-body-logo"
                                dir="auto"
                                style={{ "--df-text-color": "var(--luca-text-color, rgb(0, 0, 0))" }}
                              >
                                Aref Zebian
                              </motion.p>
                            </>
                          ),
                        },
                        "Navigation Tablet Fill": {
                          children: (
                            <>
                              <motion.p
                                className="text-body-logo"
                                dir="auto"
                                style={{ "--df-text-color": "var(--luca-text-color, rgb(0, 0, 0))" }}
                              >
                                Aref Zebian
                              </motion.p>
                            </>
                          ),
                        },
                      },
                      baseVariant,
                      gestureVariant,
                    )}
                  />
                </motion.a>
              </Link>
              <motion.div
                className={styles.menuLinks}
                data-name="Links"
                layoutDependency={layoutDependency}
                layoutId="Links"
              >
                {isDisplayed() && (
                  <motion.div
                    className={styles.linkGroup}
                    data-name="Link Group"
                    layoutDependency={layoutDependency}
                    layoutId="Link Group"
                  >
                    <ComponentViewportProvider
                      height={16}
                      y={viewportY + (viewportHeight - 67.4365) / 2 + 20 + 0.2183 + 5.5}
                    >
                      <SmartComponentScopedContainer
                        className={styles.textLink}
                        layoutDependency={layoutDependency}
                        layoutId="TextLink container"
                        rendersWithMotion
                      >
                        <TextLink
                          link="/works/grid-view"
                          height="100%"
                          layoutId="TextLink"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="WORK"
                          color="rgb(255, 255, 255)"
                          {...addPropertyOverrides(
                            {
                              "Navigation Desktop Fill": { link: "/works/grid-view", color: "rgb(0, 0, 0)" },
                              "Navigation Tablet": { link: "/works/grid-view" },
                              "Navigation Tablet Fill": { link: "/works/grid-view", color: "rgb(0, 0, 0)" },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </SmartComponentScopedContainer>
                    </ComponentViewportProvider>
                    <ComponentViewportProvider
                      height={16}
                      y={viewportY + (viewportHeight - 67.4365) / 2 + 20 + 0.2183 + 5.5}
                    >
                      <SmartComponentScopedContainer
                        className={styles.textLink2}
                        layoutDependency={layoutDependency}
                        layoutId="TextLink 2 container"
                        rendersWithMotion
                      >
                        <TextLink
                          link="/about"
                          height="100%"
                          layoutId="TextLink 2"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="ABOUT"
                          color="rgb(255, 255, 255)"
                          {...addPropertyOverrides(
                            {
                              "Navigation Desktop Fill": { link: "/about", color: "rgb(0, 0, 0)" },
                              "Navigation Tablet": { link: "/about" },
                              "Navigation Tablet Fill": { link: "/about", color: "rgb(0, 0, 0)" },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </SmartComponentScopedContainer>
                    </ComponentViewportProvider>
                    <ComponentViewportProvider
                      height={16}
                      y={viewportY + (viewportHeight - 67.4365) / 2 + 20 + 0.2183 + 5.5}
                    >
                      <SmartComponentScopedContainer
                        className={styles.textLink3}
                        layoutDependency={layoutDependency}
                        layoutId="TextLink 3 container"
                        rendersWithMotion
                      >
                        <TextLink
                          link="/playground"
                          height="100%"
                          layoutId="TextLink 3"
                          variant={matchVariant("Default")}
                          newTab={false}
                          width="100%"
                          label="Playground"
                          color="rgb(255, 255, 255)"
                          {...addPropertyOverrides(
                            {
                              "Navigation Desktop Fill": { link: "/playground", color: "rgb(0, 0, 0)" },
                              "Navigation Tablet": { link: "/playground" },
                              "Navigation Tablet Fill": { link: "/playground", color: "rgb(0, 0, 0)" },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </SmartComponentScopedContainer>
                    </ComponentViewportProvider>
                  </motion.div>
                )}
                {isDisplayed() && (
                  <ComponentViewportProvider
                    height={15}
                    y={viewportY + (viewportHeight - 67.4365) / 2 + 20 + 0.2183 + 6}
                  >
                    <SmartComponentScopedContainer
                      className={styles.contactButton}
                      layoutDependency={layoutDependency}
                      layoutId="ContactButton container"
                      rendersWithMotion
                    >
                      <ContactButton
                        label="get in touch"
                        link="/contact"
                        height="100%"
                        layoutId="ContactButton"
                        variant={matchVariant("Variant 1")}
                        width="100%"
                        color="rgb(255, 255, 255)"
                        {...addPropertyOverrides(
                          {
                            "Navigation Desktop Fill": { link: "/contact", color: "rgb(0, 0, 0)" },
                            "Navigation Tablet": { link: "/contact" },
                            "Navigation Tablet Fill": { link: "/contact", color: "rgb(0, 0, 0)" },
                          },
                          baseVariant,
                          gestureVariant,
                        )}
                      />
                    </SmartComponentScopedContainer>
                  </ComponentViewportProvider>
                )}
                {isDisplayed1() && (
                  <motion.div
                    className={styles.frame}
                    data-highlight
                    layoutDependency={layoutDependency}
                    layoutId="layer"
                    onTap={onTap}
                    {...addPropertyOverrides(
                      {
                        "Navigation Mobile Open Fill": { onTap: onTapNavigationMobileOpenFill },
                        "Navigation Mobile Open": { onTap: onTapNavigationMobileOpen },
                        "Navigation Mobile Fill": { onTap: onTapNavigationMobileFill },
                      },
                      baseVariant,
                      gestureVariant,
                    )}
                  >
                    {isDisplayed1() && (
                      <ComponentViewportProvider
                        {...addPropertyOverrides(
                          {
                            "Navigation Mobile Open Fill": {
                              height: 28,
                              width: "28px",
                              y: viewportY + (viewportHeight - 1000) / 2 + 20 + 0.2183 + -0.5 + 0,
                            },
                            "Navigation Mobile": {
                              height: 28,
                              width: "28px",
                              y: viewportY + (viewportHeight - 70) / 2 + 20 + 0.2183 + -0.5 + 0,
                            },
                            "Navigation Mobile Open": {
                              height: 28,
                              width: "28px",
                              y: viewportY + (viewportHeight - 1000) / 2 + 20 + 0.2183 + -0.5 + 0,
                            },
                            "Navigation Mobile Fill": {
                              height: 28,
                              width: "28px",
                              y: viewportY + (viewportHeight - 70) / 2 + 20 + 0.2183 + -0.5 + 0,
                            },
                          },
                          baseVariant,
                          gestureVariant,
                        )}
                      >
                        <SmartComponentScopedContainer
                          className={styles.menuHamburgerMobile}
                          layoutDependency={layoutDependency}
                          layoutId="MenuHamburgerMobile container"
                          rendersWithMotion
                        >
                          <MenuHamburgerMobile
                            background="rgb(255, 255, 255)"
                            height="100%"
                            layoutId="MenuHamburgerMobile"
                            style={{ height: "100%", width: "100%" }}
                            variant={matchVariant("Menu")}
                            width="100%"
                            {...addPropertyOverrides(
                              {
                                "Navigation Mobile Open Fill": {
                                  background: "rgb(0, 0, 0)",
                                  variant: matchVariant("Close"),
                                },
                                "Navigation Mobile Open": {
                                  background: "rgb(0, 0, 0)",
                                  variant: matchVariant("Close"),
                                },
                                "Navigation Mobile Fill": { background: "rgb(0, 0, 0)" },
                              },
                              baseVariant,
                              gestureVariant,
                            )}
                          />
                        </SmartComponentScopedContainer>
                      </ComponentViewportProvider>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            {isDisplayed2() && (
              <motion.div
                className={styles.menuMobile}
                data-name="Menu Mobile"
                layoutDependency={layoutDependency}
                layoutId="Menu Mobile"
              >
                <motion.div
                  className={styles.menuMobileLinks}
                  data-name="Links"
                  layoutDependency={layoutDependency}
                  layoutId="Links 2"
                >
                  <motion.div
                    className={styles.linkGroup2}
                    data-name="Link Group"
                    layoutDependency={layoutDependency}
                    layoutId="Link Group 2"
                  >
                    <Link href="/works/grid-view" motionChild nodeId="link">
                      <motion.a
                        className={cx(styles.link, styles.logo2)}
                        layoutDependency={layoutDependency}
                        layoutId="layer 2"
                      >
                        <RichTextWithFXWithOptimizedAppearEffect
                          children={
                            <>
                              <motion.p className="text-body-navigation-link-mobile">work</motion.p>
                            </>
                          }
                          className={styles.work}
                          data-appear-id="1j0jom9"
                          data-name="work"
                          fonts={["Inter"]}
                          layoutDependency={layoutDependency}
                          layoutId="work"
                          style={{ "--df-paragraph-spacing": "0px" }}
                          variants={{
                            "Navigation Mobile Open Fill": { "--work-text-color": "rgb(0, 0, 0)" },
                            "Navigation Mobile Open": { "--work-text-color": "rgb(0, 0, 0)" },
                          }}
                          verticalAlignment="top"
                          withExternalLayout
                          {...addPropertyOverrides(
                            {
                              "Navigation Mobile Open Fill": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      style={{ "--df-text-color": "var(--work-text-color, rgb(0, 0, 0))" }}
                                    >
                                      work
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                              "Navigation Mobile Open": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      style={{ "--df-text-color": "var(--work-text-color, rgb(0, 0, 0))" }}
                                    >
                                      work
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </motion.a>
                    </Link>
                    <Link href="/about" motionChild nodeId="link">
                      <motion.a
                        className={cx(styles.link2, styles.logo2)}
                        layoutDependency={layoutDependency}
                        layoutId="layer 3"
                      >
                        <RichTextWithFXWithOptimizedAppearEffect
                          children={
                            <>
                              <motion.p className="text-body-navigation-link-mobile">About</motion.p>
                            </>
                          }
                          className={styles.about}
                          data-appear-id="1vt40wq"
                          data-name="About"
                          fonts={["Inter"]}
                          layoutDependency={layoutDependency}
                          layoutId="About"
                          style={{ "--df-paragraph-spacing": "0px" }}
                          variants={{
                            "Navigation Mobile Open Fill": { "--about-text-color": "rgb(0, 0, 0)" },
                            "Navigation Mobile Open": { "--about-text-color": "rgb(0, 0, 0)" },
                          }}
                          verticalAlignment="top"
                          withExternalLayout
                          {...addPropertyOverrides(
                            {
                              "Navigation Mobile Open Fill": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation2,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      style={{ "--df-text-color": "var(--about-text-color, rgb(0, 0, 0))" }}
                                    >
                                      About
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                              "Navigation Mobile Open": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation2,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      style={{ "--df-text-color": "var(--about-text-color, rgb(0, 0, 0))" }}
                                    >
                                      About
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </motion.a>
                    </Link>
                    <Link href="/playground" motionChild nodeId="link">
                      <motion.a
                        className={cx(styles.link3, styles.logo2)}
                        layoutDependency={layoutDependency}
                        layoutId="layer 4"
                      >
                        <RichTextWithFXWithOptimizedAppearEffect
                          children={
                            <>
                              <motion.p className="text-body-navigation-link-mobile">playground</motion.p>
                            </>
                          }
                          className={styles.news}
                          data-appear-id="24imz0"
                          data-name="news"
                          fonts={["Inter"]}
                          layoutDependency={layoutDependency}
                          layoutId="news"
                          style={{ "--df-paragraph-spacing": "0px" }}
                          variants={{
                            "Navigation Mobile Open Fill": { "--news-text-color": "rgb(0, 0, 0)" },
                            "Navigation Mobile Open": { "--news-text-color": "rgb(0, 0, 0)" },
                          }}
                          verticalAlignment="top"
                          withExternalLayout
                          {...addPropertyOverrides(
                            {
                              "Navigation Mobile Open Fill": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation3,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      dir="auto"
                                      style={{ "--df-text-color": "var(--news-text-color, rgb(0, 0, 0))" }}
                                    >
                                      playground
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                              "Navigation Mobile Open": {
                                __perspectiveFX: false,
                                __smartComponentFX: true,
                                __targetOpacity: 1,
                                animate: animation3,
                                children: (
                                  <>
                                    <motion.p
                                      className="text-body-navigation-link-mobile"
                                      dir="auto"
                                      style={{ "--df-text-color": "var(--news-text-color, rgb(0, 0, 0))" }}
                                    >
                                      playground
                                    </motion.p>
                                  </>
                                ),
                                initial: animation1,
                                optimized: true,
                              },
                            },
                            baseVariant,
                            gestureVariant,
                          )}
                        />
                      </motion.a>
                    </Link>
                  </motion.div>
                  <motion.div
                    className={styles.frame2}
                    layoutDependency={layoutDependency}
                    layoutId="layer 5"
                  >
                    <ComponentViewportProvider
                      height={15}
                      {...addPropertyOverrides(
                        {
                          "Navigation Mobile Open Fill": {
                            y: viewportY + (viewportHeight - 1000) / 2 + 20 + 117.4365 + 176.85,
                          },
                          "Navigation Mobile Open": {
                            y: viewportY + (viewportHeight - 1000) / 2 + 20 + 117.4365 + 176.85,
                          },
                        },
                        baseVariant,
                        gestureVariant,
                      )}
                    >
                      <SmartComponentScopedContainerWithFXWithOptimizedAppearEffect
                        __perspectiveFX={false}
                        __smartComponentFX
                        __targetOpacity={1}
                        animate={animation4}
                        className={styles.contactButton2}
                        data-appear-id="19znw9i"
                        initial={animation1}
                        layoutDependency={layoutDependency}
                        layoutId="ContactButton 2 container"
                        optimized
                        rendersWithMotion
                      >
                        <ContactButton
                          label="get in touch"
                          link="/contact"
                          height="100%"
                          layoutId="ContactButton 2"
                          variant={matchVariant("Variant 1")}
                          width="100%"
                          color="rgb(0, 0, 0)"
                        />
                      </SmartComponentScopedContainerWithFXWithOptimizedAppearEffect>
                    </ComponentViewportProvider>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </Transition>
        <ComponentViewportProvider>
          <SmartComponentScopedContainer
            className={styles.stopScroll}
            isAuthoredByUser
            isModuleExternal
            layoutDependency={layoutDependency}
            layoutId="StopScrollModule container"
            nodeId="StopScrollModule"
            rendersWithMotion
            scopeId="NavigationNEW"
            style={{ opacity: 0 }}
          >
            <StopScroll
              height="100%"
              id="StopScrollModule"
              layoutId="StopScrollModule"
              toggle={false}
              width="100%"
              {...addPropertyOverrides(
                {
                  "Navigation Mobile Open Fill": { toggle: true },
                  "Navigation Mobile Open": { toggle: true },
                },
                baseVariant,
                gestureVariant,
              )}
            />
          </SmartComponentScopedContainer>
        </ComponentViewportProvider>
      </motion.nav>
    </VariantScope>
  );
});

export default NavigationNEW;

NavigationNEW.displayName = "Navigation";

NavigationNEW.defaultProps = { height: 67, width: 1200 };

NavigationNEW.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [
        () => forwardLoader(TextLink, {}, context),
        () => forwardLoader(ContactButton, {}, context),
        () => forwardLoader(MenuHamburgerMobile, {}, context),
      ],
      context,
    );
  },
};
