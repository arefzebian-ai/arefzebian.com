"use client";

import "@/styles/fonts/inter.css";
import styles from "./info-content.module.css";
import {
  createLayoutDependency,
  cx,
  RichText,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body14 from "@/styles/text/body-14";

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({ height, id, title, width, onTitleChange, ...props }: any) => ({
  ...props,
  title: title ?? "Label",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  title?: string;
  variant?: string;

  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const InfoContent = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, title, ...restProps } = getProps(props);

  const { classNames, gestureHandlers, variants } = useVariantState({
    defaultVariant: "Text Line",
    ref: refBinding,
    variant,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(styles.infoContent, body14.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name="Text Line"
        layoutDependency={layoutDependency}
        layoutId="Text Line"
        ref={refBinding}
        style={style}
      >
        <RichText
          className={styles.text}
          fonts={["Inter"]}
          layoutDependency={layoutDependency}
          layoutId="text"
          text={title}
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p className="text-body-14" dir="auto">
              Label
            </motion.p>
          </>
        </RichText>
      </motion.div>
    </VariantScope>
  );
});

export default InfoContent;

InfoContent.displayName = "Info Content";

InfoContent.defaultProps = { height: 16, width: 285 };
