# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
# Miro React UI

Miro React UI is a small, accessible React design system built as a portfolio
project. It demonstrates reusable component APIs, token-driven styling,
Radix-based interaction primitives, Storybook documentation, and behavior-first
component tests.

## Goals

- Provide composable components with sensible defaults.
- Keep interaction behavior accessible by building on Radix primitives where
  appropriate.
- Treat design tokens, tests, and Storybook stories as part of the component
  contract.
- Make trade-offs visible rather than hiding them behind a large abstraction.

This repository is intentionally focused on foundational components. The
library build emits ESM, CSS tokens, and TypeScript declarations for package
consumers.

## Package usage

```bash
pnpm add miro-react-ui react react-dom
```

Import the public API and stylesheet; consumers should not import files from
`src/` or `dist/` directly:

```tsx
import { Button } from 'miro-react-ui';
import 'miro-react-ui/styles.css';
```

Build artifacts are generated with `pnpm build:lib`:

- `dist/miro-react-ui.js` — ESM component bundle, approximately 28.7 kB raw / 7.4 kB gzip.
- `dist/miro-react-ui.css` — Tailwind and design-token stylesheet, approximately 34.4 kB raw / 6.7 kB gzip.
- `dist/types/index.d.ts` — public TypeScript declarations.

Runtime libraries are externalized and declared as peer dependencies so
applications control their React, Radix, icon, toast, and styling versions.

## Component inventory

| Component | Use it for | Main alternatives |
| --- | --- | --- |
| `Button` | Actions and form submission | Use a link for navigation |
| `Badge` | Compact status or category labels | Use inline text for non-status copy |
| `Avatar` | User identity, fallbacks, and groups | Use an icon for generic entities |
| `Input` / `Textarea` | User-entered text | Use `Select` for predefined values |
| `Checkbox` | Independent boolean choices | Use `Switch` for immediate settings |
| `RadioGroup` | One choice from a short visible list | Use `Select` for long lists |
| `Select` | One choice from a space-constrained list | Use `RadioGroup` for short lists |
| `Switch` | Immediate on/off settings | Use `Checkbox` when submitting a form |
| `Progress` | Determinate task progress | Use a spinner for indeterminate work |
| `Tooltip` | Short supplemental context on hover/focus | Use inline help for persistent guidance |
| `Toaster` | Transient feedback and confirmations | Use inline errors for form validation |

## Architecture

```text
src/
├── components/
│   ├── ui/          # First-party primitive wrappers and styled primitives
│   ├── system/      # Reserved for opinionated product-level compositions
│   ├── stories/     # Storybook living documentation
│   └── __tests__/   # React Testing Library behavior tests
├── lib/             # Shared utilities such as cn()
├── styles/          # Tailwind entrypoint, fonts, and design tokens
└── test/            # Shared test setup and browser polyfills
````

The `src/components/ui/` layer contains first-party wrappers around Radix
primitives plus small styled controls such as `Input` and `Textarea`. These
components keep APIs close to their underlying primitive and remain broadly
composable.

Opinionated, multi-control compositions belong in `src/components/system/`.
The current example is `Field`, which composes labels, descriptions, errors,
and a control without changing the underlying primitive APIs. Existing
single-control wrappers remain in `src/components/ui/`.

## Usage

Run the Storybook workspace:

```bash
pnpm install
pnpm storybook
```

Example:

```tsx
import { Button } from '~/components/ui/button';

export function CreateIssueAction() {
  return <Button type="button">Create issue</Button>;
}
```

For links, use `asChild` with exactly one interactive child. The child is
replaced as the rendered element, so do not pass multiple children, fragments,
or nested interactive controls:

```tsx
<Button asChild variant="outline">
  <a href="/docs">Read documentation</a>
</Button>
```

## Design tokens

Colors and shared visual values are defined in `src/styles/themes.css` and
consumed through Tailwind classes. Components should reference tokens such as
`bg-primary-600` or `text-neutral-800`, not raw hex values.

When adding a repeated visual value, add a token first. One-off geometry values
may remain local when they describe a component-specific control size, but the
decision should be visible in the component variant definition. Arbitrary
values are reserved for component geometry or typography precision; colors
must always use semantic theme tokens.

## Accessibility

- Prefer semantic queries and keyboard interaction in tests.
- Radix primitives provide baseline keyboard, focus, and ARIA behavior for
  composite controls.
- Every form control should have an associated label.
- Invalid controls should expose `aria-invalid` and associate an error through
  `aria-describedby`.
- Tooltips supplement visible UI; they must not contain essential information.
- `Button asChild` is only valid with one interactive child such as an `<a>` or
  `<button>`; fragments, multiple children, and nested interactive controls are
  invalid compositions.
- Compose form controls with `Field`, `FieldLabel`, `FieldDescription`, and
  `FieldError`. Give the control an `id`, point the label's `htmlFor` to it, and
  reference description/error IDs through `aria-describedby`.

The Storybook configuration includes `@storybook/addon-a11y` for manual and
automated accessibility checks. Component tests cover semantic roles and key
interaction paths; browser-level coverage should be expanded as new composite
components are added.

## Verification commands

| Command                | Purpose                         |
| ---------------------- | ------------------------------- |
| `pnpm storybook`       | Start Storybook locally         |
| `pnpm build:storybook` | Build the static Storybook site |
| `pnpm test`            | Run unit/component tests        |
| `pnpm test:coverage`   | Run tests with V8 coverage      |
| `pnpm lint`            | Run ESLint                      |
| `pnpm typecheck`       | Run TypeScript validation       |
| `pnpm build:lib`       | Build package JavaScript, CSS, and declarations |

## Testing strategy

Tests use Vitest and React Testing Library. They prioritize user-observable
behavior:

- Query controls by role, label, or accessible name.
- Exercise click and keyboard interactions with `userEvent`.
- Assert state changes and emitted values rather than internal implementation
  calls.
- Keep `data-slot` and class assertions limited to stable styling contracts.

## Design decisions and trade-offs

### Radix wrappers instead of custom interaction logic

Composite controls use Radix because keyboard navigation, focus handling, and
ARIA relationships are easy to get subtly wrong. The trade-off is a slightly
larger dependency surface and APIs that remain close to Radix's composition
model.

### `cva` for finite visual variants

`Button` and `Badge` use `class-variance-authority` because their variants are
finite and should be discoverable in TypeScript. Free-form `className` remains
available for layout composition; it is not used to define product state.

### Storybook as the component contract

Stories document default, variant, disabled, and composition states. They are
not a replacement for tests: Storybook explains visual usage, while Vitest
proves behavior and regression cases.

## Current scope and roadmap

The current release focuses on foundational controls. The next high-value
additions are stronger browser interaction coverage for composite controls and
more opinionated system-level compositions as real use cases emerge.
