import { Pill } from "../ds/core/Pill.jsx";
import { PosterCard } from "../ds/data-display/PosterCard.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { favorites } from "@/lib/data";

export function Favorites() {
  return (
    <section id="favorites" className="section" aria-label="Personal favorites">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-center">
            <Pill>Favorites</Pill>
            <h2 className="section-title section-title-lg">The personal shelf</h2>
            <p className="section-sub">
              Films, albums, sports, games — rated with the seriousness they deserve.
            </p>
          </div>
        </Reveal>

        <div className="grid-favorites">
          {favorites.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <PosterCard
                title={f.title}
                description={f.description}
                image={f.image}
                rating={f.rating}
                runtime={f.runtime}
                tags={f.tags}
                trending={f.trending}
                aspect="poster"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
