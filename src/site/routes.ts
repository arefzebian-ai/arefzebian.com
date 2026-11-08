// Site tables read by the kit's router (src/lib/deframer/route*.tsx).

/**
 * The site's pages by path. `pathLocalized`: the page's path in locales where it differs (by locale code);
 * `includedLocales`: the only locales the page exists in; `contentLocales`: locales showing another's content;
 * `collectionId`: the CMS collection whose slugs
 * a detail page's path holds; `elements`: section node ids that links in CMS content use -> anchor names.
 */
export const routes: Record<
  string,
  {
    pathLocalized?: Record<string, string>;
    includedLocales?: string[];
    contentLocales?: Record<string, string>;
    collectionId?: string;
    elements?: Record<string, string>;
  }
> = {
  "/": {},
  "/about": {},
  "/works/grid-view": {},
  "/works/list-view": {},
  "/blog-unused": {},
  "/contact-unused": {},
  "/contact": {},
  "/404": {},
  "/legal-unused": {},
  "/playground": {},
  "/creature": {},
  "/halv-draft": {},
  "/halv": {},
  "/halv-casestudy": {},
  "/pelagostone-casestudy": {},
  "/revimo-casestudy": {},
  "/aether-branding": {},
  "/pelagostone": {},
  "/rivited": {},
  "/aether": {},
  "/revimo": {},
  "/rivited-draft": {},
  "/pelagostone-draft": {},
  "/aether-draft": {},
  "/revimo-draft": {},
  "/works/grid-view/:worksSlug": {},
  "/blog-unused/:blogSlug": {},
};

/** The captured site's origin: only its exported page Links relocate to this project. */
export const publishedOrigin = "https://arefzebian.com";

/** Page ids that CMS content or code components still link with -> route paths. */
export const pageIds: Record<string, string> = {
  mSWM2gwDI: "/",
  lihNgWMKM: "/about",
  crs7BF5yA: "/works/grid-view",
  TSeLRL3x2: "/works/list-view",
  RIiRMRkFB: "/blog-unused",
  g9xuD5gcz: "/contact-unused",
  cCl0_3fpG: "/contact",
  dQBlYquN1: "/404",
  t5yRrErbh: "/legal-unused",
  YSqCcg0hG: "/playground",
  creatureComingSoon: "/creature",
  dgPj6Z59p: "/halv-draft",
  EsFDOX2sV: "/halv",
  ZiMWc_9zr: "/halv-casestudy",
  nWZyXECY1: "/pelagostone-casestudy",
  tIxtTgd4k: "/revimo-casestudy",
  k42vKKTOQ: "/aether-branding",
  f8qSYHcNI: "/pelagostone",
  I0tiOEym6: "/rivited",
  MMruKvPRc: "/aether",
  urd6VSiAL: "/revimo",
  DSTDDwCYe: "/rivited-draft",
  esDIozgKL: "/pelagostone-draft",
  zuV8HAtvu: "/aether-draft",
  wF3X1bcuu: "/revimo-draft",
};

/** The site's locales (site settings → Localization): the default first, without a URL prefix; `fallback`: the locale (by code) missing translations come from. */
export const locales = [
  {
    code: "english",
    id: "default",
    name: "Unknown",
    slug: "",
    textDirection: "ltr",
  },
];

/** "user": honour prefers-reduced-motion (site setting); "never": always animate. */
export const reducedMotion = "user";
