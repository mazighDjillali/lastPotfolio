/** @type {import('next').NextConfig} */

/* GitHub Pages serves a project repo from a sub-path
   (https://<user>.github.io/<repo>/), so the app has to know its prefix.
   The workflow sets NEXT_PUBLIC_BASE_PATH; locally it is empty, which keeps
   `next dev` and a root-hosted deploy working unchanged. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  // emit a fully static site into ./out — no Node server on Pages
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Pages has no image optimiser; the app uses plain <img> anyway
  images: { unoptimized: true },
  // emit /index.html per route so Pages resolves directory URLs
  trailingSlash: true,
};

export default nextConfig;
