// src/pages/home/components/RankingPanel/style.ts
import styled from '@emotion/styled'

const COLOR_TITLE = 'rgba(0, 14, 26, 0.95)'
const COLOR_LINK = '#005096'
const COLOR_META = 'rgba(0, 14, 26, 0.65)'
const COLOR_COUNT = '#005096'

export const PanelContainer = styled.aside`
  width: 338px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  background: #ffffff;
  border-radius: 0 16px 0 0;
  overflow-y: auto;
`

export const StarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  background: #f5faff;
  border: 1px solid #ebf5ff;
  border-radius: 8px;
`

export const StarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`

export const StarTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TITLE};
  padding: 8px 16px;
`

export const StarLink = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR_LINK};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const StarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const RankItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 16px;
`

export const MedalIcon = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
`

export const RankInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const RankName = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TITLE};
`

export const RankDept = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR_META};
`

export const RankCount = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${COLOR_COUNT};
  flex-shrink: 0;
`

export const NotifSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 0;
`

export const NotifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 0;
`

export const NotifTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TITLE};
  padding: 8px 16px;
`

export const NotifList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`

export const NotifItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f2f4;

  &:last-child {
    border-bottom: none;
  }
`

export const NotifInner = styled.div`
  display: flex;
  gap: 24px;
`

export const NotifText = styled.span<{ isRead: boolean }>`
  font-size: 14px;
  line-height: 22px;
  color: ${({ isRead }) => (isRead ? COLOR_META : COLOR_TITLE)};
  flex: 1;
`

export const NotifInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR_META};
`
