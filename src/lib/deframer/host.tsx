"use client";

// What the kit needs from the framework the project runs on (here Next.js's App Router). The
// converter replaces this file for other hosts (kit/hosts/<host>/host.tsx); everything else in the
// kit is the same on every host.
//
// - Server-inserted HTML: `ServerInsertedHTMLContext` is a value unique to the request being
//   rendered (the kit keys its per-request state by it; null in the browser), and
//   `useServerInsertedHTML(callback)` streams what the callback returns into the HTML, in <head>
//   for what the shell renders, before later chunks for content that streams in after.
// - Navigation: `useHostNavigation()` pushes a URL (without scrolling: the kit scrolls itself) and
//   prefetches a path. Query and history-state replacements retain the viewport and current entry.
// - `useRoutedPath()`: the URL path of the page being rendered, and the route segments below the
//   root layout (a rewritten request's path differs between server and browser; its segments
//   don't). Hosts that serve every page at its own URL give no segments.
// - `HostContexts`: the framework's own contexts at a point of the app tree, to provide again in a
//   separate React root (the kit's cursor layer) with `<HostContextsProvider>`.
// - `navigatesDocuments`: whether a navigation loads another document (Astro's pages) rather than
//   rendering the next page in this one (page transitions are then the browser's, between the two
//   documents: route-transitions.ts).

import { useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter, useSelectedLayoutSegments } from "next/navigation";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PathnameContext, PathParamsContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export { ServerInsertedHTMLContext, useServerInsertedHTML } from "next/navigation";

export const navigatesDocuments = false;

export interface HostNavigation {
  push(url: string): void;
  prefetch(path: string): void;
  replaceQuery(url: string): void | Promise<void>;
  replaceHistoryState(update: (state: Record<string, any>) => Record<string, any>): void | Promise<void>;
  /** A new entry for a section of this page (the kit scrolls to it itself). */
  pushSection(url: string): void;
}

export function useHostNavigation(): HostNavigation {
  const router = useRouter();
  return useMemo(() => ({
    push: (url) => router.push(url, { scroll: false }),
    prefetch: (path) => router.prefetch(path),
    // Next observes native history updates without a route navigation. Keep its
    // bookkeeping and any application-owned state on the current entry.
    replaceQuery: (url) => window.history.replaceState(window.history.state, "", url),
    replaceHistoryState: (update) => window.history.replaceState(update(window.history.state ?? {}), ""),
    pushSection: (url) => window.history.pushState(null, "", url),
  }), [router]);
}

export function useRoutedPath(): { pathname: string; segments: string[] | undefined } {
  const pathname = usePathname() ?? "/";
  const segments = useSelectedLayoutSegments();
  return { pathname, segments };
}

export interface HostContexts {
  router: React.ContextType<typeof AppRouterContext>;
  pathname: React.ContextType<typeof PathnameContext>;
  searchParams: React.ContextType<typeof SearchParamsContext>;
  params: React.ContextType<typeof PathParamsContext>;
}

export function useHostContexts(): HostContexts {
  const router = useContext(AppRouterContext);
  const pathname = useContext(PathnameContext);
  const searchParams = useContext(SearchParamsContext);
  const params = useContext(PathParamsContext);
  return useMemo(() => ({ router, pathname, searchParams, params }), [router, pathname, searchParams, params]);
}

export function HostContextsProvider({ value, children }: { value: HostContexts; children: ReactNode }) {
  return (
    <AppRouterContext.Provider value={value.router}>
      <PathnameContext.Provider value={value.pathname}>
        <SearchParamsContext.Provider value={value.searchParams}>
          <PathParamsContext.Provider value={value.params}>{children}</PathParamsContext.Provider>
        </SearchParamsContext.Provider>
      </PathnameContext.Provider>
    </AppRouterContext.Provider>
  );
}
