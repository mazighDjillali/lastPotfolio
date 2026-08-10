/* Emitted as a static sitemap.xml at build time. Single-page site, so one
   entry. The URL must carry the GitHub Pages sub-path — same env var as the
   rest of the metadata. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://mazighdjillali.github.io${basePath}`;

// required for `output: export` — emit a static sitemap.xml at build time
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
