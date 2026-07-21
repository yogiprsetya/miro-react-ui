# CLAUDE.md

This file provides guidance to LLM when working in this repository.

## Project Overview

This is an open-source **React Design System** — a reusable component library built to demonstrate production-grade UI architecture, accessibility, and testing practices. It is a portfolio-grade project intended to showcase senior frontend engineering capability (component API design, documentation, testing discipline), not just visual styling.

**Primary goals of this repo:**

1. Reusable, well-documented, accessible components
2. Clear component API design with sensible defaults and composability
3. Strong test coverage demonstrating engineering rigor
4. Storybook as living documentation for every component and its states

## Tech Stack

| Tool                      | Purpose                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| **Vite**                  | Build tool & dev server                                                                      |
| **React + TypeScript**    | Component implementation                                                                     |
| **shadcn/ui**             | Base primitive components (copied into repo, not installed as a dependency — see note below) |
| **Tailwind CSS**          | Styling / design tokens                                                                      |
| **Storybook**             | Component documentation & visual testing                                                     |
| **Vitest**                | Unit & component testing                                                                     |
| **React Testing Library** | Component behavior testing (used with Vitest)                                                |

> **Note on shadcn/ui**: shadcn is not an npm package — components are generated via CLI and live directly in `src/components/ui/`. Treat these as first-party, editable source code, not a vendored dependency. Customize freely to fit this design system's tokens.

## Common Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run storybook        # Start Storybook on :6006

# Build
npm run build             # Production build via Vite
npm run build-storybook   # Static Storybook build (for deployment)

# Testing
npm run test               # Run Vitest once
npm run test:watch         # Run Vitest in watch mode
npm run test:coverage      # Run Vitest with coverage report
npm run test -- Button     # Run tests matching "Button"

# Lint / Type check
npm run lint
npm run typecheck

# Add a new shadcn primitive
npx shadcn@latest add [component-name]
```

## Architecture & Folder Structure

```
src/
├── components/
│   ├── ui/              # low-level primitives and styled controls
│   │   └── [component-name].tsx
│   ├── system/          # opinionated compositions built from primitives
│   │   └── [component-name].tsx
│   ├── stories/
│   │   └── [component-name].story.tsx
│   └── __tests__/
│       └── [component-name].spec.tsx
├── lib/
│   └── utils.ts          # cn() helper, shared utilities
├── styles/
│   └── index.css         # Tailwind base + global config
│   └── themes.css         # design tokens (Tailwind variables)
└── ...
```

**Component pattern to follow for every new component:**

- Put low-level reusable controls in `src/components/ui/`.
- Put opinionated multi-control compositions in `src/components/system/`.
- Export public components through `src/index.ts`; use layer barrels internally.
- Props typed explicitly with a documented TypeScript interface (no `any`)
- Variants driven by `class-variance-authority` (cva) pattern, consistent with shadcn conventions

Dependency direction is one-way: `ui` primitives may be composed by `system`
components, and consumers import from the public package entry point. A system
component owns layout and policy; it should not make primitive consumers depend
on the system layer.

## Design Tokens

All colors, spacing, radii, and typography are defined as CSS variables in `src/styles/themes.css`. **Never hardcode raw hex values or arbitrary Tailwind values (`text-[#123456]`) in components** — always reference a token. If a needed token doesn't exist, add it to the token file first, then use it.

Arbitrary values are only acceptable for component-specific geometry or exact
typographic precision (for example, a documented avatar size or line-height).
Do not use arbitrary colors; add a semantic theme token instead. Keep focus,
disabled, invalid, and placeholder styles aligned across form controls.

## Testing Conventions

- Every component must have a test file covering: default render, all documented variants/props, and any interactive behavior (click, keyboard nav, disabled state).
- Use React Testing Library queries by role/label, not by test-id, unless there's no accessible alternative.
- Accessibility is a first-class concern: test for correct ARIA roles/attributes where relevant (this is a differentiator for a portfolio design system).
- Run `npm run test:coverage` before considering a component "done" — target meaningful coverage, not just a number.

## Storybook Conventions

- Every component needs a `component/stories/[name].stories.tsx` with at minimum: a `Default` story and one story per variant/state (loading, disabled, error, etc.).
- Use `argTypes` to expose all props as interactive controls.
- Write a short docstring at the top of each story file describing when to use the component vs. alternatives (this becomes the README-in-context in Storybook's autodocs).

## README & Documentation Standard

Every component and the repo root README should follow this structure, since this project is portfolio-facing:

1. **Problem** — what UI problem this component/system solves
2. **API** — props table with types and defaults
3. **Usage examples** — code snippets for common cases
4. **Design decisions / trade-offs** — why built this way vs. alternatives

## Commit & PR Conventions

- Conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`) — this repo is public-facing and commit history is part of the portfolio signal.
- Each component addition should be its own PR/commit series: component + tests + story together, not split across unrelated commits.

## What Claude Should Prioritize When Contributing Here

1. **Correctness and accessibility over speed** — this repo exists to demonstrate engineering quality.
2. **Never add a component without a test and a story** — incomplete components hurt the portfolio signal more than missing components.
3. **Prefer composition over configuration** — favor composable primitives (similar to Radix/shadcn philosophy) over components with dozens of boolean props.
4. **Keep bundle size in mind** — this is a design system; avoid unnecessary dependencies. Justify any new dependency in the PR description.
5. **Document trade-offs, not just usage** — when implementing a component, add a short note in the story or README on why a particular approach was chosen (this is the detail that signals senior-level thinking to reviewers).

---

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
