# CLAUDE.md

## Project

KMS (Knowledge Management System) Frontend — React 18 SPA with TypeScript, Vite 6, Ant Design 5, Emotion, React Router 6, MobX, pnpm.

设计参照 [kms-frontend](../kms-frontend/) 的编码规范和组件模式，对接后端 [bms-backend](../bms-backend/) (FastAPI + SQLAlchemy 2.0 + MySQL + Redis)。

## Commands

```bash
pnpm dev           # Start dev server (port 5173, proxies /api → 127.0.0.1:8000)
pnpm build         # Type-check (tsc -b) then build (vite build)
pnpm preview       # Preview production build
pnpm test --run    # Run all tests
pnpm test --watch  # Watch mode
```

## Backend API (bms-backend)

后端入口 `http://127.0.0.1:8000`，Vite 开发代理将 `/api` 转发到后端。

### Auth 模块 (`/auth`)

| 端点 | 方法 | 请求体 | 响应 | 说明 |
|------|------|--------|------|------|
| `/auth/register` | POST | `{ username, password }` | `UserOut` | 注册 (201) |
| `/auth/login` | POST | `{ username, password }` | `TokenOut` | 登录，返回 JWT + 用户信息 |
| `/auth/me` | GET | — (Bearer token) | `UserOut` | 获取当前用户 |
| `/auth/logout` | POST | — (Bearer token) | `LogoutOut` | 登出，JWT 加入 Redis 黑名单 |

- JWT 算法 HS256，有效期 24h，含 `sub` (user_id)、`jti` (唯一 ID)、`iat`、`exp`
- 前端 `client.ts` 拦截器自动附加 `Authorization: Bearer <token>`
- `localStorage` key: `token`、`username`

### Directory 模块 (`/v1/directory`)

| 端点 | 方法 | 请求体 | 响应 | 说明 |
|------|------|--------|------|------|
| `/v1/directory/trees` | GET | — | `DirectoryTreeOut[]` | 获取所有根树 |
| `/v1/directory/tree` | POST | `{ dir_id, level }` | `DirectoryTreeOut` | 获取子树 (level: -1=完整树, 1=直接子节点) |
| `/v1/directory/node` | POST | `{ parent_id, dir_name, dir_type, km_id? }` | `DirectoryTreeOut` | 创建目录/分组节点 |
| `/v1/directory/node` | DELETE | `{ dir_id, delete_type }` | `DirectoryDeleteResponse` | 删除节点 (delete_type: 1=软删除) |

- 目录结构使用 MPTT (Modified Preorder Tree Traversal) 模型（`tree_id`, `lft`, `rgt`, `level`, `parent_id`）
- `dir_type`: 0=目录, 1=分组；`dir_name` 最大 256 字符

### 数据实体

| 表 | 说明 | 关键字段 |
|----|------|---------|
| `kms_user` | 用户表 | id, username, password(bcrypt), is_delete, create_time, update_time |
| `kms_knowledge_directory` | 知识目录 (MPTT) | id, appid, dir_name, dir_type, km_id, tree_id, lft, rgt, level, parent_id |
| `kms_knowledge_base` | 知识库 | id, appid, name, description, cover, creator, item_count, view_count, kb_type, is_top, tag_ids, cate_id |
| `kms_knowledge_item` | 知识条目 | id, appid, kb_id, cate_id, name, content, abstract, author, version, status, view_count, like_count, tag_ids, knowledge_type |

所有实体通过 `BaseEntity` 继承软删除标记 `is_delete`、`create_time`、`update_time`。

## Architecture

```
src/
  App.tsx                       # ConfigProvider → AntdApp → RouterProvider
  main.tsx                      # StrictMode + createRoot
  test-setup.ts                 # jest-dom matchers + window.matchMedia mock
  theme/antd-theme.ts           # antd ThemeConfig (colorPrimary, colorLink, etc.)
  theme/colors.ts               # 公共颜色常量
  i18n/locales/zh-CN/*.ts       # 静态文本字符串, as const
  hooks/useXxx.ts               # 自定义 hooks (useLoginForm, useRegisterForm)
  pages/{feature}/              # index.tsx + components/ + style.ts + __tests__/
  layouts/DashboardLayout.tsx   # 首页布局壳 (侧边栏 + 顶栏 + Outlet)
  router/index.tsx              # createBrowserRouter
  service/                      # API 层 (axios client + service functions)
  stores/                       # MobX stores (knowledgeStore, homeStore, rankingStore)
  styles/                       # 公共布局样式 (auth-pages.ts, layout.ts)
```

### Vite Proxy

开发服务器将 `/api/*` 转发到 `http://127.0.0.1:8000`，并去除 `/api` 前缀：
```
/api/auth/login → http://127.0.0.1:8000/auth/login
```

### Service 层 (`src/service/`)

| 文件 | 说明 |
|------|------|
| `client.ts` | axios 实例 (baseURL: `/api`)，请求拦截器注入 Bearer token，401 时清除 token |
| `types.ts` | 公共类型：`UserRegister`, `UserLogin`, `UserOut`, `TokenOut`, `LogoutOut` |
| `auth/index.ts` | Auth hooks: `useLogin()`, `useRegister()`, `useGetMe()`, `useLogout()` |
| `home.ts` | 首页服务：知识卡片、目录树 CRUD、排行榜 (部分 mock，部分对接真实 API) |
| `index.ts` | 聚合导出 |

### MobX Stores (`src/stores/`)

| Store | 说明 |
|-------|------|
| `knowledgeStore.ts` | 知识卡片列表、目录树 CRUD、搜索过滤 (`makeAutoObservable`) |
| `homeStore.ts` | UI 状态：tab 切换、搜索关键词、目录选中状态 |
| `rankingStore.ts` | 排行榜数据：学习之星、原创之星、热门之星 + 通知列表 |

Store 为模块级单例（如 `export const knowledgeStore = new KnowledgeStore()`），页面组件直接导入使用。

### 前端页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | — | 重定向到 `/login` |
| `/login` | LoginPage | 登录页 (BrandPanel + LoginForm) |
| `/register` | RegisterPage | 注册页 (BrandPanel + RegisterForm) |
| `/dashboard` | DashboardLayout | 首页布局壳 |
| `/dashboard` (index) | HomePage | 首页：侧边栏目录树 + 知识卡片瀑布流 + 右侧排行榜 |

## 与 kms-frontend 的异同

本项目是 kms-frontend 的轻量化实现，参照了其编码规范：

**相同/参照**：
- 组件开发规范（TypeScript 函数式组件 + Hooks）
- 不使用相对路径跨多层级导入（本项目使用相对路径，但保持在 3 级以内）
- 副作用下沉到自定义 hooks
- CSS 变量命名规范 `--kms-*`
- 提交信息格式 `<type>(<scope>): <subject>`

**不同/简化**：
- 使用 Emotion styled-components 而非 Less
- 使用 MobX 而非 `useState`/Reducer 组合管理跨组件状态
- 使用 i18n 纯对象导入而非 `useI18n()` hook
- 无 Storybook、E2E 测试、ESLint 自定义插件
- 无路径别名
- 单入口 SPA（非多入口工作区）

## Code Conventions

### Components
- **Arrow functions only** — `const Foo = () => {}`, never `function Foo() {}`
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
