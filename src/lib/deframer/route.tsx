"use client";

// Routing: maps the original runtime's page navigation onto the Next.js App Router.
//
// SiteRouter (root layout) works out the current page from the URL and renders
// <PageRoute routeId pathVariables localeId>, where the route id is the page's path
// pattern ("/journal/:slug"). PageRoute provides what the original runtime's Router does — the router
// API, the current route, path variables and locale — and performs navigations with
// next/navigation (client-side, no reloads), locale switches included. Scrolling follows the original runtime: a new page
// starts at the top or at its target section; back/forward keeps the browser's
// restored position. Page changes run the original runtime's page transitions (route-transitions.ts).

import {
  createElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useInsertionEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { navigatesDocuments, useHostNavigation, useRoutedPath as useHostPath } from "./host";
import { MotionConfig, MotionGlobalConfig, WillChangeMotionValue } from "motion/react";
import { LocaleInfoContext, PageEffectsContext, PathVariablesContext, RouterContext, type LocaleInfo, type RouterApi } from "./contexts";
import type { SitePageEffects } from "./page-effects";
import {
  findLocale,
  getRoute,
  initialLocale,
  localizedPathVariables,
  preserveQueryParamsSetting,
  reducedMotionSetting,
  routeKey,
  routes,
  siteLocales,
  splitTestsSegment,
  useCurrentRoute,
  useLocaleInfo,
  usePageEffects,
  useRouter,
} from "./route-core";
import {
  findRouteForPath,
  forwardQueryParams,
  localePrefix,
  notFoundPaths,
  pickPathVariables,
  resolveHash,
  routeElementId,
  routePath,
  splitTestPagePath,
  type Locale,
} from "./route-paths";
import { navigateWithTransition, pageKeyOf, scrollToTarget, transitionBetweenDocuments, useShownPage, type ResolveHistoryTarget } from "./route-transitions";
import { notifySearchParamsChanged } from "./route-query";
import { useCustomCodeOnNavigation } from "./route-custom-code";

// The original runtime lets motion manage `will-change` for every animation, including
// those of code components importing motion directly: animated layers get
// `will-change: transform` while they move, which decides how the browser
// composites them. Set here because the root layout always loads this module.
MotionGlobalConfig.WillChange = WillChangeMotionValue;

// A host whose pages are documents of their own: page transitions are the browser's, between them.
if (navigatesDocuments) transitionBetweenDocuments();

export { PathVariablesContext };
export { useRouter, useCurrentRoute, useLocaleInfo, usePageEffects } from "./route-core";
export { fillPath, inferInitialRouteFromPath } from "./route-paths";
export { Link, ResolveLinks, resolveLink, ResetOuterLinkContext } from "./route-link";
export {
  useStringQueryParam,
  useStringArrayQueryParam,
  useNumberQueryParam,
  useBooleanQueryParam,
  useDateQueryParam,
  useEnumQueryParam,
} from "./route-query";

// --- PageRoute ------------------------------------------------------------------

/** The page a history entry shows (for back/forward page transitions). */
const historyTarget: ResolveHistoryTarget = (url) => {
  let pathname = url.pathname;
  try {
    pathname = decodeURI(pathname);
  } catch {}
  const match = findRouteForPath(routes, pathname, siteLocales);
  const route = match && routes[match.routeId];
  if (!match || !route) return undefined;
  const locale = match.locale?.code;
  return { routeId: match.routeId, pageKey: pageKeyOf(match.routeId, routePath(route, match.pathVariables, locale), locale) };
};

/** Keep one object identity for equal path variables (props are new objects every render). */
function useStableVariables(variables: Record<string, string> | undefined) {
  const json = JSON.stringify(variables ?? null);
  return useMemo(() => variables, [json]);
}

export function PageRoute({
  routeId: givenRouteId,
  pathVariables,
  localeId,
  children,
}: {
  routeId: string;
  pathVariables?: Record<string, string>;
  /**
   * Active locale (code or id). Without one a route keeps the locale it is rendered
   * in (the 404 page shows in the visitor's language), else the site's default locale.
   */
  localeId?: string;
  children: ReactNode;
}) {
  const host = useHostNavigation();
  const variables = useStableVariables(pathVariables);
  const routeId = routeKey(givenRouteId) ?? givenRouteId;
  const route = routes[routeId];
  const outer = useContext(LocaleInfoContext);
  const enclosingLocale = outer.locales.length ? outer.activeLocale?.code : undefined;
  const activeLocale = useMemo(() => initialLocale(localeId ?? enclosingLocale), [localeId, enclosingLocale]);
  const currentPath = routePath(route, variables, activeLocale?.code);
  const pageKey = pageKeyOf(routeId, currentPath, activeLocale?.code);
  const pageEffects = usePageEffects();

  const navigate = useCallback<RouterApi["navigate"]>(
    (targetIdOrPageId, hash, targetVariables, smoothScroll, options) => {
      const targetId = routeKey(targetIdOrPageId);
      const target = getRoute(targetId);
      if (!targetId || !target) return;
      const picked = pickPathVariables(target.path, targetVariables);
      const elementId = resolveHash(target, hash);
      const targetLocale = findLocale(options?.localeCode) ?? activeLocale;
      const path = routePath(target, picked, targetLocale?.code);
      let url = localePrefix(targetLocale) + path + (options?.search ?? "");
      if (options?.preserveQueryParams || preserveQueryParamsSetting) url = forwardQueryParams(url, window.location.search);
      url += elementId ? `#${elementId}` : "";

      if (targetId === routeId && path === currentPath && targetLocale?.code === activeLocale?.code) {
        // Same page: record its explicit query and section (hash-only links keep the current query), then scroll (top when there
        // is none) on the next frame, after the click has been handled: a smooth-scroll library
        // (Lenis) reacting to the same click resets the scroll position within this frame, as
        // The original runtime, whose router scrolls after rendering, never sees.
        const anchor = elementId ? `#${elementId}` : "";
        const { pathname, search: previousSearch } = window.location;
        const search = options?.search === undefined ? previousSearch : new URL(url, window.location.href).search;
        if (window.location.hash !== anchor || previousSearch !== search) host.pushSection(pathname + search + anchor);
        if (previousSearch !== search) notifySearchParamsChanged();
        requestAnimationFrame(() => scrollToTarget(elementId, smoothScroll));
        return;
      }
      const arrive = () => scrollToTarget(elementId, smoothScroll, true);
      navigateWithTransition(pageEffects, routeId, targetId, arrive, () => host.push(url));
    },
    [host, routeId, currentPath, activeLocale, pageEffects],
  );

  // Completes navigations to this page (scroll, page transition) and handles back/forward transitions.
  useShownPage({ effects: pageEffects, routeId, pageKey, resolveTarget: historyTarget });

  // Query-param hooks re-read the URL after every page change.
  useEffect(() => notifySearchParamsChanged(), [pageKey]);

  // The original runtime's locale switch: the same page (CMS items by their slug in the new locale) at
  // the new locale's URL, keeping the scroll position, with the current route's page effect.
  const setLocale = useCallback(
    async (locale: unknown) => {
      const nextLocale = findLocale(locale);
      if (!nextLocale || nextLocale.code === activeLocale?.code || !route) return;
      try {
        localStorage.preferredLocale = nextLocale.code;
      } catch {}
      const nextVariables = await localizedPathVariables(route, variables, activeLocale, nextLocale);
      let url = localePrefix(nextLocale) + routePath(route, nextVariables, nextLocale.code);
      if (preserveQueryParamsSetting) url = forwardQueryParams(url, window.location.search);
      navigateWithTransition(pageEffects, routeId, routeId, undefined, () => host.push(url));
    },
    [activeLocale, route, routeId, variables, host, pageEffects],
  );

  const localeInfo = useMemo<LocaleInfo>(() => {
    const contentLocale = findLocale(activeLocale && route?.contentLocales?.[activeLocale.code]) ?? activeLocale;
    return {
      activeLocale: activeLocale as LocaleInfo["activeLocale"],
      contentLocale: contentLocale as LocaleInfo["contentLocale"],
      locales: siteLocales as LocaleInfo["locales"],
      setLocale,
    };
  }, [activeLocale, route, setLocale]);

  const api = useMemo<RouterApi>(
    () => ({
      currentRouteId: routeId,
      currentPathVariables: variables as Record<string, string>,
      routes,
      getRoute,
      navigate,
      preserveQueryParams: preserveQueryParamsSetting,
    }),
    [routeId, variables, navigate],
  );

  return (
    <RouterContext.Provider value={api}>
      <LocaleInfoContext.Provider value={localeInfo}>
        <PathVariablesContext.Provider value={variables}>
          <MotionConfig reducedMotion={reducedMotionSetting}>{children}</MotionConfig>
        </PathVariablesContext.Provider>
      </LocaleInfoContext.Provider>
    </RouterContext.Provider>
  );
}

/** The original runtime's PageEffectsProvider: overrides the site's page transitions for its subtree. */
export function PageEffectsProvider({ value, children }: { value: SitePageEffects; children?: ReactNode }) {
  return <PageEffectsContext.Provider value={value}>{children}</PageEffectsContext.Provider>;
}

/** The original runtime's PageRoot, reduced to a website render: route providers around the root component. */
export function PageRoot({ RootComponent, routeId, pathVariables, localeId }: any) {
  const content = isValidElement(RootComponent) ? RootComponent : RootComponent ? createElement(RootComponent, { key: routeId }) : null;
  return (
    <PageRoute routeId={routeId} pathVariables={pathVariables} localeId={localeId}>
      {content}
    </PageRoute>
  );
}

// --- Route hooks --------------------------------------------------------------------

export function useCurrentRouteId(): string | undefined {
  return useCurrentRoute()?.id;
}

export function useRoute(routeId: string | undefined) {
  const router = useRouter();
  return routeId ? router.getRoute(routeId) : undefined;
}

/** Path variables of the current page (CMS detail pages); undefined on static pages. */
export function useCurrentPathVariables(): Record<string, string> | undefined {
  return useCurrentRoute()?.pathVariables;
}

/** Anchor id for an element node: its section name from the route's `elements`, else the id itself. */
export function useRouteElementId(id: string, targetRouteId?: string): string | undefined {
  const current = useCurrentRoute();
  const target = useRoute(targetRouteId) ?? current;
  return useMemo(() => (target ? routeElementId(target, id) : id), [target, id]);
}

/** Returns navigate(pageId): used by code components and interactions. */
export function useNavigate() {
  const { navigate } = useRouter();
  return useCallback((target: string) => {
    navigate(target);
    return false;
  }, [navigate]);
}

/** Click handler navigating to a page (optionally a section of it). */
export function useRouteHandler(routeId: string, _preload = false, elementId?: string) {
  const { navigate } = useRouter();
  return useCallback(() => navigate(routeId, elementId), [navigate, routeId, elementId]);
}

/** href + onClick for a custom anchor to a page / section. */
export function useRouteAnchor(routeId: string, { elementId, hash }: { elementId?: string; hash?: string } = {}) {
  const { navigate, getRoute, currentRouteId, currentPathVariables } = useRouter();
  const { activeLocale } = useLocaleInfo();
  const target = hash ?? elementId;
  const route = getRoute(routeId);
  const href = useMemo(() => {
    const section = resolveHash(route, target);
    const current = getRoute(currentRouteId);
    const path = routePath(route, currentPathVariables, activeLocale?.code);
    const samePage = current && routePath(current, currentPathVariables, activeLocale?.code) === path;
    return (samePage && section ? "" : localePrefix(activeLocale as Locale) + path) + (section ? `#${section}` : "");
  }, [route, target, getRoute, currentRouteId, currentPathVariables, activeLocale]);
  const onClick = useCallback(
    (event: { preventDefault(): void }) => {
      event.preventDefault();
      navigate(routeId, target);
    },
    [navigate, routeId, target],
  );
  return { href, onClick };
}

/**
 * True when rendered in the active navigation target. The original runtime's legacy Navigation
 * component is the only thing that renders non-current targets; on websites
 * every page is the current one.
 */
export function useIsInCurrentNavigationTarget(): boolean {
  return true;
}

/** The original runtime's data-fetch prefetch (Fetcher requests): warms the HTTP cache. */
const prefetched = new Map<string, Promise<unknown>>();
export function usePrefetch() {
  return useCallback((request: { url?: string } | string) => {
    const url = typeof request === "string" ? request : request?.url;
    if (!url || typeof window === "undefined" || prefetched.has(url)) return prefetched.get(url ?? "");
    const pending = fetch(url, { credentials: "omit" }).catch(() => undefined);
    prefetched.set(url, pending);
    return pending;
  }, []);
}

// --- Locale ---------------------------------------------------------------------------

export function useLocaleCode(): string {
  return useLocaleInfo().activeLocale?.code ?? "en-US";
}

export function useLocale(): string {
  return useLocaleCode();
}

export function useLocalizationInfo() {
  const { activeLocale, locales, setLocale } = useLocaleInfo();
  return { activeLocalization: activeLocale, localizations: locales, setLocalization: setLocale };
}

/** Locales the current page exists in (for locale switchers). Starts with the active one, like the original runtime. */
export function useLocalesForCurrentRoute() {
  const { activeLocale, locales } = useLocaleInfo();
  const route = useCurrentRoute();
  const [available, setAvailable] = useState<NonNullable<LocaleInfo["activeLocale"]>[]>(() => (activeLocale ? [activeLocale] : []));
  useEffect(() => {
    const included = route?.includedLocales;
    setAvailable(locales.filter((l): l is NonNullable<typeof l> => !!l && (!included || included.includes(l.code))));
  }, [locales, route]);
  return available;
}

export function useLayoutDirection(): "ltr" | "rtl" {
  return useLocaleInfo().activeLocale?.textDirection ?? "ltr";
}

// --- Metadata -----------------------------------------------------------------------------

interface PageMetadata {
  title?: string;
  description?: string;
  robots?: string;
  viewport?: string;
}

function setMetaContent(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  if (tag.getAttribute("content") !== content) tag.setAttribute("content", content);
}

/**
 * Keeps <title>, description, robots and viewport in sync with the page after
 * client-side navigations (the server render gets them from Next metadata).
 */
export function useMetadata(metadata: PageMetadata | undefined) {
  const title = metadata?.title;
  const viewport = metadata?.viewport;
  const applyTitle = useRef(() => {});
  applyTitle.current = () => {
    if (title !== undefined && document.title !== title) document.title = title;
  };
  useInsertionEffect(() => {
    applyTitle.current();
    if (viewport) setMetaContent("viewport", viewport);
  }, [title, viewport]);
  // Next may commit its own <title> in the same update; re-apply once everything has settled.
  useEffect(() => applyTitle.current(), [title]);
  useEffect(() => {
    if (metadata?.robots) setMetaContent("robots", metadata.robots);
    if (metadata?.description) setMetaContent("description", metadata.description);
  }, [metadata?.robots, metadata?.description]);
}

// --- URL-driven router -------------------------------------------------------------

/**
 * Root-layout provider: works out the current page (and CMS item) from the
 * URL, so route files don't carry page ids. Unknown URLs map to the site's 404 page.
 * The not-found route file renders its own <PageRoute> for the 404 page: Next serves
 * that page prerendered once for every unknown URL, so it must not depend on the URL.
 *
 * Multi-locale sites serve every locale from one route tree, `src/app/[locale]`, whose
 * layout passes the `locale` (code); see `useRoutedPath`.
 */
export function SiteRouter({ locale, children }: { locale?: string; children: ReactNode }) {
  const path = useRoutedPath(locale);
  // The original runtime's router applies the site's custom code snippets on every client-side navigation.
  useCustomCodeOnNavigation(path);
  const match = useMemo(() => {
    const found = findRouteForPath(routes, path, siteLocales);
    if (found) return found;
    const notFound = Object.keys(routes).find((id) => notFoundPaths.has(routes[id]!.path));
    return { routeId: notFound ?? Object.keys(routes)[0]!, locale: undefined, pathVariables: undefined };
  }, [path]);
  return (
    <PageRoute routeId={match.routeId} pathVariables={match.pathVariables} localeId={match.locale?.code ?? locale}>
      {children}
    </PageRoute>
  );
}

function decodePath(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

/**
 * The public URL path of the page being rendered. With a `locale`, Next serves the page
 * through a rewrite (src/proxy.ts: `/en/kontakt` and the default locale's `/kontakt`
 * are `src/app/[locale]/kontakt`), and usePathname differs between the server (the
 * rewritten path) and the browser (the address bar). The route segments below the
 * layout and its locale are the same in both, so the path is built from them.
 */
function useRoutedPath(locale: string | undefined): string {
  const { pathname, segments: given } = useHostPath();
  // A host serving every page at its own URL gives no segments: the path is the page's.
  if (!given) return decodePath(pathname);
  const segments = given;
  // A split test's variant renders as its page, on the server (at its folder's path) as in the browser (at the page's URL).
  const variantPath = splitTestPagePath(segments.map(decodePath), splitTestsSegment);
  if (locale === undefined) return variantPath ?? decodePath(pathname);
  return localePrefix(findLocale(locale)) + (variantPath ?? "/" + segments.map(decodePath).join("/"));
}
