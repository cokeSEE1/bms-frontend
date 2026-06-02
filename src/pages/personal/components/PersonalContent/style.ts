import styled from '@emotion/styled'
import { COLOR_BG_CONTAINER } from '../../../../theme/colors'

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${COLOR_BG_CONTAINER};
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 48px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
  border-bottom: 1px solid #f1f2f4;
  flex-shrink: 0;
`

export const StyledContent = styled.div`
  height: 0;
  flex: 1;
  overflow: hidden auto;
`

export const StyledInner = styled.div`
  padding: 24px;
`
