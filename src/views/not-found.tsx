"use client";

import styles from "./not-found.module.css";
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
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import ContactButton from "@/components/contact-button";

const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-not-found-phone",
  Tablet: "hidden-not-found-tablet",
  Desktop: "hidden-desktop",
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

const NotFoundPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const componentScopeId = "dQBlYquN1";

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
          className={cx(styles.page, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div className={styles.section404} data-name="Section 404">
              <div className={styles.container} data-name="Container">
                <RichText
                  className={styles.pageNotFound}
                  data-name="Page not found"
                  fonts={["GF;Switzer-500"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p
                      style={{
                        "--font-selector": "R0Y7U3dpdHplci01MDA=",
                        "--df-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                        "--df-font-size": "40px",
                        "--df-font-weight": "500",
                        "--df-letter-spacing": "-0.02em",
                        "--df-line-height": "117%",
                      }}
                    >
                      Page not found
                    </p>
                  </>
                </RichText>
                <RichText
                  className={styles.text}
                  data-name="The page you were looking for doesn’t exist or has been moved."
                  fonts={["GF;Switzer-500"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p
                      style={{
                        "--font-selector": "R0Y7U3dpdHplci01MDA=",
                        "--df-font-family": '"Switzer", "Switzer Placeholder", sans-serif',
                        "--df-font-size": "15px",
                        "--df-font-weight": "500",
                        "--df-line-height": "100%",
                      }}
                    >
                      The page you were looking for doesn’t exist or has been moved.
                    </p>
                  </>
                </RichText>
              </div>
              <ComponentViewportProvider height={15} y={viewportY + 504}>
                <Container className={styles.contactButton}>
                  <PropertyOverrides
                    breakpoint={baseVariant}
                    overrides={{ Phone: { link: "/" }, Tablet: { link: "/" } }}
                  >
                    <ContactButton
                      label="Return Home"
                      link="/"
                      height="100%"
                      variant={matchVariant("Variant 1")}
                      width="100%"
                      color="rgb(0, 0, 0)"
                    />
                  </PropertyOverrides>
                </Container>
              </ComponentViewportProvider>
            </div>
            <div className={styles.imageWrapper} data-name="Image Wrapper">
              <Image1
                background={{
                  alt: "",
                  fit: "fill",
                  loading: getLoadingLazyAtYPosition(viewportY + 639),
                  pixelHeight: 2098,
                  pixelWidth: 2880,
                  sizes: `max(${viewportWidth}, 1px)`,
                  src: "https://framerusercontent.com/images/EpJ1y2ieCNueaESXkSw1ySgINak.png?width=2880&height=2098",
                  srcSet:
                    "https://framerusercontent.com/images/EpJ1y2ieCNueaESXkSw1ySgINak.png?scale-down-to=512&width=2880&height=2098 512w,https://framerusercontent.com/images/EpJ1y2ieCNueaESXkSw1ySgINak.png?scale-down-to=1024&width=2880&height=2098 1024w,https://framerusercontent.com/images/EpJ1y2ieCNueaESXkSw1ySgINak.png?scale-down-to=2048&width=2880&height=2098 2048w,https://framerusercontent.com/images/EpJ1y2ieCNueaESXkSw1ySgINak.png?width=2880&height=2098 2880w",
                }}
                className={styles.image}
                data-name="Image"
              />
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(NotFoundPage);

NotFoundPage.displayName = "404";

NotFoundPage.defaultProps = { height: 800, width: 1200 };

NotFoundPage.loader = {
  load: (props, context) => {
    return runTasksWithYield([() => forwardLoader(ContactButton, {}, context)], context);
  },
};
