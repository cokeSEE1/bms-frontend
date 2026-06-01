import { makeAutoObservable, runInAction } from 'mobx'
import { getKnowledgeDetail, type KnowledgeDetail } from '../service/knowledge'

export class KnowledgeDetailStore {
  detail: KnowledgeDetail | null = null
  loading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async loadDetail(knowledgeId: number) {
    this.loading = true
    this.error = null
    try {
      const data = await getKnowledgeDetail(knowledgeId)
      runInAction(() => {
        this.detail = data
        this.loading = false
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : '加载知识详情失败'
        this.loading = false
      })
    }
  }

  reset() {
    this.detail = null
    this.loading = false
    this.error = null
  }
}

export const knowledgeDetailStore = new KnowledgeDetailStore()
