// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { addPropertyControls, ControlType } from "@/deframer";

export default function StopScroll(props?): any {
  const { toggle } = props;

  return toggle ? <style data-frameruni-stop-scroll>{`body { overflow: hidden !important; }`}</style> : <></>;
}

StopScroll.displayName = "Stop Scroll";

addPropertyControls(StopScroll, {
  toggle: {
    type: ControlType.Boolean,
    title: "Block Scroll",
    description: "More components at [Framer University](https://frameruni.link/cc).",
  },
});
