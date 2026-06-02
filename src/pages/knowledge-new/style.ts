import styled from '@emotion/styled'
import {
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BORDER_WARM,
  COLOR_BG_CONTAINER,
} from '../../theme/colors'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${COLOR_BG_CONTAINER};
  overflow: hidden;
`

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid ${COLOR_BORDER_WARM};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
`

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${COLOR_BG_CONTAINER};
    color: ${COLOR_TEXT};
  }
`

export const TopBarTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_TEXT};
`

export const BodyContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const FormCard = styled.div`
  max-width: 900px;
  margin: 24px auto;
  background: #fff;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`

export const FormItem = styled.div`
  margin-bottom: 24px;
`

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_TEXT};
  margin-bottom: 8px;

  .required::after {
    content: ' *';
    color: #ff4d4f;
  }
`

export const ContentEditorWrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${COLOR_BORDER_WARM};
  margin-top: 24px;
`
