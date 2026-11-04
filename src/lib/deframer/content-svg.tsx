"use client";

// SVG primitives. The original runtime renders vector graphics in one of two ways:
//  - small, self-contained SVGs become a CSS background-image on the element;
//  - everything else is stored once as a "template" inside a hidden
//    <div id="svg-templates"> and every instance renders
//    <svg style="width:100%;height:100%"><use href="#id"/></svg>.
// Generated icon components also call useSVGTemplate(id, svg) directly and put
// the returned "#id" into their own <use href>.
//
// Server: templates are collected per request and rendered by <SVGTemplates/>
// (mount it at the end of <body>); templates of content that streams in later
// (Suspense) follow with that content, so the server HTML never references a
// missing template. Browser: every subscriber makes sure its
// template exists in #svg-templates (needed after client-side navigation, or
// when the template was not part of the server HTML).

import { forwardRef, useContext, useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ServerInsertedHTMLContext, useServerInsertedHTML } from "./host";
import { motionElement, transformTemplateForCenter } from "./content-utils";

const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// Same visually-hidden container style the original runtime uses (an element hidden with
// display:none would break gradients/masks referenced through <use>).
const containerCSS = "position: absolute; overflow: hidden; bottom: 0; left: 0; width: 0; height: 0; z-index: 0; contain: strict";
const containerStyle: CSSProperties = { position: "absolute", overflow: "hidden", bottom: 0, left: 0, width: 0, height: 0, zIndex: 0, contain: "strict" };

// ---------------------------------------------------------------------------
// Template registry

interface RequestTemplates {
  templates: Map<string, string>;
  emitted: Set<string>;
}

/** Templates registered but not yet in the HTML (marked as emitted). */
function takePending(registry: RequestTemplates): string {
  const pending = [...registry.templates].filter(([id]) => !registry.emitted.has(id));
  for (const [id] of pending) registry.emitted.add(id);
  return pending.map(([, markup]) => markup).join("\n");
}

/** Server: one registry per request, keyed by the request's ServerInsertedHTML callback. */
const requestRegistries = new WeakMap<object, RequestTemplates>();

function requestRegistry(requestKey: object): RequestTemplates {
  let registry = requestRegistries.get(requestKey);
  if (!registry) requestRegistries.set(requestKey, (registry = { templates: new Map(), emitted: new Set() }));
  return registry;
}

/** Browser: reference counts so unused templates can be dropped (5s grace, like the original runtime). */
const subscribers = new Map<string, number>();

function templateContainer(): HTMLElement {
  let container = document.getElementById("svg-templates");
  if (!container) {
    container = document.createElement("div");
    container.id = "svg-templates";
    container.setAttribute("aria-hidden", "true");
    container.style.cssText = containerCSS;
    document.body.appendChild(container);
  }
  return container;
}

function ensureTemplateInDocument(id: string, markup: string): void {
  if (document.getElementById(id)) return;
  const holder = document.createElement("div");
  holder.innerHTML = markup;
  const element = holder.firstElementChild;
  if (!element) return;
  element.id = id;
  templateContainer().appendChild(element);
}

/** Registers a template for this render (server) and keeps it in the document while mounted (browser). */
function useTemplate(id: string | undefined, markup: string | undefined): void {
  const requestKey = useContext(ServerInsertedHTMLContext);
  if (!isBrowser && requestKey && id && markup) {
    const registry = requestRegistry(requestKey);
    if (!registry.templates.has(id)) registry.templates.set(id, markup);
  }
  useIsomorphicLayoutEffect(() => {
    if (!id || !markup) return;
    ensureTemplateInDocument(id, markup);
    subscribers.set(id, (subscribers.get(id) ?? 0) + 1);
    return () => {
      subscribers.set(id, (subscribers.get(id) ?? 1) - 1);
      setTimeout(() => {
        if (subscribers.get(id)) return;
        subscribers.delete(id);
        document.getElementById(id)?.remove();
      }, 5000);
    };
  }, [id, markup]);
}

/**
 * The hidden template container the original runtime appends to <body>. Render it once,
 * after the page content, so it can include every template the page used.
 * In the browser React keeps the server markup (the element is never updated),
 * and later templates are appended by their subscribers.
 */
export function SVGTemplates() {
  const requestKey = useContext(ServerInsertedHTMLContext);
  const html = !isBrowser && requestKey ? takePending(requestRegistry(requestKey)) : "";
  // Content that streams in after this (Suspense boundaries) registers its templates later:
  // they go into the container by a script sent ahead of that content.
  useServerInsertedHTML(() => {
    const late = requestKey ? takePending(requestRegistry(requestKey)) : "";
    if (!late) return null;
    // (Inserted before the container exists — the document head — it does nothing: the browser adds them on mount.)
    const code = `document.getElementById("svg-templates")?.insertAdjacentHTML("beforeend",${JSON.stringify(late).replace(/</g, "\\u003c")})`;
    return <script dangerouslySetInnerHTML={{ __html: code }} />;
  });
  return <div id="svg-templates" style={containerStyle} aria-hidden="true" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}

/** `useSVGTemplate(id, svg)` → "#id"; generated vector-set icons put it in <use href>. */
export function useSVGTemplate(id: string, svg: string): string {
  useTemplate(id, withRootId(svg, id));
  return `#${id}`;
}

// ---------------------------------------------------------------------------
// String-level SVG processing (works identically on server and client)

const rootTag = /<svg\b[^>]*>/i;
const attributePattern = /([^\s=/>]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g;

function rootAttributes(svg: string): Array<[string, string | undefined]> {
  const match = rootTag.exec(svg);
  if (!match) return [];
  const body = match[0].replace(/^<svg/i, "").replace(/\/?>$/, "");
  return [...body.matchAll(attributePattern)].map((m) => [m[1], m[2]?.replace(/^["']|["']$/g, "")]);
}

function rewriteRoot(svg: string, rewrite: (attrs: Array<[string, string | undefined]>) => Array<[string, string | undefined]>): string {
  const match = rootTag.exec(svg);
  if (!match) return svg;
  const selfClosing = /\/>$/.test(match[0]);
  const attrs = rewrite(rootAttributes(svg))
    .map(([name, value]) => (value === undefined ? ` ${name}` : ` ${name}="${value.replace(/"/g, "&quot;")}"`))
    .join("");
  return svg.slice(0, match.index) + `<svg${attrs}${selfClosing ? "/>" : ">"}` + svg.slice(match.index + match[0].length);
}

function setId(attrs: Array<[string, string | undefined]>, id: string) {
  const index = attrs.findIndex(([name]) => name === "id");
  if (index >= 0) attrs[index] = ["id", id];
  else attrs.push(["id", id]);
  return attrs;
}

function withRootId(svg: string, id: string): string {
  return rewriteRoot(svg, (attrs) => setId(attrs, id));
}

/** Prefix ids (and references to them) so several inlined SVGs cannot clash. */
function prefixIds(svg: string, prefix: string): string {
  const safe = prefix.replace(/[^\w\-:.]|^[^a-z]+/gi, "");
  return svg
    .replace(/(\sid=")([^"]+)"/g, `$1${safe}_$2"`)
    .replace(/(\s(?:xlink:)?href=")#([^"]+)"/g, `$1#${safe}_$2"`)
    .replace(/url\(#/g, `url(#${safe}_`);
}

const unitsToPixels: Record<string, number> = { cm: 96 / 2.54, mm: 96 / 25.4, Q: 96 / 101.6, in: 96, pc: 16, pt: 96 / 72, px: 1, em: 16, ex: 8, ch: 8, rem: 16 };

function parseLength(value: string | undefined): number | undefined {
  const m = value ? /(-?[\d.]+)([a-zA-Z%]*)/.exec(value) : null;
  if (!m || m[2].startsWith("%")) return undefined;
  return Math.round(parseFloat(m[1]) * (unitsToPixels[m[2]] || 1));
}

/** The original runtime's 32-bit string hash (signed), so generated template ids match the published site. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  return hash;
}

interface SharedSVG {
  id: string;
  /** Template stored in #svg-templates. */
  template: string;
  /** What each instance renders. */
  html: string;
  viewBox?: string;
}

const sharedCache = new Map<string, SharedSVG>();

function sharedSVG(svg: string, svgContentId: string | number | undefined, overflowVisible: boolean): SharedSVG {
  const cacheKey = `${svgContentId ?? ""}|${overflowVisible ? 1 : 0}|${svg}`;
  const cached = sharedCache.get(cacheKey);
  if (cached) return cached;
  const id = svgContentId ? `svg${svgContentId}` : `svg${hashString(svg)}_${svg.length}`;
  let source = svgContentId ? svg : prefixIds(svg, id);
  let size: { width: number; height: number } | undefined;
  source = rewriteRoot(source, (attrs) => {
    const value = (name: string) => attrs.find(([n]) => n === name)?.[1];
    const width = parseLength(value("width"));
    const height = parseLength(value("height"));
    if (width && height && width > 0 && height > 0) size = { width, height };
    return setId(attrs.filter(([name]) => name !== "xmlns" && name !== "xlink" && name !== "xmlns:xlink"), id);
  });
  const viewBox = size ? `0 0 ${size.width} ${size.height}` : undefined;
  const html = `<svg style="width:100%;height:100%;${overflowVisible ? "overflow: visible;" : ""}"${viewBox ? ` viewBox="${viewBox}"` : ""}><use href="#${id}"/></svg>`;
  const entry = { id, template: source, html, viewBox };
  sharedCache.set(cacheKey, entry);
  return entry;
}

const MAX_BACKGROUND_SVG_LENGTH = 50000;

export function encodeSVGForCSS(svg: string): string {
  return `url('data:image/svg+xml,${svg.replaceAll("#", "%23").replaceAll("'", "%27").replaceAll('"', "%22")}')`;
}

// ---------------------------------------------------------------------------
// <SVG>

/** Props that configure the vector and must not reach the DOM. */
function splitSVGProps(props: any) {
  const {
    svg = "", fill, intrinsicWidth, intrinsicHeight, title, description, withExternalLayout, svgContentId,
    requiresOverflowVisible, visible = true, center, rotation = 0, opacity, width, height, left, right, top, bottom,
    _constraints, parentSize, providedWindow, name, layoutIdKey, duplicatedFrom, __fromCanvasComponent, __fromCodeComponentNode,
    as, style, ...rest
  } = props;
  return {
    config: { svg: String(svg), fill, intrinsicWidth, intrinsicHeight, title, description, withExternalLayout, svgContentId, requiresOverflowVisible, visible, center, rotation, opacity, width, height, left, right, top, bottom, _constraints, name, as, style },
    rest,
  };
}

/** Sizes the inner <svg> after mount, for vectors without a pre-sized template (the original runtime's sizeSVG). */
function sizeInnerSVG(container: HTMLDivElement | null, config: any, viewBox: string | undefined) {
  const svg = container?.firstElementChild;
  if (!svg || svg.tagName.toLowerCase() !== "svg") return;
  if (!svg.getAttribute("viewBox") && viewBox) svg.setAttribute("viewBox", viewBox);
  if (!config.withExternalLayout) return; // laid out by explicit width/height props instead
  const box = (svg as SVGSVGElement).viewBox?.baseVal;
  if (box && box.width === 0 && box.height === 0 && Number.isFinite(config.intrinsicWidth) && Number.isFinite(config.intrinsicHeight)) {
    svg.setAttribute("viewBox", `0 0 ${config.intrinsicWidth} ${config.intrinsicHeight}`);
  }
  svg.setAttribute("preserveAspectRatio", config._constraints?.aspectRatio ? "" : "none");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
}

export const SVG = forwardRef<HTMLElement, any>(function SVG(props, forwardedRef) {
  const { config, rest } = splitSVGProps(props);
  const containerRef = useRef<HTMLDivElement>(null);

  const outerStyle: Record<string, unknown> = { ...config.style, imageRendering: "pixelated", flexShrink: 0 };
  const innerStyle: Record<string, unknown> = {};
  if (config.withExternalLayout) {
    Object.assign(innerStyle, { width: "100%", height: "100%", aspectRatio: "inherit" });
  } else {
    Object.assign(outerStyle, { left: config.left, right: config.right, top: config.top, bottom: config.bottom, width: config.width, height: config.height });
    if (config.rotation) outerStyle.rotate = config.rotation;
    Object.assign(innerStyle, { left: 0, top: 0, bottom: 0, right: 0, position: "absolute" });
  }
  if (typeof config.opacity === "number" && config.opacity !== 1) outerStyle.opacity = config.opacity;
  if (typeof config.fill === "string") outerStyle.fill = outerStyle.color = config.fill;
  else if (config.fill && typeof config.fill === "object" && "r" in config.fill) {
    outerStyle.fill = outerStyle.color = config.fill.initialValue ?? `rgba(${config.fill.r}, ${config.fill.g}, ${config.fill.b}, ${config.fill.a ?? 1})`;
  }

  const svg = config.svg;
  const asBackground =
    !config.requiresOverflowVisible && !outerStyle.fill && !outerStyle.background && !outerStyle.backgroundImage &&
    svg.length < MAX_BACKGROUND_SVG_LENGTH && !svg.includes("image") && !svg.includes("var(--");
  const shared = asBackground || !svg ? undefined : sharedSVG(svg, config.svgContentId, !!config.requiresOverflowVisible);
  useTemplate(shared?.id, shared?.template);

  useIsomorphicLayoutEffect(() => {
    if (shared && !config.svgContentId) sizeInnerSVG(containerRef.current, config, shared.viewBox);
  });

  if (!config.visible && !config.withExternalLayout) return null;

  let content: ReactNode = null;
  if (asBackground) {
    outerStyle.backgroundSize = "100% 100%";
    outerStyle.backgroundImage = encodeSVGForCSS(svg);
  } else if (shared) {
    if (outerStyle.borderRadius || outerStyle.borderTopLeftRadius || outerStyle.borderTopRightRadius || outerStyle.borderBottomLeftRadius || outerStyle.borderBottomRightRadius) {
      outerStyle.overflow = "hidden";
    }
    content = <div className="svgContainer" style={innerStyle} ref={containerRef} dangerouslySetInnerHTML={{ __html: shared.html }} />;
  }

  const Component = motionElement(config.as);
  const labelled = config.title || config.description;
  return (
    <Component
      data-component-type="SVG"
      data-name={rest["data-name"] ?? config.name}
      {...rest}
      transformTemplate={config.center ? transformTemplateForCenter(config.center) : rest.transformTemplate}
      ref={forwardedRef}
      style={outerStyle}
      role={labelled ? "img" : rest.role}
      aria-label={config.title}
      aria-description={config.description}
      aria-hidden={labelled ? undefined : "true"}
    >
      {content}
    </Component>
  );
});
