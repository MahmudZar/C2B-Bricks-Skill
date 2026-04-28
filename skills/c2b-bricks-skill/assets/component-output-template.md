# Component Output Template

Use this structure for normal Bricks component delivery.

## HTML

```html
<section class="block-name" data-component="block-name">
  <div data-bricks="container" class="block-name__container">
    <!-- Complete component markup -->
  </div>
</section>
```

## CSS

```css
:root {
  --block-name-bg: #f7f4ee;
  --block-name-text: #171512;
  --block-name-muted: #6d665c;
  --block-name-accent: #9c5b32;
  --block-name-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

.block-name {
  display: block;
  padding: 0;
  background: var(--block-name-bg);
  color: var(--block-name-text);
}

.block-name__container {
  display: block;
  padding: clamp(4rem, 8vw, 7rem) 1.5rem;
}
```

## JavaScript

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="block-name"]');

  roots.forEach((root) => {
    if (!root) return;
  });
});
```
