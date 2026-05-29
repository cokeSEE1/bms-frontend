import styled from '@emotion/styled'
import { Col } from 'antd'
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
  padding: 0 8px;
  flex-shrink: 0;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${COLOR_TEXT};
  padding: 8px 16px;

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: ${COLOR_PRIMARY};
    border-radius: 2px;
    flex-shrink: 0;
  }
`

export const DataCol = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid ${COLOR_BORDER_WARM};
  padding: 0 16px 0 0;

  @media (max-width: 1199px) {
    border-right: none;
    padding: 0;
    margin-bottom: 16px;
  }

  @media (min-width: 1080px) and (max-width: 1480px) {
    border-right: 1px solid ${COLOR_BORDER_WARM};
    padding-right: 8px;
  }
`

export const PartCol = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 0 16px;

  @media (max-width: 1199px) {
    padding: 0;
  }
`

export const DataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DataTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};

  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 14px;
    background: ${COLOR_PRIMARY};
    border-radius: 2px;
    flex-shrink: 0;
  }
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
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 9.5px 0;

  @media (min-width: 1080px) and (max-width: 1480px) {
    padding: 4px 0;
    gap: 4px;
    height: 120px;
  }
`

export const StatCard = styled.div<{ bg: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 8px;
  background: ${({ bg }) => bg};
  border-radius: 4px;

  @media (min-width: 1080px) and (max-width: 1480px) {
    padding: 6px 4px;
    height: 90px;
  }
`

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: ${COLOR_TEXT};

  @media (min-width: 1080px) and (max-width: 1480px) {
    font-size: 20px;
    line-height: 28px;
  }
`

export const StatLabel = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 14, 26, 0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 1080px) and (max-width: 1480px) {
    font-size: 11px;
  }
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

  @media (min-width: 1080px) and (max-width: 1480px) {
    height: 28px;
    font-size: 12px;
  }
`

export const PartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PartTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};

  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 14px;
    background: ${COLOR_PRIMARY};
    border-radius: 2px;
    flex-shrink: 0;
  }
`

export const PartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;

  @media (min-width: 1080px) and (max-width: 1480px) {
    gap: 6px;
    margin-top: 6px;
  }
`

export const PartCard = styled.div`
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const PartCardDesc = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 14, 26, 0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
