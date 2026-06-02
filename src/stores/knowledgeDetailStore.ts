import { makeAutoObservable, runInAction } from 'mobx'
import {
  getKnowledgeDetail,
  getKnowledgeList,
  deleteKnowledgeItem,
  likeItem,
  favoriteItem,
  shareItem,
  getComments,
  postComment,
  type KnowledgeDetail,
  type KnowledgeItem,
} from '../service/knowledge'

export interface CommentItem {
  id: string
  author: string
  content: string
  createdAt: string
}

export class KnowledgeDetailStore {
  detail: KnowledgeDetail | null = null
  loading = false
  error: string | null = null

  comments: CommentItem[] = []
  commentsLoading = false
  commentsError: string | null = null
  commentsPage = 1
  commentsHasMore = false

  relatedItems: KnowledgeItem[] = []
  relatedLoading = false
  relatedError: string | null = null

  isFavorited = false
  isLiked = false
  localFavoriteCount = 0
  localLikeCount = 0
  localShareNum = 0

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

  async loadComments(knowledgeId: number) {
    this.commentsLoading = true
    this.commentsError = null
    this.commentsPage = 1
    try {
      const data = await getComments(knowledgeId, 1)
      runInAction(() => {
        this.comments = data.items.map((item) => ({
          id: String(item.id),
          author: item.user_id ? String(item.user_id) : '匿名',
          content: item.content,
          createdAt: item.create_time,
        }))
        this.commentsHasMore = this.comments.length < data.total
        this.commentsLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.commentsError = e instanceof Error ? e.message : '加载评论失败'
        this.commentsLoading = false
      })
    }
  }

  async loadMoreComments(knowledgeId: number) {
    this.commentsLoading = true
    this.commentsError = null
    const nextPage = this.commentsPage + 1
    try {
      const data = await getComments(knowledgeId, nextPage)
      runInAction(() => {
        const newItems = data.items.map((item) => ({
          id: String(item.id),
          author: item.user_id ? String(item.user_id) : '匿名',
          content: item.content,
          createdAt: item.create_time,
        }))
        this.comments = [...this.comments, ...newItems]
        this.commentsPage = nextPage
        this.commentsHasMore = this.comments.length < data.total
        this.commentsLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.commentsError = e instanceof Error ? e.message : '加载评论失败'
        this.commentsLoading = false
      })
    }
  }

  async addComment(content: string) {
    if (!this.detail) return
    const tempComment: CommentItem = {
      id: String(Date.now()),
      author: localStorage.getItem('username') ?? '当前用户',
      content,
      createdAt: new Date().toLocaleString('zh-CN'),
    }
    runInAction(() => {
      this.comments = [tempComment, ...this.comments]
    })
    try {
      const data = await postComment(this.detail.id, content)
      runInAction(() => {
        this.comments = this.comments.map((c) =>
          c.id === tempComment.id
            ? { ...c, id: String(data.id), createdAt: data.create_time }
            : c,
        )
      })
    } catch {
      runInAction(() => {
        this.comments = this.comments.filter((c) => c.id !== tempComment.id)
      })
    }
  }

  async loadRelated(cateId: number, excludeId: number) {
    this.relatedLoading = true
    this.relatedError = null
    try {
      const data = await getKnowledgeList({
        dirId: cateId,
        page: 1,
        pageSize: 5,
      })
      runInAction(() => {
        this.relatedItems = data.items.filter((item) => item.id !== excludeId)
        this.relatedLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.relatedError = e instanceof Error ? e.message : '加载相关知识失败'
        this.relatedLoading = false
      })
    }
  }

  async toggleFavorite() {
    const action = this.isFavorited ? 'unfavorite' : 'favorite'
    this.isFavorited = !this.isFavorited
    this.localFavoriteCount += this.isFavorited ? 1 : -1
    try {
      await favoriteItem(this.detail!.id, action)
    } catch {
      this.isFavorited = !this.isFavorited
      this.localFavoriteCount += this.isFavorited ? 1 : -1
    }
  }

  async toggleLike() {
    const action = this.isLiked ? 'unlike' : 'like'
    this.isLiked = !this.isLiked
    this.localLikeCount += this.isLiked ? 1 : -1
    try {
      await likeItem(this.detail!.id, action)
    } catch {
      this.isLiked = !this.isLiked
      this.localLikeCount += this.isLiked ? 1 : -1
    }
  }

  async incrementShare() {
    this.localShareNum += 1
    try {
      await shareItem(this.detail!.id)
    } catch {
      this.localShareNum -= 1
    }
  }

  async deleteKnowledge(knowledgeId: number): Promise<void> {
    await deleteKnowledgeItem(knowledgeId)
  }

  get displayFavoriteCount(): number {
    return (this.detail?.favoriteCount ?? 0) + this.localFavoriteCount
  }

  get displayLikeCount(): number {
    return (this.detail?.likeCount ?? 0) + this.localLikeCount
  }

  get displayShareNum(): number {
    return (this.detail?.shareNum ?? 0) + this.localShareNum
  }

  reset() {
    this.detail = null
    this.loading = false
    this.error = null
    this.comments = []
    this.commentsLoading = false
    this.commentsError = null
    this.commentsPage = 1
    this.commentsHasMore = false
    this.relatedItems = []
    this.relatedLoading = false
    this.relatedError = null
    this.isFavorited = false
    this.isLiked = false
    this.localFavoriteCount = 0
    this.localLikeCount = 0
    this.localShareNum = 0
  }
}

export const knowledgeDetailStore = new KnowledgeDetailStore()
