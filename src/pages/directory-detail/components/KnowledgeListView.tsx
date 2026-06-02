// src/pages/directory-detail/components/KnowledgeListView.tsx
import styled from '@emotion/styled'
import { Pagination } from 'antd'
import { UserOutlined, ClockCircleOutlined, EyeOutlined, LikeOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import type { KnowledgeItem } from '../../../service/knowledge'
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BG_LAYOUT,
  COLOR_BORDER_WARM,
} from '../../../theme/colors'
import docRichtextIcon from '../../../assets/icons/doc-richtext.svg'

interface KnowledgeListViewProps {
  items: KnowledgeItem[]
  total: number
  loading: boolean
  page: number
  pageSize: number
  onPageChange: (page: number) => void
}

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Card = styled.article`
  display: flex;
  gap: 10px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid ${COLOR_BORDER_WARM};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #d5cfc4;
  }
`

const CardIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, ${COLOR_PRIMARY}, #2c5f6e);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 20px;
    height: 20px;
    filter: brightness(0) invert(1);
  }
`

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
`

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 6px;
`

const CardAbstract = styled.p`
  font-size: 13px;
  line-height: 20px;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR_TEXT_SECONDARY};
`

const WarmTag = styled.span`
  padding: 2px 8px;
  font-size: 11px;
  line-height: 18px;
  background: #f0ede5;
  color: #8b7355;
  border-radius: 10px;
  white-space: nowrap;
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

const SkeletonCard = styled.div<{ faded?: boolean }>`
  display: flex;
  gap: 10px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid ${COLOR_BORDER_WARM};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  opacity: ${({ faded }) => (faded ? 0.5 : 1)};
`

const SkeletonIcon = styled.div`
  width: 36px;
  height: 36px;
  background: #f0f0f0;
  border-radius: 8px;
  flex-shrink: 0;
`

const SkeletonBody = styled.div`
  flex: 1;
`

const SkeletonLine = styled.div<{ width: string; height?: string }>`
  height: ${({ height }) => height ?? '12px'};
  background: #f0f0f0;
  border-radius: 4px;
  width: ${({ width }) => width};
  margin-bottom: 8px;
`

const SkeletonLineLight = styled(SkeletonLine)`
  background: #f5f5f5;
`

const SkeletonMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const LoadingText = styled.div`
  text-align: center;
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
  margin-top: 4px;
`

const TopLoadingBar = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, ${COLOR_PRIMARY}22, ${COLOR_PRIMARY}, ${COLOR_PRIMARY}22);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 2px;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
`

const EmptyContent = styled.div`
  text-align: center;
  padding: 32px;
`

const EmptyIcon = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, ${COLOR_BG_LAYOUT}, #e8e2d8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const EmptyTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin: 0 0 8px;
`

const EmptyDescription = styled.p`
  font-size: 13px;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 0 0 20px;
  line-height: 20px;
`

const NewItemBtn = styled.button`
  padding: 8px 24px;
  background: linear-gradient(135deg, ${COLOR_PRIMARY}, #2c5f6e);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const formatTime = (iso: string) => dayjs(iso).format('YYYY-MM-DD')

const SkeletonList = () => (
  <ListContainer>
    <SkeletonCard>
      <SkeletonIcon />
      <SkeletonBody>
        <SkeletonLine width="55%" height="16px" />
        <SkeletonLineLight width="100%" />
        <SkeletonLineLight width="45%" />
        <SkeletonMetaRow>
          <SkeletonLineLight width="30%" height="10px" />
          <SkeletonLineLight width="20%" height="10px" />
        </SkeletonMetaRow>
      </SkeletonBody>
    </SkeletonCard>
    <SkeletonCard>
      <SkeletonIcon />
      <SkeletonBody>
        <SkeletonLine width="48%" height="16px" />
        <SkeletonLineLight width="100%" />
        <SkeletonLineLight width="38%" />
        <SkeletonMetaRow>
          <SkeletonLineLight width="28%" height="10px" />
          <SkeletonLineLight width="18%" height="10px" />
        </SkeletonMetaRow>
      </SkeletonBody>
    </SkeletonCard>
    <SkeletonCard faded>
      <SkeletonIcon />
      <SkeletonBody>
        <SkeletonLine width="52%" height="16px" />
        <SkeletonLineLight width="100%" />
        <SkeletonLineLight width="40%" />
      </SkeletonBody>
    </SkeletonCard>
    <LoadingText>正在加载知识列表...</LoadingText>
  </ListContainer>
)

const KnowledgeListView = ({
  items,
  total,
  loading,
  page,
  pageSize,
  onPageChange,
}: KnowledgeListViewProps) => {
  const navigate = useNavigate()

  if (loading && items.length === 0) {
    return <SkeletonList />
  }

  if (items.length === 0) {
    return (
      <EmptyWrapper>
        <EmptyContent>
          <EmptyIcon>📂</EmptyIcon>
          <EmptyTitle>此目录暂无内容</EmptyTitle>
          <EmptyDescription>向该目录添加第一条知识条目</EmptyDescription>
          <NewItemBtn>
            <PlusOutlined style={{ marginRight: 4 }} />
            新建知识条目
          </NewItemBtn>
        </EmptyContent>
      </EmptyWrapper>
    )
  }

  return (
    <ListContainer>
      {loading && <TopLoadingBar />}
      {items.map((item) => (
        <Card key={item.id} onClick={() => navigate(`/knowledge/${item.id}`)}>
          <CardIcon>
            <img src={docRichtextIcon} alt="" />
          </CardIcon>
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.abstract && <CardAbstract>{item.abstract}</CardAbstract>}
            <CardMeta>
              <MetaLeft>
                <MetaItem>
                  <UserOutlined />
                  {item.author}
                </MetaItem>
                <MetaItem>
                  <ClockCircleOutlined />
                  {formatTime(item.updateTime)}
                </MetaItem>
                {item.tags.slice(0, 3).map((tag) => (
                  <WarmTag key={tag}>{tag}</WarmTag>
                ))}
              </MetaLeft>
              <MetaRight>
                <MetaItem>
                  <EyeOutlined />
                  {item.viewCount}
                </MetaItem>
                <MetaItem>
                  <LikeOutlined />
                  {item.likeCount}
                </MetaItem>
              </MetaRight>
            </CardMeta>
          </CardBody>
        </Card>
      ))}
      {total > pageSize && (
        <PaginationWrapper>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showTotal={(t) => `共 ${t} 条`}
            showSizeChanger={false}
          />
        </PaginationWrapper>
      )}
    </ListContainer>
  )
}

export default KnowledgeListView
