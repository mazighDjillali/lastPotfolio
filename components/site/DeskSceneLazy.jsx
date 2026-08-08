"use client";

import dynamic from "next/dynamic";

/**
 * DeskSceneLazy — defers the three.js bundle (~1MB) out of the critical path.
 * The hero text paints immediately; the desk streams in right after hydration.
 * ssr:false also skips server-rendering a WebGL canvas that can only ever
 * draw on the client.
 */
export const DeskSceneLazy = dynamic(
  () => import("./DeskScene.jsx").then((m) => m.DeskScene),
  {
    ssr: false,
    // hold the slot so the CTAs below don't jump when the canvas mounts
    loading: () => <div style={{ flex: 1, minHeight: "inherit" }} aria-hidden="true" />,
  }
);
