# Implementation Blueprints

Read this when generating a new Bricks component, section, full page, or reusable pattern.

## Default Token System

If the user provides design tokens, use those first. Do not replace an existing system.

If the user does not provide a design system, include a minimal token system for stable, reusable decisions.

### Typography Tokens

Use this exact global type scale for the default balanced/symmetrical Bricks output. For full websites, place it in `variables.css` and tell the user to add these variables globally in Bricks.

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
```

Use these variables consistently:

- H1 elements use `font-size: var(--h1)`.
- H2 elements use `font-size: var(--h2)`.
- H3 elements use `font-size: var(--h3)`.
- H4 elements use `font-size: var(--h4)`.
- Body and UI copy use `--text-12` through `--text-20`.

Only deviate for a deliberate high-variance editorial design, and keep the base variables available.

### Motion Tokens

Include easing tokens when motion exists.

```css
:root {
  --c2b-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --c2b-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --c2b-ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
  --c2b-duration-fast: 150ms;
  --c2b-duration-normal: 250ms;
  --c2b-duration-slow: 400ms;
}
```

### What To Tokenize

Tokenize values that are reused or likely to be adjusted globally:

- typography scale
- color roles
- spacing rhythm
- repeated radii
- repeated shadows
- easing curves
- durations

Do not tokenize every one-off value. Tokenize design primitives, not noise.

## Accessibility Baseline

- Use meaningful alt text.
- Maintain WCAG AA contrast for important text.
- Keep heading hierarchy logical.
- Use real buttons and links for interactive elements.
- Add `aria-expanded`, `aria-controls`, `aria-selected`, `aria-current`, or `aria-hidden` when the pattern needs it.
- Keep focus visible with `:focus-visible`.
- Do not hide focus outlines without replacing them.
- Make hover-only content accessible by focus or click.
- Add `prefers-reduced-motion` when motion exists.
- Avoid custom cursors.
- Do not rely on color alone to communicate state.

Focus example:

```css
.pricing__button:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--pricing-accent) 70%, white);
  outline-offset: 4px;
}
```

## Bricks-Oriented Component Blueprint

Use this blueprint as the default mental model for a section with content and media.

```html
<section class="feature-showcase" data-component="feature-showcase">
  <div data-bricks="container" class="feature-showcase__container">
    <div class="feature-showcase__layout">
      <div class="feature-showcase__content">
        <p class="feature-showcase__eyebrow">Built for teams shipping weekly</p>
        <h2 class="feature-showcase__title">Launch the page before the campaign goes cold</h2>
        <p class="feature-showcase__text">
          Send the brief on Monday. Review a working Bricks-ready page by Wednesday.
        </p>
        <a class="feature-showcase__button" href="#contact">Book a 15-minute walkthrough</a>
      </div>
      <figure class="feature-showcase__media">
        <img
          class="feature-showcase__image"
          src="https://picsum.photos/seed/c2b-bricks-product/1200/900"
          alt="Marketing team reviewing a live landing page layout"
        />
      </figure>
    </div>
  </div>
</section>
```

```css
:root {
  --feature-showcase-bg: #0f1115;
  --feature-showcase-surface: #181c24;
  --feature-showcase-text: #f4f2ec;
  --feature-showcase-muted: rgba(244, 242, 236, 0.72);
  --feature-showcase-accent: #c9a66b;
  --feature-showcase-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

.feature-showcase {
  display: block;
  padding: 0;
  background: var(--feature-showcase-bg);
  color: var(--feature-showcase-text);
}

.feature-showcase__container {
  display: block;
  max-width: 88rem;
  margin-inline: auto;
  padding: clamp(4rem, 8vw, 7rem) 1.5rem;
}

.feature-showcase__layout {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: clamp(2rem, 5vw, 5rem);
}

.feature-showcase__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-basis: 48%;
  max-width: none;
}

.feature-showcase__eyebrow,
.feature-showcase__title,
.feature-showcase__text {
  display: block;
}

.feature-showcase__eyebrow {
  margin: 0 0 1rem;
  color: var(--feature-showcase-accent);
  font-size: 0.875rem;
  line-height: 1.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.feature-showcase__title {
  margin: 0;
  color: var(--feature-showcase-text);
  font-size: clamp(2.25rem, 5vw, 4.75rem);
  line-height: 0.96;
  letter-spacing: -0.055em;
}

.feature-showcase__text {
  max-width: 36rem;
  margin: 1.25rem 0 0;
  color: var(--feature-showcase-muted);
  font-size: 1.125rem;
  line-height: 1.65;
}

.feature-showcase__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  min-height: 3rem;
  padding: 0 1.15rem;
  color: #12100c;
  background: var(--feature-showcase-accent);
  border-radius: 999rem;
  text-decoration: none;
  transition:
    transform 160ms var(--feature-showcase-ease-out),
    background-color 160ms var(--feature-showcase-ease-out);
}

.feature-showcase__button:active {
  transform: scale(0.97);
}

.feature-showcase__button:focus-visible {
  outline: 3px solid rgba(201, 166, 107, 0.45);
  outline-offset: 4px;
}

.feature-showcase__media {
  display: block;
  flex-basis: 48%;
  max-width: none;
  margin: 0;
  overflow: hidden;
  border-radius: 2rem;
  background: var(--feature-showcase-surface);
}

.feature-showcase__image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 28rem;
  object-fit: cover;
}

@media (hover: hover) and (pointer: fine) {
  .feature-showcase__button:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .feature-showcase__layout {
    flex-direction: column;
  }

  .feature-showcase__content,
  .feature-showcase__media {
    flex-basis: auto;
  }

  .feature-showcase__image {
    min-height: 20rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-showcase__button {
    transition: background-color 160ms ease;
  }
}
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="feature-showcase"]');

  roots.forEach((root) => {
    if (!root) return;
  });
});
```

## Page Blueprint

For multi-section pages, use independent BEM blocks per major section:

```html
<section class="home-hero" data-component="home-hero">
  <div data-bricks="container" class="home-hero__container"></div>
</section>

<section class="home-proof">
  <div data-bricks="container" class="home-proof__container"></div>
</section>

<section class="home-process">
  <div data-bricks="container" class="home-process__container"></div>
</section>
```

Do not use one giant block for an entire page unless the page is truly a single component.

## Full Website Blueprint

For full websites, output linked files and shared variables:

```text
variables.css
home.html
home.css
about.html
about.css
contact.html
contact.css
```

Include page `.js` files only when a page needs behavior.

`variables.css`:

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

  --site-bg: #f7f4ee;
  --site-text: #171512;
  --site-muted: #6d665c;
  --site-accent: #9c5b32;
  --site-border: rgba(23, 21, 18, 0.14);
  --site-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}
```

Page files:

- Include `<!doctype html>`, `html`, `head`, `body`, and `main`.
- Link `variables.css` before the page CSS.
- Link to other pages with real file names.
- Keep all Bricks-importable sections inside `main`.
- Use `data-bricks="container"` inside each section where container behavior is intended.

Example page shell:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Home - Northline Studio</title>
    <link rel="stylesheet" href="variables.css" />
    <link rel="stylesheet" href="home.css" />
  </head>
  <body>
    <main class="home-page">
      <section class="home-hero" data-component="home-hero">
        <div data-bricks="container" class="home-hero__container">
          <nav class="home-hero__nav" aria-label="Primary navigation">
            <a class="home-hero__link" href="home.html">Home</a>
            <a class="home-hero__link" href="about.html">About</a>
            <a class="home-hero__link" href="contact.html">Contact</a>
          </nav>
          <h1 class="home-hero__title">Clinics patients remember after the first visit</h1>
        </div>
      </section>
    </main>
    <script src="home.js"></script>
  </body>
</html>
```
