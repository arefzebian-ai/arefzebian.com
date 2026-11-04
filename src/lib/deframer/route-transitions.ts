"use client";

// Client navigations between pages: page transitions and arrival scrolling.
//
// The original runtime runs each page change inside a view transition when the site has a page
// effect for it (see page-effects.ts): the old page is frozen, the router swaps
// in the new page, and once that page has rendered the browser animates between
// the two. Next.js performs the actual swap here, so a navigation is:
//
//   1. register the "arrival" (what to do once the new page is in, e.g. scroll),
//   2. start the view transition whose update callback calls router.push,
//   3. the new PageRoute runs the arrival (layout effect) and reports that it
//      rendered (effect), which lets the browser capture the new page and animate.
//
// Back/forward does the same: the popstate event is held until the old page has
// been captured, then replayed to Next's router from inside the transition.
//
// Where each page is a document of its own (Astro), the browser runs the transition between
// the two documents instead (see "Another document" below).

import { useEffect, useLayoutEffect, useRef } from "react";
import { pageEffectFor, pageTransitionCSS, runPageTransition, supportsViewTransitions, type SitePageEffects } from "./page-effects";

interface Arrival {
  /** Runs before the new page's first paint (scrolling). */
  onArrive?: () => void | Promise<void>;
  /** A destination can commit while its anchor is still in a hidden Suspense tree. */
  scrolling?: void | Promise<void>;
  /** Resolves the view transition's update callback. */
  rendered?: () => void;
}

let pendingArrival: Arrival | undefined;
/** Whether each page is a document of its own (transitionBetweenDocuments). */
let betweenDocuments = false;

/** Upper bound for waiting on a page that never shows up (failed navigation). */
const arrivalTimeout = 10_000;
let scrollTicket = 0;

/** Identity of a rendered page: route, filled path and locale. */
export function pageKeyOf(routeId: string, path: string, locale: string | undefined) {
  return `${locale ?? ""}|${routeId}|${path}`;
}

/**
 * Scroll to a section on arrival using the published runtime's native operation.
 * Transforms, sticky positioning, scroll margins and nested scrolling containers
 * participate in that geometry, including an appear effect's current offset.
 */
export function scrollToTarget(elementId: string | undefined, smooth: boolean | undefined, waitForLayout = false): void | Promise<void> {
  const ticket = ++scrollTicket;
  const element = elementId ? document.getElementById(elementId) : null;
  if (!element) {
    window.scrollTo(0, 0);
    if (!elementId || !waitForLayout) return;
  }
  const scroll = (target: HTMLElement) => {
    target.scrollIntoView(smooth ? { behavior: "smooth", block: "start", inline: "nearest" } : undefined);
  };
  if (element && (!waitForLayout || element.getClientRects().length)) return scroll(element);
  // React can acknowledge a route while font/Suspense content is hidden or has
  // not mounted yet. Never measure a zero-sized tree or force it visible. Wait for real layout,
  // and abandon this arrival if another navigation/scroll supersedes it.
  const href = window.location.href;
  return new Promise<void>((resolve) => {
    let frame = 0;
    const finish = () => { cancelAnimationFrame(frame); clearTimeout(timer); resolve(); };
    const timer = setTimeout(finish, arrivalTimeout);
    const check = () => {
      if (ticket !== scrollTicket || window.location.href !== href) return finish();
      const target = document.getElementById(elementId!);
      if (target?.getClientRects().length) { scroll(target); return finish(); }
      frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);
  });
}

/**
 * Navigate from one page to another: `swap` performs the router update. Runs inside
 * a view transition when the site has a page effect for this pair of routes.
 */
export function navigateWithTransition(
  effects: SitePageEffects | undefined,
  fromRouteId: string,
  toRouteId: string,
  onArrive: (() => void | Promise<void>) | undefined,
  swap: () => void,
) {
  // Another document: the host's router runs the transition (documentTransitionCSS). The page then
  // scrolls once it has rendered, on the next frame, as on other hosts: the router's own scroll runs in
  // the swap, where a smooth-scroll library (Lenis) still holds the position it had (sunhung.net).
  if (betweenDocuments) {
    ++scrollTicket;
    pendingArrival?.rendered?.();
    pendingArrival = onArrive ? { onArrive: () => void requestAnimationFrame(() => void onArrive()) } : undefined;
    swap();
    return undefined;
  }
  ++scrollTicket;
  pendingArrival?.rendered?.(); // an unfinished navigation is superseded
  const arrival: Arrival = { onArrive };
  pendingArrival = arrival;
  const effect = pageEffectFor(effects, fromRouteId, toRouteId);
  if (!effect || !supportsViewTransitions()) {
    swap();
    return undefined;
  }
  return runPageTransition(
    effect,
    () =>
      new Promise<void>((resolve) => {
        arrival.rendered = resolve;
        setTimeout(resolve, arrivalTimeout);
        swap();
      }),
  );
}

// --- The page being shown -------------------------------------------------------------

/** Target page of a history entry, from its URL (undefined when it isn't a known page). */
export type ResolveHistoryTarget = (url: URL) => { routeId: string; pageKey: string } | undefined;

interface ShownPage {
  effects: SitePageEffects | undefined;
  routeId: string;
  pageKey: string;
  resolveTarget: ResolveHistoryTarget;
}

/** Latest props of the PageRoute on screen (a ref, so it is always current). */
let shownPage: { current: ShownPage } | undefined;

/**
 * Called by PageRoute for the page it renders. The first page that commits after
 * a navigation started is its destination (the requested page, or whatever Next
 * rendered instead, e.g. a 404), so it completes the pending arrival.
 */
export function useShownPage(page: ShownPage) {
  const arrived = useRef<Arrival | undefined>(undefined);
  const latest = useRef(page);
  latest.current = page;
  useLayoutEffect(() => {
    shownPage = latest;
    const arrival = pendingArrival;
    if (!arrival) return;
    pendingArrival = undefined;
    arrival.scrolling = arrival.onArrive?.();
    arrived.current = arrival;
  }, [page.pageKey]);
  // The page has rendered: let the view transition capture it.
  useEffect(() => {
    const arrival = arrived.current;
    if (arrival?.scrolling) void arrival.scrolling.then(() => arrival.rendered?.());
    else arrival?.rendered?.();
    arrived.current = undefined;
  }, [page.pageKey]);
  useEffect(
    () => () => {
      if (shownPage === latest) shownPage = undefined;
    },
    [],
  );
}

// --- Back / forward ----------------------------------------------------------------------

let replayingPopState = false;
/** Increments per held popstate: only the latest one is replayed (rapid back/back). */
let heldPopStates = 0;
/** Scroll position of the page on screen, as of the last scroll event. */
let lastScrollY = 0;
/**
 * Scroll position per history entry (Navigation API entry keys). The browser's own
 * restoration runs while the old page is still shown and gets clamped to its
 * height; a held back/forward restores the remembered position instead.
 */
const scrollByEntry = new Map<string, number>();
let holdingTraversal = false;

function currentEntryKey(): string | undefined {
  return (window as any).navigation?.currentEntry?.key;
}

function onWindowScroll() {
  lastScrollY = window.scrollY;
  const key = holdingTraversal ? undefined : currentEntryKey();
  if (key) scrollByEntry.set(key, lastScrollY);
}

/**
 * Back/forward to another page with a page effect: hold the popstate event (Next's
 * router must not swap the page before the old one is captured) and replay it
 * from inside the view transition.
 */
function onPopState(event: PopStateEvent) {
  const page = shownPage?.current;
  if (replayingPopState || betweenDocuments || !page || !event.state || !supportsViewTransitions()) return;
  const target = page.resolveTarget(new URL(window.location.href));
  // Only page changes animate; entries of the same page (section hashes) just scroll.
  if (!target || target.pageKey === page.pageKey || !pageEffectFor(page.effects, page.routeId, target.routeId)) return;
  event.stopImmediatePropagation();

  const state = event.state;
  const ticket = ++heldPopStates;
  // The browser restores the destination's scroll position right after this event,
  // while the old page is still shown. Keep the old page where it was for the
  // snapshot, and apply the restored position once the new page is in.
  const scrolledFrom = lastScrollY;
  const remembered = scrollByEntry.get(currentEntryKey() ?? "");
  let restored: number | undefined;
  holdingTraversal = true;
  const release = () => (holdingTraversal = false);
  setTimeout(release, arrivalTimeout);
  requestAnimationFrame(() => {
    restored = window.scrollY;
    if (restored !== scrolledFrom) window.scrollTo(window.scrollX, scrolledFrom);
  });

  navigateWithTransition(
    page.effects,
    page.routeId,
    target.routeId,
    () => {
      release();
      const y = remembered ?? restored;
      if (y !== undefined) window.scrollTo(window.scrollX, y);
    },
    () => {
      if (ticket !== heldPopStates) return;
      replayingPopState = true;
      try {
        window.dispatchEvent(new PopStateEvent("popstate", { state }));
      } finally {
        replayingPopState = false;
      }
    },
  );
}

// --- Another document -----------------------------------------------------------------
//
// A host whose router swaps the next page's document in (Astro's) runs the view transition itself: it
// asks for the page effect from the page shown to the one its URL names, as a stylesheet for that
// transition (none: no transition), and the kit's own navigations and history traversals leave the
// transition and the scroll position to it.

/** The page effect's stylesheet for the view transition to `url`'s page (undefined: none, or no known page). */
export function documentTransitionCSS(url: URL): string | undefined {
  const page = shownPage?.current;
  const target = page?.resolveTarget(url);
  const effect = page && target && target.pageKey !== page.pageKey ? pageEffectFor(page.effects, page.routeId, target.routeId) : undefined;
  return effect ? pageTransitionCSS(effect) : undefined;
}

/** Hosts whose navigations swap in another document (navigatesDocuments) call this once, as the router loads. */
export function transitionBetweenDocuments() {
  betweenDocuments = true;
}

// Listeners on window run in registration order. Registering when this module is
// first evaluated (during hydration) puts ours ahead of Next's router, which adds
// its popstate listener in an effect after hydration.
if (typeof window !== "undefined") {
  window.addEventListener("popstate", onPopState);
  window.addEventListener("scroll", onWindowScroll, { passive: true });
}
