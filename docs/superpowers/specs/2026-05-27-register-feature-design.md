# Register Feature Design

Date: 2026-05-27

## Overview

Add a registration page (`/register`) that mirrors the login page layout and code patterns. Users fill in username, password, and confirm password to create an account, then get redirected to the login page.

## Component Tree

```
RegisterPage (index.tsx)
  BrandPanel          ← reused from src/pages/login/
  RegisterForm         ← new
```

`BrandPanel` is imported directly from `../login/BrandPanel`. No component extraction or shared layout abstraction.

## File Structure

```
src/
  i18n/locales/zh-CN/register.ts     # i18n strings, as const
  hooks/useRegisterForm.ts           # form state hook
  hooks/__tests__/useRegisterForm.test.ts
  pages/register/
    index.tsx                        # RegisterPage
    RegisterForm.tsx                 # form component
    style.ts                         # same exports as login/style.ts
    __tests__/
      RegisterPage.test.tsx
      RegisterForm.test.tsx
```

`style.ts` is a copy of `login/style.ts` — all exported styled components are identical.

## Form Fields & Validation

| Field | Rules |
|-------|-------|
| `username` | Required, 3-20 chars, alphanumeric + underscore (`/^\w{3,20}$/`) |
| `password` | Required, 6-32 chars |
| `confirmPassword` | Required, must match `password` |

`USERNAME_PATTERN` is exported from `useRegisterForm.ts` (same regex as `useLoginForm.ts` — no cross-hook import).

## Data Flow

```
useRegisterForm()
  → username, password, confirmPassword, isSubmitting
  → setUsername, setPassword, setConfirmPassword
  → validateField(field, value) → string | undefined
  → handleSubmit() → Promise<void>  (mock: 1.5s delay)
```

`RegisterForm.onFinish`:
- On success: `message.success('注册成功，请登录')` → 500ms delay → `navigate('/login')`
- On error: `message.error('注册失败，请稍后重试')`

## Routing

Add to `src/router/index.tsx`:

```tsx
{
  path: '/register',
  element: <RegisterPage />,
}
```

Update `LoginForm.tsx` bottom link: the "立即注册" `<Link>` navigates to `/register`.

## i18n Keys

```ts
register_title: '欢迎注册'
username_placeholder / password_placeholder / confirm_password_placeholder
username_required / username_format
password_required / password_min / password_max
confirm_password_required / confirm_password_mismatch
register_button / register_loading
register_success / register_failed
has_account / to_login
```

All in `src/i18n/locales/zh-CN/register.ts`, exported via `as const` default.

## Testing

Follow the exact patterns from login tests:

- **useRegisterForm.test.ts**: `renderHook` + `act`, test initial values, setters, validateField for each field (including mismatch), handleSubmit sets isSubmitting.
- **RegisterForm.test.tsx**: wrap with `<MemoryRouter>` + `<App>`, test all fields and button render, test submit triggers validation errors.
- **RegisterPage.test.tsx**: wrap with `<MemoryRouter>` + `<App>`, test brand panel and form title render.

## Dependencies

No new dependencies. Uses existing: react, antd, @ant-design/icons, @emotion/styled, react-router-dom.
