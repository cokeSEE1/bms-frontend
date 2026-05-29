// src/pages/directory-detail/components/DirectoryDetailHeader.tsx
import { Breadcrumb } from 'antd'
import { observer } from 'mobx-react-lite'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { directoryDetailStore } from '../../../stores/directoryDetailStore'
import {
  HeaderContainer,
  HeaderLeft,
  DirectoryTitle,
  HeaderRight,
  SortTabs,
  SortTab,
} from './DirectoryDetailHeader.style'

interface DirectoryDetailHeaderProps {
  dirId: string
}

const SORT_OPTIONS: { key: string; label: string }[] = [
  { key: 'name', label: '文件名排序' },
  { key: 'createTime', label: '最新创建' },
  { key: 'updateTime', label: '最近更新' },
  { key: 'viewCount', label: '最高浏览' },
]

const DirectoryDetailHeader = observer(({ dirId }: DirectoryDetailHeaderProps) => {
  const node = knowledgeStore.findNodeById(dirId)
  const breadcrumbs = knowledgeStore.getNodePath(dirId)
  const title = node?.title ?? ''

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Breadcrumb
          items={[
            { title: <a href="/dashboard">首页</a> },
            ...breadcrumbs.slice(0, -1).map((b) => ({
              title: <a href={`/dashboard/directory/${b.key}`}>{b.title}</a>,
            })),
          ]}
        />
        <DirectoryTitle>{title}</DirectoryTitle>
      </HeaderLeft>
      <HeaderRight>
        <SortTabs>
          {SORT_OPTIONS.map((opt) => (
            <SortTab
              key={opt.key}
              active={directoryDetailStore.sortField === opt.key}
              onClick={() => {
                directoryDetailStore.setSortField(opt.key)
                directoryDetailStore.setPage(1)
                directoryDetailStore.fetchList()
              }}
            >
              {opt.label}
            </SortTab>
          ))}
        </SortTabs>
      </HeaderRight>
    </HeaderContainer>
  )
})

export default DirectoryDetailHeader
