# Improvement TODO

Dokumen ini berisi tindak lanjut hasil code review untuk menaikkan repo dari portfolio prototype menjadi design system yang lebih production-ready.

## P0 — Accessibility dan behavioral confidence

- [x] Tambahkan `focus-visible` ring yang konsisten pada `Checkbox`, `RadioGroupItem`, dan `Switch`.
  - File: `src/components/ui/checkbox.tsx`
  - File: `src/components/ui/radio-group.tsx`
  - File: `src/components/ui/switch.tsx`
- [ ] Tambahkan test keyboard untuk seluruh composite control:
  - [x] `Checkbox`: `Space`, focus, disabled tidak merespons.
  - [ ] `RadioGroup`: arrow navigation, selection, disabled item. (Browser test added; local Chromium verification blocked by missing `libnspr4.so`.)
  - [ ] `Select`: `Enter`, arrow navigation, `Escape`, focus kembali ke trigger.
  - [x] `Switch`: `Space`, `Enter`, disabled tidak berubah.
  - [x] `Tooltip`: focus/keyboard trigger dan relationship `aria-describedby`.
- [ ] Tambahkan automated accessibility assertions menggunakan axe pada state representative:
  - [ ] default
  - [ ] invalid
  - [ ] disabled
  - [ ] composite control dalam keadaan terbuka
- [x] Tambahkan test ARIA contract untuk `Progress`: role, `aria-valuenow`, min/max, dan accessible name.
- [x] Tinjau ulang `FieldError` agar tidak selalu menggunakan `role="alert"`; gunakan live announcement hanya ketika error aktif dan memang diperlukan.
- [ ] Evaluasi apakah `Field` perlu mengelola association antara control, description, dan error secara otomatis. Jika tidak, dokumentasikan bahwa `Field` hanya merupakan composition/layout primitive.

## P1 — Public API dan architecture

- [x] Tegaskan boundary antara primitive dan system component.
  - [x] Buat `src/components/system/`.
  - [x] Pindahkan `Field` sebagai opinionated composition; `AvatarGroup` tetap menjadi compound component di primitive layer karena hanya mengcoordinates Avatar primitives.
  - [x] Dokumentasikan dependency direction: primitive → system composition → consumer.
- [ ] Review API `Button asChild`.
  - [ ] Dokumentasikan bahwa hanya boleh menerima satu interactive child.
  - [ ] Tambahkan test untuk link composition.
  - [ ] Dokumentasikan bahwa `disabled` tidak memiliki native effect pada anchor.
  - [ ] Pertimbangkan `ButtonLink` jika `asChild` terlalu mudah disalahgunakan oleh consumer.
- [ ] Review API `AvatarGroup` agar ukuran group dan child tidak dapat tidak sinkron.
  - [ ] Pilih apakah group mengontrol ukuran child atau ukuran hanya dikonfigurasi pada `Avatar`.
  - [ ] Pastikan `AvatarGroupCount` mengikuti ukuran yang sama.
- [x] Hapus `compoundVariants: []` pada `src/components/ui/button.tsx` jika tidak dipakai oleh tooling.
- [ ] Tambahkan barrel export per component/layer atau perbarui `CLAUDE.md` agar sesuai dengan struktur aktual.
- [x] Selaraskan `CLAUDE.md` dengan struktur repository saat ini. Dokumentasi tidak boleh menyatakan “one folder per component” jika pola tersebut belum diterapkan.

## P1 — Package build dan bundle

- [x] Audit `vite.lib.config.ts` dan putuskan dependency mana yang harus menjadi external/peer dependency.
- [x] Tambahkan generated TypeScript declaration files untuk library build.
- [x] Tambahkan `package.json` `exports`, `types`, dan `peerDependencies` yang sesuai.
- [x] Pastikan CSS entry point dan design tokens tersedia untuk consumer package.
- [ ] Tambahkan package smoke test yang mengimpor seluruh public exports dari `src/index.ts`.
- [ ] Ukur bundle size per entry point, bukan hanya bundle monolitik.
- [x] Dokumentasikan baseline bundle size dan alasan dependency runtime seperti `sonner` serta `lucide-react`.
- [ ] Pastikan `dist/`, `coverage/`, dan `storybook-static/` tidak menambah noise ke Git jika hanya artifact lokal.

## P1 — Testing quality

- [ ] Kurangi test yang hanya memvalidasi implementation detail seperti `data-variant`, `data-size`, selector `data-slot`, atau class Tailwind.
- [ ] Tambahkan behavioral assertions untuk callback, state transition, focus, keyboard navigation, dan disabled behavior.
- [ ] Tambahkan regression tests untuk edge case `Progress`:
  - [ ] `value={undefined}` / indeterminate.
  - [ ] `value < 0`.
  - [ ] `value > 100`.
  - [ ] accessible label.
- [ ] Tambahkan test `AvatarImage` untuk loaded image, broken image, dan fallback transition jika environment test mendukungnya.
- [ ] Tambahkan test untuk `Toaster`: success, error, warning, info, loading, close button, dan live region.
- [ ] Tambahkan test untuk public package entry point dan CSS/tokens.
- [ ] Pertahankan coverage branch minimal 95%, tetapi laporkan juga coverage behavioral/accessibility secara eksplisit.

## P2 — Storybook dan documentation

- [x] Lengkapi setiap story dengan dokumentasi:
  - [ ] kapan komponen digunakan.
  - [ ] kapan memakai alternatif lain.
  - [ ] controlled vs uncontrolled behavior.
  - [ ] accessibility requirements.
  - [ ] composition constraints.
- [x] Tambahkan story state yang belum ada:
  - [x] `Progress`: indeterminate, out-of-range input, accessible label.
  - [x] `Tooltip`: focus, long content, controlled open state.
  - [x] `Toaster`: default, success, error, info, warning, loading, dan close state.
  - [x] `Avatar`: deterministic image fixture dan fallback state melalui `Default`.
  - [x] `Select`: keyboard interaction dan existing long-list-ready composition.
- [x] Ganti hardcoded `id="story-select"` pada `src/components/stories/select.stories.tsx` dengan `useId()` agar aman ketika story merender lebih dari satu instance.
- [x] Hindari external image dependency di Storybook seperti `i.pravatar.cc`; gunakan fixture lokal/data URI agar visual test deterministik.
- [ ] Tambahkan README/API reference per komponen, minimal untuk komponen public utama.
- [ ] Tambahkan installation, package usage, CSS import, browser support, contribution, release, dan versioning documentation.
- [ ] Tambahkan visual regression workflow untuk Storybook jika repository diposisikan sebagai design system.

## P2 — Design tokens dan consistency

- [ ] Inventarisasi arbitrary Tailwind values dan klasifikasikan:
  - [ ] token yang seharusnya dipindahkan ke `src/styles/themes.css`.
  - [ ] geometry yang memang component-specific.
  - [ ] workaround Radix yang perlu diberi komentar.
- [ ] Review repeated form-control styles pada `Input`, `Textarea`, dan `SelectTrigger`; buat shared recipe/helper bila sudah ada minimal tiga consumer.
- [ ] Konsistenkan focus, disabled, invalid, placeholder, dan border treatment di semua form controls.
- [ ] Dokumentasikan token naming, semantic meaning, contrast expectation, dan dark-mode strategy.
- [ ] Tambahkan automated check atau lint rule untuk mencegah raw hex color di component source.

## P3 — Code quality dan repository hygiene

- [ ] Tambahkan `coverage` ke `globalIgnores` dalam `eslint.config.js` agar lint tidak menghasilkan warning dari generated files.
- [ ] Simplifikasi logic `Progress` translation pada `src/components/ui/progress.tsx` agar lebih mudah dibaca.
- [ ] Pastikan tidak ada generated artifacts yang tracked tanpa alasan.
- [ ] Tambahkan CI workflow yang menjalankan:
  - [ ] `pnpm lint`
  - [ ] `pnpm typecheck`
  - [ ] `pnpm test`
  - [ ] `pnpm test:coverage`
  - [ ] `pnpm build:lib`
  - [ ] `pnpm build:storybook`
- [ ] Tambahkan status badge CI dan coverage ke README.
- [ ] Tambahkan conventional commit/release guidance jika repo akan dipresentasikan sebagai package publik.

## Definition of Done

- [ ] Semua composite controls memiliki keyboard tests dan focus-visible verification.
- [ ] Tidak ada critical/serious axe violation pada representative Storybook states.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:coverage`, `pnpm build:lib`, dan `pnpm build:storybook` pass di CI.
- [ ] Public package dapat di-install dan mengimpor komponen dari entry point tanpa internal path.
- [ ] README menjelaskan installation, API, accessibility, architecture, testing, dan release workflow.
- [ ] Primitive/system boundary terlihat di struktur folder dan dibuktikan oleh minimal satu composition nyata.
- [ ] Bundle size memiliki baseline, rationale, dan target yang terdokumentasi.
