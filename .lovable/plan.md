# DevScale Landing Page

Build a single-route marketing landing page based on the provided HTML. It's a dark, glass-UI style page for "DevScale" — a unified developer workspace.

## Scope

One page at `/` composed of these sections (in order):
1. Top nav bar (logo, links: Features, Modules, How it Works, CTA button)
2. Hero — badge, headline "One Workspace. Every Tool. Infinite Productivity.", subtitle, two CTAs, animated visual + floating stat card
3. Stats strip — 4 counters (100+ Resources, 99% AI Powered, 250k Developers, 12 Platforms)
4. Product Mission — two alternating rows with mock UI cards + testimonial quote block
5. Powerful Modules — 8-card feature grid (AI Voice, Multi-Debug, Resource Grid, Dynamic HUD, Analytics, Global Docs, Glassboard, Quest Log)
6. Watch it Evolve — animated mock dashboard preview
7. Old Way vs DevScale Way — 2-column comparison
8. Three Steps to Mastery — Create / Choose / Boost
9. Architectural Precision — centerpiece with animated background
10. Testimonials — horizontal scrolling row (3 quotes with hotlinked avatars from the HTML)
11. FAQ — 3 collapsible items
12. Final CTA — glass card with two buttons
13. Footer

## Design system

- Dark theme only, glass-morphism aesthetic.
- Replace the HTML's Material Design semantic tokens (`primary`, `tertiary`, `on-surface`, `surface-container-*`, `error`, etc.) with equivalent HSL/oklch tokens in `src/styles.css`. Neon cyan/blue primary, violet tertiary on a near-black background.
- Add `.glass-card` utility (subtle white/5 bg, backdrop-blur, white/10 border).
- Add `.glow-text` (soft primary text-shadow).
- Google Material Symbols icons via `<link>` in `__root.tsx` head, or swap to lucide-react equivalents (mic, bug, grid, layout-dashboard, activity, languages, pen-tool, check-square, arrow-right, play-circle, check-circle, users, zap, chevron-down).

## Animations / interactivity

- Skip the Three.js/shader canvases from the HTML. Replace with pure CSS gradient/blur backdrops (radial gradients, blurred blobs) so the visual language survives without WebGL.
- Simple JS: FAQ accordion toggle, stat counter count-up on mount, testimonial marquee via CSS keyframes.

## Images

- Hotlink the 3 testimonial avatar URLs from the source HTML (`lh3.googleusercontent.com/aida-public/...`) directly.
- No other images needed.

## Files

- `src/routes/index.tsx` — replace placeholder with the full page (compose small local section components inline).
- `src/routes/__root.tsx` — update title/description/OG to "DevScale — One Workspace. Every Tool." and add Material Symbols stylesheet link.
- `src/styles.css` — add dark tokens (primary, tertiary, surface variants), `.glass-card`, `.glow-text`, marquee keyframes; default the site to dark by adding `class="dark"` on `<html>` in the shell.

No backend, no routing beyond `/`.
