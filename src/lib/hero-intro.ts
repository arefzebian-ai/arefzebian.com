"use client";

// The homepage intro clock.
//
// The hero loader (strip -> crossfades -> fullscreen) runs on timers that start when it hydrates, but
// the copy and the CTA used to start from the page's own clock: the appear script in the head plays
// them while the HTML is parsed, long before a slow (development) hydration gets the loader going.
// The copy is white on the loader's white strip, so it finished rising before the image had grown to
// reveal it, and the intro no longer matched the published site, where hydration is quick enough
// for the two clocks to coincide.
//
// Everything that has to follow the loader now waits for it: HeroLoader calls `markHeroIntroStarted`
// when it enters its first running step ("Step 1" / "Mobile Step 1") and the copy, the CTA and
// the scroll hint start their authored delays from that moment.

import { useSyncExternalStore } from "react";

/** Safety net: never leave the intro copy parked if the loader does not run (hidden tab, offscreen). */
const FAILSAFE_MS = 12000;

let started = false;
let waiter: { promise: Promise<void>; resolve: () => void } | undefined;
let failsafe: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function armFailsafe() {
  if (started || failsafe !== undefined || typeof window === "undefined") return;
  // (cleared by markHeroIntroStarted; re-armed by the next subscriber after a reset)
  failsafe = setTimeout(markHeroIntroStarted, FAILSAFE_MS);
}

/** The loader reached its first running step: release everything waiting on the intro. */
export function markHeroIntroStarted() {
  if (started) return;
  started = true;
  if (failsafe !== undefined) clearTimeout(failsafe);
  failsafe = undefined;
  waiter?.resolve();
  emit();
}

/** The loader left the page: the next visit plays the intro from the top. */
export function resetHeroIntro() {
  // An intro that never started has nothing to reset (and its waiters keep their promise: React
  // Strict Mode unmounts and remounts the loader before anything has run).
  if (!started) return;
  started = false;
  waiter = undefined;
  emit();
}

/** Resolves once the intro has started (immediately if it already has). One promise per intro. */
export function whenHeroIntroStarted(): Promise<void> {
  if (started) return Promise.resolve();
  if (!waiter) {
    let resolve!: () => void;
    const promise = new Promise<void>((done) => (resolve = done));
    waiter = { promise, resolve };
  }
  armFailsafe();
  return waiter.promise;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  armFailsafe();
  return () => {
    listeners.delete(listener);
  };
}

/** Whether the hero loader has started its intro. `false` on the server and during hydration. */
export function useHeroIntroStarted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => started,
    () => false,
  );
}
