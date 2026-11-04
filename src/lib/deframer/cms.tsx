"use client";

// CMS: queries over collections (with Suspense, so CMS content is part
// of the server render), pagination, detail-page lookups, plus the small
// scheduling / data helpers generated modules import from the runtime.
// The engine itself lives in ./cms/*.

import {
  forwardRef,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ComponentType,
  type ForwardedRef,
} from "react";
import { ServerInsertedHTMLContext, useHostNavigation, type HostNavigation } from "./host";
import { DataObserverContext, LocaleInfoContext } from "./contexts";
import { useStringQueryParam } from "./route";
import { QueryEngine, type Query, type QueryLocale } from "./cms/engine";
import { getQueryCacheKey, handOverQuery, QueryCache } from "./cms/query-cache";
import { LazyValue } from "./cms/lazy-value";
import { yieldToMain } from "./cms/scheduling";

export { QueryEngine, JsonCollection } from "./cms/engine";
export { slugUtils, enumDisplayNames, propertyControlsOf } from "./cms/collection-helpers";
export type { EnumField, ControlledField, CollectionControl } from "./cms/collection-helpers";
export { renderRichText } from "./cms/rich-text";
export type { RichTextOptions } from "./cms/rich-text";
export type { RecordSource, CollectionItem, FieldDefinition, RecordIndex, Query } from "./cms/engine";
export { QueryCache } from "./cms/query-cache";
export { LazyValue } from "./cms/lazy-value";
export { yieldToMain, runWithYield, runTasksWithYield } from "./cms/scheduling";
export { DataObserverContext };

export const queryCache = new QueryCache(new QueryEngine());

function useActiveLocale(): QueryLocale | null {
  return (useContext(LocaleInfoContext).activeLocale as QueryLocale | null) ?? null;
}

// ---------------------------------------------------------------------------
// Queries

/** Rows of a CMS query. Suspends until loaded; server results are handed to the client. */
export function useQueryData(query: Query): any[] {
  const locale = useActiveLocale();
  const insertHTML = useContext(ServerInsertedHTMLContext);
  const key = getQueryCacheKey(query, locale);
  const rows = queryCache.getByKey(key, query, locale).use();
  if (insertHTML) handOverQuery(insertHTML, key, queryCache.getRaw(key));
  return rows;
}

/** Number of rows a query returns (the original runtime selects no fields for counting). */
export function useQueryCount(query: Query): number {
  return useQueryData({ ...query, select: [] }).length;
}

export function usePreloadQuery() {
  const locale = useActiveLocale();
  return useCallback((query: Query) => queryCache.get(query, locale).readMaybeAsync(), [locale]);
}

/**
 * WHERE clause that selects the record a CMS detail page shows: every path
 * variable (e.g. `{ slug: "my-post" }`) must equal its field. Without path
 * variables nothing matches.
 */
export function getWhereExpressionFromPathVariables(pathVariables: Record<string, unknown> | undefined, collection?: string): any {
  const comparisons = Object.entries(pathVariables ?? {})
    .filter(([, value]) => value !== undefined && (typeof value !== "object" || value === null))
    .map(([name, value]) => ({
      type: "BinaryOperation",
      operator: "==",
      left: { type: "TypeCast", value: { type: "Identifier", name, collection }, dataType: "STRING" },
      right: { type: "LiteralValue", value: String(value) },
    }));
  if (comparisons.length === 0) return { type: "LiteralValue", value: false };
  return comparisons.reduce((left, right) => ({ type: "BinaryOperation", operator: "and", left, right }) as any);
}

/**
 * Thrown by detail pages when no record matches the URL. The digest is the one
 * Next uses for notFound(), so the app's not-found page renders with a 404.
 */
export class NotFoundError extends Error {
  readonly digest = "NEXT_HTTP_ERROR_FALLBACK;404";
}

// ---------------------------------------------------------------------------
// Pagination

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

function storedPage(hash: string): number | undefined {
  const page = (globalThis as any).history?.state?.paginationInfo?.[hash]?.currentPage;
  return typeof page === "number" && page > 1 ? page : undefined;
}

/** Remember how many pages were loaded so going back restores the list. */
function storePage(hash: string, info: PaginationInfo, replace: HostNavigation["replaceHistoryState"]) {
  try {
    void Promise.resolve(replace((state) => ({ ...state, paginationInfo: { ...state.paginationInfo, [hash]: info } }))).catch(() => {});
  } catch {
    // History may be unavailable (sandboxed iframes); pagination still works.
  }
}

function useLoadMorePagination(totalSize: number, pageSize: number, hash: string) {
  const { replaceHistoryState } = useHostNavigation();
  const [isLoading, startLoadingTransition] = useTransition();
  const totalPages = Math.ceil(totalSize / pageSize);
  // Page 1 on the server and during hydration; a stored page is restored after mount.
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;

  useEffect(() => {
    const page = storedPage(hash);
    if (page) startTransition(() => setCurrentPage(Math.min(page, Math.max(totalPages, 1))));
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginationInfo = useMemo<PaginationInfo>(() => ({ currentPage, totalPages, isLoading }), [currentPage, totalPages, isLoading]);

  useEffect(() => storePage(hash, paginationInfo, replaceHistoryState), [hash, paginationInfo, replaceHistoryState]);

  const loadMore = useCallback(async () => {
    if (currentPageRef.current >= totalPages) return;
    await yieldToMain({ priority: "user-blocking", continueAfter: "paint" });
    if (currentPageRef.current >= totalPages) return;
    // A transition keeps the current items on screen while the next page loads.
    startLoadingTransition(() => {
      setCurrentPage((page) => {
        const next = Math.min(page + 1, totalPages);
        currentPageRef.current = next;
        return next;
      });
    });
  }, [totalPages]);

  return { paginationInfo, loadMore };
}

/** "Load more" pagination for a collection list: grows the query's limit page by page. */
export function useLoadMorePaginatedQuery(query: Query, pageSize: number, hash: string) {
  const count = useQueryCount(query);
  const { paginationInfo, loadMore } = useLoadMorePagination(count, pageSize, hash);
  const paginatedQuery = useMemo<Query>(() => {
    let limit = pageSize * paginationInfo.currentPage;
    if (query.limit) {
      if (query.limit.type !== "LiteralValue" || typeof query.limit.value !== "number") throw new Error("Unexpected type for query limit");
      limit = Math.min(limit, query.limit.value);
    }
    return { ...query, limit: { type: "LiteralValue", value: limit } };
  }, [query, pageSize, paginationInfo]);
  return { paginatedQuery, paginationInfo, loadMore };
}

function assignRef<T>(ref: ForwardedRef<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

/**
 * A callback ref that calls loadMore while its element is within `rootMargin` of the viewport.
 * The element isn't kept in state: React detaches refs when it hides a subtree (a suspending
 * boundary), and a state update there renders the hidden subtree again, over and over.
 */
function useInfiniteScroll(loadMore: () => void, info: PaginationInfo | undefined, rootMargin: string) {
  const visible = useRef(false);
  const observed = useRef<{ element: Element; rootBounds: DOMRectReadOnly | null } | undefined>(undefined);
  const enabled = !!info && !!loadMore && info.currentPage < info.totalPages;
  const latest = useRef({ loadMore, enabled });
  useEffect(() => {
    latest.current = { loadMore, enabled };
  }, [loadMore, enabled]);

  const visibleNow = useCallback(() => {
    const current = observed.current;
    if (!visible.current || !current?.element.isConnected || !current.element.getClientRects().length) return false;
    // A growing page can move the trigger before another record is delivered.
    // Root and target coordinates differ inside frames. Preserve the native
    // decision there, for null bounds, and if the viewport no longer matches
    // this root rectangle with one margin value in pixels (including after a resize).
    const view = current.element.ownerDocument.defaultView;
    if (!current.rootBounds || !view || view.top !== view) return true;
    const pixelMargin = /^(-?\d+(?:\.\d+)?)px$/.exec(rootMargin);
    if (!pixelMargin) return true;
    const margin = Number(pixelMargin[1]);
    if (current.rootBounds.top !== -margin || current.rootBounds.bottom !== current.element.ownerDocument.documentElement.clientHeight + margin) return true;
    const rect = current.element.getBoundingClientRect(), root = current.rootBounds;
    return rect.bottom >= root.top && rect.top <= root.bottom;
  }, [rootMargin]);

  // After a page renders (or loading becomes possible), keep loading while the trigger is in view.
  useEffect(() => {
    if (!visibleNow() || !enabled) return;
    const frame = requestAnimationFrame(() => visibleNow() && loadMore());
    return () => cancelAnimationFrame(frame);
  }, [info?.currentPage, enabled, loadMore, visibleNow]);

  return useCallback(
    (element: Element): (() => void) | undefined => {
      if (typeof IntersectionObserver === "undefined") return undefined;
      const owner = { element, rootBounds: null as DOMRectReadOnly | null };
      observed.current = owner;
      visible.current = false;
      const observer = new IntersectionObserver(
        (entries) => {
          if (observed.current !== owner) return;
          // One callback can contain several records for this same element.
          let entry: IntersectionObserverEntry | undefined;
          for (let index = entries.length - 1; index >= 0; index--) {
            if (entries[index].target === element) { entry = entries[index]; break; }
          }
          owner.rootBounds = entry?.rootBounds ?? null;
          visible.current = !!entry?.isIntersecting;
          if (visibleNow() && latest.current.enabled) latest.current.loadMore();
        },
        { rootMargin },
      );
      observer.observe(element);
      return () => {
        observer.disconnect();
        if (observed.current === owner) {
          observed.current = undefined;
          visible.current = false;
        }
      };
    },
    [rootMargin, visibleNow],
  );
}

/** Wraps the element at the end of a paginated list so scrolling near it loads the next page. */
export function withInfiniteScroll<P extends object>(Component: ComponentType<P>) {
  return forwardRef<Element, P & { __paginationInfo?: PaginationInfo; __loadMore?: () => void }>(function InfiniteScroll(
    { __paginationInfo, __loadMore, ...props },
    ref,
  ) {
    const observe = useInfiniteScroll(__loadMore as () => void, __paginationInfo, "500px");
    // Detached by a call with null (React 18 has no ref cleanup functions).
    const stop = useRef<(() => void) | undefined>(undefined);
    const setRef = useCallback(
      (node: Element | null) => {
        stop.current?.();
        stop.current = node ? observe(node) : undefined;
        assignRef(ref, node);
      },
      [ref, observe],
    );
    const Inner = Component as ComponentType<any>;
    return <Inner {...props} ref={setRef} />;
  });
}

// ---------------------------------------------------------------------------
// Collection references in query parameters (?category=<slug>)

interface CollectionUtils {
  getSlugByRecordId(id: string, locale?: QueryLocale | null): Promise<string | undefined> | string | undefined;
  getRecordIdBySlug(slug: string, locale?: QueryLocale | null): Promise<string | undefined> | string | undefined;
}
type UtilsLoader = CollectionUtils | (() => CollectionUtils | Promise<CollectionUtils>);

const collectionUtils = new Map<string, UtilsLoader>();
const utilsCalls = new Map<string, LazyValue<string | undefined>>();

/** Makes a collection's slug ⇄ id utils available by collection name (`journal` for src/cms/journal.ts). */
export function registerCollectionUtils(collectionId: string, utils: UtilsLoader): void {
  collectionUtils.set(collectionId, utils);
}

function callCollectionUtils(collectionId: string, method: keyof CollectionUtils, arg: string, locale: QueryLocale | null): LazyValue<string | undefined> {
  const key = `${collectionId}\0${method}\0${arg}\0${locale?.id ?? "default"}`;
  let call = utilsCalls.get(key);
  if (!call) {
    call = new LazyValue(async () => {
      const loader = collectionUtils.get(collectionId);
      if (!loader) return undefined;
      const utils = typeof loader === "function" ? await loader() : loader;
      try {
        return (await utils[method](arg, locale)) ?? undefined;
      } catch {
        return undefined;
      }
    });
    utilsCalls.set(key, call);
  }
  return call;
}

/** A collection-reference query parameter: the URL holds the slug, the page sees the record id. */
export function useCollectionReferenceQueryParam({
  collectionId,
  initialValue,
  parameterName,
  optional,
}: {
  collectionId: string;
  initialValue?: string;
  parameterName: string;
  optional?: boolean;
}) {
  const locale = useActiveLocale();
  const initialRef = useRef(optional ? undefined : initialValue);
  const [slug, setSlug] = (useStringQueryParam as any)({ initialValue: undefined, parameterName, optional: true }) as [
    string | undefined,
    (value: string | undefined) => unknown,
  ];
  const id = typeof slug === "string" ? callCollectionUtils(collectionId, "getRecordIdBySlug", slug, locale).use() : initialRef.current;
  const setId = useCallback(
    async (newId: string | undefined) => {
      if (newId === undefined) return setSlug(undefined);
      if (typeof newId !== "string") return;
      const newSlug = await callCollectionUtils(collectionId, "getSlugByRecordId", newId, locale).readMaybeAsync();
      if (typeof newSlug === "string") await setSlug(newSlug);
    },
    [collectionId, locale, setSlug],
  );
  return [id, setId] as const;
}

// ---------------------------------------------------------------------------
// Lazy components

/** React.lazy with `preload()`: renders synchronously once the module has loaded. */
export function lazy<P = any>(factory: () => Promise<any>, exportName = "default") {
  let Loaded: ComponentType<P> | undefined;
  let failure: unknown;
  let loading: Promise<ComponentType<P> | undefined> | undefined;
  const load = () => {
    if (Loaded) return Promise.resolve(Loaded);
    loading ??= factory().then(
      (module) => {
        if (!(exportName in module)) throw new Error(`Module does not contain export '${exportName}'`);
        Loaded = module[exportName];
        return Loaded;
      },
      (error) => {
        failure = error;
        return undefined;
      },
    );
    return loading;
  };
  const LazyComponent = forwardRef<unknown, P>(function LazyWithPreload(props, ref) {
    if (failure) throw failure;
    if (!Loaded) throw load();
    const Component = Loaded as ComponentType<any>;
    return <Component ref={ref} {...props} />;
  });
  return Object.assign(LazyComponent, {
    preload: load,
    getStatus: () => ({ hasLoaded: Loaded !== undefined }),
  });
}

// ---------------------------------------------------------------------------
// Analytics & legacy data stores

/** The original runtime's custom-event tracking. Converted sites have no analytics: no-op. */
export function useTracking(): (trackingId: string) => void {
  return useCallback(() => {}, []);
}

// Legacy Data() stores and useObserveData live in ./data.
