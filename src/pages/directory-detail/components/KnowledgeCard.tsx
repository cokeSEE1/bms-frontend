// src/pages/directory-detail/components/KnowledgeCard.tsx
import styled from '@emotion/styled'
import { Tag, Tooltip } from 'antd'
import { EyeOutlined, LikeOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import type { KnowledgeItem } from '../../../service/knowledge'
import { COLOR_TEXT, COLOR_TEXT_SECONDARY, COLOR_BORDER_COOL } from '../../../theme/colors'

interface KnowledgeCardProps {
  item: KnowledgeItem
  onClick?: (item: KnowledgeItem) => void
}

const CardWrapper = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid ${COLOR_BORDER_COOL};
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${COLOR_TEXT};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CardAbstract = styled.div`
  font-size: 13px;
  color: ${COLOR_TEXT_SECONDARY};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: ${COLOR_TEXT_SECONDARY};
`

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const TagsRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`

const formatTime = (iso: string) => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const KnowledgeCard = ({ item, onClick }: KnowledgeCardProps) => {
  return (
    <CardWrapper onClick={() => onClick?.(item)}>
      <CardBody>
        <CardTitle>
          <Tooltip title={item.name}>{item.name}</Tooltip>
        </CardTitle>
        <CardAbstract>{item.abstract}</CardAbstract>
        {item.tags.length > 0 && (
          <TagsRow>
            {item.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} color="blue">{tag}</Tag>
            ))}
          </TagsRow>
        )}
        <CardMeta>
          <MetaItem>
            <UserOutlined />
            {item.author}
          </MetaItem>
          <MetaItem>
            <EyeOutlined />
            {item.viewCount}
          </MetaItem>
          <MetaItem>
            <LikeOutlined />
            {item.likeCount}
          </MetaItem>
          <MetaItem>
            <ClockCircleOutlined />
            {formatTime(item.updateTime)}
          </MetaItem>
        </CardMeta>
      </CardBody>
    </CardWrapper>
  )
}

export default KnowledgeCard
