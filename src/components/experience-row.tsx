"use client";

import "@/styles/fonts/inter.css";
import styles from "./experience-row.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  RichText,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body11Uppercase from "@/styles/text/body-11-uppercase";
import * as body13Uppercase from "@/styles/text/body-13-uppercase";
import * as body13 from "@/styles/text/body-13";

const cycleOrder = ["Experience Row", "Experience Row - mobile"];

const transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" } as const;

const getProps = ({
  company,
  dates,
  height,
  id,
  role,
  width,
  onCompanyChange,
  onDatesChange,
  onRoleChange,
  ...props
}: any) => ({
  ...props,
  role: role ?? "Digital Designer",
  company: company ?? "Invisible Dynamics",
  variant: props.variant ?? "Experience Row",
  dates: dates ?? "April 2025 — Present",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "Experience Row" | "Experience Row - mobile";
  role?: string;
  company?: string;
  dates?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ExperienceRow = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, role, company, dates, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, variants } = useVariantState({
    cycleOrder,
    defaultVariant: "Experience Row",
    ref: refBinding,
    variant,
  });

  const layoutDependency = createLayoutDependency(props, variants);

  const scopingClassNames = cx(
    styles.experienceRow,
    body13.className,
    body13Uppercase.className,
    body11Uppercase.className,
  );

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        layoutDependency={layoutDependency}
        layoutId="Experience Row"
        ref={refBinding}
        style={style}
      >
        <motion.div
          className={styles.topRow}
          data-name="Top Row"
          layoutDependency={layoutDependency}
          layoutId="Top Row"
        >
          <motion.div
            className={styles.left}
            data-name="Left"
            layoutDependency={layoutDependency}
            layoutId="Left"
          >
            <RichText
              className={styles.text}
              fonts={["Inter"]}
              layoutDependency={layoutDependency}
              layoutId="text"
              text={role}
              verticalAlignment="top"
              withExternalLayout
            >
              <>
                <motion.p className="text-body-13" dir="auto">
                  Digital Designer
                </motion.p>
              </>
            </RichText>
            <RichText
              children={
                <>
                  <motion.p className="text-body-13-uppercase" dir="auto">
                    Invisible Dynamics
                  </motion.p>
                </>
              }
              className={styles.text2}
              fonts={["Inter"]}
              layoutDependency={layoutDependency}
              layoutId="text 2"
              text={company}
              variants={{ "Experience Row - mobile": { "--left-text-color": "rgb(0, 0, 0)" } }}
              verticalAlignment="top"
              withExternalLayout
              {...addPropertyOverrides(
                {
                  "Experience Row - mobile": {
                    children: (
                      <>
                        <motion.p
                          className="text-body-11-uppercase"
                          dir="auto"
                          style={{ "--df-text-color": "var(--left-text-color, rgb(0, 0, 0))" }}
                        >
                          Invisible Dynamics
                        </motion.p>
                      </>
                    ),
                  },
                },
                baseVariant,
                gestureVariant,
              )}
            />
          </motion.div>
          <motion.div className={styles.frame} layoutDependency={layoutDependency} layoutId="layer">
            <RichText
              children={
                <>
                  <motion.p className="text-body-13-uppercase" dir="auto">
                    April 2025 — Present
                  </motion.p>
                </>
              }
              className={styles.topRowText}
              fonts={["Inter"]}
              layoutDependency={layoutDependency}
              layoutId="text 3"
              text={dates}
              variants={{ "Experience Row - mobile": { "--top-row-text-color": "rgb(0, 0, 0)" } }}
              verticalAlignment="top"
              withExternalLayout
              {...addPropertyOverrides(
                {
                  "Experience Row - mobile": {
                    children: (
                      <>
                        <motion.p
                          className="text-body-11-uppercase"
                          dir="auto"
                          style={{ "--df-text-color": "var(--top-row-text-color, rgb(0, 0, 0))" }}
                        >
                          April 2025 — Present
                        </motion.p>
                      </>
                    ),
                  },
                },
                baseVariant,
                gestureVariant,
              )}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </VariantScope>
  );
});

export default ExperienceRow;

ExperienceRow.displayName = "Experience Row";

ExperienceRow.defaultProps = { height: 38, width: 148 };
