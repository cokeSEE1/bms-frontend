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
