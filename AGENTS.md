# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript planning poker app using Convex for backend data and Chakra UI v3 for UI.

- `src/`: application code
- `src/components/`: flat component files (e.g., `app-header.tsx`, `main-card.tsx`, `vote-form.tsx`, `toaster.tsx`)
- `src/pages/`: flat page files (e.g., `login-page.tsx`, `create-session-page.tsx`, `session-page.tsx`, `about-page.tsx`)
- `src/lib/theme.tsx`: app light/dark mode state + shared color tokens
- `src/lib/useGetSession.ts`: session route UUID validation + Convex session query hook
- `convex/`: schema and backend functions (`schema.ts`, `sessions.ts`, `participants.ts`)
- `tests/`: Playwright end-to-end tests (`*.spec.ts`)
- `public/`: static assets
- `design/`: screenshot references used for UI parity checks
- `index.html`: Vite HTML entrypoint
- `vite.config.ts`: Vite config
- `playwright.config.ts`: Playwright test config

Keep end-to-end tests in `tests/` using `*.spec.ts`.

## Build, Test, and Development Commands
- `npm run dev`: start local dev server with Vite.
- `npm run build`: create production bundle in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run test`: run end-to-end tests with Playwright.
- `npm run test:ui`: open Playwright UI mode.
- `npm run convex:dev`: run Convex dev/codegen loop.
- `npx tsc --noEmit`: typecheck project without emitting files.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) with React function components.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components/pages: kebab-case filenames (`session-page.tsx`, `join-session-form.tsx`).
- Hooks/utilities/vars: `camelCase`.
- Prefer named exports for shared modules and helpers.
- Formatting: Prettier (`.prettierrc` uses `trailingComma: es5`).
- Do not use barrel/index files in `src/components` or `src/pages`; import directly from concrete files.
- Reuse `MainCard` and `useThemeColors()` for primary screen containers; avoid duplicating card layout styles.

## Testing Guidelines
- Framework: Playwright end-to-end tests.
- Test files: `tests/*.spec.ts`.
- Focus on user-visible behavior and core flows (login, session creation, session interactions).
- Configure Playwright with local Vite `webServer` and environment variables (`VITE_PASSWORD`, `VITE_CONVEX_URL`).
- For UI changes, verify against screenshots in `design/` (light and dark mode where applicable).

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit messages (e.g., `add value vote buttons`, `fix deps conflict`, `migrate to Vite`). Follow that style:
- Use present-tense imperative verbs.
- Keep subject concise; one logical change per commit when possible.

PRs should include:
- Clear summary of what changed and why.
- Linked issue/task (if applicable).
- Screenshots/GIFs for UI changes.
- Notes on config/env changes (required keys include `VITE_CONVEX_URL` and `VITE_PASSWORD`).
