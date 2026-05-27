import { useState, useCallback } from 'react'
import loginTexts from '../i18n/locales/zh-CN/login'

interface UseLoginFormReturn {
  username: string
  password: string
  remember: boolean
  isSubmitting: boolean
  setUsername: (value: string) => void
  setPassword: (value: string) => void
  setRemember: (value: boolean) => void
  validateField: (field: 'username' | 'password', value: string) => string | undefined
  handleSubmit: () => Promise<void>
}

export const USERNAME_PATTERN = /^\w{3,20}$/

function useLoginForm(): UseLoginFormReturn {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback(
    (field: 'username' | 'password', value: string): string | undefined => {
      if (field === 'username') {
        if (!value) return loginTexts.username_required
        if (!USERNAME_PATTERN.test(value)) return loginTexts.username_format
        return undefined
      }
      if (field === 'password') {
        if (!value) return loginTexts.password_required
        if (value.length < 6) return loginTexts.password_min
        if (value.length > 32) return loginTexts.password_max
        return undefined
      }
      return undefined
    },
    [],
  )

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }, [])

  return {
    username,
    password,
    remember,
    isSubmitting,
    setUsername,
    setPassword,
    setRemember,
    validateField,
    handleSubmit,
  }
}

export default useLoginForm
