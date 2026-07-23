# Miro React UI

[![CI](https://github.com/yogiprsetya/miro-react-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/yogiprsetya/miro-react-ui/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/yogiprsetya/miro-react-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/yogiprsetya/miro-react-ui)

Miro React UI is a small, accessible React design system for foundational
product controls. It demonstrates composable TypeScript APIs, token-driven
styling, Radix-based interaction primitives, Storybook documentation, and
behavior-first component tests.

The project is intentionally focused: it favors clear contracts and explicit
composition over a large abstraction layer. Every public component is backed by
tests and a Storybook story, with accessibility treated as part of the API.

## Installation

```bash
pnpm add miro-react-ui react react-dom
```

The package supports React 18 and React 19:

```text
react: ^18.0.0 || ^19.0.0
react-dom: ^18.0.0 || ^19.0.0
```

The package declares these runtime libraries as peer dependencies so consuming
applications control their versions:

- `class-variance-authority`
- `clsx`
- `lucide-react`
- `radix-ui`
- `sonner`
- `tailwind-merge`

## Quick start

Import components from the package entry point and load the generated
stylesheet once in the application entry point:

```tsx
import { Button, Input } from 'miro-react-ui';
import 'miro-react-ui/styles.css';

export function CreateIssueForm() {
  return (
    <form>
      <Input aria-label="Issue title" placeholder="Issue title" />
      <Button type="submit">Create issue</Button>
    </form>
  );
}
```

Consumers should import from the public package entry point, not from `src/`
or internal `dist/` files.

## Component guide

| Component     | Use it for                                                      | Prefer an alternative when                                        |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| `Button`      | Actions and form submission                                     | The interaction is navigation; use a link                         |
| `Badge`       | Compact status or category labels                               | The text is ordinary content, not a status                        |
| `Avatar`      | User identity, fallbacks, and groups                            | The entity is generic; use an icon                                |
| `Input`       | Single-line user-entered text                                   | The value comes from a fixed set; use `Select`                    |
| `Textarea`    | Multi-line user-entered text                                    | The value is short and single-line; use `Input`                   |
| `Checkbox`    | Independent boolean choices submitted with a form               | The setting applies immediately; use `Switch`                     |
| `RadioGroup`  | One choice from a short, visible list                           | The list is long or space-constrained; use `Select`               |
| `Select`      | One choice from a space-constrained list                        | Several options should be visible at once; use `RadioGroup`       |
| `Switch`      | Immediate on/off settings                                       | The value is submitted as part of a form; use `Checkbox`          |
| `Progress`    | Determinate task progress                                       | Work has no measurable percentage; use a spinner                  |
| `Tooltip`     | Short supplemental context on hover or focus                    | The information is essential; render it visibly                   |
| `Toaster`     | Transient feedback and confirmations                            | The message is validation or persistent state; use inline UI      |
| `FieldLayout` | Explicitly composed label, help text, control, and error layout | Automatic form relationships are required; use a form abstraction |

## API reference

All components accept the native props of their underlying HTML element or
Radix primitive unless noted otherwise. `className` is available for layout
composition, while public visual states should use typed variants.

### `Button`

| Prop                | Type                             | Default   |
| ------------------- | -------------------------------- | --------- |
| `variant`           | `'solid' \| 'outline'`           | `'solid'` |
| `size`              | `'sm' \| 'md' \| 'lg'`           | `'md'`    |
| `asChild`           | `boolean`                        | `false`   |
| native button props | `React.ComponentProps<'button'>` | —         |

Use `asChild` with exactly one interactive child. It renders the child through
Radix Slot rather than rendering a `<button>` itself:

```tsx
<Button asChild variant="outline">
  <a href="/docs">Read documentation</a>
</Button>
```

`disabled` has native behavior only for a button. An anchor does not support a
native disabled state; for an unavailable link, remove its `href` or implement
`aria-disabled`, focus, and click handling in the consuming application.

### `Badge`

| Prop      | Type                   | Default   |
| --------- | ---------------------- | --------- |
| `variant` | `'solid' \| 'outline'` | `'solid'` |
| `size`    | `'sm' \| 'md'`         | —         |
| `asChild` | `boolean`              | `false`   |

Use badges for compact status or category labels. Do not use them as the only
way to communicate an important state; pair color with text or another visible
cue.

## API conventions

The component APIs follow these shared rules:

- **Size vocabulary:** use `sm`, `md`, and `lg` consistently. `Avatar` also
  supports `xl` and `2xl` as display sizes because avatars commonly need larger
  identity treatments; these are not introduced into other controls by default.
- **Variant implementation:** use `class-variance-authority` for finite public
  variants that consumers select (`variant`, `size`). Use conditional class
  maps for internal geometry that is derived from a prop or context. Do not
  expose styling-only class names as public variants.
- **Metadata:** every public component emits `data-slot`. Components with a
  public `variant` or `size` emit matching `data-variant` or `data-size` values.
  Metadata is intended for testing and targeted styling, not as a replacement
  for accessible semantics.
- **Composition:** `asChild` renders the component through Radix Slot and
  requires exactly one child. The child becomes the rendered element and must
  provide its own native semantics; `Button asChild` does not add disabled
  behavior to anchors.
- **State models:** controls that wrap Radix primitives preserve their native
  controlled and uncontrolled props (`value`/`defaultValue`,
  `checked`/`defaultChecked`, and corresponding change callbacks). Visual
  wrappers such as `Badge`, `Button`, and `Avatar` are stateless.
- **Accessibility:** public state must remain available through semantic HTML,
  ARIA, or visible text. `data-*` attributes are diagnostic metadata only.

### Form controls

`Input` and `Textarea` preserve their native HTML APIs. `Checkbox`, `Switch`,
`RadioGroup`, and `Select` preserve the corresponding Radix APIs, including
controlled and uncontrolled usage.

| Component        | Additional public props                                              |
| ---------------- | -------------------------------------------------------------------- |
| `Input`          | Native input props, including `type`, `disabled`, and `aria-invalid` |
| `Textarea`       | Native textarea props, including `disabled` and `aria-invalid`       |
| `Checkbox`       | Radix checkbox props plus `size: 'sm' \| 'md' \| 'lg'`               |
| `Switch`         | Radix switch props plus `size: 'sm' \| 'md' \| 'lg'`                 |
| `RadioGroupItem` | Radix item props plus `size: 'sm' \| 'md' \| 'lg'`                   |
| `Select` family  | Radix select root, trigger, content, item, and composition props     |

Use a visible `Label` associated with every form control. The library does not
infer labels from placeholders.

### `Avatar`

`Avatar` is a compound component composed from `AvatarImage` and
`AvatarFallback`. `AvatarGroup` provides shared sizing for child avatars.

| Prop               | Type                                    | Default |
| ------------------ | --------------------------------------- | ------- |
| `Avatar.size`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'xl'`  |
| `AvatarGroup.size` | same as `Avatar.size`                   | `'xl'`  |

`AvatarBadge` is decorative by default. If it communicates status, provide an
accessible label such as `aria-label="Online"`; otherwise mark it
`aria-hidden="true"`.

### `Progress`

`Progress` represents a fixed percentage from `0` to `100`. Omit `value` for
an indeterminate progress indicator. The visual indicator and `aria-valuenow`
are clamped to this fixed range.

### `FieldLayout`

`FieldLayout` is a layout/composition primitive, not an automatic form
controller.
Consumers own IDs and accessible relationships:

```tsx
<FieldLayout>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    aria-invalid="true"
    aria-describedby="email-help email-error"
  />
  <FieldDescription id="email-help">
    Use your work email address.
  </FieldDescription>
  <FieldError id="email-error">Enter a valid email address.</FieldError>
</FieldLayout>
```

This explicit contract keeps `FieldLayout` compatible with controls outside
this library, but consumers must provide the associations correctly. `Field`
remains available as a deprecated compatibility alias.

## Architecture

```text
src/
├── components/
│   ├── ui/          # Reusable primitives and styled single-control wrappers
│   ├── system/      # Opinionated multi-control compositions
│   ├── stories/     # Storybook living documentation
│   └── __tests__/   # React Testing Library behavior tests
├── lib/             # Shared utilities such as cn()
├── styles/          # Tailwind entrypoint, fonts, and design tokens
└── test/            # Shared test setup and browser polyfills
```

The `ui/` layer keeps APIs close to native elements or Radix primitives. The
`system/` layer owns policy and layout for compositions such as `FieldLayout`.
Components are exported through `src/index.ts`; consumers should not depend on
internal file paths.

## Design tokens

Shared colors and visual values live in `src/styles/themes.css` and are
consumed through semantic Tailwind classes such as `bg-primary-600` and
`text-neutral-800`.

When adding a repeated visual value, add a token first. One-off geometry or
typographic precision may remain local when it is component-specific. Raw color
values should only appear in the token definitions, not component markup.

## Accessibility contract

- Use semantic elements and query controls by role, label, or accessible name.
- Radix primitives provide baseline keyboard navigation, focus handling, and
  ARIA behavior for composite controls.
- Every form control needs an associated visible `Label`.
- Invalid controls should expose `aria-invalid` and reference their error with
  `aria-describedby`.
- Tooltips supplement visible UI and must not contain essential information.
- `Button asChild` requires exactly one interactive child and does not add
  disabled behavior to anchors.
- `FieldLayout` requires explicit `id`, `htmlFor`, and `aria-describedby` wiring.
- `AvatarBadge` is decorative when empty; add an accessible label when it
  communicates status. `AvatarGroup` is visual grouping only and does not add
  list or navigation semantics.

The Storybook workspace includes `@storybook/addon-a11y`. Vitest tests cover
semantic roles and key keyboard paths; browser-level accessibility coverage is
expanded as composite components are added.

Storybook is the living component contract. Each public component should have
a default story, documented variants, important interaction states, and a
short usage/accessibility note. Use controls to inspect supported props and
interaction stories to verify behavior that cannot be expressed by a static
screenshot.

## Development

```bash
pnpm install
pnpm storybook          # Start Storybook on port 6006
pnpm test               # Run unit/component tests
pnpm test:coverage      # Run tests with V8 coverage
pnpm lint               # Run ESLint
pnpm typecheck          # Run TypeScript validation
pnpm build:lib          # Build ESM, CSS, and declarations
pnpm build:storybook    # Build the static Storybook site
```

The CI workflow runs install, lint, typecheck, tests, coverage, library build,
and Storybook build for pushes and pull requests targeting `master` or `main`.

## Verification and package outputs

`pnpm build:lib` produces:

- `dist/miro-react-ui.js` — ESM component bundle
- `dist/miro-react-ui.css` — Tailwind and design-token stylesheet
- `dist/types/index.d.ts` — public TypeScript declarations

The library build externalizes React, Radix, icons, toast, and styling runtime
dependencies. This keeps the published bundle small and lets applications own
dependency versions. Generated directories such as `dist/`, `coverage/`, and
`storybook-static/` are not source files and should not be committed.

## Testing strategy

Tests prioritize user-observable behavior:

- Query controls by role, label, or accessible name.
- Exercise click and keyboard interactions with `userEvent`.
- Assert state changes and emitted values rather than implementation calls.
- Cover default, variant, disabled, invalid, and composition states.
- Keep `data-slot` and class assertions limited to stable styling contracts.

Storybook explains visual usage and composition. Vitest proves behavior and
regression cases. Neither replaces the other.

## Design decisions

### Radix wrappers instead of custom interaction logic

Composite controls use Radix because keyboard navigation, focus management, and
ARIA relationships are easy to implement incorrectly. The trade-off is a
larger peer dependency surface and APIs that remain close to Radix's model.

### `cva` for finite visual variants

`Button` and `Badge` use `class-variance-authority` because their visual states
are finite and discoverable in TypeScript. Free-form `className` remains
available for layout composition, not product state.

### Explicit field relationships

`FieldLayout` does not generate IDs or mutate a child control's ARIA attributes. This
keeps the primitive compatible with external controls and avoids hidden DOM
mutation, at the cost of requiring consumers to compose relationships
explicitly. `Field` remains a deprecated alias during the naming transition.

## Contributing and release policy

Before opening a pull request, run:

```bash
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build:lib
pnpm build:storybook
```

Component changes should include the implementation, behavior tests, and
Storybook documentation in the same change. Public API changes must update
this README and explain the compatibility impact in the pull request.

The repository uses Conventional Commit prefixes such as `feat:`, `fix:`,
`docs:`, `test:`, and `refactor:`. Versioning and package publication should
follow semver: breaking public API changes require a major version, additive
backward-compatible features require a minor version, and fixes require a
patch version. The current repository is a portfolio-focused package and does
not claim an automated npm release pipeline.

## Current scope

The current release focuses on foundational controls. Future high-value work
includes stronger browser interaction coverage for composite controls, more
opinionated system-level compositions based on real use cases, and a formal
release workflow when the package has external consumers.
