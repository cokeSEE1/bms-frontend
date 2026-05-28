import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { App } from 'antd'
import { runInAction } from 'mobx'
import DashboardLayout from '../../../layouts/DashboardLayout'
import HomePage from '../index'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { rankingStore } from '../../../stores/rankingStore'
import { homeStore } from '../../../stores/homeStore'
import home from '../../../i18n/locales/zh-CN/home'

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
      knowledgeStore.searchQuery = ''
      homeStore.searchKeyword = ''
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

  it('sets searchQuery on knowledgeStore when Enter is pressed', async () => {
    renderHomePage()

    const searchInput = screen.getByPlaceholderText(home.header.searchPlaceholder)
    fireEvent.change(searchInput, { target: { value: 'react' } })
    expect(homeStore.searchKeyword).toBe('react')

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

    expect(knowledgeStore.searchQuery).toBe('react')
  })

  it('clears searchQuery when user types after a search', async () => {
    renderHomePage()

    const searchInput = screen.getByPlaceholderText(home.header.searchPlaceholder)
    fireEvent.change(searchInput, { target: { value: 'react' } })
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })
    expect(knowledgeStore.searchQuery).toBe('react')

    fireEvent.change(searchInput, { target: { value: 'new search' } })
    expect(knowledgeStore.searchQuery).toBe('')
  })

  it('shows search indicator with result count when searchQuery is set', async () => {
    runInAction(() => {
      knowledgeStore.cards = [
        {
          id: '1',
          title: 'React 入门指南',
          description: 'React 基础知识',
          tags: ['置顶'],
          docType: 'richtext' as const,
          author: { name: '张三' },
          views: 100,
          likes: 10,
          createdAt: '2026-05-20T08:00:00Z',
          isLocked: false,
        },
        {
          id: '2',
          title: 'Vue 高级教程',
          description: 'Vue 进阶内容',
          tags: [],
          docType: 'pdf' as const,
          author: { name: '李四' },
          views: 50,
          likes: 5,
          createdAt: '2026-05-21T08:00:00Z',
          isLocked: false,
        },
      ]
      knowledgeStore.searchQuery = 'react'
    })
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText(/搜索结果/)).toBeInTheDocument()
      expect(screen.getByText(/1 条/)).toBeInTheDocument()
      expect(screen.getByText('React 入门指南')).toBeInTheDocument()
    })
  })

  it('clears search and hides indicator when clear button is clicked', async () => {
    const user = userEvent.setup()
    runInAction(() => {
      knowledgeStore.cards = [
        {
          id: '1',
          title: 'React 入门指南',
          description: 'React 基础知识',
          tags: [],
          docType: 'richtext' as const,
          author: { name: '张三' },
          views: 100,
          likes: 10,
          createdAt: '2026-05-20T08:00:00Z',
          isLocked: false,
        },
      ]
      knowledgeStore.searchQuery = 'react'
    })
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText(/搜索结果/)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: home.waterfall.clearSearch }))
    expect(knowledgeStore.searchQuery).toBe('')
    expect(homeStore.searchKeyword).toBe('')
  })
})
