import { useState, useCallback } from 'react'
import axios from 'axios'
import client from '../client'
import { authStore } from '../../stores/authStore'
import type { UserLogin, UserRegister, UserOut, TokenOut, LogoutOut, ChangePasswordRequest, ChangePasswordOut } from '../types'

const extractError = (err: unknown): string => {
  if (axios.isAxiosError(err) && err.response?.data?.detail) {
    return err.response.data.detail
  }
  return '请求失败'
}

interface UseLoginReturn {
  data: TokenOut | null
  loading: boolean
  error: string | null
  login: (body: UserLogin) => Promise<void>
}

interface UseRegisterReturn {
  data: UserOut | null
  loading: boolean
  error: string | null
  register: (body: UserRegister) => Promise<void>
}

interface UseGetMeReturn {
  data: UserOut | null
  loading: boolean
  error: string | null
  getMe: () => Promise<void>
}

interface UseLogoutReturn {
  data: LogoutOut | null
  loading: boolean
  error: string | null
  logout: () => Promise<void>
}

interface UseChangePasswordReturn {
  data: ChangePasswordOut | null
  loading: boolean
  error: string | null
  changePassword: (body: ChangePasswordRequest) => Promise<void>
}

const useLogin = (): UseLoginReturn => {
  const [data, setData] = useState<TokenOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (body: UserLogin) => {
    setLoading(true)
    setError(null)
    try {
      await authStore.login(body)
      setData({ access_token: authStore.token!, user: authStore.user! })
    } catch (err) {
      const message = extractError(err)
      setError(message)
      throw new Error(message)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, login }
}

const useRegister = (): UseRegisterReturn => {
  const [data, setData] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = useCallback(async (body: UserRegister) => {
    setLoading(true)
    setError(null)
    try {
      const res = await client.post<UserOut>('/auth/register', body)
      setData(res.data)
    } catch (err) {
      const message = extractError(err)
      setError(message)
      throw new Error(message)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, register }
}

const useGetMe = (): UseGetMeReturn => {
  const [data, setData] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMe = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await authStore.fetchMe()
      setData(authStore.user!)
    } catch (err) {
      const message = extractError(err)
      setError(message)
      throw new Error(message)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, getMe }
}

const useLogout = (): UseLogoutReturn => {
  const [data, setData] = useState<LogoutOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logout = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await authStore.logout()
      setData({ message: '退出成功' })
    } catch (err) {
      const message = extractError(err)
      setError(message)
      throw new Error(message)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, logout }
}

const useChangePassword = (): UseChangePasswordReturn => {
  const [data, setData] = useState<ChangePasswordOut | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changePassword = useCallback(async (body: ChangePasswordRequest) => {
    setLoading(true)
    setError(null)
    try {
      await authStore.changePassword(body)
      setData({ message: '密码修改成功' })
    } catch (err) {
      const message = extractError(err)
      setError(message)
      throw new Error(message)
    }
    setLoading(false)
  }, [])

  return { data, loading, error, changePassword }
}

export { useLogin, useRegister, useGetMe, useLogout, useChangePassword }
