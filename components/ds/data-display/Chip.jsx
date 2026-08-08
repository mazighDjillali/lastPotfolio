import React from "react";

/**
 * Chip — a fully-rounded glass tag for tech stacks and metadata
 * (Python, TensorFlow, React Native...).
 */
export function Chip({ className = "", style = {}, children, ...rest }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-xs)",
        fontWeight: "var(--fw-normal)",
        color: "var(--text-secondary)",
        background: "var(--glass-fill-strong)",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--radius-full)",
        whiteSpace: "nowrap",
        width: "fit-content",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
