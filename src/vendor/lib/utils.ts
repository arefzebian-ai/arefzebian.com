// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { useMemo } from "react";
import { ControlType } from "@/deframer";

/*
 ** ICON UTILS
 ** Pull as much re-usable logic into here as possible
 ** This will make it easier to replace in all icon components
 */
export const defaultEvents: any = {
  onClick: { type: ControlType.EventHandler },
  onMouseDown: { type: ControlType.EventHandler },
  onMouseUp: { type: ControlType.EventHandler },
  onMouseEnter: { type: ControlType.EventHandler },
  onMouseLeave: { type: ControlType.EventHandler },
};
const findByArray = (arr?, search?) => arr.find((a) => a.toLowerCase().includes(search));
export function getIconSelection(
  iconKeys?,
  selectByList?,
  iconSearch: any = "",
  iconSelection?,
  lowercaseIconKeyPairs?,
): any {
  // gotta get the exact match first THEN find
  // have a set and try to access ?
  if (selectByList) return iconSelection;
  if (iconSearch == null || (iconSearch === null || iconSearch === void 0 ? void 0 : iconSearch.length) === 0)
    return null;
  const iconSearchTerm = iconSearch.toLowerCase().replace(/-|\s/g, "");
  var _iconSearchTerm; // check for exact match, otherwise use .find
  const searchResult =
    (_iconSearchTerm = lowercaseIconKeyPairs[iconSearchTerm]) !== null && _iconSearchTerm !== void 0
      ? _iconSearchTerm
      : findByArray(iconKeys, iconSearchTerm);
  return searchResult;
}
export function useIconSelection<T = any>(
  iconKeys?,
  selectByList?,
  iconSearch: any = "",
  iconSelection?,
  lowercaseIconKeyPairs?,
): any {
  // Clean search term
  const iconSearchResult = useMemo(() => {
    if (
      iconSearch == null ||
      (iconSearch === null || iconSearch === void 0 ? void 0 : iconSearch.length) === 0
    )
      return null;
    const iconSearchTerm = iconSearch.toLowerCase().replace(/-|\s/g, "");
    var _iconSearchTerm; // check for exact match, otherwise use .find
    const searchResult =
      (_iconSearchTerm = lowercaseIconKeyPairs[iconSearchTerm]) !== null && _iconSearchTerm !== void 0
        ? _iconSearchTerm
        : findByArray(iconKeys, iconSearchTerm);
    return searchResult;
  }, [iconSelection, iconSearch]);
  const name = selectByList ? iconSelection : iconSearchResult;
  return name;
}
