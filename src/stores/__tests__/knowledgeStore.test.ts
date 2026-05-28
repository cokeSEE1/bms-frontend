import { describe, it, expect, beforeEach } from 'vitest'
import { runInAction } from 'mobx'
import { knowledgeStore } from '../knowledgeStore'
import type { KnowledgeCard } from '../../service/home'

const MOCK_CARDS: KnowledgeCard[] = [
  {
    id: '1', title: 'React Performance Guide', docType: 'richtext',
    author: { id: 'a1', name: 'Zhang Wei' },
    tags: [], views: 100, likes: 10, isLocked: false,
    createdAt: '2026-05-01T00:00:00Z',
  },
  {
    id: '2', title: 'TypeScript Handbook', docType: 'pdf',
    author: { id: 'a2', name: 'Li Ming' },
    tags: [], views: 200, likes: 20, isLocked: false,
    createdAt: '2026-05-02T00:00:00Z',
  },
  {
    id: '3', title: 'Node.js Best Practices', docType: 'word',
    author: { id: 'a1', name: 'Zhang Wei' },
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
