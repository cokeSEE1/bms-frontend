import styled from '@emotion/styled'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BORDER_WARM,
  COLOR_BG_CONTAINER,
} from '../../theme/colors'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${COLOR_BG_CONTAINER};
  overflow: hidden;
`

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid ${COLOR_BORDER_WARM};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
`

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${COLOR_BG_CONTAINER};
    color: ${COLOR_TEXT};
  }
`

export const TopBarTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_TEXT};
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
`

export const ContentCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`

export const SidebarContainer = styled.div`
  flex: 0 0 320px;
  width: 320px;
  overflow-y: auto;
  padding: 24px 16px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1200px) {
    display: none;
  }
`

export const SidebarCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`

export const SidebarCardTitle = styled.div<{ collapsible?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.collapsible ? 'pointer' : 'default')};
`

export const CollapseIcon = styled.span<{ collapsed: boolean }>`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  cursor: pointer;
  transition: transform 0.2s;
  transform: ${(props) => (props.collapsed ? 'rotate(0deg)' : 'rotate(180deg)')};
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

export const StatusBadge = styled.span<{ status: number }>`
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 4px;
  background: ${(props) => {
    switch (props.status) {
      case 1:
        return '#e6f7e6'
      case 0:
        return '#f5f5f5'
      default:
        return '#fff3e0'
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 1:
        return '#389e0d'
      case 0:
        return '#919399'
      default:
        return '#d46b08'
    }
  }};
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
  max-width: 680px;
  margin: 0 auto;
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

export const CommentsSection = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`

export const CommentsTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 16px;
`

export const CommentInputWrapper = styled.div`
  margin-bottom: 20px;
`

export const CommentItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${COLOR_BORDER_WARM};

  &:last-child {
    border-bottom: none;
  }
`

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`

export const CommentAuthor = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${COLOR_TEXT};
`

export const CommentTime = styled.span`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

export const CommentBody = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR_TEXT};
  margin: 0;
`

export const CommentsEmpty = styled.div`
  text-align: center;
  padding: 32px 0;
  color: ${COLOR_TEXT_SECONDARY};
  font-size: 14px;
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  line-height: 20px;
`

export const DetailLabel = styled.span`
  color: ${COLOR_TEXT_SECONDARY};
  flex-shrink: 0;
`

export const DetailValue = styled.span`
  color: ${COLOR_TEXT};
  font-weight: 500;
  text-align: right;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const RelatedItemWrapper = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid ${COLOR_BORDER_WARM};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    .related-title {
      color: ${COLOR_PRIMARY};
    }
  }
`

export const RelatedItemTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${COLOR_TEXT};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s;
`

export const RelatedItemMeta = styled.div`
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  display: flex;
  gap: 12px;
`

export const SidebarSkeleton = styled.div`
  padding: 16px;
`

export const EditTitleInput = styled.div`
  margin-bottom: 16px;

  input {
    font-size: 22px;
    font-weight: 700;
    line-height: 32px;
    border-radius: 6px;
  }
`

export const EditAuthorInput = styled.div`
  margin-bottom: 16px;
  max-width: 300px;
`

export const EditAbstractTextArea = styled.div`
  margin-bottom: 20px;

  textarea {
    font-size: 14px;
    line-height: 22px;
    border-radius: 6px;
  }
`

export const EditContentWrapper = styled.div`
  margin: 0 auto;
`

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${COLOR_BORDER_WARM};
  margin-top: 24px;
`

export const EditBreadcrumbWrapper = styled.div`
  margin-bottom: 12px;
`
