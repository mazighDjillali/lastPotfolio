"use client";

import React from "react";
import { TechMark } from "./TechMark.jsx";
import { Chip } from "./Chip.jsx";

/**
 * ProjectCard — the text-first card the Projects grid uses, following the
 * MeetSponsors feature-card pattern: a glyph badge, an eyebrow, a bold title,
 * a plain-language description, then the stack as chips.
 *
 * Deliberately carries no artwork. PosterCard remains the image-led card and
 * still backs the Favorites shelf; this one leads with the words instead.
 */
export function ProjectCard({
  title,
  description,
  tags = [],
  icon,
  context,
  status,          // "now" | undefined
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <article
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        height: "100%",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-panel)",
        border: `1px solid ${hover ? "color-mix(in oklch, var(--accent) 45%, transparent)" : "var(--glass-border)"}`,
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
        transform: hover ? "var(--hover-lift)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
        {/* the lead technology, tinted by the accent rather than its brand hue
            so a row of cards reads as one set */}
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-raised)",
            border: "1px solid var(--glass-border)",
            color: "var(--accent)",
          }}
        >
          <TechMark name={icon} size={22} />
        </span>

        {status === "now" && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-xs)",
              letterSpacing: "var(--tracking-wide)",
              color: "var(--status-build)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--status-build)",
                boxShadow: "var(--glow-emerald-soft)",
              }}
            />
            In production
          </span>
        )}
      </div>

      <div>
        {context && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-xs)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: 6,
            }}
          >
            {context}
          </div>
        )}
        <h3
          style={{
            margin: 0,
            fontSize: "var(--fs-xl)",
            fontWeight: "var(--fw-semibold)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: "var(--lh-snug)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          margin: 0,
          flex: 1,
          fontSize: "var(--fs-sm)",
          color: "var(--text-muted)",
          lineHeight: "var(--lh-relaxed)",
        }}
      >
        {description}
      </p>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      )}
    </article>
  );
}
