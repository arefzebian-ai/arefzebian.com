"use client";

import "@/styles/fonts/inter.css";
import styles from "./article-card.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  getLoadingLazyAtYPosition,
  Image,
  RichText,
  toResponsiveImage,
  useActiveVariantCallback,
  useComponentViewport,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body20 from "@/styles/text/body-20";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";

const cycleOrder = [
  "Article Card 1x1",
  "Article Card 1x1 Hover",
  "Article Card - Wide",
  "Article Card Wide - Hover",
];

const variantClassNames = {
  "Article Card 1x1 Hover": styles.articleCard1x1Hover,
  "Article Card - Wide": styles.articleCardWide,
  "Article Card Wide - Hover": styles.articleCardWideHover,
};

const transition1 = { delay: 0, duration: 1, ease: [0.23, 1, 0.32, 1], type: "tween" } as const;

const getProps = ({ category, height, id, image, title, width, ...props }: any) => ({
  ...props,
  title: title ?? "A Letter From the Founders",
  category: category ?? "Type",
  variant: props.variant ?? "Article Card 1x1",
  image: image ?? {
    src: "https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg?scale-down-to=512",
    srcSet:
      "https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg?scale-down-to=512 512w,https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg?scale-down-to=1024 1024w,https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg?scale-down-to=2048 2048w,https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg?scale-down-to=4096 4096w,https://framerusercontent.com/images/nxFofrYSdyDPjS3Q1fnAXJx90Q.jpg 6000w",
  },
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?:
    | "Article Card 1x1"
    | "Article Card 1x1 Hover"
    | "Article Card - Wide"
    | "Article Card Wide - Hover";
  image?: {
    src: string;
    srcSet?: string;
    alt?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    positionX?: string;
    positionY?: string;
  };
  title?: string;
  category?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ArticleCard = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const componentViewport = useComponentViewport();
  const viewportWidth = componentViewport?.width || "100vw";
  const viewportY = componentViewport?.y || 0;

  const { style, className, layoutId, variant, image, title, category, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({
      cycleOrder,
      defaultVariant: "Article Card 1x1",
      ref: refBinding,
      variant,
      variantClassNames,
    });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterArticleCard1x1 = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Article Card 1x1 Hover");
  });

  const onMouseLeaveArticleCard1x1Hover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Article Card 1x1");
  });

  const onMouseEnterArticleCardWide = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Article Card Wide - Hover");
  });

  const onMouseLeaveArticleCardWideHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Article Card - Wide");
  });

  const scopingClassNames = cx(styles.articleCard, body13Uppercase.className, body20.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="Article Card 1x1"
        onMouseEnter={onMouseEnterArticleCard1x1}
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          {
            "Article Card 1x1 Hover": { onMouseLeave: onMouseLeaveArticleCard1x1Hover },
            "Article Card - Wide": { onMouseEnter: onMouseEnterArticleCardWide },
            "Article Card Wide - Hover": {
              onMouseEnter: undefined,
              onMouseLeave: onMouseLeaveArticleCardWideHover,
            },
          },
          baseVariant,
          gestureVariant,
        )}
      >
        <motion.div
          className={styles.container}
          data-name="Container"
          layoutDependency={layoutDependency}
          layoutId="Container"
        >
          <motion.div
            className={styles.imageWrapper}
            data-name="Image Wrapper"
            layoutDependency={layoutDependency}
            layoutId="Image Wrapper"
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <Image
              background={{
                alt: "",
                fit: "fill",
                loading: getLoadingLazyAtYPosition(viewportY),
                sizes: viewportWidth,
                ...toResponsiveImage(image),
              }}
              className={styles.image}
              data-name="Image"
              layoutDependency={layoutDependency}
              layoutId="Image"
              style={{ scale: 1.03 }}
              variants={{ "Article Card 1x1 Hover": { scale: 1 }, "Article Card Wide - Hover": { scale: 1 } }}
            />
          </motion.div>
          <motion.div
            className={styles.details}
            data-name="Details"
            layoutDependency={layoutDependency}
            layoutId="Details"
          >
            <motion.div
              className={styles.lineWrapper}
              data-name="Line wrapper"
              layoutDependency={layoutDependency}
              layoutId="Line wrapper"
            >
              <motion.div
                className={styles.line}
                data-name="Line"
                layoutDependency={layoutDependency}
                layoutId="Line"
              />
              <motion.div
                className={styles.line2}
                data-name="Line"
                layoutDependency={layoutDependency}
                layoutId="Line 2"
              />
            </motion.div>
            <motion.div
              className={styles.heading}
              data-name="Heading"
              layoutDependency={layoutDependency}
              layoutId="Heading"
            >
              <RichText
                className={styles.aLetter}
                data-name="A Letter From the Founders"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="A Letter From the Founders"
                style={{ opacity: 0.5 }}
                text={category}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p className="text-body-13-uppercase">Type</motion.p>
                </>
              </RichText>
              <RichText
                className={styles.text}
                data-name="A Letter From the Founders"
                fonts={["Inter"]}
                layoutDependency={layoutDependency}
                layoutId="A Letter From the Founders 2"
                text={title}
                verticalAlignment="top"
                withExternalLayout
              >
                <>
                  <motion.p className="text-body-20">A Letter From the Founders</motion.p>
                </>
              </RichText>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

export default ArticleCard;

ArticleCard.displayName = "Article Card";

ArticleCard.defaultProps = { height: 484.5, width: 390 };
