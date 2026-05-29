import { describe, it, expect, beforeEach } from 'vitest'
import { runInAction } from 'mobx'
import { knowledgeStore } from '../knowledgeStore'
import type { KnowledgeCard } from '../../service/home'

const MOCK_CARDS: KnowledgeCard[] = [
  {
    id: '1', title: 'React Performance Guide', description: 'Learn React optimization', docType: 'richtext',
    author: { name: 'Zhang Wei' },
    tags: [], views: 100, likes: 10, isLocked: false,
    createdAt: '2026-05-01T00:00:00Z',
  },
  {
    id: '2', title: 'TypeScript Handbook', description: 'TS type system deep dive', docType: 'pdf',
    author: { name: 'Li Ming' },
    tags: [], views: 200, likes: 20, isLocked: false,
    createdAt: '2026-05-02T00:00:00Z',
  },
  {
    id: '3', title: 'Node.js Best Practices', description: 'Node patterns', docType: 'word',
    author: { name: 'Zhang Wei' },
    tags: [], views: 150, likes: 15, isLocked: true,
    createdAt: '2026-05-03T00:00:00Z',
  },
]

describe('knowledgeStore', () => {
  beforeEach(() => {
    runInAction(() => {
      knowledgeStore.cards = [...MOCK_CARDS]
      knowledgeStore.searchQuery = ''
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

  it('filters cards by title (case insensitive)', () => {
    knowledgeStore.searchQuery = 'react'
    const result = knowledgeStore.filteredCards
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('filters cards by author name (case insensitive)', () => {
    knowledgeStore.searchQuery = 'li ming'
    const result = knowledgeStore.filteredCards
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns empty array when no match', () => {
    knowledgeStore.searchQuery = 'nonexistent'
    expect(knowledgeStore.filteredCards).toEqual([])
  })

  it('setSearchQuery updates searchQuery', () => {
    knowledgeStore.setSearchQuery('test')
    expect(knowledgeStore.searchQuery).toBe('test')
  })

  it('clearSearch resets searchQuery to empty', () => {
    knowledgeStore.setSearchQuery('test')
    knowledgeStore.clearSearch()
    expect(knowledgeStore.searchQuery).toBe('')
  })
})

describe('knowledgeStore - moveNode', () => {
  it('returns a promise when called', () => {
    expect(typeof knowledgeStore.moveNode).toBe('function')
    const result = knowledgeStore.moveNode(1, 2, 'above')
    expect(result).toBeInstanceOf(Promise)
    result.catch(() => {}) // suppress unhandled rejection from unmocked API call
  })
})

describe('knowledgeStore - isDescendantOf', () => {
  beforeEach(() => {
    runInAction(() => {
      knowledgeStore.directoryTree = [
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
