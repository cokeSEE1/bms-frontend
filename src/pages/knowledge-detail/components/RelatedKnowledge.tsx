import { Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { KnowledgeItem } from '../../../service/knowledge'
import i18n from '../../../i18n/locales/zh-CN/knowledgeDetail'
import {
  SidebarCard,
  SidebarCardTitle,
  RelatedItemWrapper,
  RelatedItemTitle,
  RelatedItemMeta,
} from '../style'

interface RelatedKnowledgeProps {
  items: KnowledgeItem[]
  loading: boolean
}

const RelatedKnowledge = ({ items, loading }: RelatedKnowledgeProps) => {
  const navigate = useNavigate()

  if (loading) {
    return (
      <SidebarCard>
        <SidebarCardTitle>{i18n.related}</SidebarCardTitle>
        <Skeleton active paragraph={{ rows: 3 }} />
      </SidebarCard>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <SidebarCard>
      <SidebarCardTitle>{i18n.related}</SidebarCardTitle>
      {items.map((item) => (
        <RelatedItemWrapper
          key={item.id}
          onClick={() => navigate(`/knowledge/${item.id}`)}
        >
          <RelatedItemTitle className="related-title">{item.name}</RelatedItemTitle>
          <RelatedItemMeta>
            <span>{item.author || '-'}</span>
            <span>{item.viewCount} 阅读</span>
          </RelatedItemMeta>
        </RelatedItemWrapper>
      ))}
    </SidebarCard>
  )
}

export default RelatedKnowledge
