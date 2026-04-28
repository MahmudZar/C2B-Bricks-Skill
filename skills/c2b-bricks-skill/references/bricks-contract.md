# Bricks Builder Contract

Read this before generating or editing Bricks code.

## Bricks-First Constraints

- Output must work as Bricks Builder or Code2Bricks input without framework rewrites.
- Use plain HTML, CSS, and JavaScript.
- Start component snippets directly at the component root. Do not include `html`, `head`, `body`, or `main`.
- Keep CSS component-scoped. Do not style global tags such as `html`, `body`, `main`, `header`, `footer`, or `*`.
- `:root` is allowed for stable custom properties.

## Container Marker

When a `div` is intended to be a Bricks container, add:

```html
<div data-bricks="container" class="block-name__container"></div>
```

Use this marker only for intended containers. Do not invent other `data-bricks` values.

## BEM Naming

- Use one block name per component, such as `.pricing-comparison`.
- Use elements as `.pricing-comparison__card`.
- Use modifiers as `.pricing-comparison__card--featured`.
- Do not mix random utility classes into generated output.
- If the user provides Tailwind-like or utility-heavy markup, convert it to semantic BEM while preserving intent.

## CSS Explicitness

Bricks and builder canvases can alter defaults. Be explicit.

For flex containers, define:

```css
.example__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
```

For normal text-flow elements, force block behavior:

```css
.example__heading,
.example__copy,
.example__label {
  display: block;
}
```

Define base styles on the base class. Do not rely on inherited color, font size, spacing, or line height for important UI.

If builder or theme styles constrain layout, use `max-width: none`, `flex-basis`, and explicit widths where appropriate.

## Empty Decorative Elements

When a decorative or structural element is intentionally empty, guard against Bricks canvas minimum sizes:

```css
:where(.brx-draggable.brx-empty.example__divider),
:where(.brx-draggable:empty.example__divider) {
  min-width: 0;
  min-height: 0;
}
```

Replace `.example__divider` with the exact empty element selector.

## Hidden Content In Builder

For JS-driven hidden UI, include an optional builder-visible state:

```html
<section class="faq" data-component="faq" data-builder-open="false">
  <button class="faq__trigger" type="button" data-faq-trigger aria-expanded="false">
    Question
  </button>
  <div class="faq__panel" data-faq-panel>
    <p class="faq__text">Editable answer content</p>
  </div>
</section>
```

```css
.faq [data-faq-panel] {
  display: none;
}

.faq[data-open="true"] [data-faq-panel],
.faq[data-builder-open="true"] [data-faq-panel] {
  display: block;
}
```

This lets Bricks users force hidden content open while editing.

## JavaScript

- Wrap all behavior in `DOMContentLoaded`.
- Query roots by `data-component`.
- Query children from the root, not the document.
- Use `data-*` behavior hooks instead of styling classes.
- Avoid global IDs for reusable components.
- Guard selectors before attaching listeners.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="faq"]');

  roots.forEach((root) => {
    const triggers = root.querySelectorAll("[data-faq-trigger]");
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  });
});
```
