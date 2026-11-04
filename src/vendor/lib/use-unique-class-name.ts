// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import * as React from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const l = () => letters[Math.floor(Math.random() * letters.length)];
export const randomID: any = () => l() + l() + l() + l() + l() + l() + l() + l() + l();
function createUniqueClass(suffix?) {
  return `df-${suffix}-${randomID()}`;
}
export function useUniqueClassName(suffix?, deps?): any {
  const [className, setClassName] = React.useState(createUniqueClass(suffix));
  React.useEffect(() => {
    setClassName(createUniqueClass(suffix));
  }, [suffix, ...deps]);
  return className;
}
