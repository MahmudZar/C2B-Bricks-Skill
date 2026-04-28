# Output Contract

Use this reference before delivering generated Bricks code.

## Choose The Delivery Mode

Classify the request before output:

- Component or section snippet: deliver three fenced blocks.
- Header or footer template: deliver separate template outputs.
- Full single page: deliver full page files.
- Multi-page website: deliver linked page files plus shared `variables.css`.
- Existing code edit: preserve the user's provided delivery format unless it violates Bricks constraints.

## Component Output

Return exactly three code blocks in this order:

```html
<!-- HTML -->
```

```css
/* CSS */
```

```javascript
// JavaScript
```

If no JavaScript is required, still include the JavaScript block with:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // No JavaScript needed for this component.
});
```

## Full Page And Multi-Page Website Output

When the user asks for a complete website, full site, or multiple linked pages, treat it as a real website instead of isolated page snippets.

Required naming:

```text
variables.css

home.html
home.css
home.js

about.html
about.css
about.js

contact.html
contact.css
contact.js
```

Rules:

- Create one `.html` file and one `.css` file for every page.
- Create `variables.css` for shared site variables, typography scale, color roles, spacing rhythm, radii, shadows, and motion tokens.
- Tell the user to add the `variables.css` custom properties globally in their Bricks site before importing page files.
- Link every page to `variables.css` and its own page CSS file.
- Navigation links must point to the matching page files, such as `home.html`, `about.html`, and `contact.html`.
- Page CSS files may use variables from `variables.css`; do not redefine the shared token system inside each page.
- Create a `.js` file only when that page has JavaScript behavior.
- If a page has no JavaScript, say "No JavaScript needed for this page" after that page's CSS file instead of creating empty JS.
- Use lowercase kebab-case file names: `case-studies.html`, `case-studies.css`, `case-studies.js`.
- Do not use `shared.css` for tokens. Use `variables.css`.
- Use `shared.js` only if the user asks for shared JavaScript or multiple pages genuinely share the same behavior.
- Do not merge all pages into one HTML file unless the user explicitly asks for a single-page demo.
- Keep Bricks section structure inside each page. For Code2Bricks page imports, each major page section should still use Bricks-compatible markup and BEM.
- For Code2Bricks full-page imports, include full document structure with `html`, `head`, `body`, and `main`. Code2Bricks strips those wrapper tags during import, so full page files should remain valid browser documents while preserving Bricks-safe section markup inside `main`.
- Do not generate thin or incomplete pages. Include the relevant sections each page needs to feel complete.
- Consider common page sections: hero, about/story, features/services, process, proof/testimonials, gallery/portfolio, pricing/packages, FAQ, CTA, and contact.
- Use sections based on page intent. Do not include every section blindly, but include enough relevant content that the page can stand on its own.

Example output shape:

```text
variables.css
```

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

  --lh-h1: clamp(2.5rem, 1.823rem + 2.5189vw, 3.75rem);
  --lh-h2: clamp(2.25rem, 1.8438rem + 1.5113vw, 3rem);
  --lh-h3: clamp(2rem, 1.7292rem + 1.0076vw, 2.5rem);
  --lh-h4: clamp(1.75rem, 1.4792rem + 1.0076vw, 2.25rem);
  --lh-body-20: 1.75rem;
  --lh-body-18: 1.75rem;
  --lh-body-16: 1.5rem;
  --lh-body-14: 1.25rem;
  --lh-body-12: 1rem;
  --heading-line-height: calc(4px + 2ex);
  --text-line-height: calc(6px + 2ex);
}
```

```text
about.html
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>About - Northline Studio</title>
    <link rel="stylesheet" href="variables.css" />
    <link rel="stylesheet" href="about.css" />
  </head>
  <body>
    <main class="about-page">
      <section class="about-hero" data-component="about-hero">
        <div data-bricks="container" class="about-hero__container">
          <h1 class="about-hero__title">We build clinics patients remember</h1>
        </div>
      </section>
    </main>
    <script src="about.js"></script>
  </body>
</html>
```

```text
about.css
```

```css
.about-hero {
  display: block;
  padding: 0;
}
```

```text
about.js
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="about-hero"]');
  roots.forEach((root) => {
    if (!root) return;
  });
});
```

For a page with no JavaScript:

```text
contact.html
contact.css
No JavaScript needed for this page.
```

## HTML Boundaries

- For component, section, header, and footer snippets, start at the component root.
- For component, section, header, and footer snippets, do not include `html`, `head`, `body`, or `main`.
- For full page or full website files intended for Code2Bricks import, include `html`, `head`, `body`, and `main`.
- Use semantic elements where appropriate.
- Use one clear component root with `data-component="block-name"` when JavaScript exists.
- Use realistic content. Do not output lorem ipsum unless requested.

## CSS Boundaries

- Scope CSS to the component block.
- Use `:root` only for stable custom properties.
- Do not style global tags.
- Do not use universal resets.
- Include responsive rules for small screens.
- Prevent horizontal overflow.
- Include `prefers-reduced-motion` when motion uses transform, parallax, scroll reveal, or looping animation.

## JavaScript Boundaries

- Use no build step.
- Use browser APIs or plain browser-ready library code only.
- Use component-local selectors.
- Clean up timers, observers, and GSAP timelines when applicable.
- Keep the snippet safe with multiple instances of the same component on one page.

## Header and Footer Templates

For header requests:

- Deliver the header template only.
- Include mobile navigation behavior if needed.
- Include a builder-visible state for menus and mega menus.

For footer requests:

- Deliver the footer template only.
- Avoid header navigation behavior unless explicitly requested.

For "header and footer" requests:

- Deliver two separate outputs: Header, then Footer.
- Each output gets its own HTML, CSS, and JavaScript blocks.

## Existing Code Edits

- Preserve the user's existing visual direction unless redesign is requested.
- Keep naming churn low unless converting utility-heavy code to BEM.
- Explain major structural changes briefly after the code.
- Do not replace working code with a new design when the user asked for a fix.

## External Libraries

Allowed only for plain browser JavaScript.

When using GSAP or another JS library:

- State the dependency explicitly before the code.
- Use a browser-ready script URL or Bricks asset loading note.
- Keep the component BEM and Bricks-compatible.
- Register plugins only when needed.
- Kill timelines, ScrollTriggers, observers, and intervals in cleanup logic when practical.

Do not use framework libraries, component packages, Tailwind, JSX, or CSS-in-JS.
