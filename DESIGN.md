# DESIGN.md — Oussema Bouchahwa Portfolio
> Design mentor audit. No code was changed. All references are to real files and real values.

---

## 1. Design Concept

**Vibe:** Cinematic dark-tech studio. The language is editorial (large tracked section labels, editorial line-heights), not SaaS-dashboard. The intent is to read like an art director who also writes backend SQL — not like a CRUD portfolio.

**Why it fits:** The dual identity (engineering + visual arts) demands a palette that feels equally at home showing a PostgreSQL schema and a color-graded travel photo. The monochrome base with a single icy-cyan accent achieves this: clinical enough for code, atmospheric enough for photography. The grain overlay, custom cursor, and split-text reveal signal craft without shouting "look at my effects."

**Closest reference:** Linear.app meets a cinematic press kit.

---

## 2. Color System

All tokens live in `src/app/globals.css` under `:root` as `oklch()` values. `@theme inline` maps them to Tailwind utility names.

| Token / Usage | HEX approx | OKLCH | Role |
|---|---|---|---|
| `--background` | `#0d0d0d` | `oklch(0.09 0 0)` | Page background. Near-black, not pure black — avoids harshness on OLEDs. |
| `--card` | `#141414` | `oklch(0.12 0 0)` | Card surfaces, slightly lifted from background. ~1.4:1 internal contrast. |
| `--secondary` / `--muted` / `--input` | `#1c1c1c` | `oklch(0.16 0 0)` | Input fields, pill badges, secondary containers. |
| `--border` | `#2e2e2e` | `oklch(0.22 0 0)` | Dividers, card borders. Barely visible — structural, not decorative. |
| `--foreground` / `--primary` | `#f7f7f7` | `oklch(0.97 0 0)` | Headings, body text, primary CTA fill. ~12:1 contrast on background. WCAG AAA. |
| `--muted-foreground` | `#777` | `oklch(0.55 0 0)` | Placeholders, section labels, secondary metadata. |
| `--accent-brand` | `#4DDCE8` approx | `oklch(0.78 0.16 195)` | **The only chromatic hue in the system.** Cyan. Used for active timeline nodes, hover glows, focus rings, terminal text, company names, "Featured" tags. |
| Emerald (`bg-emerald-500`) | `#22c55e` | — | "Available" status pulse, "ONLINE" badge. Semantic green, not decorative. Used in exactly 2 places. |
| Amber (`text-amber-400`) | `#fbbf24` | — | "Actively Exploring" skill badge only. Context-semantic. |

**Logic:**
- Zero-chroma neutrals (no blue tint in the greys) keep the single `oklch(0.78 0.16 195)` cyan reading as genuinely cool without competing warmth.
- Only one true accent hue. The emerald and amber are context-semantic (availability, skill tier), not decorative chrome.
- Dark theme is the only theme — no `light` variant. The `:root` block IS the dark mode. The `@custom-variant dark` line in globals.css sets `.dark *` as override scope for shadcn components, but is not actively toggled.

**Where each lives:**
- All base tokens: `globals.css` lines 43–77.
- Brand accent applied inline via: `text-cyan-400`, `border-cyan-500/50`, `shadow-[0_0_20px_rgba(0,240,255,0.08)]` throughout components.
- Focus ring: `globals.css` line 159 — `outline: 2px solid var(--accent-brand)`.

---

## 3. Typography

**Fonts** (loaded in `src/app/layout.tsx` lines 7–23):

| Variable | Font | Weights | Used For |
|---|---|---|---|
| `--font-space-grotesk` | Space Grotesk | 300–700 | Primary sans — headlines, body, nav. Geometric but with quirky terminals (the `a`, `g`). Not Inter. |
| `--font-sans-inter` | Inter | 400–700 | Loaded but not wired into `--font-sans`. Currently unused in CSS. |
| `--font-mono-jetbrains` | JetBrains Mono | 400–700 | Loaded but `globals.css` line 10 maps `--font-mono` to `'Courier New'`, not to this variable. **Bug: JetBrains Mono is never actually applied.** |

**Scale (clamp-based, fluid):**
- H1 (hero name): `clamp(2.5rem, 5.5vw, 5.2rem)` — `HeroSection.tsx` line 109.
- H2 (hero subtitle): `clamp(1.8rem, 3.8vw, 3.5rem)` — `HeroSection.tsx` line 114.
- Section headings: `text-3xl md:text-5xl lg:text-6xl` — used consistently in all sections.
- Section labels: `text-xs tracking-[0.25em] uppercase` — `.section-label` class in `globals.css` line 128.
- Body: `text-base md:text-lg leading-relaxed` — about/hero.
- Mono metadata: `text-xs` / `text-[10px]` — badge labels, terminal HUD, credential IDs.

**Why the pairing works:** Space Grotesk's geometric construction sits between Inter (too corporate) and Clash Display (too decorative). Its `700` weight at 5.2rem has the editorial mass of a magazine cover without needing a display font import. The mono context-switching (tech metadata vs. headings) creates a readable visual grammar.

**Letter-spacing:** `tracking-tight` on all headlines (Space Grotesk `700` benefits from tighter tracking at large sizes). Section labels use `tracking-[0.25em]` — 4× the default, creating a clear hierarchy break.

**Line-height:** `leading-[1.05]` on hero H1 (tight, editorial), `leading-relaxed` (~1.625) on body paragraphs.

---

## 4. Layout and Spacing

**Grid:** `max-w-7xl mx-auto` as the consistent content container (1280px max). All sections use `px-6 md:px-12` horizontal padding.

**Section grid patterns:**
- Hero: `grid-cols-1 lg:grid-cols-12` — 7 left / 5 right split. (`HeroSection.tsx` line 94).
- About: `grid-cols-1 lg:grid-cols-12` — 7/5 again for text + manifesto card.
- Work: Linear stack with `gap-28` between case studies — editorial rhythm.
- Skills: `grid-cols-1 md:grid-cols-2` — 2-column category matrix.
- Certifications: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — standard 3-col grid.
- Visuals: CSS `columns-2 md:columns-3 gap-4 space-y-4` — masonry layout (no JS library).
- Contact: `grid-cols-1 lg:grid-cols-2 gap-20`.

**Spacing scale:** Section vertical rhythm is uniform: `py-32` (128px) top/bottom on every section. Inter-section dividers use `border-t border-neutral-900`.

**Whitespace strategy:** High whitespace inside and between sections is the primary hierarchy tool. The `gap-28` between project entries and `mb-20` on about body both use whitespace to let content breathe instead of relying on dividers.

**Responsive breakpoints:** Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px. The hero uses `lg:col-span-7` meaning the portrait stacks below 1024px. No custom breakpoints defined.

---

## 5. Motion and Interaction

**Animation stack:** GSAP 3.15 + Framer Motion 13.2 + Lenis 1.3 + tw-animate-css.

**Scroll engine:** Lenis smooth scroll is instantiated in `src/frontend/providers/SmoothScrollProvider.tsx`. It wraps the entire page, giving inertial scroll to all sections.

**GSAP usage (imperative, scroll-triggered):**
- Hero: `yPercent: 100 → 0` split-text reveal on `.hero-line` with `stagger: 0.15`, `ease: 'power4.out'`, `duration: 1.1`. (`HeroSection.tsx` lines 38–49)
- Hero background: `yPercent: 20` parallax via `ScrollTrigger` scrub. (line 59–68)
- About: `opacity/y` stagger on `.about-reveal`, `ease: 'power3.out'`. (`AboutSection.tsx` lines 51–59)
- Experience: `opacity/x: -30 → 0` per timeline entry, stagger via `delay: i * 0.08`. (`ExperienceSection.tsx` line 103)

**Framer Motion usage (declarative, viewport-triggered):**
- Work project cards: `whileInView opacity/y`, custom cubic `[0.33, 1, 0.68, 1]` ease (equivalent to Expo out). (`WorkSection.tsx` line 49)
- Certification cards: `whileHover scale: 1.02` + 3D tilt physics via `rotateX/rotateY` on `mousemove`. (`CertificationsSection.tsx` lines 47–57)
- Navigation: `variants: hidden/visible` slide-up on scroll down, `duration: 0.35`. (`Navigation.tsx` line 29)
- Preloader: `clipPath: 'inset(100% 0 0 0)'` wipe exit, cubic `[0.76, 0, 0.24, 1]`. (`Preloader.tsx` line 31)
- Lightbox / modals: `AnimatePresence` fade + scale. (`VisualsSection.tsx`, `CertificationsSection.tsx`, `ContactSection.tsx`)

**Global ambient effects:**
- `AmbientGlow` (`src/frontend/components/ui/AmbientGlow.tsx`): `radial-gradient(550px circle at cursor)` tracking mouse position — `rgba(0,240,255,0.06)`. Only runs on `pointer: fine` devices (mouse, not touch).
- `CustomCursor` (`src/components/site/CustomCursor.tsx`): Spring-physics Framer cursor (`stiffness: 500, damping: 28`), 4 states: `default` (32px ring, `mix-blend-difference`), `hover` (64px fill, `mix-blend-difference`), `view` (80px fill with "VIEW" label), `play` (80px with "PLAY"). Inner dot is CSS-positioned, 2px fixed, no lag.

**Grain overlay:** SVG feTurbulence `baseFrequency: 0.9`, `numOctaves: 4` — `opacity: 0.03`. Fixed, `pointer-events: none`, `z-index: 9999`. (`globals.css` lines 107–114)

**Durations summary:** 0.3s modals, 0.35s nav, 0.5–0.6s card reveals, 0.8s text reveals, 1.1s hero text, 2.8s terminal cycling.

**3D:** No Three.js/R3F/Spline is actually present in the codebase. The "3D" effect on certification cards is CSS `transformStyle: 'preserve-3d'` with Framer `rotateX/rotateY` driven by mouse delta — it is pure CSS perspective tilt, not WebGL. The `VisualsSection` hero background in globals.css is a radial gradient, not a canvas.

---

## 6. Techniques Used

| Technique | File | Component | Why It Works |
|---|---|---|---|
| **Cinematic grain overlay** | `globals.css` L107–114 | Applied to entire `body` via `layout.tsx` L108 | Adds analog texture to a pure-black digital surface; prevents the flat, printed feel of CSS-only dark UIs. |
| **Cursor-tracked ambient glow** | `AmbientGlow.tsx` | Layout-level, full page | The 550px radial gradient creates a volumetric light source that follows attention — it directs focus without explicit hover states. |
| **Split-line text reveal** | `globals.css` L152–155 + `HeroSection.tsx` L108–117 | Hero headlines | The `overflow: hidden` container clips the GSAP `yPercent: 100` animation — text appears to rise from the floor, not fade in. Editorial, not generic. |
| **Contextual cursor states** | `CustomCursor.tsx` | Site-wide via `data-cursor` attributes | Eliminates the need for tooltip overlays; communicates affordance (`VIEW`, `PLAY`) at the pointer level. `mix-blend-difference` on the default state inverts colors without computing backgrounds. |
| **CSS Masonry grid** | `VisualsSection.tsx` L106 | Photo gallery | `columns-2 md:columns-3 gap-4 space-y-4` — no JS Masonry library; uses native CSS columns. Cheaper layout, naturally variable item heights. |
| **3D card tilt (CSS perspective, not WebGL)** | `CertificationsSection.tsx` L35–44 | Cert cards | Mouse-position mapped to `rotateX/rotateY` via Framer `animate`. The glare `radial-gradient` shifts in sync — creates tactile physicality without Three.js overhead. |
| **Scroll-hide navigation** | `Navigation.tsx` L12–20 | Sticky nav | Hides on scroll-down (`latest > previous`), reveals on scroll-up. Maximizes reading viewport without removing wayfinding. |
| **Glassmorphism** | `ContactSection.tsx` L137, `AboutSection.tsx` L90, `HeroSection.tsx` L98 | Form panel, manifesto card, status badge | `bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md` — used sparingly (not on every card), so it retains perceptual depth. |
| **Live contextual HUD** | `HeroSection.tsx` L171–208 | Terminal card + Metric node | The cycling `codeSnippets` array rotates every 2.8s. Not animated text typing (no character-by-character), just a fade swap. Works as real-time stack documentation inside the hero. |
| **Easter egg CLI terminal** | `ContactSection.tsx` L12–58 | Footer easter egg | Typing `o` → `b` → `Enter` spawns a staggered `whoami` terminal. Disclosed on the page (`globals.css L134` hint text). Only a developer would find it — the correct audience. |
| **Live Sfax clock** | `ContactSection.tsx` L21–37 | Footer | `Intl.DateTimeFormat` with `Africa/Tunis` timezone, updates every 1s. Grounds the portfolio in a real location/time. |
| **SessionStorage preloader gate** | `Preloader.tsx` L11–16 | Full-page overlay | Runs once per session, not every navigation. Prevents the 2-second penalty on return visits. |
| **Gradient mesh (single radial)** | `HeroSection.tsx` L83 | Hero background | `radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,240,255,0.08), transparent)` — the glow comes from above the viewport edge, not centered. Off-axis placement is what makes it look intentional. |
| **Dot-grid background** | `HeroSection.tsx` L85–91 | Hero section only | `background-image: linear-gradient` intersection trick for dots at `60px 60px`, `opacity: 0.03`. Barely visible structural grid — engineering aesthetic. |
| **Scroll-driven parallax** | `HeroSection.tsx` L59–68 | `.hero-bg` div | GSAP `scrub: true` ScrollTrigger on the background layers. Background moves at 20% the scroll speed — creates depth without a canvas. |
| **Alternating layout (editorial)** | `WorkSection.tsx` L41–45 | Project cards | Even-index: `flex-row`, odd-index: `flex-row-reverse`. Breaks visual monotony in the work list without adding visual elements. |

---

## 7. Architecture

```
portfolio-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Font loading, global providers, JSON-LD schema
│   │   ├── globals.css         ← ALL design tokens (CSS custom properties, @theme)
│   │   └── page.tsx            ← Server component: DB queries → passes props to sections
│   ├── frontend/               ← Pure UI code (no DB access)
│   │   ├── sections/           ← One file per page section (Hero, About, Work, etc.)
│   │   ├── components/
│   │   │   ├── ui/             ← Reusable frontend atoms (AmbientGlow, CustomCursor, ArchitectureDiagram)
│   │   │   └── layout/         ← Layout wrappers
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx  ← Lenis instance
│   ├── components/
│   │   ├── site/               ← Site chrome (Navigation, Footer, CustomCursor, Preloader)
│   │   └── ui/                 ← shadcn primitives (button, card, dialog, input, etc.)
│   ├── backend/
│   │   ├── actions/            ← Server Actions (projects, certifications, leads, etc.)
│   │   └── db/client.ts        ← Prisma client singleton
│   ├── lib/
│   │   └── utils.ts            ← `cn()` helper
│   └── utils/supabase/         ← Supabase auth helpers (client, server, middleware)
├── prisma/
│   ├── schema.prisma           ← Data models: Project, Certification, Lead, MediaItem, Experience
│   └── seed.mjs                ← Seed script
└── public/my photos/           ← Personal brand assets (portrait, logo)
```

**Design token location:** 100% in `src/app/globals.css`. No separate `tokens.ts`, no Tailwind config file (Tailwind v4 config is inline via `@theme` in CSS). This is correct for Tailwind v4 — do not add a `tailwind.config.js`.

**Data architecture:** `app/page.tsx` is a React Server Component that calls Prisma server actions and passes typed data as props to `WorkSection`, `ExperienceSection`, `CertificationsSection`. All client-only interactivity is isolated in `'use client'` section components. The DB layer never leaks into frontend components.

**Dual cursor issue:** `CustomCursor` exists in both `src/components/site/CustomCursor.tsx` and referenced as `@/frontend/components/ui/CustomCursor` in `layout.tsx`. The import in `layout.tsx` line 4 points to `src/frontend/components/ui/CustomCursor` — verify this file exists or the cursor breaks silently.

---

## 8. "Looks AI-Generated" Check

| Element | Where | Problem | Concrete Fix |
|---|---|---|---|
| **JetBrains Mono never applied** | `layout.tsx` L19, `globals.css` L10 | `--font-mono` is wired to `'Courier New'`, not `var(--font-mono-jetbrains)`. Every `font-mono` element (terminal HUD, badge labels, credential IDs) renders in system Courier, which is wide and ugly. | In `globals.css` L10, replace `'Courier New', monospace` with `var(--font-mono-jetbrains), 'Courier New', monospace`. |
| **Placeholder Unsplash images in production** | `VisualsSection.tsx` L13–19 | 6 `defaultPhotos` use Unsplash stock URLs — Sahara desert, stock couples, stock wedding. None are your actual photography. | Replace with real Route Insolite photos from your shoots. Move them to `public/visuals/` and use local paths. |
| **Placeholder AI video covers** | `VisualsSection.tsx` L30–44 | AI video cards use Unsplash abstract covers, not actual Midjourney outputs. The video URLs are Google sample MP4s, not your work. | Replace with actual Midjourney exports or real generated frames. Even a static export screenshot is better. |
| **Fake credentials in default certs** | `CertificationsSection.tsx` L23–28 | `AWS-99201482`, `META-FS-883192` are placeholder IDs with fake `credentialUrl` domains. Clicking "Verify Credential Direct" goes to `aws.amazon.com/verification` with a fake ID — it will fail verification. | Either enter your real credential IDs via the admin panel (the DB is wired), or hide the `Verify` CTA for certs with placeholder data. |
| **Emoji tags in About** | `AboutSection.tsx` L84–87 | `📍 Sfax, Tunisia`, `🎓 IPSAS Sfax` — emoji in pill badges on a dark-tech editorial portfolio reads as playful/casual, not engineered. | Replace with icon components (Lucide `MapPin`, `GraduationCap`) at `w-3 h-3` or use a monochrome glyph. |
| **Mobile menu is non-functional** | `Navigation.tsx` L51–55 | The hamburger renders 2 divs but has no click handler, no menu panel, no state. On mobile, navigation is broken. | Implement a mobile slide-in menu using `AnimatePresence` + a state toggle. All anchors (`#work`, `#experience`, etc.) must be accessible on mobile. |
| **Inter font imported but unused** | `layout.tsx` L13–17, `globals.css` L9 | `inter` is loaded (adding ~50KB network request) but `--font-sans` is mapped to Space Grotesk. Remove the import or use it somewhere intentionally (e.g., `text-base body` content could use Inter for readability at small sizes). | Remove the `Inter` import entirely, or wire it: `--font-body: var(--font-sans-inter)` and apply to `<p>` elements. |
| **"Engineered Case Studies" heading with no cases** | `WorkSection.tsx` L147 | If the DB returns 0 projects (empty Prisma seed), the section renders just the heading and an empty stack, then jumps straight to the Architecture Diagram. No empty-state UI. | Add an empty state with a CTA pointing to the admin panel, or seed the DB with real projects. |
| **Uniform `rounded-2xl` everywhere** | All sections | Every card, badge, modal, input, and container uses `rounded-2xl` (16px). The radius monoculture makes the UI feel templated. | Introduce intentional variation: square crop containers (`rounded-none` or `rounded-sm`) for project image cards to feel more editorial; keep `rounded-full` for pills only; use `rounded-2xl` only for floating cards. |
| **`"Previous"` and `"Earlier"` as duration labels** | `ExperienceSection.tsx` L31, 42, 48, 56 | Timeline entries show "Previous" and "Earlier" instead of real years. This is placeholder copy that signals the data was not filled in. | Add real years (even approximate: "2024 — 3 months"). The Prisma Experience model has a `duration` field — populate it via the admin panel. |
