"use client";

import { cloneElement as __cloneOverrideElement, isValidElement as __isOverrideElement } from "react";
import type { ComponentType } from "react";

export function AutoCopyrightStatement(Component): ComponentType<any> {
  return (props) => {
    const __overrideChild = props.children;
    const __overrideNestedChild = __overrideChild?.props?.children;
    const textProps = __overrideNestedChild?.props;
    if (textProps && typeof textProps.children == "string") {
      const __overrideText = textProps.children.replace("YYYY", new Date().getFullYear());
      if (__isOverrideElement(__overrideChild) && __isOverrideElement(__overrideNestedChild)) {
        return (
          <Component
            {...props}
            children={__cloneOverrideElement(
              __overrideChild,
              null,
              __cloneOverrideElement(__overrideNestedChild, null, __overrideText),
            )}
          />
        );
      }
      textProps.children = __overrideText;
    }
    return <Component {...props} />;
  };
}
