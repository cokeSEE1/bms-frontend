// src/stores/rankingStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import { getStudyStars, getOriginalStars, getHotStars, getNotifications } from '../service/home'
import type { RankUser, NotificationItem } from '../service/home'

class RankingStore {
  studyStars: RankUser[] = []
  originalStars: RankUser[] = []
  hotStars: RankUser[] = []
  notifications: NotificationItem[] = []
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  async loadAll() {
    this.loading = true
    try {
      const [study, original, hot, notifs] = await Promise.all([
        getStudyStars(),
        getOriginalStars(),
        getHotStars(),
        getNotifications(),
      ])
      runInAction(() => {
        this.studyStars = study
        this.originalStars = original
        this.hotStars = hot
        this.notifications = notifs
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export const rankingStore = new RankingStore()
