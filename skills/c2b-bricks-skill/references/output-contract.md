# Output Contract

Use this reference before delivering generated Bricks code.

## Choose The Delivery Mode

Classify the request before output:

- Component or section snippet: deliver three fenced blocks.
- Header or footer template: deliver separate template outputs.
- Full single page: deliver page files.
- Multi-page website: deliver one HTML file, one CSS file, and one optional JS file per page.
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

When the user asks for a complete website with multiple pages, output files by page name.

Required naming:

```text
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
- Create a `.js` file only when that page has JavaScript behavior.
- If a page has no JavaScript, say "No JavaScript needed for this page" after that page's CSS file instead of creating empty JS.
- Use lowercase kebab-case file names: `case-studies.html`, `case-studies.css`, `case-studies.js`.
- Keep each page self-contained unless the user explicitly requests shared global files.
- If shared files are requested, use `shared.css` and `shared.js`, but still include page-specific files when page-specific styles or behavior exist.
- Do not merge all pages into one HTML file unless the user explicitly asks for a single-page demo.
- Include navigation links that point to the correct page file names.
- Keep Bricks section structure inside each page. For Code2Bricks page imports, each major page section should still use Bricks-compatible markup and BEM.

Example output shape:

```text
about.html
```

```html
<section class="about-hero" data-component="about-hero">
  <div data-bricks="container" class="about-hero__container">
    <h1 class="about-hero__title">We build clinics patients remember</h1>
  </div>
</section>
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

- Start at the component root.
- Do not include `html`, `head`, `body`, or `main`.
- Use semantic elements where appropriate.
- Use one clear component root with `data-component="block-name"` when JavaScript exists.
- Use realistic content. Do not output lorem ipsum unless requested.

For full standalone page files, include complete page HTML only when the user explicitly asks for standalone browser files. If the output is meant for Code2Bricks or Bricks section import, keep the page as Bricks-compatible sections without `html`, `head`, or `body`.

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
