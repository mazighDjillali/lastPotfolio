import { Pill } from "../ds/core/Pill.jsx";
import { Badge } from "../ds/core/Badge.jsx";
import { GlassPanel } from "../ds/core/GlassPanel.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <Pill>Experience</Pill>
            <h2 className="section-title">Where the systems run</h2>
            <p className="section-sub">
              Production work for a national postal service — monitoring, vision, and
              the tooling around them.
            </p>
          </div>
        </Reveal>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div key={exp.company} className={`timeline-item${exp.current ? " build" : ""}`}>
              <Reveal delay={i * 100}>
                <GlassPanel radius="xl" style={{ padding: "var(--space-6)" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: "var(--space-3)",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "var(--fs-xl)",
                          fontWeight: "var(--fw-semibold)",
                          letterSpacing: "var(--tracking-tight)",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <div style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginTop: 2 }}>
                        {exp.company} · {exp.location}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                      {exp.current && <Badge variant="now">Now building</Badge>}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--fs-xs)",
                          color: "var(--text-faint)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {exp.start} — {exp.end}
                      </span>
                    </div>
                  </div>

                  <ul
                    style={{
                      marginTop: "var(--space-5)",
                      paddingLeft: 0,
                      listStyle: "none",
                      display: "grid",
                      gap: "var(--space-2)",
                    }}
                  >
                    {exp.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          display: "flex",
                          gap: "var(--space-3)",
                          color: "var(--text-muted)",
                          fontSize: "var(--fs-sm)",
                          lineHeight: "var(--lh-relaxed)",
                        }}
                      >
                        <span aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0 }}>
                          →
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
