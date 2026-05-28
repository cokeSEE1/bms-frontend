import { render, screen } from '@testing-library/react'
import BrandPanel from '../BrandPanel'
import loginTexts from '../../../i18n/locales/zh-CN/login'

describe('BrandPanel', () => {
  it('renders the brand logo', () => {
    const { container } = render(<BrandPanel />)
    const logo = container.querySelector('[data-testid="brand-logo"]')
    expect(logo).toBeInTheDocument()
    expect(logo?.tagName).toBe('IMG')
  })

  it('renders the brand wordmark', () => {
    const { container } = render(<BrandPanel />)
    const wordmark = container.querySelector('[data-testid="brand-wordmark"]')
    expect(wordmark).toBeInTheDocument()
    expect(wordmark?.tagName).toBe('IMG')
  })

  it('renders the brand tagline', () => {
    render(<BrandPanel />)
    expect(screen.getByText(loginTexts.brand_tagline)).toBeInTheDocument()
  })
})
