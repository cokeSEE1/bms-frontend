import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import RegisterForm from '../RegisterForm'
import registerTexts from '../../../i18n/locales/zh-CN/register'

const renderRegisterForm = () => {
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
