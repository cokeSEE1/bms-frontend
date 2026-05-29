import { BrandPanelWrapper, BrandLogoBox, BrandTagline } from './style'
import loginTexts from '../../i18n/locales/zh-CN/login'
import logoSrc from '../../assets/logo.svg'
import wordmarkSrc from '../../assets/wordmark.svg'

const BrandPanel = () => {
  return (
    <BrandPanelWrapper>
      <BrandLogoBox>
        <img src={logoSrc} alt="KMS Logo" width={80} height={80} data-testid="brand-logo" />
      </BrandLogoBox>
      <img src={wordmarkSrc} alt="KMS" width={200} height={80} data-testid="brand-wordmark" />
      <BrandTagline>{loginTexts.brand_tagline}</BrandTagline>
    </BrandPanelWrapper>
  )
}

export default BrandPanel
