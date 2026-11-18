"use client";

// The original runtime's <Link>, <ResolveLinks> and resolveLink.
//
// An original-runtime Link renders no element of its own: it clones its single child
// (usually a motion.a) and gives it `href`, `target`, `rel`, an onClick that
// routes client-side, and `data-page-link-current` when the link points
// at the page being shown. Page links are written relative to the current page
// ("./about", "../journal/x") exactly like the original runtime's published HTML.
//
// An href is a path ("/about#team"), an external URL, or — where content still
// stores them (CMS rich text, code components) — the original runtime's `{ webPageId }` link
// objects; both kinds resolve to the same page, current marker and navigation.

import {
  Children,
  Suspense,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  use,
  useCallback,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { useHostNavigation } from "./host";
import { isMotionComponent, motion, unwrapMotionComponent } from "motion/react";
import { LocaleInfoContext, OuterLinkContext, PathVariablesContext, type RouterApi } from "./contexts";
import { getRoute, publishedOrigin, resolveSlug, routeKey, routes, siteLocales, useCurrentRoute, useLocaleInfo, useRouter, type CurrentRoute } from "./route-core";
import {
  findRouteForPath,
  isInternalHref,
  localePrefix,
  normalizeHref,
  resolveHash,
  routePath,
  type Locale,
  type PathVariables,
} from "./route-paths";

// --- Link values -------------------------------------------------------------

interface SlugRef {
  collectionId: string;
  collectionItemId: string;
}

/** `{ webPageId }` link objects generated for page / CMS item links. */
export interface PageLink {
  webPageId: string;
  hash?: string;
  pathVariables?: PathVariables;
  hashVariables?: PathVariables;
  unresolvedPathSlugs?: Record<string, SlugRef>;
  unresolvedHashSlugs?: Record<string, SlugRef>;
}

type Href = string | PageLink | null | undefined;

function isPageLink(value: unknown): value is PageLink {
  return !!value && typeof value === "object" && "webPageId" in value;
}

const pageLinkPrefix = "data:framer/page-link,";

/** Older sites store page links as `data:framer/page-link,<pageId>?element=…` strings. */
function parseDataPageLink(link: string): PageLink | undefined {
  try {
    const url = new URL(link);
    const target = url.pathname.slice("framer/page-link,".length);
    if (!target || target === "none") return undefined;
    const element = url.searchParams.get("element");
    const variables = url.searchParams.get("pathVariables");
    const pathVariables = variables ? Object.fromEntries([...new URLSearchParams(variables)].filter(([, v]) => v)) : undefined;
    return { webPageId: target, hash: element && element !== "none" ? element : undefined, pathVariables };
  } catch {
    return undefined;
  }
}

/** Page link object, plain string href, or undefined for an unusable link. */
function toPageLink(href: Href): PageLink | string | undefined {
  if (isPageLink(href)) return href;
  if (typeof href !== "string") return undefined;
  return href.startsWith(pageLinkPrefix) ? parseDataPageLink(href) : href;
}

function hasUnresolvedSlugs(href: unknown): boolean {
  return isPageLink(href) && !!(href.unresolvedPathSlugs || href.unresolvedHashSlugs);
}

// --- CMS slug resolution ----------------------------------------------------

type ResolvedSlugs = { path: Record<string, string>; hash: Record<string, string> };

/** Resolve item-id references to slugs, suspending (React `use`) while they load. */
function useResolvedSlugs(link: PageLink | string | undefined, locale: Locale | null): ResolvedSlugs | undefined {
  if (!isPageLink(link) || !(link.unresolvedPathSlugs || link.unresolvedHashSlugs)) return undefined;
  return readSlugs(link, locale, (promise) => use(promise));
}

/** Slugs of a link's item references: `wait` suspends on lookups still running (React `use`), else they are left out. */
function readSlugs(link: PageLink, locale: Locale | null, wait?: (p: Promise<string | undefined>) => string | undefined): ResolvedSlugs {
  const read = (refs: Record<string, SlugRef> | undefined) => {
    const out: Record<string, string> = {};
    for (const key in refs) {
      const lookup = resolveSlug(refs[key]!, locale);
      // Always handed to `wait`, settled or not: a replayed render must make the same `use` calls.
      const slug = lookup && (wait ? wait(lookup) : lookup.value);
      if (slug) out[key] = slug;
    }
    return out;
  };
  return { path: read(link.unresolvedPathSlugs), hash: read(link.unresolvedHashSlugs) };
}

// --- Resolving a link against the current route ----------------------------

/** What a link resolves to on the current page. */
interface LinkTarget {
  href: string;
  /** A relocated absolute link keeps its original native navigation and default target. */
  external?: boolean;
  /** Present for links that route client-side to a page. */
  page?: { routeId: string; elementId?: string; pathVariables: Record<string, string>; localeCode?: string; search?: string };
  current?: boolean;
}

interface LinkScope {
  router: RouterApi;
  currentRoute: CurrentRoute | undefined;
  implicitPathVariables: PathVariables | undefined;
  locale: Locale | null;
}

/**
 * Href for a page path. Always absolute (`/about`, `/works/grid-view`) so native
 * fallback navigation and iOS Safari don't resolve `./about`-style relatives against
 * the wrong directory when the current URL has no trailing slash.
 */
function hrefForPath(path: string, scope: LinkScope): string {
  return localePrefix(scope.locale) + path;
}

function compact(variables: PathVariables): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key in variables) if (typeof variables[key] === "string") out[key] = variables[key]!;
  return out;
}

/** The original runtime marks a link "current" when it targets this page (same CMS item) without a section hash. */
function isCurrentPage(currentRoute: CurrentRoute | undefined, routeId: string, hash: string | undefined, variables: PathVariables) {
  if (!currentRoute || currentRoute.id !== routeId || hash) return false;
  const names = [...currentRoute.path.matchAll(/:([a-z]\w*)/gi)].map((m) => m[1]!);
  return names.every((name) => currentRoute.pathVariables?.[name] === variables[name]);
}

function resolvePageLinkTarget(link: PageLink, scope: LinkScope, slugs?: ResolvedSlugs): LinkTarget | undefined {
  // Deleted pages still have a home href in the published runtime. Keep their
  // original id for the click handler: navigating to an absent page is a no-op.
  const routeId = routeKey(link.webPageId) ?? link.webPageId;
  const route = scope.router.getRoute(link.webPageId);
  const pathVariables = { ...scope.implicitPathVariables, ...link.pathVariables, ...slugs?.path };
  const hashVariables = { ...scope.implicitPathVariables, ...link.hashVariables, ...slugs?.hash };
  const elementId = route ? resolveHash(route, link.hash, hashVariables) : undefined;
  const path = routePath(route, pathVariables, scope.locale?.code);
  return {
    href: hrefForPath(path, scope) + (elementId ? `#${elementId}` : ""),
    page: { routeId, elementId, pathVariables: compact(pathVariables) },
    current: isCurrentPage(scope.currentRoute, routeId, link.hash, pathVariables),
  };
}

/** Relocate an absolute published-page link, keeping native navigation and its original target policy. */
function localPublishedHref(href: string, router: RouterApi): string | undefined {
  if (!publishedOrigin) return undefined;
  try {
    const url = new URL(href);
    if (url.origin !== publishedOrigin || url.username || url.password) return undefined;
    if (!findRouteForPath(router.routes, decodeURI(url.pathname), siteLocales)) return undefined;
    return url.href.slice(url.origin.length);
  } catch { return undefined; }
}

/** Internal paths match page routes in the active locale; their explicit queries belong to the destination. */
function resolveStringTarget(href: string, scope: LinkScope): LinkTarget {
  if (!isInternalHref(href)) {
    const local = localPublishedHref(href, scope.router);
    return local === undefined ? { href: normalizeHref(href) } : { href: local, external: true };
  }
  const hashAt = href.indexOf("#");
  const beforeHash = hashAt < 0 ? href : href.slice(0, hashAt);
  const hash = hashAt < 0 ? undefined : href.slice(hashAt + 1);
  const queryAt = beforeHash.indexOf("?");
  const pathname = queryAt < 0 ? beforeHash : beforeHash.slice(0, queryAt);
  const query = queryAt < 0 ? undefined : beforeHash.slice(queryAt + 1);
  const current = scope.currentRoute;

  // A Framer Link resolves an empty pathname against the site's home route,
  // even on another page. Outside a routed page it remains a native anchor.
  if (!pathname && !current) return { href };

  const base = current ? localePrefix(scope.locale) + routePath(current, current.pathVariables, scope.locale?.code) : "/";
  const absolute = !pathname ? "/" : pathname.startsWith("/") ? pathname : new URL(pathname, `http://x${base}`).pathname;
  const match = findRouteForPath(scope.router.routes, absolute, siteLocales);
  if (!match) return { href };
  const route = scope.router.getRoute(match.routeId)!;
  const pathVariables = { ...scope.implicitPathVariables, ...match.pathVariables };
  const locale = (match.localePrefixed ? match.locale : undefined) ?? scope.locale;
  const path = routePath(route, pathVariables, locale?.code);
  return {
    // A link into another locale can't be relative to this page's URL.
    href: (locale?.code === scope.locale?.code ? hrefForPath(path, scope) : localePrefix(locale) + path) + (query !== undefined ? `?${query}` : "") + (hash !== undefined ? `#${hash}` : ""),
    page: { routeId: match.routeId, elementId: hash, pathVariables: compact(pathVariables), localeCode: locale?.code, search: query === undefined ? undefined : `?${query}` },
    current: locale?.code === scope.locale?.code && isCurrentPage(current, match.routeId, hash, pathVariables),
  };
}

/**
 * Absolute URL of a link, as the original runtime's resolveLink returns it (used by ResolveLinks
 * to hand hrefs to components as plain strings). `onlyHash` returns just the anchor.
 */
function resolveLinkInternal(
  href: Href,
  router: RouterApi,
  implicitPathVariables: PathVariables | undefined,
  onlyHash: unknown,
  locale: Locale | null | undefined,
  slugs?: ResolvedSlugs,
): string | undefined {
  const link = toPageLink(href);
  if (!isPageLink(link)) return typeof link === "string" ? normalizeHref(link) : undefined;
  if (!router.currentRouteId) return undefined;
  const route = router.getRoute(link.webPageId);
  // ResolveLinks/resolveLink use the locale's home path for an unknown page.
  // routePath and resolveHash also preserve hash-only results in that case.
  const base = { ...router.currentPathVariables, ...implicitPathVariables };
  const hash = resolveHash(route, link.hash, { ...base, ...link.hashVariables, ...slugs?.hash });
  if (onlyHash) return hash ?? "";
  const path = routePath(route, { ...base, ...link.pathVariables, ...slugs?.path }, locale?.code);
  return localePrefix(locale) + path + (hash ? `#${hash}` : "");
}

/** Public resolveLink(href, router, implicitPathVariables?, activeLocale?): absolute href or undefined. */
export function resolveLink(href: any, router?: RouterApi, implicitPathVariables?: PathVariables, activeLocale?: Locale | null): string | undefined {
  const api = router ?? { currentRouteId: "", currentPathVariables: {}, routes, getRoute, navigate() {} };
  const link = toPageLink(href);
  const slugs = isPageLink(link) && hasUnresolvedSlugs(link) ? readSlugs(link, activeLocale ?? null) : undefined;
  return resolveLinkInternal(href, api, implicitPathVariables, undefined, activeLocale, slugs);
}

// --- Click handling ---------------------------------------------------------

function isModifiedClick(event: React.MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function closestAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  return target instanceof Element ? target.closest("a") : null;
}

/** Follow an href outside React's routing (nested links are spans, so the browser can't). */
function openHref(href: string, rel?: string, target?: string) {
  const a = document.createElement("a");
  a.href = href;
  if (rel) a.rel = rel;
  if (target) a.target = target;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// --- Prefetching ------------------------------------------------------------

// The original runtime's rule: a page is fetched ahead once a link to it has been in view (90% of
// it) for half a second, never for crawlers or a connection asking to save data (or 2G), at most
// four at a time on 3G. Links that only flash past while the page loads or scrolls fetch nothing,
// so a first visit's own requests (its images, fonts and scripts) get the connection to themselves.

/** How long a link stays in view before its page is fetched, and how much of it must be visible. */
const PREFETCH_AFTER_MS = 500;
const PREFETCH_VISIBLE = 0.9;
const isCrawler = () => navigator.webdriver || /bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent);

type Connection = { saveData?: boolean; effectiveType?: string };
/** How many page fetches may run at once on this connection (0: none). */
function prefetchBudget(): number {
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  const type = connection?.effectiveType ?? "";
  if (connection?.saveData || type.includes("2g")) return 0;
  return type === "3g" ? 4 : Infinity;
}

const prefetchers = new WeakMap<Element, { prefetch: () => Promise<unknown> | void; timer?: ReturnType<typeof setTimeout> }>();
let prefetchObserver: IntersectionObserver | undefined;
let activePrefetches = 0;

/** Prefetch a page's route payload once its link has been in view for a moment. */
function observeForPrefetch(node: Element, prefetch: () => Promise<unknown> | void): () => void {
  if (typeof IntersectionObserver === "undefined" || isCrawler()) return () => {};
  prefetchObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const watched = prefetchers.get(entry.target);
        if (!watched) continue;
        clearTimeout(watched.timer);
        const inView = entry.isIntersecting && entry.intersectionRatio >= PREFETCH_VISIBLE;
        if (!inView || activePrefetches >= prefetchBudget()) continue;
        watched.timer = setTimeout(() => {
          prefetchers.delete(entry.target);
          prefetchObserver!.unobserve(entry.target);
          activePrefetches++;
          Promise.resolve(watched.prefetch())
            .catch(() => {})
            .finally(() => activePrefetches--);
        }, PREFETCH_AFTER_MS);
      }
    },
    { threshold: PREFETCH_VISIBLE },
  );
  prefetchers.set(node, { prefetch });
  prefetchObserver.observe(node);
  return () => {
    clearTimeout(prefetchers.get(node)?.timer);
    prefetchers.delete(node);
    prefetchObserver?.unobserve(node);
  };
}

// --- Refs ---------------------------------------------------------------------

type AnyRef = Ref<any> | ((node: any) => void | (() => void)) | undefined;

function assignRef(ref: AnyRef, value: unknown): void | (() => void) {
  if (typeof ref === "function") return ref(value) as any;
  if (ref && typeof ref === "object") (ref as { current: unknown }).current = value;
}

function mergeRefs(...refs: AnyRef[]) {
  return (node: unknown) => {
    const cleanups = refs.map((ref) => assignRef(ref, node));
    return () => cleanups.forEach((cleanup, i) => (typeof cleanup === "function" ? cleanup() : assignRef(refs[i], null)));
  };
}

// --- Nested links -------------------------------------------------------------

/** Links inside links can't be <a> in HTML: the original runtime renders the inner one as a span with link semantics. */
function anchorAsSpan(type: unknown): unknown {
  if (type === "a") return "span";
  if (isMotionComponent(type as any) && unwrapMotionComponent(type as any) === "a") return motion.span;
  return type;
}

function replaceAnchor(child: ReactNode, handlers: Record<string, unknown>): ReactNode {
  if (!isValidElement(child)) return child;
  const props = child.props as Record<string, any>;
  // A breakpoint's overrides between the link and its layer (PropertyOverrides): the layer may only
  // be an anchor at some breakpoints (`overrides: { Phone: { as: "a" } }`), so look through it.
  if ((child.type as { passesPropsToChild?: boolean } | undefined)?.passesPropsToChild) {
    const overrides = props.overrides as Record<string, Record<string, unknown> | undefined> | undefined;
    const spans = overrides && Object.fromEntries(Object.entries(overrides).map(([variant, values]) => [variant, values?.as ? { ...values, as: anchorAsSpan(values.as) } : values]));
    const overridden = Boolean(overrides && Object.keys(overrides).some((variant) => spans![variant]?.as !== overrides[variant]?.as));
    const kids = props.children as ReactNode;
    const inner = Array.isArray(kids) ? kids.map((grandchild) => replaceAnchor(grandchild, handlers)) : replaceAnchor(kids, handlers);
    const replaced = Array.isArray(kids) ? (inner as ReactNode[]).some((element, i) => element !== kids[i]) : inner !== kids;
    if (!overridden && !replaced) return child;
    return cloneElement(child as ReactElement<any>, {
      ...(overridden ? { overrides: spans, ...handlers, "data-nested-link": true, role: "link", tabIndex: 0 } : {}),
      children: inner,
    });
  }
  const type = anchorAsSpan(child.type);
  const as = props.as ? anchorAsSpan(props.as) : undefined;
  if (type === child.type && as === props.as) return child;
  return createElement(type as any, {
    ...props,
    ...handlers,
    "data-nested-link": true,
    role: "link",
    tabIndex: 0,
    ...(as ? { as } : {}),
    key: child.key,
  });
}

/** The original runtime resets the outer link around portals/overlays so their links stay real anchors. */
export function ResetOuterLinkContext({ children }: { children?: ReactNode }) {
  return <OuterLinkContext.Provider value={undefined}>{children}</OuterLinkContext.Provider>;
}

// --- Link -----------------------------------------------------------------------

export interface LinkProps {
  href?: Href;
  openInNewTab?: boolean;
  smoothScroll?: boolean;
  relValues?: string[];
  preserveParams?: boolean;
  clickTrackingId?: string;
  nodeId?: string;
  scopeId?: string;
  motionChild?: boolean;
  children?: ReactNode;
  [prop: string]: any;
}

function useLinkTarget(href: Href, slugs: ResolvedSlugs | undefined): LinkTarget | undefined {
  const router = useRouter();
  const currentRoute = useCurrentRoute();
  const contextVariables = useContext(PathVariablesContext);
  const { activeLocale } = useLocaleInfo();
  const link = toPageLink(href);
  return useMemo(() => {
    if (!link) return undefined;
    const scope: LinkScope = {
      router,
      currentRoute,
      implicitPathVariables: contextVariables ?? currentRoute?.pathVariables,
      locale: activeLocale as Locale | null,
    };
    return typeof link === "string" ? resolveStringTarget(link, scope) : resolvePageLinkTarget(link, scope, slugs);
  }, [link, router, currentRoute, contextVariables, activeLocale, slugs]);
}

const LinkInner = forwardRef<unknown, LinkProps>(function LinkInner(
  { href, openInNewTab, smoothScroll, relValues, preserveParams, clickTrackingId, nodeId, scopeId, motionChild, children, ...rest },
  forwardedRef,
) {
  // CMS item slugs first, before any hook: a render that suspends here leaves no partial hook
  // state behind (React would otherwise compare the retry's hooks with the suspended attempt's).
  const slugs = useResolvedSlugs(toPageLink(href), use(LocaleInfoContext).activeLocale as Locale | null);
  const router = useRouter();
  const host = useHostNavigation();
  const target = useLinkTarget(href, slugs);
  const outerLink = useContext(OuterLinkContext);
  const page = target?.page;
  const external = target?.external || !isInternalHref(target?.href);
  const opensNewTab = page ? openInNewTab === true : openInNewTab ?? external;
  const rel = !page && external ? ["noopener", ...(relValues ?? [])].join(" ") : undefined;

  const navigate = useCallback(() => {
    if (!page) return;
    router.navigate(page.routeId, page.elementId, page.pathVariables, smoothScroll, { preserveQueryParams: preserveParams, localeCode: page.localeCode, search: page.search });
  }, [router, page, smoothScroll, preserveParams]);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (!page || isModifiedClick(event)) return;
      const anchor = closestAnchor(event.target);
      if (!anchor || anchor.getAttribute("target") === "_blank") return;
      event.preventDefault();
      navigate();
    },
    [page, navigate],
  );

  // Warm Next's route cache for pages this link can open.
  const prefetchPath = page && router.getRoute(page.routeId) && !opensNewTab ? target!.href : undefined;
  const observeRef = useCallback(
    (node: Element | null) => {
      if (!node || !prefetchPath) return;
      const url = new URL(prefetchPath, window.location.href);
      if (url.pathname === window.location.pathname) return;
      return observeForPrefetch(node, () => host.prefetch(url.pathname));
    },
    [prefetchPath, host],
  );

  const onlyChild = Children.count(children) === 1 && isValidElement(children) ? (children as ReactElement<any>) : null;
  const childRef = onlyChild?.props.ref;
  const ref = useMemo(() => mergeRefs(childRef, forwardedRef, observeRef), [childRef, forwardedRef, observeRef]);

  const linkProps: Record<string, unknown> = target
    ? {
        href: target.href,
        target: opensNewTab ? "_blank" : undefined,
        rel,
        "data-page-link-current": target.current || undefined,
      }
    : {};

  let output = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const childProps = child.props as Record<string, any>;
    const style = childProps.style || rest.style ? { ...childProps.style, ...rest.style } : undefined;
    const childOnClick = childProps.onClick;
    return cloneElement(child as ReactElement<any>, {
      ...rest,
      ...linkProps,
      ...(style ? { style } : {}),
      onClick:
        page || childOnClick || rest.onClick
          ? (event: React.MouseEvent) => {
              childOnClick?.(event);
              rest.onClick?.(event);
              onClick(event);
            }
          : undefined,
      ...(child === onlyChild ? { ref } : {}),
    });
  });

  // A link inside another link: render span "links" that navigate on click / Enter. One without a
  // target (no link set, or one that doesn't resolve) is a span too, as on the published site: an
  // <a> inside an <a> is split apart by the HTML parser, and hydration then fails.
  if (outerLink?.nodeId && nodeId) {
    const follow = (event: React.SyntheticEvent, newTab: boolean) => {
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      if (newTab) openHref(target.href, "", "_blank");
      else if (page) navigate();
      else openHref(target.href, rel, opensNewTab ? "_blank" : undefined);
    };
    const handlers = target
      ? {
          onClick: (e: React.MouseEvent) => follow(e, e.metaKey || e.ctrlKey),
          onAuxClick: (e: React.MouseEvent) => follow(e, true),
          onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && follow(e, false),
        }
      : {};
    output = Children.map(output, (child) => replaceAnchor(child, handlers));
  }

  const linkInfo = useMemo(() => ({ scopeId, nodeId }), [scopeId, nodeId]);
  return <OuterLinkContext.Provider value={linkInfo}>{output}</OuterLinkContext.Provider>;
});

/** The original runtime Link: decorates its child element with href / target / rel / client-side navigation. */
export const Link = forwardRef<unknown, LinkProps>(function Link(props, ref) {
  const inner = <LinkInner {...props} ref={ref} />;
  // CMS item links whose slug must be looked up suspend; keep the rest of the page rendering.
  return hasUnresolvedSlugs(props.href) ? <Suspense fallback={null}>{inner}</Suspense> : inner;
});

// --- ResolveLinks -----------------------------------------------------------------

type ResolvableLink = Href | { href: Href; implicitPathVariables?: PathVariables; refKey?: unknown };

interface ResolveLinksProps {
  links: ResolvableLink[];
  children: (resolved: Array<string | undefined>) => ReactNode;
  ref?: Ref<unknown>;
  [prop: string]: any;
}

function ResolveLinksInner({ links, children, ref, ...rest }: ResolveLinksProps) {
  const router = useRouter();
  const { activeLocale } = useLocaleInfo();
  const locale = activeLocale as Locale | null;
  const resolved = links.map((entry) => {
    if (!entry) return undefined;
    const { href, implicitPathVariables, refKey } =
      typeof entry === "string" || isPageLink(entry) ? { href: entry, implicitPathVariables: undefined, refKey: undefined } : entry;
    const slugs = isPageLink(href) && hasUnresolvedSlugs(href) ? readSlugs(href, locale, (p) => use(p)) : undefined;
    return resolveLinkInternal(href, router, implicitPathVariables, refKey, locale, slugs);
  });
  const output = children(resolved);
  if (!ref && Object.keys(rest).length === 0) return <>{output}</>;
  // Extra props / ref given to ResolveLinks pass through to the rendered element(s), like the original runtime.
  return <>{Children.map(output, (child) => (isValidElement(child) ? cloneElement(child as ReactElement<any>, ref ? { ...rest, ref } : rest) : child))}</>;
}

/** Render prop resolving a list of links to absolute hrefs (repeaters, components with link props). */
export function ResolveLinks(props: ResolveLinksProps) {
  const inner = <ResolveLinksInner {...props} />;
  const suspends = props.links.some((link) => hasUnresolvedSlugs(link) || hasUnresolvedSlugs((link as any)?.href));
  return suspends ? <Suspense fallback={null}>{inner}</Suspense> : inner;
}
