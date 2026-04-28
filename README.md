# C2B Bricks Skill

Agent skill for creating production-ready Bricks Builder and Code2Bricks output using plain HTML, CSS, and JavaScript.

It teaches AI coding agents how to generate Bricks-safe sections, components, headers, footers, landing pages, and multi-page websites with strict BEM, Bricks container markers, builder-editable hidden states, polished visual design, useful motion, and stronger copywriting.

[![Agent Skills](https://img.shields.io/badge/Agent_Skills-Compatible-blue?style=flat-square)](#)
[![Bricks Builder](https://img.shields.io/badge/Builder-Bricks-black?style=flat-square)](https://bricksbuilder.io/)
[![Code2Bricks](https://img.shields.io/badge/Workflow-Code2Bricks-orange?style=flat-square)](https://code2bricks.com/)

## Install

Install with the Agent Skills CLI:

```bash
npx skills add https://github.com/MahmudZar/C2B-Bricks-Skill
```

Then ask your coding agent for Bricks-ready output. Example prompts:

```text
Use c2b-bricks-skill. Build a Bricks-ready homepage hero for a dental clinic using HTML, CSS, and JavaScript only.
```

```text
Use c2b-bricks-skill. Create a three-page Bricks website for a boutique architecture studio: home, about, contact.
```

```text
Use c2b-bricks-skill. Review this Bricks section for BEM, builder compatibility, copy, responsive layout, and animation issues.
```

## Best Workflow

The most reliable workflow is to pair this skill with [Code2Bricks](https://code2bricks.com/).

Code2Bricks is a code-first workflow for Bricks Builder. It provides HTML, CSS, and JavaScript editors inside Bricks, Quick Import for pasted snippets, native Bricks element conversion, and bidirectional sync between code and the visual builder. The generated output is stored as native Bricks elements, CSS settings, and Code elements, so the site remains editable in Bricks.

Recommended flow:

1. Install this skill in your AI coding agent.
2. Ask the agent to generate Bricks-safe HTML, CSS, and JavaScript.
3. Paste the output into Code2Bricks Quick Import.
4. Review the generated native Bricks structure.
5. Fine-tune visually in Bricks or continue editing in Code2Bricks.

You can also use this skill with Bricks Builder's native HTML and CSS converter. Bricks can convert pasted HTML/CSS into native elements and styles, but JavaScript and external code should be reviewed according to Bricks' own safety flow.

## What This Skill Does

`c2b-bricks-skill` helps agents create:

- Bricks-ready sections and components
- Full landing pages
- Multi-page websites
- Headers and footers as separate template outputs
- BEM refactors of messy HTML or utility-heavy code
- Builder-safe accordions, tabs, drawers, menus, modals, sliders, and reveal effects
- Copywriting for landing pages, CTAs, pricing, FAQs, testimonials, forms, and microcopy
- UI reviews focused on Bricks compatibility, accessibility, responsiveness, copy, motion, and visual polish

## Output Format

For a component or section, agents should output:

```text
HTML
CSS
JavaScript
```

For a multi-page website, agents should output files by page:

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

If a page does not need JavaScript, the agent should omit that page's `.js` file and say that no JavaScript is needed for that page.

For full websites, `variables.css` contains the shared global type scale, colors, spacing, radii, shadows, and motion tokens. Add those custom properties globally in Bricks before importing the page files. Each page links to `variables.css` and its own page CSS file, and page navigation uses real file links such as `home.html`, `about.html`, and `contact.html`.

Full website page files include `html`, `head`, `body`, and `main` tags so they are valid browser documents. Code2Bricks strips those wrapper tags during import while keeping the Bricks-safe sections inside `main`.

## Bricks Rules Enforced

- Use plain HTML, CSS, and browser JavaScript.
- Use strict BEM classes.
- Add `data-bricks="container"` on intended Bricks containers.
- Use `data-component` roots and component-scoped `data-*` JavaScript hooks.
- Wrap JavaScript in `DOMContentLoaded`.
- Make JavaScript multi-instance safe.
- Add builder-visible attributes for hidden JS-driven content.
- Add Bricks empty-element guards for decorative empty elements.
- Fully define flex containers.
- Force normal text-flow elements to `display: block`.
- Keep CSS component-scoped.
- Include `prefers-reduced-motion` when motion exists.
- Avoid `transition: all`, `scale(0)` entry animations, global resets, and invented Bricks attributes.

## Scope

Allowed:

- HTML
- CSS
- JavaScript
- Browser-ready JavaScript libraries such as GSAP when explicitly useful or requested

Not allowed:

- React, Vue, Svelte, Next.js, Astro, JSX, TSX
- Tailwind, Bootstrap, shadcn/ui, CSS-in-JS
- Framework-specific component architecture
- Build-step assumptions

## Included Guidance

The skill uses progressive disclosure. The main `SKILL.md` is short, while detailed rules live in references:

- `references/bricks-contract.md`: Bricks compatibility, BEM, containers, CSS explicitness, hidden content, JavaScript scoping
- `references/output-contract.md`: component, template, page, and multi-page delivery formats
- `references/design-taste.md`: Bricks-safe adaptation of premium frontend taste guidance
- `references/copywriting.md`: concrete copywriting rules, examples, CTA rules, landing page structure, and microcopy
- `references/motion-interaction.md`: animation decisions, timing, easing, WAAPI, GSAP, hover, drag, reduced motion
- `references/implementation-blueprints.md`: tokens, accessibility, component blueprint, page blueprint
- `references/retention-protocol.md`: reinforced rules so agents do not forget critical Bricks constraints
- `references/review-checklist.md`: final acceptance checks and review priorities

## Credits

This skill repackages and adapts ideas from excellent public writing and design resources for the Bricks Builder workflow.

- Copywriting guidance is credited to Harry Dry. X/Twitter: [https://x.com/harrydry](https://x.com/harrydry)
- Design taste guidance is credited to Leonxlnx and the full Taste Skill project: [https://github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill). This skill adapts those ideas for plain HTML, CSS, JavaScript, Bricks Builder, and Code2Bricks instead of framework workflows.
- Animation and design engineering guidance is credited to Emil Kowalski's skill: [https://github.com/emilkowalski/skill](https://github.com/emilkowalski/skill)

## Repository Layout

```text
skills/
  c2b-bricks-skill/
    SKILL.md
    references/
    assets/
    scripts/
skill.sh
```

The actual agent skill lives in `skills/c2b-bricks-skill/`.

## Validation

Validate the skill package:

```bash
node skills/c2b-bricks-skill/scripts/validate-skill.mjs
```

Validate generated output saved as files:

```bash
node skills/c2b-bricks-skill/scripts/validate-output.mjs --html output.html --css output.css --js output.js
```

If the page has no JavaScript, omit `--js`. For full page files with `html`, `head`, `body`, and `main`, add `--full-page`.
