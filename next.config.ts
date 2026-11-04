import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` type-checks the project, as `npx tsc --noEmit` does. The site's code components
  // (src/code, src/vendor) were written in a site builder's editor, which never type-checks them: what
  // TypeScript reports in them must not block builds.
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  // Each page loads the CSS its components import, grouped across pages by what they share; the
  // default merges every page's CSS into a few big files that every page then loads.
  experimental: { cssChunking: "graph" },
  // As the published site's hosting: no framework banner, and browsers don't guess content types.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }] }];
  },
  // src/proxy.ts gives each page the URL form the site publishes (/en/, /about, /blog/), so Next's own
  // trailing-slash redirect is off.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
