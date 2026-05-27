# 注册功能实施计划

> **给执行者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 按任务逐步实施此计划。步骤使用 checkbox (`- [ ]`) 语法跟踪。

**目标：** 新建注册页面 `/register`，复用登录页的 BrandPanel 布局，表单含用户名+密码+确认密码，注册成功后跳转登录页。

**架构：** 完全镜像登录模块的文件结构和代码模式，不引入新的抽象或共享组件。

**技术栈：** React 18, TypeScript, Ant Design 5, Emotion, React Router 6, Vitest + Testing Library

---

## 文件清单

| 操作 | 文件 |
|------|------|
| 新建 | `src/i18n/locales/zh-CN/register.ts` |
| 新建 | `src/hooks/useRegisterForm.ts` |
| 新建 | `src/hooks/__tests__/useRegisterForm.test.ts` |
| 新建 | `src/pages/register/style.ts` |
| 新建 | `src/pages/register/RegisterForm.tsx` |
| 新建 | `src/pages/register/index.tsx` |
| 新建 | `src/pages/register/__tests__/RegisterForm.test.tsx` |
| 新建 | `src/pages/register/__tests__/RegisterPage.test.tsx` |
| 修改 | `src/router/index.tsx` |
| 修改 | `src/pages/login/LoginForm.tsx` |

---

### Task 1: 注册页国际化文案

**文件：**
- 新建：`src/i18n/locales/zh-CN/register.ts`

- [ ] **Step 1: 创建国际化文件**

```ts
const registerTexts = {
  form_title: '欢迎注册',
  username_placeholder: '请输入用户名',
  username_required: '请输入用户名',
  username_format: '用户名需为3-20位字母、数字或下划线',
  password_placeholder: '请输入密码',
  password_required: '请输入密码',
  password_min: '密码至少6个字符',
  password_max: '密码不能超过32个字符',
  confirm_password_placeholder: '请确认密码',
  confirm_password_required: '请确认密码',
  confirm_password_mismatch: '两次输入的密码不一致',
  register_button: '注 册',
  register_loading: '注册中...',
  register_success: '注册成功，请登录',
  register_failed: '注册失败，请稍后重试',
  has_account: '已有账号？',
  to_login: '返回登录',
} as const

export default registerTexts
```

- [ ] **Step 2: 提交**

```bash
git add src/i18n/locales/zh-CN/register.ts
git commit -m "feat: add register i18n texts"
```

---

### Task 2: 注册表单样式

**文件：**
- 新建：`src/pages/register/style.ts`

- [ ] **Step 1: 创建样式文件（从登录页复制全部样式组件）**

```tsx
import styled from '@emotion/styled'

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

export const BrandPanelWrapper = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a3a4a 0%, #2c5f6e 100%);
  padding: 48px;
`

export const BrandIcon = styled.div`
  font-size: 96px;
  line-height: 1;
  margin-bottom: 24px;
  user-select: none;
`

export const BrandTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
`

export const BrandTagline = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin: 0;
  letter-spacing: 2px;
`

export const FormPanelWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 48px;
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`

export const FormTitle = styled.h2`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 32px 0;
  text-align: center;
`

export const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const BottomLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #7f8c8d;
  font-size: 14px;
`
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/register/style.ts
git commit -m "feat: add register page styles"
```

---

### Task 3: useRegisterForm Hook

**文件：**
- 新建：`src/hooks/useRegisterForm.ts`
- 新建：`src/hooks/__tests__/useRegisterForm.test.ts`

- [ ] **Step 1: 编写测试文件**

```tsx
import { renderHook, act } from '@testing-library/react'
import useRegisterForm from '../useRegisterForm'

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
```

- [ ] **Step 2: 运行测试验证失败**

```bash
pnpm test --run -- src/hooks/__tests__/useRegisterForm.test.ts
```
预期：全部 FAIL，因为 `useRegisterForm` 尚未创建。

- [ ] **Step 3: 实现 useRegisterForm Hook**

```tsx
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
```

- [ ] **Step 4: 运行测试验证通过**

```bash
pnpm test --run -- src/hooks/__tests__/useRegisterForm.test.ts
```
预期：全部 PASS。

- [ ] **Step 5: 提交**

```bash
git add src/hooks/useRegisterForm.ts src/hooks/__tests__/useRegisterForm.test.ts
git commit -m "feat: add useRegisterForm hook"
```

---

### Task 4: RegisterForm 组件

**文件：**
- 新建：`src/pages/register/RegisterForm.tsx`
- 新建：`src/pages/register/__tests__/RegisterForm.test.tsx`

- [ ] **Step 1: 编写测试文件**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import RegisterForm from '../RegisterForm'
import registerTexts from '../../../i18n/locales/zh-CN/register'

function renderRegisterForm() {
  return render(
    <MemoryRouter>
      <App>
        <RegisterForm />
      </App>
    </MemoryRouter>,
  )
}

describe('RegisterForm', () => {
  it('renders form title', () => {
    renderRegisterForm()
    expect(screen.getByText(registerTexts.form_title)).toBeInTheDocument()
  })

  it('renders username input', () => {
    renderRegisterForm()
    expect(screen.getByPlaceholderText(registerTexts.username_placeholder)).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderRegisterForm()
    expect(screen.getByPlaceholderText(registerTexts.password_placeholder)).toBeInTheDocument()
  })

  it('renders confirm password input', () => {
    renderRegisterForm()
    expect(screen.getByPlaceholderText(registerTexts.confirm_password_placeholder)).toBeInTheDocument()
  })

  it('renders register button', () => {
    renderRegisterForm()
    expect(screen.getByRole('button', { name: registerTexts.register_button })).toBeInTheDocument()
  })

  it('renders login link', () => {
    renderRegisterForm()
    expect(screen.getByText(registerTexts.has_account)).toBeInTheDocument()
    expect(screen.getByText(registerTexts.to_login)).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    const user = userEvent.setup()
    renderRegisterForm()
    await user.click(screen.getByRole('button', { name: registerTexts.register_button }))
    expect(await screen.findByText(registerTexts.username_required)).toBeInTheDocument()
    expect(screen.getByText(registerTexts.password_required)).toBeInTheDocument()
    expect(screen.getByText(registerTexts.confirm_password_required)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试验证失败**

```bash
pnpm test --run -- src/pages/register/__tests__/RegisterForm.test.tsx
```
预期：全部 FAIL，因为 RegisterForm 组件不存在。

- [ ] **Step 3: 实现 RegisterForm 组件**

```tsx
import { Form, Input, Button, Typography, App } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import registerTexts from '../../i18n/locales/zh-CN/register'
import useRegisterForm, { USERNAME_PATTERN } from '../../hooks/useRegisterForm'
import { FormContainer, FormTitle, BottomLink } from './style'

const { Link } = Typography

function RegisterForm() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { isSubmitting, handleSubmit } = useRegisterForm()

  const onFinish = async () => {
    try {
      await handleSubmit()
      message.success(registerTexts.register_success)
      setTimeout(() => {
        navigate('/login')
      }, 500)
    } catch {
      message.error(registerTexts.register_failed)
    }
  }

  return (
    <FormContainer>
      <FormTitle>{registerTexts.form_title}</FormTitle>
      <Form
        onFinish={onFinish}
        disabled={isSubmitting}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: registerTexts.username_required },
            { pattern: USERNAME_PATTERN, message: registerTexts.username_format },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={registerTexts.username_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: registerTexts.password_required },
            { min: 6, message: registerTexts.password_min },
            { max: 32, message: registerTexts.password_max },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={registerTexts.password_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: registerTexts.confirm_password_required },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(registerTexts.confirm_password_mismatch))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={registerTexts.confirm_password_placeholder}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
          >
            {isSubmitting ? registerTexts.register_loading : registerTexts.register_button}
          </Button>
        </Form.Item>
      </Form>

      <BottomLink>
        {registerTexts.has_account}
        <Link underline onClick={() => navigate('/login')}>
          &nbsp;{registerTexts.to_login}
        </Link>
      </BottomLink>
    </FormContainer>
  )
}

export default RegisterForm
```

- [ ] **Step 4: 运行测试验证通过**

```bash
pnpm test --run -- src/pages/register/__tests__/RegisterForm.test.tsx
```
预期：全部 PASS。

- [ ] **Step 5: 提交**

```bash
git add src/pages/register/RegisterForm.tsx src/pages/register/__tests__/RegisterForm.test.tsx
git commit -m "feat: add RegisterForm component"
```

---

### Task 5: RegisterPage 页面组件

**文件：**
- 新建：`src/pages/register/index.tsx`
- 新建：`src/pages/register/__tests__/RegisterPage.test.tsx`

- [ ] **Step 1: 编写测试文件**

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import RegisterPage from '../index'
import registerTexts from '../../../i18n/locales/zh-CN/register'

function renderRegisterPage() {
  return render(
    <MemoryRouter>
      <App>
        <RegisterPage />
      </App>
    </MemoryRouter>,
  )
}

describe('RegisterPage', () => {
  it('renders brand title', () => {
    renderRegisterPage()
    expect(screen.getByText('图书管理系统')).toBeInTheDocument()
  })

  it('renders form title', () => {
    renderRegisterPage()
    expect(screen.getByText(registerTexts.form_title)).toBeInTheDocument()
  })

  it('renders brand tagline', () => {
    renderRegisterPage()
    expect(screen.getByText('知识的海洋，从这里启航')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试验证失败**

```bash
pnpm test --run -- src/pages/register/__tests__/RegisterPage.test.tsx
```
预期：全部 FAIL。

- [ ] **Step 3: 实现 RegisterPage 组件**

```tsx
import BrandPanel from '../login/BrandPanel'
import RegisterForm from './RegisterForm'
import { PageContainer, FormPanelWrapper } from './style'

function RegisterPage() {
  return (
    <PageContainer>
      <BrandPanel />
      <FormPanelWrapper>
        <RegisterForm />
      </FormPanelWrapper>
    </PageContainer>
  )
}

export default RegisterPage
```

- [ ] **Step 4: 运行测试验证通过**

```bash
pnpm test --run -- src/pages/register/__tests__/RegisterPage.test.tsx
```
预期：全部 PASS。

- [ ] **Step 5: 提交**

```bash
git add src/pages/register/index.tsx src/pages/register/__tests__/RegisterPage.test.tsx
git commit -m "feat: add RegisterPage component"
```

---

### Task 6: 路由与登录页联动

**文件：**
- 修改：`src/router/index.tsx`
- 修改：`src/pages/login/LoginForm.tsx`

- [ ] **Step 1: 添加 /register 路由**

在 `src/router/index.tsx` 中：

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import RegisterPage from '../pages/register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
])

export default router
```

- [ ] **Step 2: 更新登录页「立即注册」链接**

在 `src/pages/login/LoginForm.tsx` 中，把底部的 `<Link underline>&nbsp;{loginTexts.register}</Link>` 改为可点击跳转：

渲染部分改为：

```tsx
      <BottomLink>
        {loginTexts.no_account}
        <Link underline onClick={() => navigate('/register')}>
          &nbsp;{loginTexts.register}
        </Link>
      </BottomLink>
```

即给 Link 添加 `onClick={() => navigate('/register')}`。

- [ ] **Step 3: 运行全部测试**

```bash
pnpm test --run
```
预期：全部 PASS。

- [ ] **Step 4: 提交**

```bash
git add src/router/index.tsx src/pages/login/LoginForm.tsx
git commit -m "feat: wire up register route and login page link"
```

---

### Task 7: TypeScript 类型检查

- [ ] **Step 1: 运行类型检查**

```bash
pnpm build
```
预期：类型检查通过，构建成功。

如果失败，根据错误信息修复。
