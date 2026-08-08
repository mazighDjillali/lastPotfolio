# Signal — DJILLALI Mazigh's portfolio

Personal AI/SWE portfolio built on the **"Cinematic — Portfolio Design System"** (claude.ai/design):
a quiet, near-black engineer's console — blue/emerald/rare-red accents on true black, liquid glass,
Geist Sans/Mono. Pop-culture references live in content (the Favorites shelf, terminal easter eggs),
never in the visual language.

## Stack

- Next.js 16 (App Router, JS) + React
- No CSS framework — design tokens as CSS custom properties in `app/globals.css`
- Geist Sans / Geist Mono via `next/font/google`

## Structure

- `app/` — layout (fonts, metadata), page composition, global tokens + base styles
- `components/ds/` — the design system components, verbatim from the design project
  (Button, Badge, Pill, GlassPanel, TerminalCard, NavPill, PosterCard, Chip, MemorabiliaWall)
- `components/site/` — SiteNav (NavPill + scroll-spy), Reveal (fade-up on scroll), ConsoleEgg
- `components/sections/` — Hero, About, Experience, Projects, Skills, Favorites, Contact, Footer
- `lib/data.js` — all content in one place (CV data, projects, favorites, terminal lines)
- `public/art/` — generated abstract SVG poster art (no reproduced cover art)

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Built by DJILLALI Mazigh · May the Code Be With You
