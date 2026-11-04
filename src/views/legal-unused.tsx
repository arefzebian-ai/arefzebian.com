"use client";

import "@/styles/fonts/inter.css";
import styles from "./legal-unused.module.css";
import {
  asPage,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getRootLayoutProp,
  HTMLStyle,
  inBrowser,
  Link,
  matchVariant,
  PropertyOverrides,
  RichText,
  runTasksWithYield,
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  withOptimizedAppearEffect,
  withVariantAppearEffect,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import GlobalLineAnimationGlobal from "@/components/global/line-animation-global";
import LegalPageLink from "@/components/legal-page-link";
import * as body20 from "@/styles/text/body-20";
import * as body17 from "@/styles/text/body-17";
import * as h1 from "@/styles/text/h1";
import * as link from "@/styles/text/link";

const GlobalLineAnimationGlobalWithVariantAppearEffect = withVariantAppearEffect(GlobalLineAnimationGlobal);
const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);
const LegalPageLinkWithVariantAppearEffect = withVariantAppearEffect(LegalPageLink);
const MotionDivWithOptimizedAppearEffect = withOptimizedAppearEffect(motion.div);

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-legal-unused-phone",
  Tablet: "hidden-legal-unused-tablet",
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
  y: 50,
};

const transition2 = { delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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
  opacity: 0.001,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  x: 0,
  y: 50,
};

const transition3 = { delay: 0.7, duration: 1.5, ease: [0.16, 1, 0.3, 1], type: "tween" } as const;

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

const LegalUnusedPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, h1.className, body20.className, body17.className, link.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const isDisplayed = () => {
    if (!inBrowser()) return true;
    if (baseVariant === "Phone") return false;
    return true;
  };

  const ref1 = React.useRef<HTMLDivElement>(null);

  const ref2 = React.useRef<HTMLDivElement>(null);

  const ref3 = React.useRef<HTMLDivElement>(null);

  const ref4 = React.useRef<HTMLDivElement>(null);

  const ref5 = React.useRef<HTMLDivElement>(null);

  const componentScopeId = "t5yRrErbh";

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
            <div className={styles.heading} data-name="Heading">
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{ Phone: { width: `calc(${viewportWidth} - 30px)` } }}
              >
                <ComponentViewportProvider
                  height={1}
                  width={`calc(${viewportWidth} - 40px)`}
                  y={viewportY + 150}
                >
                  <Container className={styles.globalLineAnimationGlobal} rendersWithMotion>
                    <GlobalLineAnimationGlobalWithVariantAppearEffect
                      __fx_animateOnce
                      __fx_obscuredVariantId="Line Animation"
                      __fx_threshold={0.5}
                      __fx_variantAppearEffectEnabled
                      __fx_visibleVariantId="Line Animation Active"
                      height="100%"
                      colour="rgba(0, 0, 0, 0.1)"
                      style={{ height: "100%", width: "100%" }}
                      variant={matchVariant("Line Animation Active")}
                      width="100%"
                    />
                  </Container>
                </ComponentViewportProvider>
              </PropertyOverrides>
              <div className={styles.heading2} data-name="Heading">
                <RichTextWithOptimizedAppearEffect
                  animate={animation}
                  className={styles.legal}
                  data-appear-id="1a2n2t6"
                  data-name="Legal"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h1 className="text-h1" style={{ "--df-text-color": "rgb(0, 0, 0)" }}>
                      Legal
                    </h1>
                  </>
                </RichTextWithOptimizedAppearEffect>
              </div>
            </div>
            <div className={styles.sectionLegal} data-name="Section Legal">
              <div className={styles.container} data-name="Container">
                {isDisplayed() && (
                  <MotionDivWithOptimizedAppearEffect
                    animate={animation2}
                    className={cx(styles.leftSticky, "hidden-legal-unused-phone")}
                    data-appear-id="vf89s0"
                    data-name="Left Sticky"
                    initial={animation3}
                    optimized
                  >
                    <div className={styles.navigation} data-name="Navigation">
                      <ComponentViewportProvider height={23} y={viewportY + 350.44}>
                        <Container className={styles.legalPageLink} rendersWithMotion>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Tablet: { link: "/legal-unused#tos" } }}
                          >
                            <LegalPageLinkWithVariantAppearEffect
                              __fx_animateOnce={false}
                              __fx_targets={[
                                { ref: ref1, target: "Legal Link Active" },
                                { ref: ref2, target: "Legal Link Un-Active" },
                              ]}
                              __fx_threshold={0.5}
                              __fx_variantAppearEffectEnabled
                              height="100%"
                              title={"01 Terms & Conditions"}
                              link="/legal-unused#tos"
                              variant={matchVariant("Legal Link Active")}
                              width="100%"
                            />
                          </PropertyOverrides>
                        </Container>
                      </ComponentViewportProvider>
                      <ComponentViewportProvider height={23} y={viewportY + 378.44}>
                        <Container className={styles.legalPageLink2} rendersWithMotion>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Tablet: { link: "/legal-unused#privacy" } }}
                          >
                            <LegalPageLinkWithVariantAppearEffect
                              __fx_animateOnce={false}
                              __fx_targets={[
                                { ref: ref2, target: "Legal Link Active" },
                                { ref: ref3, target: "Legal Link Un-Active" },
                              ]}
                              __fx_threshold={0.5}
                              __fx_variantAppearEffectEnabled
                              height="100%"
                              title="02 Privacy Policy"
                              link="/legal-unused#privacy"
                              variant={matchVariant("Legal Link Un-Active")}
                              width="100%"
                            />
                          </PropertyOverrides>
                        </Container>
                      </ComponentViewportProvider>
                      <ComponentViewportProvider height={23} y={viewportY + 406.44}>
                        <Container className={styles.legalPageLink3} rendersWithMotion>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Tablet: { link: "/legal-unused#cookies" } }}
                          >
                            <LegalPageLinkWithVariantAppearEffect
                              __fx_animateOnce={false}
                              __fx_targets={[
                                { ref: ref3, target: "Legal Link Active" },
                                { ref: ref4, target: "Legal Link Un-Active" },
                              ]}
                              __fx_threshold={0.5}
                              __fx_variantAppearEffectEnabled
                              height="100%"
                              title="03 Cookie Policy"
                              link="/legal-unused#cookies"
                              variant={matchVariant("Legal Link Un-Active")}
                              width="100%"
                            />
                          </PropertyOverrides>
                        </Container>
                      </ComponentViewportProvider>
                      <ComponentViewportProvider height={23} y={viewportY + 434.44}>
                        <Container className={styles.legalPageLink4} rendersWithMotion>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Tablet: { link: "/legal-unused#updates" } }}
                          >
                            <LegalPageLinkWithVariantAppearEffect
                              __fx_animateOnce={false}
                              __fx_targets={[
                                { ref: ref4, target: "Legal Link Active" },
                                { ref: ref5, target: "Legal Link Un-Active" },
                              ]}
                              __fx_threshold={0.5}
                              __fx_variantAppearEffectEnabled
                              height="100%"
                              title="04 Updates"
                              link="/legal-unused#updates"
                              variant={matchVariant("Legal Link Un-Active")}
                              width="100%"
                            />
                          </PropertyOverrides>
                        </Container>
                      </ComponentViewportProvider>
                      <ComponentViewportProvider height={23} y={viewportY + 462.44}>
                        <Container className={styles.legalPageLink5} rendersWithMotion>
                          <PropertyOverrides
                            breakpoint={baseVariant}
                            overrides={{ Tablet: { link: "/legal-unused#contact" } }}
                          >
                            <LegalPageLinkWithVariantAppearEffect
                              __fx_animateOnce={false}
                              __fx_targets={[{ ref: ref5, target: "Legal Link Active" }]}
                              __fx_threshold={0.5}
                              __fx_variantAppearEffectEnabled
                              height="100%"
                              title="05 Contact"
                              link="/legal-unused#contact"
                              variant={matchVariant("Legal Link Un-Active")}
                              width="100%"
                            />
                          </PropertyOverrides>
                        </Container>
                      </ComponentViewportProvider>
                    </div>
                  </MotionDivWithOptimizedAppearEffect>
                )}
                <MotionDivWithOptimizedAppearEffect
                  animate={animation4}
                  className={styles.content}
                  data-appear-id="340fcg"
                  data-name="Content"
                  initial={animation3}
                  optimized
                >
                  <div className={styles.toS} data-name="ToS" id="tos" ref={ref1}>
                    <RichText
                      className={styles.text}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-20">Terms and Conditions</p>
                      </>
                    </RichText>
                    <RichText
                      className={styles.text2}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-17">
                          Welcome to our website. By accessing or using this website, you acknowledge your
                          acceptance and agreement to abide by these Terms &amp; Conditions. If you disagree
                          with any part of these terms, please discontinue use immediately.
                        </p>
                        <p className="text-body-17">
                          All content displayed on this website—including but not limited to images, graphics,
                          photographs, illustrations, text, logos, trademarks, video, audio, and any other
                          intellectual property—is owned exclusively by our studio or licensed to us by third
                          parties. All rights are reserved. Any unauthorized use, including reproduction,
                          copying, modification, distribution, or creation of derivative works from this
                          content without prior written consent from us is strictly prohibited and may lead to
                          legal action.
                        </p>
                        <p className="text-body-17">
                          We strive to maintain the accuracy, timeliness, and reliability of the content
                          provided on our website. However, we make no warranties or representations, explicit
                          or implied, concerning the completeness, accuracy, reliability, suitability, or
                          availability of any information, products, or services presented. You acknowledge
                          that reliance on any information provided is at your own risk. We reserve the right
                          to make updates, modifications, or removal of content without prior notice.
                        </p>
                        <p className="text-body-17">
                          Our studio, including its directors, employees, affiliates, and partners, shall not
                          be liable for any direct, indirect, incidental, consequential, special, punitive, or
                          exemplary damages, including loss of profit, business interruption, loss of data, or
                          any other losses resulting from the use or inability to use our website or its
                          content. This limitation applies regardless of whether we have been advised of the
                          possibility of such damages.
                        </p>
                        <p className="text-body-17">
                          We reserve the right to revise or update these Terms &amp; Conditions periodically.
                          Any changes will be effective immediately upon posting on this website. Continued
                          use of our site after modifications signifies your acceptance of the updated terms.
                          We encourage users to review this page regularly to stay informed of any changes.
                        </p>
                        <p className="text-body-17">
                          These Terms &amp; Conditions are governed by and interpreted in accordance with the
                          laws applicable in our jurisdiction. By using our website, you consent to the
                          exclusive jurisdiction and venue of courts within our jurisdiction for any disputes
                          arising out of or related to your use of the website or these Terms &amp;
                          Conditions.
                        </p>
                      </>
                    </RichText>
                  </div>
                  <div className={styles.privacy} data-name="Privacy" id="privacy" ref={ref2}>
                    <RichText
                      className={styles.text3}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-20">Privacy Policy</p>
                      </>
                    </RichText>
                    <RichText
                      className={styles.text4}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-17">
                          We highly value your privacy and are dedicated to responsibly handling and
                          protecting your personal information. By using our website, you consent to the
                          practices described in this Privacy Policy.
                        </p>
                        <p className="text-body-17">
                          Personal information we collect from you may include your name, email address, phone
                          number, postal address, and any other details you voluntarily provide when
                          subscribing to our newsletters, making inquiries, requesting information, or
                          engaging with our services. Additionally, we may collect non-personal information
                          such as IP addresses, browser types, access times, and usage data to help us better
                          understand how visitors interact with our site.
                        </p>
                        <p className="text-body-17">
                          Your personal information is strictly utilized for communication, delivering
                          requested services, responding to inquiries, enhancing customer experience,
                          improving our website's functionality, and internal analytics purposes. We may also
                          use your data to keep you informed about new services, updates, or promotional
                          content related to our studio if you opt-in for such communications.
                        </p>
                        <p className="text-body-17">
                          We never sell, trade, or rent your personal information to third parties. Disclosure
                          of your personal data may only occur when it is essential for the fulfillment of
                          services you have requested, compliance with legal obligations, protection of our
                          rights, or if explicitly authorized by you. We partner only with trusted third-party
                          providers who agree to maintain confidentiality and security standards comparable to
                          our own.
                        </p>
                        <p className="text-body-17">
                          We employ rigorous security measures and industry-standard practices to protect your
                          personal data against unauthorized access, loss, alteration, disclosure, or misuse.
                          Our security protocols include technical safeguards, secure data storage practices,
                          and access limitations to authorized personnel only.
                        </p>
                        <p className="text-body-17">
                          Our website may contain links to external websites operated by third parties. We
                          have no control over their privacy practices or content. We strongly encourage you
                          to review the privacy policies of these external sites upon visiting.
                        </p>
                      </>
                    </RichText>
                  </div>
                  <div className={styles.cookies} data-name="Cookies" id="cookies" ref={ref3}>
                    <RichText
                      className={styles.text5}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-20">Cookie Policy</p>
                      </>
                    </RichText>
                    <RichText
                      className={styles.text6}
                      fonts={["Inter", "Inter-Bold"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-17">
                          To enhance your browsing experience and provide personalized content tailored to
                          your interests, our website uses cookies and similar tracking technologies. By
                          continuing to browse our site, you consent to our use of cookies in accordance with
                          this Cookie Policy.
                        </p>
                        <p className="text-body-17">
                          Cookies are small text files stored on your device when you visit a website. They
                          enable the website to remember your actions, preferences, and visits, enhancing your
                          browsing experience and providing valuable insights to help us improve our services.
                        </p>
                        <p className="text-body-17">
                          We employ various types of cookies to ensure optimal website functionality and
                          enhance user experience:
                        </p>
                        <ul className="text-body-17">
                          <li>
                            <p>
                              <strong>Essential Cookies:</strong> Essential Cookies: These are necessary for
                              basic website operations, such as enabling page navigation, accessing secure
                              areas, or managing user sessions. Without these cookies, the website cannot
                              function properly.
                            </p>
                          </li>
                          <li>
                            <p>
                              <strong>Analytical Cookies:</strong> These cookies help us understand visitor
                              interactions with our website by collecting information about page visits, time
                              spent on the site, and other analytics data. This information is used to measure
                              and improve website performance and user experience.
                            </p>
                          </li>
                          <li>
                            <p>
                              <strong>Functional Cookies:</strong> Functional cookies remember your
                              preferences and choices, such as language settings or login details, providing a
                              more personalized browsing experience and improved usability.
                            </p>
                          </li>
                        </ul>
                        <p className="text-body-17">
                          Our website may include cookies set by third-party service providers, such as
                          analytics services or social media platforms. We do not control third-party cookie
                          policies, so we recommend reviewing their respective privacy policies for more
                          information about how they manage your data.
                        </p>
                        <p className="text-body-17">
                          You can control and manage cookies directly through your browser settings. You have
                          the option to accept, decline, or delete cookies at any time. However, disabling or
                          declining cookies may affect website functionality and limit your ability to access
                          certain features and services effectively.
                        </p>
                        <p className="text-body-17">
                          We reserve the right to update or modify this Cookie Policy at any time. Changes
                          will be effective immediately upon posting on our website. Your continued use of our
                          site following updates indicates your acceptance of the revised policy.
                        </p>
                      </>
                    </RichText>
                  </div>
                  <div className={styles.udpates} data-name="Udpates" id="updates" ref={ref4}>
                    <RichText
                      className={styles.text7}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-20">Updates to Our Policies</p>
                      </>
                    </RichText>
                    <RichText
                      className={styles.text8}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-17">
                          We periodically review and update our Terms &amp; Conditions, Privacy Policy, and
                          Cookie Policy. Changes will be clearly posted on this page, and we recommend
                          regularly reviewing these policies to stay informed about how we protect your
                          information and manage our website.
                        </p>
                      </>
                    </RichText>
                  </div>
                  <div className={styles.contact} data-name="Contact" id="contact" ref={ref5}>
                    <RichText
                      className={styles.text9}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-20">Contact us</p>
                      </>
                    </RichText>
                    <RichText
                      className={styles.text10}
                      fonts={["Inter"]}
                      verticalAlignment="top"
                      withExternalLayout
                    >
                      <>
                        <p className="text-body-17">
                          For any questions, concerns, or requests regarding these policies, please contact us
                          directly at{" "}
                          <Link
                            href="mailto: legal@luca.com"
                            motionChild
                            nodeId="link"
                            openInNewTab
                            relValues={[]}
                            smoothScroll={false}
                          >
                            <motion.a className="link">info@luca.com</motion.a>
                          </Link>
                          . We're happy to assist you.
                        </p>
                      </>
                    </RichText>
                  </div>
                </MotionDivWithOptimizedAppearEffect>
              </div>
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(LegalUnusedPage);

LegalUnusedPage.displayName = "Licensing";

LegalUnusedPage.defaultProps = { height: 3532, width: 1200 };

LegalUnusedPage.loader = {
  load: (props, context) => {
    return runTasksWithYield(
      [
        () => forwardLoader(GlobalLineAnimationGlobal, {}, context),
        () => forwardLoader(LegalPageLink, {}, context),
      ],
      context,
    );
  },
};
