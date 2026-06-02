import { makeAutoObservable, runInAction } from 'mobx'
import {
  createKnowledgeItem,
  updateKnowledgeItem,
  type CreateKnowledgeParams,
  type KnowledgeDetail,
} from '../service/knowledge'

export class KnowledgeEditStore {
  title: string = ''
  content: string = ''
  abstract: string = ''
  author: string = ''
  cateId: number | null = null
  kbId: number = 1
  status: number = 1
  loading: boolean = false
  error: string | null = null
  editId: number | null = null
  submitted: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setTitle(v: string) {
    this.title = v
  }

  setContent(v: string) {
    this.content = v
  }

  setAbstract(v: string) {
    this.abstract = v
  }

  setAuthor(v: string) {
    this.author = v
  }

  setCateId(v: number | null) {
    this.cateId = v
  }

  loadForEdit(detail: KnowledgeDetail) {
    this.editId = detail.id
    this.title = detail.name
    this.content = detail.content ?? ''
    this.abstract = detail.abstract ?? ''
    this.author = detail.author ?? ''
    this.cateId = detail.cateId
    this.kbId = detail.kbId
    this.status = detail.status
  }

  async submit() {
    this.loading = true
    this.error = null

    const body: CreateKnowledgeParams = {
      kb_id: this.kbId,
      cate_id: this.cateId,
      name: this.title,
      content: this.content || null,
      abstract: this.abstract || null,
      author: this.author || null,
      status: this.status,
      knowledge_type: 0,
      dir_type: 2,
    }

    try {
      if (this.editId !== null) {
        await updateKnowledgeItem(this.editId, body)
      } else {
        const result = await createKnowledgeItem(body)
        runInAction(() => {
          this.editId = result.id
          this.submitted = true
          this.loading = false
        })
        return
      }
      runInAction(() => {
        this.submitted = true
        this.loading = false
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : '提交知识条目失败'
        this.loading = false
      })
    }
  }

  reset() {
    this.title = ''
    this.content = ''
    this.abstract = ''
    this.author = ''
    this.cateId = null
    this.kbId = 1
    this.status = 1
    this.loading = false
    this.error = null
    this.editId = null
    this.submitted = false
  }
}

export const knowledgeEditStore = new KnowledgeEditStore()
