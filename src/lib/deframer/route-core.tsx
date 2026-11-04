"use client";

// Site routing data and the hooks every routing piece shares (router, current
// route, locale). The converter writes the tables into src/site/routes.ts; only
// `routes` is required — `pageIds`, `locales`, `collectionUtils`,
// `preserveQueryParams`, `publishedOrigin`, `reducedMotion`, `pageEffects` and `splitTestsFolder` are optional
// exports read defensively.
//
// Routes are keyed by their path pattern ("/", "/journal/:slug"), which is also
// the route id the router hands around. Links in generated code and CMS content are
// plain paths; page ids survive only where code components store them, and
// `pageIds` maps those to route keys. Item links whose slug depends on the locale keep
// `unresolvedPathSlugs` naming the collection by name; `collectionUtils` loads it.
//
// Locales are named by code everywhere (`pathLocalized`, `includedLocales`, `fallback`,
// translations); their ids stay in the locale table for code that compares them.

import { useContext, useMemo } from "react";
import * as site from "@/site/routes";
import { LocaleInfoContext, PageEffectsContext, RouterContext, type LocaleInfo, type RouteInfo, type RouterApi } from "./contexts";
import type { SitePageEffects } from "./page-effects";
import { defaultLocale, fillPath, type Locale, type Routes } from "./route-paths";

/** A row of the site's locale table: `fallback` names a locale by code. */
type LocaleRow = Omit<Locale, "fallback"> & { fallback?: string | null };

const siteTables = site as unknown as {
  routes: Record<string, Omit<RouteInfo, "path"> & { path?: string }>;
  pageIds?: Record<string, string>;
  locales?: LocaleRow[];
  collectionUtils?: Record<string, unknown>;
  preserveQueryParams?: boolean;
  reducedMotion?: "user" | "never";
  pageEffects?: SitePageEffects;
  splitTestsFolder?: string;
  publishedOrigin?: string;
};

/** The site's pages by route key (their path pattern). */
export const routes: Routes = Object.fromEntries(Object.entries(siteTables.routes).map(([key, settings]) => [key, { ...settings, path: settings.path ?? key }]));

const pageIds: Record<string, string> = siteTables.pageIds ?? {};

/** The route key for a route key or a page id (undefined when neither is known). */
export function routeKey(id: string | undefined): string | undefined {
  if (id === undefined) return undefined;
  if (Object.hasOwn(routes, id)) return id;
  return Object.hasOwn(pageIds, id) ? pageIds[id] : undefined;
}

/** A route by key or page id. */
export function getRoute(id: string | undefined): RouteInfo | undefined {
  const key = routeKey(id);
  return key === undefined ? undefined : routes[key];
}

/** All site locales, each linked to its fallback locale; single-locale sites get the original runtime's implicit default locale. */
export const siteLocales: Locale[] = siteTables.locales?.length
  ? linkFallbacks(siteTables.locales)
  : [{ id: "default", code: "en", name: "English", slug: "", textDirection: "ltr" }];

function linkFallbacks(rows: LocaleRow[]): Locale[] {
  const locales: Locale[] = rows.map(({ fallback, ...locale }) => ({ ...locale }));
  rows.forEach((row, i) => {
    const fallback = row.fallback && locales.find((l) => l.code === row.fallback);
    if (fallback) locales[i]!.fallback = fallback;
  });
  return locales;
}

export const preserveQueryParamsSetting = siteTables.preserveQueryParams === true;
export const publishedOrigin = siteTables.publishedOrigin;

/**
 * Split tests: the folder (route segment) each variant of a tested page is prerendered in, as
 * `<folder>/<page>/<variant>/` and the page's path; src/proxy.ts serves a variant at its page's URL.
 */
export const splitTestsSegment: string | undefined = siteTables.splitTestsFolder?.replace(/^\//, "");

/** Whether the site honours prefers-reduced-motion (a site setting; on by default). */
export const reducedMotionSetting: "user" | "never" = siteTables.reducedMotion ?? "user";

/** Page transitions: the PageEffectsProvider value if one is mounted (re-keyed by route key), else the site's table. */
export function usePageEffects(): SitePageEffects {
  const provided = useContext(PageEffectsContext);
  return useMemo(() => (provided ? byRouteKey(provided) : siteTables.pageEffects ?? { global: undefined, routes: {} }), [provided]);
}

/** Page effects written with page ids (a PageEffectsProvider in generated code) keyed by route key. */
function byRouteKey(effects: SitePageEffects): SitePageEffects {
  const rekey = <T,>(table: Record<string, T> | undefined) => table && Object.fromEntries(Object.entries(table).map(([id, value]) => [routeKey(id) ?? id, value]));
  const routesTable = effects.routes && Object.fromEntries(Object.entries(effects.routes).map(([from, to]) => [routeKey(from) ?? from, rekey(to)]));
  return { ...effects, routes: routesTable };
}

/**
 * A site locale by locale object, code, id or URL slug (generated code names locales
 * by code: `setLocale("en-US")`; code by id or object).
 */
export function findLocale(locale: unknown): Locale | undefined {
  if (locale && typeof locale === "object") {
    const { id, code } = locale as Partial<Locale>;
    return siteLocales.find((l) => l.id === id) ?? siteLocales.find((l) => l.code === code);
  }
  if (typeof locale !== "string" || !locale) return undefined;
  return siteLocales.find((l) => l.code === locale) ?? siteLocales.find((l) => l.id === locale) ?? siteLocales.find((l) => l.slug === locale);
}

export function initialLocale(locale?: unknown): Locale | null {
  return findLocale(locale) ?? defaultLocale(siteLocales) ?? siteLocales[0] ?? null;
}

// --- Router ----------------------------------------------------------------

/** Used outside a PageRoute (e.g. a component in the root layout): plain page loads. */
const fallbackRouter: RouterApi = {
  currentRouteId: "",
  currentPathVariables: {},
  routes,
  getRoute,
  navigate(routeId, hash, pathVariables, _smoothScroll, options) {
    const route = getRoute(routeId);
    if (!route || typeof window === "undefined") return;
    window.location.assign(fillPath(route.path, pathVariables) + (options?.search ?? "") + (hash ? `#${route.elements?.[hash] ?? hash}` : ""));
  },
  preserveQueryParams: preserveQueryParamsSetting,
};

export function useRouter(): RouterApi {
  return useContext(RouterContext) ?? fallbackRouter;
}

export type CurrentRoute = RouteInfo & { id: string; pathVariables?: Record<string, string> };

/** The page being rendered: its route-table entry plus id and path variables. */
export function useCurrentRoute(): CurrentRoute | undefined {
  const router = useRouter();
  const { currentRouteId: id, currentPathVariables: pathVariables } = router;
  const route = id ? router.getRoute(id) : undefined;
  return useMemo(() => (route ? { ...route, id, pathVariables } : undefined), [route, id, pathVariables]);
}

export function useLocaleInfo(): LocaleInfo {
  return useContext(LocaleInfoContext);
}

// --- CMS slugs for `unresolvedPathSlugs` links -----------------------------

interface SlugUtils {
  getSlugByRecordId(id: string, locale?: unknown): unknown;
  getRecordIdBySlug(slug: string, locale?: unknown): unknown;
}

/** A slug lookup: a promise that records its result on itself once settled, as React's `use` reads it. */
export type SlugLookup = Promise<string | undefined> & { status?: "pending" | "fulfilled"; value?: string | undefined };

const slugCache = new Map<string, SlugLookup>();

/** `collectionId`: the collection's name (`journal`, from src/cms/journal.ts). */
async function loadSlugUtils(collectionId: string): Promise<SlugUtils | undefined> {
  let entry: any = siteTables.collectionUtils?.[collectionId];
  if (typeof entry === "function") entry = await entry();
  entry = entry?.utils ?? entry?.default?.utils ?? entry;
  return typeof entry?.getSlugByRecordId === "function" ? entry : undefined;
}

/**
 * Slug of a CMS item, for links that reference an item by id: one cached lookup per item and
 * locale (the same promise every time, so a render that suspends on it replays identically;
 * its `value` once fulfilled). Without a collectionUtils table the slug can't be known: undefined.
 */
export function resolveSlug(ref: { collectionId: string; collectionItemId: string }, locale: Locale | null | undefined): SlugLookup | undefined {
  if (!siteTables.collectionUtils?.[ref.collectionId]) return undefined;
  const key = `${ref.collectionId}:${ref.collectionItemId}:${locale?.code ?? ""}`;
  let lookup = slugCache.get(key);
  if (!lookup) {
    const pending: SlugLookup = loadSlugUtils(ref.collectionId)
      .then((utils) => utils?.getSlugByRecordId(ref.collectionItemId, locale ?? undefined))
      .then((slug) => (typeof slug === "string" && slug ? slug : undefined))
      .catch(() => undefined)
      .then((slug) => Object.assign(pending, { status: "fulfilled" as const, value: slug }).value);
    pending.status = "pending";
    slugCache.set(key, (lookup = pending));
  }
  return lookup;
}

/**
 * A CMS detail page's path variables in another locale: each slug is looked up as an item
 * of the route's collection and replaced by that item's slug in `next`, or its default
 * locale slug where `next` has none (the original runtime's locale switch). Unknown slugs stay.
 */
export async function localizedPathVariables(route: RouteInfo, variables: Record<string, string> | undefined, current: Locale | null, next: Locale) {
  if (!variables || !route.collectionId) return variables;
  const utils = await loadSlugUtils(route.collectionId).catch(() => undefined);
  if (!utils) return variables;
  const translated: Record<string, string> = { ...variables };
  await Promise.all(
    Object.entries(variables).map(async ([name, slug]) => {
      const id = await utils.getRecordIdBySlug(slug, current ?? undefined);
      if (typeof id !== "string") return;
      const nextSlug = (await utils.getSlugByRecordId(id, next)) || (await utils.getSlugByRecordId(id, defaultLocale(siteLocales)));
      if (typeof nextSlug === "string" && nextSlug) translated[name] = nextSlug;
    }),
  );
  return translated;
}
