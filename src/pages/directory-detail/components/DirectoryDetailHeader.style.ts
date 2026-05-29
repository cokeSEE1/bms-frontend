// src/pages/directory-detail/components/DirectoryDetailHeader.style.ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BORDER_COOL,
} from '../../../theme/colors'

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

export const SortTabs = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`

export const SortTab = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: ${({ active }) => (active ? '8px 8px 0' : '8px 8px 7px')};
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-size: 14px;
  line-height: 22px;

  &::after {
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 100%;
    height: 2px;
    background: ${COLOR_PRIMARY};
    border-radius: 2px;
  }

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`
