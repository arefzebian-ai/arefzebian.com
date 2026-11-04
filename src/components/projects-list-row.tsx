"use client";

import "@/styles/fonts/inter.css";
import styles from "./projects-list-row.module.css";
import {
  addPropertyOverrides,
  createLayoutDependency,
  cx,
  RichText,
  useActiveVariantCallback,
  useFallbackRef,
  useVariantState,
  VariantScope,
} from "@/deframer";
import { motion } from "motion/react";
import * as React from "react";
import * as body17 from "@/styles/text/body-17";

const cycleOrder = ["List View - Desktop", "List View - Desktop - Hover", "List View - Mobile"];

const variantClassNames = { "List View - Mobile": styles.listViewMobile };

const transition1 = { duration: 0, type: "tween" } as const;

const getProps = ({ client, height, id, sector, title, width, year, ...props }: any) => ({
  ...props,
  sector: sector ?? "Tech",
  title: title ?? "Origins",
  variant: props.variant ?? "List View - Desktop",
  year: year ?? "2023",
  client: client ?? "Zenith",
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: Record<string, unknown>;
  className?: string;
  layoutId?: string | number;
  variant?: "List View - Desktop" | "List View - Desktop - Hover" | "List View - Mobile";
  title?: string;
  sector?: string;
  year?: string;
  client?: string;
  // Change handlers of props an instance binds to its own variables (`onTitleChange`).
  [changeHandler: `on${string}Change`]: ((value: any) => void) | undefined;
}

const ProjectsListRow = React.forwardRef<HTMLDivElement, Props>(function (props, ref) {
  const refBinding = useFallbackRef(ref);

  const defaultLayoutId = React.useId();

  const { style, className, layoutId, variant, title, sector, year, client, ...restProps } = getProps(props);

  const { baseVariant, classNames, gestureHandlers, gestureVariant, setGestureState, setVariant, variants } =
    useVariantState({
      cycleOrder,
      defaultVariant: "List View - Desktop",
      ref: refBinding,
      variant,
      variantClassNames,
    });

  const layoutDependency = createLayoutDependency(props, variants);

  const { activeVariantCallback } = useActiveVariantCallback(baseVariant);

  const onMouseEnterListViewDesktop = activeVariantCallback(async () => {
    setGestureState({ isHovered: true });
    setVariant("List View - Desktop - Hover");
  });

  const onMouseLeaveListViewDesktopHover = activeVariantCallback(async () => {
    setGestureState({ isHovered: false });
    setVariant("List View - Desktop");
  });

  const scopingClassNames = cx(styles.projectsListRow, body17.className);

  const isDisplayed = () => {
    if (baseVariant === "List View - Mobile") return false;
    return true;
  };

  return (
    <VariantScope layoutGroup={layoutId ?? defaultLayoutId} animate={variants} transition={transition1}>
      <motion.div
        {...restProps}
        {...gestureHandlers}
        className={cx(scopingClassNames, styles.root, className, classNames)}
        data-name={baseVariant}
        data-highlight
        layoutDependency={layoutDependency}
        layoutId="List View Desktop"
        onMouseEnter={onMouseEnterListViewDesktop}
        ref={refBinding}
        style={style}
        {...addPropertyOverrides(
          {
            "List View - Mobile": { "data-highlight": undefined, onMouseEnter: undefined },
            "List View - Desktop - Hover": { onMouseLeave: onMouseLeaveListViewDesktopHover },
          },
          baseVariant,
          gestureVariant,
        )}
      >
        <RichText
          className={styles.apexLab}
          data-name="Apex Lab"
          fonts={["Inter"]}
          layoutDependency={layoutDependency}
          layoutId="Apex Lab"
          style={{ opacity: 0.5 }}
          text={title}
          variants={{ "List View - Mobile": { opacity: 1 }, "List View - Desktop - Hover": { opacity: 1 } }}
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p className="text-body-17">Origins</motion.p>
          </>
        </RichText>
        {isDisplayed() && (
          <RichText
            className={styles.zenith}
            data-name="Zenith"
            fonts={["Inter"]}
            layoutDependency={layoutDependency}
            layoutId="Zenith"
            style={{ opacity: 0.5 }}
            text={client}
            variants={{ "List View - Desktop - Hover": { opacity: 1 } }}
            verticalAlignment="top"
            withExternalLayout
          >
            <>
              <motion.p className="text-body-17">Zenith</motion.p>
            </>
          </RichText>
        )}
        <RichText
          className={styles.tech}
          data-name="Tech"
          fonts={["Inter"]}
          layoutDependency={layoutDependency}
          layoutId="Tech"
          style={{ opacity: 0.5 }}
          text={sector}
          variants={{ "List View - Mobile": { opacity: 1 }, "List View - Desktop - Hover": { opacity: 1 } }}
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p className="text-body-17">Tech</motion.p>
          </>
        </RichText>
        <RichText
          className={styles.text2025}
          data-name="2025"
          fonts={["Inter"]}
          layoutDependency={layoutDependency}
          layoutId="2025"
          style={{ opacity: 0.4 }}
          text={year}
          variants={{ "List View - Mobile": { opacity: 1 }, "List View - Desktop - Hover": { opacity: 1 } }}
          verticalAlignment="top"
          withExternalLayout
        >
          <>
            <motion.p className="text-body-17" style={{ "--df-text-alignment": "right" }}>
              2023
            </motion.p>
          </>
        </RichText>
      </motion.div>
    </VariantScope>
  );
});

export default ProjectsListRow;

ProjectsListRow.displayName = "Projects List Row";

ProjectsListRow.defaultProps = { height: 27, width: 1160 };
