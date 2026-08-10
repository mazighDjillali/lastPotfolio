import { Pill } from "../ds/core/Pill.jsx";
import { TechMark, brandColor } from "../ds/data-display/TechMark.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { skills } from "@/lib/data";

/**
 * Skills — the stack, stripped back to logo + name on hairline-ruled rows.
 * No panels, no chips: the marks carry the recognition, so the surface stays
 * quiet and colour only appears under the cursor.
 */
export function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills and technologies">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <Pill>Stack</Pill>
            <h2 className="section-title">Tools I reach for</h2>
          </div>
        </Reveal>

        <div className="stack">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 60}>
              <div className="stack-row">
                <h3 className="stack-label">{group.group}</h3>
                <ul className="stack-items">
                  {group.items.map((s) => (
                    <li key={s} className="tech" style={{ "--brand": brandColor(s) }}>
                      <TechMark name={s} />
                      <span className="tech-name">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
