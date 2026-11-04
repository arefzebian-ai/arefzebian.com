"use client";

// React contexts shared across the kit. Every area module imports contexts
// from here so that providers and consumers always agree on identity.

import { createContext } from "react";

export interface RouteInfo {
  path: string;
  /** CMS detail pages: the collection (by name) whose slugs the path holds. */
  collectionId?: string;
  elements?: Record<string, string>;
  /** Per-locale paths (locale code -> path) where a locale's URL differs. */
  pathLocalized?: Record<string, string>;
  /** Locale codes this page exists in (all when absent). */
  includedLocales?: string[];
  /** Locales (by code) whose page shows another locale's content (the original runtime's canonical locale), by code. */
  contentLocales?: Record<string, string>;
  /**
   * Framer's routes carry the page's component, which code preloads before navigating (Framer's site
   * search: `route?.page?.preload?.()`). The kit's routes don't: navigation loads the page itself.
   */
  page?: { preload?(): Promise<unknown> };
}

export interface RouterApi {
  /** Id of the web page currently rendered. */
  currentRouteId: string;
  currentPathVariables: Record<string, string>;
  routes: Record<string, RouteInfo>;
  getRoute(routeId: string): RouteInfo | undefined;
  /** Navigate to a page id (optionally to an element hash / with CMS path variables). */
  navigate(routeId: string, hash?: string, pathVariables?: Record<string, string>, smoothScroll?: boolean, options?: NavigateOptions): void;
  /** Site-wide "preserve query params on internal links" setting. */
  preserveQueryParams?: boolean;
}

export interface NavigateOptions {
  /** Explicit destination query, including `?`; an empty query clears the current one. */
  search?: string;
  /** Carry the current URL's query params over to the target (Link `preserveParams`). */
  preserveQueryParams?: boolean;
  /** Explicit locale carried by a link to a prefixed URL. */
  localeCode?: string;
}

export const RouterContext = createContext<RouterApi | undefined>(undefined);

export const PathVariablesContext = createContext<Record<string, string> | undefined>(undefined);

export interface LocaleInfo {
  activeLocale: { id: string; code: string; name: string; slug: string; textDirection: "ltr" | "rtl" } | null;
  /** The locale whose content the page shows: the active one, unless the page shows another's. */
  contentLocale: LocaleInfo["activeLocale"];
  locales: LocaleInfo["activeLocale"][];
  setLocale(locale: unknown): void;
}

const implicitLocale = { id: "default", code: "en", name: "English", slug: "", textDirection: "ltr" } as const;

export const LocaleInfoContext = createContext<LocaleInfo>({
  activeLocale: implicitLocale,
  contentLocale: implicitLocale,
  locales: [],
  setLocale() {},
});

/** Size/position of the slot a component instance renders into (the original runtime's ComponentViewport). */
export interface ComponentViewport {
  width?: number | string;
  /** Pixels: generated code computes child slots from it (`(componentViewport?.height || 200) * 0.5`). */
  height?: number;
  y?: number;
}

export const ComponentViewportContext = createContext<ComponentViewport>({});

/** Provided by every generated component/page; read by layout templates and nested instances. */
export interface GeneratedComponentContextValue {
  activeVariantId?: string;
  primaryVariantId?: string;
  humanReadableVariantMap?: Record<string, string>;
  variantClassNames?: Record<string, string>;
  /** Breakpoint variant -> the class hiding a layer there (breakpoints.tsx). */
  hiddenClassNames?: Record<string, string>;
  isLayoutTemplate?: boolean;
}

export const GeneratedComponentContext = createContext<GeneratedComponentContextValue | undefined>(undefined);

/**
 * site id (the hash the original runtime's PageRoot receives as its site id). The original runtime's
 * runtime sends it to its own services; converted projects don't use them (native
 * forms post to the project's route handlers, forms.tsx), so nothing provides it.
 */
export const SiteIdContext = createContext<string | undefined>(undefined);

/** The Link an element renders inside (scope + node id); nested links become spans. */
export interface OuterLinkInfo {
  scopeId?: string;
  nodeId?: string;
}

export const OuterLinkContext = createContext<OuterLinkInfo | undefined>(undefined);

/** Deprecated Data() observers (CMS area): `update` counts store changes; NaN = no observer above. */
export const DataObserverContext = createContext<{ update: number }>({ update: NaN });

/**
 * Page transition settings (the original runtime's PageEffectsProvider). Unprovided, the router
 * uses the site's `pageEffects` table from src/site/routes.ts.
 */
export const PageEffectsContext = createContext<import("./page-effects").SitePageEffects | undefined>(undefined);

/**
 * Refs to page sections a layout template's effects follow, keyed by the
 * template prop that receives them (provided by SectionRefs, read by asLayoutTemplate).
 */
export const SectionRefsContext = createContext<Record<string, unknown> | undefined>(undefined);
