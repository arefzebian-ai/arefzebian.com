"use client";

import styles from "./loader-image.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  getLoadingLazyAtYPosition,
  Image as Image1,
  toResponsiveImage,
  Transition,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useOnVariantChange,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const cycleOrder = ["Initial State", "Loader Image 1", "Loader Image 2"];

const variantClassNames = { "Loader Image 1": styles.loaderImage1, "Loader Image 2": styles.loaderImage2 };

const transition1 = { delay: 0, duration: 1.5, ease: [0.2, 0.93, 0.37, 1.01], type: "tween" } as const;

const transition2 = { duration: 0, type: "tween" } as const;

const getProps = ({ height, id, image1, image2, image3, width, ...props }: any) => ({
  ...props,
  image1: image1 ?? {
    pixelHeight: 1080,
    pixelWidth: 1920,
    src: "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?width=1920&height=1080",
    srcSet:
      "https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=512&width=1920&height=1080 512w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?scale-down-to=1024&width=1920&height=1080 1024w,https://framerusercontent.com/images/iguC8zOegufQq3qunzGmTCRHOw.png?width=1920&height=1080 1920w",
  },
  image3: image3 ?? {
    pixelHeight: 4032,
    pixelWidth: 3024,
    src: "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032",
    srcSet:
      "https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=1024&width=3024&height=4032 768w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?scale-down-to=2048&width=3024&height=4032 1536w,https://framerusercontent.com/images/sCmbcFOIeJRVrUQwP9ZWPs8.jpeg?width=3024&height=4032 3024w",
  },
  variant: props.variant ?? "Initial State",
  image2: image2 ?? {
    pixelHeight: 1143,
    pixelWidth: 2048,
    src: "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143",
    srcSet:
      "https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=512&width=2048&height=1143 512w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?scale-down-to=1024&width=2048&height=1143 1024w,https://framerusercontent.com/images/E9UQ9dj7s8ipOgSn4tRj3ic3kI4.jpg?width=2048&height=1143 2048w",
  },
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Initial State" | "Loader Image 1" | "Loader Image 2";
  image1?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  image2?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  image3?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const LoaderImage = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportHeight = componentViewport?.height || 160;
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, image1, image2, image3, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Initial State",
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);

  const onAppear = activeVariantCallback(async () => {
    await delay(() => setVariant("Loader Image 1", true), 900);
  });

  const onAppearLoaderImage1 = activeVariantCallback(async () => {
    await delay(() => setVariant("Loader Image 2", true), 600);
  });

  useOnVariantChange(baseVariant, {
    default: onAppear,
    "Loader Image 1": onAppearLoaderImage1,
    "Loader Image 2": undefined,
  });

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.loaderImage, styles.root, className, classNames)}
        data-name={baseVariant}
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="Initial State"
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          { "Loader Image 2": { "data-highlight": undefined } },
          baseVariant,
          gestureVariant,
        )}
      >
        <Image1
          background={{
            alt: "",
            fit: "fill",
            loading: getLoadingLazyAtYPosition(viewportY),
            pixelHeight: 4032,
            pixelWidth: 3024,
            sizes: viewportWidth,
            ...toResponsiveImage(image3),
          }}
          className={styles.image}
          data-name="Image 3"
          layoutDependency={layoutDependency}
          layoutId="Image 3"
        />
        <Transition
          {...addPropertyOverrides({ "Loader Image 2": { value: transition2 } }, baseVariant, gestureVariant)}
        >
          <Image1
            background={{
              alt: "",
              fit: "fill",
              loading: getLoadingLazyAtYPosition(viewportY),
              pixelHeight: 1143,
              pixelWidth: 2048,
              sizes: viewportWidth,
              ...toResponsiveImage(image2),
            }}
            className={styles.image2}
            data-name="Image 2"
            layoutDependency={layoutDependency}
            layoutId="Image 2"
            style={{ opacity: 1 }}
            variants={{ "Loader Image 2": { opacity: 0 } }}
          />
        </Transition>
        <Transition
          {...addPropertyOverrides({ "Loader Image 2": { value: transition2 } }, baseVariant, gestureVariant)}
        >
          <Image1
            background={{
              alt: "",
              fit: "fill",
              loading: getLoadingLazyAtYPosition(viewportY + (viewportHeight - (viewportHeight * 1 + 0)) / 2),
              pixelHeight: 1080,
              pixelWidth: 1920,
              sizes: viewportWidth,
              ...toResponsiveImage(image1),
            }}
            className={styles.image3}
            data-name="Image 1"
            layoutDependency={layoutDependency}
            layoutId="Image 1"
            style={{ opacity: 1 }}
            variants={{ "Loader Image 2": { opacity: 0 } }}
          />
        </Transition>
      </motion.div>
    </VariantScope>
  );
});

export default LoaderImage;

LoaderImage.displayName = "Loader Image";

LoaderImage.defaultProps = { height: 160, width: 240 };
