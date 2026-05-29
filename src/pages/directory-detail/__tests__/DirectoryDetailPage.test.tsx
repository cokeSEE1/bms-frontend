// src/pages/directory-detail/__tests__/DirectoryDetailPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DirectoryDetailPage from '../index'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { directoryDetailStore } from '../../../stores/directoryDetailStore'

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

  it('renders pagination when total > pageSize', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(/共 25 条/)).toBeInTheDocument()
    })
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
