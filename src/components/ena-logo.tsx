"use client";

import styles from "./ena-logo.module.css";
import { createLayoutDependency, cx, SVG, useFallbackRef, useVariantState, VariantScope } from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({ height, id, width, ...props }: any) => ({ ...props });

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: string;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const EnaLogo = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, ...restProps } = getProps(props);

  const { classNames, gestureHandlers, variants } = useVariantState({
    defaultVariant: "kVz36CBeh",
    ref: refBinding,
    variant,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(styles.enaLogo, styles.root, className, classNames)}
        data-name="Variant 1"
        layoutDependency={layoutDependency}
        layoutId="Variant 1"
        ref={refBinding}
        style={style}
      >
        <SVG
          className={styles.enaLogowhite}
          data-name="ena_logowhite"
          layout="position"
          layoutDependency={layoutDependency}
          layoutId="ena_logowhite"
          opacity={1}
          svg={
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 53 20"><g id="ss11189347659_1"><path d="M 0 0 L 53 0 L 53 20 L 0 20 Z" fill="transparent"></path><g id="ss11189347659_3"><path d="M 0 0 L 53 0 L 53 20 L 0 20 Z" fill="transparent"></path><path d="M 14 12.8 C 14.039 12.695 14.14 12.624 14.252 12.624 L 16.982 12.624 C 17.125 12.624 17.196 12.694 17.162 12.834 C 16.622 16.605 13.821 19.354 9.046 19.354 C 3.3 19.354 0.21 15.443 0.21 9.912 C 0.21 4.38 3.515 0.363 8.866 0.363 C 14.217 0.363 17.413 4.028 17.484 10.052 C 17.484 10.192 17.413 10.262 17.27 10.262 L 3.478 10.262 C 3.586 14.737 5.454 17.098 9.081 17.098 C 11.811 17.098 13.461 15.583 14.001 12.8 Z M 3.587 8.08 L 13.93 8.08 C 13.822 5.084 12.17 2.582 8.902 2.582 C 5.849 2.582 4.053 4.592 3.587 8.079 Z M 22.204 18.72 C 22.204 18.86 22.132 18.93 21.989 18.93 L 19.045 18.93 C 18.902 18.93 18.828 18.86 18.828 18.72 L 18.9 10.687 L 18.863 1 C 18.863 0.86 18.935 0.79 19.079 0.79 L 21.844 0.79 C 21.987 0.79 22.059 0.86 22.059 1 L 21.987 3.959 C 23.101 2.089 25.185 0.363 28.13 0.363 C 31.936 0.363 34.343 2.829 34.343 7.586 L 34.343 11.181 L 34.415 18.721 C 34.415 18.861 34.343 18.931 34.2 18.931 L 31.29 18.931 C 31.148 18.931 31.076 18.861 31.076 18.721 L 31.113 11.181 L 31.113 7.692 C 31.113 4.31 29.568 2.795 27.235 2.795 C 24.901 2.795 22.855 4.733 22.135 8.255 L 22.135 11.18 L 22.207 18.72 L 22.205 18.72 Z M 49.233 0.997 C 49.233 0.857 49.304 0.787 49.447 0.787 L 52.32 0.787 C 52.463 0.787 52.535 0.857 52.535 0.997 L 52.463 9.665 L 52.535 18.72 C 52.535 18.86 52.463 18.93 52.32 18.93 L 49.447 18.93 C 49.304 18.93 49.233 18.86 49.233 18.72 L 49.304 16.078 C 48.082 18.087 46.072 19.284 43.415 19.284 C 38.424 19.284 35.765 15.162 35.765 9.912 C 35.765 4.662 38.603 0.434 43.488 0.434 C 46.075 0.434 48.085 1.526 49.305 3.534 L 49.233 0.998 Z M 49.413 10.016 C 49.449 5.366 47.582 2.686 44.313 2.653 C 40.757 2.617 39.104 5.542 39.104 9.665 C 39.104 14.035 40.755 17.065 44.239 17.028 C 47.435 17.028 49.374 14.667 49.411 10.016 L 49.412 10.016 Z" fill="rgb(255, 255, 255)"></path></g></g></svg>'
          }
          svgContentId={11189347659}
          withExternalLayout
        />
      </motion.div>
    </VariantScope>
  );
});

export default EnaLogo;

EnaLogo.displayName = "ena logo";

EnaLogo.defaultProps = { height: 20, width: 53 };
