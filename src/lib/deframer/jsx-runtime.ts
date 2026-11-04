// JSX runtime used by the whole project (tsconfig "jsxImportSource": "@/deframer").
// The original runtime publishes on React 18, and its code relies on two React 18 behaviours
// that React 19 changed, so elements are adjusted here before React sees them:
//  - function components honour `defaultProps` (code components,
//    addPropertyControls defaults);
//  - `ref` is never a prop. React 19 hands a function component its element's
//    ref as `props.ref`, so an override written as `<C ref={ref} {...props} />`
//    has its own ref replaced by the (usually empty) ref spread from props. An
//    empty ref (`ref={null}`) is therefore left out, as React 18 did.
// It also hands DOM elements only what React can render (`domProps` below): the original
// runtime's code forwards whatever props it is given to its layers, and React drops the rest
// with a console error in development.

import "./react18-compat";
import React from "react";
import * as runtime from "react/jsx-runtime";
import type { JSX as ReactJSX } from "react/jsx-runtime";
import type {} from "./types";

export const Fragment = runtime.Fragment;

/**
 * JSX types (TypeScript reads them from the jsxImportSource module): React's, where every
 * component instance may also be given what the original runtime's generated code gives every instance,
 * code components and icons included: its layout size, layer id, name and layout id, the
 * layout dependency of its parent's variants, and whether an icon animates
 * (`<Ticker width="100%" height="100%" id="…" layoutId="…" style={…} …>`); inside an animated parent its
 * variant targets, transform template and hover target (`variants={{ "Desktop-hover": … }}`),
 * which components pass on to their root layer; the tag a layer renders as inside a link
 * (`as="a"`), and a form's submit button its `type="submit"`. Those a component may type itself
 * (`style`, `as`, `type`, the motion props: aigentx's VariantFan has a numeric `variants` control) are
 * `unknown` here, so its own type is the one checked.
 */
export namespace JSX {
  export type ElementType = ReactJSX.ElementType;
  export interface Element extends ReactJSX.Element {}
  export interface ElementClass extends ReactJSX.ElementClass {}
  export interface ElementAttributesProperty extends ReactJSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute extends ReactJSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<C, EnumValues<P>>;
  export interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {
    width?: number | string;
    height?: number | string;
    id?: string;
    name?: string;
    layoutId?: string;
    layoutDependency?: unknown;
    animated?: boolean;
    variants?: unknown;
    transformTemplate?: unknown;
    whileHover?: unknown;
    as?: unknown;
    type?: unknown;
    style?: unknown;
  }
  export interface IntrinsicClassAttributes<T> extends ReactJSX.IntrinsicClassAttributes<T> {}
  export interface IntrinsicElements extends ReactJSX.IntrinsicElements {}
}

/**
 * A component's props as an instance may write them: a prop typed as a string enum also takes the
 * enum's values (`play="On"` for `PlayOptions.Normal`), as the original runtime's instances pass them, also
 * inside an object prop (`speed={{ onScroll: "No change" }}`); an object prop may lack fields its type
 * added after the instance saved it (`lightbox` without `iconFile`); and the layout size every
 * instance is given (`width="100%"`) is a size even where a component types its own `width` as a
 * number. (Props of the component's own type are taken as they are, so generic code forwarding
 * `{...props}` checks too.)
 */
type EnumValues<P> = 0 extends 1 & P ? P : P | { [K in keyof P]: K extends "width" | "height" ? EnumValue<P[K], true> | string : EnumValue<P[K], true> };
type EnumValue<V, Nested extends boolean> = V extends string
  ? V | `${V}`
  : Nested extends true
    ? V extends (...args: any[]) => any
      ? V
      : V extends readonly unknown[]
        ? V
        : V extends object
          ? { [K in keyof V]?: EnumValue<V[K], false> }
          : V
    : V;

export function withDefaultProps(type: any, props: any): any {
  const defaults = typeof type === "string" ? undefined : type?.defaultProps;
  if (!defaults) return props;
  let merged = props;
  for (const key in defaults) {
    if (props[key] !== undefined) continue;
    if (merged === props) merged = { ...props };
    merged[key] = defaults[key];
  }
  return merged;
}

/** Props as React 18 would hand them over: defaults applied, no empty `ref`; DOM elements get only what they can render. */
export function react18Props(type: any, props: any): any {
  if (props && "ref" in props && props.ref == null) {
    const { ref, ...rest } = props;
    props = rest;
  }
  return isDomElement(type) ? domProps(props) : withDefaultProps(type, props);
}

/** The key under which a motion component (`motion.div`) holds what it renders (motion's `isMotionComponent`). */
const MOTION_COMPONENT = Symbol.for("motionComponentSymbol");

/** An HTML or SVG element, directly or through motion (`motion.div` renders a `div`); not a custom element, which takes any property. */
function isDomElement(type: any): boolean {
  if (type !== null && typeof type === "object" && MOTION_COMPONENT in type) type = type[MOTION_COMPONENT];
  return typeof type === "string" && !type.includes("-");
}

/**
 * Values of the original runtime's standard property controls that components spread onto their
 * elements with the rest of their props, none of them an attribute: an image value's size and focal
 * point (`<img {...image} />`), the radius and padding controls' fused values (`borderRadius`,
 * `isMixedBorderRadius`, `topLeftRadius` …, `paddingPerSide`, `paddingTop` …).
 */
const CONTROL_VALUE_KEYS = new Set([
  "pixelWidth", "pixelHeight", "positionX", "positionY",
  "borderRadius", "isMixedBorderRadius", "topLeftRadius", "topRightRadius", "bottomRightRadius", "bottomLeftRadius",
  "paddingPerSide", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
]);

/**
 * motion hands a scroll-linked value to the browser (`Element.animate`) at the offsets
 * `[0, ...inputRange, 1]` of its `useTransform`, which the browser refuses unless they rise within
 * 0–1 (monod's text cycle maps each letter's scroll range past 1: "Offsets must be monotonically
 * non-decreasing", and the component crashes). Without the hint motion animates the value itself,
 * as the original runtime's motion does.
 */
function keepAnimatable(value: { accelerate?: { times?: unknown } }): void {
  const times = value.accelerate?.times;
  if (Array.isArray(times) && times.some((time, i) => !(time >= 0 && time <= 1) || (i > 0 && time < times[i - 1]))) delete value.accelerate;
}

/**
 * Props a DOM element can't render, left out as React leaves them out (it only adds a console error):
 * names starting with `$`, which no attribute has (`$control__placeholder`), standard control values
 * (above), and `NaN` style values (a size computed before the element was measured).
 */
export function domProps(props: any): any {
  let result = props;
  for (const key in props) {
    if (key.charCodeAt(0) !== 36 /* $ */ && !CONTROL_VALUE_KEYS.has(key)) continue;
    if (result === props) result = { ...props };
    delete result[key];
  }
  const style = props?.style;
  if (style && typeof style === "object" && !Array.isArray(style)) {
    for (const key in style) {
      if (style[key]?.accelerate) keepAnimatable(style[key]);
      if (!Number.isNaN(style[key])) continue;
      if (result === props) result = { ...props };
      if (result.style === style) result.style = { ...style };
      delete result.style[key];
    }
  }
  return result;
}

export function jsx(type: any, props: any, key?: any) {
  return runtime.jsx(type, react18Props(type, props), key);
}

export function jsxs(type: any, props: any, key?: any) {
  return runtime.jsxs(type, react18Props(type, props), key);
}

/**
 * The automatic JSX transform falls back to `createElement` from the import
 * source itself ("@/deframer") for elements that spread props before a `key`
 * (`<Item {...props} key={id} />`), so index.ts re-exports this one.
 */
export function createElement(type: any, props?: any, ...children: any[]) {
  return React.createElement(type, react18Props(type, props ?? {}), ...children);
}
