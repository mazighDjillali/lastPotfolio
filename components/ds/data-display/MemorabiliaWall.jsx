import React from "react";
import { asset } from "@/lib/asset";

/**
 * MemorabiliaWall — the About-section wall board: a few personal keepsakes
 * "mounted" on a dark board, crossed by two glowing light-beams (a personal
 * nod, not licensed art). No copyrighted cover art is reproduced — vinyl and
 * poster slots are abstract placeholders captioned by title.
 */
export function MemorabiliaWall({ items = [], className = "", style = {}, ...rest }) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-2xl)",
        padding: "40px 32px",
        background: "var(--graphite-950)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-lg)",
        ...style,
      }}
      {...rest}
    >
      {/* faint pegboard scanline texture */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "var(--scanlines)", opacity: 0.5, pointerEvents: "none" }} />

      {/* crossed light-beams */}
      <div aria-hidden="true" style={{
        position: "absolute", left: "8%", top: "-10%", width: 6, height: "140%",
        background: "var(--blue-400)", boxShadow: "var(--saber-glow)",
        transform: "rotate(18deg)", opacity: 0.85, borderRadius: 3,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", right: "12%", top: "-10%", width: 6, height: "140%",
        background: "var(--red-400)", boxShadow: "0 0 16px 2px var(--red-400), 0 0 40px 6px color-mix(in oklch, var(--red-400) 45%, transparent)",
        transform: "rotate(-16deg)", opacity: 0.85, borderRadius: 3,
      }} />

      <div style={{ position: "relative", display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((it, i) => (
          <figure key={i} style={{ margin: 0, width: it.type === "vinyl" ? 150 : 130, textAlign: "center" }}>
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: it.type === "vinyl" ? "1 / 1" : "2 / 3",
              borderRadius: it.type === "vinyl" ? "50%" : "var(--radius-md)",
              background: it.image
                ? `center/cover url(${asset(it.image)})`
                : it.type === "vinyl"
                  ? "repeating-radial-gradient(circle, var(--graphite-800) 0 3px, var(--graphite-900) 3px 6px)"
                  : "linear-gradient(160deg, var(--graphite-800), var(--graphite-900))",
              border: "1px solid var(--glass-border-strong)",
              boxShadow: "var(--glass-specular), var(--shadow-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {it.type === "vinyl" && (
                <span style={{ width: "32%", aspectRatio: "1/1", borderRadius: "50%", background: "var(--black)", border: "1px solid var(--glass-border)" }} />
              )}
              {it.type === "poster" && !it.image && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "var(--tracking-wider)", color: "var(--text-faint)", textTransform: "uppercase", padding: 8, textAlign: "center" }}>
                  {it.title}
                </span>
              )}
              {/* mounting pin */}
              <span aria-hidden="true" style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "var(--ink-500)", boxShadow: "var(--shadow-sm)" }} />
            </div>
            <figcaption style={{ marginTop: 10 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{it.title}</div>
              {it.subtitle && <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: 2 }}>{it.subtitle}</div>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
