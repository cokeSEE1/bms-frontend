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
