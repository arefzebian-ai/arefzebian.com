// Pure path helpers for routing: filling `:variables`, resolving element
// hashes, building the relative hrefs the original runtime publishes (`./about`, `../journal/x`)
// and matching URL paths back to page ids. No React, no DOM — safe anywhere.

import type { RouteInfo } from "./contexts";

export type Routes = Record<string, RouteInfo>;
export type PathVariables = Record<string, string | undefined>;

export interface Locale {
  id: string;
  /** What the site's tables and translations are keyed by (`"ja-JP"`). */
  code: string;
  name: string;
  /** URL prefix (`ja` -> `/ja/…`); empty for the default locale. */
  slug: string;
  textDirection: "ltr" | "rtl";
  /** Where missing translations come from. */
  fallback?: Locale | null;
}

/** A locale's URL prefix: "/ja", or "" for the default locale. */
export function localePrefix(locale: Locale | null | undefined): string {
  return locale?.slug ? `/${locale.slug}` : "";
}

/** `:name` placeholders in route paths and element hashes (ids start with a letter). */
const variablePattern = /:([a-z]\w*)/gi;

/** Paths the original runtime treats as "the not found page": links on it can't be relative to the URL. */
export const notFoundPaths = new Set(["/404", "/404/", "/404.html"]);

/** Fill `:name` placeholders, URL-encoding values. Missing values keep their placeholder. */
export function fillPath(path: string, variables: PathVariables = {}): string {
  return path.replace(variablePattern, (match, name) => {
    const value = variables[name];
    return typeof value === "string" && value.length > 0 ? encodeURIComponent(value) : match;
  });
}

/** Same as fillPath without encoding — how the original runtime renders hrefs (slugs are already URL-safe). */
function substitute(path: string, variables: PathVariables | undefined): string {
  if (!variables) return path;
  return path.replace(variablePattern, (match, name) => String(variables[name] || match));
}

/** Names of the `:variables` a route path uses. */
export function pathVariableNames(path: string): string[] {
  return [...path.matchAll(variablePattern)].map((m) => m[1]!);
}

/** Keep only the variables the route path actually uses (the original runtime drops the rest before navigating). */
export function pickPathVariables(path: string, variables: PathVariables | undefined): Record<string, string> | undefined {
  if (!variables) return undefined;
  const picked: Record<string, string> = {};
  for (const name of pathVariableNames(path)) {
    const value = variables[name];
    if (typeof value === "string") picked[name] = value;
  }
  return picked;
}

/** Element hash for a link target: a node id maps through `route.elements` to its anchor name. */
export function routeElementId(route: RouteInfo | undefined, hash: string | undefined): string | undefined {
  if (!hash) return undefined;
  if (!route) return hash;
  return route.elements?.[hash] ?? hash;
}

/** Element id with `:variables` filled (CMS-driven anchors). */
export function resolveHash(route: RouteInfo | undefined, hash: string | undefined, hashVariables?: PathVariables): string | undefined {
  const id = routeElementId(route, hash);
  if (!id) return undefined;
  return substitute(id, { ...route?.elements, ...hashVariables });
}

/** Path of a route in a locale (its localized path where it has one, by locale code) with variables filled in. */
export function routePath(route: RouteInfo | undefined, variables?: PathVariables, localeCode?: string): string {
  const localized = localeCode ? route?.pathLocalized?.[localeCode] : undefined;
  return substitute(localized ?? route?.path ?? "/", variables);
}

/** Relative href from one absolute path to another, the way the original runtime writes it: `./`, `./about`, `../about`. */
export function relativePath(from: string, to: string): string {
  const fromDir = from.slice(0, from.lastIndexOf("/") + 1).split("/").filter(Boolean);
  const toIndex = to.lastIndexOf("/");
  const toDir = to.slice(0, toIndex + 1).split("/").filter(Boolean);
  const toFile = to.slice(toIndex + 1);
  let common = 0;
  while (common < fromDir.length && common < toDir.length && fromDir[common] === toDir[common]) common++;
  const up = fromDir.length - common;
  const down = toDir.slice(common);
  const prefix = up > 0 ? Array(up).fill("..").join("/") : ".";
  return [prefix, ...down].join("/") + "/" + toFile;
}

/** Internal = same-site relative link the original runtime may route client-side. */
export function isInternalHref(href: string | undefined): href is string {
  return !!href && (href.startsWith("#") || href.startsWith("/") || href.startsWith("."));
}

/** The original runtime prefixes scheme-less external links ("example.com") with https://. */
export function normalizeHref(href: string): string {
  if (href === "" || isInternalHref(href)) return href;
  try {
    if (new URL(href).protocol) return href;
  } catch {}
  return `https://${href}`;
}

/** Append the current page's query params to an href (the original runtime's "preserve query params"). */
export function forwardQueryParams(href: string, currentSearch: string): string {
  if (!currentSearch) return href;
  const hashIndex = href.indexOf("#");
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
  const withoutHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const queryAt = withoutHash.indexOf("?");
  const base = queryAt < 0 ? withoutHash : withoutHash.slice(0, queryAt);
  const search = queryAt < 0 ? "" : withoutHash.slice(queryAt + 1);
  const params = new URLSearchParams(search);
  const destinationKeys = new Set(params.keys());
  for (const [key, value] of new URLSearchParams(currentSearch)) {
    if (key !== "framer_variant" && !destinationKeys.has(key)) params.append(key, value);
  }
  const query = params.toString();
  return (query ? `${base}?${query}` : base) + hash;
}

function escapeRegExp(text: string): string {
  return text.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
}

/**
 * route paths may end in a slash (`/1/:slug/`) and URLs may or may not carry
 * one: paths are compared without it (the root stays `/`).
 */
function withoutTrailingSlash(path: string): string {
  return path.replace(/(.)\/+$/, "$1");
}

/** Match a URL path against a route pattern, extracting `:variables`. */
export function matchPath(path: string, pattern: string): PathVariables | undefined {
  path = withoutTrailingSlash(path);
  const names: string[] = [];
  const source = escapeRegExp(withoutTrailingSlash(pattern)).replace(/:([a-z]\w*)/gi, (_, name) => {
    names.push(name);
    return "([^/]+)";
  });
  const match = path.match(new RegExp(`^${source}$`));
  if (!match) return undefined;
  const variables: PathVariables = {};
  names.forEach((name, i) => {
    const value = decodeURIComponent(match[i + 1]!);
    if (variables[name] !== undefined && variables[name] !== value) throw new Error("conflict");
    variables[name] = value;
  });
  return variables;
}

function depth(path: string): number {
  return path.split("/").filter(Boolean).length;
}

export interface InferredRoute {
  routeId: string;
  /** The original runtime's locale id (its inferInitialRouteFromPath API). */
  localeId?: string;
  locale?: Locale;
  /** Whether the path named its locale (`/ja/…`); unprefixed paths are the default locale's. */
  localePrefixed?: boolean;
  pathVariables?: Record<string, string>;
}

/**
 * Find the page id for a URL path. Exact (static) paths win; otherwise patterns are
 * tried deepest first. A leading locale slug selects that locale. With `fallback`,
 * unknown paths resolve to the home page, like the original runtime.
 */
export function inferInitialRouteFromPath(routes: Routes, locationPath: string, fallback = true, locales: readonly Locale[] = []): InferredRoute {
  const result = findRouteForPath(routes, locationPath, locales);
  if (result) return result;
  if (!fallback) throw new Error("No exact match found for path");
  const home = Object.keys(routes).find((id) => routes[id]!.path === "/") ?? Object.keys(routes)[0];
  if (!home) throw new Error("Router should not have undefined routes");
  const locale = defaultLocale(locales);
  return { routeId: home, localeId: locale?.id, locale };
}

/**
 * Like inferInitialRouteFromPath but returns undefined when nothing matches. Under a
 * locale prefix a page answers at its localized path where it has one (the original runtime serves
 * `/en/services/consulting`, not `/en/leistungen/consulting`), else at its own path.
 */
export function findRouteForPath(routes: Routes, locationPath: string, locales: readonly Locale[] = []): InferredRoute | undefined {
  let path = locationPath || "/";
  let locale = defaultLocale(locales);
  const firstSegment = path.split("/").find(Boolean);
  const prefixed = firstSegment ? locales.find((l) => l.slug && l.slug === firstSegment) : undefined;
  if (prefixed) {
    locale = prefixed;
    path = path.slice(prefixed.slug.length + 1) || "/";
  }
  const found = { localeId: locale?.id, locale, localePrefixed: !!prefixed };
  const candidates = Object.entries(routes)
    .map(([routeId, route]) => ({ routeId, pattern: (prefixed && route.pathLocalized?.[prefixed.code]) || route.path }))
    .filter((c) => !!c.pattern);
  const exactPath = withoutTrailingSlash(path);
  for (const c of candidates) {
    if (withoutTrailingSlash(c.pattern) === exactPath) return { routeId: c.routeId, ...found, pathVariables: undefined };
  }
  candidates.sort((a, b) => depth(b.pattern) - depth(a.pattern));
  for (const c of candidates) {
    try {
      const variables = matchPath(path, c.pattern);
      if (variables) return { routeId: c.routeId, ...found, pathVariables: variables as Record<string, string> };
    } catch {}
  }
  return undefined;
}

/**
 * The URL path of a split test's variant, from the route segments it is rendered in: its folder
 * (`<folder>/<page>/<variant>/` and its page's path, src/site/split-tests.ts), served by src/proxy.ts at
 * its page's URL, is the path below it. Undefined for any other route.
 */
export function splitTestPagePath(segments: readonly string[], folder: string | undefined): string | undefined {
  if (folder === undefined || segments[0] !== folder) return undefined;
  return "/" + segments.slice(3).join("/");
}

export function defaultLocale(locales: readonly Locale[]): Locale | undefined {
  return locales.find((l) => l.id === "default") ?? locales.find((l) => l.slug === "");
}
