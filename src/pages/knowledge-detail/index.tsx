import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Result, Skeleton } from 'antd'
import { knowledgeDetailStore } from '../../stores/knowledgeDetailStore'
import KnowledgeDetailHeader from './components/KnowledgeDetailHeader'
import KnowledgeMeta from './components/KnowledgeMeta'
import RichContentRenderer from './components/RichContentRenderer'
import { PageContainer, LoadingWrapper, ErrorWrapper, AbstractBox, AbstractLabel, AbstractText } from './style'

const KnowledgeDetailPage = observer(() => {
  const { knowledgeId } = useParams<{ knowledgeId: string }>()
  const navigate = useNavigate()
  const { detail, loading, error } = knowledgeDetailStore

  useEffect(() => {
    if (knowledgeId) {
      knowledgeDetailStore.loadDetail(Number(knowledgeId))
    }
    return () => {
      knowledgeDetailStore.reset()
    }
  }, [knowledgeId])

  if (loading) {
    return (
      <PageContainer>
        <LoadingWrapper>
          <Skeleton active paragraph={{ rows: 8 }} />
        </LoadingWrapper>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorWrapper>
          <Result
            status="error"
            title="加载失败"
            subTitle={error}
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            }
          />
        </ErrorWrapper>
      </PageContainer>
    )
  }

  if (!detail) {
    return (
      <PageContainer>
        <ErrorWrapper>
          <Result
            status="404"
            title="知识条目不存在"
            extra={
              <Button type="primary" onClick={() => navigate('/dashboard')}>
                返回首页
              </Button>
            }
          />
        </ErrorWrapper>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <KnowledgeDetailHeader detail={detail} />
      <KnowledgeMeta detail={detail} />
      {detail.abstract && (
        <AbstractBox>
          <AbstractLabel>摘要</AbstractLabel>
          <AbstractText>{detail.abstract}</AbstractText>
        </AbstractBox>
      )}
      <RichContentRenderer content={detail.content} />
    </PageContainer>
  )
})

export default KnowledgeDetailPage
