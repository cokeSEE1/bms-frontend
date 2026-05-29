// src/pages/directory-detail/index.tsx
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import DirectoryDetailHeader from './components/DirectoryDetailHeader'
import KnowledgeListView from './components/KnowledgeListView'
import KnowledgeTableView from './components/KnowledgeTableView'
import { directoryDetailStore } from '../../stores/directoryDetailStore'
import { PageContainer, PageBody, ContentCard } from './style'

const DirectoryDetailPage = observer(() => {
  const { dirId } = useParams<{ dirId: string }>()
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (dirId) {
      directoryDetailStore.loadDetail(Number(dirId))
    }
    return () => {
      directoryDetailStore.reset()
    }
  }, [dirId])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      directoryDetailStore.setPage(1)
      directoryDetailStore.fetchList()
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [directoryDetailStore.keyword])

  if (!dirId) return null

  const store = directoryDetailStore

  return (
    <PageContainer>
      <DirectoryDetailHeader dirId={dirId} />
      <PageBody>
        <ContentCard>
          {store.viewType === 'list' ? (
            <KnowledgeListView
              items={store.items}
              total={store.total}
              loading={store.loading}
              page={store.page}
              pageSize={store.pageSize}
              onPageChange={(p) => {
                store.setPage(p)
                store.fetchList()
              }}
            />
          ) : (
            <KnowledgeTableView
              items={store.items}
              total={store.total}
              loading={store.loading}
              page={store.page}
              pageSize={store.pageSize}
              sortField={store.sortField}
              sortOrder={store.sortOrder}
              onPageChange={(p) => {
                store.setPage(p)
                store.fetchList()
              }}
              onSortChange={(field, order) => {
                store.setSortField(field)
                store.setSortOrder(order)
                store.setPage(1)
                store.fetchList()
              }}
            />
          )}
        </ContentCard>
      </PageBody>
    </PageContainer>
  )
})

export default DirectoryDetailPage
