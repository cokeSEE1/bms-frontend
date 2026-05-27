# Login Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an enterprise-grade static login page with antd + emotion-styled, left-right split layout, i18n-ready, with simulated form submission.

**Architecture:** ConfigProvider wraps the app with custom theme tokens. BrowserRouter routes `/` → redirect to `/login`, `/login` → LoginPage (BrandPanel left + LoginForm right), `/dashboard` → placeholder. LoginForm uses a custom `useLoginForm` hook that wraps antd `Form.useForm()` for validation + simulated submit. All layout/brand styles live in emotion-styled `style.ts`; no inline styles anywhere.

**Tech Stack:** React 18, TypeScript 5.6, Vite 6, antd 5, @emotion/styled, react-router-dom v6, vitest + @testing-library/react

---

### Task 0: Install Dependencies

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Install runtime and dev dependencies**

```bash
pnpm add react-router-dom antd @ant-design/icons @emotion/react @emotion/styled
```

Run: `pnpm add react-router-dom antd @ant-design/icons @emotion/react @emotion/styled`
Expected: All packages added to `package.json`

- [ ] **Step 2: Install test dependencies**

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Add vitest config to vite.config.ts**

Read the current file, then replace with:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
```

- [ ] **Step 4: Create test setup file**

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Add test script to package.json**

Read `package.json`, add `"test": "vitest run"` and `"test:watch": "vitest"` to the scripts block:

```json
"scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 6: Verify**

Run: `pnpm test --run`
Expected: "No test files found" or similar (no tests yet, just verifying config works)

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.ts src/test-setup.ts
git commit -m "chore: add project dependencies and test infrastructure"
```

---

### Task 1: i18n Text Strings

**Files:**
- Create: `src/i18n/locales/zh-CN/login.ts`

- [ ] **Step 1: Create the file**

```ts
const loginTexts = {
  brand_title: '图书管理系统',
  brand_tagline: '知识的海洋，从这里启航',
  form_title: '欢迎登录',
  username_label: '用户名',
  username_placeholder: '请输入用户名',
  username_required: '请输入用户名',
  username_format: '用户名需为3-20位字母、数字或下划线',
  password_label: '密码',
  password_placeholder: '请输入密码',
  password_required: '请输入密码',
  password_min: '密码至少6个字符',
  password_max: '密码不能超过32个字符',
  remember_me: '记住密码',
  forgot_password: '忘记密码？',
  login_button: '登 录',
  login_loading: '登录中...',
  login_success: '登录成功',
  login_failed: '用户名或密码错误',
  no_account: '还没有账号？',
  register: '立即注册',
} as const

export default loginTexts
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n text strings for login page"
```

---

### Task 2: antd Theme Configuration

**Files:**
- Create: `src/theme/antd-theme.ts`

- [ ] **Step 1: Create theme file**

```ts
import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1a3a4a',
    colorLink: '#c8a96e',
    colorBgLayout: '#f5f1eb',
    colorBgContainer: '#ffffff',
    colorError: '#c0392b',
    colorText: '#2c3e50',
    colorTextSecondary: '#7f8c8d',
    borderRadius: 6,
  },
}

export default theme
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/theme/
git commit -m "feat: add antd ConfigProvider theme configuration"
```

---

### Task 3: Emotion-Styled Components

**Files:**
- Create: `src/pages/login/style.ts`

- [ ] **Step 1: Create style.ts**

```ts
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

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/pages/login/style.ts
git commit -m "feat: add emotion-styled components for login page layout"
```

---

### Task 4: BrandPanel Component

**Files:**
- Create: `src/pages/login/BrandPanel.tsx`
- Create: `src/pages/login/__tests__/BrandPanel.test.tsx`

- [ ] **Step 1: Write BrandPanel test**

Create `src/pages/login/__tests__/BrandPanel.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import BrandPanel from '../BrandPanel'
import loginTexts from '../../../i18n/locales/zh-CN/login'

describe('BrandPanel', () => {
  it('renders the brand title', () => {
    render(<BrandPanel />)
    expect(screen.getByText(loginTexts.brand_title)).toBeInTheDocument()
  })

  it('renders the brand tagline', () => {
    render(<BrandPanel />)
    expect(screen.getByText(loginTexts.brand_tagline)).toBeInTheDocument()
  })

  it('renders the book icon', () => {
    const { container } = render(<BrandPanel />)
    const icon = container.querySelector('[data-testid="brand-icon"]')
    expect(icon).toBeInTheDocument()
    expect(icon?.textContent).toBe('📖')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test --run`
Expected: FAIL — cannot find module `../BrandPanel`

- [ ] **Step 3: Create BrandPanel component**

Create `src/pages/login/BrandPanel.tsx`:

```tsx
import { BrandPanelWrapper, BrandIcon, BrandTitle, BrandTagline } from './style'
import loginTexts from '../../i18n/locales/zh-CN/login'

function BrandPanel() {
  return (
    <BrandPanelWrapper>
      <BrandIcon data-testid="brand-icon">📖</BrandIcon>
      <BrandTitle>{loginTexts.brand_title}</BrandTitle>
      <BrandTagline>{loginTexts.brand_tagline}</BrandTagline>
    </BrandPanelWrapper>
  )
}

export default BrandPanel
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test --run`
Expected: All BrandPanel tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/login/BrandPanel.tsx src/pages/login/__tests__/BrandPanel.test.tsx
git commit -m "feat: add BrandPanel component with tests"
```

---

### Task 5: useLoginForm Hook

**Files:**
- Create: `src/hooks/__tests__/useLoginForm.test.ts`
- Create: `src/hooks/useLoginForm.ts`

- [ ] **Step 1: Write useLoginForm test**

Create `src/hooks/__tests__/useLoginForm.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test --run`
Expected: FAIL — cannot find module `../useLoginForm`

- [ ] **Step 3: Create useLoginForm hook**

Create `src/hooks/useLoginForm.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test --run`
Expected: All useLoginForm tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useLoginForm.ts src/hooks/__tests__/useLoginForm.test.ts
git commit -m "feat: add useLoginForm hook with validation and tests"
```

---

### Task 6: LoginForm Component

**Files:**
- Create: `src/pages/login/LoginForm.tsx`
- Create: `src/pages/login/__tests__/LoginForm.test.tsx`

- [ ] **Step 1: Write LoginForm test**

Create `src/pages/login/__tests__/LoginForm.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import LoginForm from '../LoginForm'
import loginTexts from '../../../i18n/locales/zh-CN/login'

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <App>
        <LoginForm />
      </App>
    </MemoryRouter>,
  )
}

describe('LoginForm', () => {
  it('renders form title', () => {
    renderLoginForm()
    expect(screen.getByText(loginTexts.form_title)).toBeInTheDocument()
  })

  it('renders username input', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText(loginTexts.username_placeholder)).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderLoginForm()
    expect(screen.getByPlaceholderText(loginTexts.password_placeholder)).toBeInTheDocument()
  })

  it('renders login button', () => {
    renderLoginForm()
    expect(screen.getByRole('button', { name: loginTexts.login_button })).toBeInTheDocument()
  })

  it('renders remember me checkbox', () => {
    renderLoginForm()
    expect(screen.getByText(loginTexts.remember_me)).toBeInTheDocument()
  })

  it('renders forgot password link', () => {
    renderLoginForm()
    expect(screen.getByText(loginTexts.forgot_password)).toBeInTheDocument()
  })

  it('renders register link', () => {
    renderLoginForm()
    expect(screen.getByText(loginTexts.register)).toBeInTheDocument()
    expect(screen.getByText(loginTexts.no_account)).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    const user = userEvent.setup()
    renderLoginForm()
    await user.click(screen.getByRole('button', { name: loginTexts.login_button }))
    expect(await screen.findByText(loginTexts.username_required)).toBeInTheDocument()
    expect(screen.getByText(loginTexts.password_required)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test --run`
Expected: FAIL — cannot find module `../LoginForm`

- [ ] **Step 3: Create LoginForm component**

Create `src/pages/login/LoginForm.tsx`:

```tsx
import { Form, Input, Button, Checkbox, Typography, App } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import loginTexts from '../../i18n/locales/zh-CN/login'
import useLoginForm, { USERNAME_PATTERN } from '../../hooks/useLoginForm'
import { FormContainer, FormTitle, RowBetween, BottomLink } from './style'

const { Link } = Typography

function LoginForm() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { isSubmitting, handleSubmit } = useLoginForm()

  const onFinish = async () => {
    try {
      await handleSubmit()
      message.success(loginTexts.login_success)
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch {
      message.error(loginTexts.login_failed)
    }
  }

  return (
    <FormContainer>
      <FormTitle>{loginTexts.form_title}</FormTitle>
      <Form
        onFinish={onFinish}
        disabled={isSubmitting}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: loginTexts.username_required },
            { pattern: USERNAME_PATTERN, message: loginTexts.username_format },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={loginTexts.username_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: loginTexts.password_required },
            { min: 6, message: loginTexts.password_min },
            { max: 32, message: loginTexts.password_max },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={loginTexts.password_placeholder}
          />
        </Form.Item>

        <Form.Item>
          <RowBetween>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{loginTexts.remember_me}</Checkbox>
            </Form.Item>
            <Link>{loginTexts.forgot_password}</Link>
          </RowBetween>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
          >
            {isSubmitting ? loginTexts.login_loading : loginTexts.login_button}
          </Button>
        </Form.Item>
      </Form>

      <BottomLink>
        {loginTexts.no_account}
        <Link underline="always">&nbsp;{loginTexts.register}</Link>
      </BottomLink>
    </FormContainer>
  )
}

export default LoginForm
```

- [ ] **Step 4: Run test to verify**

Run: `pnpm test --run`
Expected: All LoginForm tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/login/LoginForm.tsx src/pages/login/__tests__/LoginForm.test.tsx
git commit -m "feat: add LoginForm component with antd form and tests"
```

---

### Task 7: LoginPage Container

**Files:**
- Create: `src/pages/login/index.tsx`
- Create: `src/pages/login/__tests__/LoginPage.test.tsx`

- [ ] **Step 1: Write LoginPage test**

Create `src/pages/login/__tests__/LoginPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import LoginPage from '../index'
import loginTexts from '../../../i18n/locales/zh-CN/login'

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <App>
        <LoginPage />
      </App>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('renders brand title and form title', () => {
    renderLoginPage()
    expect(screen.getByText(loginTexts.brand_title)).toBeInTheDocument()
    expect(screen.getByText(loginTexts.form_title)).toBeInTheDocument()
  })

  it('renders two main sections', () => {
    const { container } = renderLoginPage()
    const sections = container.firstChild?.childNodes
    expect(sections?.length).toBe(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test --run`
Expected: FAIL — cannot find module `../index`

- [ ] **Step 3: Create LoginPage container**

Create `src/pages/login/index.tsx`:

```tsx
import BrandPanel from './BrandPanel'
import LoginForm from './LoginForm'
import { PageContainer, FormPanelWrapper } from './style'

function LoginPage() {
  return (
    <PageContainer>
      <BrandPanel />
      <FormPanelWrapper>
        <LoginForm />
      </FormPanelWrapper>
    </PageContainer>
  )
}

export default LoginPage
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test --run`
Expected: All LoginPage tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/login/index.tsx src/pages/login/__tests__/LoginPage.test.tsx
git commit -m "feat: add LoginPage container component with tests"
```

---

### Task 8: Dashboard Placeholder + Router Configuration

**Files:**
- Create: `src/pages/dashboard/index.tsx`
- Create: `src/router/index.tsx`

- [ ] **Step 1: Create Dashboard placeholder**

Create `src/pages/dashboard/index.tsx`:

```tsx
function DashboardPage() {
  return (
    <div style={{ padding: 48, textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Library Management System</p>
    </div>
  )
}

export default DashboardPage
```

- [ ] **Step 2: Create Router configuration**

Create `src/router/index.tsx`:

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'

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
    path: '/dashboard',
    element: <DashboardPage />,
  },
])

export default router
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/pages/dashboard/ src/router/
git commit -m "feat: add dashboard placeholder and router configuration"
```

---

### Task 9: Wire Up App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Delete: `src/App.css`

- [ ] **Step 1: Update App.tsx**

Read the current file, then replace with:

```tsx
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import router from './router'
import theme from './theme/antd-theme'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
```

- [ ] **Step 2: Update main.tsx**

Read the current file, then replace `import './index.css'` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

(No actual change needed if it already looks like this — just verify it doesn't import App.css)

- [ ] **Step 3: Delete App.css**

```bash
rm src/App.css
```

- [ ] **Step 4: Build and verify**

Run: `pnpm build`
Expected: Clean build, no errors

- [ ] **Step 5: Run all tests**

Run: `pnpm test --run`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/main.tsx
git rm src/App.css
git commit -m "feat: wire up App.tsx with ConfigProvider, AntdApp, and RouterProvider"
```

---

### Task 10: Final Verification

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: TypeScript checks pass, Vite builds successfully

- [ ] **Step 2: Full test suite**

Run: `pnpm test --run`
Expected: All tests pass

- [ ] **Step 3: Start dev server and verify visually**

Run: `pnpm dev`
Navigate to `http://localhost:5173`
Expected:
- Redirects to `/login`
- Left side: dark gradient brand panel with book emoji, system name, tagline
- Right side: white form with username, password, remember checkbox, forgot password link, login button, register link
- Form validation shows on empty submit
- Login button shows loading state on submit, then success message and redirect to `/dashboard`

- [ ] **Step 4: Check no inline styles (code review)**

Search all created components for `style={{`:
```bash
grep -r "style={{" src/pages/ src/router/ src/hooks/ src/theme/ src/App.tsx
```
Expected: No matches (no inline styles in any component file)
