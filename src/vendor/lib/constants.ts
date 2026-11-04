// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { ControlType } from "@/deframer";

export const fontStack: any = `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const containerStyles: any = {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const emptyStateStyle: any = {
  ...containerStyles,
  borderRadius: 6,
  background: "rgba(136, 85, 255, 0.3)",
  color: "#85F",
  border: "1px dashed #85F",
  flexDirection: "column",
};
export const defaultEvents: any = {
  onClick: {
    type: ControlType.EventHandler,
  },
  onMouseEnter: {
    type: ControlType.EventHandler,
  },
  onMouseLeave: {
    type: ControlType.EventHandler,
  },
};
const fontSizeOptions: any = {
  type: ControlType.Number,
  title: "Font Size",
  min: 2,
  max: 200,
  step: 1,
  displayStepper: true,
};
const fontControls: any = {
  font: {
    type: ControlType.Boolean,
    title: "Font",
    defaultValue: false,
    disabledTitle: "Default",
    enabledTitle: "Custom",
  },
  fontFamily: {
    type: ControlType.String,
    title: "Family",
    placeholder: "Inter",
    hidden: ({ font }: any) => !font,
  },
  fontWeight: {
    type: ControlType.Enum,
    title: "Weight",
    options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    optionTitles: [
      "Thin",
      "Extra-light",
      "Light",
      "Regular",
      "Medium",
      "Semi-bold",
      "Bold",
      "Extra-bold",
      "Black",
    ],
    hidden: ({ font }: any) => !font,
  },
};
// @TODO check if we're missing anything here — there doesn't seem to be a reliable browser API for this
