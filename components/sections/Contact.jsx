import { Pill } from "../ds/core/Pill.jsx";
import { Button } from "../ds/core/Button.jsx";
import { GlassPanel } from "../ds/core/GlassPanel.jsx";
import { TerminalCard } from "../ds/core/TerminalCard.jsx";
import { Reveal } from "../site/Reveal.jsx";
import { person } from "@/lib/data";

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
export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-center">
            <Pill style={kicker}>Contact</Pill>
            <h2 className="section-title">Say hello</h2>
            <p className="section-sub">
              For roles, collaborations, or a good film recommendation.
            </p>
          </div>
        </Reveal>

        <div className="grid-contact">
          <Reveal>
            <GlassPanel radius="2xl" glow="cyan" shimmer style={{ padding: "var(--space-8)" }}>
              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "var(--fs-2xl)",
                  fontWeight: "var(--fw-semibold)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                Let&apos;s build something reliable
              </h3>
              <p
                style={{
                  marginTop: "var(--space-3)",
                  color: "var(--text-muted)",
                  lineHeight: "var(--lh-relaxed)",
                }}
              >
                The fastest way to reach me is email. I read everything, and I answer
                anything that isn&apos;t spam.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-3)",
                  marginTop: "var(--space-6)",
                }}
              >
                <Button href={`mailto:${person.email}`} size="lg">
                  Email me
                </Button>
                <Button href={person.linkedin} variant="glass" size="lg" target="_blank" rel="noreferrer">
                  LinkedIn
                </Button>
                <Button href={person.github} variant="ghost" size="lg" target="_blank" rel="noreferrer">
                  GitHub
                </Button>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={120}>
            <TerminalCard
              title="contact --list"
              lines={[
                { text: "cat contact.txt" },
                { text: person.email, prompt: false, dim: true },
                { text: person.phone, prompt: false, dim: true },
                { text: person.location, prompt: false, dim: true },
                { text: "ping dmazigh" },
                { text: "reply from Algiers: time<24h", prompt: false, dim: true },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
