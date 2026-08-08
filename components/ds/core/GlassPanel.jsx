"use client";

import React from "react";

/**
 * GlassPanel — the brand's liquid-glass surface primitive.
 * Translucent fill + hairline border + backdrop blur/saturate + an inner
 * specular bevel. Set `tier` for density, `glow` for a signal halo, and
 * `shimmer` for a light-sweep that animates across the glass on hover.
 */
export function GlassPanel({
  tier = "default",
  radius = "lg",
  glow = "none",
  shimmer = false,
  as = "div",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const fills = {
    subtle: "var(--glass-fill-subtle)",
    default: "var(--glass-fill)",
    strong: "var(--glass-fill-strong)",
  };
  const borders = {
    subtle: "var(--glass-border)",
    default: "var(--glass-border)",
    strong: "var(--glass-border-strong)",
  };
  const radii = {
    md: "var(--radius-md)", lg: "var(--radius-lg)", xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)", full: "var(--radius-full)",
  };
  const glows = {
    none: "",
    cyan: "var(--glow-blue-soft)",
    violet: "var(--glow-emerald-soft)",
    screen: "var(--glow-screen)",
  };

  const composedShadow = ["var(--glass-specular)", "var(--shadow-lg)", glows[glow]]
    .filter(Boolean).join(", ");

  const wrap = {
    position: "relative",
    background: fills[tier],
    border: `1px solid ${borders[tier]}`,
    borderRadius: radii[radius],
    WebkitBackdropFilter: "var(--glass-backdrop)",
    backdropFilter: "var(--glass-backdrop)",
    boxShadow: composedShadow,
    overflow: shimmer ? "hidden" : undefined,
    transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    ...style,
  };

  const Tag = as;

  return (
    <Tag
      className={className}
      style={wrap}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {shimmer && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "45%",
            pointerEvents: "none",
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent)",
            transform: hover ? "translateX(220%) skewX(-18deg)" : "translateX(-120%) skewX(-18deg)",
            transition: "transform 900ms var(--ease-out)",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
