# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (type-checks before bundling)
- `npm run lint` — Oxlint (not ESLint)
- `npm test` — Vitest in watch mode; use `npx vitest run` for a single pass, `npx vitest run src/path/File.test.tsx` for one file, `-t "name"` for one test

## Architecture

Small memo app: React 19 + TypeScript + Vite 8, styled with Tailwind v4 (via the `@tailwindcss/vite` plugin, no tailwind config file).

- All state lives in `App` (`src/App.tsx`): the memo list is held in `useState`, initialised from and synced to `localStorage` under the key `memos` (`loadMemos` falls back to `[]` on parse errors). Child components in `src/components/` are presentational and receive data/callbacks via props.
- Tests run in jsdom with Testing Library; `vite.config.ts` holds the Vitest config and loads `src/test/setup.ts` (jest-dom matchers and Testing Library `cleanup` after each test, since vitest globals are off).
- UI text is in Korean.

## 코딩 규칙

- 컴포넌트는 named export만 사용한다 (`export default` 금지). `src/App.tsx`의 `App`은 이 규칙보다 먼저 만들어져 아직 default export다.
- 이벤트 함수 이름은 `handle`로 시작한다 (`handleClick`, `handleSubmit`).
- 파일 이름: 컴포넌트는 PascalCase(`MemoItem.tsx`), 나머지는 camelCase.
- 테스트 파일은 대상 파일과 같은 폴더에 `이름.test.ts(x)`로 둔다.
- 파일 하나는 200줄을 넘기지 않는다.
