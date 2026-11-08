"use client";

import "@/styles/fonts/inter.css";
import styles from "./contact.module.css";
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
import { revealHidden, revealRest, revealTransition } from "@/lib/motion/presets";
import LinkOpacity from "@/components/link-opacity";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body40 from "@/styles/text/body-40";

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const ContainerWithOptimizedAppearEffect = withOptimizedAppearEffect(Container);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-contact-tablet",
  Phone: "hidden-contact-phone",
  Desktop: "hidden-desktop",
};

const transition1 = { delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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
  y: 8,
};

const transition2 = { delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const animation3 = {
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 8,
};

const transition3 = { delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

const animation4 = {
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

const transition4 = { delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const transition5 = { delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const ContactPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body40.className, body13Uppercase.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const componentScopeId = "cCl0_3fpG";

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
                <div className={styles.headingFrame}>
                  <RichTextWithOptimizedAppearEffect
                    animate={animation}
                    className={styles.letSConnect}
                    data-appear-id="hxmxcc"
                    data-name="Let’s connect and bring your ideas to life"
                    fonts={["Inter"]}
                    initial={animation1}
                    optimized
                    verticalAlignment="top"
                    withExternalLayout
                  >
                    <>
                      <p className="text-body-40" dir="auto" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                        Get intouch with me.
                      </p>
                    </>
                  </RichTextWithOptimizedAppearEffect>
                </div>
              </div>
              <div className={styles.sectionContactFrame}>
                <div className={styles.contact} data-name="Contact">
                  <div className={styles.frame}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation2}
                      className={styles.contact2}
                      data-appear-id="phfr91"
                      data-name="CONTACT"
                      fonts={["Inter"]}
                      initial={animation3}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">CONTACT</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <div className={styles.frame2}>
                    <div className={styles.frame3}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 593.05 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 653.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation4}
                            className={styles.contactLinkOpacity}
                            data-appear-id="13nonq9"
                            initial={animation3}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="arefzebian@gmail.com"
                              label="arefzebian@gmail.com"
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
                  <div className={styles.frame4}>
                    <RichTextWithOptimizedAppearEffect
                      animate={animation5}
                      className={styles.socials2}
                      data-appear-id="18wwdpg"
                      data-name="socials"
                      fonts={["Inter"]}
                      initial={animation3}
                      optimized
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-13-uppercase">socials</p>
                      </>
                    </RichTextWithOptimizedAppearEffect>
                  </div>
                  <div className={styles.frame5}>
                    <div className={styles.frame6}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 733.1 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 653.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation4}
                            className={styles.linkOpacity}
                            data-appear-id="1pdhp87"
                            initial={animation3}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="http://instagram.com/aref.zeb/"
                              label="Instagram"
                              variant={matchVariant("Variant 3")}
                              width="100%"
                              color="rgb(0, 0, 0)"
                            />
                          </ContainerWithOptimizedAppearEffect>
                        </ComponentViewportProvider>
                      </PropertyOverrides>
                    </div>
                    <div className={styles.frame7}>
                      <PropertyOverrides
                        breakpoint={baseVariant}
                        overrides={{ Phone: { y: viewportY + 750.1 } }}
                      >
                        <ComponentViewportProvider height={15} y={viewportY + 670.05}>
                          <ContainerWithOptimizedAppearEffect
                            animate={animation6}
                            className={styles.linkOpacity2}
                            data-appear-id="1aq1k1p"
                            initial={animation3}
                            optimized
                            rendersWithMotion
                          >
                            <LinkOpacity
                              height="100%"
                              newTab
                              link="https://www.linkedin.com/in/aref-zebian-b0375a26b"
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
                <div className={styles.container} data-name="Container">
                  <div className={styles.officeLocation} data-name="Office Location">
                    <div className={styles.socials3} data-name="Socials">
                      <div className={styles.frame8}>
                        <RichTextWithOptimizedAppearEffect
                          animate={animation5}
                          className={styles.socials4}
                          data-appear-id="gejga0"
                          data-name="socials"
                          fonts={["Inter"]}
                          initial={animation3}
                          optimized
                          verticalAlignment="top"
                          withExternalLayout
                        >
                          <>
                            <p className="text-body-13-uppercase" dir="auto">
                              Location
                            </p>
                          </>
                        </RichTextWithOptimizedAppearEffect>
                      </div>
                      <div className={styles.frame9}>
                        <div className={styles.frame10}>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { y: viewportY + 890.15 } }}
                          >
                            <ComponentViewportProvider height={15} y={viewportY + 653.05}>
                              <ContainerWithOptimizedAppearEffect
                                animate={animation4}
                                className={styles.linkOpacity3}
                                data-appear-id="1f8id9c"
                                initial={animation3}
                                optimized
                                rendersWithMotion
                              >
                                <LinkOpacity
                                  height="100%"
                                  newTab
                                  link="www.leadoffstudio.com"
                                  label="Currently based in NYC"
                                  variant={matchVariant("Variant 3")}
                                  width="100%"
                                  color="rgb(0, 0, 0)"
                                />
                              </ContainerWithOptimizedAppearEffect>
                            </ComponentViewportProvider>
                          </PropertyOverrides>
                        </div>
                        <div className={styles.frame11}>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Phone: { y: viewportY + 907.15 } }}
                          >
                            <ComponentViewportProvider height={15} y={viewportY + 670.05}>
                              <ContainerWithOptimizedAppearEffect
                                animate={animation6}
                                className={styles.linkOpacity4}
                                data-appear-id="111sprp"
                                initial={animation3}
                                optimized
                                rendersWithMotion
                              >
                                <LinkOpacity
                                  height="100%"
                                  newTab
                                  link="https://leadoffstudio.com/"
                                  label="building at Leadoff Studio"
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
                      intrinsicHeight: 4000,
                      intrinsicWidth: 6000,
                      loading: getLoadingLazyAtYPosition(viewportY + 964.15),
                      pixelHeight: 4000,
                      pixelWidth: 6000,
                      sizes: viewportWidth,
                      src: "https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?width=6000&height=4000",
                      srcSet:
                        "https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=512&width=6000&height=4000 512w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=1024&width=6000&height=4000 1024w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=2048&width=6000&height=4000 2048w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=4096&width=6000&height=4000 4096w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?width=6000&height=4000 6000w",
                    },
                  },
                }}
              >
                <Image1
                  background={{
                    alt: "",
                    fit: "fill",
                    intrinsicHeight: 4000,
                    intrinsicWidth: 6000,
                    loading: getLoadingLazyAtYPosition(viewportY + 727.05),
                    pixelHeight: 4000,
                    pixelWidth: 6000,
                    sizes: viewportWidth,
                    src: "https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?width=6000&height=4000",
                    srcSet:
                      "https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=512&width=6000&height=4000 512w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=1024&width=6000&height=4000 1024w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=2048&width=6000&height=4000 2048w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?scale-down-to=4096&width=6000&height=4000 4096w,https://framerusercontent.com/images/6XpzL542u9rAR1JaiinRcqmWdJs.jpg?width=6000&height=4000 6000w",
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

export default asPage(ContactPage);

ContactPage.displayName = "Contact";

ContactPage.defaultProps = { height: 864, width: 1200 };

ContactPage.loader = {
  load: (props, context) => {
    return runTasksWithYield([() => forwardLoader(LinkOpacity, {}, context)], context);
  },
};
