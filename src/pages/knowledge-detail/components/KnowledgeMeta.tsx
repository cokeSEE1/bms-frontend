import { UserOutlined, ClockCircleOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { MetaContainer, MetaItem, TagList, Tag } from '../style'
import type { KnowledgeDetail } from '../../../service/knowledge'

interface KnowledgeMetaProps {
  detail: KnowledgeDetail
}

const KnowledgeMeta = ({ detail }: KnowledgeMetaProps) => {
  const authorName =
    detail.creatorUserInfo?.username || detail.creator || detail.author || '未知'

  return (
    <MetaContainer>
      <MetaItem>
        <UserOutlined />
        {authorName}
      </MetaItem>
      <MetaItem>
        <ClockCircleOutlined />
        {dayjs(detail.updateTime).format('YYYY-MM-DD HH:mm')}
      </MetaItem>
      <MetaItem>
        <EyeOutlined />
        {detail.viewCount} 阅读
      </MetaItem>
      <MetaItem>
        <LikeOutlined />
        {detail.likeCount} 赞
      </MetaItem>
      {detail.tagNames && detail.tagNames.length > 0 && (
        <TagList>
          {detail.tagNames.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      )}
    </MetaContainer>
  )
}

export default KnowledgeMeta
