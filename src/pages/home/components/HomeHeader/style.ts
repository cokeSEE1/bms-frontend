// src/pages/home/components/HomeHeader/style.ts
import styled from '@emotion/styled'
import { COLOR_BG_CONTAINER } from '../../../../theme/colors'

const COLOR_ACTIVE = '#005096'
const COLOR_INACTIVE = '#273849'
const COLOR_USER_TEXT = 'rgba(0, 14, 26, 0.65)'
const COLOR_SEARCH_BG = 'rgba(0, 14, 26, 0.08)'
const COLOR_SEARCH_PLACEHOLDER = 'rgba(0, 14, 26, 0.45)'
const COLOR_SEARCH_ICON = '#5B6275'

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px 8px 16px;
  background: ${COLOR_BG_CONTAINER};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
`

export const NavTabs = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const NavTab = styled.button<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border: none;
  background: none;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  line-height: 24px;
  color: ${({ active }) => (active ? COLOR_ACTIVE : COLOR_INACTIVE)};
  cursor: pointer;
  transition: color 0.2s;

  img {
    width: 24px;
    height: 24px;
    display: block;
  }

  .anticon {
    font-size: 24px;
  }

  &:hover {
    color: ${COLOR_ACTIVE};
  }
`

export const SearchWrapper = styled.div`
  width: 560px;

  .ant-input-affix-wrapper {
    height: 40px;
    padding: 0 16px;
    background: ${COLOR_SEARCH_BG};
    border: none;
    border-radius: 8px;
    box-shadow: none;

    &:focus-within,
    &:hover {
      border: none;
      box-shadow: none;
      background: ${COLOR_SEARCH_BG};
    }

    .ant-input {
      font-size: 18px;
      background: transparent;

      &::placeholder {
        color: ${COLOR_SEARCH_PLACEHOLDER};
        font-size: 18px;
      }
    }

    .ant-input-prefix {
      margin-inline-end: 8px;
    }

    .anticon {
      color: ${COLOR_SEARCH_ICON};
      font-size: 20px;
    }
  }
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: 32px;
`

export const AvatarIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(187, 223, 255, 1) 100%),
    linear-gradient(148deg, #1eb9e1 0%, #0088ff 35%, #5d51ea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .anticon {
    color: #fff;
    font-size: 14px;
  }
`

export const VerticalDivider = styled.div`
  width: 1px;
  height: 16px;
  background: #d9d9d9;
  flex-shrink: 0;
`

export const UserDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  cursor: pointer;
  color: ${COLOR_USER_TEXT};
  transition: color 0.2s;

  &:hover {
    color: ${COLOR_ACTIVE};
  }
`

export const Username = styled.span`
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`
