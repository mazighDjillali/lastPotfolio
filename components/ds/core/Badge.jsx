import React from "react";

/**
 * Badge — small status pill. Personal semantics: "Now Building" (emerald),
 * "Coming Soon" (blue), "Live" (rare red, on-air/recording nod). "glass" and
 * "outline" for neutral metadata.
 */
export function Badge({
  variant = "glass",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 9px",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--fs-xs)",
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1.4,
    letterSpacing: "var(--tracking-wide)",
    borderRadius: "var(--radius-full)",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
    width: "fit-content",
  };

  const variants = {
    now: { background: "color-mix(in oklch, var(--emerald-400) 90%, transparent)", color: "var(--black)" },
    soon: { background: "color-mix(in oklch, var(--blue-400) 90%, transparent)", color: "var(--black)" },
    trending: { background: "color-mix(in oklch, var(--red-400) 90%, transparent)", color: "var(--black)" },
    glass: {
      background: "var(--glass-fill-strong)",
      border: "1px solid var(--glass-border)",
      color: "var(--text-secondary)",
      WebkitBackdropFilter: "var(--glass-backdrop)",
      backdropFilter: "var(--glass-backdrop)",
    },
    outline: { background: "transparent", border: "1px solid var(--glass-border-strong)", color: "var(--text-secondary)" },
  }[variant];

  return (
    <span className={className} style={{ ...base, ...variants, ...style }} {...rest}>
      {children}
    </span>
  );
}
