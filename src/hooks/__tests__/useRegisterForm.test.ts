import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import useRegisterForm from '../useRegisterForm'

vi.mock('../../service', () => ({
  useRegister: () => ({
    register: vi.fn().mockResolvedValue(undefined),
  }),
}))

describe('useRegisterForm', () => {
  it('returns initial form values', () => {
    const { result } = renderHook(() => useRegisterForm())
    expect(result.current.username).toBe('')
    expect(result.current.password).toBe('')
    expect(result.current.confirmPassword).toBe('')
    expect(result.current.isSubmitting).toBe(false)
  })

  it('calls setUsername to update username', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setUsername('admin')
    })
    expect(result.current.username).toBe('admin')
  })

  it('calls setPassword to update password', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setPassword('123456')
    })
    expect(result.current.password).toBe('123456')
  })

  it('calls setConfirmPassword to update confirmPassword', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setConfirmPassword('123456')
    })
    expect(result.current.confirmPassword).toBe('123456')
  })

  it('validates username: required', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('username', '')
    expect(error).toBeTruthy()
  })

  it('validates username: too short', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('username', 'ab')
    expect(error).toBeTruthy()
  })

  it('validates username: invalid characters', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('username', 'admin@123')
    expect(error).toBeTruthy()
  })

  it('validates username: valid', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('username', 'admin_user')
    expect(error).toBeFalsy()
  })

  it('validates password: required', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('password', '')
    expect(error).toBeTruthy()
  })

  it('validates password: too short', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('password', '12345')
    expect(error).toBeTruthy()
  })

  it('validates password: valid', () => {
    const { result } = renderHook(() => useRegisterForm())
    const error = result.current.validateField('password', '123456')
    expect(error).toBeFalsy()
  })

  it('validates confirmPassword: required', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setPassword('123456')
    })
    const error = result.current.validateField('confirmPassword', '')
    expect(error).toBeTruthy()
  })

  it('validates confirmPassword: mismatch', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setPassword('123456')
    })
    const error = result.current.validateField('confirmPassword', '654321')
    expect(error).toBeTruthy()
  })

  it('validates confirmPassword: match', () => {
    const { result } = renderHook(() => useRegisterForm())
    act(() => {
      result.current.setPassword('123456')
    })
    const error = result.current.validateField('confirmPassword', '123456')
    expect(error).toBeFalsy()
  })
})
