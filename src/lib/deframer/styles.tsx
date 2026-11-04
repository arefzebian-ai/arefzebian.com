"use client";

// CSS registry. Generated components' CSS is in stylesheets (converted by
// src/convert/css/), and so is the original runtime's base stylesheet (base.css,
// imported here, so it precedes them). What remains for this registry is CSS
// known only at runtime: code components' withCSS / injectCSS rules, fonts
// attached at runtime, and the site's design tokens.
//
// Server: every request collects the rules (and @font-face rules) of the
// components it renders, in first-render order. <SiteStyles/> streams them
// into the HTML through Next's useServerInsertedHTML, mirroring the original runtime's
// published output:
//   <style data-font-css>                    @font-face for rendered components
//   <style data-css-ssr>                     site tokens, moved first in <head>
//   <style data-css-ssr data-components="df-abc …">  component rules
// The collector is keyed by the request's ServerInsertedHTMLContext value, so
// concurrent requests in one server process never share state.
//
// Browser: rules a component needs are inserted into one <style data-css>
// before layout effects run, skipping every rule the server already sent (the
// SSR blocks hold one rule per line, so their text seeds the dedupe set).

import { forwardRef, useContext, useInsertionEffect, useLayoutEffect, type ComponentType, type ReactNode } from "react";
import { ServerInsertedHTMLContext, useServerInsertedHTML } from "./host";
import { fontFaceRules } from "./fonts";
import "./base.css";

type RenderTargetName = string;
export type CSSInput = string | readonly string[] | ((renderTarget: RenderTargetName, props: any) => string | readonly string[]);

const isBrowser = typeof document !== "undefined";
/** Published sites render as the original runtime's RenderTarget.preview. */
const PUBLISHED_RENDER_TARGET = "PREVIEW";

// ---------------------------------------------------------------------------
// Rule normalisation

/**
 * Split CSS text into top-level rules (the original runtime passes arrays of rules, but
 * strings and multi-rule entries occur in code components). Each rule is put
 * on one line so a server-rendered block can be split back into rules.
 */
function splitRules(css: string): string[] {
  const rules: string[] = [];
  let depth = 0;
  let quote = "";
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    if (quote) {
      if (char === "\\") i++;
      else if (char === quote) quote = "";
    } else if (char === '"' || char === "'") quote = char;
    else if (char === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      i = end < 0 ? css.length : end + 1;
    } else if (char === "{") depth++;
    else if (char === "}" && depth > 0 && --depth === 0) {
      rules.push(css.slice(start, i + 1));
      start = i + 1;
    } else if (char === ";" && depth === 0) {
      rules.push(css.slice(start, i + 1)); // @import / @charset statements
      start = i + 1;
    }
  }
  rules.push(css.slice(start));
  return rules.map(oneLine).filter(Boolean);
}

const oneLine = (rule: string) => rule.replace(/\s*\n\s*/g, " ").trim();

const normalizedCache = new WeakMap<object, string[]>();

function normalize(css: string | readonly string[]): string[] {
  if (typeof css === "string") return splitRules(css);
  const cached = normalizedCache.get(css);
  if (cached) return cached;
  const rules = css.flatMap((rule) => (rule ? splitRules(rule) : []));
  normalizedCache.set(css, rules);
  return rules;
}

function resolveCSS(css: CSSInput, props: unknown): string[] {
  return normalize(typeof css === "function" ? css(PUBLISHED_RENDER_TARGET, props) ?? [] : css);
}

// ---------------------------------------------------------------------------
// Server: per-request collection

interface Collector {
  seen: Set<string>;
  rules: string[];
  fonts: string[];
  componentIds: string[];
  /** Rule lists already merged into this request. */
  merged: WeakSet<object>;
  flushed: { site: boolean; rules: number; fonts: number; ids: number; globals: number };
}

const collectors = new WeakMap<object, Collector>();

function collectorFor(requestKey: unknown): Collector | undefined {
  if (!requestKey || (typeof requestKey !== "object" && typeof requestKey !== "function")) return undefined;
  let collector = collectors.get(requestKey);
  if (!collector) {
    collector = {
      seen: new Set(),
      rules: [],
      fonts: [],
      componentIds: [],
      merged: new WeakSet(),
      flushed: { site: false, rules: 0, fonts: 0, ids: 0, globals: 0 },
    };
    collectors.set(requestKey, collector);
  }
  return collector;
}

function collect(collector: Collector, target: string[], rules: readonly string[]): void {
  // Rule lists are never mutated, so each list needs merging only once per request.
  if (collector.merged.has(rules)) return;
  collector.merged.add(rules);
  for (const rule of rules) {
    if (collector.seen.has(rule)) continue;
    collector.seen.add(rule);
    target.push(rule);
  }
}

/**
 * Rules registered outside any render (injectCSS at module scope). They are
 * process-wide and sent to every request after the base stylesheet.
 */
const globalRules: string[] = [];
const globalSeen = new Set<string>();

// ---------------------------------------------------------------------------
// Browser: one sheet, deduped against the server-rendered blocks

const browserSeen = new Set<string>();
/** The rules this sheet holds (the rest of `browserSeen` is in the server-rendered blocks). */
const sheetRules = new Set<string>();
let browserSheet: CSSStyleSheet | undefined;
let seededFromSSR = false;

function seedFromSSR(): void {
  if (seededFromSSR) return;
  seededFromSSR = true;
  for (const style of document.querySelectorAll("style[data-css-ssr], style[data-font-css]")) {
    for (const rule of (style.textContent ?? "").split("\n")) if (rule) browserSeen.add(rule);
  }
}

function insertInBrowser(rules: readonly string[]): void {
  seedFromSSR();
  for (const rule of rules) {
    if (browserSeen.has(rule)) continue;
    browserSeen.add(rule);
    sheetRules.add(rule);
    if (!browserSheet) {
      const element = document.createElement("style");
      element.setAttribute("data-css", "");
      document.head.appendChild(element);
      browserSheet = element.sheet ?? undefined;
    }
    try {
      browserSheet?.insertRule(rule, browserSheet.cssRules.length);
    } catch {
      // Rules a browser rejects (other vendors' prefixes) are skipped, as in the original runtime.
    }
  }
}

/** The rules of the server-rendered style blocks in `head` (a document's). */
export function serverRules(head: ParentNode): string[] {
  return [...head.querySelectorAll("style[data-css-ssr], style[data-font-css]")].flatMap((style) => (style.textContent ?? "").split("\n").filter(Boolean));
}

/**
 * A host whose router swaps another document's <head> in (Astro's, kit/hosts/astro/navigation.ts)
 * replaces the server-rendered blocks this sheet is deduped against: once it has, the rules of the
 * blocks it removed that the new ones lack (`kept`) go into this sheet, for what stays on the page.
 */
export function keepServerRules(kept: readonly string[]): void {
  browserSeen.clear();
  for (const rule of sheetRules) browserSeen.add(rule);
  seededFromSSR = false;
  insertInBrowser(kept);
}

// ---------------------------------------------------------------------------
// Public API

/** Register CSS rules once, from anywhere (module scope included). */
export function injectCSS(css: string | readonly string[]): void {
  const rules = normalize(css);
  if (isBrowser) return insertInBrowser(rules);
  for (const rule of rules) {
    if (globalSeen.has(rule)) continue;
    globalSeen.add(rule);
    globalRules.push(rule);
  }
}

/**
 * Attach a component's CSS (the original runtime's withCSS). `css` is an array of rules, a
 * string, or a function of (renderTarget, props). `serializationId` names the
 * component in the SSR block's data-components list. Fonts attached
 * later with addFonts(Wrapped, …) are registered alongside the CSS.
 */
export function withCSS<P = any, T extends ComponentType<P> = ComponentType<P>>(Component: T, css: CSSInput, serializationId?: string): T & { defaultProps?: Record<string, any> } {
  const Inner = Component as ComponentType<any>;
  const WithCSS: any = forwardRef<unknown, any>(function StyledComponent(props, ref) {
    const requestKey = useContext(ServerInsertedHTMLContext);
    if (!isBrowser) {
      const collector = collectorFor(requestKey);
      if (collector) {
        collect(collector, collector.rules, resolveCSS(css, props));
        collect(collector, collector.fonts, componentFontRules(WithCSS));
        if (serializationId && !collector.componentIds.includes(serializationId)) collector.componentIds.push(serializationId);
      }
    }
    useInsertionEffect(() => {
      insertInBrowser(componentFontRules(WithCSS));
      insertInBrowser(resolveCSS(css, props));
      // CSS is fixed at mount, as in the original runtime.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Inner {...props} ref={ref} />;
  });
  WithCSS.displayName = (Inner as any).displayName ?? Inner.name;
  return WithCSS as T;
}

const componentFontRules = (component: any): string[] => fontFaceRules(component.fonts);

const NO_RULES: readonly string[] = [];

/**
 * For a component whose CSS is a stylesheet: serves the @font-face rules of the
 * fonts attached to it with addFonts that have no stylesheet (fonts of code
 * components and component presets, known only at runtime).
 */
export function withFonts<T extends ComponentType<any>>(Component: T): T {
  return withCSS(Component, NO_RULES);
}

/**
 * Mount once in the root layout's <head>. Streams the site-wide CSS passed as
 * `siteCSS`, fonts and component CSS collected while rendering the request. It renders nothing
 * itself: the <style> blocks live outside React's tree, so a client-side
 * re-render after a hydration error cannot duplicate or reorder them.
 */
export function SiteStyles({ siteCSS }: { siteCSS?: readonly string[] }): null {
  const collector = collectorFor(useContext(ServerInsertedHTMLContext));
  useServerInsertedHTML(() => (collector ? flush(collector, siteCSS) : null));
  return null;
}

/**
 * The design tokens' block goes first in <head>, before the stylesheets, as on the published site:
 * code reading `document.styleSheets` in order (theme toggles collecting `body { --token-… }`) finds
 * it first. Next puts this HTML at the end of <head>, after its stylesheet links; it is outside
 * React's tree, so moving it changes nothing React hydrates, as long as it stays after the <style>
 * elements React renders there (the site's head code): React hydrates those by position, and would
 * take a <style> moved ahead of one for it (a hydration mismatch).
 */
const SITE_CSS_FIRST = `(function(s){var h=document.head;if(!s||!h||s.parentNode!==h)return;var react='style:not([data-css-ssr]):not([data-font-css]):not([data-css])',f=h.querySelector('link[rel~="stylesheet"],'+react),r=h.querySelectorAll(react),l=r[r.length-1];if(l&&f&&(f===l||f.compareDocumentPosition(l)&4))f=l.nextSibling;if(f&&f!==s)h.insertBefore(s,f)})(document.currentScript&&document.currentScript.previousElementSibling)`;

/**
 * Everything collected since the previous flush of this request. The first
 * flush also carries the site-wide CSS (design tokens): the original runtime serves it in the
 * same SSR block as component CSS, where code components (shader colour
 * helpers, for one) look up `body { --token-… }` values.
 */
function flush(collector: Collector, siteCSS: readonly string[] = []) {
  const { flushed } = collector;
  const fonts = collector.fonts.slice(flushed.fonts);
  const site = flushed.site ? [] : normalize(siteCSS).filter((rule) => !collector.seen.has(rule));
  const globals = globalRules.slice(flushed.globals).filter((rule) => !collector.seen.has(rule));
  for (const rule of [...site, ...globals]) collector.seen.add(rule);
  const rules = [...globals, ...collector.rules.slice(flushed.rules)];
  const ids = collector.componentIds.slice(flushed.ids);
  collector.flushed = { site: true, rules: collector.rules.length, fonts: collector.fonts.length, ids: collector.componentIds.length, globals: globalRules.length };
  if (!fonts.length && !rules.length && !site.length) return null;
  return (
    <>
      {site.length > 0 && (
        <>
          <style data-css-ssr="" dangerouslySetInnerHTML={{ __html: site.join("\n") }} />
          <script dangerouslySetInnerHTML={{ __html: SITE_CSS_FIRST }} />
        </>
      )}
      {fonts.length > 0 && <style data-font-css="" dangerouslySetInnerHTML={{ __html: fonts.join("\n") }} />}
      {rules.length > 0 && (
        <style data-css-ssr="" data-components={ids.join(" ") || undefined} dangerouslySetInnerHTML={{ __html: rules.join("\n") }} />
      )}
    </>
  );
}

/**
 * Overlays render in a portal outside their trigger, so they would lose the
 * trigger's text-selection colours. Copy them onto the portal and style its
 * `::selection` from those variables.
 */
function SelectionStyleBridge({ triggerId, children }: { triggerId?: string; children?: ReactNode }) {
  useLayoutEffect(() => {
    if (!triggerId) return;
    const frame = requestAnimationFrame(() => {
      const trigger = document.getElementById(triggerId);
      if (!trigger) return;
      const styles = getComputedStyle(trigger);
      const color = styles.getPropertyValue("--selection-color").trim();
      const background = styles.getPropertyValue("--selection-background-color").trim();
      for (const portal of document.querySelectorAll<HTMLElement>(`[data-portal-id="${triggerId}"]`)) {
        if (color) portal.style.setProperty("--text-selection-color", color);
        if (background) portal.style.setProperty("--text-selection-background-color", background);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [triggerId]);
  return <>{children}</>;
}

export const InjectSelectionStyle = withCSS(
  SelectionStyleBridge,
  (_target, props: any) =>
    props?.triggerId
      ? [`[data-portal-id="${props.triggerId}"] * ::selection { color: var(--text-selection-color); background-color: var(--text-selection-background-color); }`]
      : [],
  "InjectSelectionStyle",
);
