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
