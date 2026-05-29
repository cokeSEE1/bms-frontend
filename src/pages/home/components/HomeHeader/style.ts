// src/pages/home/components/HomeHeader/style.ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_SEARCH_BG,
  COLOR_PLACEHOLDER,
  COLOR_SEARCH_ICON,
  COLOR_HEADER_GRADIENT_START,
  COLOR_HEADER_GRADIENT_MID,
  COLOR_HEADER_GRADIENT_END,
} from '../../../../theme/colors'

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px 8px 16px;
  background: linear-gradient(
    105deg,
    ${COLOR_HEADER_GRADIENT_START} 0%,
    ${COLOR_HEADER_GRADIENT_MID} 45%,
    ${COLOR_HEADER_GRADIENT_MID} 65%,
    ${COLOR_HEADER_GRADIENT_END} 100%
  );
  border-bottom: 1px solid rgba(26, 58, 74, 0.08);
  box-shadow: 0 1px 4px rgba(26, 58, 74, 0.04);
  flex-shrink: 0;

  @media (max-width: 1200px) {
    padding: 8px 16px 8px 8px;
  }
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
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT)};
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
    color: ${COLOR_PRIMARY};
  }
`

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 560px;
  min-width: 200px;

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
        color: ${COLOR_PLACEHOLDER};
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
  color: ${COLOR_TEXT_SECONDARY};
  transition: color 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

export const Username = styled.span`
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`
