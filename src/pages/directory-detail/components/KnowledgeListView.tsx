// src/pages/directory-detail/components/KnowledgeListView.tsx
import styled from '@emotion/styled'
import { Empty, Pagination, Spin, Tag } from 'antd'
import { UserOutlined, ClockCircleOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { KnowledgeItem } from '../../../service/knowledge'
import {
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
  COLOR_BG_CONTAINER,
  COLOR_BORDER_COOL,
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
  gap: 8px;
`

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${COLOR_BG_CONTAINER};
  border: 1px solid ${COLOR_BORDER_COOL};
  border-radius: 8px;
`

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const DocIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

const CardTitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`

const CardTitleText = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR_TEXT_SECONDARY};
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const formatTime = (iso: string) => dayjs(iso).format('YYYY-MM-DD')

const KnowledgeListView = ({
  items,
  total,
  loading,
  page,
  pageSize,
  onPageChange,
}: KnowledgeListViewProps) => {
  if (loading) {
    return (
      <SpinWrapper>
        <Spin size="large" />
      </SpinWrapper>
    )
  }

  if (items.length === 0) {
    return <Empty description="暂无知识内容" />
  }

  return (
    <ListContainer>
      {items.map((item) => (
        <Card key={item.id}>
          <CardTop>
            <DocIcon src={docRichtextIcon} alt="" />
            <CardTitleArea>
              <CardTitleText>{item.name}</CardTitleText>
              {item.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} color="blue" style={{ margin: 0, flexShrink: 0 }}>{tag}</Tag>
              ))}
            </CardTitleArea>
          </CardTop>
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
