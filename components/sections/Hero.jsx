import { Fragment } from "react";
import { Pill } from "../ds/core/Pill.jsx";
import { Button } from "../ds/core/Button.jsx";
import { DeskSceneLazy } from "../site/DeskSceneLazy.jsx";
import { person } from "@/lib/data";

/* The title is split into the lines the reveal animates: each line rides up
   from behind its own overflow mask, staggered by --i. The lines are explicit
   rather than left to natural wrapping, because every line needs its own mask.

   Letters still carry --p: the blue -> turquoise sweep is sampled per glyph so
   it stays continuous across the line break, which one background-clip
   gradient can't do once the accent run is split over two lines. */
const LINES = [
  [
    { text: "Let's", accent: false },
    { text: "Build", accent: true },
    { text: "Something", accent: true },
  ],
  [
    { text: "great", accent: true },
    { text: "Together", accent: false },
  ],
];

const WORDS = LINES.flat();
const ACCENT_TOTAL = WORDS.reduce((n, w) => n + (w.accent ? w.text.length : 0), 0);

let accentSeen = 0;
const TITLE = LINES.map((line) =>
  line.map((word) => ({
    accent: word.accent,
    letters: [...word.text].map((ch) => ({
      ch,
      p: word.accent ? accentSeen++ / Math.max(ACCENT_TOTAL - 1, 1) : null,
    })),
  }))
);

const TITLE_TEXT = WORDS.map((w) => w.text).join(" ");

/* the CTAs are pills here, overriding the rounded default the rest of the
   page uses — the hero is the one place that follows the landing-page look */
const pill = { borderRadius: "var(--radius-full)" };

/* The hero sits above the fold, so its content animates on load instead of
   waiting on the IntersectionObserver the scrolled sections use. The title
   runs its own per-line mask; these delays fall in behind it. */
const enter = (ms) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-stage">
        {/* left column: the copy */}
        <div className="hero-copy">
          <Pill className="hero-enter" style={enter(0)}>
            {person.headline}
          </Pill>

          <h1 className="hero-title" aria-label={TITLE_TEXT}>
            {TITLE.map((line, li) => (
              <span className="line" key={li} aria-hidden="true">
                <span className="line-inner" style={{ "--i": li }}>
                  {line.map((word, wi) => (
                    <Fragment key={wi}>
                      {wi > 0 && " "}
                      <span className="word" data-accent={word.accent || undefined}>
                        {word.letters.map((l, i) => (
                          <span key={i} className="letter" style={l.p === null ? undefined : { "--p": l.p }}>
                            {l.ch}
                          </span>
                        ))}
                      </span>
                    </Fragment>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-actions hero-enter" style={enter(980)}>
            <Button href="#projects" size="lg" style={pill}>
              See my work
            </Button>
            <Button href="#contact" variant="glass" size="lg" style={pill}>
              Get in touch
            </Button>
          </div>

          <div className="hero-meta hero-enter" style={enter(1100)}>
            <span>
              <span className="dot">●</span> Open to opportunities
            </span>
          </div>
        </div>

        {/* right column: the 3D desk */}
        <div className="hero-scene hero-enter" style={enter(860)}>
          <DeskSceneLazy className="desk-scene" />
        </div>
      </div>
    </section>
  );
}
