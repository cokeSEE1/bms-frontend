import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BG_CONTAINER,
  COLOR_PLACEHOLDER,
  COLOR_SEARCH_ICON,
  COLOR_TAG_BG,
  COLOR_SURFACE_COOL,
} from '../../../../theme/colors'

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${COLOR_SURFACE_COOL};
  border-radius: 16px 0 0 0;
  overflow-y: auto;
`

export const ActionSection = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  flex-shrink: 0;
`

export const TabCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #ffffff;
  border-radius: 8px;
`

export const TabCardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
  text-align: center;
  padding: 4px 0;
`

export const TabCardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 8px 16px;
`

export const IconItem = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT)};
  transition: color 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
  }

  img {
    width: 44px;
    height: 44px;
    display: block;
  }
`

export const IconLabel = styled.span`
  font-size: 16px;
  line-height: 24px;
`

export const CatalogSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
  min-height: 0;
`

export const CatalogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  flex-shrink: 0;
`

export const CatalogTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TEXT};
  padding: 0 16px;
`

export const ExpandBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`

export const SearchWrapper = styled.div`
  padding: 0 2px;
  flex-shrink: 0;

  .ant-input-affix-wrapper {
    height: 36px;
    padding: 0 12px;
    background: ${COLOR_BG_CONTAINER};
    border: none;
    border-radius: 8px;
    box-shadow: none;

    &:focus-within,
    &:hover {
      border: none;
      box-shadow: none;
      background: ${COLOR_BG_CONTAINER};
    }

    .ant-input {
      font-size: 14px;
      background: transparent;

      &::placeholder {
        color: ${COLOR_PLACEHOLDER};
        font-size: 14px;
      }
    }

    .ant-input-prefix {
      margin-inline-end: 8px;
    }

    .anticon {
      color: ${COLOR_SEARCH_ICON};
      font-size: 16px;
    }
  }
`

export const TreeList = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`

export const TreeItem = styled.div<{ level: number; selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px 6px ${({ level }) => 8 + level * 16}px;
  cursor: pointer;
  color: ${({ selected }) => (selected ? COLOR_PRIMARY : COLOR_TEXT)};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  font-size: 14px;
  line-height: 22px;
  border-left: ${({ selected }) => (selected ? `2px solid ${COLOR_PRIMARY}` : '2px solid transparent')};
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: rgba(26, 58, 74, 0.04);
  }

  img {
    width: 20px;
    height: 20px;
    display: block;
    flex-shrink: 0;
  }

  .arrow-icon {
    transition: transform 0.2s;
    &.expanded {
      transform: rotate(90deg);
    }
  }
`

export const TreeItemText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TreeItemTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  font-size: 10px;
  line-height: 14px;
  color: #ffffff;
  background: ${COLOR_TAG_BG};
  border-radius: 2px;
  flex-shrink: 0;
`
