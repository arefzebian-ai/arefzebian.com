"use client";

// Fonts. Generated modules attach font descriptors to their components with
// addFonts(); when such a component renders, styles.tsx turns its descriptors
// into @font-face rules (fontFaceRules) that are server-rendered in a
// <style data-font-css> block, like the original runtime's own server does. Font
// files stay on their original remote URLs.
//
// fontStore.loadFonts(selectors) is the runtime API code components, shared
// styles and text layers call. Published pages already carry every @font-face
// they need, and the browser downloads a face only when text uses it, so a
// family the page declares is left to the browser: loading every selector a
// text style lists (its bold, italic and bold italic, used or not) would
// download fonts the page never shows, ahead of its images. The original
// runtime's font store is off on published sites for the same reason. Only a
// family no rendered component declared falls back to the Google Fonts /
// Fontshare CSS APIs (and is loaded, for components that measure text).

export type FontSource = "framer" | "google" | "fontshare" | "custom" | "local" | "builtIn";

export interface ComponentFont {
  cssFamilyName: string;
  uiFamilyName?: string;
  source: FontSource;
  url?: string;
  style?: string;
  weight?: string | number;
  unicodeRange?: string;
  openType?: boolean;
  variationAxes?: unknown;
  [key: string]: unknown;
}

export interface FontBundle {
  /** false marks old codegen that relied on Inter being loaded implicitly. */
  explicitInter: boolean;
  fonts: ComponentFont[];
}

const emptyBundle = (): FontBundle => ({ explicitInter: false, fonts: [] });

// ---------------------------------------------------------------------------
// Descriptors

/** Attach font bundles to a component (the original runtime: `Component.fonts`). */
export function addFonts(component: any, fontsOrBundles: any[], flags?: { supportsExplicitInterCodegen?: boolean }): void {
  if (!component) return;
  const bundles = toBundles(fontsOrBundles);
  if (!flags?.supportsExplicitInterCodegen && !bundles.some((bundle) => bundle.explicitInter === false)) {
    bundles.push(emptyBundle());
  }
  component.fonts = bundles;
}

export function getFonts(component: any): FontBundle[] {
  return component?.fonts ?? [];
}

export function getFontsFromSharedStyle(fontsOrBundles: any[] | undefined): FontBundle[] {
  return fontsOrBundles?.length ? toBundles(fontsOrBundles) : [emptyBundle()];
}

export function getFontsFromComponentPreset(fonts?: any[]): FontBundle[] {
  return fonts?.length ? toBundles(fonts) : [emptyBundle()];
}

/** Accept bundles as well as bare (older codegen) font descriptors. */
function toBundles(fontsOrBundles: any[] | undefined): FontBundle[] {
  const bundles: FontBundle[] = [];
  const loose: ComponentFont[] = [];
  for (const item of fontsOrBundles ?? []) {
    if (!item) continue;
    if ("explicitInter" in item) bundles.push({ explicitInter: item.explicitInter, fonts: (item.fonts ?? []).map(upgradeFont) });
    else loose.push(upgradeFont(item));
  }
  if (loose.length) bundles.push({ explicitInter: false, fonts: loose });
  return bundles;
}

/** Older descriptors use `family` and infer the source from the file URL. */
function upgradeFont(font: any): ComponentFont {
  if (font.cssFamilyName) return font;
  const url: string = font.url ?? "";
  const source: FontSource =
    font.source ??
    (url.startsWith("https://fonts.gstatic.com/s/") ? "google"
      : url.startsWith("https://framerusercontent.com/third-party-assets/fontshare/") ? "fontshare"
      : "custom");
  const { family, ...rest } = font;
  const variable = font.variationAxes && source !== "custom";
  return { ...rest, source, uiFamilyName: family, cssFamilyName: variable ? `${family} Variable` : family };
}

// ---------------------------------------------------------------------------
// @font-face rules

const rulesCache = new WeakMap<object, string[]>();

/** @font-face rules for a component's font bundles, in declaration order. */
export function fontFaceRules(bundles: FontBundle[] | undefined): string[] {
  if (!bundles?.length) return [];
  const cached = rulesCache.get(bundles);
  if (cached) return cached;
  const rules: string[] = [];
  for (const bundle of bundles) {
    for (const font of bundle?.fonts ?? []) {
      const rule = fontFaceRule(font);
      if (rule && !rules.includes(rule)) rules.push(rule);
    }
  }
  rulesCache.set(bundles, rules);
  return rules;
}

/** Same text and descriptor order as the original runtime's published <style data-font-css>. */
export function fontFaceRule(font: ComponentFont): string | undefined {
  if (!font?.url || !font.cssFamilyName || font.source === "local") return undefined;
  const parts = [
    `font-family: "${cssEscape(font.cssFamilyName)}"`,
    `src: url("${cssEscape(font.url)}")`,
    "font-display: swap",
    `font-style: ${font.style ?? "normal"}`,
  ];
  if (font.weight !== undefined && font.weight !== "") parts.push(`font-weight: ${font.weight}`);
  if (font.unicodeRange) parts.push(`unicode-range: ${font.unicodeRange}`);
  return `@font-face { ${parts.join("; ")} }`;
}

const cssEscape = (value: string) => value.replace(/["\\]/g, "\\$&");

// ---------------------------------------------------------------------------
// Selectors ("GF;DM Sans-700italic", "FS;Satoshi-bold", "Inter-BoldItalic", ...)

interface ParsedSelector {
  family: string;
  weight: number;
  style: "normal" | "italic";
  source: "google" | "fontshare" | "hosted" | "other";
}

const weightNames: Record<string, number> = {
  thin: 100, hairline: 100, extralight: 200, ultralight: 200, light: 300, regular: 400, normal: 400, book: 400,
  medium: 500, semibold: 600, demibold: 600, bold: 700, extrabold: 800, ultrabold: 800, black: 900, heavy: 900,
};

function parseVariant(variant: string): { weight: number; style: "normal" | "italic" } {
  const lower = variant.toLowerCase().replace(/[\s_-]/g, "");
  const style = lower.includes("italic") ? "italic" : "normal";
  const name = lower.replace("italic", "");
  const weight = /^\d+$/.test(name) ? Number(name) : weightNames[name] ?? 400;
  return { weight, style };
}

export function parseFontSelector(selector: string): ParsedSelector | undefined {
  const [prefix, rest] = selector.includes(";") ? selector.split(/;(.*)/s) : ["", selector];
  if (prefix === "GF" || prefix === "FS") {
    const dash = rest.lastIndexOf("-");
    if (dash < 0) return undefined;
    // Fontshare variants can themselves contain a dash ("bold-italic").
    let family = rest.slice(0, dash);
    let variant = rest.slice(dash + 1);
    if (prefix === "FS" && variant === "italic" && /-[a-z]+$/.test(family)) {
      const inner = family.lastIndexOf("-");
      variant = family.slice(inner + 1) + variant;
      family = family.slice(0, inner);
    }
    return { family, ...parseVariant(variant), source: prefix === "GF" ? "google" : "fontshare" };
  }
  if (prefix === "BI") {
    const [family, variant = "regular"] = rest.split("/");
    return { family, ...parseVariant(variant), source: "other" };
  }
  if (prefix === "") {
    // The original runtime's own fonts: "Inter", "Inter-Bold", "Inter-BlackItalic".
    const [family, variant = "regular"] = rest.split("-");
    return { family, ...parseVariant(variant), source: "hosted" };
  }
  return undefined; // CUSTOM;… and local fonts are declared by components or not loadable.
}

// ---------------------------------------------------------------------------
// Browser loading

const isBrowser = typeof document !== "undefined";
const unquote = (family: string) => family.replace(/^["']|["']$/g, "");

/** Does the page declare an @font-face of this family (the browser picks among its faces)? */
function declaresFamily(font: ParsedSelector): boolean {
  let found = false;
  document.fonts.forEach((face) => {
    if (!found && unquote(face.family) === font.family) found = true;
  });
  return found;
}

function stylesheetURL(font: ParsedSelector): string | undefined {
  const italic = font.style === "italic";
  if (font.source === "google" || font.source === "hosted") {
    const family = encodeURIComponent(font.family).replace(/%20/g, "+");
    return `https://fonts.googleapis.com/css2?family=${family}:ital,wght@${italic ? 1 : 0},${font.weight}&display=swap`;
  }
  if (font.source === "fontshare") {
    // Fontshare encodes italics as weight + 1 (e.g. 401).
    const slug = font.family.toLowerCase().replace(/\s+/g, "-");
    return `https://api.fontshare.com/v2/css?f[]=${slug}@${font.weight + (italic ? 1 : 0)}&display=swap`;
  }
  return undefined;
}

const linkedStylesheets = new Map<string, Promise<void>>();

function linkStylesheet(href: string): Promise<void> {
  let promise = linkedStylesheets.get(href);
  if (!promise) {
    promise = new Promise<void>((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-font-fallback", "");
      link.onload = link.onerror = () => resolve();
      document.head.appendChild(link);
    });
    linkedStylesheets.set(href, promise);
  }
  return promise;
}

/** Faces registered by components rendering in the same tick win over the API fallback. */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 300));

/** Loads a family the page doesn't declare (true once it is usable); a declared one is the browser's to load. */
async function loadSelector(selector: string): Promise<boolean> {
  const font = parseFontSelector(selector);
  if (!font || declaresFamily(font)) return false;
  await settle();
  if (declaresFamily(font)) return false;
  const href = stylesheetURL(font);
  if (!href) return false;
  await linkStylesheet(href);
  const descriptor = `${font.style} ${font.weight} 16px "${font.family}"`;
  const faces = await document.fonts.load(descriptor).catch(() => []);
  return faces.length > 0;
}

class FontStore {
  enabled = true;
  readonly loadedSelectors = new Set<string>();

  isSelectorLoaded(selector: string): boolean {
    return this.loadedSelectors.has(selector);
  }

  /** Resolves once the selected fonts are usable. A no-op during server render. */
  async loadFonts(selectors: string[] = []): Promise<{ newlyLoadedFontCount: number }> {
    if (!isBrowser || !this.enabled) return { newlyLoadedFontCount: 0 };
    const pending = selectors.filter((selector) => !this.loadedSelectors.has(selector));
    const results = await Promise.all(pending.map((selector) => loadSelector(selector).catch(() => false)));
    let newlyLoadedFontCount = 0;
    pending.forEach((selector, index) => {
      if (!results[index] || this.loadedSelectors.has(selector)) return;
      this.loadedSelectors.add(selector);
      newlyLoadedFontCount++;
    });
    return { newlyLoadedFontCount };
  }

  /** @deprecated The original runtime's alias of loadFonts. */
  async loadWebFontsFromSelectors(selectors: string[]) {
    return this.loadFonts(selectors);
  }

  /** @deprecated The original runtime's API: the callback runs only if every font loaded. */
  async loadMissingFonts(selectors: string[], onLoaded?: () => void): Promise<void> {
    await this.loadFonts(selectors);
    if (selectors.every((selector) => this.loadedSelectors.has(selector))) onLoaded?.();
  }
}

export const fontStore = new FontStore();
