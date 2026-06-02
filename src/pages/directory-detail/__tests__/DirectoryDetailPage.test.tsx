// src/pages/directory-detail/__tests__/DirectoryDetailPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import DirectoryDetailPage from '../index'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { directoryDetailStore } from '../../../stores/directoryDetailStore'

const mockItems = [
  {
    id: 1, name: '前端性能优化实践指南', abstract: '详情', author: '张三',
    createTime: '2026-05-18T10:00:00Z', updateTime: '2026-05-28T10:00:00Z',
    viewCount: 1256, likeCount: 89, dirType: 2, tags: ['前端'], status: 3,
  },
  {
    id: 2, name: 'React 18 新特性详解', abstract: '详情', author: '李四',
    createTime: '2026-05-17T14:30:00Z', updateTime: '2026-05-27T14:30:00Z',
    viewCount: 892, likeCount: 56, dirType: 2, tags: ['React'], status: 3,
  },
  {
    id: 3, name: 'CI/CD 流水线搭建指南', abstract: '详情', author: '周八',
    createTime: '2026-04-27T15:00:00Z', updateTime: '2026-05-07T15:00:00Z',
    viewCount: 534, likeCount: 41, dirType: 2, tags: ['CI/CD'], status: 3,
  },
]

vi.mock('../../../service/knowledge', () => ({
  getKnowledgeList: vi.fn((params: { dirId: number; page: number; pageSize: number; sortField?: string; sortOrder?: string }) => {
    let items = [...mockItems]
    if (params.sortField === 'name') {
      const order = params.sortOrder === 'ascend' ? 1 : -1
      items.sort((a, b) => order * a.name.localeCompare(b.name, 'zh-Hans-CN'))
    }
    const total = items.length
    const start = (params.page - 1) * params.pageSize
    return Promise.resolve({ items: items.slice(start, start + params.pageSize), total })
  }),
}))

function renderComponent(dirId = '1') {
  return render(
    <MemoryRouter initialEntries={[`/dashboard/directory/${dirId}`]}>
      <Routes>
        <Route path="/dashboard/directory/:dirId" element={<DirectoryDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DirectoryDetailPage', () => {
  beforeEach(() => {
    knowledgeStore.directoryTree = [
      {
        title: '前端技术',
        key: '1',
        dirType: 0,
        children: [
          { title: 'React', key: '2', dirType: 0 },
          { title: 'Vue', key: '3', dirType: 0 },
        ],
      },
    ]
  })

  afterEach(() => {
    directoryDetailStore.reset()
    knowledgeStore.directoryTree = []
  })

  it('renders the page with header and content area', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('前端技术')).toBeInTheDocument()
    })
  })

  it('renders breadcrumb path for child directory', async () => {
    renderComponent('2')

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('前端技术')).toBeInTheDocument()
    })
  })

  it('renders knowledge items after loading', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('前端性能优化实践指南')).toBeInTheDocument()
    })
  })

  it('renders sort pills', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('文件名')).toBeInTheDocument()
      expect(screen.getByText('最近更新')).toBeInTheDocument()
      expect(screen.getByText('最高浏览')).toBeInTheDocument()
    })
  })

  it('switches sort when clicking sort pill', async () => {
    const user = userEvent.setup()
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('前端性能优化实践指南')).toBeInTheDocument()
    })

    await user.click(screen.getByText('文件名'))

    await waitFor(() => {
      expect(screen.getByText('CI/CD 流水线搭建指南')).toBeInTheDocument()
    })
  })

  it('does not render pagination when total <= pageSize', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('前端性能优化实践指南')).toBeInTheDocument()
    })

    expect(screen.queryByText(/共 3 条/)).not.toBeInTheDocument()
  })

  it('resets store on unmount', async () => {
    const { unmount } = renderComponent()

    await waitFor(() => {
      expect(screen.getByText('前端技术')).toBeInTheDocument()
    })

    unmount()

    expect(directoryDetailStore.dirId).toBeNull()
    expect(directoryDetailStore.items).toEqual([])
  })
})
