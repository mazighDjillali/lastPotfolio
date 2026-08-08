import React from "react";
import { techMarks } from "@/lib/logos";

/**
 * TechMark — the 24x24 glyph for a technology, drawn in currentColor so the
 * surrounding item owns the tint (muted at rest, brand colour on hover).
 * Unmapped names degrade to a monogram rather than a gap, so the row keeps
 * its rhythm. Decorative: the label always sits next to it.
 */
export function TechMark({ name, size = 18 }) {
  const mark = techMarks[name];

  if (!mark) {
    return (
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontFamily: "var(--font-mono)",
          fontSize: size * 0.6,
          lineHeight: 1,
          border: "1px solid currentColor",
          borderRadius: "var(--radius-sm)",
          opacity: 0.7,
        }}
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  const paths = mark.paths ?? [mark.path];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0 }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** The hover tint for a technology, or the inherited colour if unmapped. */
export function brandColor(name) {
  return techMarks[name]?.hex ?? "currentColor";
}
