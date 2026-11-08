"use client";

import "@/styles/fonts/inter.css";
import styles from "./playground.module.css";
import {
  asPage,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getRootLayoutProp,
  HTMLStyle,
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
import PlaygroundContent2 from "@/components/playground-content-2";
import * as body40 from "@/styles/text/body-40";

const RichTextWithOptimizedAppearEffect = withOptimizedAppearEffect(RichText);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-playground-tablet",
  Desktop: "hidden-desktop",
  Phone: "hidden-playground-phone",
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

const PlaygroundPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const scopingClassNames = cx(styles.page, body40.className);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const componentScopeId = "YSqCcg0hG";

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
        <HTMLStyle value="html body { background: rgb(0, 0, 0); }" />
        <motion.div
          {...restProps}
          className={cx(scopingClassNames, styles.root, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div className={styles.heading} data-name="Heading">
              <div className={styles.heading2} data-name="Heading">
                <RichTextWithOptimizedAppearEffect
                  animate={animation}
                  className={styles.letSConnect}
                  data-appear-id="bthsu6"
                  data-name="Let’s connect and bring your ideas to life"
                  fonts={["Inter"]}
                  initial={animation1}
                  optimized
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <p
                      className="text-body-40"
                      dir="auto"
                      style={{ "--df-text-color": "rgb(255, 255, 255)" }}
                    >
                      {"A zone for experiments  and things I find cool"}
                    </p>
                  </>
                </RichTextWithOptimizedAppearEffect>
              </div>
            </div>
            <section className={styles.sectionPlayground} data-name="Section Playground">
              <PropertyOverrides
                breakpoint={baseVariant}
                overrides={{ Phone: { width: `calc(${viewportWidth} - 30px)` } }}
              >
                <ComponentViewportProvider
                  height={637}
                  width={`calc(${viewportWidth} - 40px)`}
                  y={viewportY + 512}
                >
                  <Container className={styles.playgroundContent}>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{ Phone: { variant: matchVariant("3 Column Mobile") } }}
                    >
                      <PlaygroundContent2
                        height="100%"
                        style={{ width: "100%" }}
                        variant={matchVariant("8 Column Desktop")}
                        width="100%"
                      />
                    </PropertyOverrides>
                  </Container>
                </ComponentViewportProvider>
              </PropertyOverrides>
            </section>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(PlaygroundPage);

PlaygroundPage.displayName = "Legal";

PlaygroundPage.defaultProps = { height: 1476, width: 1200 };

PlaygroundPage.loader = {
  load: (props, context) => {
    return runTasksWithYield([() => forwardLoader(PlaygroundContent2, {}, context)], context);
  },
};
