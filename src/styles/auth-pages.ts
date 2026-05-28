import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_BRAND_GRADIENT_END,
  COLOR_BG_CONTAINER,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BRAND_TAGLINE,
} from '../theme/colors'

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

export const BrandPanelWrapper = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${COLOR_PRIMARY} 0%, ${COLOR_BRAND_GRADIENT_END} 100%);
  padding: 48px;
  animation: ${slideInLeft} 0.6s ease-out;
`

export const BrandIcon = styled.div`
  font-size: 96px;
  line-height: 1;
  margin-bottom: 24px;
  user-select: none;
`

export const BrandTitle = styled.h1`
  color: ${COLOR_BG_CONTAINER};
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
`

export const BrandLogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
`

export const BrandTagline = styled.p`
  color: ${COLOR_BRAND_TAGLINE};
  font-size: 16px;
  margin: 0;
  letter-spacing: 2px;
`

export const FormPanelWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_BG_CONTAINER};
  padding: 48px;
  animation: ${fadeInUp} 0.6s ease-out 0.15s both;
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: ${COLOR_BG_CONTAINER};
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`

export const FormTitle = styled.h2`
  color: ${COLOR_TEXT};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 32px 0;
  text-align: center;
`

export const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const BottomLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 14px;
`
