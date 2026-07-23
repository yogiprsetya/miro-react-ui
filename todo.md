# Code Review TODO — `miro-react-ui`

## Portfolio readiness

**Score saat ini: 7.5/10**

Repo sudah menunjukkan struktur component library, TypeScript discipline, Radix composition, Storybook, test suite, accessibility awareness, design tokens, library build, lint/typecheck, dan README yang cukup matang.

Belum mencapai level production-mature karena masih ada gap pada API consistency, accessibility contracts, documentation completeness, dan verification depth.

## Priority 1 — Bersihkan README dan jadikan documentation-first ✅

**Impact: sangat tinggi**

- Hapus template Vite di bagian awal `README.md`:
  - `# React + TypeScript + Vite`
  - bagian `React Compiler`
  - bagian `Expanding the ESLint configuration`
- Jadikan `# Miro React UI` heading pertama.
- Tambahkan API table per komponen utama.
- Dokumentasikan supported React versions.
- Dokumentasikan peer dependency installation.
- Tambahkan contribution workflow dan CI quality gates.
- Tambahkan release/versioning policy.
- Tambahkan link ke Storybook/demo.

First impression reviewer dimulai dari README, bukan source code.

## Priority 2 — Perbaiki kontrak `Progress` dan `Field` ✅

**Impact: sangat tinggi**

### `Progress`

File: `src/components/ui/progress.tsx:7-12,21-24`

Masalah: visual value diklamp ke `0–100`, tetapi `aria-valuemin` dan `aria-valuemax` dapat menerima custom range. Contoh `value={120}` dan `aria-valuemax={10}` menghasilkan visual dan ARIA range yang tidak konsisten.

Pilih kontrak yang tegas:

- fixed `0–100` dan jangan expose custom range attributes.

Tambahkan regression tests.

### `Field`

File: `src/components/system/field.tsx:5-8`

Masalah: `Field` hanya layout primitive. Consumer harus mengatur sendiri `id`, `htmlFor`, `aria-describedby`, dan `aria-invalid`.

Pilih salah satu:

- rename menjadi `FieldLayout`; `Field` dipertahankan sebagai deprecated compatibility alias.

Dokumentasikan keputusan tersebut secara eksplisit.

## Priority 3 — Tetapkan API convention lintas komponen

**Impact: tinggi**

Saat ini vocabulary ukuran tidak konsisten:

- `Button`: `sm | md | lg` — `src/components/ui/button.tsx:16-22`
- `Checkbox`, `Switch`, `RadioGroupItem`: `sm | md | lg`
- `Badge`: `small | medium` — `src/components/ui/badge.tsx:18-21`
- `Avatar`: `sm | md | lg | xl | 2xl` — `src/components/ui/avatar.tsx:5`

Action:

- Standarkan size names menjadi `sm | md | lg`.
- Dokumentasikan `xl`/`2xl` Avatar sebagai display sizes jika memang diperlukan.
- Tetapkan policy penggunaan CVA versus conditional class maps.
- Standarkan `data-slot`, `data-variant`, dan controlled/uncontrolled behavior.
- Dokumentasikan `asChild` semantics secara konsisten.

## Priority 4 — Perluas contract tests dan axe tests

**Impact: tinggi**

Test suite saat ini:

- 15 test files passed
- 91 tests passed
- Statements: 100%
- Branches: 95.65%
- Functions: 100%
- Lines: 100%

Namun line coverage belum mencakup seluruh public contract.

Tambahkan tests untuk:

- semua size variant `Checkbox`, `Switch`, dan `RadioGroup`
- `Badge` `small` dan `medium`
- `Progress` custom ARIA range
- `Button` disabled dengan `asChild`
- Select open-state accessibility
- Tooltip accessibility
- RadioGroup/Switch axe scan
- Toaster live-region behavior
- Avatar badge semantics

Axe suite saat ini hanya mencakup Input, Checkbox, dan beberapa form state di `src/components/__tests__/accessibility.spec.tsx:14-73`. Tambahkan coverage untuk `Select`, `Tooltip`, `RadioGroup`, `Switch`, dan `Toaster`.

Bersihkan warning test berikut:

- `HTMLCanvasElement's getContext()` tidak terimplementasi.
- `No story files found for src/**/*.mdx`.

## Priority 5 — Lengkapi Storybook sebagai living component contract

**Impact: tinggi**

Tambahkan atau perbaiki:

- story khusus `Label` — public export di `src/index.ts:18`, tetapi belum memiliki story mandiri
- story `Badge Medium`
- interaction story untuk `Switch`
- disabled interaction story untuk `Checkbox`
- horizontal orientation story untuk `Field`
- warning story untuk disabled link pada `Button asChild`
- edge-case stories untuk `Progress`
- semantic documentation untuk `AvatarBadge` dan `AvatarGroup`

Story Avatar saat ini memakai nama berbasis pixel seperti `Size24`, `Size32`, `Size48`, dan `Size96` di `src/components/stories/avatar.stories.tsx:54-88`. Gunakan nama yang mengikuti public API seperti `Small`, `Medium`, `Large`, dan `ExtraLarge`.

Setiap story sebaiknya menjawab:

1. Kapan komponen digunakan?
2. Kapan tidak digunakan?
3. Apa behavior dan accessibility contract-nya?

## Detailed review findings

### Architecture

- Folder structure sudah jelas dan cukup scalable.
- Separation `ui/` dan `system/` sudah benar.
- Public exports terpusat di `src/index.ts`.
- Design tokens digunakan konsisten; tidak ditemukan raw hex di implementasi komponen.
- `ui/` masih mencampur Radix wrappers, native controls, feedback, dan identity components. Masih dapat diterima, tetapi perlu documented grouping policy jika library berkembang.

### Component API

- Props umumnya mengikuti DOM/Radix API melalui `React.ComponentProps`.
- Tidak ditemukan penggunaan `any`.
- `Button` memiliki sensible defaults dan typed variants.
- `Badge` size behavior belum dites atau didokumentasikan secara lengkap.
- `Button asChild` dengan anchor tidak mendukung native disabled behavior. File: `src/components/ui/button.tsx:31-50`; test: `src/components/__tests__/button.spec.tsx:75-86`.
- `AvatarBadge` adalah empty `span` secara default dan belum memiliki semantic guidance. File: `src/components/ui/avatar.tsx:79-101`.
- `AvatarGroup` dan `AvatarGroupCount` menggunakan plain `div`; dokumentasikan apakah sifatnya decorative atau perlu list/link semantics. File: `src/components/ui/avatar.tsx:104-146`.

### Storybook/documentation

- Storybook tersedia untuk hampir semua component family.
- Docstrings cukup baik pada beberapa stories, terutama Button dan Field.
- `Label` tidak memiliki dedicated story.
- State coverage antar story belum simetris dengan public API.
- README sudah cukup matang, tetapi masih tercampur dengan template Vite dan belum menjadi API reference lengkap.

### Code quality/consistency

Validation yang berhasil dijalankan:

- `pnpm test:coverage`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build:lib`

Bundle library:

| Artifact |      Raw |    Gzip |
| -------- | -------: | ------: |
| JS       | 28.93 kB | 7.44 kB |
| CSS      | 33.55 kB | 6.68 kB |

Ukuran bundle masih wajar untuk library kecil. Runtime dependencies sudah diexternalize di `vite.lib.config.ts:26-35`.

Beberapa arbitrary values perlu direview apakah seharusnya menjadi token:

- Button tracking di `src/components/ui/button.tsx:17-19`
- Label typography di `src/components/ui/label.tsx:14`
- Avatar small text di `src/components/ui/avatar.tsx:66`
- Tooltip arrow transforms di `src/components/ui/tooltip.tsx:52`

Generated artifacts seperti `coverage/`, `storybook-static/`, dan `dist/` tidak ter-track di Git, yang merupakan repository hygiene yang baik.

## Definition of done

- [ ] README tidak lagi berisi template Vite.
- [ ] README memiliki API reference dan installation/dependency guidance.
- [x] `Progress` memiliki kontrak range yang konsisten secara visual dan ARIA.
- [x] `Field` memiliki nama/API yang sesuai dengan level automation-nya.
- [ ] Size vocabulary distandarkan.
- [ ] Semua public variants memiliki test dan Storybook story.
- [ ] Composite controls memiliki axe/accessibility coverage.
- [ ] Warning test dan Storybook configuration dibersihkan.
- [ ] Avatar semantics dan Button `asChild` limitations terdokumentasi.
- [ ] Lint, typecheck, tests, coverage, dan library build tetap pass.
