# Retention Protocol

Read this at the start of every Bricks generation task and before final delivery. This file exists to prevent long-context drift.

## Permanent Rules

These rules remain active for the whole conversation. They do not expire.

- Use only HTML, CSS, and browser JavaScript.
- Do not use React, Next.js, Vue, Svelte, Astro, JSX, TSX, Tailwind, Bootstrap, shadcn/ui, CSS-in-JS, or framework components.
- Use strict BEM classes.
- Mark intended Bricks containers with `data-bricks="container"`.
- Do not invent Bricks-specific attributes. Only `data-bricks="container"` is defined by this skill.
- Use `data-component` on roots that have JavaScript behavior.
- Use component-scoped `data-*` hooks for JavaScript behavior.
- Wrap JavaScript in `DOMContentLoaded`.
- Make JavaScript multi-instance safe.
- Include builder-visible attributes for hidden JS-driven content.
- Fully define flex containers.
- Set text-flow elements to `display: block`.
- Keep CSS component-scoped.
- Avoid global tag styling.
- Guard empty decorative elements against Bricks canvas minimum size.
- Include `prefers-reduced-motion` when motion exists.
- Gate hover effects behind `@media (hover: hover) and (pointer: fine)`.
- Add active press feedback to clickable elements.
- Do not use `transition: all`.
- Do not animate from `scale(0)`.
- Do not use em dashes, smart quotes, lorem ipsum, or banned AI copy phrases.

## Required Mental Loop

Before writing code, silently run:

1. What is the block name?
2. Which elements are Bricks containers?
3. Which parts need JavaScript?
4. Which JavaScript hooks need `data-*` attributes?
5. Which content can be hidden and therefore needs builder-visible controls?
6. Which empty decorative elements need the Bricks empty guard?
7. Which text elements need `display: block`?
8. Which flex elements need explicit flex properties?
9. Which motion needs reduced-motion fallback?
10. Which output format applies: component blocks, template blocks, page files, or multi-page files?

## JavaScript Hook Pattern

Use this pattern whenever a component has behavior:

```html
<section class="example" data-component="example">
  <div data-bricks="container" class="example__container">
    <button class="example__toggle" type="button" data-example-toggle aria-expanded="false">
      Toggle panel
    </button>
    <div class="example__panel" data-example-panel>
      Editable content
    </div>
  </div>
</section>
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="example"]');

  roots.forEach((root) => {
    const toggle = root.querySelector("[data-example-toggle]");
    const panel = root.querySelector("[data-example-panel]");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(next));
      root.setAttribute("data-open", String(next));
    });
  });
});
```

## Builder-Visible Hidden Content Pattern

Any accordion, mobile menu, tab panel, modal, drawer, mega menu, or expandable region must be editable in Bricks even if JavaScript does not run.

```html
<section class="faq" data-component="faq" data-builder-open="false">
  <div data-bricks="container" class="faq__container">
    <button class="faq__trigger" type="button" data-faq-trigger aria-expanded="false">
      How does setup work?
    </button>
    <div class="faq__panel" data-faq-panel>
      <p class="faq__text">You send the brief. We return the first working page within 48 hours.</p>
    </div>
  </div>
</section>
```

```css
.faq__panel {
  display: none;
}

.faq[data-open="true"] .faq__panel,
.faq[data-builder-open="true"] .faq__panel {
  display: block;
}
```

Valid builder attributes:

- `data-builder-open="true|false"`
- `data-builder-visible="true|false"`
- `data-preview-state="open|closed"`

These are conventions for editability, not Bricks API attributes.

## Empty Element Guard Pattern

Use this for intentionally empty decorative elements:

```html
<span class="hero__orb" aria-hidden="true"></span>
```

```css
.hero__orb {
  display: block;
  width: 18rem;
  height: 18rem;
  border-radius: 999rem;
}

:where(.brx-draggable.brx-empty.hero__orb),
:where(.brx-draggable:empty.hero__orb) {
  min-width: 0;
  min-height: 0;
}
```

Do not add empty guards to normal content elements.

## CSS Explicitness Pattern

```css
.example__layout {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 2rem;
}

.example__title,
.example__copy,
.example__label {
  display: block;
}
```

## Final Retention Check

Before responding, verify:

- Every JS behavior has matching `data-*` attributes in HTML.
- Every hidden behavior has a builder-visible state.
- Every intended Bricks container has `data-bricks="container"`.
- Every empty decorative element has the empty guard.
- Every output file or code block follows `references/output-contract.md`.
- Every major copy line passes `references/copywriting.md`.
- Every design decision avoids generic patterns from `references/design-taste.md`.
