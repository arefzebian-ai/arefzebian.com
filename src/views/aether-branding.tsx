"use client";

import "@/styles/fonts/favorit-light.css";
import "@/styles/fonts/inter.css";
import styles from "./aether-branding.module.css";
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
import CTAButton from "@/components/cta-button";
import ProjectCard from "@/components/project-card";
import Works from "@/cms/works";
import { Icon as Material } from "@/vendor/material";

import { caseStudyImageSpring } from "@/lib/motion";
const Image1WithFX = withFX(Image1);



const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-aether-branding-tablet",
  Desktop: "hidden-desktop",
  Phone: "hidden-aether-branding-phone",
};

const query = () => ({
  from: { alias: "works2", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works2", name: "title", type: "Identifier" },
    { collection: "works2", name: "category", type: "Identifier" },
    { collection: "works2", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works2", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works2", name: "worksSlug", type: "Identifier" },
    { collection: "works2", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works2", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 1 },
    type: "BinaryOperation",
  },
});

const QueryData = ({ query, pageSize, children }: any) => {
  const data = useQueryData(query);
  return children(data);
};

const query1 = () => ({
  from: { alias: "works3", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works3", name: "title", type: "Identifier" },
    { collection: "works3", name: "category", type: "Identifier" },
    { collection: "works3", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works3", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works3", name: "worksSlug", type: "Identifier" },
    { collection: "works3", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works3", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works4", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works4", name: "title", type: "Identifier" },
    { collection: "works4", name: "category", type: "Identifier" },
    { collection: "works4", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works4", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works4", name: "worksSlug", type: "Identifier" },
    { collection: "works4", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works4", name: "sortingNumber", type: "Identifier" },
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

const AetherBrandingPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
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

  const componentScopeId = "k42vKKTOQ";

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
          className={cx(styles.page, styles.root, className)}
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
                    pixelWidth: 3840,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/RonXvPSo59rCyfxSzsNBuXu0.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/RonXvPSo59rCyfxSzsNBuXu0.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/RonXvPSo59rCyfxSzsNBuXu0.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/RonXvPSo59rCyfxSzsNBuXu0.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/RonXvPSo59rCyfxSzsNBuXu0.png?width=3840&height=2160 3840w",
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
                    pixelWidth: 3652,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/ez1WAPLNFC0BSiKD08jvpXnSzBo.png?width=3652&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/ez1WAPLNFC0BSiKD08jvpXnSzBo.png?scale-down-to=512&width=3652&height=2160 512w,https://framerusercontent.com/images/ez1WAPLNFC0BSiKD08jvpXnSzBo.png?scale-down-to=1024&width=3652&height=2160 1024w,https://framerusercontent.com/images/ez1WAPLNFC0BSiKD08jvpXnSzBo.png?scale-down-to=2048&width=3652&height=2160 2048w,https://framerusercontent.com/images/ez1WAPLNFC0BSiKD08jvpXnSzBo.png?width=3652&height=2160 3652w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/TqvZYcfudtj2QQka69Oz5f4oxoo.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/TqvZYcfudtj2QQka69Oz5f4oxoo.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/TqvZYcfudtj2QQka69Oz5f4oxoo.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/TqvZYcfudtj2QQka69Oz5f4oxoo.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/TqvZYcfudtj2QQka69Oz5f4oxoo.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/SRxg6tC2iAbJj0da2JruF3ott8.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/SRxg6tC2iAbJj0da2JruF3ott8.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/SRxg6tC2iAbJj0da2JruF3ott8.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/SRxg6tC2iAbJj0da2JruF3ott8.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/SRxg6tC2iAbJj0da2JruF3ott8.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/tVjppSWJ9W1kW4ywwLUdDGblU.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/tVjppSWJ9W1kW4ywwLUdDGblU.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/tVjppSWJ9W1kW4ywwLUdDGblU.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/tVjppSWJ9W1kW4ywwLUdDGblU.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/tVjppSWJ9W1kW4ywwLUdDGblU.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/fzIiUd1ZExl3vXiDiTbaBj88Pw.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/fzIiUd1ZExl3vXiDiTbaBj88Pw.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/fzIiUd1ZExl3vXiDiTbaBj88Pw.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/fzIiUd1ZExl3vXiDiTbaBj88Pw.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/fzIiUd1ZExl3vXiDiTbaBj88Pw.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/ENnmMUGfEsdy6bIAi33AmrjQE.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/ENnmMUGfEsdy6bIAi33AmrjQE.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/ENnmMUGfEsdy6bIAi33AmrjQE.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/ENnmMUGfEsdy6bIAi33AmrjQE.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/ENnmMUGfEsdy6bIAi33AmrjQE.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3652,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/MLSo15QGXpOwv4s1tU7GPre08w.png?width=3652&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/MLSo15QGXpOwv4s1tU7GPre08w.png?scale-down-to=512&width=3652&height=2160 512w,https://framerusercontent.com/images/MLSo15QGXpOwv4s1tU7GPre08w.png?scale-down-to=1024&width=3652&height=2160 1024w,https://framerusercontent.com/images/MLSo15QGXpOwv4s1tU7GPre08w.png?scale-down-to=2048&width=3652&height=2160 2048w,https://framerusercontent.com/images/MLSo15QGXpOwv4s1tU7GPre08w.png?width=3652&height=2160 3652w",
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
                    src: "https://framerusercontent.com/images/rBEyERt4CfVPp7OMgwr96Usjoy8.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/rBEyERt4CfVPp7OMgwr96Usjoy8.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/rBEyERt4CfVPp7OMgwr96Usjoy8.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/rBEyERt4CfVPp7OMgwr96Usjoy8.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/rBEyERt4CfVPp7OMgwr96Usjoy8.png?width=3841&height=2160 3841w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/nuYz4ycLNMueQErE0Vb5PxIGOdQ.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/nuYz4ycLNMueQErE0Vb5PxIGOdQ.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/nuYz4ycLNMueQErE0Vb5PxIGOdQ.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/nuYz4ycLNMueQErE0Vb5PxIGOdQ.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/nuYz4ycLNMueQErE0Vb5PxIGOdQ.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/vp1zpmaZwwZxWWqPnD0TH6lZQc.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/vp1zpmaZwwZxWWqPnD0TH6lZQc.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/vp1zpmaZwwZxWWqPnD0TH6lZQc.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/vp1zpmaZwwZxWWqPnD0TH6lZQc.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/vp1zpmaZwwZxWWqPnD0TH6lZQc.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/HY6cYDWjy6qDwvon7207FInR6Ok.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/HY6cYDWjy6qDwvon7207FInR6Ok.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/HY6cYDWjy6qDwvon7207FInR6Ok.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/HY6cYDWjy6qDwvon7207FInR6Ok.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/HY6cYDWjy6qDwvon7207FInR6Ok.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/o6Jyqak9hQiWaSPMab7bkCBjPk.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/o6Jyqak9hQiWaSPMab7bkCBjPk.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/o6Jyqak9hQiWaSPMab7bkCBjPk.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/o6Jyqak9hQiWaSPMab7bkCBjPk.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/o6Jyqak9hQiWaSPMab7bkCBjPk.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/OPoptfeH5S79TNU4XqmwxIXnSkk.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/OPoptfeH5S79TNU4XqmwxIXnSkk.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/OPoptfeH5S79TNU4XqmwxIXnSkk.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/OPoptfeH5S79TNU4XqmwxIXnSkk.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/OPoptfeH5S79TNU4XqmwxIXnSkk.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3652,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/DEzwaV31ZpHRJVPlYPpGhMhblmQ.png?width=3652&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/DEzwaV31ZpHRJVPlYPpGhMhblmQ.png?scale-down-to=512&width=3652&height=2160 512w,https://framerusercontent.com/images/DEzwaV31ZpHRJVPlYPpGhMhblmQ.png?scale-down-to=1024&width=3652&height=2160 1024w,https://framerusercontent.com/images/DEzwaV31ZpHRJVPlYPpGhMhblmQ.png?scale-down-to=2048&width=3652&height=2160 2048w,https://framerusercontent.com/images/DEzwaV31ZpHRJVPlYPpGhMhblmQ.png?width=3652&height=2160 3652w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/SoJWTxwWW4JVBLRP5hVDd7KwPc.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/SoJWTxwWW4JVBLRP5hVDd7KwPc.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/SoJWTxwWW4JVBLRP5hVDd7KwPc.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/SoJWTxwWW4JVBLRP5hVDd7KwPc.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/SoJWTxwWW4JVBLRP5hVDd7KwPc.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/C37MUrPWyk7SDC8GfGe22vYzP3k.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/C37MUrPWyk7SDC8GfGe22vYzP3k.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/C37MUrPWyk7SDC8GfGe22vYzP3k.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/C37MUrPWyk7SDC8GfGe22vYzP3k.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/C37MUrPWyk7SDC8GfGe22vYzP3k.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/35UYMVicdvq3ms6gK8k8vEL6WMw.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/35UYMVicdvq3ms6gK8k8vEL6WMw.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/35UYMVicdvq3ms6gK8k8vEL6WMw.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/35UYMVicdvq3ms6gK8k8vEL6WMw.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/35UYMVicdvq3ms6gK8k8vEL6WMw.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/fOBI8hCSwyyopLNezd2bxttHDg.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/fOBI8hCSwyyopLNezd2bxttHDg.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/fOBI8hCSwyyopLNezd2bxttHDg.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/fOBI8hCSwyyopLNezd2bxttHDg.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/fOBI8hCSwyyopLNezd2bxttHDg.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/fAU7dPmkH2RL8BBc8bE2mSbGQ.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/fAU7dPmkH2RL8BBc8bE2mSbGQ.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/fAU7dPmkH2RL8BBc8bE2mSbGQ.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/fAU7dPmkH2RL8BBc8bE2mSbGQ.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/fAU7dPmkH2RL8BBc8bE2mSbGQ.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3652,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/nsHAiQMe2VjsyqmrRZW9WkVjlQ.png?width=3652&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/nsHAiQMe2VjsyqmrRZW9WkVjlQ.png?scale-down-to=512&width=3652&height=2160 512w,https://framerusercontent.com/images/nsHAiQMe2VjsyqmrRZW9WkVjlQ.png?scale-down-to=1024&width=3652&height=2160 1024w,https://framerusercontent.com/images/nsHAiQMe2VjsyqmrRZW9WkVjlQ.png?scale-down-to=2048&width=3652&height=2160 2048w,https://framerusercontent.com/images/nsHAiQMe2VjsyqmrRZW9WkVjlQ.png?width=3652&height=2160 3652w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/ekFGH9GLAhiqIPThK9DXSWNQw.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/ekFGH9GLAhiqIPThK9DXSWNQw.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/ekFGH9GLAhiqIPThK9DXSWNQw.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/ekFGH9GLAhiqIPThK9DXSWNQw.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/ekFGH9GLAhiqIPThK9DXSWNQw.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/iaWwR8KswS318YCq4j6ubPp8.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/iaWwR8KswS318YCq4j6ubPp8.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/iaWwR8KswS318YCq4j6ubPp8.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/iaWwR8KswS318YCq4j6ubPp8.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/iaWwR8KswS318YCq4j6ubPp8.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/tnZhmLrt7VoLeIRqGbpPGLQjCws.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/tnZhmLrt7VoLeIRqGbpPGLQjCws.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/tnZhmLrt7VoLeIRqGbpPGLQjCws.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/tnZhmLrt7VoLeIRqGbpPGLQjCws.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/tnZhmLrt7VoLeIRqGbpPGLQjCws.png?width=3841&height=2160 3841w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/zkgr43OCFQlifz4ALp8wkcsRMn0.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/zkgr43OCFQlifz4ALp8wkcsRMn0.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/zkgr43OCFQlifz4ALp8wkcsRMn0.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/zkgr43OCFQlifz4ALp8wkcsRMn0.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/zkgr43OCFQlifz4ALp8wkcsRMn0.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/sjcvCiRxTM6uTo07jAzQaKnv0.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/sjcvCiRxTM6uTo07jAzQaKnv0.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/sjcvCiRxTM6uTo07jAzQaKnv0.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/sjcvCiRxTM6uTo07jAzQaKnv0.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/sjcvCiRxTM6uTo07jAzQaKnv0.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/RXwhqBB4wgWqSetpBFIbdevoJU.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/RXwhqBB4wgWqSetpBFIbdevoJU.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/RXwhqBB4wgWqSetpBFIbdevoJU.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/RXwhqBB4wgWqSetpBFIbdevoJU.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/RXwhqBB4wgWqSetpBFIbdevoJU.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3653,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/D59dJWup57iVSpirYthMMFPESME.png?width=3653&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/D59dJWup57iVSpirYthMMFPESME.png?scale-down-to=512&width=3653&height=2160 512w,https://framerusercontent.com/images/D59dJWup57iVSpirYthMMFPESME.png?scale-down-to=1024&width=3653&height=2160 1024w,https://framerusercontent.com/images/D59dJWup57iVSpirYthMMFPESME.png?scale-down-to=2048&width=3653&height=2160 2048w,https://framerusercontent.com/images/D59dJWup57iVSpirYthMMFPESME.png?width=3653&height=2160 3653w",
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
                    pixelWidth: 3841,
                    sizes: `calc(${viewportWidth} - 40px)`,
                    src: "https://framerusercontent.com/images/aMQszKvV7SFRNxgxz7PcVKQBJzU.png?width=3841&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/aMQszKvV7SFRNxgxz7PcVKQBJzU.png?scale-down-to=512&width=3841&height=2160 512w,https://framerusercontent.com/images/aMQszKvV7SFRNxgxz7PcVKQBJzU.png?scale-down-to=1024&width=3841&height=2160 1024w,https://framerusercontent.com/images/aMQszKvV7SFRNxgxz7PcVKQBJzU.png?scale-down-to=2048&width=3841&height=2160 2048w,https://framerusercontent.com/images/aMQszKvV7SFRNxgxz7PcVKQBJzU.png?width=3841&height=2160 3841w",
                  }}
                  className={styles.image29}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
            </div>
            <div className={styles.backToProject} data-name="Back to Project">
              <ComponentViewportProvider height={37}>
                <Container className={styles.ctaButton}>
                  <CTAButton
                    link="/aether"
                    height="100%"
                    variant={matchVariant("Appear")}
                    width="100%"
                    label="Back to Project"
                  />
                </Container>
              </ComponentViewportProvider>
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
                        Tablet: { link: "/works/grid-view" },
                        Phone: { link: "/works/grid-view", label: "View All" },
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
                                title ??= "";
                                category ??= "";
                                slug ??= "";
                                return (
                                  <LayoutGroup id={`works2-${worksId}`} key={worksId}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug }}>
                                      <Link href="/halv" motionChild nodeId="link" openInNewTab={false}>
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
                                titleWorks ??= "";
                                categoryWorks ??= "";
                                slugWorks ??= "";
                                return (
                                  <LayoutGroup id={`works3-${worksIdWorks}`} key={worksIdWorks}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slugWorks }}>
                                      <Link href="/revimo" motionChild nodeId="link" openInNewTab={false}>
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
                                title2 ??= "";
                                category2 ??= "";
                                slug2 ??= "";
                                return (
                                  <LayoutGroup id={`works4-${worksId2}`} key={worksId2}>
                                    <PathVariablesContext.Provider value={{ worksSlug: slug2 }}>
                                      <Link href="/rivited" motionChild nodeId="link" openInNewTab={false}>
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

export default asPage(AetherBrandingPage);

AetherBrandingPage.displayName = "Pelagostone Casestudy";

AetherBrandingPage.defaultProps = { height: 20660, width: 1200 };

AetherBrandingPage.loader = {
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
        () => forwardLoader(CTAButton, {}, context),
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
