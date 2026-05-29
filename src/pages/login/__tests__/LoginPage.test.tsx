import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from 'antd'
import LoginPage from '../index'
import loginTexts from '../../../i18n/locales/zh-CN/login'

const renderLoginPage = () => {
  return render(
    <MemoryRouter>
      <App>
        <LoginPage />
      </App>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('renders brand logo and wordmark', () => {
    const { container } = renderLoginPage()
    expect(container.querySelector('[data-testid="brand-logo"]')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="brand-wordmark"]')).toBeInTheDocument()
  })

  it('renders form title', () => {
    renderLoginPage()
    expect(screen.getByText(loginTexts.form_title)).toBeInTheDocument()
  })

  it('renders brand tagline', () => {
    renderLoginPage()
    expect(screen.getByText(loginTexts.brand_tagline)).toBeInTheDocument()
  })
})
