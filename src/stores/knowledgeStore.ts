// src/stores/knowledgeStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getKnowledgeCards, getDirectoryTree } from '../service/home'
import type { KnowledgeCard, TreeNode, GetKnowledgeCardsParams } from '../service/home'

class KnowledgeStore {
  cards: KnowledgeCard[] = []
  loading = false
  sortBy: 'recommend' | 'likes' | 'latest' = 'recommend'
  directoryTree: TreeNode[] = []
  searchQuery = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSortBy(sort: 'recommend' | 'likes' | 'latest') {
    this.sortBy = sort
  }

  async loadCards(params: GetKnowledgeCardsParams) {
    this.loading = true
    try {
      const data = await getKnowledgeCards(params)
      runInAction(() => {
        this.cards = data
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async loadDirectoryTree() {
    const data = await getDirectoryTree()
    runInAction(() => {
      this.directoryTree = data
    })
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  clearSearch() {
    this.searchQuery = ''
  }

  get filteredCards(): KnowledgeCard[] {
    const query = this.searchQuery.trim()
    if (!query) {
      return this.cards
    }
    const lower = query.toLowerCase()
    return this.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(lower) ||
        card.author.name.toLowerCase().includes(lower),
    )
  }
}

export const knowledgeStore = new KnowledgeStore()
