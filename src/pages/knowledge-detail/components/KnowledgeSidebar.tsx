import dayjs from 'dayjs'
import { SidebarCard, SidebarCardTitle, DetailRow, DetailLabel, DetailValue, StatusBadge } from '../style'
import type { KnowledgeDetail } from '../../../service/knowledge'
import i18n from '../../../i18n/locales/zh-CN/knowledgeDetail'

interface KnowledgeSidebarProps {
  detail: KnowledgeDetail
}

const STATUS_LABELS: Record<number, string> = {
  0: i18n.statusDraft,
  1: i18n.statusPublished,
  2: i18n.statusReviewing,
}

const TYPE_LABELS: Record<number, string> = {
  1: i18n.typeRichText,
  2: i18n.typeStandardDoc,
  3: i18n.typeFile,
}

const KnowledgeSidebar = ({ detail }: KnowledgeSidebarProps) => {
  const statusLabel = STATUS_LABELS[detail.status] ?? i18n.statusDraft
  const typeLabel = TYPE_LABELS[detail.knowledgeType] ?? detail.knowledgeType.toString()

  return (
    <SidebarCard>
      <SidebarCardTitle>{i18n.knowledgeDetails}</SidebarCardTitle>
      <DetailRow>
        <DetailLabel>{i18n.creator}</DetailLabel>
        <DetailValue>{detail.creatorUserInfo?.username || detail.creator || '-'}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.lastModifier}</DetailLabel>
        <DetailValue>{detail.lastModifyUserInfo?.username || detail.lastModifyUser || '-'}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.knowledgeBase}</DetailLabel>
        <DetailValue>{detail.kbName}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.version}</DetailLabel>
        <DetailValue>v{detail.version} / {detail.maxVersion}</DetailValue>
      </DetailRow>
      {detail.firstReleaseTime && (
        <DetailRow>
          <DetailLabel>{i18n.firstPublished}</DetailLabel>
          <DetailValue>{dayjs(detail.firstReleaseTime).format('YYYY-MM-DD')}</DetailValue>
        </DetailRow>
      )}
      {detail.lastReleaseTime && (
        <DetailRow>
          <DetailLabel>{i18n.lastPublished}</DetailLabel>
          <DetailValue>{dayjs(detail.lastReleaseTime).format('YYYY-MM-DD')}</DetailValue>
        </DetailRow>
      )}
      <DetailRow>
        <DetailLabel>{i18n.knowledgeType}</DetailLabel>
        <DetailValue>{typeLabel}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.status}</DetailLabel>
        <DetailValue>
          <StatusBadge status={detail.status}>{statusLabel}</StatusBadge>
        </DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.favorites}</DetailLabel>
        <DetailValue>{detail.favoriteCount}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.shares}</DetailLabel>
        <DetailValue>{detail.shareNum}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.downloads}</DetailLabel>
        <DetailValue>{detail.downloadNum}</DetailValue>
      </DetailRow>
      <DetailRow>
        <DetailLabel>{i18n.views}</DetailLabel>
        <DetailValue>{detail.viewCount}</DetailValue>
      </DetailRow>
    </SidebarCard>
  )
}

export default KnowledgeSidebar
