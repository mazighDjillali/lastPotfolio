import { Pill } from "../ds/core/Pill.jsx";
import { Chip } from "../ds/data-display/Chip.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { person, principles, education } from "@/lib/data";

/* the mono uppercase kicker, matching the hero and the Projects grid */
const kicker = {
  background: "none",
  border: "none",
  boxShadow: "none",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  padding: 0,
  fontFamily: "var(--font-mono)",
  fontWeight: "var(--fw-semibold)",
  letterSpacing: "var(--tracking-wider)",
  textTransform: "uppercase",
  color: "var(--accent)",
};

/* flat surface shared by the panels in this section — no glass, no blur */
const panel = {
  borderRadius: "var(--radius-xl)",
  background: "var(--bg-panel)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--shadow-md)",
};

const label = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-xs)",
  letterSpacing: "var(--tracking-wider)",
  textTransform: "uppercase",
  color: "var(--text-faint)",
};

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-center">
            <Pill style={kicker}>About</Pill>
            <h2 className="section-title section-title-lg">Hey, I&apos;m Mazigh</h2>
            <p className="section-sub">
              Computer vision by training, generalist by habit — and a stubborn
              preference for systems that hold up outside the lab.
            </p>
          </div>
        </Reveal>

        <div className="grid-about">
          <Reveal>
            <div style={{ ...panel, padding: "var(--space-5)" }}>
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <img
                  src="/portrait.jpeg"
                  alt={`Portrait of ${person.name}`}
                  style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
                />
              </div>

              <div style={{ marginTop: "var(--space-4)" }}>
                <div
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "var(--fs-lg)",
                    fontWeight: "var(--fw-semibold)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {person.name}
                </div>
                <div style={{ color: "var(--accent)", fontSize: "var(--fs-sm)", marginTop: 2 }}>
                  {person.headline}
                </div>
                <div style={{ ...label, marginTop: "var(--space-3)" }}>{person.location}</div>
              </div>

              <div style={{ marginTop: "var(--space-5)" }}>
                <div style={label}>Languages</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "var(--space-2)" }}>
                  {person.languages.map((l) => (
                    <Chip key={l}>{l}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              <div style={{ ...panel, padding: "var(--space-8)" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--fs-lg)",
                    color: "var(--text-secondary)",
                    lineHeight: "var(--lh-relaxed)",
                  }}
                >
                  {person.about}
                </p>
                <p
                  style={{
                    margin: "var(--space-4) 0 0",
                    color: "var(--text-muted)",
                    lineHeight: "var(--lh-relaxed)",
                  }}
                >
                  I came to it through a Master&apos;s in Visual Computing at USTHB. What
                  stuck wasn&apos;t the models so much as everything around them — the queue
                  that backs up, the camera that drifts, the machine that has to answer at
                  six in the morning.
                </p>

                <div style={{ marginTop: "var(--space-6)", display: "grid", gap: "var(--space-4)" }}>
                  {principles.map((p, i) => (
                    <div key={p.title} style={{ display: "flex", gap: "var(--space-4)" }}>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: 26,
                          height: 26,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "var(--radius-full)",
                          background: "color-mix(in oklch, var(--accent) 18%, transparent)",
                          color: "var(--accent)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--fs-xs)",
                          fontWeight: "var(--fw-semibold)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div
                          style={{
                            color: "var(--text-primary)",
                            fontWeight: "var(--fw-medium)",
                          }}
                        >
                          {p.title}
                        </div>
                        <div
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "var(--fs-sm)",
                            lineHeight: "var(--lh-relaxed)",
                            marginTop: 2,
                          }}
                        >
                          {p.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...panel, padding: "var(--space-6)" }}>
                <div style={label}>Education</div>
                <div style={{ marginTop: "var(--space-4)", display: "grid", gap: "var(--space-4)" }}>
                  {education.map((e) => (
                    <div
                      key={e.degree}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: "var(--space-4)",
                      }}
                    >
                      <div>
                        <div style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>
                          {e.degree}
                        </div>
                        <div style={{ color: "var(--text-faint)", fontSize: "var(--fs-sm)" }}>
                          {e.school}
                        </div>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--fs-xs)",
                          color: "var(--text-faint)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {e.start}–{e.end}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
