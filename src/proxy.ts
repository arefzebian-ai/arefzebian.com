// The site publishes each page at one form of its URL — without a trailing slash (/about), or with one where
// the page's path ends in it (/blog/) — and redirects the other form (308); a URL no page matches answers
// 404 at once. Next's own trailing-slash redirect would send any URL ending in a slash to its bare form
// first, so it is off (next.config.ts: skipTrailingSlashRedirect).
import { NextResponse, type NextRequest } from "next/server";

/** The site's pages as published (`:name`: a CMS item's path variable, any value). */
const pages = [
  "/about",
  "/works/grid-view",
  "/works/list-view",
  "/blog-unused",
  "/contact-unused",
  "/contact",
  "/404",
  "/legal-unused",
  "/playground",
  "/creature",
  "/halv-draft",
  "/halv",
  "/halv-casestudy",
  "/pelagostone-casestudy",
  "/revimo-casestudy",
  "/aether-branding",
  "/pelagostone",
  "/rivited",
  "/aether",
  "/revimo",
  "/rivited-draft",
  "/pelagostone-draft",
  "/aether-draft",
  "/revimo-draft",
  "/works/grid-view/:worksSlug",
  "/blog-unused/:blogSlug",
].map((path) => ({ pattern: patternOf(path), trailingSlash: path.endsWith("/") }));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const bare = pathname.replace(/\/+$/, "");
  const page = bare ? pages.find(({ pattern }) => pattern.test(decode(bare))) : undefined;
  // The home page, and URLs no page matches: Next answers them (its 404 page).
  if (!page) return NextResponse.next();
  const published = page.trailingSlash ? `${bare}/` : bare;
  return published === pathname ? NextResponse.next() : redirectTo(request, published);
}

/** A 308 to the URL's published form, keeping its query (as the published site does). */
function redirectTo(request: NextRequest, pathname: string) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

/** A page path (`/books/:slug/`) as a pattern for URL paths without their trailing slash. */
function patternOf(path: string): RegExp {
  const source = path
    .replace(/\/$/, "")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:[A-Za-z]\w*/g, "/[^/]+");
  return new RegExp(`^${source}$`);
}

function decode(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

// Every URL but Next's own files and the API routes.
export const config = { matcher: ["/((?!_next/|api/).*)"] };
