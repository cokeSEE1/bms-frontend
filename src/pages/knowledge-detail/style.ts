import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BORDER_WARM,
} from '../../theme/colors'

export const PageContainer = styled.div`
  padding: 24px 32px;
  max-width: 960px;
  margin: 0 auto;
`

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`

export const HeaderContainer = styled.div`
  margin-bottom: 16px;
`

export const BreadcrumbWrapper = styled.div`
  margin-bottom: 12px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  color: ${COLOR_TEXT};
  margin: 0;
  flex: 1;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`

export const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding: 12px 0;
  border-bottom: 1px solid ${COLOR_BORDER_WARM};
  margin-bottom: 16px;
`

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  line-height: 20px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const Tag = styled.span`
  padding: 2px 10px;
  font-size: 12px;
  line-height: 18px;
  background: #f0ede5;
  color: #8b7355;
  border-radius: 10px;
`

export const AbstractBox = styled.div`
  padding: 16px 20px;
  background: linear-gradient(135deg, #e8f4f8, #f0f7fa);
  border-left: 3px solid ${COLOR_PRIMARY};
  border-radius: 0 8px 8px 0;
  margin-bottom: 20px;
`

export const AbstractLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${COLOR_PRIMARY};
  margin-right: 8px;
`

export const AbstractText = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR_TEXT};
`

export const ContentWrapper = styled.div`
  font-size: 15px;
  line-height: 28px;
  color: ${COLOR_TEXT};

  p {
    margin: 0 0 16px;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
`

export const EmptyContent = styled.div`
  text-align: center;
  padding: 60px 0;
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 14px;
`
