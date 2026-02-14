# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript planning poker app using Convex for backend data and Chakra UI v3 for UI.

- `src/`: application code
- `src/components/`: flat component files (e.g., `app-header.tsx`, `main-card.tsx`, `vote-form.tsx`, `toaster.tsx`)
- `src/pages/`: flat page files (e.g., `login-page.tsx`, `create-session-page.tsx`, `session-page.tsx`, `about-page.tsx`)
- `src/themeMode.tsx`: app light/dark mode state + shared color tokens
- `convex/`: schema and backend functions (`schema.ts`, `sessions.ts`, `participants.ts`)
- `public/`: static assets
- `design/`: screenshot references used for UI parity checks
- `index.html`: Vite HTML entrypoint
- `vite.config.ts`: Vite + Vitest config

Keep tests close to code using `*.test.tsx` (example: `src/components/app-header.test.tsx`).

## Build, Test, and Development Commands
- `npm run dev`: start local dev server with Vite.
- `npm run build`: create production bundle in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run test`: run unit/component tests with Vitest.
- `npm run test -- --run`: run tests once (non-watch, CI-style).
- `npm run convex:dev`: run Convex dev/codegen loop.
- `npx tsc --noEmit`: typecheck project without emitting files.
- `npm run test:e2e`: open Cypress runner.

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
- Frameworks: Vitest + Testing Library (`jsdom` environment).
- Test files: `*.test.tsx`, colocated with the component/module under test.
- Focus on user-visible behavior (rendering, navigation, interactions) over implementation details.
- For routing behavior, use memory history/router patterns similar to existing tests.
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
