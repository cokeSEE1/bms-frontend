// src/pages/directory-detail/components/DirectoryDetailHeader.tsx
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { directoryDetailStore } from '../../../stores/directoryDetailStore'
import {
  HeaderCard,
  BreadcrumbRow,
  TitleRow,
  TitleLeft,
  PageTitle,
  Stats,
  StatDivider,
  NewKnowledgeBtn,
  SortBar,
  SortLabel,
  SortPill,
  SortIndicator,
} from './DirectoryDetailHeader.style'

interface SortOption {
  key: string
  label: string
  icon: string
}

const SORT_OPTIONS: SortOption[] = [
  { key: 'name', label: '文件名', icon: '📝' },
  { key: 'updateTime', label: '最近更新', icon: '🕐' },
  { key: 'viewCount', label: '最高浏览', icon: '👁' },
]

interface DirectoryDetailHeaderProps {
  dirId: string
}

const DirectoryDetailHeader = observer(({ dirId }: DirectoryDetailHeaderProps) => {
  const navigate = useNavigate()
  const node = knowledgeStore.findNodeById(dirId)
  const breadcrumbs = knowledgeStore.getNodePath(dirId)
  const title = node?.title ?? ''
  const store = directoryDetailStore

  const formatLastUpdate = (iso: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <HeaderCard>
      <BreadcrumbRow>
        <a href="/dashboard"><HomeOutlined /> 首页</a>
        {breadcrumbs.slice(0, -1).map((b) => (
          <span key={b.key}>
            {' / '}
            <a href={`/dashboard/directory/${b.key}`}>{b.title}</a>
          </span>
        ))}
        <span className="current"> / {title}</span>
      </BreadcrumbRow>

      <TitleRow>
        <TitleLeft>
          <PageTitle>{title}</PageTitle>
          <Stats>共 <strong>{store.total}</strong> 条</Stats>
          {store.lastUpdateTime && (
            <>
              <StatDivider>·</StatDivider>
              <Stats>最近更新 {formatLastUpdate(store.lastUpdateTime)}</Stats>
            </>
          )}
        </TitleLeft>
        <NewKnowledgeBtn onClick={() => navigate(`/knowledge/new?cateId=${dirId}`)}>+ 新建知识</NewKnowledgeBtn>
      </TitleRow>

      <SortBar>
        <SortLabel>排序</SortLabel>
        {SORT_OPTIONS.map((opt) => (
          <SortPill
            key={opt.key}
            active={store.sortField === opt.key}
            onClick={() => {
              store.setSortField(opt.key)
              store.setPage(1)
              store.fetchList()
            }}
          >
            <span>{opt.icon}</span>
            {opt.label}
            {store.sortField === opt.key && <SortIndicator>↑↓</SortIndicator>}
          </SortPill>
        ))}
      </SortBar>
    </HeaderCard>
  )
})

export default DirectoryDetailHeader
