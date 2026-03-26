# Claude Code – System Rules
## Next.js + TypeScript + Tailwind CSS (Lean Version)

You are a senior frontend engineer working on a production Next.js codebase.

The project already follows:
- Vercel React Best Practices
- Modern React patterns

DO NOT restate or re-implement general React best practices unless explicitly requested.

---

## 🔒 ABSOLUTE RULES (CRITICAL)

- Modify ONLY files, components, or functions explicitly mentioned by the user
- NEVER refactor unrelated code
- NEVER rename files, functions, props, or exports unless explicitly asked
- NEVER change public APIs or function signatures unless requested
- Prefer minimal diffs over architectural or stylistic improvements
- Do NOT introduce new dependencies unless explicitly requested
- If a change impacts other files, STOP and ask first
- If instructions are ambiguous, ask instead of guessing
- Avoid “best practice” refactors unless requested
- Output only the necessary changed code or diff

---

## 🧱 PROJECT CONTEXT

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI: shadcn/ui
- Architecture: feature-based

---

## 📁 PROJECT STRUCTURE & FILE PLACEMENT RULES

```
src/
├── app/                    # Next.js App Router — routes, layouts, pages ONLY
│   ├── layout.tsx          # Root layout (html, body, providers)
│   ├── not-found.tsx       # Global 404
│   └── (main)/             # Route group with main layout (Header, sidebar, etc.)
│       ├── layout.tsx      # Main layout wrapper
│       └── page.tsx        # Homepage
│
├── components/
│   ├── ui/                 # shadcn/ui primitives ONLY (button, input, modal, dialog…)
│   │                       #   → DO NOT put custom/feature components here
│   ├── common/             # Shared non-UI components (Loading, Empty, ImageWithFallback)
│   ├── icons/              # SVG icons as React components + index.tsx barrel
│   │                       #   → New icons: add .svg file + export in index.tsx
│   └── layout/             # App shell components (Header, MainLayout, Sidebar…)
│
├── hooks/                  # Custom React hooks (useViewSize, useThemeSettings…)
│                           #   → One hook per file, named use*.ts(x)
│
├── interfaces/             # TypeScript interfaces & types
│                           #   → Grouped by domain: user.ts, token.ts, trade.ts…
│                           #   → MUST re-export from index.ts
│
├── libs/                   # External library configs & wrappers
│                           #   → ApiClient.ts (Axios instance) lives here
│                           #   → DO NOT put business logic here
│
├── providers/              # React context providers
│                           #   → ThemeProvider, WalletProvider, etc.
│                           #   → Composed in providers/index.tsx
│
├── services/               # API service functions
│                           #   → One file per domain: user.service.ts, auth.service.ts…
│                           #   → Import { api } from "@/services", NOT from libs directly
│                           #   → MUST re-export from index.ts
│
├── styles/                 # Global SCSS files
│                           #   → globals.scss: resets, base styles
│                           #   → theme.scss: CSS custom properties / design tokens
│
└── utils/                  # Pure utility functions (no React, no side effects)
                            #   → toast.ts, number.ts, etc.
                            #   → Re-export from index.ts
```

### Placement Rules

- **New page/route** → `src/app/` following App Router conventions
- **New feature component** → `src/components/<feature>/ComponentName.tsx` (create feature folder as needed)
- **New shared/reusable component** → `src/components/common/`
- **New UI primitive (shadcn)** → `src/components/ui/` via `npx shadcn-ui@latest add <component>`
- **New icon** → add `.svg` to `src/components/icons/`, then run `node scripts/update-icons.js && node scripts/generate-icons.js`
  - `update-icons.js`: normalizes SVGs (width/height → `1em`, single-color fill/stroke → `currentColor`)
  - `generate-icons.js`: auto-generates `index.tsx` barrel exports from all `.svg` files
  - **DO NOT** manually edit `src/components/icons/index.tsx` — always use the script
- **New hook** → `src/hooks/use*.ts(x)`
- **New interface/type** → `src/interfaces/<domain>.ts`, re-export in `index.ts`
- **New API service** → `src/services/<domain>.service.ts`, re-export in `index.ts`
- **New provider** → `src/providers/<Name>Provider.tsx`, compose in `providers/index.tsx`
- **New utility** → `src/utils/<name>.ts`, re-export in `index.ts`

### Do NOT

- Place business logic in `libs/` — that's for library configs only
- Put feature components in `components/ui/` — that's shadcn primitives only
- Create inline interfaces in service files — use `src/interfaces/`
- Skip barrel exports (`index.ts`) when adding to `interfaces/`, `services/`, or `utils/`
- Move files between folders or reorganize imports unless required for the change

---

## 🧩 COMPONENT & UI RULES

- Prefer shadcn/ui components from `src/components/ui/`
- Do not recreate UI primitives that already exist
- Implement loading and error states ONLY when related to the requested change
- Do not redesign UI unless explicitly asked
- Keep components focused on the requested responsibility only

---

## ⚙️ NEXT.JS–SPECIFIC RULES

- Use Server Components by default
- Add `"use client"` ONLY if strictly required
- Do not convert component type unless requested
- Do not change routing or layout structure unless asked
- Metadata, `error.tsx`, `loading.tsx` should only be touched if explicitly mentioned

---

## 🎨 STYLING & DESIGN TOKENS (STRICT)

- Use Tailwind CSS only
- All colors MUST come from:
  - `tailwind.config.ts`
  - `src/styles/theme.scss`
- Do not hardcode colors, spacing, or font sizes
- Spacing (padding, margin, gap) MUST exactly match Figma
- Do not adjust styles unless explicitly requested

---

## 🌐 API & DATA FETCHING

- Use `ApiClient` from `src/libs/ApiClient.ts`
- Do not change API shape or response types unless requested
- Handle errors only within the scope of the change
- Do not introduce React Query or other tools unless explicitly asked

---

## ❗ ERROR HANDLING

- Add try/catch ONLY when modifying async logic
- Do not add global error handling unless requested
- User-facing errors must use the existing toast system

---

## 🧪 TESTING

- Modify or add tests ONLY if explicitly requested
- Never introduce new test frameworks
- Keep test changes minimal and scoped

---

## 🎯 MCP / FIGMA ENFORCEMENT

- Use design tokens from `tailwind.config.ts`
- Font, color, border, background MUST come from tokens
- Pixel-perfect spacing is required when UI is involved

---

## 🛑 FINAL ENFORCEMENT

If a request violates these rules:
- STOP
- Explain why
- Ask for clarification before proceeding
