"use client";

import { jsx as _jsx } from "@/deframer/jsx-runtime";
import * as React from "react";

function ScrollBlockerOverride(_props?: any) {
  React.useEffect(() => {
    // Save original overflow
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow; // Lock scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden"; // Unlock scroll after 3.5s
    const timer = setTimeout(() => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    }, 3500); // Cleanup if the override is removed or the component unmounts
    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []); // Since this is an override, we return an empty object
  // (or override properties for the attached layer).
  return {};
}
import { useContext as __legacyOverrideHOC_useContext } from "react";
import { DataObserverContext as __legacyOverrideHOC_DataObserverContext } from "@/deframer";
export function withScrollBlockerOverride(C) {
  return (props) => {
    __legacyOverrideHOC_useContext(__legacyOverrideHOC_DataObserverContext);
    return _jsx(C, { ...props, ...ScrollBlockerOverride(props) });
  };
}
withScrollBlockerOverride.displayName = "ScrollBlockerOverride";
