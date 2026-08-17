import { Pill } from "../ds/core/Pill.jsx";
import { ProjectCard } from "../ds/data-display/ProjectCard.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-center">
            <Pill>Projects</Pill>
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
