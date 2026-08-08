"use client";

import React from "react";

/**
 * Button — the brand's primary action.
 * Variants: "primary" (signal gradient), "glass" (liquid-glass outline),
 * "ghost" (text-only), "cyan" (solid emerald accent). Sizes: sm | md | lg | icon.
 * Compose with a Lucide icon as the first child.
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  href,
  type = "button",
  onClick,
  className = "",
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { height: 32, padding: "0 12px", fontSize: "var(--fs-xs)", gap: 6, radius: "var(--radius-md)" },
    md: { height: 40, padding: "0 18px", fontSize: "var(--fs-sm)", gap: 8, radius: "var(--radius-md)" },
    lg: { height: 48, padding: "0 28px", fontSize: "var(--fs-base)", gap: 8, radius: "var(--radius-lg)" },
    icon: { height: 40, width: 40, padding: 0, fontSize: "var(--fs-sm)", gap: 0, radius: "var(--radius-md)" },
  }[size];

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.gap,
    height: sizes.height,
    width: size === "icon" ? sizes.width : undefined,
    padding: sizes.padding,
    fontFamily: "var(--font-sans)",
    fontSize: sizes.fontSize,
    fontWeight: "var(--fw-medium)",
    lineHeight: 1,
    whiteSpace: "nowrap",
    borderRadius: sizes.radius,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    border: "1px solid transparent",
    color: "var(--white)",
    textDecoration: "none",
    transition: "transform var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    WebkitBackdropFilter: undefined,
    backdropFilter: undefined,
  };

  const variants = {
    primary: {
      background: "var(--signal)",
      boxShadow: "var(--glow-blue-soft)",
    },
    cyan: {
      background: "var(--emerald-400)",
      color: "var(--accent-contrast)",
      fontWeight: "var(--fw-semibold)",
      boxShadow: "var(--glow-emerald-soft)",
    },
    glass: {
      background: "var(--glass-fill)",
      border: "1px solid var(--glass-border-strong)",
      WebkitBackdropFilter: "var(--glass-backdrop)",
      backdropFilter: "var(--glass-backdrop)",
      boxShadow: "var(--glass-specular)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
    },
  }[variant];

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverStyle = !disabled && hover ? (
    variant === "ghost"
      ? { background: "var(--glass-fill)", color: "var(--white)" }
      : variant === "glass"
        ? { background: "var(--glass-fill-strong)" }
        : { opacity: 0.92, transform: "var(--hover-lift)" }
  ) : {};

  const pressStyle = !disabled && press ? { transform: "var(--press-scale)" } : {};

  const Tag = href ? "a" : "button";

  return (
    <Tag
      className={className}
      href={href}
      type={href ? undefined : type}
      disabled={href ? undefined : disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants, ...hoverStyle, ...pressStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
