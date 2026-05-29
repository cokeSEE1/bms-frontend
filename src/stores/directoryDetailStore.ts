// src/stores/directoryDetailStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getKnowledgeList } from '../service/knowledge'
import type { KnowledgeItem } from '../service/knowledge'

class DirectoryDetailStore {
  dirId: number | null = null
  items: KnowledgeItem[] = []
  total: number = 0
  loading: boolean = false
  page: number = 1
  pageSize: number = 20
  sortField: string = 'updateTime'
  sortOrder: 'ascend' | 'descend' = 'descend'

  constructor() {
    makeAutoObservable(this)
  }

  setSortField(sortField: string) {
    this.sortField = sortField
  }

  setSortOrder(sortOrder: 'ascend' | 'descend') {
    this.sortOrder = sortOrder
  }

  setPage(page: number) {
    this.page = page
  }

  async loadDetail(dirId: number) {
    this.dirId = dirId
    this.page = 1
    this.sortField = 'updateTime'
    this.sortOrder = 'descend'
    await this.fetchList()
  }

  async fetchList() {
    if (this.dirId === null) return
    this.loading = true
    try {
      const res = await getKnowledgeList({
        dirId: this.dirId,
        page: this.page,
        pageSize: this.pageSize,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
      })
      runInAction(() => {
        this.items = res.items
        this.total = res.total
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  reset() {
    this.dirId = null
    this.items = []
    this.total = 0
    this.loading = false
    this.page = 1
    this.sortField = 'updateTime'
    this.sortOrder = 'descend'
  }
}

export const directoryDetailStore = new DirectoryDetailStore()
