"use client";

// URL query-parameter hooks (the original runtime "URL variables" used by CMS filters/search).
//
// Like the original runtime, the server render and the hydration render see no query string;
// the real one is picked up right after hydration. That keeps static pages
// static (no next/navigation useSearchParams + Suspense bail-out). The host
// replaces the query without resetting scroll or discarding history state.

import { useCallback, useDeferredValue, useMemo, useRef, useSyncExternalStore } from "react";
import { useLocaleInfo } from "./route-core";
import { useHostNavigation, type HostNavigation } from "./host";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

/** Tell query-param hooks the URL may have changed (called after client navigations). */
export function notifySearchParamsChanged() {
  listeners.forEach((listener) => listener());
}

const readSearch = () => window.location.search;
const readServerSearch = () => "";

function useSearchString(): string {
  // A new filter can suspend while its CMS records resolve. External-store
  // updates are synchronous; defer the rendered value so the committed page
  // keeps its layout and scroll position until those records are ready.
  return useDeferredValue(useSyncExternalStore(subscribe, readSearch, readServerSearch));
}

/** Rewrite the current query in place, keeping the host's viewport and entry. */
async function replaceSearchParams(replace: (params: URLSearchParams) => URLSearchParams, replaceQuery: HostNavigation["replaceQuery"]) {
  const url = new URL(window.location.href);
  url.search = replace(new URLSearchParams(url.search)).toString();
  if (url.href === window.location.href) return;
  // The destination is always this document. Start treats an absolute href as
  // a document reload even when its origin matches, so pass the local path.
  await replaceQuery(url.pathname + url.search + url.hash);
  notifySearchParamsChanged();
}

interface QueryParamOptions<T> {
  parameterName: string;
  initialValue?: T;
  /** Optional params read as undefined when absent instead of falling back to a default. */
  optional?: boolean;
}

type Setter<T> = (value: T | undefined) => Promise<void>;

/** All values of a repeated parameter (`?tag=a&tag=b`). */
export function useStringArrayQueryParam({ parameterName }: { parameterName: string }): [string[], (values: string[]) => Promise<void>] {
  const name = useRef(parameterName).current;
  const host = useHostNavigation();
  const search = useSearchString();
  const values = useMemo(() => new URLSearchParams(search).getAll(name), [search, name]);
  const setValues = useCallback(
    async (next: string[]) => {
      if (!Array.isArray(next)) return;
      await replaceSearchParams((current) => {
        // Keep the parameter where it was in the query string.
        const result = new URLSearchParams();
        let written = false;
        const writeValues = () => next.forEach((v) => typeof v === "string" && result.append(name, v));
        for (const [key, value] of current) {
          if (key !== name) result.append(key, value);
          else if (!written) {
            written = true;
            writeValues();
          }
        }
        if (!written) writeValues();
        return result;
      }, host.replaceQuery);
    },
    [name, host],
  );
  return [values, setValues];
}

export function useStringQueryParam({ parameterName, initialValue, optional }: QueryParamOptions<string>): [string | undefined, Setter<string>] {
  const initial = useRef(optional ? undefined : typeof initialValue === "string" ? initialValue : "").current;
  const [values, setValues] = useStringArrayQueryParam({ parameterName });
  const value = values.length === 0 ? initial : values[0] ?? "";
  const setValue = useCallback<Setter<string>>(
    async (next) => {
      // Setting the default removes the parameter from the URL.
      if (next === initial) return setValues([]);
      if (typeof next === "string") return setValues([next]);
    },
    [initial, setValues],
  );
  return [value, setValue];
}

/** Booleans are written as `yes` / `no`. */
export function useBooleanQueryParam({ parameterName, initialValue, optional }: QueryParamOptions<boolean>): [boolean | undefined, Setter<boolean>] {
  const initial = useRef(optional ? undefined : initialValue ? "yes" : "no").current;
  const [text, setText] = useStringQueryParam({ parameterName, initialValue: initial, optional });
  const value = text === "yes" ? true : text === "no" ? false : text === undefined ? undefined : initial === "yes" ? true : initial === "no" ? false : undefined;
  const setValue = useCallback<Setter<boolean>>(
    async (next) => {
      if (next === undefined) return setText(undefined);
      if (typeof next === "boolean") return setText(next ? "yes" : "no");
    },
    [setText],
  );
  return [value, setValue];
}

/** Accepts `1.5` and `1,5`; invalid numbers fall back to the default. */
function parseNumber(text: string): number | undefined {
  if (text.includes(",") && text.includes(".")) return undefined;
  const parsed = Number(text.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function useNumberQueryParam({ parameterName, initialValue, optional }: QueryParamOptions<number>): [number | undefined, Setter<number>] {
  const initialNumber = useRef(optional ? undefined : typeof initialValue === "number" ? initialValue : 0).current;
  const [text, setText] = useStringQueryParam({
    parameterName,
    initialValue: initialNumber === undefined ? undefined : String(initialNumber),
    optional,
  });
  const value = text === undefined ? undefined : parseNumber(text) ?? initialNumber;
  const setValue = useCallback<Setter<number>>(
    async (next) => setText(typeof next === "number" && Number.isFinite(next) ? String(next) : undefined),
    [setText],
  );
  return [value, setValue];
}

/** Dates are written as `YYYY-MM-DD` (or `YYYY-MM-DDTHH:mm` with displayTime). */
function completeDate(text: string): string | undefined {
  if (![10, 16, 24].includes(text.length)) return undefined;
  const complete = text + "0000-00-00T00:00:00.000Z".slice(text.length);
  const date = new Date(complete);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(text) ? complete : undefined;
}

export function useDateQueryParam({ parameterName, initialValue, optional, displayTime = false }: QueryParamOptions<string> & { displayTime?: boolean }): [string | undefined, Setter<string>] {
  const serialize = (value: string) => completeDate(value)?.slice(0, displayTime ? 16 : 10);
  const initial = useRef(optional || typeof initialValue !== "string" ? undefined : serialize(initialValue)).current;
  const [text, setText] = useStringQueryParam({ parameterName, initialValue: initial, optional: initial === undefined });
  const value = text === undefined ? undefined : completeDate(text) ?? (initial ? completeDate(initial) : undefined);
  const setValue = useCallback<Setter<string>>(
    async (next) => {
      if (next === undefined) return setText(undefined);
      const serialized = typeof next === "string" ? serialize(next) : undefined;
      if (serialized) return setText(serialized);
    },
    [setText, displayTime],
  );
  return [value, setValue];
}

/** CMS option fields: the URL holds the option's title, the hook returns its id. */
export function useEnumQueryParam({
  parameterName,
  initialValue,
  optional,
  options = [],
  getOptionTitle = () => undefined,
}: QueryParamOptions<string> & { options?: string[]; getOptionTitle?: (id: string, locale?: unknown) => string | undefined }): [string | undefined, Setter<string>] {
  const locale = useLocaleInfo().activeLocale ?? undefined;
  const validInitial = initialValue && options.includes(initialValue) ? initialValue : undefined;
  const initialTitle = validInitial ? getOptionTitle(validInitial, locale) || "" : undefined;
  const [title, setTitle] = useStringQueryParam({ parameterName, initialValue: initialTitle, optional });
  const value = useMemo(() => {
    if (title === undefined) return undefined;
    if (!title) return validInitial;
    const id = options.find((option) => getOptionTitle(option, locale) === title);
    return id ?? (optional ? undefined : validInitial);
  }, [title, options, getOptionTitle, locale, optional, validInitial]);
  const setValue = useCallback<Setter<string>>(
    async (next) => {
      if (next === undefined) return setTitle(undefined);
      const nextTitle = getOptionTitle(next, locale);
      if (nextTitle) return setTitle(nextTitle);
    },
    [setTitle, getOptionTitle, locale],
  );
  return [value, setValue];
}
