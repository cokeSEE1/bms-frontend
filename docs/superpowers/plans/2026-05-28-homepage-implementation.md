# Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the KMS homepage with three-column layout (left sidebar + knowledge waterfall + ranking panel) behind a shared DashboardLayout, using MobX stores and mock data.

**Architecture:** DashboardLayout wraps Header + Sidebar + Outlet. HomePage fills Outlet with KnowledgeWaterfall + RankingPanel. MobX stores (homeStore, knowledgeStore, rankingStore) manage all state. Mock data lives in service/home.ts with API-like signatures.

**Tech Stack:** React 18, TypeScript, MobX + mobx-react-lite, Ant Design 5, Emotion, dayjs

---

## File Map

```
CREATE:
  src/service/home.ts                    # Mock data + types
  src/stores/homeStore.ts                # Menu tab state
  src/stores/knowledgeStore.ts           # Knowledge cards + directory tree
  src/stores/rankingStore.ts             # Rankings + notifications
  src/i18n/locales/zh-CN/home.ts         # Static text
  src/styles/layout.ts                   # DashboardLayout Emotion styled components
  src/layouts/DashboardLayout.tsx         # Shared shell: Header + Sidebar + Outlet
  src/pages/home/index.tsx               # HomePage: Waterfall + RankingPanel
  src/pages/home/components/HomeHeader/index.tsx
  src/pages/home/components/HomeHeader/style.ts
  src/pages/home/components/HomeSidebar/index.tsx
  src/pages/home/components/HomeSidebar/style.ts
  src/pages/home/components/KnowledgeWaterfall/index.tsx
  src/pages/home/components/KnowledgeWaterfall/style.ts
  src/pages/home/components/RankingPanel/index.tsx
  src/pages/home/components/RankingPanel/style.ts
  src/pages/home/__tests__/HomePage.test.tsx

MODIFY:
  src/router/index.tsx                   # Add /dashboard/* nested routes
  src/App.tsx                            # Wrap with observer if needed (no, just ConfigProvider)

DELETE:
  src/pages/dashboard/                   # Replaced by home/
```

---

### Task 1: Install dependencies

- [ ] **Step 1: Add mobx, mobx-react-lite, dayjs**

Run: `pnpm add mobx mobx-react-lite dayjs`

Expected: packages added to package.json and pnpm-lock.yaml

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add mobx, mobx-react-lite, dayjs"
```

---

### Task 2: Create mock data service

**Files:**
- Create: `src/service/home.ts`

- [ ] **Step 1: Write the service file with types and mock data**

```ts
// src/service/home.ts
export interface KnowledgeCard {
  id: string
  title: string
  description: string
  tags: string[]
  docType: 'richtext' | 'pdf' | 'word' | 'excel'
  author: { name: string; avatar?: string }
  views: number
  likes: number
  createdAt: string
  isLocked: boolean
}

export interface RankUser {
  rank: 1 | 2 | 3
  name: string
  department: string
  count: number
}

export interface NotificationItem {
  id: string
  title: string
  time: string
  isRead: boolean
}

export interface TreeNode {
  title: string
  key: string
  children?: TreeNode[]
}

const mockCards: KnowledgeCard[] = [
  {
    id: '1',
    title: '知识库使用指南与最佳实践',
    description: '本文档介绍了知识库的基本使用方法，包括知识创建、分类管理、权限设置等核心功能，帮助团队快速上手并规范知识管理流程。',
    tags: ['置顶', '必读'],
    docType: 'richtext',
    author: { name: '张三' },
    views: 1256,
    likes: 89,
    createdAt: '2026-05-20T08:00:00Z',
    isLocked: true,
  },
  {
    id: '2',
    title: '2026年Q2技术分享计划',
    description: '本季度技术分享安排包括前端性能优化实践、后端微服务架构演进、AI在知识管理中的应用等主题，欢迎报名参加。',
    tags: ['热门', '订阅'],
    docType: 'pdf',
    author: { name: '李四' },
    views: 892,
    likes: 56,
    createdAt: '2026-05-18T10:30:00Z',
    isLocked: false,
  },
  {
    id: '3',
    title: '产品需求文档模板与规范',
    description: '标准化的产品需求文档模板，包含需求背景、功能描述、交互流程、验收标准等章节，适用于所有产品线。',
    tags: ['第三方系统'],
    docType: 'word',
    author: { name: '王五' },
    views: 654,
    likes: 42,
    createdAt: '2026-05-15T14:00:00Z',
    isLocked: false,
  },
  {
    id: '4',
    title: '前端代码规范与审查清单',
    description: '团队前端开发规范文档，涵盖命名规范、组件设计原则、状态管理最佳实践、代码审查要点等内容。',
    tags: ['热门'],
    docType: 'richtext',
    author: { name: '赵六' },
    views: 431,
    likes: 35,
    createdAt: '2026-05-12T09:00:00Z',
    isLocked: true,
  },
  {
    id: '5',
    title: 'Q1数据分析报告汇总',
    description: '第一季度各业务线关键数据指标汇总分析，涵盖用户增长、内容消费、搜索转化等维度的数据洞察。',
    tags: ['订阅'],
    docType: 'excel',
    author: { name: '孙七' },
    views: 321,
    likes: 28,
    createdAt: '2026-05-10T16:00:00Z',
    isLocked: false,
  },
]

const mockDirectoryTree: TreeNode[] = [
  {
    title: '知识仓库',
    key: '0-0',
    children: [
      {
        title: '技术文档',
        key: '0-0-0',
        children: [
          { title: '前端开发', key: '0-0-0-0' },
          { title: '后端开发', key: '0-0-0-1' },
          { title: 'AI与算法', key: '0-0-0-2' },
        ],
      },
      {
        title: '产品设计',
        key: '0-0-1',
        children: [
          { title: '需求文档', key: '0-0-1-0' },
          { title: '设计规范', key: '0-0-1-1' },
        ],
      },
      { title: '运营与市场', key: '0-0-2' },
      { title: '行政管理', key: '0-0-3' },
    ],
  },
]

const mockStudyStars: RankUser[] = [
  { rank: 1, name: '张伟', department: '技术部', count: 328 },
  { rank: 2, name: '李娜', department: '产品部', count: 256 },
  { rank: 3, name: '王强', department: '运营部', count: 189 },
]

const mockOriginalStars: RankUser[] = [
  { rank: 1, name: '陈明', department: '技术部', count: 45 },
  { rank: 2, name: '刘洋', department: '设计部', count: 32 },
  { rank: 3, name: '周洁', department: '产品部', count: 21 },
]

const mockHotStars: RankUser[] = [
  { rank: 1, name: '李四', department: '技术部', count: 892 },
  { rank: 2, name: '张三', department: '技术部', count: 756 },
  { rank: 3, name: '王五', department: '产品部', count: 654 },
]

const mockNotifications: NotificationItem[] = [
  { id: 'n1', title: '系统将于本周六进行维护升级', time: '2026-05-27 14:00', isRead: false },
  { id: 'n2', title: '新版本知识库功能已上线', time: '2026-05-26 09:00', isRead: false },
  { id: 'n3', title: '请完成本季度知识贡献目标', time: '2026-05-25 16:00', isRead: true },
  { id: 'n4', title: '知识库使用培训通知', time: '2026-05-24 10:00', isRead: true },
]

export type GetKnowledgeCardsParams = {
  tab: 'push' | 'trajectory'
  subTab: string
  sortBy: 'recommend' | 'likes' | 'latest'
}

export async function getKnowledgeCards(_params: GetKnowledgeCardsParams): Promise<KnowledgeCard[]> {
  return Promise.resolve(mockCards)
}

export async function getDirectoryTree(): Promise<TreeNode[]> {
  return Promise.resolve(mockDirectoryTree)
}

export async function getStudyStars(): Promise<RankUser[]> {
  return Promise.resolve(mockStudyStars)
}

export async function getOriginalStars(): Promise<RankUser[]> {
  return Promise.resolve(mockOriginalStars)
}

export async function getHotStars(): Promise<RankUser[]> {
  return Promise.resolve(mockHotStars)
}

export async function getNotifications(): Promise<NotificationItem[]> {
  return Promise.resolve(mockNotifications)
}
```

- [ ] **Step 2: Verify file compiles**

Run: `pnpm tsc --noEmit src/service/home.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/service/home.ts
git commit -m "feat: add mock data service for homepage"
```

---

### Task 3: Create i18n text file

**Files:**
- Create: `src/i18n/locales/zh-CN/home.ts`

- [ ] **Step 1: Write the i18n file**

```ts
// src/i18n/locales/zh-CN/home.ts
const home = {
  header: {
    home: '首页',
    community: '知识社区',
    personal: '个人中心',
    searchPlaceholder: '搜索你想要的任何知识...',
    logout: '退出登录',
  },
  sidebar: {
    knowledgePush: '知识推送',
    mustRead: '必读',
    subscribe: '订阅',
    knowledgeTrajectory: '知识轨迹',
    favorite: '收藏',
    read: '读过',
    directory: '知识目录',
  },
  waterfall: {
    recommend: '推荐排序',
    mostLikes: '最多点赞',
    latest: '最新发布',
    empty: '暂无知识内容',
  },
  ranking: {
    studyStar: '学习之星',
    originalStar: '原创之星',
    hotStar: '热门之星',
    notification: '消息通知',
    readingCount: '阅读量',
    originalCount: '原创量',
    readCount: '被阅读量',
  },
} as const

export default home
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/locales/zh-CN/home.ts
git commit -m "feat: add homepage i18n text"
```

---

### Task 4: Create MobX stores

**Files:**
- Create: `src/stores/homeStore.ts`
- Create: `src/stores/knowledgeStore.ts`
- Create: `src/stores/rankingStore.ts`

- [ ] **Step 1: Write homeStore.ts**

```ts
// src/stores/homeStore.ts
import { makeAutoObservable } from 'mobx'

class HomeStore {
  activeMenuTab: 'push' | 'trajectory' = 'push'
  activePushTab: 'mustread' | 'subscribe' = 'mustread'
  activeTrajectoryTab: 'favorite' | 'read' = 'favorite'
  searchKeyword = ''

  constructor() {
    makeAutoObservable(this)
  }

  setActiveMenuTab(tab: 'push' | 'trajectory') {
    this.activeMenuTab = tab
  }

  setActivePushTab(tab: 'mustread' | 'subscribe') {
    this.activePushTab = tab
  }

  setActiveTrajectoryTab(tab: 'favorite' | 'read') {
    this.activeTrajectoryTab = tab
  }

  setSearchKeyword(keyword: string) {
    this.searchKeyword = keyword
  }
}

export const homeStore = new HomeStore()
```

- [ ] **Step 2: Write knowledgeStore.ts**

```ts
// src/stores/knowledgeStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getKnowledgeCards, getDirectoryTree } from '../service/home'
import type { KnowledgeCard, TreeNode, GetKnowledgeCardsParams } from '../service/home'

class KnowledgeStore {
  cards: KnowledgeCard[] = []
  loading = false
  sortBy: 'recommend' | 'likes' | 'latest' = 'recommend'
  directoryTree: TreeNode[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setSortBy(sort: 'recommend' | 'likes' | 'latest') {
    this.sortBy = sort
  }

  async loadCards(params: GetKnowledgeCardsParams) {
    this.loading = true
    try {
      const data = await getKnowledgeCards(params)
      runInAction(() => {
        this.cards = data
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async loadDirectoryTree() {
    const data = await getDirectoryTree()
    runInAction(() => {
      this.directoryTree = data
    })
  }
}

export const knowledgeStore = new KnowledgeStore()
```

- [ ] **Step 3: Write rankingStore.ts**

```ts
// src/stores/rankingStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getStudyStars, getOriginalStars, getHotStars, getNotifications } from '../service/home'
import type { RankUser, NotificationItem } from '../service/home'

class RankingStore {
  studyStars: RankUser[] = []
  originalStars: RankUser[] = []
  hotStars: RankUser[] = []
  notifications: NotificationItem[] = []
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  async loadAll() {
    this.loading = true
    try {
      const [study, original, hot, notifs] = await Promise.all([
        getStudyStars(),
        getOriginalStars(),
        getHotStars(),
        getNotifications(),
      ])
      runInAction(() => {
        this.studyStars = study
        this.originalStars = original
        this.hotStars = hot
        this.notifications = notifs
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export const rankingStore = new RankingStore()
```

- [ ] **Step 4: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/stores/
git commit -m "feat: add MobX stores for homepage"
```

---

### Task 5: Create layout styles and DashboardLayout

**Files:**
- Create: `src/styles/layout.ts`
- Create: `src/layouts/DashboardLayout.tsx`

- [ ] **Step 1: Write layout styles**

```ts
// src/styles/layout.ts
import styled from '@emotion/styled'
import { COLOR_PRIMARY, COLOR_BG_LAYOUT, COLOR_BG_CONTAINER } from '../theme/colors'

export const DashboardShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${COLOR_BG_LAYOUT};
`

export const DashboardBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

export const SidebarArea = styled.div`
  flex: 0 0 280px;
  overflow-y: auto;
  background: ${COLOR_BG_CONTAINER};
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`

export const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px;
`
```

- [ ] **Step 2: Write DashboardLayout**

```tsx
// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom'
import HomeHeader from '../pages/home/components/HomeHeader'
import HomeSidebar from '../pages/home/components/HomeSidebar'
import { DashboardShell, DashboardBody, SidebarArea, MainArea } from '../styles/layout'

function DashboardLayout() {
  return (
    <DashboardShell>
      <HomeHeader />
      <DashboardBody>
        <SidebarArea>
          <HomeSidebar />
        </SidebarArea>
        <MainArea>
          <Outlet />
        </MainArea>
      </DashboardBody>
    </DashboardShell>
  )
}

export default DashboardLayout
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: Error — HomeHeader and HomeSidebar don't exist yet. This is expected at this step.

- [ ] **Step 4: Commit**

```bash
git add src/styles/layout.ts src/layouts/
git commit -m "feat: add DashboardLayout shell with layout styles"
```

---

### Task 6: Create HomeHeader component

**Files:**
- Create: `src/pages/home/components/HomeHeader/index.tsx`
- Create: `src/pages/home/components/HomeHeader/style.ts`

- [ ] **Step 1: Write HomeHeader style**

```ts
// src/pages/home/components/HomeHeader/style.ts
import styled from '@emotion/styled'
import { COLOR_PRIMARY, COLOR_BG_CONTAINER, COLOR_TEXT, COLOR_TEXT_SECONDARY } from '../../../../theme/colors'

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: ${COLOR_BG_CONTAINER};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${COLOR_PRIMARY};
  letter-spacing: 2px;
  user-select: none;
`

export const NavTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const NavTab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: rgba(26, 58, 74, 0.06);
  }
`

export const SearchWrapper = styled.div`
  width: 320px;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
```

- [ ] **Step 2: Write HomeHeader component**

```tsx
// src/pages/home/components/HomeHeader/index.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import home from '../../../../i18n/locales/zh-CN/home'
import { homeStore } from '../../../../stores/homeStore'
import {
  HeaderBar,
  LeftSection,
  Logo,
  NavTabs,
  NavTab,
  SearchWrapper,
  RightSection,
} from './style'

function HomeHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: home.header.logout,
      onClick: handleLogout,
    },
  ]

  return (
    <HeaderBar>
      <LeftSection>
        <Logo>KMS</Logo>
        <NavTabs>
          <NavTab active={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
            {home.header.home}
          </NavTab>
          <NavTab active={isActive('/dashboard/community')} onClick={() => navigate('/dashboard/community')}>
            {home.header.community}
          </NavTab>
          <NavTab active={isActive('/dashboard/personal')} onClick={() => navigate('/dashboard/personal')}>
            {home.header.personal}
          </NavTab>
        </NavTabs>
      </LeftSection>

      <SearchWrapper>
        <Input.Search
          placeholder={home.header.searchPlaceholder}
          value={homeStore.searchKeyword}
          onChange={(e) => homeStore.setSearchKeyword(e.target.value)}
          onSearch={() => {}}
        />
      </SearchWrapper>

      <RightSection>
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <Avatar size="small" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </RightSection>
    </HeaderBar>
  )
}

export default HomeHeader
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: Only HomeSidebar missing error remains

- [ ] **Step 4: Commit**

```bash
git add src/pages/home/components/HomeHeader/
git commit -m "feat: add HomeHeader component"
```

---

### Task 7: Create HomeSidebar component

**Files:**
- Create: `src/pages/home/components/HomeSidebar/index.tsx`
- Create: `src/pages/home/components/HomeSidebar/style.ts`

- [ ] **Step 1: Write HomeSidebar style**

```ts
// src/pages/home/components/HomeSidebar/style.ts
import styled from '@emotion/styled'
import { COLOR_TEXT, COLOR_TEXT_SECONDARY, COLOR_PRIMARY, COLOR_BG_LAYOUT } from '../../../../theme/colors'

export const SidebarContainer = styled.aside`
  padding: 20px 16px;
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 12px;
`

export const SubTabRow = styled.div`
  display: flex;
  gap: 8px;
`

export const SubTab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT)};
  background: ${({ active }) => (active ? 'rgba(26, 58, 74, 0.08)' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: rgba(26, 58, 74, 0.06);
  }
`

export const TreeWrapper = styled.div`
  .ant-tree {
    background: transparent;
    font-size: 13px;
    color: ${COLOR_TEXT};

    .ant-tree-node-content-wrapper {
      padding: 2px 4px;
    }

    .ant-tree-title {
      font-size: 13px;
    }
  }
`
```

- [ ] **Step 2: Write HomeSidebar component**

```tsx
// src/pages/home/components/HomeSidebar/index.tsx
import { useEffect } from 'react'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import {
  BookOutlined,
  StarOutlined,
  HeartOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  CaretDownFilled,
} from '@ant-design/icons'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import { SidebarContainer, Section, SectionTitle, SubTabRow, SubTab, TreeWrapper } from './style'

function HomeSidebar() {
  useEffect(() => {
    knowledgeStore.loadDirectoryTree()
  }, [])

  const pushActive = homeStore.activePushTab
  const trajectoryActive = homeStore.activeTrajectoryTab

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>{home.sidebar.knowledgePush}</SectionTitle>
        <SubTabRow>
          <SubTab active={pushActive === 'mustread'} onClick={() => homeStore.setActivePushTab('mustread')}>
            <BookOutlined />
            {home.sidebar.mustRead}
          </SubTab>
          <SubTab active={pushActive === 'subscribe'} onClick={() => homeStore.setActivePushTab('subscribe')}>
            <StarOutlined />
            {home.sidebar.subscribe}
          </SubTab>
        </SubTabRow>
      </Section>

      <Section>
        <SectionTitle>{home.sidebar.knowledgeTrajectory}</SectionTitle>
        <SubTabRow>
          <SubTab active={trajectoryActive === 'favorite'} onClick={() => homeStore.setActiveTrajectoryTab('favorite')}>
            <HeartOutlined />
            {home.sidebar.favorite}
          </SubTab>
          <SubTab active={trajectoryActive === 'read'} onClick={() => homeStore.setActiveTrajectoryTab('read')}>
            <EyeOutlined />
            {home.sidebar.read}
          </SubTab>
        </SubTabRow>
      </Section>

      <Section>
        <SectionTitle>{home.sidebar.directory}</SectionTitle>
        <TreeWrapper>
          <Tree
            showIcon
            defaultExpandAll
            treeData={knowledgeStore.directoryTree}
            switcherIcon={<CaretDownFilled style={{ fontSize: 10 }} />}
            icon={({ expanded }) => <FolderOpenOutlined style={{ color: expanded ? '#c8a96e' : undefined }} />}
          />
        </TreeWrapper>
      </Section>
    </SidebarContainer>
  )
}

export default observer(HomeSidebar)
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: No errors (all dependencies now exist)

- [ ] **Step 4: Commit**

```bash
git add src/pages/home/components/HomeSidebar/
git commit -m "feat: add HomeSidebar component"
```

---

### Task 8: Create KnowledgeWaterfall component

**Files:**
- Create: `src/pages/home/components/KnowledgeWaterfall/index.tsx`
- Create: `src/pages/home/components/KnowledgeWaterfall/style.ts`

- [ ] **Step 1: Write KnowledgeWaterfall style**

```ts
// src/pages/home/components/KnowledgeWaterfall/style.ts
import styled from '@emotion/styled'
import {
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_PRIMARY,
  COLOR_BG_CONTAINER,
  COLOR_LINK,
} from '../../../../theme/colors'

export const WaterfallContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SortTabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`

export const SortTab = styled.button<{ active: boolean }>`
  padding: 6px 16px;
  border: 1px solid ${({ active }) => (active ? COLOR_PRIMARY : 'transparent')};
  border-radius: 6px;
  background: ${({ active }) => (active ? 'rgba(26, 58, 74, 0.08)' : 'transparent')};
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

export const CardList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Card = styled.article`
  padding: 20px;
  background: ${COLOR_BG_CONTAINER};
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

export const CardTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

export const CardTitle = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  display: block;
  margin-bottom: 8px;
  text-decoration: none;

  &:hover {
    color: ${COLOR_LINK};
  }
`

export const CardDesc = styled.p`
  font-size: 14px;
  color: ${COLOR_TEXT_SECONDARY};
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`
```

- [ ] **Step 2: Write KnowledgeWaterfall component**

```tsx
// src/pages/home/components/KnowledgeWaterfall/index.tsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Empty, Spin, Tag } from 'antd'
import {
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  LockOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { KnowledgeCard } from '../../../../service/home'
import {
  WaterfallContainer,
  SortTabs,
  SortTab,
  CardList,
  Card,
  CardTags,
  CardTitle,
  CardDesc,
  CardMeta,
  MetaItem,
} from './style'

const SORT_OPTIONS: { key: typeof knowledgeStore.sortBy; label: string }[] = [
  { key: 'recommend', label: home.waterfall.recommend },
  { key: 'likes', label: home.waterfall.mostLikes },
  { key: 'latest', label: home.waterfall.latest },
]

const TAG_COLORS: Record<string, string> = {
  '置顶': 'red',
  '必读': 'blue',
  '热门': 'orange',
  '订阅': 'purple',
  '第三方系统': 'geekblue',
}

const DOC_ICON_MAP: Record<KnowledgeCard['docType'], React.ReactNode> = {
  richtext: <FileTextOutlined />,
  pdf: <FilePdfOutlined />,
  word: <FileWordOutlined />,
  excel: <FileExcelOutlined />,
}

function KnowledgeCardItem({ card }: { card: KnowledgeCard }) {
  return (
    <Card>
      <CardTags>
        {card.tags.map((tag) => (
          <Tag key={tag} color={TAG_COLORS[tag] || 'default'}>
            {tag}
          </Tag>
        ))}
      </CardTags>
      <CardTitle href="#">{card.title}</CardTitle>
      <CardDesc>{card.description}</CardDesc>
      <CardMeta>
        <MetaItem>{DOC_ICON_MAP[card.docType]}</MetaItem>
        <MetaItem>
          <UserOutlined />
          {card.author.name}
        </MetaItem>
        <MetaItem>
          <ClockCircleOutlined />
          {dayjs(card.createdAt).format('YYYY-MM-DD')}
        </MetaItem>
        <MetaItem>
          <EyeOutlined />
          {card.views}
        </MetaItem>
        <MetaItem>
          <LikeOutlined />
          {card.likes}
        </MetaItem>
        {card.isLocked && (
          <MetaItem>
            <LockOutlined />
          </MetaItem>
        )}
      </CardMeta>
    </Card>
  )
}

function KnowledgeWaterfall() {
  useEffect(() => {
    knowledgeStore.loadCards({ tab: 'push', subTab: 'mustread', sortBy: knowledgeStore.sortBy })
  }, [knowledgeStore.sortBy])

  return (
    <WaterfallContainer>
      <SortTabs>
        {SORT_OPTIONS.map((opt) => (
          <SortTab
            key={opt.key}
            active={knowledgeStore.sortBy === opt.key}
            onClick={() => knowledgeStore.setSortBy(opt.key)}
          >
            {opt.label}
          </SortTab>
        ))}
      </SortTabs>

      <Spin spinning={knowledgeStore.loading}>
        <CardList>
          {knowledgeStore.cards.length === 0 ? (
            <Empty description={home.waterfall.empty} />
          ) : (
            knowledgeStore.cards.map((card) => <KnowledgeCardItem key={card.id} card={card} />)
          )}
        </CardList>
      </Spin>
    </WaterfallContainer>
  )
}

export default observer(KnowledgeWaterfall)
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: No errors (only unused DashboardPage/RegisterPage warnings unrelated)

- [ ] **Step 4: Commit**

```bash
git add src/pages/home/components/KnowledgeWaterfall/
git commit -m "feat: add KnowledgeWaterfall component"
```

---

### Task 9: Create RankingPanel component

**Files:**
- Create: `src/pages/home/components/RankingPanel/index.tsx`
- Create: `src/pages/home/components/RankingPanel/style.ts`

- [ ] **Step 1: Write RankingPanel style**

```ts
// src/pages/home/components/RankingPanel/style.ts
import styled from '@emotion/styled'
import { COLOR_TEXT, COLOR_TEXT_SECONDARY, COLOR_BG_CONTAINER, COLOR_LINK } from '../../../../theme/colors'

export const PanelContainer = styled.aside`
  width: 320px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 20px 16px;
  background: ${COLOR_BG_CONTAINER};
  border-left: 1px solid rgba(0, 0, 0, 0.06);
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 12px;
`

export const RankItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.04);
  }
`

export const RankBadge = styled.span<{ rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: ${({ rank }) => (rank === 1 ? '#f5a623' : rank === 2 ? '#9b9b9b' : '#cd7f32')};
  flex-shrink: 0;
`

export const RankInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const RankName = styled.div`
  font-size: 13px;
  color: ${COLOR_TEXT};
`

export const RankDept = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const RankCount = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR_LINK};
  flex-shrink: 0;
`

export const NotifItem = styled.div<{ isRead: boolean }>`
  padding: 8px 0;
  font-size: 13px;
  color: ${({ isRead }) => (isRead ? COLOR_TEXT_SECONDARY : COLOR_TEXT)};
  opacity: ${({ isRead }) => (isRead ? 0.6 : 1)};

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.04);
  }
`

export const NotifTime = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  margin-top: 2px;
`
```

- [ ] **Step 2: Write RankingPanel component**

```tsx
// src/pages/home/components/RankingPanel/index.tsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Badge } from 'antd'
import { rankingStore } from '../../../../stores/rankingStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { RankUser } from '../../../../service/home'
import {
  PanelContainer,
  Section,
  SectionTitle,
  RankItem,
  RankBadge,
  RankInfo,
  RankName,
  RankDept,
  RankCount,
  NotifItem,
  NotifTime,
} from './style'

function RankList({ title, users }: { title: string; users: RankUser[] }) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {users.map((user) => (
        <RankItem key={user.rank}>
          <RankBadge rank={user.rank}>{user.rank}</RankBadge>
          <RankInfo>
            <RankName>{user.name}</RankName>
            <RankDept>{user.department}</RankDept>
          </RankInfo>
          <RankCount>{user.count}</RankCount>
        </RankItem>
      ))}
    </Section>
  )
}

function RankingPanel() {
  useEffect(() => {
    rankingStore.loadAll()
  }, [])

  return (
    <PanelContainer>
      <RankList title={home.ranking.studyStar} users={rankingStore.studyStars} />
      <RankList title={home.ranking.originalStar} users={rankingStore.originalStars} />
      <RankList title={home.ranking.hotStar} users={rankingStore.hotStars} />

      <Section>
        <SectionTitle>
          {home.ranking.notification}
          {rankingStore.notifications.some((n) => !n.isRead) && (
            <Badge
              count={rankingStore.notifications.filter((n) => !n.isRead).length}
              size="small"
              style={{ marginLeft: 8 }}
            />
          )}
        </SectionTitle>
        {rankingStore.notifications.map((item) => (
          <NotifItem key={item.id} isRead={item.isRead}>
            {item.title}
            <NotifTime>{item.time}</NotifTime>
          </NotifItem>
        ))}
      </Section>
    </PanelContainer>
  )
}

export default observer(RankingPanel)
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/home/components/RankingPanel/
git commit -m "feat: add RankingPanel component"
```

---

### Task 10: Create HomePage and update router

**Files:**
- Create: `src/pages/home/index.tsx`
- Modify: `src/router/index.tsx`
- Delete: `src/pages/dashboard/index.tsx`

- [ ] **Step 1: Write HomePage**

```tsx
// src/pages/home/index.tsx
import styled from '@emotion/styled'
import KnowledgeWaterfall from './components/KnowledgeWaterfall'
import RankingPanel from './components/RankingPanel'

const HomeRow = styled.div`
  display: flex;
  height: 100%;
  gap: 0;
`

const HomeMain = styled.div`
  flex: 1;
  min-width: 0;
`

function HomePage() {
  return (
    <HomeRow>
      <HomeMain>
        <KnowledgeWaterfall />
      </HomeMain>
      <RankingPanel />
    </HomeRow>
  )
}

export default HomePage
```

- [ ] **Step 2: Update router**

Replace `src/router/index.tsx` content:

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])

export default router
```

- [ ] **Step 3: Delete old DashboardPage**

```bash
rm src/pages/dashboard/index.tsx
rmdir src/pages/dashboard
```

- [ ] **Step 4: Verify type-check**

Run: `pnpm tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/home/index.tsx src/router/index.tsx
git rm src/pages/dashboard/index.tsx
git commit -m "feat: add HomePage and wire up dashboard routes"
```

---

### Task 11: Write tests

**Files:**
- Create: `src/pages/home/__tests__/HomePage.test.tsx`

- [ ] **Step 1: Write HomePage integration test**

```tsx
// src/pages/home/__tests__/HomePage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import DashboardLayout from '../../../layouts/DashboardLayout'
import HomePage from '../index'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { rankingStore } from '../../../stores/rankingStore'

function renderHomePage() {
  return render(
    <App>
      <MemoryRouter initialEntries={['/dashboard']}>
        <DashboardLayout />
      </MemoryRouter>
    </App>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    // Reset stores before each test
    knowledgeStore.cards = []
    knowledgeStore.loading = false
    rankingStore.studyStars = []
    rankingStore.originalStars = []
    rankingStore.hotStars = []
    rankingStore.notifications = []
  })

  it('renders header with navigation tabs', () => {
    renderHomePage()
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('知识社区')).toBeInTheDocument()
    expect(screen.getByText('个人中心')).toBeInTheDocument()
  })

  it('renders sidebar with sections', () => {
    renderHomePage()
    expect(screen.getByText('知识推送')).toBeInTheDocument()
    expect(screen.getByText('必读')).toBeInTheDocument()
    expect(screen.getByText('订阅')).toBeInTheDocument()
    expect(screen.getByText('知识轨迹')).toBeInTheDocument()
    expect(screen.getByText('收藏')).toBeInTheDocument()
    expect(screen.getByText('读过')).toBeInTheDocument()
    expect(screen.getByText('知识目录')).toBeInTheDocument()
  })

  it('renders sort tabs in waterfall', () => {
    renderHomePage()
    expect(screen.getByText('推荐排序')).toBeInTheDocument()
    expect(screen.getByText('最多点赞')).toBeInTheDocument()
    expect(screen.getByText('最新发布')).toBeInTheDocument()
  })

  it('shows empty state when no cards', async () => {
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText('暂无知识内容')).toBeInTheDocument()
    })
  })

  it('renders ranking panel sections', () => {
    renderHomePage()
    expect(screen.getByText('学习之星')).toBeInTheDocument()
    expect(screen.getByText('原创之星')).toBeInTheDocument()
    expect(screen.getByText('热门之星')).toBeInTheDocument()
    expect(screen.getByText('消息通知')).toBeInTheDocument()
  })

  it('renders knowledge cards when data is loaded', async () => {
    knowledgeStore.cards = [
      {
        id: '1',
        title: '测试知识卡片',
        description: '这是一个测试描述',
        tags: ['置顶'],
        docType: 'richtext',
        author: { name: '测试用户' },
        views: 100,
        likes: 10,
        createdAt: '2026-05-20T08:00:00Z',
        isLocked: true,
      },
    ]
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText('测试知识卡片')).toBeInTheDocument()
      expect(screen.getByText('这是一个测试描述')).toBeInTheDocument()
      expect(screen.getByText('置顶')).toBeInTheDocument()
      expect(screen.getByText('测试用户')).toBeInTheDocument()
    })
  })

  it('toggles sort tabs', async () => {
    const user = userEvent.setup()
    renderHomePage()

    const likesTab = screen.getByText('最多点赞')
    await user.click(likesTab)
    expect(knowledgeStore.sortBy).toBe('likes')
  })
})
```

- [ ] **Step 2: Run tests**

Run: `pnpm test --run`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add src/pages/home/__tests__/
git commit -m "test: add HomePage integration tests"
```

---

### Task 12: Final verification

- [ ] **Step 1: Run full type-check**

Run: `pnpm build`
Expected: No type errors (tsc -b passes), Vite build succeeds

- [ ] **Step 2: Run all tests**

Run: `pnpm test --run`
Expected: All tests pass

- [ ] **Step 3: Start dev server and visually verify**

Run: `pnpm dev`
Navigate to `http://localhost:5173/dashboard`
Expected: Homepage renders with header, sidebar, waterfall, and ranking panel.

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final verification fixes"
```
