"use client";

import "@/styles/fonts/inter.css";
import styles from "./legal-page-link.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  Link,
  RichText,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body20 from "@/styles/text/body-20";

const enabledGestures = { "Legal Link Un-Active": { hover: true } };

const cycleOrder = ["Legal Link Active", "Legal Link Un-Active"];

const variantClassNames = { "Legal Link Un-Active": styles.legalLinkUnActive };

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({ height, id, title, width, ...props }: any) => ({
  ...props,
  title: title ?? "01 Terms & Conditions",
  variant: props.variant ?? "Legal Link Active",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Legal Link Active" | "Legal Link Un-Active";
  title?: string;
  link?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const LegalPageLink = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, title, link, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Legal Link Active",
    enabledGestures,
    ref: refBinding,
    variant,
    variantClassNames,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(styles.legalPageLink, body20.className);

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <Link href={link} motionChild nodeId="Legal Link Active" smoothScroll>
        <motion.a
          {...restProps}
          {...gestureHandlers}
          className={`${cx(scopingClassNames, styles.root, className, classNames)} ${styles.component}`}
          data-name="Legal Link Active"
          layoutDependency={layoutDependency}
          layoutId="Legal Link Active"
          ref={refBinding}
          style={style}
          {...addPropertyOverrides(
            {
              "Legal Link Un-Active-hover": { "data-name": undefined },
              "Legal Link Un-Active": { "data-name": "Legal Link Un-Active" },
            },
            baseVariant,
            gestureVariant,
          )}
        >
          <RichText
            className={styles.text01TermsConditions}
            data-name={"01 Terms & Conditions"}
            fonts={["Inter"]}
            layoutDependency={layoutDependency}
            layoutId={"01 Terms & Conditions"}
            style={{ opacity: 1 }}
            text={title}
            variants={{
              "Legal Link Un-Active-hover": { opacity: 0.6 },
              "Legal Link Un-Active": { opacity: 0.4 },
            }}
            verticalAlignment="top"
            withExternalLayout
          >
            <>
              <motion.p className="text-body-20">01 Terms &amp; Conditions</motion.p>
            </>
          </RichText>
        </motion.a>
      </Link>
    </VariantScope>
  );
});

export default LegalPageLink;

LegalPageLink.displayName = "Legal Page Link";

LegalPageLink.defaultProps = { height: 23.5, width: 205 };
