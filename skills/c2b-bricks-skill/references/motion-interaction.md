# Motion and Interaction

Read this when adding animation, hover effects, reveal behavior, accordions, tabs, sliders, drawers, menus, dialogs, or GSAP.

## Animation Decision Framework

Before writing any animation, answer these questions in order.

### 1. Should This Animate?

| Frequency | Decision |
| --- | --- |
| 100+ times per day, such as keyboard shortcuts or command toggles | No animation |
| Tens of times per day, such as hover effects and list navigation | Remove or drastically reduce |
| Occasional, such as modals, drawers, tabs, accordions, toasts | Standard animation |
| Rare or first-time, such as onboarding or campaign moments | Can add delight |

Never animate keyboard-initiated actions. Repeated actions should feel immediate.

### 2. What Is The Purpose?

Valid purposes:

- Feedback: a button press confirms input.
- Spatial continuity: a drawer leaves the way it entered.
- State indication: a morphing button, open panel, or active tab shows what changed.
- Preventing jarring changes: content appears or disappears without feeling broken.
- Explanation: a marketing animation demonstrates how a product works.

Do not animate just because the design feels empty.

### 3. What Easing Should It Use?

- Entering or exiting: use a strong ease-out.
- Moving or morphing on screen: use ease-in-out.
- Hover or color change: use a short ease.
- Constant motion such as marquees: use linear.
- Default if uncertain: use ease-out.

Do not use `ease-in` for UI entry. It starts slow and feels delayed.

## Timing

- Button press: 100ms to 160ms.
- Tooltip or small popover: 125ms to 200ms.
- Dropdown or select: 150ms to 250ms.
- Drawer or modal: 200ms to 500ms.
- UI animation should usually stay under 300ms.
- Exit should be faster than enter.

## Easing Tokens

Use custom curves:

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

## Performance

Animate:

- `transform`
- `opacity`
- `clip-path`
- `filter` sparingly

Do not animate:

- `width`
- `height`
- `margin`
- `padding`
- `top`
- `left`
- `font-size`

Never use `transition: all`.

## Interaction Rules

- Every clickable element needs visible focus and press feedback.
- Use `transform: scale(0.97)` or an equivalent subtle press state.
- Gate hover effects behind:

```css
@media (hover: hover) and (pointer: fine) {
  .example__button:hover {
    transform: translateY(-2px);
  }
}
```

- Do not animate from `scale(0)`. Start from `scale(0.95)` with opacity.
- Use transitions for interruptible UI. Use keyframes for predetermined loops.

## Button Press Feedback

Every clickable or tappable element must have press feedback.

```css
.cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 160ms var(--c2b-ease-out);
}

.cta__button:active {
  transform: scale(0.97);
}
```

Keep the scale subtle, usually between `0.95` and `0.98`.

## Never Animate From scale(0)

Nothing in the real world appears from nothing. Start from `scale(0.95)` or higher and combine it with opacity.

```css
.modal__panel {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 250ms var(--c2b-ease-out),
    transform 250ms var(--c2b-ease-out);
}

.modal[data-open="true"] .modal__panel {
  opacity: 1;
  transform: scale(1);
}
```

## Stagger Strategy

Use staggered entrance for repeated items when it adds rhythm.

```css
.card-grid__item {
  display: block;
  opacity: 0;
  transform: translateY(8px);
  animation: card-grid-fade-in 300ms var(--c2b-ease-out) forwards;
}

.card-grid__item:nth-child(1) { animation-delay: 0ms; }
.card-grid__item:nth-child(2) { animation-delay: 50ms; }
.card-grid__item:nth-child(3) { animation-delay: 100ms; }
.card-grid__item:nth-child(4) { animation-delay: 150ms; }

@keyframes card-grid-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Keep stagger delays between 30ms and 80ms per item. Never block interaction while stagger animations play.

## Asymmetric Enter And Exit Timing

Exit animations should be faster than enter animations.

```css
.drawer__panel {
  transition: transform 350ms var(--c2b-ease-drawer);
}

.drawer[data-closing="true"] .drawer__panel {
  transition-duration: 200ms;
}
```

The user is done with the element and expects it to leave quickly.

## CSS Transitions Over Keyframes For Interruptible UI

Use transitions for toggles, tabs, accordions, drawers, filters, and components users may trigger rapidly. Transitions can retarget mid-motion. Keyframes restart from zero.

Use keyframes for:

- Loading shimmer.
- Marquee loops.
- Decorative background movement.
- Predetermined entrance sequences.

## Blur To Mask Crossfades

When a crossfade between two states looks like two objects overlapping, add subtle blur during the transition.

```css
.swap__item {
  transition:
    opacity 220ms var(--c2b-ease-out),
    filter 220ms var(--c2b-ease-out);
}

.swap__item[aria-hidden="true"] {
  opacity: 0;
  filter: blur(2px);
}
```

Keep blur under 20px. Heavy blur is expensive, especially in Safari.

## clip-path For Advanced Animation

Use `clip-path: inset()` for:

- Reveal animations.
- Hold-to-confirm fills.
- Scroll-triggered media reveals.
- Directional hover fills.

Example reveal:

```css
.image-reveal__media {
  display: block;
  opacity: 0;
  clip-path: inset(0 0 100% 0);
  transition:
    opacity 500ms var(--c2b-ease-out),
    clip-path 700ms var(--c2b-ease-out);
}

.image-reveal[data-visible="true"] .image-reveal__media {
  opacity: 1;
  clip-path: inset(0 0 0 0);
}
```

## @starting-style

Use `@starting-style` for modern entry animation when browser support is acceptable.

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 400ms var(--c2b-ease-out),
    transform 400ms var(--c2b-ease-out);

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

Use a `data-mounted` attribute pattern when broader support is needed.

## translateY Percentages

Percentage values in `translate()` are relative to the element itself. Use `translateY(100%)` to move an element by its own height without hardcoded pixels.

## Gesture And Drag Interactions

For drag-dismiss, swipe, or card stack behavior:

- Calculate velocity with `Math.abs(dragDistance) / elapsedTime`.
- Treat a quick flick as dismissal when velocity exceeds roughly `0.11`.
- Apply damping when the user drags beyond the natural boundary.
- Use pointer capture after drag starts.
- Ignore extra touch points after the initial drag begins.
- Respect reduced motion and keyboard alternatives.

## Reduced Motion

If motion uses transform, parallax, scroll reveal, stagger, or looping animation, include:

```css
@media (prefers-reduced-motion: reduce) {
  .example__animated {
    animation: none;
    transition: opacity 0.2s ease;
    transform: none;
  }
}
```

Reduced motion should remove movement while preserving useful opacity or color feedback.

## JavaScript Motion

Default to:

- CSS transitions for state changes.
- CSS keyframes for simple loops.
- IntersectionObserver for scroll-triggered reveals.
- Web Animations API for programmatic vanilla motion.

WAAPI example:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll('[data-component="feature-reveal"]');

  roots.forEach((root) => {
    const target = root.querySelector("[data-feature-reveal-media]");
    if (!target) return;

    target.animate(
      [
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0 0)", opacity: 1 }
      ],
      {
        duration: 600,
        fill: "forwards",
        easing: "cubic-bezier(0.23, 1, 0.32, 1)"
      }
    );
  });
});
```

Use GSAP when:

- The user requests GSAP.
- ScrollTrigger-style choreography is central to the design.
- A timeline is clearer and more reliable than hand-written animation code.

When using GSAP:

- State the dependency before code.
- Scope selectors to the component root.
- Prefer `gsap.context()` when available.
- Kill timelines and ScrollTriggers on teardown when practical.
- Keep the HTML, CSS, and JS Bricks-compatible.

## Perceived Performance

Animation affects how fast the site feels:

- A 180ms select feels more responsive than a 400ms select.
- Fast feedback on press makes a button feel reliable.
- Instant tooltips after the first tooltip is open can make a toolbar feel faster.
- Easing changes perceived speed. Ease-out at 200ms feels faster than ease-in at 200ms because movement begins immediately.
