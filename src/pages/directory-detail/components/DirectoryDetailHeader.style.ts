// src/pages/directory-detail/components/DirectoryDetailHeader.style.ts
import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
} from '../../../theme/colors'

export const HeaderCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 20px 16px;
  margin-bottom: 8px;
  flex-shrink: 0;
`

export const BreadcrumbRow = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  margin-bottom: 10px;

  a {
    color: ${COLOR_TEXT_SECONDARY};
    text-decoration: none;
    &:hover { color: ${COLOR_PRIMARY}; }
  }

  .current {
    color: ${COLOR_TEXT};
    font-weight: 500;
  }
`

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 14px;
`

export const TitleLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${COLOR_PRIMARY};
  margin: 0;
  line-height: 1.3;
`

export const Stats = styled.span`
  font-size: 13px;
  color: ${COLOR_TEXT_SECONDARY};

  strong {
    color: ${COLOR_TEXT};
    font-weight: 600;
  }
`

export const StatDivider = styled.span`
  font-size: 12px;
  color: #ccc;
`

export const NewKnowledgeBtn = styled.button`
  padding: 7px 18px;
  background: linear-gradient(135deg, ${COLOR_PRIMARY}, #2c5f6e);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

export const SortBar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  background: #f8f7f4;
  border-radius: 8px;
`

export const SortLabel = styled.span`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  margin-right: 6px;
`

export const SortIndicator = styled.span`
  font-size: 10px;
`

export const SortPill = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 1px solid ${({ active }) => (active ? '#e8e2d8' : 'transparent')};
  background: ${({ active }) => (active ? '#ffffff' : 'transparent')};
  border-radius: 6px;
  font-size: 12px;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY)};
  font-weight: ${({ active }) => (active ? 500 : 400)};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: #ffffff;
    border-color: #e8e2d8;
  }
`
