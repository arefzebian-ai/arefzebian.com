// QueryCache: one LazyValue per (query, locale), shared by every component
// that asks for the same data.
//
// Server → client handover: on the server, raw results of every query a page
// reads are written into the HTML stream (through Next's server-inserted-HTML
// hook) as `self.__cmsQueryRows[<hash>] = rows`. In the browser the cache resolves
// those rows synchronously, so hydration renders the same items as the server
// without waiting for the CMS chunk network requests.

import { createElement, type ReactNode } from "react";
import { getCollectionKey, QueryEngine, RANDOM_ID_PREFIX, type Query, type QueryLocale, type RawRow } from "./engine";
import { LazyValue } from "./lazy-value";

const HANDOVER_GLOBAL = "__cmsQueryRows";
const isServer = typeof window === "undefined";

/** Cache key: the query with collections replaced by their ids, plus the locale. */
export function getQueryCacheKey(query: Query, locale?: QueryLocale | null): string {
  const json = JSON.stringify(query, function (this: any, key, value) {
    if (key === "data" && this?.type === "Collection" && value && typeof value === "object") return getCollectionKey(value);
    return value;
  });
  return json + (locale?.id ?? "default");
}

/** Short stable hash (cyrb53) so handover keys stay small. */
function hashKey(key: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < key.length; i++) {
    const ch = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

function takeHandover(id: string): RawRow[] | undefined {
  const store = (globalThis as any)[HANDOVER_GLOBAL];
  if (!store || !(id in store)) return undefined;
  const rows = store[id];
  delete store[id];
  return rows;
}

export class QueryCache {
  private readonly cache = new Map<string, LazyValue<any[]>>();
  /** Server only: raw rows per cache key, for the handover. */
  private readonly rawRows = new Map<string, RawRow[]>();

  constructor(
    readonly queryEngine: QueryEngine = new QueryEngine(),
    readonly maxSize = Infinity,
  ) {}

  /** `priority` (the original runtime's loading priority, which generated loaders pass) does not change what is read. */
  get(query: Query, locale?: QueryLocale | null, _priority?: unknown): LazyValue<any[]> {
    return this.getByKey(getQueryCacheKey(query, locale), query, locale);
  }

  /** Raw rows of a settled server-side query (undefined in the browser). */
  getRaw(key: string): RawRow[] | undefined {
    return this.rawRows.get(key);
  }

  getByKey(key: string, query: Query, locale?: QueryLocale | null): LazyValue<any[]> {
    const existing = this.cache.get(key);
    if (existing) {
      // Most recently used entries move to the end (pruned last).
      this.cache.delete(key);
      this.cache.set(key, existing);
      return existing;
    }
    const value = new LazyValue<any[]>(() => this.resolve(key, query, locale));
    this.cache.set(key, value);
    this.prune();
    return value;
  }

  private resolve(key: string, query: Query, locale?: QueryLocale | null): any[] | Promise<any[]> {
    const shareable = !key.includes(RANDOM_ID_PREFIX);
    if (isServer && shareable) {
      return this.queryEngine.queryRaw(query, locale).then((raw) => {
        this.rawRows.set(key, raw);
        return this.queryEngine.resolveRaw(raw, query, locale);
      });
    }
    if (!shareable) return this.queryEngine.query(query, locale);
    const id = hashKey(key);
    const handedOver = takeHandover(id);
    if (handedOver) return this.queryEngine.resolveRaw(handedOver, query, locale);
    // While the HTML is still streaming (e.g. a loader preloading data for a
    // Suspense boundary that has not arrived yet) the rows may still be on
    // their way: wait for the document before going to the network.
    if (document.readyState === "loading") {
      return new Promise<void>((resolve) => document.addEventListener("DOMContentLoaded", () => resolve(), { once: true })).then(() => {
        const late = takeHandover(id);
        return late ? this.queryEngine.resolveRaw(late, query, locale) : this.queryEngine.query(query, locale);
      });
    }
    return this.queryEngine.query(query, locale);
  }

  private prune() {
    if (this.cache.size <= this.maxSize) return;
    for (const [key, value] of this.cache) {
      if (this.cache.size <= this.maxSize) break;
      if (value.state === "pending") continue;
      this.cache.delete(key);
      this.rawRows.delete(key);
    }
  }
}

// ---------------------------------------------------------------------------
// Server side of the handover. `insertHTML` is the per-request callback
// registrar from Next's ServerInsertedHTMLContext, so it doubles as the key for
// per-request bookkeeping (which results were already written).

type InsertHTML = (callback: () => ReactNode) => void;
interface RequestHandover {
  sent: Set<string>;
  pending: Map<string, RawRow[]>;
  flushes: number;
}
const requests = new WeakMap<InsertHTML, RequestHandover>();

export function handOverQuery(insertHTML: InsertHTML | null | undefined, key: string, raw: RawRow[] | undefined): void {
  if (!insertHTML || !raw || key.includes(RANDOM_ID_PREFIX)) return;
  let request = requests.get(insertHTML);
  if (!request) {
    const state: RequestHandover = { sent: new Set(), pending: new Map(), flushes: 0 };
    request = state;
    requests.set(insertHTML, state);
    insertHTML(() => flushHandover(state));
  }
  const id = hashKey(key);
  if (!request.sent.has(id)) request.pending.set(id, raw);
}

function flushHandover(request: RequestHandover): ReactNode {
  if (request.pending.size === 0) return null;
  const payload = Object.fromEntries(request.pending);
  for (const id of request.pending.keys()) request.sent.add(id);
  request.pending.clear();
  return createElement("script", {
    key: `df-cms-${request.flushes++}`,
    dangerouslySetInnerHTML: { __html: `Object.assign(self.${HANDOVER_GLOBAL}||(self.${HANDOVER_GLOBAL}={}),${scriptSafeJSON(payload)})` },
  });
}

/**
 * JSON that can sit inside <script>: escapes "<" and the JS line separators.
 * (Character codes, not regex literals: minifiers turn " " in a regex
 * into the raw character, which breaks the bundle.)
 */
function scriptSafeJSON(value: unknown): string {
  let out = "";
  for (const char of JSON.stringify(value)) {
    const code = char.charCodeAt(0);
    out += code === 0x3c || code === 0x2028 || code === 0x2029 ? "\\u" + code.toString(16).padStart(4, "0") : char;
  }
  return out;
}
