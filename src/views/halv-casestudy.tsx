"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./halv-casestudy.module.css";
import {
  asPage,
  ChildrenCanSuspend,
  ComponentViewportProvider,
  Container,
  cx,
  forwardLoader,
  GeneratedComponentContext,
  getRootLayoutProp,
  HTMLStyle,
  Image as Image1,
  isSet,
  Link,
  matchVariant,
  PathVariablesContext,
  PropertyOverrides,
  queryCache,
  RichText,
  runTasksWithYield,
  runWithYield,
  toResponsiveImage,
  useComponentViewport,
  useCustomCursors,
  useFallbackRef,
  useHydratedBreakpointVariants,
  useQueryData,
  withFX,
} from "@/deframer";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import * as React from "react";
import TextLink from "@/components/text-link";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import { Icon as Material } from "@/vendor/material";
import * as body13 from "@/styles/text/body-13";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";

import { backButtonTransition, caseStudyImageSpring } from "@/lib/motion";
const Image1WithFX = withFX(Image1);

const backCardHover = {
  backgroundColor: "rgb(255, 255, 255)",
  opacity: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
  transition: { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" },
} as const;

const backCardInitial = { opacity: 0.001, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 24 } as const;
const backCardAnimate = { opacity: 1, rotate: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0, transition: backButtonTransition } as const;


const breakpoints = {
  Phone: "(max-width: 809.98px)",
  Desktop: "(min-width: 1200px)",
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Phone: "hidden-halv-casestudy-phone",
  Desktop: "hidden-desktop",
  Tablet: "hidden-halv-casestudy-tablet",
};

const query = () => ({
  from: { alias: "works11", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works11", name: "worksSlug", type: "Identifier" },
    { collection: "works11", name: "title", type: "Identifier" },
    { collection: "works11", name: "category", type: "Identifier" },
    { collection: "works11", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works11", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works11", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works11", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 2 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = () => ({
  from: { alias: "works12", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works12", name: "worksSlug", type: "Identifier" },
    { collection: "works12", name: "title", type: "Identifier" },
    { collection: "works12", name: "category", type: "Identifier" },
    { collection: "works12", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works12", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works12", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works12", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works13", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works13", name: "worksSlug", type: "Identifier" },
    { collection: "works13", name: "title", type: "Identifier" },
    { collection: "works13", name: "category", type: "Identifier" },
    { collection: "works13", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works13", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works13", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works13", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 4 },
    type: "BinaryOperation",
  },
});

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

const HalvCasestudyPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const [baseVariant] = useHydratedBreakpointVariants(variant, breakpoints, false, hiddenClassNames);

  const hasLayoutTemplate = React.useContext(GeneratedComponentContext)?.isLayoutTemplate;

  const hasInheritedFlowEffect = Boolean(
    (React.useContext(MotionConfigContext)?.transition as { layout?: unknown } | undefined)?.layout,
  );

  const motionLayout = getRootLayoutProp(hasLayoutTemplate, hasInheritedFlowEffect);

  const ref1 = React.useRef<HTMLDivElement>(null);

  const componentScopeId = "ZiMWc_9zr";

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
          className={cx(styles.page, styles.root, body13Uppercase.className, body13.className, className)}
          ref={refBinding}
          style={style}
        >
          <motion.main className={styles.main} data-name="Main" layout={motionLayout}>
            <div
              className={styles.navVariantTrigger}
              data-name="Nav Variant Trigger"
              id="trigger"
              ref={ref1}
            />
            <div className={styles.sectionCaseStudy} data-name="Section Case Study">
              <div className={styles.sectionImageSingle} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/XQ1G4osvUmDUUyynsE4BEKf3cnU.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/XQ1G4osvUmDUUyynsE4BEKf3cnU.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/XQ1G4osvUmDUUyynsE4BEKf3cnU.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/XQ1G4osvUmDUUyynsE4BEKf3cnU.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/XQ1G4osvUmDUUyynsE4BEKf3cnU.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle2} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/Bkc6lFl7zep8Vq2w0TwNPe9tAr0.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/Bkc6lFl7zep8Vq2w0TwNPe9tAr0.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/Bkc6lFl7zep8Vq2w0TwNPe9tAr0.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/Bkc6lFl7zep8Vq2w0TwNPe9tAr0.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/Bkc6lFl7zep8Vq2w0TwNPe9tAr0.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image2}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle3} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/GLOVGj9Iz3J2RvyPiixy5g2vYA.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/GLOVGj9Iz3J2RvyPiixy5g2vYA.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/GLOVGj9Iz3J2RvyPiixy5g2vYA.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/GLOVGj9Iz3J2RvyPiixy5g2vYA.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/GLOVGj9Iz3J2RvyPiixy5g2vYA.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image3}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle4} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/4s8SUyL7BbbkY1WkJmQlbrrXL4.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/4s8SUyL7BbbkY1WkJmQlbrrXL4.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/4s8SUyL7BbbkY1WkJmQlbrrXL4.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/4s8SUyL7BbbkY1WkJmQlbrrXL4.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/4s8SUyL7BbbkY1WkJmQlbrrXL4.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image4}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle5} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/cMyTMUcD7LWoG9IjVZQ9Gi39xs.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/cMyTMUcD7LWoG9IjVZQ9Gi39xs.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/cMyTMUcD7LWoG9IjVZQ9Gi39xs.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/cMyTMUcD7LWoG9IjVZQ9Gi39xs.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/cMyTMUcD7LWoG9IjVZQ9Gi39xs.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image5}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle6} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/fhJgZkNzGIoVcAv7euQLwfFY.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/fhJgZkNzGIoVcAv7euQLwfFY.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/fhJgZkNzGIoVcAv7euQLwfFY.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/fhJgZkNzGIoVcAv7euQLwfFY.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/fhJgZkNzGIoVcAv7euQLwfFY.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image6}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle7} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/ZGaAv2vVgmOAQ8neSfJXjlBSlpQ.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/ZGaAv2vVgmOAQ8neSfJXjlBSlpQ.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/ZGaAv2vVgmOAQ8neSfJXjlBSlpQ.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/ZGaAv2vVgmOAQ8neSfJXjlBSlpQ.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/ZGaAv2vVgmOAQ8neSfJXjlBSlpQ.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image7}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle8} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/wXXFHSZH3LYnQnzKGHxBPBRNke0.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/wXXFHSZH3LYnQnzKGHxBPBRNke0.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/wXXFHSZH3LYnQnzKGHxBPBRNke0.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/wXXFHSZH3LYnQnzKGHxBPBRNke0.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/wXXFHSZH3LYnQnzKGHxBPBRNke0.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image8}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle9} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/6XVzk5IKnZ6ZDu0Lwr6Vo8N2Z9s.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/6XVzk5IKnZ6ZDu0Lwr6Vo8N2Z9s.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/6XVzk5IKnZ6ZDu0Lwr6Vo8N2Z9s.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/6XVzk5IKnZ6ZDu0Lwr6Vo8N2Z9s.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/6XVzk5IKnZ6ZDu0Lwr6Vo8N2Z9s.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image9}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle10} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/E0upR6bsPox4PIJGt2EzpQgeIVE.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/E0upR6bsPox4PIJGt2EzpQgeIVE.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/E0upR6bsPox4PIJGt2EzpQgeIVE.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/E0upR6bsPox4PIJGt2EzpQgeIVE.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/E0upR6bsPox4PIJGt2EzpQgeIVE.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image10}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle11} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/XbKm1axGc91G0ZghnOwEkt6X2UM.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/XbKm1axGc91G0ZghnOwEkt6X2UM.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/XbKm1axGc91G0ZghnOwEkt6X2UM.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/XbKm1axGc91G0ZghnOwEkt6X2UM.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/XbKm1axGc91G0ZghnOwEkt6X2UM.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image11}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle12} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/74vQFk152pergmYmKZmhnm06yQ.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/74vQFk152pergmYmKZmhnm06yQ.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/74vQFk152pergmYmKZmhnm06yQ.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/74vQFk152pergmYmKZmhnm06yQ.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/74vQFk152pergmYmKZmhnm06yQ.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image12}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle13} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/MNKspXVL9E8gkK7FSddM9SPqJg.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/MNKspXVL9E8gkK7FSddM9SPqJg.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/MNKspXVL9E8gkK7FSddM9SPqJg.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/MNKspXVL9E8gkK7FSddM9SPqJg.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/MNKspXVL9E8gkK7FSddM9SPqJg.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image13}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle14} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/OV2VkBO6TwAQhkQmPyRobLh4nE.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/OV2VkBO6TwAQhkQmPyRobLh4nE.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/OV2VkBO6TwAQhkQmPyRobLh4nE.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/OV2VkBO6TwAQhkQmPyRobLh4nE.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/OV2VkBO6TwAQhkQmPyRobLh4nE.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image14}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle15} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/VhxTmu26jP70qcVGZ33q53Dw4Y.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/VhxTmu26jP70qcVGZ33q53Dw4Y.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/VhxTmu26jP70qcVGZ33q53Dw4Y.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/VhxTmu26jP70qcVGZ33q53Dw4Y.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/VhxTmu26jP70qcVGZ33q53Dw4Y.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image15}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle16} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/t342W2sxwMSEGDjmCPDYZV6G5gs.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/t342W2sxwMSEGDjmCPDYZV6G5gs.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/t342W2sxwMSEGDjmCPDYZV6G5gs.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/t342W2sxwMSEGDjmCPDYZV6G5gs.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/t342W2sxwMSEGDjmCPDYZV6G5gs.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image16}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle17} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/AFbJfhSfgwrto0Pu2P6JHjfBs.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/AFbJfhSfgwrto0Pu2P6JHjfBs.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/AFbJfhSfgwrto0Pu2P6JHjfBs.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/AFbJfhSfgwrto0Pu2P6JHjfBs.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/AFbJfhSfgwrto0Pu2P6JHjfBs.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image17}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle18} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/9GzLa0wEraNKHH3seefjfJPv684.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/9GzLa0wEraNKHH3seefjfJPv684.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/9GzLa0wEraNKHH3seefjfJPv684.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/9GzLa0wEraNKHH3seefjfJPv684.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/9GzLa0wEraNKHH3seefjfJPv684.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image18}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle19} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/kU9qROo6NFXz7lb3EPptSojzkRo.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/kU9qROo6NFXz7lb3EPptSojzkRo.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/kU9qROo6NFXz7lb3EPptSojzkRo.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/kU9qROo6NFXz7lb3EPptSojzkRo.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/kU9qROo6NFXz7lb3EPptSojzkRo.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image19}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle20} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/aOunPmjgFAkhwkWnat4ZMvNQYk.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/aOunPmjgFAkhwkWnat4ZMvNQYk.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/aOunPmjgFAkhwkWnat4ZMvNQYk.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/aOunPmjgFAkhwkWnat4ZMvNQYk.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/aOunPmjgFAkhwkWnat4ZMvNQYk.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image20}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle21} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/bUHJBAiKALNybhE9g8O2rGBTI5Y.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/bUHJBAiKALNybhE9g8O2rGBTI5Y.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/bUHJBAiKALNybhE9g8O2rGBTI5Y.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/bUHJBAiKALNybhE9g8O2rGBTI5Y.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/bUHJBAiKALNybhE9g8O2rGBTI5Y.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image21}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle22} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/HKe24L324nfLgYuQbOQypRU8PQ.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/HKe24L324nfLgYuQbOQypRU8PQ.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/HKe24L324nfLgYuQbOQypRU8PQ.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/HKe24L324nfLgYuQbOQypRU8PQ.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/HKe24L324nfLgYuQbOQypRU8PQ.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image22}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle23} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/2QN6ZobhNxCk3jIHOeCxzkNdZ0.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/2QN6ZobhNxCk3jIHOeCxzkNdZ0.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/2QN6ZobhNxCk3jIHOeCxzkNdZ0.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/2QN6ZobhNxCk3jIHOeCxzkNdZ0.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/2QN6ZobhNxCk3jIHOeCxzkNdZ0.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image23}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle24} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/j1mlyqUCnkQObyaDf7k74kvLP8s.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/j1mlyqUCnkQObyaDf7k74kvLP8s.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/j1mlyqUCnkQObyaDf7k74kvLP8s.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/j1mlyqUCnkQObyaDf7k74kvLP8s.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/j1mlyqUCnkQObyaDf7k74kvLP8s.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image24}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle25} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/illRWymQBm7kZiel1BfkAlsPvs4.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/illRWymQBm7kZiel1BfkAlsPvs4.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/illRWymQBm7kZiel1BfkAlsPvs4.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/illRWymQBm7kZiel1BfkAlsPvs4.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/illRWymQBm7kZiel1BfkAlsPvs4.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image25}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle26} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/FRqOxf2mESPeQaJ1WSYYsjJY4.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/FRqOxf2mESPeQaJ1WSYYsjJY4.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/FRqOxf2mESPeQaJ1WSYYsjJY4.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/FRqOxf2mESPeQaJ1WSYYsjJY4.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/FRqOxf2mESPeQaJ1WSYYsjJY4.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image26}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle27} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/4c7ro2yfAv58f1TGqDsNmEpZS4.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/4c7ro2yfAv58f1TGqDsNmEpZS4.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/4c7ro2yfAv58f1TGqDsNmEpZS4.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/4c7ro2yfAv58f1TGqDsNmEpZS4.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/4c7ro2yfAv58f1TGqDsNmEpZS4.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image27}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle28} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/UqQ2fwnGXzAmWp2nU3nv0.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/UqQ2fwnGXzAmWp2nU3nv0.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/UqQ2fwnGXzAmWp2nU3nv0.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/UqQ2fwnGXzAmWp2nU3nv0.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/UqQ2fwnGXzAmWp2nU3nv0.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image28}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle29} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/4kPc6wWswHpmwEuH7yDy0tdtiQ.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/4kPc6wWswHpmwEuH7yDy0tdtiQ.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/4kPc6wWswHpmwEuH7yDy0tdtiQ.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/4kPc6wWswHpmwEuH7yDy0tdtiQ.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/4kPc6wWswHpmwEuH7yDy0tdtiQ.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image29}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle30} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/cB3SCUdDD6z06excxt8nn8avWjM.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/cB3SCUdDD6z06excxt8nn8avWjM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/cB3SCUdDD6z06excxt8nn8avWjM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/cB3SCUdDD6z06excxt8nn8avWjM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/cB3SCUdDD6z06excxt8nn8avWjM.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image30}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle31} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/92WPH5Q9AOD1HudismUnceRRPKE.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/92WPH5Q9AOD1HudismUnceRRPKE.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/92WPH5Q9AOD1HudismUnceRRPKE.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/92WPH5Q9AOD1HudismUnceRRPKE.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/92WPH5Q9AOD1HudismUnceRRPKE.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image31}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle32} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/HC1e9xpfZplwCwH8kytJCXjct8.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/HC1e9xpfZplwCwH8kytJCXjct8.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/HC1e9xpfZplwCwH8kytJCXjct8.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/HC1e9xpfZplwCwH8kytJCXjct8.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/HC1e9xpfZplwCwH8kytJCXjct8.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image32}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle33} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/YD0idJLcuW68zAEC0r3I0KIIj5M.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/YD0idJLcuW68zAEC0r3I0KIIj5M.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/YD0idJLcuW68zAEC0r3I0KIIj5M.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/YD0idJLcuW68zAEC0r3I0KIIj5M.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/YD0idJLcuW68zAEC0r3I0KIIj5M.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image33}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle34} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/8hpDpWfIQ2MLJgqzzYoa9MVPJQI.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/8hpDpWfIQ2MLJgqzzYoa9MVPJQI.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/8hpDpWfIQ2MLJgqzzYoa9MVPJQI.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/8hpDpWfIQ2MLJgqzzYoa9MVPJQI.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/8hpDpWfIQ2MLJgqzzYoa9MVPJQI.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image34}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle35} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/wasG4Mtf9fXSfl0O3TTqmOuCuQ.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/wasG4Mtf9fXSfl0O3TTqmOuCuQ.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/wasG4Mtf9fXSfl0O3TTqmOuCuQ.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/wasG4Mtf9fXSfl0O3TTqmOuCuQ.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/wasG4Mtf9fXSfl0O3TTqmOuCuQ.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image35}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle36} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/eQW0KrScuXTsG94oGFXl34lWTbA.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/eQW0KrScuXTsG94oGFXl34lWTbA.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/eQW0KrScuXTsG94oGFXl34lWTbA.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/eQW0KrScuXTsG94oGFXl34lWTbA.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/eQW0KrScuXTsG94oGFXl34lWTbA.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image36}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle37} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/3tkQGiWjX5rrtl4wtcKpdjwck60.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/3tkQGiWjX5rrtl4wtcKpdjwck60.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/3tkQGiWjX5rrtl4wtcKpdjwck60.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/3tkQGiWjX5rrtl4wtcKpdjwck60.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/3tkQGiWjX5rrtl4wtcKpdjwck60.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image37}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle38} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/uhuVcpQNnr3qPO1m0EtYc0WBQQE.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/uhuVcpQNnr3qPO1m0EtYc0WBQQE.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/uhuVcpQNnr3qPO1m0EtYc0WBQQE.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/uhuVcpQNnr3qPO1m0EtYc0WBQQE.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/uhuVcpQNnr3qPO1m0EtYc0WBQQE.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image38}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle39} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/7WdaqLB8VGw70vznA5oQzv9GKCo.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/7WdaqLB8VGw70vznA5oQzv9GKCo.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/7WdaqLB8VGw70vznA5oQzv9GKCo.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/7WdaqLB8VGw70vznA5oQzv9GKCo.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/7WdaqLB8VGw70vznA5oQzv9GKCo.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image39}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle40} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/dExzKIPwA7eQdHlDKbRZBWPjk.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/dExzKIPwA7eQdHlDKbRZBWPjk.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/dExzKIPwA7eQdHlDKbRZBWPjk.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/dExzKIPwA7eQdHlDKbRZBWPjk.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/dExzKIPwA7eQdHlDKbRZBWPjk.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image40}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle41} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/leRNk6ZDPm2MfnOEbUXqRxdjomM.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/leRNk6ZDPm2MfnOEbUXqRxdjomM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/leRNk6ZDPm2MfnOEbUXqRxdjomM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/leRNk6ZDPm2MfnOEbUXqRxdjomM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/leRNk6ZDPm2MfnOEbUXqRxdjomM.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image41}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle42} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={caseStudyImageSpring}
                  __fx_styleTransformEffectEnabled
                  __fx_transformTargets={[
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1.025,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                    {
                      target: {
                        opacity: 1,
                        rotate: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        skewX: 0,
                        skewY: 0,
                        x: 0,
                        y: 0,
                      },
                    },
                  ]}
                  __fx_transformTrigger="onInView"
                  __perspectiveFX={false}
                  __targetOpacity={1}
                  background={{
                    alt: "",
                    fit: "fill",
                    pixelHeight: 2160,
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/GiQi3ySQYKmDP9T6f6bPdZRfs.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/GiQi3ySQYKmDP9T6f6bPdZRfs.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/GiQi3ySQYKmDP9T6f6bPdZRfs.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/GiQi3ySQYKmDP9T6f6bPdZRfs.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/GiQi3ySQYKmDP9T6f6bPdZRfs.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image42}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
            </div>
                        <div className={styles.backToProject} data-name="Back to Project">
              <Link href="/halv" motionChild nodeId="Case Study Card" openInNewTab={false}>
                <motion.a
                  className={cx(styles.caseStudyCard, styles.caseStudyCard2)}
                  data-name="Case Study Card"
                                  initial={backCardInitial}
                  animate={backCardAnimate}
                  whileHover={backCardHover}
                >
                  <div className={styles.thumbnailWrapper} data-name="Thumbnail Wrapper">
                    <Image1
                      background={{
                        alt: "",
                        fit: "fill",
                        intrinsicHeight: 2160,
                        intrinsicWidth: 3841,
                        pixelHeight: 2160,
                        pixelWidth: 3841,
                        sizes: "160px",
                        src: "https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?width=3841&height=2160",
                        srcSet:
                          "https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/xX2ck2VAxImo3wrVemYFpsRfN24.png?width=3841&height=2160 3841w",
                      }}
                      className={styles.thumbnail}
                      data-name="Thumbnail"
                    />
                  </div>
                  <div className={styles.details} data-name="Details">
                    <div className={styles.detailsTitle} data-name="Title">
                      <RichText
                        className={styles.relatedCaseStudy}
                        data-name="Related Case study"
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-13-uppercase" dir="auto">
                            Back to Project
                          </p>
                        </>
                      </RichText>
                    </div>
                    <div className={styles.details2} data-name="Details">
                      <RichText
                        className={styles.arrival}
                        data-name="Arrival"
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-13" dir="auto">
                            Halv
                          </p>
                        </>
                      </RichText>
                      <RichText
                        className={styles.artDirectionWebsite}
                        data-name="Art Direction, Website"
                        fonts={["Inter"]}
                        verticalAlignment="top"
                        withExternalLayout
                      >
                        <>
                          <p className="text-body-13" dir="auto">
                            Industrial Design
                          </p>
                        </>
                      </RichText>
                    </div>
                  </div>
                  <div className={styles.caseStudyFrame}>
                    <ComponentViewportProvider>
                      <Container
                        className={styles.material}
                        isAuthoredByUser
                        isModuleExternal
                        nodeId="Material"
                        rendersWithMotion
                        scopeId="HalvCasestudyPage"
                        style={{ rotate: -45 }}
                      >
                        <Material
                          color="rgb(0, 0, 0)"
                          height="100%"
                          iconSearch="Home"
                          iconSelection="ArrowForward"
                          iconStyle15="Filled"
                          iconStyle2="Filled"
                          iconStyle7="Filled"
                          id="MaterialBack1"
                          mirrored={false}
                          selectByList
                          style={{ height: "100%", width: "100%" }}
                          width="100%"
                        />
                      </Container>
                    </ComponentViewportProvider>
                    <ComponentViewportProvider>
                      <Container
                        className={styles.material}
                        isAuthoredByUser
                        isModuleExternal
                        nodeId="Material"
                        rendersWithMotion
                        scopeId="HalvCasestudyPage"
                        style={{ rotate: -45 }}
                      >
                        <Material
                          color="rgb(0, 0, 0)"
                          height="100%"
                          iconSearch="Home"
                          iconSelection="ArrowForward"
                          iconStyle15="Filled"
                          iconStyle2="Filled"
                          iconStyle7="Filled"
                          id="MaterialBack2"
                          mirrored={false}
                          selectByList
                          style={{ height: "100%", width: "100%" }}
                          width="100%"
                        />
                      </Container>
                    </ComponentViewportProvider>
                  </div>
                </motion.a>
              </Link>
            </div>
            <div className={styles.sectionMoreProjects} data-name="Section more Projects">
              <div className={styles.heading} data-name="Heading">
                <RichText
                  className={styles.text}
                  fonts={["CUSTOMV2;Favorit Light"]}
                  verticalAlignment="top"
                  withExternalLayout
                >
                  <>
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "Q1VTVE9NVjI7RmF2b3JpdCBMaWdodA==",
                        "--df-font-family": '"Favorit Light", "Favorit Light Placeholder", sans-serif',
                        "--df-font-size": "32px",
                        "--df-font-weight": "300",
                        "--df-letter-spacing": "-0.03em",
                        "--df-line-height": "120%",
                      }}
                    >
                      More Projects
                    </h2>
                  </>
                </RichText>
                <ComponentViewportProvider height={16}>
                  <Container className={styles.textLink}>
                    <PropertyOverrides
                      breakpoint={baseVariant}
                      overrides={{
                        Phone: { link: "/works/grid-view", label: "View All" },
                        Tablet: { link: "/works/grid-view" },
                      }}
                    >
                      <TextLink
                        link="/works/grid-view"
                        height="100%"
                        variant={matchVariant("Default")}
                        newTab={false}
                        width="100%"
                        label="View All Projects"
                        color="rgb(0, 0, 0)"
                      />
                    </PropertyOverrides>
                  </Container>
                </ComponentViewportProvider>
              </div>
              <div className={styles.container} data-name="Container">
                <div className={styles.frame}>
                  <ChildrenCanSuspend>
                    <QueryData query={query()}>
                      {(collection, paginationInfo, loadMore) => {
                        return (
                          <>
                            {collection?.map(
                              (
                                {
                                  id: worksId,
                                  category,
                                  thumbnailVideoPortrait,
                                  title,
                                  worksSlug: slug,
                                  thumbnailPortrait,
                                }: any,
                                index,
                              ) => {
                                slug ??= "";
                                title ??= "";
                                category ??= "";
                                return (
                                  <LayoutGroup id={`works11-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link
                                        href={`/${slug}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: { width: `max(${viewportWidth} - 40px, 1px)` },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard}>
                                                <ProjectCard
                                                  subtitle={category}
                                                  videoWide1
                                                  title={title}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait)}
                                                />
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame2}>
                  <ChildrenCanSuspend>
                    <QueryData query={query1()}>
                      {(collection1, paginationInfo1, loadMore1) => {
                        return (
                          <>
                            {collection1?.map(
                              (
                                {
                                  id: worksIdWorks,
                                  category: categoryWorks,
                                  thumbnailVideoPortrait: thumbnailVideoPortraitWorks,
                                  title: titleWorks,
                                  worksSlug: slugWorks,
                                  thumbnailPortrait: thumbnailPortraitWorks,
                                }: any,
                                index1,
                              ) => {
                                slugWorks ??= "";
                                titleWorks ??= "";
                                categoryWorks ??= "";
                                return (
                                  <LayoutGroup id={`works12-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link
                                        href={`/${slugWorks}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link3, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{
                                              Phone: { width: `max(${viewportWidth} - 40px, 1px)` },
                                            }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard2}>
                                                <ProjectCard
                                                  subtitle={categoryWorks}
                                                  videoWide1
                                                  title={titleWorks}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortraitWorks}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(
                                                    thumbnailPortraitWorks,
                                                  )}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortraitWorks)}
                                                />
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
                <div className={styles.frame3}>
                  <ChildrenCanSuspend>
                    <QueryData query={query2()}>
                      {(collection2, paginationInfo2, loadMore2) => {
                        return (
                          <>
                            {collection2?.map(
                              (
                                {
                                  id: worksId2,
                                  category: category2,
                                  thumbnailVideoPortrait: thumbnailVideoPortrait2,
                                  title: title2,
                                  worksSlug: slug2,
                                  thumbnailPortrait: thumbnailPortrait2,
                                }: any,
                                index2,
                              ) => {
                                slug2 ??= "";
                                title2 ??= "";
                                category2 ??= "";
                                return (
                                  <LayoutGroup id={`works13-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link
                                        href={`/${slug2}`}
                                        motionChild
                                        nodeId="link"
                                      >
                                        <motion.a className={cx(styles.link4, styles.link2)}>
                                          <PropertyOverrides
                                            breakpoint={baseVariant}
                                            overrides={{ Phone: { width: `calc(${viewportWidth} - 40px)` } }}
                                          >
                                            <ComponentViewportProvider
                                              height={455}
                                              width={`max((${viewportWidth} - 80px) / 3, 1px)`}
                                            >
                                              <Container className={styles.projectCard3}>
                                                <ProjectCard
                                                  subtitle={category2}
                                                  videoWide1
                                                  title={title2}
                                                  height="100%"
                                                  videoPortrait={thumbnailVideoPortrait2}
                                                  videoSquare1
                                                  style={{ width: "100%" }}
                                                  thumbnailPortrait={toResponsiveImage(thumbnailPortrait2)}
                                                  variant={matchVariant("Project Card - Portrait")}
                                                  width="100%"
                                                  videoPortrait1={isSet(thumbnailVideoPortrait2)}
                                                />
                                              </Container>
                                            </ComponentViewportProvider>
                                          </PropertyOverrides>
                                        </motion.a>
                                      </Link>
                                    </PathVariablesContext.Provider>
                                  </LayoutGroup>
                                );
                              },
                            )}
                          </>
                        );
                      }}
                    </QueryData>
                  </ChildrenCanSuspend>
                </div>
              </div>
            </div>
          </motion.main>
        </motion.div>
        <div id="overlay" />
      </LayoutGroup>
    </GeneratedComponentContext.Provider>
  );
});

export default asPage(HalvCasestudyPage);

HalvCasestudyPage.displayName = "Halv";

HalvCasestudyPage.defaultProps = { height: 29305, width: 1200 };

HalvCasestudyPage.loader = {
  load: (props, context) => {
    const locale = context.locale;
    const priority = context.priority;
    const queryCacheEntry = queryCache.get(query(), locale, priority);
    const queryCacheEntry1 = queryCache.get(query1(), locale, priority);
    const queryCacheEntry2 = queryCache.get(query2(), locale, priority);
    return runTasksWithYield(
      [
        () => queryCacheEntry.preload(),
        () => queryCacheEntry1.preload(),
        () => queryCacheEntry2.preload(),
        () => forwardLoader(TextLink, {}, context),
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry1.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
        async () => {
          const parentData = (await runWithYield(() => queryCacheEntry2.readMaybeAsync(), context)) ?? [];
          return runTasksWithYield(
            parentData.flatMap((item) => () => forwardLoader(ProjectCard, {}, context)),
            context,
          );
        },
      ],
      context,
    );
  },
};
