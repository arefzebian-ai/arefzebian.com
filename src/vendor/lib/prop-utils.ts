// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useMemo } from "react";
import { ControlType } from "@/deframer";

export function useRadius(props?): any {
  const {
    borderRadius,
    isMixedBorderRadius,
    topLeftRadius,
    topRightRadius,
    bottomRightRadius,
    bottomLeftRadius,
  } = props;
  const radiusValue = useMemo(
    () =>
      isMixedBorderRadius
        ? `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`
        : `${borderRadius}px`,
    [borderRadius, isMixedBorderRadius, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius],
  );
  return radiusValue;
}
export const borderRadiusControl: any = {
  borderRadius: {
    title: "Radius",
    type: ControlType.FusedNumber,
    toggleKey: "isMixedBorderRadius",
    toggleTitles: ["Radius", "Radius per corner"],
    valueKeys: ["topLeftRadius", "topRightRadius", "bottomRightRadius", "bottomLeftRadius"],
    valueLabels: ["TL", "TR", "BR", "BL"],
    min: 0,
  },
};

const paddingControl: any = {
  padding: {
    type: ControlType.FusedNumber,
    toggleKey: "paddingPerSide",
    toggleTitles: ["Padding", "Padding per side"],
    valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    valueLabels: ["T", "R", "B", "L"],
    min: 0,
    title: "Padding",
  },
};
