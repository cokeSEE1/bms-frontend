import styled from '@emotion/styled'

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
  background: linear-gradient(135deg, #1a3a4a 0%, #2c5f6e 100%);
  padding: 48px;
`

export const BrandIcon = styled.div`
  font-size: 96px;
  line-height: 1;
  margin-bottom: 24px;
  user-select: none;
`

export const BrandTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: 4px;
`

export const BrandTagline = styled.p`
  color: rgba(255, 255, 255, 0.7);
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
  background-color: #ffffff;
  padding: 48px;
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`

export const FormTitle = styled.h2`
  color: #2c3e50;
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
  color: #7f8c8d;
  font-size: 14px;
`
