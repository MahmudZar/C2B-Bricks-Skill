# Design Taste For Bricks

This reference adapts premium frontend design guidance for Bricks Builder and Code2Bricks. Use the ideas from high-end frontend skills, but implement them only with Bricks-safe HTML, CSS, and browser JavaScript. Do not output React, Next.js, Tailwind, JSX, TSX, Framer Motion, shadcn/ui, or package imports.

## Active Baseline Configuration

Set these dials mentally for every generation:

- `DESIGN_VARIANCE`: 8 by default. 1 is symmetrical and predictable. 10 is highly asymmetric and editorial.
- `MOTION_INTENSITY`: 6 by default. 1 is static. 10 is cinematic and choreographed.
- `VISUAL_DENSITY`: 4 by default. 1 is art-gallery spacious. 10 is dense dashboard cockpit.

Always adapt the dials to the user's prompt:

- Minimal, calm, expensive: lower variance, lower density, restrained motion.
- Brutalist, editorial, campaign: higher variance, sharper contrast, bolder structure.
- SaaS dashboard: medium variance, higher density, functional motion.
- Luxury brand: spacious density, restrained palette, high typography quality.
- Landing page: strong value hierarchy, proof, CTAs, memorable hero structure.

## Vanilla Bricks Architecture

- Use HTML, CSS, and JavaScript only.
- Use BEM classes, not utility classes.
- Use CSS Grid for complex layouts.
- Use flex only for one-dimensional alignment and define flex properties explicitly.
- Use inline SVG or CSS-built icons when icons are needed. Do not import icon packages.
- Use `min-height: 100dvh` for full-height hero sections, not `height: 100vh`.
- Avoid complex percentage flex math for multi-column structures. Use `grid-template-columns`.
- Use `max-width`, `margin-inline: auto`, and explicit container padding in CSS instead of Tailwind container utilities.

Example viewport-safe hero:

```css
.hero {
  display: block;
  min-height: 100dvh;
  padding: 0;
}

.hero__container {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
  align-items: center;
  gap: clamp(2rem, 6vw, 6rem);
  max-width: 88rem;
  margin-inline: auto;
  padding: clamp(5rem, 8vw, 8rem) 1.5rem;
}
```

## Dependency Verification

Default to no dependency. If a user requests a browser JS library such as GSAP:

1. State the required script before the code.
2. Use browser-ready syntax.
3. Keep all markup and styling Bricks-safe.
4. Scope all animation selectors to the component root.
5. Provide cleanup for timelines, ScrollTriggers, observers, timers, and event listeners when practical.

Do not suggest `npm install` for Bricks snippets unless the user is building a separate bundler workflow.

## Anti-Emoji Policy

Do not use emojis in markup, text content, alt text, or code comments unless the user explicitly requests an emoji-based brand style. Use inline SVG, CSS shapes, text labels, or accessible icon alternatives.

## Design Engineering Directives

### 1. Deterministic Typography

- Use a strong display face for headlines and a readable body face when fonts are allowed.
- Avoid Inter for "premium" or creative work unless the user provides it as the brand font.
- Prefer distinctive sans fonts such as Geist, Outfit, Satoshi, Cabinet Grotesk, or a strong system fallback.
- Use serif fonts only for editorial, luxury, cultural, or publication-style designs. Never use serif as the default for technical dashboards.
- Use the global heading and text variables from `references/implementation-blueprints.md` for balanced/symmetrical output.
- For full websites, place heading and text variables in `variables.css` and reuse them across all pages.
- Keep paragraphs around 55 to 75 characters per line.
- Use color, spacing, weight, and rhythm for hierarchy, not just huge font sizes.

Example:

```css
:root {
  --h1: clamp(2.25rem, 1.8214rem + 2.1429vw, 3.75rem);
  --h2: clamp(1.875rem, 1.5536rem + 1.6071vw, 3rem);
  --h3: clamp(1.5rem, 1.2857rem + 1.0714vw, 2.25rem);
  --h4: clamp(1.25rem, 1.0714rem + 0.8929vw, 1.875rem);

  --text-12: 0.75rem;
  --text-14: 0.875rem;
  --text-16: 1rem;
  --text-18: 1.125rem;
  --text-20: 1.25rem;
}

.feature__title {
  display: block;
  max-width: 10ch;
  margin: 0;
  font-family: "Satoshi", "Inter", system-ui, sans-serif;
  font-size: var(--h1);
  line-height: 0.92;
  letter-spacing: -0.06em;
}
```

### 2. Color Calibration

- Use one dominant neutral system and one primary accent unless the brand demands more.
- Avoid default purple-blue AI gradients.
- Avoid neon button glows unless the brand is intentionally gaming, cyberpunk, or nightlife.
- Avoid pure black `#000000`; use charcoal, ink, zinc, or off-black.
- Keep accent saturation controlled.
- Do not mix warm and cool grays by accident.

### 3. Layout Diversification

When `DESIGN_VARIANCE` is above 4, do not default to centered hero sections.

Use:

- Split screen with text left and proof/media right.
- Asymmetric white space.
- Offset media with varied aspect ratios.
- Editorial masthead with side notes.
- Sticky proof panel beside scrollable content.
- Bento grid with uneven column spans.
- Horizontal media strip or timeline.
- Large left-aligned headline with a small dense proof cluster.

Collapse high-variance layouts to a strict single-column layout below 768px.

### 4. Materiality, Shadows, And Anti-Card Overuse

- Use cards only when containment communicates hierarchy.
- For dense dashboards, prefer borders, dividers, bands, and negative space over boxed cards everywhere.
- When shadows are used, tint them toward the background hue and keep them soft.
- Glass effects need more than blur: add a border, inner highlight, and fallback color.

Example glass panel:

```css
.overview__panel {
  display: block;
  background: color-mix(in srgb, #ffffff 72%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.48),
    0 24px 70px rgba(31, 28, 24, 0.12);
  backdrop-filter: blur(18px);
}
```

### 5. Interactive UI States

Do not generate only the happy static state when the component implies interaction.

Include where relevant:

- Loading skeletons matching actual layout sizes.
- Empty states that explain what belongs there and how to add it.
- Inline error states for forms.
- Success states for submitted or completed actions.
- Disabled states.
- Focus-visible states.
- Active press feedback.

Forms:

- Label above input.
- Optional helper text below label or input.
- Error text below input.
- Inputs grouped with consistent spacing.
- Button copy describes the action or outcome.

## Creative Proactivity

Use these concepts when they fit the request. Implement with CSS, browser JavaScript, Web Animations API, IntersectionObserver, SVG, Canvas, or GSAP when justified.

### Navigation And Menus

- Dock magnification: nav icons or labels scale subtly on hover with CSS or pointer tracking.
- Magnetic button: a CTA pulls slightly toward the cursor using pointer events and transform.
- Gooey menu: sub-items feel physically connected using SVG filters or CSS blur tricks.
- Dynamic island: a pill-shaped status/nav element expands to show contextual content.
- Contextual radial menu: options expand around the click location.
- Floating speed dial: one button opens secondary actions in an arc or vertical stack.
- Mega menu reveal: full-width panel with staggered content and builder-visible state.

### Layout And Grids

- Bento grid: asymmetric tiles with purposeful hierarchy.
- Masonry-like layout: staggered media heights using CSS grid or columns when suitable.
- Chroma grid: subtle animated border or tile color movement.
- Split-screen scroll: two halves move at different rates.
- Curtain reveal: hero media or title parts reveal from the center.

### Cards And Containers

- Parallax tilt card: pointer-tracked transform with reduced-motion fallback.
- Spotlight border card: border light follows cursor.
- Glass panel: blur plus real edge definition.
- Holographic foil card: controlled iridescent gradients on hover.
- Swipe stack: drag cards with pointer capture and velocity thresholds.
- Morphing modal: a button expands into a dialog-like panel using CSS/WAAPI.

### Scroll Animation

- Sticky scroll stack: cards pin and stack as the page scrolls.
- Horizontal scroll gallery: vertical scroll drives horizontal translation only when expected and accessible.
- Zoom parallax: media scales subtly as section enters viewport.
- SVG path progress: line draws as user scrolls.
- Liquid transition: use sparingly for campaign or experimental pages.

### Galleries And Media

- Dome gallery: curved or radial gallery impression with transforms.
- Coverflow carousel: centered active item with angled side items.
- Drag-to-pan grid: large media canvas with pointer drag.
- Accordion image slider: strips expand on hover/focus.
- Hover image trail: small previews follow pointer for editorial interactions.
- Glitch effect: brief RGB shift only when brand tone supports it.

### Typography And Text

- Kinetic marquee: endless text band with speed control and reduced-motion fallback.
- Text mask reveal: large text clipping media or gradient.
- Text scramble: use for technical/cyber aesthetics only.
- Circular text path: SVG text path around a spinning or static badge.
- Gradient stroke animation: outlined text with moving stroke.
- Kinetic typography grid: letters respond to pointer or scroll.

### Micro-Interactions And Effects

- Particle button: use Canvas or small DOM particles after a success action.
- Pull-to-refresh: only for mobile-style experiences.
- Skeleton shimmer: subtle, layout-matched loading state.
- Directional hover-aware button: fill enters from pointer side.
- Ripple click: wave starts from click coordinates.
- Animated SVG line drawing: diagrams, routes, process lines.
- Mesh gradient background: organic moving blobs with reduced-motion fallback.
- Lens blur depth: focus foreground action by softly blurring background layers.

## Bento 2.0 For Bricks

Use this for modern SaaS dashboards, AI feature sections, analytics panels, or product demos.

### Core Design

- High-end, minimal, and functional.
- Background around `#f9fafb` or a brand-specific off-white.
- Surfaces are white or near-white with 1px borders and very soft diffusion shadows.
- Use generous internal padding such as `clamp(1.5rem, 3vw, 2.5rem)`.
- Major containers may use large radii such as `2rem` to `2.5rem`.
- Place labels and descriptions outside or below cards when a gallery-like presentation is stronger.
- Use monospace for numbers in dense data modules.

### Animation Engine

Since this is Bricks, do not use Framer Motion. Use:

- CSS transitions for hover and state changes.
- CSS keyframes for simple loops.
- Web Animations API for timeline-like vanilla motion.
- GSAP only for complex timelines or ScrollTrigger choreography.

Every animated card needs a clear active state: pulse, typewriter, float, shimmer, carousel, reordering illusion, progress, or live status.

Keep infinite loops subtle and pause/remove them with `prefers-reduced-motion`.

### Five Bento Archetypes

1. Intelligent list: items reorder or highlight to imply prioritization.
2. Command input: prompt text cycles through realistic tasks, with cursor and processing state.
3. Live status: breathing indicator, notification badge, schedule chip, or alert pulse.
4. Wide data stream: horizontal metric carousel with a loop that feels effortless.
5. Contextual UI: document, dashboard, or canvas with highlighted text and floating toolbar.

## AI Tells To Avoid

### Visual And CSS

- No default neon outer glows.
- No pure black.
- No oversaturated accents.
- No excessive gradient text.
- No custom mouse cursors.
- No pointless blob backgrounds.
- No global `z-index: 9999` habits.

### Typography

- Avoid Inter for premium or creative work unless required by the brand.
- Do not make H1 huge just to create drama.
- Use serif only when the direction supports it.

### Layout And Spacing

- Avoid generic three-column card rows.
- Avoid awkward floating elements.
- Align edges precisely.
- Use a consistent spacing rhythm.
- Let some layouts breathe. Do not fill every empty area.

### Content And Data

- No John Doe or Jane Doe.
- No generic user avatars.
- No predictable fake numbers such as 99.99%, 50%, 10x, or 1234567.
- No generic startup names such as Acme, Nexus, SmartFlow, or Apex.
- No filler copy from `references/copywriting.md`.

### External Resources

- Avoid broken image URLs.
- Prefer stable placeholders, local image paths, or product-relevant media.
- Do not use Unsplash links that are likely to break or return unrelated images.

## Final Design Preflight

Before delivering:

- Is the layout mobile-safe and free of horizontal overflow?
- Does a high-variance layout collapse cleanly below 768px?
- Does the hero use `min-height: 100dvh` when full-height behavior is needed?
- Are empty, loading, error, focus, hover, active, and disabled states included where relevant?
- Are cards used because they communicate hierarchy, not because the model defaulted to cards?
- Are costly loops, filters, and pointer effects isolated and reduced for motion-sensitive users?
- Does the result look specific to this business, or could it be pasted into any SaaS site?
