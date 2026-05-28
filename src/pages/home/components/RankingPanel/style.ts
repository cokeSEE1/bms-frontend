// src/pages/home/components/RankingPanel/style.ts
import styled from '@emotion/styled'
import { COLOR_TEXT, COLOR_TEXT_SECONDARY, COLOR_BG_CONTAINER, COLOR_LINK } from '../../../../theme/colors'

export const PanelContainer = styled.aside`
  width: 320px;
  flex-shrink: 0;
  overflow-y: auto;
  padding: 20px 16px;
  background: ${COLOR_BG_CONTAINER};
  border-left: 1px solid rgba(0, 0, 0, 0.06);
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 12px;
`

export const RankItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.04);
  }
`

export const RankBadge = styled.span<{ rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: ${({ rank }) => (rank === 1 ? '#f5a623' : rank === 2 ? '#9b9b9b' : '#cd7f32')};
  flex-shrink: 0;
`

export const RankInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const RankName = styled.div`
  font-size: 13px;
  color: ${COLOR_TEXT};
`

export const RankDept = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const RankCount = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${COLOR_LINK};
  flex-shrink: 0;
`

export const NotifItem = styled.div<{ isRead: boolean }>`
  padding: 8px 0;
  font-size: 13px;
  color: ${({ isRead }) => (isRead ? COLOR_TEXT_SECONDARY : COLOR_TEXT)};
  opacity: ${({ isRead }) => (isRead ? 0.6 : 1)};

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.04);
  }
`

export const NotifTime = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  margin-top: 2px;
`
