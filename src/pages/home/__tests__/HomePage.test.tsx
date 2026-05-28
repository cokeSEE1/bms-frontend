import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { App } from 'antd'
import { runInAction } from 'mobx'
import DashboardLayout from '../../../layouts/DashboardLayout'
import HomePage from '../index'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { rankingStore } from '../../../stores/rankingStore'

function renderHomePage() {
  return render(
    <App>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </App>,
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.setItem('username', '测试用户')
    vi.spyOn(knowledgeStore, 'loadCards').mockResolvedValue(undefined)
    vi.spyOn(knowledgeStore, 'loadDirectoryTree').mockResolvedValue(undefined)
    vi.spyOn(rankingStore, 'loadAll').mockResolvedValue(undefined)
    runInAction(() => {
      knowledgeStore.cards = []
      knowledgeStore.loading = false
      knowledgeStore.sortBy = 'recommend'
      rankingStore.studyStars = []
      rankingStore.originalStars = []
      rankingStore.hotStars = []
      rankingStore.notifications = []
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
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
    expect(screen.getByText('知识之星（7月）')).toBeInTheDocument()
    expect(screen.getByText('了解更多')).toBeInTheDocument()
    expect(screen.getByText('消息通知')).toBeInTheDocument()
    expect(screen.getByText('查看全部')).toBeInTheDocument()
  })

  it('renders knowledge cards when data is loaded', async () => {
    runInAction(() => {
      knowledgeStore.cards = [
        {
          id: '1',
          title: '测试知识卡片',
          description: '这是一个测试描述',
          tags: ['置顶'],
          docType: 'richtext' as const,
          author: { name: '测试用户' },
          views: 100,
          likes: 10,
          createdAt: '2026-05-20T08:00:00Z',
          isLocked: true,
        },
      ]
    })
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText('测试知识卡片')).toBeInTheDocument()
      expect(screen.getByText('置顶')).toBeInTheDocument()
      expect(screen.getAllByText('测试用户').length).toBeGreaterThanOrEqual(2)
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
