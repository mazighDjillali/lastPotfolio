"use client";

import React from "react";
import { Badge } from "../core/Badge.jsx";
import { Chip } from "./Chip.jsx";

/**
 * PosterCard — the poster-style card used for the "Favorites" section
 * (movies, albums, games — personal references shown as content, not
 * branding) and for project cards. Image with a protection scrim,
 * status/trending badges, title + meta, optional rating/runtime and tag
 * chips. Hovers with a blue ring + zoom.
 */
export function PosterCard({
  title,
  description,
  image,
  status,            // "now" | "soon" | undefined
  trending = false,
  rating,            // number (out of 10)
  runtime,           // string e.g. "2h 10m"
  tags = [],
  aspect = "card",   // "poster" (2/3) | "card" (3/4)
  accentBar = false, // cyan glowing left bar (projects style)
  children,
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const ratio = aspect === "poster" ? "var(--aspect-poster)" : "var(--aspect-card)";

  return (
    <article
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-xl)",
        border: `1px solid ${hover ? "color-mix(in oklch, var(--blue-400) 55%, transparent)" : "var(--glass-border)"}`,
        background: "var(--glass-fill)",
        boxShadow: hover ? "var(--glow-blue-soft), var(--shadow-lg)" : "var(--shadow-md)",
        transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: "relative", aspectRatio: ratio, width: "100%", background: "var(--black)" }}>
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hover ? "scale(1.05)" : "scale(1)",
              transition: "transform var(--dur-slow) var(--ease-out)",
            }}
          />
        )}
        {/* protection scrim */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--scrim-poster)" }} />
        {accentBar && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute", left: 0, top: 0, width: 4, height: 112,
              background: "color-mix(in oklch, var(--blue-400) 70%, transparent)",
              boxShadow: "var(--glow-blue)",
            }}
          />
        )}
        {status && (
          <div style={{ position: "absolute", left: 8, top: 8 }}>
            <Badge variant={status === "now" ? "now" : "soon"}>
              {status === "now" ? "Now Showing" : "Coming Soon"}
            </Badge>
          </div>
        )}
        {trending && (
          <div style={{ position: "absolute", right: 8, top: 8 }}>
            <Badge variant="trending">Trending</Badge>
          </div>
        )}
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--white)", lineHeight: 1.3 }}>
          {title}
        </h3>
        {description && (
          <p style={{ margin: "6px 0 0", fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.45 }}>
            {description}
          </p>
        )}
        {(rating != null || runtime) && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>
            {rating != null && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--accent)" }}>★</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{rating.toFixed(1)}</span>
                <span>/10</span>
              </span>
            )}
            {runtime && <span style={{ fontVariantNumeric: "tabular-nums" }}>{runtime}</span>}
          </div>
        )}
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        )}
        {children && <div style={{ marginTop: 14 }}>{children}</div>}
      </div>
    </article>
  );
}
