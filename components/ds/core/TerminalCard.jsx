import React from "react";

/**
 * TerminalCard — a console-styled glass panel with a dot-traffic-light
 * header and monospace body. The playful/nerdy easter-egg surface:
 * a fake `whoami`, a footer credit, a build-status line.
 */
export function TerminalCard({
  title = "~/portfolio",
  lines = [],
  className = "",
  style = {},
  children,
  ...rest
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        background: "var(--glass-fill)",
        border: "1px solid var(--glass-border)",
        WebkitBackdropFilter: "var(--glass-backdrop)",
        backdropFilter: "var(--glass-backdrop)",
        boxShadow: "var(--glass-specular), var(--shadow-lg)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderBottom: "1px solid var(--glass-border)",
          background: "var(--glass-fill-strong)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--red-400)" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--blue-400)" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--emerald-400)" }} />
        <span style={{
          marginLeft: 8,
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-xs)",
          color: "var(--text-faint)",
        }}>
          {title}
        </span>
      </div>
      <div style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", lineHeight: "var(--lh-relaxed)" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.dim ? "var(--text-faint)" : "var(--text-secondary)" }}>
            {l.prompt !== false && <span style={{ color: "var(--emerald-400)" }}>{"> "}</span>}
            {l.text}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}
