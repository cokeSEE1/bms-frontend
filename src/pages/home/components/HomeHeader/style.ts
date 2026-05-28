// src/pages/home/components/HomeHeader/style.ts
import styled from '@emotion/styled'
import { COLOR_PRIMARY, COLOR_BG_CONTAINER, COLOR_TEXT_SECONDARY } from '../../../../theme/colors'

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: ${COLOR_BG_CONTAINER};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${COLOR_PRIMARY};
  letter-spacing: 2px;
  user-select: none;
`

export const NavTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const NavTab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: rgba(26, 58, 74, 0.06);
  }
`

export const SearchWrapper = styled.div`
  width: 320px;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
