"use client";

import "@/styles/fonts/dm-sans.css";
import styles from "./share-article-button.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  RichText,
  SVG,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const cycleOrder = ["Share Article", "Share Article - Hover"];

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({ height, id, width, ...props }: any) => ({
  ...props,
  variant: props.variant ?? "Share Article",
});

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Share Article" | "Share Article - Hover";
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ShareArticleButton = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({ cycleOrder, defaultVariant: "Share Article", ref: refBinding, variant });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterShareArticle = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("Share Article - Hover");
  });

  const onMouseLeaveShareArticleHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("Share Article");
  });

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.shareArticleButton, styles.root, className, classNames)}
        data-name={baseVariant}
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="Share Article"
        onMouseEnter={onMouseEnterShareArticle}
        ref={refBinding}
        style={{
          backgroundColor: "rgb(246, 246, 246)",
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          ...style,
        }}
        variants={{ "Share Article - Hover": { backgroundColor: "rgb(227, 227, 227)" } }}
        {...addPropertyOverrides(
          { "Share Article - Hover": { onMouseLeave: onMouseLeaveShareArticleHover } },
          baseVariant,
          gestureVariant,
        )}
      >
        <RichText
          className={styles.share}
          data-name="Share"
          fonts={["GF;DM Sans-500"]}
          layoutDependency={layoutDependency}
          layoutId="Share"
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p
              style={{
                "--font-selector": "R0Y7RE0gU2Fucy01MDA=",
                "--df-font-family": '"DM Sans", "DM Sans Placeholder", sans-serif',
                "--df-font-size": "13px",
                "--df-font-weight": "500",
                "--df-line-height": "117%",
                "--df-text-transform": "uppercase",
              }}
            >
              share
            </motion.p>
          </>
        </RichText>
        <SVG
          className={styles.svg}
          data-name="SVG"
          fill="rgba(0,0,0,1)"
          intrinsicHeight={16}
          intrinsicWidth={16}
          layoutDependency={layoutDependency}
          layoutId="SVG"
          svg={
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M10.6395 10.4015C10.2208 10.4015 9.83006 10.5313 9.50829 10.7523L6.90989 8.70922C6.99275 8.48891 7.03963 8.25224 7.03963 8.00135C7.03963 7.74504 6.98952 7.49974 6.90217 7.27479L9.46151 5.21932C9.79093 5.45932 10.1988 5.60156 10.6394 5.60156C11.7441 5.60156 12.6394 4.7062 12.6394 3.60156C12.6394 2.49692 11.7441 1.60156 10.6394 1.60156C9.53317 1.60156 8.63943 2.49692 8.63943 3.60156C8.63943 3.82974 8.67687 4.04844 8.74729 4.2523L6.14889 6.33896C5.83321 6.12646 5.4505 6.00151 5.03946 6.00151C3.93368 6.00151 3.03906 6.89687 3.03906 8.00151C3.03906 9.10615 3.93365 10.0015 5.03933 10.0015C5.45646 10.0015 5.8472 9.87333 6.16906 9.65302L8.76746 11.6953C8.6846 11.9156 8.63929 12.1538 8.63929 12.4015C8.63929 13.5062 9.53303 14.4015 10.6393 14.4015C11.7439 14.4015 12.6393 13.5062 12.6393 12.4015C12.6393 11.2969 11.744 10.4015 10.6393 10.4015L10.6395 10.4015Z" fill="black"/>\n</svg>\n'
          }
          withExternalLayout
        />
      </motion.div>
    </VariantScope>
  );
});

export default ShareArticleButton;

ShareArticleButton.displayName = "Share Article - Button";

ShareArticleButton.defaultProps = { height: 32, width: 90.5 };
