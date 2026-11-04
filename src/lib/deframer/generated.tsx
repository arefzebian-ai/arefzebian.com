"use client";

// Helpers the original runtime's code generator writes into every component and page module.
// Converted modules import them from here instead of each carrying its own
// copy (src/convert/shared-helpers.ts replaces a module's local definition
// only when it is exactly the original runtime's, so behaviour is unchanged).

import { forwardRef, Fragment, useContext, useMemo, useRef, useState, type ReactNode, type Ref } from "react";
import { LayoutGroup, motion, MotionConfigContext } from "motion/react";
import { useOverlayState } from "./overlay";

// ---------------------------------------------------------------------------
// Variants and transitions

/**
 * Merges the props listed for each active variant, later variants winning:
 * `{...addPropertyOverrides({ Hover: { opacity: 1 } }, baseVariant, gestureVariant)}`.
 */
export function addPropertyOverrides(overrides: Record<string, object | undefined>, ...variants: Array<string | undefined>): Record<string, any> {
  const props = {};
  for (const variant of variants) if (variant) Object.assign(props, overrides[variant]);
  return props;
}

/** The `layoutDependency` of a component's layers: its active variants, plus the dependency its parent passed. */
export function createLayoutDependency(props: any, variants: string[]): string {
  const key = variants.join("-");
  return props.layoutDependency ? key + props.layoutDependency : key;
}

/** The first non-empty string among the candidates (a variant chosen by a prop, a CMS field …). */
export function matchVariant(...candidates: unknown[]): any {
  return candidates.find((candidate) => typeof candidate === "string" && candidate !== "");
}

/**
 * Sets the default transition of the motion layers inside it. Without a
 * `value` the surrounding transition stays. As in the original runtime, the context value
 * only changes when the transition itself (compared as JSON) changes.
 */
export function Transition({ value, children }: { value?: object; children?: ReactNode }) {
  const config = useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return <MotionConfigContext.Provider value={contextValue}>{children}</MotionConfigContext.Provider>;
}

/** Renders no element; animates the motion layers below it to the variants in `animate`. */
export const Variants = motion.create(Fragment);

/**
 * The root of a generated component: a layout group (shared layout
 * animations stay inside one instance), its active variants and the default
 * transition. Same tree as
 * `<LayoutGroup id={layoutGroup}><Variants animate={animate} initial={false}><Transition value={transition}>`.
 */
export function VariantScope({ layoutGroup, animate, transition, children }: { layoutGroup?: string; animate: string[]; transition?: object; children?: ReactNode }) {
  return (
    <LayoutGroup id={layoutGroup}>
      <Variants animate={animate} initial={false}>
        <Transition value={transition}>{children}</Transition>
      </Variants>
    </LayoutGroup>
  );
}

/** The ref passed to a component, or the component's own ref when none was passed. */
export function useFallbackRef(ref: Ref<any> | undefined): any {
  const fallbackRef = useRef<HTMLElement>(null);
  return ref ?? fallbackRef;
}

/** A transition starting `delay` seconds later (staggered list items). */
export function staggerTransition(transition: { delay?: number }, delay: number) {
  return { ...transition, delay: (transition.delay ?? 0) + delay };
}

/** The variant a form shows for its submit state; `currentVariant` when that state has none. */
export function formVariants(form: { state?: string }, variants: Record<string, any>, currentVariant: any): any {
  const state = form.state;
  const hasVariant = state === "success" || state === "pending" || state === "error" || state === "incomplete";
  return hasVariant ? variants[state] ?? currentVariant : currentVariant;
}

/** The variant a "load more" button shows: disabled after the last page, loading while fetching. */
export function loaderVariants(
  repeater: { currentPage: number; totalPages: number; isLoading?: boolean },
  variants: { disabled?: any; loading?: any },
  currentVariant: any,
): any {
  if (repeater.currentPage >= repeater.totalPages) return variants.disabled ?? currentVariant;
  if (repeater.isLoading) return variants.loading ?? currentVariant;
  return currentVariant;
}

// ---------------------------------------------------------------------------
// Pages

/** Whether this render runs in the browser (false during server rendering). */
export function inBrowser(): boolean {
  return typeof document !== "undefined";
}

/** The root layer's `layout` prop: "position" inside a layout template whose flow effect it inherits. */
export function getRootLayoutProp<T = undefined>(hasLayoutTemplate: boolean | undefined, hasInheritedFlowEffect: boolean | undefined, fallback?: T): "position" | T | undefined {
  return hasLayoutTemplate && hasInheritedFlowEffect ? "position" : fallback;
}

/** A page's custom HTML `<style>` block. */
export function HTMLStyle({ value }: { value: string }) {
  // The original runtime omits it on its editor canvas; published pages always render it.
  return <style dangerouslySetInnerHTML={{ __html: value }} data-html-style="" />;
}

/**
 * The original runtime's `Overlay` interaction as a render prop: `children` receives the
 * overlay's visibility and show/hide/toggle. A disabled overlay never shows.
 */
export function Overlay({
  children,
  blockDocumentScrolling,
  dismissWithEsc,
  enabled = true,
}: {
  children: (overlay: { visible: boolean; show: () => void; hide: () => void; toggle: () => void }) => ReactNode;
  blockDocumentScrolling?: boolean;
  dismissWithEsc?: boolean;
  enabled?: boolean;
}) {
  const [visible, setVisible] = useOverlayState({ blockDocumentScrolling, dismissWithEsc: enabled && dismissWithEsc });
  return children({ hide: () => setVisible(false), show: () => setVisible(true), toggle: () => setVisible(!visible), visible: enabled && visible });
}

/** Where overlays are portaled: the layout template's overlay root, the page's, or the body. */
export function getContainer(): Element {
  return document.querySelector("#template-overlay") ?? document.querySelector("#overlay") ?? document.body;
}

/**
 * State that a parent may control: with a setter, the parent's value and
 * setter are used as they are; otherwise the state is local and resets
 * whenever the parent's value changes.
 */
export function useStateVariable<T>(externalState: T, setExternalState?: (value: T) => void): [T, (value: T) => void] {
  const [internalState, setInternalState] = useState(externalState);
  const [previousExternalState, setPreviousExternalState] = useState(externalState);
  if (setExternalState) return [externalState, setExternalState];
  if (externalState !== previousExternalState) {
    setInternalState(externalState);
    setPreviousExternalState(externalState);
  }
  return [internalState, setInternalState];
}

// ---------------------------------------------------------------------------
// Values bound to props and CMS fields

/** An image prop as a responsive image object (a bare URL becomes `{ src }`). */
export function toResponsiveImage(value: any): any {
  if (typeof value === "object" && value !== null && typeof value.src === "string") return value;
  return typeof value === "string" ? { src: value } : undefined;
}

/** An image prop's URL. */
export function toImageSrc(value: any): string | undefined {
  if (typeof value === "object" && value !== null && typeof value.src === "string") return value.src;
  return typeof value === "string" ? value : undefined;
}

/** The image with its alt text replaced (nothing when there is no image). */
export function addImageAlt(image: any, alt: string | undefined): any {
  if (!image || typeof image !== "object") return undefined;
  return { ...image, alt };
}

/** Whether a field has a value: a non-empty list, or anything but undefined, null and "". */
export function isSet(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  return value !== undefined && value !== null && value !== "";
}

export function toString(value: unknown): string {
  return typeof value === "string" ? value : String(value);
}

export function negate(value: unknown): boolean {
  return !value;
}

/** Equality as CMS filters compare: strings case-insensitively. */
export function equals(a: unknown, b: unknown): boolean {
  return typeof a === "string" && typeof b === "string" ? a.toLowerCase() === b.toLowerCase() : a === b;
}

export function greaterThan(a: unknown, b: unknown): boolean {
  return typeof a === "number" && typeof b === "number" ? a > b : false;
}

export function lessThan(a: unknown, b: unknown): boolean {
  return typeof a === "number" && typeof b === "number" ? a < b : false;
}

/** Whether `a` contains `b`: a substring (case-insensitive) or a list item. */
export function contains(a: unknown, b: unknown): boolean {
  if (typeof a === "string" && typeof b === "string") return a.toLowerCase().includes(b.toLowerCase());
  if (Array.isArray(a) && typeof b === "string") return a.includes(b);
  return false;
}

/** `prefix + value`, either part left out when it is not a string. */
export function prefix(value: unknown, prefix: unknown): string {
  return (typeof prefix === "string" ? prefix : "") + (typeof value === "string" ? value : "");
}

/** `value + suffix`, either part left out when it is not a string. */
export function suffix(value: unknown, suffix: unknown): string {
  return (typeof value === "string" ? value : "") + (typeof suffix === "string" ? suffix : "");
}

/** A number as a CSS length (negative numbers become 0px); anything else passes through. */
export function numberToPixelString(value: any): any {
  if (typeof value !== "number") return value;
  if (!Number.isFinite(value)) return undefined;
  return Math.max(0, value) + "px";
}

/** One corner of a border radius given as a number or as "tl tr br bl" (CSS shorthand rules for missing corners). */
export function radiusForCorner(value: unknown, cornerIndex: number): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value) + "px";
  if (typeof value !== "string" || typeof cornerIndex !== "number") return undefined;
  const corners = value.split(" ");
  return corners[cornerIndex] || corners[cornerIndex - 2] || corners[0];
}

/** `grid-column` for an item spanning `columnSpan` columns ("all" spans the whole row), capped at the column count. */
export function getGridColumnCSSValue(columnSpan: unknown, columnCount?: number): string {
  if (columnSpan === "all") return "-1 / 1";
  const span = Number.isFinite(columnSpan) && (columnSpan as number) > 0 ? (columnSpan as number) : 1;
  if (Number.isFinite(columnCount) && span > columnCount!) return `span ${columnCount}`;
  return `span ${span}`;
}

const FALLBACK_LOCALE = "en-US";

/** A date string formatted for a locale ("" for anything that is not a valid date). */
export function sharedDateFormatter(value: unknown, formatOptions: any, locale?: string): string {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  try {
    return date.toLocaleString(locale || FALLBACK_LOCALE, formatOptions);
  } catch {
    // An unknown locale.
    return date.toLocaleString(FALLBACK_LOCALE, formatOptions);
  }
}

/** A number formatted with a field's number options, falling back to en-US and then to the default format. */
export function numberToString(value: unknown, options: Record<string, any> = {}, activeLocale?: string): string {
  const locale = options.locale || activeLocale || FALLBACK_LOCALE;
  const { useGrouping, notation, compactDisplay, style, currency, currencyDisplay, unit, unitDisplay, minimumFractionDigits, maximumFractionDigits, minimumIntegerDigits } = options;
  const formatOptions = { useGrouping, notation, compactDisplay, style, currency, currencyDisplay, unit, unitDisplay, minimumFractionDigits, maximumFractionDigits, minimumIntegerDigits };
  const number = Number(value);
  try {
    return number.toLocaleString(locale, formatOptions);
  } catch {
    try {
      return number.toLocaleString(FALLBACK_LOCALE, formatOptions);
    } catch {
      return number.toLocaleString();
    }
  }
}

// ---------------------------------------------------------------------------
// Icons (vector modules)

const MotionSvg = motion.create(
  forwardRef<SVGSVGElement, any>(function Svg(props, ref) {
    return (
      <svg {...props} ref={ref}>
        {props.children}
      </svg>
    );
  }),
);

/** `<svg>` that animates (and takes part in layout animations) when `animated`. */
export const IconSvg = forwardRef<SVGSVGElement, any>(function IconSvg({ animated, layoutId, children, ...rest }, ref) {
  return animated ? (
    <MotionSvg {...rest} layoutId={layoutId} ref={ref}>
      {children}
    </MotionSvg>
  ) : (
    <svg {...rest} ref={ref}>
      {children}
    </svg>
  );
});

/** A masked `<div>` icon, animated when `animated`. */
export const IconMask = forwardRef<HTMLDivElement, any>(function IconMask({ animated, layoutId, children, ...rest }, ref) {
  return animated ? <motion.div {...rest} layoutId={layoutId} ref={ref} /> : <div {...rest} ref={ref} />;
});

/** An `<img>` icon, animated when `animated`. */
export const IconImage = forwardRef<HTMLImageElement, any>(function IconImage({ animated, layoutId, children, ...rest }, ref) {
  return animated ? <motion.img {...rest} layoutId={layoutId} ref={ref} /> : <img {...rest} ref={ref} />;
});
