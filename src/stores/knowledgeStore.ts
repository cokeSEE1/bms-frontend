// src/stores/knowledgeStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getKnowledgeCards, getDirectoryTree } from '../service/home'
import type { KnowledgeCard, TreeNode, GetKnowledgeCardsParams } from '../service/home'

class KnowledgeStore {
  cards: KnowledgeCard[] = []
  loading = false
  sortBy: 'recommend' | 'likes' | 'latest' = 'recommend'
  directoryTree: TreeNode[] = []

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
}

export const knowledgeStore = new KnowledgeStore()
