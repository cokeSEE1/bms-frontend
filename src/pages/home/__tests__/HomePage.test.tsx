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

const renderHomePage = () => {
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
      knowledgeStore.searchLoading = false
      knowledgeStore.sortBy = 'recommend'
      knowledgeStore.searchQuery = ''
      knowledgeStore.searchResults = []
      homeStore.searchKeyword = ''
      homeStore.sidebarCollapsed = false
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
    expect(screen.getByText(home.ranking.knowledgeStar)).toBeInTheDocument()
    expect(screen.getByText(home.ranking.notification)).toBeInTheDocument()
  })

  it('renders sidebar toggle handle', () => {
    renderHomePage()
    // SidebarHandle renders LeftOutlined icon when expanded
    expect(screen.getByText(home.sidebar.directory)).toBeInTheDocument()
  })

  it('collapses sidebar when handle is clicked', async () => {
    const user = userEvent.setup()
    renderHomePage()
    expect(screen.getByText(home.sidebar.directory)).toBeInTheDocument()
    // SidebarHandle is between SidebarArea and MainArea, find the LeftOutlined icon
    const handle = document.querySelector('.anticon-left')
    await user.click(handle!)
    expect(screen.queryByText(home.sidebar.directory)).not.toBeInTheDocument()
  })

  it('renders knowledge cards when data is loaded', async () => {
    runInAction(() => {
      knowledgeStore.cards = [
        {
          id: 1,
          name: '测试知识卡片',
          abstract: '这是一个测试描述',
          tags: ['置顶'],
          author: '测试用户',
          viewCount: 100,
          likeCount: 10,
          createTime: '2026-05-20T08:00:00Z',
          updateTime: '2026-05-20T08:00:00Z',
          dirType: 0,
          status: 3,
        },
      ]
    })
    renderHomePage()
    await waitFor(() => {
      expect(screen.getByText('测试知识卡片')).toBeInTheDocument()
      expect(screen.getByText('置顶')).toBeInTheDocument()
      expect(screen.getAllByText('测试用户').length).toBeGreaterThanOrEqual(1)
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
          id: 1,
          name: 'React 入门指南',
          abstract: 'React 基础知识',
          tags: ['置顶'],
          author: '张三',
          viewCount: 100,
          likeCount: 10,
          createTime: '2026-05-20T08:00:00Z',
          updateTime: '2026-05-20T08:00:00Z',
          dirType: 0,
          status: 3,
        },
        {
          id: 2,
          name: 'Vue 高级教程',
          abstract: 'Vue 进阶内容',
          tags: [],
          author: '李四',
          viewCount: 50,
          likeCount: 5,
          createTime: '2026-05-21T08:00:00Z',
          updateTime: '2026-05-21T08:00:00Z',
          dirType: 0,
          status: 3,
        },
      ]
      knowledgeStore.searchQuery = 'react'
      knowledgeStore.searchResults = [
        {
          id: 1,
          name: 'React 入门指南',
          abstract: 'React 基础知识',
          tags: ['置顶'],
          author: '张三',
          viewCount: 100,
          likeCount: 10,
          createTime: '2026-05-20T08:00:00Z',
          updateTime: '2026-05-20T08:00:00Z',
          dirType: 0,
          status: 3,
        },
      ]
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
    const card = {
      id: 1,
      name: 'React 入门指南',
      abstract: 'React 基础知识',
      tags: [],
      author: '张三',
      viewCount: 100,
      likeCount: 10,
      createTime: '2026-05-20T08:00:00Z',
      updateTime: '2026-05-20T08:00:00Z',
      dirType: 0,
      status: 3,
    }
    runInAction(() => {
      knowledgeStore.cards = [card]
      knowledgeStore.searchQuery = 'react'
      knowledgeStore.searchResults = [card]
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
