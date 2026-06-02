import { observer } from 'mobx-react-lite'
import {
  UserOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  StarOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { knowledgeDetailStore } from '../../../stores/knowledgeDetailStore'
import { MetaContainer, MetaItem, TagList, Tag, StatusBadge } from '../style'
import i18n from '../../../i18n/locales/zh-CN/knowledgeDetail'
import type { KnowledgeDetail } from '../../../service/knowledge'

interface KnowledgeMetaProps {
  detail: KnowledgeDetail
}

const STATUS_LABELS: Record<number, string> = {
  0: i18n.statusDraft,
  1: i18n.statusPublished,
  2: i18n.statusReviewing,
}

const KnowledgeMeta = observer(({ detail }: KnowledgeMetaProps) => {
  const { displayLikeCount, displayFavoriteCount, displayShareNum } = knowledgeDetailStore
  const authorName =
    detail.creatorUserInfo?.username || detail.creator || detail.author || '-'

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
        {detail.viewCount} {i18n.views}
      </MetaItem>
      <MetaItem>
        <LikeOutlined />
        {displayLikeCount} {i18n.likes}
      </MetaItem>
      <MetaItem>
        <StarOutlined />
        {displayFavoriteCount} {i18n.favorites}
      </MetaItem>
      <MetaItem>
        <ShareAltOutlined />
        {displayShareNum} {i18n.shares}
      </MetaItem>
      <MetaItem>
        <DownloadOutlined />
        {detail.downloadNum} {i18n.downloads}
      </MetaItem>
      <MetaItem>
        <FileTextOutlined />
        v{detail.version}
      </MetaItem>
      <StatusBadge status={detail.status}>
        {STATUS_LABELS[detail.status] ?? i18n.statusDraft}
      </StatusBadge>
      {detail.tagNames && detail.tagNames.length > 0 && (
        <TagList>
          {detail.tagNames.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      )}
    </MetaContainer>
  )
})

export default KnowledgeMeta
