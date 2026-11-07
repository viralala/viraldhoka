# Viral Dhoka, portfolio

A pixel sky in flag order, a peacock called Mor, and a shelf of tapes for the work.

Vite, React, TypeScript, GSAP, Lenis and plain WebGL. No UI framework, no Three.js.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Where things live

| What | Where |
| --- | --- |
| Projects, wins, links, contact | `src/data/site.ts` |
| Design tokens | `src/styles/tokens.css` |
| Hero sky shader | `src/gl/Sky.tsx` |
| Kites and birds | `src/gl/SkyLife.tsx` |
| Particle story (globe, India, Pune, build, sunrise) | `src/components/Story.tsx`, `src/gl/Particles.tsx`, `src/lib/shapes.ts` |
| Tape shelf and detail sheet | `src/components/Shelf.tsx`, `src/components/Detail.tsx` |
| Wins, research, commits, archive | `src/components/Wins.tsx` |
| Mor | `src/components/Mor.tsx` |
| Cover and screenshot images | `public/work/<id>-cover.png`, `public/work/<id>.webp` |

## Adding a project

1. Add an entry to `PROJECTS` in `src/data/site.ts`. Custom domains go first.
2. Add `public/work/<id>.webp` (1280 by 800 screenshot) and `public/work/<id>-cover.png` (150 by 170, dithered).

The commit calendar in `src/data/commits.ts` and the land mask in `src/data/land.ts` are generated snapshots.

## Deploy

The repository is connected to the `viraldhoka` project on Vercel. Every push to `main` deploys to https://viraldhoka.vercel.app, and pushes to other branches get preview links.

`VITE_SITE_URL` in `.env` is the live address, used by the canonical and social tags. Change it if the site moves to a custom domain.

See `DESIGN.md` for the design system.
