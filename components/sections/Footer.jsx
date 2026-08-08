import { person } from "@/lib/data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>
          Built by {person.name}
        </div>
        <div
          style={{
            marginTop: "var(--space-2)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            color: "var(--text-faint)",
          }}
        >
          May the Code Be With You
        </div>
        <div
          style={{
            marginTop: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            color: "var(--text-faint)",
          }}
        >
          © {new Date().getFullYear()} · Algiers, DZ
        </div>
      </div>
    </footer>
  );
}
