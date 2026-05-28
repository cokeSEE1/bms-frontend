// src/pages/home/components/KnowledgeWaterfall/style.ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BG_CONTAINER,
  COLOR_PLACEHOLDER,
  COLOR_SURFACE_COOL,
  COLOR_BORDER_COOL,
} from '../../../../theme/colors'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 32px;
  background: ${COLOR_SURFACE_COOL};
  border: 1px solid ${COLOR_BORDER_COOL};
  border-radius: 8px;
  min-height: 0;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 0;
`

export const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TEXT};
  padding: 8px 16px;
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
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_PLACEHOLDER)};
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

export const CardList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${COLOR_BG_CONTAINER};
  border: 1px solid ${COLOR_BORDER_COOL};
  border-radius: 8px;
`

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const DocIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

export const CardTitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`

export const CardTitleText = styled.a`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const EmptyWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: rgba(26, 58, 74, 0.06);
  border-radius: 8px;
  flex-shrink: 0;
`

export const SearchInfo = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 14, 26, 0.65);
`

export const ClearButton = styled.button`
  border: none;
  background: none;
  color: #1a3a4a;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;

  &:hover {
    background: rgba(26, 58, 74, 0.08);
  }
`
