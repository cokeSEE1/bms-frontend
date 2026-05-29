// src/pages/directory-detail/components/KnowledgeTableView.tsx
import { Table, Tag, Empty, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'
import type { KnowledgeItem } from '../../../service/knowledge'

interface KnowledgeTableViewProps {
  items: KnowledgeItem[]
  total: number
  loading: boolean
  page: number
  pageSize: number
  sortField: string
  sortOrder: 'ascend' | 'descend'
  onPageChange: (page: number) => void
  onSortChange: (field: string, order: 'ascend' | 'descend') => void
  onRowClick?: (item: KnowledgeItem) => void
}

const formatTime = (iso: string) => {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const baseColumns: ColumnsType<KnowledgeItem> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    ellipsis: true,
    width: 300,
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 100,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 200,
    render: (tags: string[]) => (
      <>
        {tags.slice(0, 3).map((tag: string) => (
          <Tag key={tag} color="blue">{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: '浏览量',
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 100,
    render: (count: number) => (
      <span><EyeOutlined style={{ marginRight: 4 }} />{count}</span>
    ),
  },
  {
    title: '点赞',
    dataIndex: 'likeCount',
    key: 'likeCount',
    width: 80,
    render: (count: number) => (
      <span><LikeOutlined style={{ marginRight: 4 }} />{count}</span>
    ),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true,
    width: 160,
    render: (time: string) => formatTime(time),
  },
]

const KnowledgeTableView = ({
  items,
  total,
  loading,
  page,
  pageSize,
  sortField,
  sortOrder,
  onPageChange,
  onSortChange,
  onRowClick,
}: KnowledgeTableViewProps) => {
  const columns = baseColumns.map((col) => ({
    ...col,
    sortOrder: col.key === sortField ? sortOrder : undefined,
  }))

  return (
    <Table<KnowledgeItem>
      columns={columns}
      dataSource={items}
      rowKey="id"
      loading={loading && { indicator: <Spin size="large" />, tip: '加载中...' }}
      locale={{ emptyText: <Empty description="暂无知识内容" /> }}
      pagination={
        total > pageSize
          ? {
              current: page,
              pageSize,
              total,
              onChange: onPageChange,
              showTotal: (t) => `共 ${t} 条`,
              showSizeChanger: false,
            }
          : false
      }
      onChange={(_pagination, _filters, sorter) => {
        if (!Array.isArray(sorter) && sorter.order) {
          onSortChange(sorter.field as string, sorter.order === 'ascend' ? 'ascend' : 'descend')
        }
      }}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
        style: { cursor: 'pointer' },
      })}
    />
  )
}

export default KnowledgeTableView
