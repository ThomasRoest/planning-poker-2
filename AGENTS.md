# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript app for planning poker.

- `src/`: application code
- `src/components/`: reusable UI and feature components (e.g., `AppHeader`, `VoteForm`)
- `src/pages/`: route-level pages (`Login`, `Session`, `About`, etc.)
- `src/*.ts(x)`: app bootstrap and shared modules (`index.tsx`, `apollo-client.ts`, context/types)
- `public/`: static assets served as-is (icons, manifest, screenshot)
- `index.html`: Vite HTML entrypoint
- `vite.config.ts`: Vite + Vitest config

Keep tests close to code using `*.test.tsx` (example: `src/components/AppHeader/AppHeader.test.tsx`).

## Build, Test, and Development Commands
- `npm run dev`: start local dev server with Vite.
- `npm run build`: create production bundle in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run test`: run unit/component tests with Vitest.
- `npm run test -- --run`: run tests once (non-watch, CI-style).
- `npm run test:e2e`: open Cypress runner.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) with React function components.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components/pages: `PascalCase` folders/files (`CreateSessionForm.tsx`).
- Hooks/utilities/vars: `camelCase`.
- Prefer named exports for shared modules.
- Formatting: Prettier (`.prettierrc` uses `trailingComma: es5`).

## Testing Guidelines
- Frameworks: Vitest + Testing Library (`jsdom` environment).
- Test files: `*.test.tsx`, colocated with the component/module under test.
- Focus on user-visible behavior (rendering, navigation, interactions) over implementation details.
- For routing behavior, use memory history/router patterns similar to existing tests.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit messages (e.g., `add value vote buttons`, `fix deps conflict`, `migrate to Vite`). Follow that style:
- Use present-tense imperative verbs.
- Keep subject concise; one logical change per commit when possible.

PRs should include:
- Clear summary of what changed and why.
- Linked issue/task (if applicable).
- Screenshots/GIFs for UI changes.
- Notes on config/env changes (e.g., required `VITE_*` variables).
