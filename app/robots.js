/* Emitted as a static robots.txt at build time.
   Note: crawlers look for robots.txt at the domain root, and this is a
   GitHub Pages project site under /lastPotfolio, so this file is mainly for
   completeness and for a future move to a custom domain. Per-page indexing is
   still controlled by the robots metadata in layout.js, which always applies. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://mazighdjillali.github.io${basePath}`;

// required for `output: export` — emit a static robots.txt at build time
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
