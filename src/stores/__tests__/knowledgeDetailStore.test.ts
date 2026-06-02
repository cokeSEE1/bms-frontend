import { describe, it, expect, beforeEach, vi } from 'vitest'
import { runInAction } from 'mobx'
import { knowledgeDetailStore } from '../knowledgeDetailStore'

const mockDetail = {
  id: 1,
  appid: 100,
  kbId: 10,
  cateId: 5,
  name: 'Test Knowledge',
  content: '<p>Hello</p>',
  abstract: 'Test abstract',
  author: 'Author Name',
  creator: 'creator1',
  lastModifyUser: 'modifier1',
  version: 2,
  maxVersion: 5,
  status: 1,
  isOnline: 1,
  firstReleaseTime: '2026-01-01T00:00:00Z',
  lastReleaseTime: '2026-05-01T00:00:00Z',
  viewCount: 100,
  likeCount: 10,
  favoriteCount: 5,
  shareNum: 3,
  downloadNum: 2,
  isTop: 0,
  sortOrder: null,
  nameSortKey: null,
  knowledgeType: 1,
  dirType: 2,
  tagIds: null,
  attachmentIds: null,
  createTime: '2026-01-01T00:00:00Z',
  updateTime: '2026-05-28T10:00:00Z',
  kbName: 'Test KB',
  knowledgePath: [{ dirId: 1, dirName: 'Root', dirType: 0 }],
  creatorUserInfo: { username: 'creator1' },
  lastModifyUserInfo: { username: 'modifier1' },
  tagNames: ['frontend', 'react'],
  isEdit: true,
  isDownload: true,
}

const mockListItems = [
  {
    id: 2, name: 'Related 1', abstract: '', author: 'Author A',
    createTime: '', updateTime: '', viewCount: 50, likeCount: 3,
    dirType: 2, tags: [], status: 1,
  },
  {
    id: 3, name: 'Related 2', abstract: '', author: 'Author B',
    createTime: '', updateTime: '', viewCount: 30, likeCount: 2,
    dirType: 2, tags: [], status: 1,
  },
]

vi.mock('../../service/knowledge', () => ({
  getKnowledgeDetail: vi.fn(() => Promise.resolve(mockDetail)),
  getKnowledgeList: vi.fn(() => Promise.resolve({ items: mockListItems, total: 2 })),
  deleteKnowledgeItem: vi.fn(() => Promise.resolve()),
  updateKnowledgeItem: vi.fn(() => Promise.resolve()),
  likeItem: vi.fn(() => Promise.resolve()),
  favoriteItem: vi.fn(() => Promise.resolve()),
  shareItem: vi.fn(() => Promise.resolve()),
  getComments: vi.fn(() => Promise.resolve({
    total: 2,
    items: [
      { id: 1, knowledge_id: 1, user_id: 1, content: 'Comment 1', create_time: '2026-01-01T00:00:00Z' },
      { id: 2, knowledge_id: 1, user_id: 2, content: 'Comment 2', create_time: '2026-01-02T00:00:00Z' },
    ],
  })),
  postComment: vi.fn(() => Promise.resolve({
    id: 3, knowledge_id: 1, user_id: 1, content: 'New', create_time: '2026-06-01T00:00:00Z',
  })),
}))

import { likeItem, favoriteItem, shareItem, getComments, postComment } from '../../service/knowledge'

describe('knowledgeDetailStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    knowledgeDetailStore.reset()
  })

  describe('initial state', () => {
    it('has null detail', () => {
      expect(knowledgeDetailStore.detail).toBeNull()
    })

    it('has loading=false', () => {
      expect(knowledgeDetailStore.loading).toBe(false)
    })

    it('has null error', () => {
      expect(knowledgeDetailStore.error).toBeNull()
    })

    it('has empty comments', () => {
      expect(knowledgeDetailStore.comments).toEqual([])
    })

    it('has empty related items', () => {
      expect(knowledgeDetailStore.relatedItems).toEqual([])
    })

    it('has isFavorited=false', () => {
      expect(knowledgeDetailStore.isFavorited).toBe(false)
    })

    it('has isLiked=false', () => {
      expect(knowledgeDetailStore.isLiked).toBe(false)
    })

    it('has commentsPage=1', () => {
      expect(knowledgeDetailStore.commentsPage).toBe(1)
    })

    it('has commentsHasMore=false', () => {
      expect(knowledgeDetailStore.commentsHasMore).toBe(false)
    })
  })

  describe('loadDetail', () => {
    it('sets loading and detail on success', async () => {
      const promise = knowledgeDetailStore.loadDetail(1)
      expect(knowledgeDetailStore.loading).toBe(true)
      await promise
      expect(knowledgeDetailStore.loading).toBe(false)
      expect(knowledgeDetailStore.detail).toEqual(mockDetail)
    })
  })

  describe('toggleFavorite', () => {
    beforeEach(() => {
      runInAction(() => {
        knowledgeDetailStore.detail = mockDetail
      })
    })

    it('calls favoriteItem with "favorite" when not favorited', async () => {
      await knowledgeDetailStore.toggleFavorite()
      expect(favoriteItem).toHaveBeenCalledWith(1, 'favorite')
    })

    it('calls favoriteItem with "unfavorite" when favorited', async () => {
      runInAction(() => { knowledgeDetailStore.isFavorited = true })
      await knowledgeDetailStore.toggleFavorite()
      expect(favoriteItem).toHaveBeenCalledWith(1, 'unfavorite')
    })

    it('flips isFavorited optimistically', async () => {
      expect(knowledgeDetailStore.isFavorited).toBe(false)
      await knowledgeDetailStore.toggleFavorite()
      expect(knowledgeDetailStore.isFavorited).toBe(true)
    })

    it('rolls back isFavorited on API failure', async () => {
      vi.mocked(favoriteItem).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.toggleFavorite()
      expect(knowledgeDetailStore.isFavorited).toBe(false)
    })

    it('rolls back localFavoriteCount on API failure', async () => {
      vi.mocked(favoriteItem).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.toggleFavorite()
      expect(knowledgeDetailStore.localFavoriteCount).toBe(0)
    })
  })

  describe('toggleLike', () => {
    beforeEach(() => {
      runInAction(() => {
        knowledgeDetailStore.detail = mockDetail
      })
    })

    it('calls likeItem with "like" when not liked', async () => {
      await knowledgeDetailStore.toggleLike()
      expect(likeItem).toHaveBeenCalledWith(1, 'like')
    })

    it('calls likeItem with "unlike" when liked', async () => {
      runInAction(() => { knowledgeDetailStore.isLiked = true })
      await knowledgeDetailStore.toggleLike()
      expect(likeItem).toHaveBeenCalledWith(1, 'unlike')
    })

    it('flips isLiked optimistically', async () => {
      expect(knowledgeDetailStore.isLiked).toBe(false)
      await knowledgeDetailStore.toggleLike()
      expect(knowledgeDetailStore.isLiked).toBe(true)
    })

    it('rolls back isLiked on API failure', async () => {
      vi.mocked(likeItem).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.toggleLike()
      expect(knowledgeDetailStore.isLiked).toBe(false)
    })

    it('rolls back localLikeCount on API failure', async () => {
      vi.mocked(likeItem).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.toggleLike()
      expect(knowledgeDetailStore.localLikeCount).toBe(0)
    })
  })

  describe('incrementShare', () => {
    beforeEach(() => {
      runInAction(() => {
        knowledgeDetailStore.detail = mockDetail
      })
    })

    it('calls shareItem and increments local counter', async () => {
      await knowledgeDetailStore.incrementShare()
      expect(shareItem).toHaveBeenCalledWith(1)
      expect(knowledgeDetailStore.localShareNum).toBe(1)
    })

    it('rolls back on API failure', async () => {
      vi.mocked(shareItem).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.incrementShare()
      expect(knowledgeDetailStore.localShareNum).toBe(0)
    })
  })

  describe('display computed properties', () => {
    beforeEach(() => {
      runInAction(() => {
        knowledgeDetailStore.detail = mockDetail
      })
    })

    it('displayFavoriteCount includes local offset', async () => {
      expect(knowledgeDetailStore.displayFavoriteCount).toBe(5)
      await knowledgeDetailStore.toggleFavorite()
      expect(knowledgeDetailStore.displayFavoriteCount).toBe(6)
    })

    it('displayLikeCount includes local offset', async () => {
      expect(knowledgeDetailStore.displayLikeCount).toBe(10)
      await knowledgeDetailStore.toggleLike()
      expect(knowledgeDetailStore.displayLikeCount).toBe(11)
    })

    it('displayShareNum includes local offset', async () => {
      expect(knowledgeDetailStore.displayShareNum).toBe(3)
      await knowledgeDetailStore.incrementShare()
      expect(knowledgeDetailStore.displayShareNum).toBe(4)
    })
  })

  describe('loadComments', () => {
    it('loads comments from API with page=1 and resets page', async () => {
      knowledgeDetailStore.commentsPage = 5
      await knowledgeDetailStore.loadComments(1)
      expect(getComments).toHaveBeenCalledWith(1, 1)
      expect(knowledgeDetailStore.commentsPage).toBe(1)
      expect(knowledgeDetailStore.commentsLoading).toBe(false)
      expect(knowledgeDetailStore.comments).toHaveLength(2)
      expect(knowledgeDetailStore.comments[0].author).toBe('1')
      expect(knowledgeDetailStore.comments[0].content).toBe('Comment 1')
    })

    it('sets commentsHasMore=true when total exceeds loaded count', async () => {
      await knowledgeDetailStore.loadComments(1)
      expect(knowledgeDetailStore.commentsHasMore).toBe(false) // 2 items, total=2
    })
  })

  describe('loadMoreComments', () => {
    it('appends comments and increments page', async () => {
      await knowledgeDetailStore.loadComments(1)
      expect(knowledgeDetailStore.comments).toHaveLength(2)
      expect(knowledgeDetailStore.commentsPage).toBe(1)

      await knowledgeDetailStore.loadMoreComments(1)
      expect(getComments).toHaveBeenCalledWith(1, 2)
      expect(knowledgeDetailStore.comments).toHaveLength(4)
      expect(knowledgeDetailStore.commentsPage).toBe(2)
    })

    it('sets commentsHasMore based on total', async () => {
      await knowledgeDetailStore.loadComments(1)
      await knowledgeDetailStore.loadMoreComments(1)
      // total=2, we loaded 2+2=4 items, so total(2) < loaded(4) = hasMore=false
      expect(knowledgeDetailStore.commentsHasMore).toBe(false)
    })

    it('sets error on API failure', async () => {
      vi.mocked(getComments).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.loadMoreComments(1)
      expect(knowledgeDetailStore.commentsError).toBe('Network')
      expect(knowledgeDetailStore.commentsLoading).toBe(false)
    })
  })

  describe('addComment', () => {
    beforeEach(() => {
      runInAction(() => {
        knowledgeDetailStore.detail = mockDetail
      })
    })

    it('calls postComment and prepends comment optimistically', async () => {
      const promise = knowledgeDetailStore.addComment('Great article!')
      expect(knowledgeDetailStore.comments[0].content).toBe('Great article!')
      await promise
      expect(postComment).toHaveBeenCalledWith(1, 'Great article!')
    })

    it('replaces temp id with server id on success', async () => {
      await knowledgeDetailStore.addComment('Test')
      expect(knowledgeDetailStore.comments[0].id).toBe('3')
    })

    it('removes temp comment on API failure', async () => {
      vi.mocked(postComment).mockRejectedValueOnce(new Error('Network'))
      await knowledgeDetailStore.addComment('Fail')
      expect(knowledgeDetailStore.comments).toHaveLength(0)
    })
  })

  describe('reset', () => {
    it('clears all state', async () => {
      await knowledgeDetailStore.loadDetail(1)
      knowledgeDetailStore.toggleFavorite()
      knowledgeDetailStore.toggleLike()
      await knowledgeDetailStore.addComment('test')

      knowledgeDetailStore.reset()

      expect(knowledgeDetailStore.detail).toBeNull()
      expect(knowledgeDetailStore.isFavorited).toBe(false)
      expect(knowledgeDetailStore.isLiked).toBe(false)
      expect(knowledgeDetailStore.comments).toEqual([])
      expect(knowledgeDetailStore.commentsPage).toBe(1)
      expect(knowledgeDetailStore.commentsHasMore).toBe(false)
      expect(knowledgeDetailStore.relatedItems).toEqual([])
      expect(knowledgeDetailStore.localFavoriteCount).toBe(0)
      expect(knowledgeDetailStore.localLikeCount).toBe(0)
      expect(knowledgeDetailStore.localShareNum).toBe(0)
    })
  })
})
