# CLAUDE.md

## Project

KMS (Knowledge Management System) Frontend — React 18 SPA with TypeScript, Vite 6, Ant Design 5, Emotion, React Router 6, pnpm.

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Type-check (tsc -b) then build (vite build)
pnpm preview       # Preview production build
pnpm test --run    # Run all tests
pnpm test --watch  # Watch mode
```

## Architecture

```
src/
  App.tsx                       # ConfigProvider → AntdApp → RouterProvider
  main.tsx                      # StrictMode + createRoot
  test-setup.ts                 # jest-dom matchers + window.matchMedia mock
  theme/antd-theme.ts           # antd ThemeConfig (colorPrimary, colorLink, etc.)
  i18n/locales/zh-CN/login.ts   # Static text strings, as const
  hooks/useLoginForm.ts         # Custom hooks
  pages/{feature}/              # index.tsx + sub-components + style.ts + __tests__/
  router/index.tsx              # createBrowserRouter
```

## Code Conventions

### Components
- **Function declarations only** — `function Foo() {}`, never `const Foo = () => {}`
- **Default export** for all components
- Imports: third-party first, then internal relative imports
- No inline `style={{}}` — all styles go in `style.ts` (emotion) or antd ConfigProvider

### Emotion Styled Components (`style.ts`)
- Named exports only: `export const PageContainer = styled.div\`...\``
- Template literal syntax, px units, hex colors

### Custom Hooks (`hooks/useXxx.ts`)
- `interface UseXxxReturn` for the return type
- Explicit return type annotation: `function useXxx(): UseXxxReturn`
- `useState` for individual fields, `useCallback` for handlers
- Exported constants alongside the hook (e.g., `export const USERNAME_PATTERN = /^\w{3,20}$/`)

### i18n
- Plain objects with `as const`, default export, camelCase keys
- No i18n library — import directly from `src/i18n/locales/zh-CN/<feature>.ts`

### Testing
- Co-located `__tests__/` directories
- `describe`/`it` blocks (not `test()`)
- Local `function renderComponent() { return render(...) }` helper per test file
- Wrap with `<MemoryRouter>` when using `useNavigate`, `<App>` when using `App.useApp()`
- `userEvent.setup()` for interactions
- Hook tests: `renderHook` + `act`

### Routing
- `createBrowserRouter` with route objects (path, element)
- Root `/` redirects via `<Navigate to="..." replace />`

### TypeScript
- `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
- No path aliases — all imports use relative paths (`../../i18n/...`)
