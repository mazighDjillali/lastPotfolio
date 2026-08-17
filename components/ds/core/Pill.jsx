import React from "react";

/**
 * Pill — the section kicker: the small mono, uppercase, accent-coloured label
 * that sits above every section heading ("STACK", "PROJECTS", "ABOUT"). It's a
 * typographic label, not a chrome element — no chip, no border, no blur — so
 * every section head reads as one system.
 */
export function Pill({ icon, className = "", style = {}, children, ...rest }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-xs)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--tracking-wider)",
        textTransform: "uppercase",
        color: "var(--accent)",
        width: "fit-content",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
    </span>
  );
}
