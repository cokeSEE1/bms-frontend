// src/stores/homeStore.ts
import { makeAutoObservable } from 'mobx'

class HomeStore {
  activePushTab: 'mustread' | 'subscribe' = 'mustread'
  activeTrajectoryTab: 'favorite' | 'read' = 'favorite'
  searchKeyword = ''
  selectedCatalogKey = ''
  catalogSearchKeyword = ''

  constructor() {
    makeAutoObservable(this)
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

  setSelectedCatalogKey(key: string) {
    this.selectedCatalogKey = key
  }

  setCatalogSearchKeyword(keyword: string) {
    this.catalogSearchKeyword = keyword
  }
}

export const homeStore = new HomeStore()
