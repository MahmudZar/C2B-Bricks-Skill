# Review and Acceptance Checklist

Read this before final delivery and when reviewing existing Bricks code.

## Review Format

For code reviews, lead with findings. Use `assets/review-template.md`.

Prioritize:

1. Bricks compatibility bugs.
2. Broken behavior or multi-instance JS problems.
3. Accessibility failures.
4. Responsive layout failures.
5. Framework or dependency violations.
6. Copywriting and design quality issues.

## Final Acceptance Checklist

Before shipping generated code, verify:

## Stack

- Uses plain HTML, CSS, and JavaScript.
- No React, Next.js, JSX, TSX, Tailwind, Bootstrap, component libraries, or CSS-in-JS.
- Any external JavaScript library is browser-ready and explicitly justified.

## Bricks

- Intended containers use `data-bricks="container"`.
- No invented Bricks-specific attributes.
- Hidden JS-driven UI has builder-visible controls.
- Headers and footers are separate template outputs when requested together.

## HTML

- Starts at the component root.
- Uses semantic elements where appropriate.
- Uses meaningful alt text.
- Has logical heading hierarchy.
- Interactive elements use correct elements and ARIA attributes.

## CSS

- Uses strict BEM.
- Avoids global tag styling.
- Defines flex containers explicitly.
- Forces text-flow elements to `display: block`.
- Uses base styles on base classes.
- Handles mobile layout without horizontal overflow.
- Includes focus states.
- Includes reduced-motion overrides when motion exists.
- Avoids `transition: all`.

## JavaScript

- Wrapped in `DOMContentLoaded`.
- Scoped to component roots.
- Uses `data-*` hooks for behavior.
- Guards missing elements.
- Works with multiple instances.
- Cleans up observers, timers, or GSAP timelines when applicable.

## Copy

- No lorem ipsum unless requested.
- No em dashes.
- No smart quotes.
- No banned AI copy phrases from `references/copywriting.md`.
- CTA labels are specific and calm.
- Demo content is realistic and industry-aware.

## Design

- Has a clear creative direction.
- Avoids generic AI layout patterns.
- Uses consistent spacing, radii, color roles, and typography.
- Adds interaction states where users expect them.
- Does not over-animate frequent actions.

## If A Check Fails

Fix the output before presenting it. Do not mention failed internal checks unless the user asks for the review process.
