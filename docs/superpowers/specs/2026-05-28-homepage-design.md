# Homepage Design

## Overview

KMS 知识库首页。三栏布局（左侧菜单 + 中间内容 + 右侧面板）+ 顶部导航，适配项目品牌色（深蓝绿 `#1a3a4a` + 金色 `#c8a96e` + 暖白背景 `#f5f1eb`）。

## Tech Decisions

| 项 | 决定 |
|---|---|
| 状态管理 | MobX（新增依赖 `mobx` + `mobx-react-lite`） |
| 数据 | 纯 mock，放在 `service/home.ts`，函数签名对齐真实 API |
| 路由 | `/dashboard` 为首页入口，嵌套路由 |
| 布局 | `DashboardLayout` 共享壳，header + outlet rendering |
| 样式 | Emotion styled-components 按组件独立 `style.ts` |
| 组件 | 函数声明 `function Foo() {}`，default export |
| 类型 | `interface UseXxxReturn` 模式 |

## Route Design

```
/ → /login (redirect)
/login → LoginPage
/register → RegisterPage
/dashboard → DashboardLayout
  /dashboard (index) → HomePage
  /dashboard/community → CommunityPage (stub, later)
  /dashboard/personal → PersonalPage (stub, later)
```

`DashboardLayout` renders `<HomeHeader />` + `<HomeSidebar />` + `<Outlet />` + `<RankingPanel />`.

## Component Tree

```
HomePage
  HomeHeader          # 导航tabs + 搜索框 + 用户信息
  HomeSidebar         # 知识推送 / 知识轨迹 / 知识目录
  KnowledgeWaterfall  # 排序tabs + 知识卡片列表
    KnowledgeCardItem # 单张知识卡片
  RankingPanel        # 排行榜 + 通知消息
```

## Data Layer

### homeStore.ts
- `activeMenuTab: 'push' | 'trajectory'` — 左侧菜单主 tab
- `activePushTab / activeTrajectoryTab` — 子 tab 状态
- `searchKeyword` — 搜索关键字（暂时展示用）

### knowledgeStore.ts
- `cards: KnowledgeCard[]` — 知识卡片列表（mock 数据）
- `loading: boolean`
- `sortBy: 'recommend' | 'likes' | 'latest'`
- `directoryTree: TreeNode[]` — 目录树数据

### rankingStore.ts
- `studyStars / originalStars / hotStars: RankUser[]` — 各排行榜 top 3
- `notifications: NotificationItem[]`
- `loading: boolean`

### service/home.ts
- `getKnowledgeCards(params)` → `Promise<KnowledgeCard[]>`
- `getRankings()` → `Promise<RankingData>`
- `getDirectoryTree()` → `Promise<TreeNode[]>`
- `getNotifications()` → `Promise<NotificationItem[]>`

全部返回 `Promise.resolve(mockData)`，后续换真实 API 替换函数体即可。

## Component Specs

### HomeHeader
- 左侧：logo + 导航 tabs（首页高亮、知识社区、个人中心），点击用 `useNavigate`
- 中间：`Input.Search` 搜索框，纯展示不触发搜索
- 右侧：用户头像 + 用户名 dropdown（退出登录：清 localStorage token → `/login`）
- sticky 顶部，z-index 保证在内容之上

### HomeSidebar
- 宽度 ~280px，flex column
- 知识推送区块：标题 + 子 tab 行（必读 / 订阅），Ant Design `Tabs` 或自定义按钮组
- 知识轨迹区块：标题 + 子 tab 行（收藏 / 读过）
- 知识目录区块：Ant Design `Tree` 组件，数据来自 `directoryTree`，全部展开
- 各区块切换通知 `knowledgeStore` 刷新数据

### KnowledgeWaterfall
- 排序 tabs：推荐排序 / 最多点赞 / 最新发布
- 卡片列表渲染 `KnowledgeCardItem`，卡片间间距 16px
- 空状态：Ant Design `Empty` 组件

### KnowledgeCardItem
- 顶部标签行：`Tag` 组件（颜色映射：置顶=red, 热门=orange, 第三方系统=blue）
- 标题：可点击链接（href="#" 占位）
- 摘要：2 行截断，`colorTextSecondary`
- 底部 meta：文档类型图标（richtext/pdf/word/excel 不同 icon） + 作者 + 时间（dayjs 格式化） + 阅读量 + 点赞数
- 锁图标：如果 `isLocked`，右侧显示 LockOutlined
- 整卡有 hover 效果（shadow 提升）

### RankingPanel
- 宽度 ~320px，三个排行区块 + 通知区块
- 每块：标题 + top 3 排名列表
- 排名 1/2/3 分别用金银铜徽章/颜色
- 通知消息：标题 + 时间，`Badge` 标记未读

## Theme Adaptation

与 Figma 设计稿差异：
- 主色调从蓝色 `#2351ea` 改为本项目的深蓝绿 `#1a3a4a`
- 强调色保持金色 `#c8a96e`
- 背景从 `rgb(244,246,249)` 改为 `#f5f1eb`（本项目页面背景色）
- 文字色 `#2c3e50`，次要文字 `#7f8c8d`
- 去掉了 yfd-bg.png 背景图（本项目无此资源），使用纯色背景

## New Dependencies

```bash
pnpm add mobx mobx-react-lite dayjs
```

## Files to Create / Modify

```
NEW:
  src/pages/home/index.tsx
  src/pages/home/components/HomeHeader/index.tsx
  src/pages/home/components/HomeHeader/style.ts
  src/pages/home/components/HomeSidebar/index.tsx
  src/pages/home/components/HomeSidebar/style.ts
  src/pages/home/components/KnowledgeWaterfall/index.tsx
  src/pages/home/components/KnowledgeWaterfall/style.ts
  src/pages/home/components/RankingPanel/index.tsx
  src/pages/home/components/RankingPanel/style.ts
  src/pages/home/__tests__/HomePage.test.tsx
  src/stores/homeStore.ts
  src/stores/knowledgeStore.ts
  src/stores/rankingStore.ts
  src/service/home.ts
  src/styles/layout.ts

MODIFY:
  src/router/index.tsx
```

## Test Plan

- `HomePage.test.tsx`: 渲染三栏布局，验证各子组件存在
- 组件级测试聚焦渲染和用户交互（tab 切换、排序切换）
- Mock MobX stores 以隔离测试
- 遵循项目现有测试模式：`describe/it`，`renderComponent()` helper，`userEvent.setup()`
