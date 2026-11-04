"use client";

// Custom code snippets (site and page settings → Custom Code), applied as the original runtime's router
// applies them (the original runtime's `loadSnippets`).
//
// The original runtime keeps each snippet in the document between `<!-- Snippet: <id> -->` and
// `<!-- SnippetEnd: <id> -->` markers, at its placement (head start/end, body start/end):
// - on a page's first load the server has put its snippets in the HTML, where the browser runs
//   their scripts while it parses the page;
// - each client-side navigation (another page, CMS item or locale) applies the snippets of the
//   page it arrives at, the site-wide ones with the page's own, placement by placement in the
//   site's order: one already in the document whose `loadMode` is "once" stays as it is;
//   otherwise its elements are replaced (scripts that ran stay, as the original runtime leaves them) and its
//   HTML inserted again, its scripts running (classic external ones one after another, as the
//   HTML parser runs them);
// - a snippet stays in the document when the visitor leaves its page.
//
// So the root layout renders the site-wide snippets the original runtime runs again (`SiteCustomCode`, "always")
// and each route its page's (`PageCustomCode`) on the server, in wrappers the browser parses in
// place; once hydrated, their nodes move to their placement between markers, out of React's tree,
// where later navigations find them. A navigation (SiteRouter: `useCustomCodeOnNavigation`)
// applies the site's snippets with those of the page it brought.
//
// The published server puts the site's snippets and the page's in one list per placement, in the
// site's order, which may put a page snippet before the site's or between them. On a site whose
// pages have code of their own, each route therefore renders the site's body code too
// (`PageCustomCode` `site`), merged with its page's in that order: scripts run in the published order.
//
// A static site's prerendered pages have their snippets in the document already, between their
// markers at their placements, as the published pages do (`inDocument`): the components render
// nothing and only apply the snippets on navigations. A page the browser renders itself on its first
// load (a static host's 404.html at a URL it wasn't prerendered for, a dev server's empty document)
// leaves the snippets the document ran as they are, and applies those it lacks.

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

export type Placement = "headStart" | "headEnd" | "bodyStart" | "bodyEnd";

export interface Snippet {
  /** The original runtime's snippet id: one copy of a snippet in the document, however many pages it is on. */
  id: string;
  loadMode: "once" | "always";
  placement: Placement;
  /** Undefined: not on this page (code reading a CMS item that renders nothing for it). */
  html: string | undefined;
}

/** The original runtime applies a page's snippets placement by placement, in this order (its snippet table's). */
const PLACEMENTS: Placement[] = ["bodyEnd", "bodyStart", "headEnd", "headStart"];

const subscribeNever = () => () => {};
/** Site-wide snippets applied on every navigation, by id. */
const siteSnippets = new Map<string, Snippet>();
/** The site's order of snippets in the placements where site-wide and page snippets meet. */
let snippetOrder: Partial<Record<Placement, string[]>> = {};
/** What the current navigation applies: the site's snippets (once the router has seen it) and those of the page it brought. */
let navigated = false;
/** A client-side navigation has happened: before it, a snippet in the document is the page's first load's (it ran). */
let leftFirstPage = false;
let pageSnippets: Snippet[] = [];
let scheduled = false;
/** Snippets are applied one after another, navigation by navigation, as the original runtime awaits each. */
let applying: Promise<void> = Promise.resolve();

/** Site-wide custom code the original runtime runs again on every page visit, where the site puts it (root layout). */
export function SiteCustomCode({ snippets, order, inDocument }: { snippets: Snippet[]; order?: Partial<Record<Placement, string[]>>; inDocument?: boolean }) {
  useLayoutEffect(() => {
    for (const snippet of snippets) siteSnippets.set(snippet.id, snippet);
    if (order) snippetOrder = order;
  }, [snippets, order]);
  // A navigation applies them (useCustomCodeOnNavigation), whether or not this layout rendered them.
  // In the document already, those it lacks (a page the browser renders itself: a dev server's) apply on its first load.
  const firstLoad = () => {
    pageSnippets.push(...snippets);
    scheduleSnippets();
  };
  return <CustomCode snippets={snippets} inDocument={inDocument} onNavigation={inDocument ? firstLoad : () => {}} />;
}

/** The site's body custom code, which routes render with their pages' (`PageCustomCode` `site`). */
export interface SiteCode {
  snippets: Snippet[];
  /** The site's order of snippets in each placement, page snippets included. */
  order?: Partial<Record<Placement, string[]>>;
}

/** Placements in document order (head code runs at body start, before body-start code). */
const DOCUMENT_ORDER: Placement[] = ["headStart", "headEnd", "bodyStart", "bodyEnd"];

/**
 * Custom code snippets of the page (in document order), where the page puts them: head and body-start
 * code before it (`at="start"`), body-end code after it (`at="end"`). With `site`, the site's snippets
 * of those placements too, in the site's order.
 */
export function PageCustomCode({ snippets, site, at, inDocument }: { snippets: Snippet[]; site?: SiteCode; at?: "start" | "end"; inDocument?: boolean }) {
  const all = site ? withSiteCode(snippets, site, at === "end" ? ["bodyEnd"] : ["headStart", "headEnd", "bodyStart"]) : snippets;
  // Keyed by its snippets: where routes render their code beside a layout template the next page
  // shares (Start's and React Router's root routes keep it mounted), the next page's code is another
  // element, which applies it, not this one with new props.
  return (
    <CustomCode
      key={all.map((snippet) => `${snippet.id}\n${snippet.html}`).join("\n")}
      snippets={all}
      order={site?.order}
      inDocument={inDocument}
      onNavigation={() => {
        pageSnippets.push(...all);
        scheduleSnippets();
      }}
    />
  );
}

/** The site's snippets of these placements with the page's: by placement, then the site's order (code it doesn't list: the site's first). */
function withSiteCode(page: Snippet[], site: SiteCode, placements: Placement[]): Snippet[] {
  const own = new Set(page.map((snippet) => snippet.id));
  const merged = [...site.snippets.filter((snippet) => placements.includes(snippet.placement) && !own.has(snippet.id)), ...page];
  const rank = (snippet: Snippet) => {
    const index = site.order?.[snippet.placement]?.indexOf(snippet.id) ?? -1;
    return DOCUMENT_ORDER.indexOf(snippet.placement) * 1e6 + (index >= 0 ? index + 1 : own.has(snippet.id) ? 1e5 : 0);
  };
  return merged.map((snippet, i) => ({ snippet, key: rank(snippet), i })).sort((a, b) => a.key - b.key || a.i - b.i).map(({ snippet }) => snippet);
}

/**
 * Applies the site-wide snippets on each client-side navigation, as the original runtime's router does: the
 * page's path (with its CMS item and locale) changed since the router last rendered.
 */
export function useCustomCodeOnNavigation(path: string) {
  const shown = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (shown.current !== undefined && shown.current !== path) {
      navigated = true;
      leftFirstPage = true;
      scheduleSnippets();
    }
    shown.current = path;
  }, [path]);
}

/** `inDocument`: the server-rendered document has the snippets at their placements already (a static site's prerendered pages). */
function CustomCode({ snippets, order, inDocument, onNavigation }: { snippets: Snippet[]; order?: Partial<Record<Placement, string[]>>; inDocument?: boolean; onNavigation: () => void }) {
  // The server snapshot while the server-rendered page hydrates; the browser's after.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  // Fixed at mount: the server rendered these snippets (first load), or a navigation brought them.
  const [serverRendered] = useState(!hydrated);
  const wrappers = useRef<Array<HTMLDivElement | null>>([]);
  const started = useRef(false);
  useLayoutEffect(() => {
    if (order) snippetOrder = order;
    if (serverRendered && !inDocument) snippets.forEach((snippet, i) => keepInDocument(snippet, wrappers.current[i]));
    // Once per mount (React's development double run included).
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (started.current || serverRendered) return;
    started.current = true;
    onNavigation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!serverRendered || inDocument) return null;
  return snippets.map((snippet, i) =>
    snippet.html === undefined ? null : (
      <div
        key={snippet.id}
        ref={(element) => {
          wrappers.current[i] = element;
        }}
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: snippet.html }}
      />
    ),
  );
}

/**
 * Applies a navigation's snippets once its render has committed (the router's effect and those of
 * the page it brought run in one commit), the site's with the page's in the site's order.
 */
function scheduleSnippets() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    const batch = [...(navigated ? siteSnippets.values() : []), ...pageSnippets];
    const firstPage = !leftFirstPage;
    navigated = false;
    pageSnippets = [];
    applying = applying.then(() => applySnippets(inPublishedOrder(batch), firstPage)).catch(() => {});
  });
}

/** Placement by placement (the original runtime's order), each in the site's order (the order given, else as listed). */
function inPublishedOrder(snippets: Snippet[]): Snippet[] {
  const rank = (snippet: Snippet) => {
    const index = snippetOrder[snippet.placement]?.indexOf(snippet.id) ?? -1;
    return PLACEMENTS.indexOf(snippet.placement) * 1e6 + (index < 0 ? 0 : index);
  };
  const unique = [...new Map(snippets.map((snippet) => [snippet.id, snippet])).values()];
  return unique.map((snippet, i) => ({ snippet, key: rank(snippet), i })).sort((a, b) => a.key - b.key || a.i - b.i).map(({ snippet }) => snippet);
}

/** Moves a server-rendered snippet's nodes (scripts that ran, what they inserted) to its placement, between its markers. */
function keepInDocument(snippet: Snippet, wrapper: HTMLDivElement | null | undefined) {
  if (!wrapper) return;
  const { end } = findMarkers(snippet.id) ?? insertMarkers(snippet);
  end.before(...wrapper.childNodes);
}

/** `firstPage`: the page's first load, whose document ran the snippets it has. */
async function applySnippets(snippets: Snippet[], firstPage: boolean) {
  for (const snippet of snippets) {
    if (snippet.html === undefined) continue;
    const markers = findMarkers(snippet.id);
    if (markers && (snippet.loadMode === "once" || firstPage)) continue;
    if (markers) removeSnippetElements(markers);
    await insertHtml(snippet.html, (markers ?? insertMarkers(snippet)).end);
  }
}

type Markers = { start: Comment; end: Comment };

function findMarkers(id: string): Markers | undefined {
  let start: Comment | undefined;
  for (const parent of [document.head, document.body]) {
    for (const node of parent.childNodes) {
      if (!(node instanceof Comment)) continue;
      if (node.data === ` Snippet: ${id} `) start = node;
      else if (start && node.data === ` SnippetEnd: ${id} `) return { start, end: node };
    }
  }
  return undefined;
}

/**
 * New markers at the snippet's placement: after the snippet before it in the site's order where that
 * is in the document (as the original runtime), else at the end of <head> (head code), before the page (body-start
 * code) or at the end of <body>.
 */
function insertMarkers({ id, placement }: Snippet): Markers {
  const start = document.createComment(` Snippet: ${id} `);
  const end = document.createComment(` SnippetEnd: ${id} `);
  const order = snippetOrder[placement] ?? [];
  const previous = order
    .slice(0, Math.max(0, order.indexOf(id)))
    .reverse()
    .map((other) => findMarkers(other))
    .find(Boolean);
  const main = document.getElementById("main");
  if (previous) previous.end.after(start, end);
  else if (placement === "bodyStart" && main?.parentNode === document.body) main.before(start, end);
  else if (placement === "bodyStart") document.body.prepend(start, end);
  else (placement === "bodyEnd" ? document.body : document.head).append(start, end);
  return { start, end };
}

/** A snippet's elements before it runs again; scripts that ran stay (removing one undoes nothing). */
function removeSnippetElements({ start, end }: Markers) {
  for (let node = start.nextSibling; node && node !== end; ) {
    const next = node.nextSibling;
    const script = node instanceof HTMLScriptElement && (!node.type || node.type === "text/javascript" || node.type === "module");
    if (!script) node.remove();
    node = next;
  }
}

/** Inserts HTML before a node, running its scripts in order: a classic external script before what follows it. */
async function insertHtml(html: string, before: Node) {
  const parent = before.parentNode!;
  const range = document.createRange();
  range.selectNodeContents(parent);
  await insertNodes(range.createContextualFragment(html), parent, before);
}

async function insertNodes(source: Node, parent: Node, before: Node | null) {
  for (let node = source.firstChild; node; node = node.nextSibling) {
    if (node instanceof HTMLScriptElement) {
      // A copy runs when inserted; a classic external script holds back what follows until it has run.
      const script = node.cloneNode(true) as HTMLScriptElement;
      const blocking = script.hasAttribute("src") && !script.hasAttribute("async") && !script.hasAttribute("defer") && script.type.toLowerCase() !== "module";
      const loaded = blocking ? new Promise((resolve) => (script.onload = script.onerror = resolve)) : undefined;
      parent.insertBefore(script, before);
      await loaded;
      continue;
    }
    const copy = node.cloneNode(false);
    parent.insertBefore(copy, before);
    if (node.firstChild) await insertNodes(node, copy, null);
  }
}
