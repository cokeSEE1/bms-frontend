import { describe, it, expect, beforeEach, vi } from 'vitest'
import { runInAction } from 'mobx'
import { knowledgeStore } from '../knowledgeStore'
import type { KnowledgeItem } from '../../service/knowledge'
import { renameDirectoryNode } from '../../service/home'

vi.mock('../../service/knowledge', () => ({
  getKnowledgeList: vi.fn(),
  searchKnowledge: vi.fn(),
}))

vi.mock('../../service/home', () => ({
  getDirectoryTree: vi.fn(),
  createDirectoryNode: vi.fn(),
  renameDirectoryNode: vi.fn(),
  deleteDirectoryNode: vi.fn(),
  moveDirectoryNode: vi.fn(),
  searchDirectoryNodes: vi.fn(),
}))

const MOCK_CARDS: KnowledgeItem[] = [
  {
    id: 1, name: 'React Performance Guide', abstract: 'Learn React optimization',
    author: 'Zhang Wei', createTime: '2026-05-01T00:00:00Z', updateTime: '2026-05-01T00:00:00Z',
    tags: [], viewCount: 100, likeCount: 10, dirType: 0, status: 3,
  },
  {
    id: 2, name: 'TypeScript Handbook', abstract: 'TS type system deep dive',
    author: 'Li Ming', createTime: '2026-05-02T00:00:00Z', updateTime: '2026-05-02T00:00:00Z',
    tags: [], viewCount: 200, likeCount: 20, dirType: 0, status: 3,
  },
  {
    id: 3, name: 'Node.js Best Practices', abstract: 'Node patterns',
    author: 'Zhang Wei', createTime: '2026-05-03T00:00:00Z', updateTime: '2026-05-03T00:00:00Z',
    tags: [], viewCount: 150, likeCount: 15, dirType: 0, status: 3,
  },
]

describe('knowledgeStore', () => {
  beforeEach(() => {
    runInAction(() => {
      knowledgeStore.cards = [...MOCK_CARDS]
      knowledgeStore.searchQuery = ''
      knowledgeStore.searchResults = []
    })
  })

  it('returns all cards when searchQuery is empty', () => {
    knowledgeStore.searchQuery = ''
    expect(knowledgeStore.filteredCards).toEqual(MOCK_CARDS)
  })

  it('returns all cards when searchQuery is whitespace only', () => {
    knowledgeStore.searchQuery = '   '
    expect(knowledgeStore.filteredCards).toEqual(MOCK_CARDS)
  })

  it('returns searchResults when searchQuery is set', () => {
    runInAction(() => {
      knowledgeStore.searchQuery = 'react'
      knowledgeStore.searchResults = [MOCK_CARDS[0]]
    })
    const result = knowledgeStore.filteredCards
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('returns empty array when searchQuery is set but searchResults is empty', () => {
    knowledgeStore.searchQuery = 'nonexistent'
    expect(knowledgeStore.filteredCards).toEqual([])
  })

  it('setSearchQuery updates searchQuery', () => {
    knowledgeStore.setSearchQuery('test')
    expect(knowledgeStore.searchQuery).toBe('test')
  })

  it('clearSearch resets searchQuery and searchResults', () => {
    runInAction(() => {
      knowledgeStore.searchQuery = 'test'
      knowledgeStore.searchResults = [MOCK_CARDS[0]]
    })
    knowledgeStore.clearSearch()
    expect(knowledgeStore.searchQuery).toBe('')
    expect(knowledgeStore.searchResults).toEqual([])
  })
})

describe('knowledgeStore - moveNode', () => {
  it('returns a promise when called', () => {
    expect(typeof knowledgeStore.moveNode).toBe('function')
    const result = knowledgeStore.moveNode(1, 2, 'first-child')
    expect(result).toBeInstanceOf(Promise)
    result.catch(() => {}) // suppress unhandled rejection from unmocked API call
  })
})

describe('knowledgeStore - isDescendantOf', () => {
  beforeEach(() => {
    runInAction(() => {
      knowledgeStore.directoryTreeRaw = [
        {
          title: 'Root', key: '1', dirType: 0,
          children: [
            {
              title: 'Child', key: '2', dirType: 0,
              children: [
                { title: 'Grandchild', key: '3', dirType: 0 },
              ],
            },
          ],
        },
        { title: 'Sibling', key: '4', dirType: 0 },
      ]
      knowledgeStore.rootId = '1'
      knowledgeStore.directoryTree = knowledgeStore.directoryTreeRaw[0]?.children || []
    })
  })

  it('returns true when descendant is a grandchild', () => {
    expect(knowledgeStore.isDescendantOf('1', '3')).toBe(true)
  })

  it('returns true when descendant is a direct child', () => {
    expect(knowledgeStore.isDescendantOf('1', '2')).toBe(true)
  })

  it('returns false when ancestor and descendant are swapped', () => {
    expect(knowledgeStore.isDescendantOf('3', '1')).toBe(false)
  })

  it('returns false for unrelated nodes', () => {
    expect(knowledgeStore.isDescendantOf('2', '4')).toBe(false)
  })

  it('returns false for same node', () => {
    expect(knowledgeStore.isDescendantOf('1', '1')).toBe(false)
  })
})

describe('knowledgeStore - renameNode', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    runInAction(() => {
      knowledgeStore.directoryTreeRaw = [
        {
          title: 'Root', key: '1', dirType: 0,
          children: [
            { title: 'OldName', key: '2', dirType: 0 },
          ],
        },
      ]
      knowledgeStore.directoryTree = knowledgeStore.directoryTreeRaw[0]?.children || []
    })
  })

  it('calls renameDirectoryNode with correct params', async () => {
    vi.mocked(renameDirectoryNode).mockResolvedValue()

    await knowledgeStore.renameNode(2, 'NewName')

    expect(renameDirectoryNode).toHaveBeenCalledTimes(1)
    expect(renameDirectoryNode).toHaveBeenCalledWith({ dir_id: 2, dir_name: 'NewName' })
  })

  it('updates tree locally after successful rename', async () => {
    vi.mocked(renameDirectoryNode).mockResolvedValue()

    await knowledgeStore.renameNode(2, 'NewName')

    const renamed = knowledgeStore.findNodeById('2')
    expect(renamed?.title).toBe('NewName')
  })

  it('updates nested node in a deep tree', async () => {
    vi.mocked(renameDirectoryNode).mockResolvedValue()
    runInAction(() => {
      knowledgeStore.directoryTreeRaw = [
        {
          title: 'Root', key: '1', dirType: 0,
          children: [
            {
              title: 'Mid', key: '2', dirType: 0,
              children: [
                { title: 'DeepOld', key: '3', dirType: 0 },
              ],
            },
          ],
        },
      ]
    })

    await knowledgeStore.renameNode(3, 'DeepNew')

    const renamed = knowledgeStore.findNodeById('3')
    expect(renamed?.title).toBe('DeepNew')
  })

  it('does not update tree when API call fails', async () => {
    vi.mocked(renameDirectoryNode).mockRejectedValue(new Error('Network Error'))

    await expect(knowledgeStore.renameNode(2, 'NewName')).rejects.toThrow('Network Error')

    const node = knowledgeStore.findNodeById('2')
    expect(node?.title).toBe('OldName')
  })
})
