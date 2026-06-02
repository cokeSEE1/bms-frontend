import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockPut = vi.hoisted(() => vi.fn())

vi.mock('../client', () => ({
  default: {
    put: mockPut,
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

import { renameDirectoryNode } from '../home'

describe('renameDirectoryNode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls PUT /v1/directory/node with correct params', async () => {
    mockPut.mockResolvedValue({ data: {} })

    await renameDirectoryNode({ dir_id: 42, dir_name: '新目录名' })

    expect(mockPut).toHaveBeenCalledTimes(1)
    expect(mockPut).toHaveBeenCalledWith('/v1/directory/node', {
      dir_id: 42,
      dir_name: '新目录名',
    })
  })

  it('passes dir_name with special characters', async () => {
    mockPut.mockResolvedValue({ data: {} })

    await renameDirectoryNode({ dir_id: 1, dir_name: '测试-目录_2026 (v2)' })

    expect(mockPut).toHaveBeenCalledWith('/v1/directory/node', {
      dir_id: 1,
      dir_name: '测试-目录_2026 (v2)',
    })
  })

  it('passes empty dir_name (relies on backend validation)', async () => {
    mockPut.mockResolvedValue({ data: {} })

    await renameDirectoryNode({ dir_id: 10, dir_name: '' })

    expect(mockPut).toHaveBeenCalledWith('/v1/directory/node', {
      dir_id: 10,
      dir_name: '',
    })
  })

  it('propagates HTTP errors from the backend', async () => {
    const error = new Error('Network Error')
    mockPut.mockRejectedValue(error)

    await expect(renameDirectoryNode({ dir_id: 1, dir_name: 'x' })).rejects.toThrow('Network Error')
  })

  it('propagates 404 when directory not found', async () => {
    const notFound = { response: { status: 404, data: { detail: '目录不存在' } } }
    mockPut.mockRejectedValue(notFound)

    await expect(renameDirectoryNode({ dir_id: 999, dir_name: 'x' })).rejects.toEqual(notFound)
  })

  it('propagates 401 when not authenticated', async () => {
    const unauthorized = { response: { status: 401 } }
    mockPut.mockRejectedValue(unauthorized)

    await expect(renameDirectoryNode({ dir_id: 1, dir_name: 'x' })).rejects.toEqual(unauthorized)
  })
})
