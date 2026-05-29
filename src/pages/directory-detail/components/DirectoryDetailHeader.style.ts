import styled from '@emotion/styled'
import { COLOR_BORDER_COOL, COLOR_TEXT } from '../../../theme/colors'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid ${COLOR_BORDER_COOL};
  flex-shrink: 0;
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const DirectoryTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

export const SearchInput = styled.div`
  width: 200px;
`
