/**
 * Prefixes a path in /public with the deployment's base path.
 *
 * Next rewrites its own bundles, and the srcs of next/image and next/link,
 * but a plain <img src="/portrait.jpeg"> is left untouched — which 404s once
 * the site is served from a sub-path like /lastPotfolio. Every hand-written
 * reference to /public goes through here.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path) {
  if (!path) return path;
  // leave absolute URLs and data: URIs alone
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return `${basePath}${path}`;
}
