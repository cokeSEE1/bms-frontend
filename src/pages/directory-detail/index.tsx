// src/pages/directory-detail/index.tsx
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import DirectoryDetailHeader from './components/DirectoryDetailHeader'
import KnowledgeListView from './components/KnowledgeListView'
import { directoryDetailStore } from '../../stores/directoryDetailStore'
import { PageContainer, PageBody } from './style'

const DirectoryDetailPage = observer(() => {
  const { dirId } = useParams<{ dirId: string }>()

  useEffect(() => {
    if (dirId) {
      directoryDetailStore.loadDetail(Number(dirId))
    }
  }, [dirId])

  useEffect(() => {
    return () => {
      directoryDetailStore.reset()
    }
  }, [])

  if (!dirId) return null

  const store = directoryDetailStore

  return (
    <PageContainer>
      <DirectoryDetailHeader dirId={dirId} />
      <PageBody>
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
      </PageBody>
    </PageContainer>
  )
})

export default DirectoryDetailPage
