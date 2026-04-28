---
name: c2b-bricks-skill
description: Creates and reviews Bricks Builder-ready HTML, CSS, and JavaScript for Code2Bricks workflows. Use for Bricks sections, components, landing pages, headers, footers, BEM refactors, builder-safe interactions, copywriting, and visual polish. Don't use for React, Next.js, Tailwind, JSX, TSX, app frameworks, or generic frontend work outside Bricks.
---

# C2B Bricks Skill

Generate production-ready Bricks Builder output using plain HTML, CSS, and JavaScript. Prioritize Bricks compatibility, strict BEM, component-local behavior, strong visual direction, and copy that sounds written by a person.

## Core Workflow

1. Classify the request:
   - New component, section, page, header, footer, or template.
   - Existing-code review, repair, cleanup, or redesign.
   - Copywriting, design direction, animation, or accessibility improvement.
2. Read only the references required for the request:
   - Always read `references/retention-protocol.md` before generating or editing Bricks code.
   - Always read `references/bricks-contract.md` before generating or editing code.
   - Read `references/output-contract.md` before delivering code.
   - Read `references/design-taste.md` when creating or redesigning UI.
   - Read `references/copywriting.md` when writing customer-facing text.
   - Read `references/motion-interaction.md` when adding animation or JS interaction.
   - Read `references/implementation-blueprints.md` when generating new sections, pages, tokens, or accessibility-sensitive UI.
   - Read `references/review-checklist.md` when reviewing existing code.
3. Ask for missing business context only when it blocks useful output. Otherwise make conservative, Bricks-safe assumptions and state them briefly.
4. Produce complete code. Do not leave TODOs, placeholders, omitted logic, or "same as above" comments.
5. Run the final acceptance check from `references/review-checklist.md` before responding.

## Hard Stack Rules

- Use plain HTML, CSS, and JavaScript.
- Do not output React, Next.js, Vue, Svelte, Astro, JSX, TSX, Tailwind, Bootstrap, shadcn/ui, CSS-in-JS, or framework components.
- JavaScript libraries are allowed only when they are plain browser libraries and fit the request. GSAP is allowed for advanced scrolltelling, timelines, or high-polish motion when explicitly useful or requested.
- If using an external JS library, state how it must be loaded in Bricks and keep the generated component functional without framework build steps.
- Prefer no dependency for normal UI. Use CSS transitions, CSS keyframes, IntersectionObserver, and the Web Animations API first.

## Bricks Builder Requirements

- Use semantic roots such as `section`, `header`, `footer`, `nav`, `figure`, and `blockquote` where appropriate.
- Mark intended Bricks containers with `data-bricks="container"`.
- Use strict BEM classes. No utility-class piles.
- Make all JavaScript multi-instance safe by scoping behavior to a component root and using `data-*` hooks.
- Wrap all JavaScript in `DOMContentLoaded`.
- Include builder-visible states for hidden JS-driven content such as accordions, dialogs, mega menus, tabs, and mobile navigation.
- Do not invent Bricks-specific attributes. The only Bricks-specific attribute defined by this skill is `data-bricks="container"`.

## Output Rules

For component or section generation, deliver three separate fenced blocks in this order:

1. HTML
2. CSS
3. JavaScript

For complete websites with multiple pages, deliver files per page:

- `variables.css` for shared global CSS variables.
- `home.html`, `home.css`, `home.js` when JavaScript exists.
- `about.html`, `about.css`, `about.js` when JavaScript exists.
- `contact.html`, `contact.css`, `contact.js` when JavaScript exists.
- Omit a page `.js` file only when no JavaScript is needed for that page, and say so explicitly.
- Link every page to `variables.css` and its own page CSS file.
- Include full `html`, `head`, `body`, and `main` tags for full website page files because Code2Bricks strips wrapper tags during import.
- Tell the user to add the `variables.css` custom properties globally in Bricks.
- Include complete, relevant page content. Full pages should usually include sections such as hero, about/story, features or services, process, proof/testimonials, gallery or portfolio, FAQ, CTA, and contact when they fit the page goal.

For header and footer requests, deliver each template separately. Do not merge a header and footer into one combined snippet unless the user explicitly requests a combined demo.

For reviews, lead with issues and use the table format in `assets/review-template.md`.

## Design Execution

Before writing UI, choose a concrete creative direction:

- Audience: who this is for.
- Promise: what the section must make believable.
- Tone: one clear direction, such as editorial, industrial, luxury, playful, organic, brutalist, or technical.
- Memory hook: the one visual or structural detail the user should remember.

Avoid generic AI patterns: centered hero by default, equal three-card rows, purple-blue neon gradients, oversized glowing CTAs, stock handshake imagery, generic avatars, fake perfect numbers, and vague SaaS copy.

## Copywriting Rules

- Write realistic copy that could ship.
- Do not use lorem ipsum unless requested.
- Avoid em dashes, smart quotes, corporate filler, and AI landing-page phrases.
- Prefer concrete claims, visible details, and direct verbs.
- Use clear CTA labels that describe the action or value.
- Do not create short, incomplete content. Each generated page needs enough relevant sections and copy to feel usable.

## Quality Bar

Every output must be:

- Bricks-ready without framework rewrites.
- Component-scoped and safe to paste into Code2Bricks.
- Responsive without horizontal overflow.
- Accessible enough for production review.
- Visually intentional, not generic.
- Complete enough that the user can use it immediately.

## Reinforced Self-Check

Before every final answer, re-check the permanent rules in `references/retention-protocol.md`. If any rule is violated, fix the code before responding.

## Validation

When editing this skill package, run:

```bash
node skills/c2b-bricks-skill/scripts/validate-skill.mjs
```

When checking generated Bricks output saved to files, run:

```bash
node skills/c2b-bricks-skill/scripts/validate-output.mjs --html output.html --css output.css --js output.js
```

If no JavaScript file exists, omit `--js`. For full page files with `html`, `head`, `body`, and `main`, add `--full-page`.

If a validator fails, fix the reported issue and run it again.
