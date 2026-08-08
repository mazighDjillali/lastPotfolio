import { Pill } from "../ds/core/Pill.jsx";
import { ProjectCard } from "../ds/data-display/ProjectCard.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { projects } from "@/lib/data";

/* the mono uppercase kicker MeetSponsors puts above each section heading —
   applied here only, since the rest of the page keeps the glass chip */
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

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-center">
            <Pill style={kicker}>Projects</Pill>
            <h2 className="section-title section-title-lg">What I&apos;ve built</h2>
            <p className="section-sub">
              Production systems at Algérie Poste and CERIST, plus the academic work
              that led there. The ones marked in production are running today.
            </p>
          </div>
        </Reveal>

        <div className="grid-projects">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <ProjectCard
                title={p.title}
                description={p.description}
                tags={p.tags}
                icon={p.icon}
                context={p.context}
                status={p.status}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
