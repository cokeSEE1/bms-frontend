// src/stores/homeStore.ts
import { makeAutoObservable } from 'mobx'

class HomeStore {
  activeMenuTab: 'push' | 'trajectory' = 'push'
  activePushTab: 'mustread' | 'subscribe' = 'mustread'
  activeTrajectoryTab: 'favorite' | 'read' = 'favorite'
  searchKeyword = ''

  constructor() {
    makeAutoObservable(this)
  }

  setActiveMenuTab(tab: 'push' | 'trajectory') {
    this.activeMenuTab = tab
  }

  setActivePushTab(tab: 'mustread' | 'subscribe') {
    this.activePushTab = tab
  }

  setActiveTrajectoryTab(tab: 'favorite' | 'read') {
    this.activeTrajectoryTab = tab
  }

  setSearchKeyword(keyword: string) {
    this.searchKeyword = keyword
  }
}

export const homeStore = new HomeStore()
