import React from "react";

/**
 * Pill — the small glass section-label used above headings
 * ("Currently Building", "Favorites"). Icon + text, fully rounded.
 */
export function Pill({ icon, className = "", style = {}, children, ...rest }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 13px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-xs)",
        fontWeight: "var(--fw-normal)",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--text-secondary)",
        background: "var(--glass-fill)",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-full)",
        WebkitBackdropFilter: "var(--glass-backdrop)",
        backdropFilter: "var(--glass-backdrop)",
        boxShadow: "var(--glass-specular)",
        width: "fit-content",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex", color: "var(--accent)" }}>{icon}</span>}
      {children}
    </span>
  );
}
