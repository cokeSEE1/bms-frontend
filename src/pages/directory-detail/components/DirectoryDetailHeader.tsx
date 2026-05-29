import { Breadcrumb, Input, Segmented, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { knowledgeStore } from '../../../stores/knowledgeStore'
import { directoryDetailStore } from '../../../stores/directoryDetailStore'
import {
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  SearchInput,
} from './DirectoryDetailHeader.style'

interface DirectoryDetailHeaderProps {
  dirId: string
}

const viewOptions = [
  { label: '列表', value: 'list' },
  { label: '紧凑', value: 'table' },
]

const sortFieldOptions = [
  { label: '更新时间', value: 'updateTime' },
  { label: '名称', value: 'name' },
  { label: '浏览量', value: 'viewCount' },
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
            { title: title },
          ]}
        />
      </HeaderLeft>
      <HeaderRight>
        <SearchInput>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索知识..."
            value={directoryDetailStore.keyword}
            onChange={(e) => {
              directoryDetailStore.setKeyword(e.target.value)
            }}
            allowClear
            onClear={() => {
              directoryDetailStore.setKeyword('')
            }}
          />
        </SearchInput>
        <Segmented
          options={viewOptions}
          value={directoryDetailStore.viewType}
          onChange={(val) => directoryDetailStore.setViewType(val as 'list' | 'table')}
        />
        <Select
          value={directoryDetailStore.sortField}
          onChange={(val) => {
            directoryDetailStore.setSortField(val)
            directoryDetailStore.setPage(1)
            directoryDetailStore.fetchList()
          }}
          options={sortFieldOptions}
          style={{ width: 120 }}
          size="small"
        />
      </HeaderRight>
    </HeaderContainer>
  )
})

export default DirectoryDetailHeader
