// src/stores/homeStore.ts
import { makeAutoObservable } from 'mobx'

class HomeStore {
  activePushTab: 'mustread' | 'subscribe' = 'mustread'
  activeTrajectoryTab: 'favorite' | 'read' = 'favorite'
  searchKeyword = ''
  selectedCatalogKey = ''
  catalogSearchKeyword = ''
  sidebarCollapsed = false

  constructor() {
    makeAutoObservable(this)
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      this.sidebarCollapsed = saved === 'true'
    } else if (typeof window !== 'undefined' && window.innerWidth < 1366) {
      this.sidebarCollapsed = true
    }
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

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
    localStorage.setItem('sidebarCollapsed', String(this.sidebarCollapsed))
  }
}

export const homeStore = new HomeStore()
