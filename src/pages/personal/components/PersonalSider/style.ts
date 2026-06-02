import styled from '@emotion/styled'
import { COLOR_BG_CONTAINER, COLOR_PRIMARY } from '../../../../theme/colors'

export const StyledSider = styled.div`
  width: 240px;
  height: 100%;
  background-color: ${COLOR_BG_CONTAINER};
  border-right: 1px solid #f1f2f4;
  overflow: auto;
  flex-shrink: 0;
`

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
`

export const StyledAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #999;
`

export const StyledUsername = styled.div`
  color: ${COLOR_PRIMARY};
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
`

export const StyledMenu = styled.div`
  padding: 0 16px;
`

export const StyledMenuItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  margin-bottom: 2px;
  border-radius: 4px;
  transition: all 0.3s;
  line-height: 22px;
  cursor: pointer;

  background-color: ${({ active }) => (active ? 'rgba(26, 58, 74, 0.08)' : 'transparent')};
  color: ${({ active }) => (active ? COLOR_PRIMARY : '#666')};

  &:hover {
    background: rgba(26, 58, 74, 0.05);
  }
`

export const StyledMenuIcon = styled.div`
  font-size: 16px;
  color: inherit;
`

export const StyledMenuName = styled.div`
  color: inherit;
`
