// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import * as React from "react";

export function useControlledState(value?): any {
  const [controlledValue, setValue] = React.useState(value);
  React.useEffect(() => {
    setValue(value);
  }, [value]);
  return [controlledValue, setValue];
}
