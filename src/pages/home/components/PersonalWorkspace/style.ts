import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_BORDER_WARM,
  COLOR_SURFACE_WARM,
  COLOR_BORDER_COOL,
  COLOR_BTN_GRADIENT_START,
  COLOR_BTN_GRADIENT_END,
} from '../../../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TEXT};
  padding: 8px 16px;
`

export const Content = styled.div`
  display: flex;
  align-items: stretch;
`

export const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px 0 0;
  border-right: 1px solid ${COLOR_BORDER_WARM};
  width: 492px;
  flex-shrink: 0;
`

export const DataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DataTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
`

export const DetailLink = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR_PRIMARY};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const StatCards = styled.div`
  display: flex;
  gap: 8px;
`

export const StatCard = styled.div<{ bg: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 8px 32px;
  background: ${({ bg }) => bg};
  border-radius: 4px;
`

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: ${COLOR_TEXT};
`

export const StatLabel = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 14, 26, 0.65);
`

export const CreateBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 40px;
  padding: 4px 12px;
  border: none;
  border-radius: 2px;
  background: linear-gradient(90deg, ${COLOR_BTN_GRADIENT_START} 0%, ${COLOR_BTN_GRADIENT_END} 100%);
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(15, 15, 15, 0.04);

  &:hover {
    opacity: 0.9;
  }
`

export const ParticipationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 0 16px;
  min-width: 0;
`

export const PartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PartTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
`

export const PartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const PartCard = styled.div`
  flex: 1 1 calc(50% - 4px);
  min-width: 160px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px;
  background: ${COLOR_SURFACE_WARM};
  border: 1px solid ${COLOR_BORDER_COOL};
  border-radius: 8px;
`

export const PartCardTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
`

export const PartCardDesc = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 14, 26, 0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
