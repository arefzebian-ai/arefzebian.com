"use client";

// Content primitives: media (Image, SVG), text (RichText, the legacy Text), the legacy Frame,
// colour helpers and property controls. The components live in content-*.tsx.

export { Image, BackgroundImage, getLoadingLazyAtYPosition } from "./content-image";
export { SVG, SVGTemplates, useSVGTemplate } from "./content-svg";
export { RichText } from "./content-rich-text";
export { Text } from "./content-text";
export { Frame } from "./content-frame";
export { Color, clampRGB } from "./content-color";

// ---------------------------------------------------------------------------
// Property controls

/** Every property-control type, with the original runtime's string values. */
export enum ControlType {
  Boolean = "boolean",
  Number = "number",
  String = "string",
  RichText = "richtext",
  FusedNumber = "fusednumber",
  Enum = "enum",
  SegmentedEnum = "segmentedenum",
  Color = "color",
  Image = "image",
  ResponsiveImage = "responsiveimage",
  File = "file",
  ComponentInstance = "componentinstance",
  Slot = "slot",
  Array = "array",
  EventHandler = "eventhandler",
  ChangeHandler = "changehandler",
  Transition = "transition",
  BoxShadow = "boxshadow",
  Link = "link",
  Date = "date",
  Object = "object",
  Font = "font",
  PageScope = "pagescope",
  ScrollSectionRef = "scrollsectionref",
  CustomCursor = "customcursor",
  Border = "border",
  Cursor = "cursor",
  Padding = "padding",
  BorderRadius = "borderradius",
  Gap = "gap",
  CollectionReference = "collectionreference",
  MultiCollectionReference = "multicollectionreference",
  TrackingId = "trackingid",
  VectorSetItem = "vectorsetitem",
  LinkRelValues = "linkrelvalues",
}

type Control = { type?: string; title?: string | ((props: any) => string); defaultValue?: unknown; optional?: boolean; options?: unknown[]; controls?: Record<string, Control> | string; [key: string]: unknown };

const isPlainObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

/** The default a control contributes to the component's props (undefined when it has none or it is invalid). */
function controlDefault(control: Control): unknown {
  const value = control.defaultValue;
  switch (control.type) {
    case "string": case "collectionreference": case "color": case "date": case "link":
    case "boxshadow": case "padding": case "borderradius": case "gap":
      return typeof value === "string" ? value : undefined;
    case "boolean":
      return typeof value === "boolean" ? value : undefined;
    case "enum":
      return value !== undefined && control.options?.includes(value) ? value : undefined;
    case "number": case "fusednumber":
      return typeof value === "number" ? value : undefined;
    case "transition": case "border": case "font":
      return isPlainObject(value) ? value : undefined;
    case "linkrelvalues": case "multicollectionreference": case "array":
      return Array.isArray(value) ? value : undefined;
    case "object": {
      const object = isPlainObject(value) ? { ...value } : {};
      if (control.controls && typeof control.controls === "object") applyControlDefaults(object, control.controls);
      return object;
    }
    default:
      return undefined;
  }
}

function applyControlDefaults(target: Record<string, unknown>, controls: Record<string, Control>): void {
  for (const key in controls) {
    const control = controls[key];
    if (!control || target[key] !== undefined || control.optional) continue;
    const value = controlDefault(control);
    if (value !== undefined) target[key] = value;
  }
}

/**
 * Attach property controls to a component and merge their defaults into
 * `component.defaultProps`, like the original runtime. (React 19 only applies defaultProps
 * to class components; generated code passes every prop explicitly.)
 */
export function addPropertyControls(component: any, propertyControls: Record<string, Control>): void {
  if (!component || (typeof component !== "object" && typeof component !== "function")) return;
  component.propertyControls = propertyControls;
  const defaults = isPlainObject(component.defaultProps) ? component.defaultProps : {};
  applyControlDefaults(defaults, propertyControls ?? {});
  if (Object.keys(defaults).length) component.defaultProps = defaults;
}

export function getPropertyControls(component: any): Record<string, Control> | undefined {
  return component?.propertyControls;
}

// ---------------------------------------------------------------------------
// CSS value helpers

/** Values interpolated into generated CSS text; anything that could break out of the rule becomes "none". */
export function safeCSSValue(value: unknown): string {
  if (typeof value !== "string" || /[}{<>&;]/.test(value)) return "none";
  return value;
}

/** "8px 16px" → { top: 8, right: 16, bottom: 8, left: 16 } (CSS shorthand order). */
export function parsePaddingString(value: string | number | undefined): { top: number; right: number; bottom: number; left: number } {
  if (typeof value === "number") return { top: value, right: value, bottom: value, left: value };
  const [top = 0, right = top, bottom = top, left = right] = String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => parseFloat(part) || 0);
  return { top, right, bottom, left };
}
