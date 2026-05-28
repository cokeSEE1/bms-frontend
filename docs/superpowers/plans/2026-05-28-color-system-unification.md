# Color System Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace duplicated local color constants across 5 homepage style files with shared constants imported from `src/theme/colors.ts`, and recolor blue-themed values to the brand warm palette.

**Architecture:** Add 12 new constants to `colors.ts` covering surfaces, borders, text variants, and search. Then update each component's `style.ts` to import and use them. This is a pure refactor — no behavior, layout, or component logic changes.

**Tech Stack:** TypeScript, Emotion styled

---

### Task 1: Add shared color constants to colors.ts

**Files:**
- Modify: `src/theme/colors.ts`

- [ ] **Step 1: Add new constants**

Replace the file content:

```ts
/** 品牌主色（亦用作活跃/选中态） */
export const COLOR_PRIMARY = '#1a3a4a'

/** 品牌渐变辅助色 */
export const COLOR_BRAND_GRADIENT_END = '#2c5f6e'

/** 链接 / 强调色（金色） */
export const COLOR_LINK = '#c8a96e'

/** 页面背景色 */
export const COLOR_BG_LAYOUT = '#f5f1eb'

/** 容器 / 面板背景色 */
export const COLOR_BG_CONTAINER = '#ffffff'

/** 错误 / 危险色 */
export const COLOR_ERROR = '#c0392b'

/** 正文颜色 */
export const COLOR_TEXT = '#2c3e50'

/** 次要文字颜色 */
export const COLOR_TEXT_SECONDARY = '#7f8c8d'

/** 占位文字颜色 */
export const COLOR_PLACEHOLDER = 'rgba(44, 62, 80, 0.45)'

/** 品牌面板 tagline 颜色 */
export const COLOR_BRAND_TAGLINE = 'rgba(255, 255, 255, 0.7)'

/** 冷色表面（侧边栏、瀑布流、排行榜卡片背景） */
export const COLOR_SURFACE_COOL = '#F3F6F8'

/** 暖色表面（个人工作区卡片背景） */
export const COLOR_SURFACE_WARM = '#F5F3EC'

/** 冷色边框（侧边栏卡片、瀑布流卡片边框） */
export const COLOR_BORDER_COOL = '#E3E9ED'

/** 暖色边框（数据区右边框、通用分隔） */
export const COLOR_BORDER_WARM = '#E8E2D8'

/** 搜索框背景色 */
export const COLOR_SEARCH_BG = 'rgba(26, 58, 74, 0.08)'

/** 搜索图标色（通用灰色） */
export const COLOR_SEARCH_ICON = '#5B6275'

/** 按钮渐变（主操作按钮） */
export const COLOR_BTN_GRADIENT_START = '#1a3a4a'
export const COLOR_BTN_GRADIENT_END = '#2c5f6e'

/** 紫色标签（侧边栏目录 tag 背景） */
export const COLOR_TAG_BG = '#432FCD'
```

- [ ] **Step 2: Commit**

```bash
git add src/theme/colors.ts
git commit -m "feat: add shared color constants for homepage components"
```

---

### Task 2: Update HomeHeader/style.ts

**Files:**
- Modify: `src/pages/home/components/HomeHeader/style.ts`

- [ ] **Step 1: Replace local constants with imports**

Replace lines 2-10:

```ts
import styled from '@emotion/styled'
import {
  COLOR_BG_CONTAINER,
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_SEARCH_BG,
  COLOR_PLACEHOLDER,
  COLOR_SEARCH_ICON,
} from '../../../../theme/colors'
```

Delete the local constant block (lines 5-10):

```ts
// Remove: COLOR_ACTIVE, COLOR_INACTIVE, COLOR_USER_TEXT, COLOR_SEARCH_BG, COLOR_SEARCH_PLACEHOLDER, COLOR_SEARCH_ICON
```

Update references:
- `COLOR_ACTIVE` → `COLOR_PRIMARY`
- `COLOR_INACTIVE` → `COLOR_TEXT`
- `COLOR_USER_TEXT` → `COLOR_TEXT_SECONDARY`
- `COLOR_SEARCH_BG` (local) → `COLOR_SEARCH_BG` (imported)
- `COLOR_SEARCH_PLACEHOLDER` → `COLOR_PLACEHOLDER`
- `COLOR_SEARCH_ICON` → `COLOR_SEARCH_ICON`

Use `replace_all` for each old/new pair.

- [ ] **Step 2: Update the NavTab color**

`NavTab` uses `COLOR_INACTIVE` (now `COLOR_TEXT` = `#2c3e50`). The hover color uses `COLOR_ACTIVE` (now `COLOR_PRIMARY` = `#1a3a4a`).

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/components/HomeHeader/style.ts
git commit -m "refactor: use shared color constants in HomeHeader styles"
```

---

### Task 3: Update HomeSidebar/style.ts

**Files:**
- Modify: `src/pages/home/components/HomeSidebar/style.ts`

- [ ] **Step 1: Replace local constants with imports**

Replace lines 1-10:

```ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BG_CONTAINER,
  COLOR_PLACEHOLDER,
  COLOR_SEARCH_ICON,
  COLOR_TAG_BG,
} from '../../../../theme/colors'
```

Delete locals:
```ts
// Remove: COLOR_ACTIVE, COLOR_TEXT_PRIMARY, COLOR_TEXT_TITLE, COLOR_SEARCH_BG, COLOR_SEARCH_PLACEHOLDER, COLOR_SEARCH_ICON, COLOR_TAG_BG
```

Update references:
- `COLOR_ACTIVE` → `COLOR_PRIMARY`
- `COLOR_TEXT_PRIMARY` → `COLOR_TEXT`
- `COLOR_TEXT_TITLE` → `COLOR_TEXT`
- `COLOR_SEARCH_BG` → `COLOR_BG_CONTAINER` (was `#FFFFFF`)
- `COLOR_SEARCH_PLACEHOLDER` → `COLOR_PLACEHOLDER`
- `COLOR_SEARCH_ICON` → `COLOR_SEARCH_ICON`
- `COLOR_TAG_BG` → `COLOR_TAG_BG`

- [ ] **Step 2: Update the SidebarContainer background**

`background: #f9faff` → use imported `COLOR_SURFACE_COOL` (add to import). Replace `#f9faff` with `${COLOR_SURFACE_COOL}`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/components/HomeSidebar/style.ts
git commit -m "refactor: use shared color constants in HomeSidebar styles"
```

---

### Task 4: Update KnowledgeWaterfall/style.ts

**Files:**
- Modify: `src/pages/home/components/KnowledgeWaterfall/style.ts`

- [ ] **Step 1: Replace local constants with imports**

Replace lines 1-9:

```ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BG_CONTAINER,
  COLOR_PLACEHOLDER,
  COLOR_SURFACE_COOL,
  COLOR_BORDER_COOL,
} from '../../../../theme/colors'
```

Delete locals:
```ts
// Remove: COLOR_TITLE, COLOR_ACTIVE, COLOR_INACTIVE, COLOR_CARD_BG, COLOR_CARD_BORDER, COLOR_META
```

Update references:
- `COLOR_TITLE` → `COLOR_TEXT`
- `COLOR_ACTIVE` → `COLOR_PRIMARY`
- `COLOR_INACTIVE` → `COLOR_PLACEHOLDER`
- `COLOR_CARD_BG` → `COLOR_BG_CONTAINER`
- `COLOR_CARD_BORDER` → `COLOR_BORDER_COOL`
- `COLOR_META` → `COLOR_TEXT_SECONDARY`

- [ ] **Step 2: Update Container background/border**

`background: #f5faff` → `${COLOR_SURFACE_COOL}`
`border: 1px solid ${COLOR_BORDER_COOL}` (already updated via constant rename)

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/components/KnowledgeWaterfall/style.ts
git commit -m "refactor: use shared color constants in KnowledgeWaterfall styles"
```

---

### Task 5: Update PersonalWorkspace/style.ts

**Files:**
- Modify: `src/pages/home/components/PersonalWorkspace/style.ts`

- [ ] **Step 1: Replace local constants with imports**

Replace lines 1-8:

```ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BORDER_WARM,
  COLOR_SURFACE_WARM,
  COLOR_BORDER_COOL,
  COLOR_BTN_GRADIENT_START,
  COLOR_BTN_GRADIENT_END,
} from '../../../../theme/colors'
```

Delete locals:
```ts
// Remove: COLOR_TITLE, COLOR_LINK, COLOR_BORDER, COLOR_CARD_BG, COLOR_CARD_BORDER
```

Update references:
- `COLOR_TITLE` → `COLOR_TEXT`
- `COLOR_LINK` → `COLOR_PRIMARY`
- `COLOR_BORDER` → `COLOR_BORDER_WARM`
- `COLOR_CARD_BG` → `COLOR_SURFACE_WARM`
- `COLOR_CARD_BORDER` → `COLOR_BORDER_COOL`

- [ ] **Step 2: Update CreateBtn gradient**

Replace:
```ts
background: linear-gradient(90deg, #0065fd 0%, #3082fd 100%);
```
with:
```ts
background: linear-gradient(90deg, ${COLOR_BTN_GRADIENT_START} 0%, ${COLOR_BTN_GRADIENT_END} 100%);
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/components/PersonalWorkspace/style.ts
git commit -m "refactor: use shared color constants in PersonalWorkspace styles"
```

---

### Task 6: Update RankingPanel/style.ts

**Files:**
- Modify: `src/pages/home/components/RankingPanel/style.ts`

- [ ] **Step 1: Replace local constants with imports**

Replace lines 1-8:

```ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_SURFACE_COOL,
  COLOR_BORDER_COOL,
} from '../../../../theme/colors'
```

Delete locals:
```ts
// Remove: COLOR_TITLE, COLOR_LINK, COLOR_META, COLOR_COUNT
```

Update references:
- `COLOR_TITLE` → `COLOR_TEXT`
- `COLOR_LINK` → `COLOR_PRIMARY`
- `COLOR_META` → `COLOR_TEXT_SECONDARY`
- `COLOR_COUNT` → `COLOR_PRIMARY`

- [ ] **Step 2: Update StarSection hardcoded colors**

In `StarSection`:
- `background: #f5faff` → `${COLOR_SURFACE_COOL}`
- `border: 1px solid #ebf5ff` → `border: 1px solid ${COLOR_BORDER_COOL}`

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/components/RankingPanel/style.ts
git commit -m "refactor: use shared color constants in RankingPanel styles"
```

---

### Task 7: Verify all changes

- [ ] **Step 1: Run type check**

```bash
pnpm build
```
Expected: no type errors.

- [ ] **Step 2: Run all tests**

```bash
pnpm test --run
```
Expected: all tests pass.

- [ ] **Step 3: Run dev server and visually inspect homepage**

```bash
pnpm dev
```

Open the app, navigate to `/dashboard`, and verify:
- Header nav tabs render with correct colors
- Sidebar icons and tree items have proper active/hover states
- PersonalWorkspace cards use warm surface colors
- KnowledgeWaterfall cards render correctly
- RankingPanel medals and notifications look correct
- Overall page has consistent warm brand feel

- [ ] **Step 4: Final commit (if any test fixes needed)**

Only if tests needed adjustment.

---

## Task Dependency Graph

```
Task 1 (colors.ts) ──┬── Task 2 (HomeHeader)
                     ├── Task 3 (HomeSidebar)
                     ├── Task 4 (KnowledgeWaterfall)
                     ├── Task 5 (PersonalWorkspace)
                     └── Task 6 (RankingPanel)
                                          │
                                     Task 7 (Verify)
```

Tasks 2-6 can run in parallel after Task 1.
