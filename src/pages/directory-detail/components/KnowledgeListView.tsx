// src/pages/directory-detail/components/KnowledgeListView.tsx
import styled from '@emotion/styled'
import { Empty, Pagination, Spin } from 'antd'
import KnowledgeCard from './KnowledgeCard'
import type { KnowledgeItem } from '../../../service/knowledge'

interface KnowledgeListViewProps {
  items: KnowledgeItem[]
  total: number
  loading: boolean
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onItemClick?: (item: KnowledgeItem) => void
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
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

const KnowledgeListView = ({
  items,
  total,
  loading,
  page,
  pageSize,
  onPageChange,
  onItemClick,
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
        <KnowledgeCard key={item.id} item={item} onClick={onItemClick} />
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
