// Type-only names code components import from the runtime. They have no runtime value.

import type { CSSProperties, ComponentType, ForwardRefExoticComponent } from "react";

export type ControlDescription = { type: string; title?: string; defaultValue?: unknown; [key: string]: unknown };
/** A File control: the prop receives the uploaded file's URL. */
export type FileControlDescription = ControlDescription & {
  type: "file" | (string & {});
  /** Accepted file extensions, e.g. ["mp4", "webm"]. */
  allowedFileTypes: string[];
  defaultValue?: string;
};
export type PropertyControls<Props = any> = { [K in keyof Props]?: ControlDescription } & Record<string, ControlDescription>;
/** Legacy override: a function returning props merged onto a layer. */
export type Override = Record<string, unknown>;
export type BorderStyle = "solid" | "dashed" | "dotted" | "double";
export type MotionStyle = CSSProperties & Record<string, unknown>;
export type FrameProps = Record<string, any>;
export type ComponentWithControls<P = any> = ComponentType<P> & { propertyControls?: PropertyControls<P> };
/**
 * What an effect HOC returns (`withFX(motion.div)`): the component, also taking the options
 * The original runtime's generated code passes the HOC (`__fx_animate`, `flowEffectEnabled` …).
 */
export type WithAnyProps<T> = T extends ComponentType<infer P> ? ForwardRefExoticComponent<P & { [option: string]: any }> : T;

// CSSOM gives every `-webkit-` property a `Webkit…` attribute (`style.WebkitMask`), which
// TypeScript's DOM types leave out; The original runtime's motion targets set them (`WebkitBackdropFilter`).
//
// Code components, the libraries they load and the site's custom code share state on `window`
// (`window.lenis`, `window.dataLayer`), which no declaration describes: such globals are untyped.
declare global {
  interface CSSStyleDeclaration {
    [webkitProperty: `Webkit${string}`]: string;
  }
  interface Window {
    [global: string]: any;
  }
  // Vendor-prefixed DOM APIs older browsers have (`document.webkitHidden`, `el.msRequestFullscreen`),
  // which code reads where the standard one is missing.
  interface Document {
    [prefixed: `webkit${string}` | `moz${string}` | `ms${string}`]: any;
  }
  interface HTMLElement {
    [prefixed: `webkit${string}` | `moz${string}` | `ms${string}`]: any;
  }
  interface Navigator {
    [prefixed: `webkit${string}` | `moz${string}` | `ms${string}`]: any;
  }
  // The Prioritized Task Scheduling API (`scheduler.yield()`), which code uses where the browser has it.
  var scheduler: any;
}

// The original runtime's older publishes give every layer its name as an attribute (`<div name="Hero">`), which
// React renders as written.
declare module "react" {
  interface HTMLAttributes<T> {
    name?: string;
  }
  // CSS properties newer than React's types that the original runtime's styles set (`corner-shape: superellipse(1.5)`).
  interface CSSProperties {
    cornerShape?: string;
  }
}
