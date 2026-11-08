"use client";

import "@/styles/fonts/inter.css";
import styles from "./contact-unused.module.css";
import {
  asPage,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getLoadingLazyAtYPosition,
  getRootLayoutProp,
  HTMLStyle,
  Image as Image1,
  matchVariant,
  PropertyOverrides,
  RichText,
  runTasksWithYield,
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  withOptimizedAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import AdressLink from "@/components/adress-link";
import LinkOpacity from "@/components/link-opacity";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";
import * as body15 from "@/styles/text/body-15";

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-contact-unused-phone",
  Tablet: "hidden-contact-unused-tablet",
  Desktop: "hidden-desktop",
};

const transition1 = { delay: 0.2, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition1,
  x: 0,
  y: 0,
} as const;

const animation1 = {
  opacity: 1,
  rotate: -2,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 50,
};

const transition2 = { delay: 0.3, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation2 = {
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

const transition3 = { delay: 0.4, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation3 = {
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

const animation4 = {
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

const transition4 = { delay: 0.5, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation5 = {
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

const transition5 = { delay: 0.6, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation6 = {
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

const transition6 = { delay: 0.7, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation7 = {
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

const transition7 = { delay: 0.9, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation8 = {
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

const transition8 = { delay: 1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation9 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition8,
  x: 0,
  y: 0,
} as const;

const transition9 = { delay: 1.1, duration: 1, ease: [0.23, 0.98, 0.56, 1], type: "tween" } as const;

const animation10 = {
  opacity: 0.4,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: transition9,
  x: 0,
  y: 0,
} as const;

const transition10 = { delay: 1.7, duration: 0.7, ease: [0.12, 0.23, 0.13, 0.96], type: "tween" } as const;

const animation11 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  transition: transition10,
  x: 0,
  y: 0,
} as const;

const animation12 = {
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transformPerspective: 1200,
  x: 0,
  y: 50,
};

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Desktop",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Desktop" | "Phone" | "Tablet";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ContactUnusedPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body40.className, body13Uppercase.className, body15.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const componentScopeId = "g9xuD5gcz";

  useCustomCursors({});

  return (
    <GeneratedComponentContext.Provider
      value={{
        activeVariantId: baseVariant,
        humanReadableVariantMap: { Desktop: "Desktop", Phone: "Phone", Tablet: "Tablet" },
        primaryVariantId: "Desktop",
        hiddenClassNames,
      }}
    >
      <LayoutGroup id={layoutId ?? componentScopeId}>
        <HTMLStyle value="html body { background: rgb(255, 255, 255); }" />
        <motion.div
          {...restProps}
          className={cx(scopingClassNames, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div className={styles.sectionContact} data-name="Section Contact">
              <div className={styles.heading} data-name="Heading">
                <div className={styles.frame}>
                  <RichTextWithOptimizedAppearEffect
                    animate={animation}
                    className={styles.letSConnect}
                    data-appear-id="l01jyo"
                    data-name="Let’s connect and bring your ideas to life"
                    fonts={["Inter"]}
                    initial={animation1}
                    optimized
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        Let’s connect and bring
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
                <div className={styles.frame2}>
                  <RichTextWithOptimizedAppearEffect
                    animate={animation2}
                    className={styles.letSConnect2}
                    data-appear-id="d8slij"
                    data-name="Let’s connect and bring your ideas to life"
                    fonts={["Inter"]}
                    initial={animation1}
                    optimized
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        your ideas to life
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
              </div>
              <div className={styles.sectionContactFrame}>
                <div className={styles.contact} data-name="Contact">
                  <div className={styles.frame3}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation3}
                      className={styles.contact2}
                      data-appear-id="1wn8qzu"
                      data-name="CONTACT"
                      fonts={["Inter"]}
                      initial={animation4}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">CONTACT</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <div className={styles.frame4}>
                    <div className={styles.frame5}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 833.05 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 893.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation5}
                            className={styles.linkOpacity}
                            data-appear-id="uuu5lo"
                            initial={animation4}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="tel:+4523456789"
                              label="+45 123 456 789"
                              variant={matchVariant("Variant 3")}
                              width="100%"
                              color="rgb(0, 0, 0)"
                            />
                          </ContainerWithOptimizedAppearEffect>
                        </ComponentViewportProvider>
                      </PropertyOverrides>
                    </div>
                    <div className={styles.frame6}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 850.05 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 910.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation6}
                            className={styles.linkOpacity2}
                            data-appear-id="f1xgtp"
                            initial={animation4}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="mailto:hello@lucastudio.com"
                              label="hello@lucastudio.com"
                              variant={matchVariant("Variant 3")}
                              width="100%"
                              color="rgb(0, 0, 0)"
                            />
                          </ContainerWithOptimizedAppearEffect>
                        </ComponentViewportProvider>
                      </PropertyOverrides>
                    </div>
                  </div>
                </div>
                <div className={styles.socials} data-name="Socials">
                  <div className={styles.frame7}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation5}
                      className={styles.socials2}
                      data-appear-id="pxwt6e"
                      data-name="socials"
                      fonts={["Inter"]}
                      initial={animation4}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">socials</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <div className={styles.frame8}>
                    <div className={styles.frame9}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 990.1 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 893.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation6}
                            className={styles.linkOpacity3}
                            data-appear-id="ao87jh"
                            initial={animation4}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="https://www.instagram.com/ena.supply/"
                              label="Instagram"
                              variant={matchVariant("Variant 3")}
                              width="100%"
                              color="rgb(0, 0, 0)"
                            />
                          </ContainerWithOptimizedAppearEffect>
                        </ComponentViewportProvider>
                      </PropertyOverrides>
                    </div>
                    <div className={styles.frame10}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 1007.1 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 910.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation7}
                            className={styles.linkOpacity4}
                            data-appear-id="gn01ok"
                            initial={animation4}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="https://www.linkedin.com/company/ena-supply"
                              label="LinkedIn"
                              variant={matchVariant("Variant 3")}
                              width="100%"
                              color="rgb(0, 0, 0)"
                            />
                          </ContainerWithOptimizedAppearEffect>
                        </ComponentViewportProvider>
                      </PropertyOverrides>
                    </div>
                  </div>
                </div>
                <div className={styles.address} data-name="Address">
                  <div className={styles.addressFrame}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation7}
                      className={styles.address2}
                      data-appear-id="1tl9ga6"
                      data-name="Address"
                      fonts={["Inter"]}
                      initial={animation4}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">Address</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{ Phone: { y: viewportY + 1147.15 } }}
                  >
                    <ComponentViewportProvider height={34} y={viewportY + 893.05}>
                      <Container className={styles.adressLink}>
                        <AdressLink
                          link="https://www.google.com/maps"
                          height="100%"
                          line2="Copenhagen, Denmark, 1051"
                          line1="12 Nyhavn Street"
                          variant={matchVariant("Variant 1")}
                          width="100%"
                        />
                      </Container>
                    </ComponentViewportProvider>
                  </PropertyOverrides>
                </div>
                <div className={styles.studioHours} data-name="Studio Hours">
                  <div className={styles.frame11}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation8}
                      className={styles.studioHours2}
                      data-appear-id="ut8t0x"
                      data-name="Studio Hours"
                      fonts={["Inter"]}
                      initial={animation4}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">Studio Hours</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <div className={styles.frame12}>
                    <div className={styles.frame13}>
                      <RichTextWithOptimizedAppearEffect
                        animate={animation9}
                        className={styles.mondayToFriday9}
                        data-appear-id="1ie98zu"
                        data-name={"Monday to Friday: 9:00 AM – 6:00 PM Saturday & Sunday: Closed"}
                        fonts={["Inter"]}
                        initial={animation4}
                        optimized
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-15">Monday to Friday: 9:00 AM – 6:00 PM</p>
                        </>
                      </RichTextWithOptimizedAppearEffect>
                    </div>
                    <div className={styles.frame14}>
                      <RichTextWithOptimizedAppearEffect
                        animate={animation10}
                        className={styles.mondayToFriday9_2}
                        data-appear-id="8gtigw"
                        data-name={"Monday to Friday: 9:00 AM – 6:00 PM Saturday & Sunday: Closed"}
                        fonts={["Inter"]}
                        initial={animation4}
                        optimized
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-15">Saturday &amp; Sunday: Closed</p>
                        </>
                      </RichTextWithOptimizedAppearEffect>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.imageWrapper} data-name="Image Wrapper">
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{
                  Phone: {
                    background: {
                      alt: "",
                      fit: "fill",
                      loading: getLoadingLazyAtYPosition(viewportY + 1498.2),
                      pixelHeight: 900,
                      pixelWidth: 1440,
                      sizes: viewportWidth,
                      src: "https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?width=1440&height=900",
                      srcSet:
                        "https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?scale-down-to=512&width=1440&height=900 512w,https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?scale-down-to=1024&width=1440&height=900 1024w,https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?width=1440&height=900 1440w",
                    },
                  },
                }}
              >
                <Image1
                  background={{
                    alt: "",
                    fit: "fill",
                    loading: getLoadingLazyAtYPosition(viewportY + 1087.05),
                    pixelHeight: 900,
                    pixelWidth: 1440,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?width=1440&height=900",
                    srcSet:
                      "https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?scale-down-to=512&width=1440&height=900 512w,https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?scale-down-to=1024&width=1440&height=900 1024w,https://framerusercontent.com/images/goSfdNvMLojmpwY0VpjnO1V4PI.jpg?width=1440&height=900 1440w",
                  }}
                  className={styles.image}
                  data-name="Image"
                />
              </PropertyOverrides>
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(ContactUnusedPage);

ContactUnusedPage.displayName = "Contact";

ContactUnusedPage.defaultProps = { height: 912, width: 1200 };

ContactUnusedPage.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [
        () => forwardLoader(LinkOpacity, {}, context),
        () => forwardLoader(AdressLink, {}, context),
      ],
      context,
    );
  },
};
