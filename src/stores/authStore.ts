import { makeAutoObservable, runInAction } from 'mobx'
import client from '../service/client'
import type { UserLogin, UserOut, ChangePasswordRequest } from '../service/types'

class AuthStore {
  token: string | null = null
  user: UserOut | null = null
  loading = false

  constructor() {
    makeAutoObservable(this)
    this.token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (this.token && username) {
      this.user = { id: 0, username, created_at: '' }
    }
  }

  get isAuthenticated(): boolean {
    return !!this.token
  }

  async login(body: UserLogin): Promise<void> {
    this.loading = true
    try {
      const res = await client.post<{ access_token: string; user: UserOut }>('/auth/login', body)
      runInAction(() => {
        this.token = res.data.access_token
        this.user = res.data.user
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('username', res.data.user.username)
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async fetchMe(): Promise<void> {
    this.loading = true
    try {
      const res = await client.get<UserOut>('/auth/me')
      runInAction(() => {
        this.user = res.data
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async logout(): Promise<void> {
    try {
      await client.post('/auth/logout')
    } finally {
      runInAction(() => {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('username')
      })
    }
  }

  async changePassword(body: ChangePasswordRequest): Promise<void> {
    await client.put('/auth/change-password', body)
  }
}

export const authStore = new AuthStore()
