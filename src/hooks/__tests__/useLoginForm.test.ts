import { renderHook, act } from '@testing-library/react'
import useLoginForm from '../useLoginForm'

describe('useLoginForm', () => {
  it('returns initial form values', () => {
    const { result } = renderHook(() => useLoginForm())
    expect(result.current.username).toBe('')
    expect(result.current.password).toBe('')
    expect(result.current.remember).toBe(false)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('calls setUsername to update username', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.setUsername('admin')
    })
    expect(result.current.username).toBe('admin')
  })

  it('calls setPassword to update password', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.setPassword('123456')
    })
    expect(result.current.password).toBe('123456')
  })

  it('calls setRemember to toggle remember', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.setRemember(true)
    })
    expect(result.current.remember).toBe(true)
  })

  it('validates username: required', () => {
    const { result } = renderHook(() => useLoginForm())
    act(() => {
      result.current.setUsername('')
    })
    const error = result.current.validateField('username', '')
    expect(error).toBeTruthy()
  })

  it('validates username: too short', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('username', 'ab')
    expect(error).toBeTruthy()
  })

  it('validates username: invalid characters', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('username', 'admin@123')
    expect(error).toBeTruthy()
  })

  it('validates username: valid', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('username', 'admin_user')
    expect(error).toBeFalsy()
  })

  it('validates password: required', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('password', '')
    expect(error).toBeTruthy()
  })

  it('validates password: too short', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('password', '12345')
    expect(error).toBeTruthy()
  })

  it('validates password: valid', () => {
    const { result } = renderHook(() => useLoginForm())
    const error = result.current.validateField('password', '123456')
    expect(error).toBeFalsy()
  })
})
