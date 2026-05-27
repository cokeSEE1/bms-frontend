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
