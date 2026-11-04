// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useMemo } from "react";

const isBrowserSafari: any = () => {
  if (typeof navigator !== `undefined`) {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari =
      (userAgent.indexOf("safari") > -1 ||
        userAgent.indexOf("framermobile") > -1 ||
        userAgent.indexOf("framerx") > -1) &&
      userAgent.indexOf("chrome") < 0;
    return isSafari;
  } else return false;
};
export const useIsBrowserSafari: any = () => useMemo(() => isBrowserSafari(), []);
