"use client";

import "@/styles/fonts/favorit-light.css";
import styles from "./pelagostone-casestudy.module.css";
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

const Image1WithFX = withFX(Image1);

const breakpoints = {
  Tablet: "(min-width: 810px) and (max-width: 1199.98px)",
  Desktop: "(min-width: 1200px)",
  Phone: "(max-width: 809.98px)",
} as const;

/** Classes that hide a layer at a breakpoint (the kit styles them per media query). */
const hiddenClassNames = {
  Tablet: "hidden-pelagostone-casestudy-tablet",
  Desktop: "hidden-desktop",
  Phone: "hidden-pelagostone-casestudy-phone",
};

const query = () => ({
  from: { alias: "works25", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works25", name: "title", type: "Identifier" },
    { collection: "works25", name: "category", type: "Identifier" },
    { collection: "works25", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works25", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works25", name: "worksSlug", type: "Identifier" },
    { collection: "works25", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works25", name: "sortingNumber", type: "Identifier" },
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
  from: { alias: "works26", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works26", name: "title", type: "Identifier" },
    { collection: "works26", name: "category", type: "Identifier" },
    { collection: "works26", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works26", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works26", name: "worksSlug", type: "Identifier" },
    { collection: "works26", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works26", name: "sortingNumber", type: "Identifier" },
    operator: "==",
    right: { type: "LiteralValue", value: 3 },
    type: "BinaryOperation",
  },
});

const query2 = () => ({
  from: { alias: "works27", data: Works, type: "Collection" },
  limit: { type: "LiteralValue", value: 1 },
  select: [
    { collection: "works27", name: "title", type: "Identifier" },
    { collection: "works27", name: "category", type: "Identifier" },
    { collection: "works27", name: "thumbnailPortrait", type: "Identifier" },
    { collection: "works27", name: "thumbnailVideoPortrait", type: "Identifier" },
    { collection: "works27", name: "worksSlug", type: "Identifier" },
    { collection: "works27", name: "id", type: "Identifier" },
  ],
  where: {
    left: { collection: "works27", name: "sortingNumber", type: "Identifier" },
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

const PelagostoneCasestudyPage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
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

  const componentScopeId = "nWZyXECY1";

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
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/buP2mfPRNKQ6jINSis4Zb8LxEsM.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle2} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/nAFLjCivVh8RDp3WF3a1tzY6cI.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/nAFLjCivVh8RDp3WF3a1tzY6cI.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/nAFLjCivVh8RDp3WF3a1tzY6cI.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/nAFLjCivVh8RDp3WF3a1tzY6cI.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/nAFLjCivVh8RDp3WF3a1tzY6cI.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image2}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle3} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/tLcwMLN9RObbIdzYa4QnK0CM.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/tLcwMLN9RObbIdzYa4QnK0CM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/tLcwMLN9RObbIdzYa4QnK0CM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/tLcwMLN9RObbIdzYa4QnK0CM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/tLcwMLN9RObbIdzYa4QnK0CM.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image3}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle4} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/xC1nQAHGIllSjRLlegRpXz3WGo.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/xC1nQAHGIllSjRLlegRpXz3WGo.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/xC1nQAHGIllSjRLlegRpXz3WGo.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/xC1nQAHGIllSjRLlegRpXz3WGo.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/xC1nQAHGIllSjRLlegRpXz3WGo.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image4}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle5} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/JGHxfXyzF2zCirfjJjEERxEA5s.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/JGHxfXyzF2zCirfjJjEERxEA5s.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/JGHxfXyzF2zCirfjJjEERxEA5s.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/JGHxfXyzF2zCirfjJjEERxEA5s.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/JGHxfXyzF2zCirfjJjEERxEA5s.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image5}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle6} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/HkTwd8mVOduN2kOFCpHuSkS5to.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/HkTwd8mVOduN2kOFCpHuSkS5to.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/HkTwd8mVOduN2kOFCpHuSkS5to.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/HkTwd8mVOduN2kOFCpHuSkS5to.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/HkTwd8mVOduN2kOFCpHuSkS5to.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image6}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle7} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/ywdW95QxuvZaLrnGWZ1xs1tStT8.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/ywdW95QxuvZaLrnGWZ1xs1tStT8.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/ywdW95QxuvZaLrnGWZ1xs1tStT8.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/ywdW95QxuvZaLrnGWZ1xs1tStT8.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/ywdW95QxuvZaLrnGWZ1xs1tStT8.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image7}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle8} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/0d8P2fsrhrm8Wlpar2I0Ro0stI.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/0d8P2fsrhrm8Wlpar2I0Ro0stI.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/0d8P2fsrhrm8Wlpar2I0Ro0stI.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/0d8P2fsrhrm8Wlpar2I0Ro0stI.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/0d8P2fsrhrm8Wlpar2I0Ro0stI.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image8}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle9} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/JO3Y2JmAvu4AGaERqOJ8wgd8IRM.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/JO3Y2JmAvu4AGaERqOJ8wgd8IRM.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/JO3Y2JmAvu4AGaERqOJ8wgd8IRM.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/JO3Y2JmAvu4AGaERqOJ8wgd8IRM.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/JO3Y2JmAvu4AGaERqOJ8wgd8IRM.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image9}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle10} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/jzw5ZSfVte8SgoeVsHQjiY6wCzo.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/jzw5ZSfVte8SgoeVsHQjiY6wCzo.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/jzw5ZSfVte8SgoeVsHQjiY6wCzo.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/jzw5ZSfVte8SgoeVsHQjiY6wCzo.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/jzw5ZSfVte8SgoeVsHQjiY6wCzo.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image10}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
              <div className={styles.sectionImageSingle11} data-name="Section Image Single">
                <Image1WithFX
                  __fx_spring={{
                    damping: 60,
                    delay: 0,
                    duration: 0.3,
                    ease: [0.44, 0, 0.56, 1],
                    mass: 1,
                    stagger: 0,
                    stiffness: 500,
                    type: "spring",
                  }}
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
                    src: "https://framerusercontent.com/images/qbLP4oqIx3tVb6LHXzEHkTZv6Y.png?width=3840&height=2160",
                    srcSet:
                      "https://framerusercontent.com/images/qbLP4oqIx3tVb6LHXzEHkTZv6Y.png?scale-down-to=512&width=3840&height=2160 512w,https://framerusercontent.com/images/qbLP4oqIx3tVb6LHXzEHkTZv6Y.png?scale-down-to=1024&width=3840&height=2160 1024w,https://framerusercontent.com/images/qbLP4oqIx3tVb6LHXzEHkTZv6Y.png?scale-down-to=2048&width=3840&height=2160 2048w,https://framerusercontent.com/images/qbLP4oqIx3tVb6LHXzEHkTZv6Y.png?width=3840&height=2160 3840w",
                  }}
                  className={styles.image11}
                  data-name="Image"
                  style={{ transformPerspective: 1200 }}
                />
              </div>
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
                                  <LayoutGroup id={`works25-${worksId}`} key={worksId}>
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
                                  <LayoutGroup id={`works26-${worksIdWorks}`} key={worksIdWorks}>
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
                                  <LayoutGroup id={`works27-${worksId2}`} key={worksId2}>
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

export default asPage(PelagostoneCasestudyPage);

PelagostoneCasestudyPage.displayName = "Halv Casestudy";

PelagostoneCasestudyPage.defaultProps = { height: 8690, width: 1200 };

PelagostoneCasestudyPage.loader = {
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
