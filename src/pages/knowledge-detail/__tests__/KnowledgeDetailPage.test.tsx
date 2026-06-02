import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import KnowledgeDetailPage from '../index'
import { knowledgeDetailStore } from '../../../stores/knowledgeDetailStore'

const mockDetail = {
  id: 1,
  appid: 100,
  kbId: 10,
  cateId: 5,
  name: 'React 性能优化指南',
  content: '<p>This is the content of the knowledge article.</p>',
  abstract: '本文介绍了 React 性能优化的最佳实践',
  author: 'Zhang San',
  creator: 'zhangsan',
  lastModifyUser: 'lisi',
  version: 3,
  maxVersion: 5,
  status: 1,
  isOnline: 1,
  firstReleaseTime: '2026-01-15T00:00:00Z',
  lastReleaseTime: '2026-05-20T00:00:00Z',
  viewCount: 1280,
  likeCount: 89,
  favoriteCount: 42,
  shareNum: 15,
  downloadNum: 8,
  isTop: 0,
  sortOrder: null,
  nameSortKey: null,
  knowledgeType: 1,
  dirType: 2,
  tagIds: null,
  attachmentIds: null,
  createTime: '2026-01-15T08:00:00Z',
  updateTime: '2026-05-28T10:30:00Z',
  kbName: '前端技术库',
  knowledgePath: [
    { dirId: 1, dirName: '前端', dirType: 0 },
    { dirId: 2, dirName: 'React', dirType: 0 },
  ],
  creatorUserInfo: { username: 'zhangsan' },
  lastModifyUserInfo: { username: 'lisi' },
  tagNames: ['React', '性能优化', '前端'],
  isEdit: true,
  isDownload: true,
}

const mockListItems = [
  {
    id: 2, name: 'React 18 新特性', abstract: '', author: 'Li Ming',
    createTime: '2026-05-01T00:00:00Z', updateTime: '2026-05-20T00:00:00Z',
    viewCount: 500, likeCount: 30, dirType: 2, tags: ['React'], status: 1,
  },
  {
    id: 3, name: 'TypeScript 高级类型', abstract: '', author: 'Wang Wu',
    createTime: '2026-04-01T00:00:00Z', updateTime: '2026-05-15T00:00:00Z',
    viewCount: 300, likeCount: 20, dirType: 2, tags: ['TypeScript'], status: 1,
  },
]

const mockGetKnowledgeDetail = vi.fn(() => Promise.resolve(mockDetail))
const mockGetKnowledgeList = vi.fn(() => Promise.resolve({ items: mockListItems, total: 2 }))

vi.mock('../../../service/knowledge', () => ({
  getKnowledgeDetail: (...args: unknown[]) => mockGetKnowledgeDetail(...args),
  getKnowledgeList: (...args: unknown[]) => mockGetKnowledgeList(...args),
  deleteKnowledgeItem: vi.fn(() => Promise.resolve()),
}))

function renderComponent(knowledgeId = '1') {
  return render(
    <MemoryRouter initialEntries={[`/knowledge/${knowledgeId}`]}>
      <Routes>
        <Route path="/knowledge/:knowledgeId" element={<KnowledgeDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('KnowledgeDetailPage', () => {
  beforeEach(() => {
    knowledgeDetailStore.reset()
    vi.clearAllMocks()
  })

  it('renders loading skeleton initially', () => {
    renderComponent()
    expect(document.querySelector('.ant-skeleton')).toBeTruthy()
  })

  it('renders page with detail after loading', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('React 性能优化指南')).toBeTruthy()
    })
  })

  it('renders abstract section', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('摘要')).toBeTruthy()
      expect(screen.getByText('本文介绍了 React 性能优化的最佳实践')).toBeTruthy()
    })
  })

  it('renders content', async () => {
    renderComponent()
    await waitFor(() => {
      const contentEl = document.querySelector('[class*="ContentWrapper"]')
      expect(contentEl).toBeTruthy()
      expect(contentEl!.innerHTML).toContain('This is the content')
    })
  })

  it('renders meta information', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('zhangsan')).toBeTruthy()
      expect(screen.getByText('1280')).toBeTruthy()
    })
  })

  it('renders tags', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('React')).toBeTruthy()
      expect(screen.getByText('性能优化')).toBeTruthy()
      expect(screen.getByText('前端')).toBeTruthy()
    })
  })

  it('renders sidebar with details', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('知识详情')).toBeTruthy()
      expect(screen.getByText('前端技术库')).toBeTruthy()
    })
  })

  it('renders back button', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('返回')).toBeTruthy()
    })
  })

  it('renders comments section', async () => {
    renderComponent()
    await waitFor(() => {
      expect(screen.getByText('评论')).toBeTruthy()
    })
  })
})
