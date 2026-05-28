// src/pages/home/components/KnowledgeWaterfall/style.ts
import styled from '@emotion/styled'
import {
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_PRIMARY,
  COLOR_BG_CONTAINER,
  COLOR_LINK,
} from '../../../../theme/colors'

export const WaterfallContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const SortTabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`

export const SortTab = styled.button<{ active: boolean }>`
  padding: 6px 16px;
  border: 1px solid ${({ active }) => (active ? COLOR_PRIMARY : 'transparent')};
  border-radius: 6px;
  background: ${({ active }) => (active ? 'rgba(26, 58, 74, 0.08)' : 'transparent')};
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
  }
`

export const CardList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Card = styled.article`
  padding: 20px;
  background: ${COLOR_BG_CONTAINER};
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

export const CardTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

export const CardTitle = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  display: block;
  margin-bottom: 8px;
  text-decoration: none;

  &:hover {
    color: ${COLOR_LINK};
  }
`

export const CardDesc = styled.p`
  font-size: 14px;
  color: ${COLOR_TEXT_SECONDARY};
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`
