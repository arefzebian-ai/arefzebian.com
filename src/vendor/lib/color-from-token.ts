// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { Color } from "@/deframer";

export function colorFromToken(color?): any {
  if (color.startsWith("var(--token-")) return "rgb" + color.split(") /*")[0].split(", rgb")[1];
  return color;
}
export function colorTokentoValue(color?): any {
  return Color(colorFromToken(color)).toValue();
}
