# Login Page Design

**Date:** 2026-05-27
**Status:** Approved

## Overview

Enterprise-grade login page for the Library Management System (图书管理系统). Static implementation, no backend — form submission simulates authentication.

## Requirements

- Username + password login
- Remember password checkbox
- Forgot password link (static)
- Register link (static)
- i18n reserved structure (Chinese first)
- No inline styles — all styles in dedicated style files
- antd + @ant-design/icons for interactive components
- @emotion/styled for layout + brand panel

## Architecture

### Directory Structure

```
src/
├── pages/login/
│   ├── index.tsx              # LoginPage container (left-right split)
│   ├── LoginForm.tsx           # antd Form: username, password, remember, submit
│   ├── BrandPanel.tsx          # Left side brand display (pure display)
│   └── style.ts               # All emotion-styled components
├── i18n/
│   └── locales/
│       └── zh-CN/
│           └── login.ts        # Login page text strings
├── theme/
│   └── antd-theme.ts           # ConfigProvider token override
├── router/
│   └── index.tsx               # Route config: /login → LoginPage, / → redirect /login, /dashboard (placeholder)
├── hooks/
│   └── useLoginForm.ts         # Form state + validation + submit logic
└── App.tsx                     # ConfigProvider + RouterProvider wrapper
```

### Dependencies to add

- `react-router-dom`
- `antd`
- `@ant-design/icons`
- `@emotion/react`
- `@emotion/styled`

### Component Tree & Data Flow

```
App (ConfigProvider + BrowserRouter)
└── Routes
    └── /login → LoginPage
                  ├── BrandPanel (left, pure display, zero state)
                  └── LoginForm (right, interactive)
                       └── useLoginForm hook
                             username, password, remember
                             errors, isSubmitting
                             handleSubmit(), handleReset()
```

- `LoginPage`: layout container only. Does not manage state.
- `BrandPanel`: pure display component. System name, icon, tagline.
- `LoginForm`: antd Form component. All event handlers from `useLoginForm`.
- `useLoginForm`: custom hook encapsulating all form state, antd Form instance, validation rules, submit simulation.

## Visual Design

### Layout

Left-right split, 40% brand panel : 60% form area, full viewport height.

### Color Palette (Library / Knowledge Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `colorPrimary` | `#1a3a4a` | Deep blue-green, buttons, active border |
| `colorLink` | `#c8a96e` | Warm gold, links |
| `colorBgLayout` | `#f5f1eb` | Warm off-white, page background |
| `colorBgContainer` | `#ffffff` | Card/form area background |
| `colorError` | `#c0392b` | Validation error text |
| `colorText` | `#2c3e50` | Body text |
| `colorTextSecondary` | `#7f8c8d` | Placeholder, helper text |
| `borderRadius` | `6` | Border radius |

### Left Brand Panel

- Background: linear gradient `#1a3a4a` → `#2c5f6e`
- Large book icon (Unicode/SVG)
- System name: "图书管理系统"
- Tagline: "知识的海洋，从这里启航"

### Right Form Area

- White background, vertically centered
- Form max-width 400px
- Inputs with prefix icons (UserOutlined, LockOutlined)
- Password field with visibility toggle
- "Remember password" checkbox and "Forgot password?" link on the same row (space-between)
- Full-width primary button
- "Register" link at the bottom

## Form Validation Rules

| Field | Rules |
|-------|-------|
| username | Required, 3-20 chars, alphanumeric + underscore only (`/^\w{3,20}$/`) |
| password | Required, 6-32 chars |

## Interaction States

| State | Behavior |
|-------|----------|
| Initial | Empty form, button enabled |
| Validation failed | Red error text below field (antd default), button clickable |
| Submitting | Button loading + "登录中...", all fields disabled |
| Success | `message.success` + navigate to `/dashboard` |
| Failure | `message.error` + form stays editable |

## i18n Structure

```
src/i18n/locales/zh-CN/login.ts
```

Export an object: `brand_title`, `brand_tagline`, `form_title`, `username_placeholder`, `password_placeholder`, `remember_me`, `forgot_password`, `login_button`, `no_account`, `register`, `login_loading`, `login_success`, `login_failed`, validation messages.

## Routing

| Path | Component | Notes |
|------|-----------|-------|
| `/` | Redirect | → `/login` |
| `/login` | LoginPage | Main login page |
| `/dashboard` | Placeholder | Dummy page for post-login redirect |

## Non-Goals

- Actual authentication / token management
- Backend API integration
- Registration / forgot password pages
- Role-based access control
