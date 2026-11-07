# Tiranga Dawn: design system

A pixel sky in flag order, for Viral Dhoka's portfolio. Saffron clouds above, clear ivory between, green clouds below, with chakra navy as the ink. It reads as India without ever showing a flag.

## What came from the references

| Reference | What it does | What we took | What we changed |
| --- | --- | --- | --- |
| andreas.vision | Canvas sky of chunky dithered clouds in four levels, calligraphic italic display (TRJN DaVinci) over Geist, pixel map, hatched mascot in the footer, live clocks | Dithered pixel clouds, one italic display face, a mascot as identity | Flag-ordered palette, clouds that part around the pointer and close into night, Boska instead of a paid font, a peacock with a job to do |
| ingrassiadaniel.it | One particle system carries the story: bust, globe, Italy, ribbon. Lenis smooth scroll, canvas cursor, percentage loader, dark ground | One particle system as the narrator, shape changes tied to scroll | Particles snap to a pixel grid at rest, keep each shape's colours, and rise out of the closing sky |

## Colour

Every value is a pastel step from a real flag colour.

| Token | Hex | Use |
| --- | --- | --- |
| `--saffron-1 / 2 / 3` | `#FDE6CC` `#F9C794` `#F2A65A` | Clouds, trails, accents. From #FF9933 |
| `--paper / paper-2` | `#FBF6EC` `#F4ECDD` | Page and raised surfaces. Warm ivory, never pure white |
| `--green-1 / 2 / 3` | `#D6ECD6` `#A8D5B0` `#6BB58A` | Clouds, trails, accents. From #138808 |
| `--ink / night-2 / night` | `#1B2350` `#202A5E` `#141A40` | Text and night sections. From #000080 |

Text is only ever navy on light, or ivory on night. Saffron and green stay out of body text because their contrast is too low. The deepest ramp step is rare on purpose: the resting sky is capped below it.

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Display | Boska Italic 400 | -0.028em tracking, 0.98 line height. Gambetta Italic is the self-hosted alternate |
| Text | General Sans 400/500/600 | Everything you read at length |
| Labels | Silkscreen | Numbers, dates, loaders. Uppercase, 0.72rem minimum |
| Devanagari | Tiro Devanagari Marathi | Small moments of Marathi: नमस्कार, पुणे, मोर |

Boska, Gambetta and General Sans are free from Fontshare and self-hosted in `public/fonts`.

## Pixel rules

- 8px grid for spacing, cursor trail and dither cells. Sky cells are 14px, with a 2px ordered dither inside.
- Sections meet through ordered dither, never a hard line or soft gradient.
- Pixels have square corners. Controls are pills. Cards get a 4px radius.
- 24 is the system's number: it echoes the chakra's spokes without using the emblem, and it drives the loader and Mor's tail.

## Motion

| Token | Curve | Duration | Use |
| --- | --- | --- | --- |
| Out | `cubic-bezier(.16,1,.3,1)` | 900ms | Entrances and reveals |
| In out | `cubic-bezier(.76,0,.24,1)` | 900ms | Things moving on screen |
| Press | `cubic-bezier(.23,1,.32,1)` | 180 to 420ms | Hover and press |
| Steps | `steps(n)` | 240 to 700ms | Pixel effects only |

Silky curves are for type and layout. Stepped timing is reserved for pixels. With `prefers-reduced-motion`, the loader, smooth scroll, custom cursor and idle motion all switch off.

## Signature pieces

| Piece | File | What it does |
| --- | --- | --- |
| Sky | `src/gl/Sky.tsx` | WebGL dither clouds at half resolution. They billow, part around the pointer, follow it slightly, and close into navy on scroll |
| Sky life | `src/gl/SkyLife.tsx` | Pixel birds that scatter from the pointer, kites that lean toward it |
| Story | `src/components/Story.tsx` | One particle system: a globe you can spin, India you can hover, Pune with pins Mor walks between, three "what I build" demos, a sunrise |
| Particles | `src/gl/Particles.tsx` | 34,000 pixels (16,000 on phones), one buffer per shape, click sends a shock ring through them |
| Shelf | `src/components/Shelf.tsx` | Tapes on a curved arc that recedes into depth; scroll, drag, arrows or the month ruler move it |
| Detail sheet | `src/components/Detail.tsx` | Paper grows out of the cover, text rises in masks, the screenshot bleeds in like ink |
| Wins | `src/components/Wins.tsx` | Mor on the podium step you finished on, a 250-team funnel, CESAC counters, a commit calendar |
| Loader | `src/components/Loader.tsx` | 24 feathers open as fonts arrive, with greetings in Marathi, Hindi and English |
| Page wipe | `src/components/PixelWipe.tsx` | Sweep of pixels through saffron, green and night. Nav jumps go through it |
| Cursor | `src/components/Cursor.tsx` | Square on the pointer with no lag, a short 7-cell trail, a reticle on anything clickable, labels |
| Mor | `src/components/Mor.tsx` | Walks with scroll progress, talks, fans his tail on click |

## Stack

Vite, React, TypeScript, GSAP with ScrollTrigger, Lenis and plain WebGL. Plain CSS on the tokens in `src/styles/tokens.css`.
