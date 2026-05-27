import { useState, useCallback } from 'react'
import registerTexts from '../i18n/locales/zh-CN/register'

interface UseRegisterFormReturn {
  username: string
  password: string
  confirmPassword: string
  isSubmitting: boolean
  setUsername: (value: string) => void
  setPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  validateField: (field: 'username' | 'password' | 'confirmPassword', value: string) => string | undefined
  handleSubmit: () => Promise<void>
}

export const USERNAME_PATTERN = /^\w{3,20}$/

function useRegisterForm(): UseRegisterFormReturn {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback(
    (field: 'username' | 'password' | 'confirmPassword', value: string): string | undefined => {
      if (field === 'username') {
        if (!value) return registerTexts.username_required
        if (!USERNAME_PATTERN.test(value)) return registerTexts.username_format
        return undefined
      }
      if (field === 'password') {
        if (!value) return registerTexts.password_required
        if (value.length < 6) return registerTexts.password_min
        if (value.length > 32) return registerTexts.password_max
        return undefined
      }
      if (field === 'confirmPassword') {
        if (!value) return registerTexts.confirm_password_required
        if (value !== password) return registerTexts.confirm_password_mismatch
        return undefined
      }
      return undefined
    },
    [password],
  )

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }, [])

  return {
    username,
    password,
    confirmPassword,
    isSubmitting,
    setUsername,
    setPassword,
    setConfirmPassword,
    validateField,
    handleSubmit,
  }
}

export default useRegisterForm
