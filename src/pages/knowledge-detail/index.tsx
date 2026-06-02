import { useEffect, useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { Input, Button, Breadcrumb, Result, Skeleton, Tooltip, message } from 'antd'
import { knowledgeDetailStore } from '../../stores/knowledgeDetailStore'
import { knowledgeEditStore } from '../../stores/knowledgeEditStore'
import KnowledgeDetailHeader from './components/KnowledgeDetailHeader'
import KnowledgeMeta from './components/KnowledgeMeta'
import RichContentRenderer from './components/RichContentRenderer'
import TiptapEditor from './components/TiptapEditor'
import KnowledgeComments from './components/KnowledgeComments'
import RelatedKnowledge from './components/RelatedKnowledge'
import KnowledgeSidebar from './components/KnowledgeSidebar'
import i18n from '../../i18n/locales/zh-CN/knowledgeDetail'
import {
  PageContainer,
  TopBar,
  TopBarLeft,
  BackButton,
  TopBarTitle,
  TopBarRight,
  BodyContainer,
  MainContent,
  ContentCard,
  SidebarContainer,
  ErrorWrapper,
  AbstractBox,
  AbstractLabel,
  AbstractText,
  EditTitleInput,
  EditAuthorInput,
  EditAbstractTextArea,
  EditContentWrapper,
  EditActions,
  EditBreadcrumbWrapper,
} from './style'

const KnowledgeDetailPage = observer(() => {
  const { knowledgeId } = useParams<{ knowledgeId: string }>()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const {
    detail,
    loading,
    error,
    comments,
    commentsLoading,
    commentsError,
    commentsHasMore,
    relatedItems,
    relatedLoading,
  } = knowledgeDetailStore

  useEffect(() => {
    if (knowledgeId) {
      const id = Number(knowledgeId)
      knowledgeDetailStore.loadDetail(id)
      knowledgeDetailStore.loadComments(id)
    }
    return () => {
      knowledgeDetailStore.reset()
    }
  }, [knowledgeId])

  useEffect(() => {
    if (detail?.cateId) {
      knowledgeDetailStore.loadRelated(detail.cateId, detail.id)
    }
  }, [detail?.cateId, detail?.id])

  useEffect(() => {
    if (knowledgeEditStore.submitted && knowledgeEditStore.editId !== null) {
      message.success('知识更新成功')
      setIsEditing(false)
      const editId = knowledgeEditStore.editId
      knowledgeEditStore.reset()
      knowledgeDetailStore.loadDetail(editId)
      knowledgeDetailStore.loadComments(editId)
    }
  }, [knowledgeEditStore.submitted, knowledgeEditStore.editId])

  const handleAddComment = async (content: string) => {
    await knowledgeDetailStore.addComment(content)
  }

  const handleLoadMoreComments = useCallback(() => {
    if (detail) {
      knowledgeDetailStore.loadMoreComments(detail.id)
    }
  }, [detail])

  const handleEnterEdit = () => {
    if (detail) {
      knowledgeEditStore.loadForEdit(detail)
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    knowledgeEditStore.reset()
  }

  const handleSaveDraft = () => {
    knowledgeEditStore.status = 1
    knowledgeEditStore.submit()
  }

  const handlePublish = () => {
    knowledgeEditStore.status = 3
    knowledgeEditStore.submit()
  }

  if (loading) {
    return (
      <PageContainer>
        <TopBar>
          <TopBarLeft>
            <BackButton onClick={() => navigate('/dashboard')}>
              <ArrowLeftOutlined />
              {i18n.back}
            </BackButton>
          </TopBarLeft>
        </TopBar>
        <BodyContainer>
          <MainContent>
            <ContentCard>
              <Skeleton active paragraph={{ rows: 3 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 8 }} />
            </ContentCard>
          </MainContent>
          <SidebarContainer>
            <Skeleton active paragraph={{ rows: 5 }} />
            <Skeleton active paragraph={{ rows: 8 }} />
          </SidebarContainer>
        </BodyContainer>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <TopBar>
          <TopBarLeft>
            <BackButton onClick={() => navigate('/dashboard')}>
              <ArrowLeftOutlined />
              {i18n.back}
            </BackButton>
          </TopBarLeft>
        </TopBar>
        <ErrorWrapper>
          <Result
            status="error"
            title={i18n.loadFailed}
            subTitle={error}
            extra={
              <Button
                type="primary"
                onClick={() => knowledgeId && knowledgeDetailStore.loadDetail(Number(knowledgeId))}
              >
                重试
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
        <TopBar>
          <TopBarLeft>
            <BackButton onClick={() => navigate('/dashboard')}>
              <ArrowLeftOutlined />
              {i18n.back}
            </BackButton>
          </TopBarLeft>
        </TopBar>
        <ErrorWrapper>
          <Result
            status="404"
            title={i18n.notFound}
            extra={
              <Button type="primary" onClick={() => navigate('/dashboard')}>
                {i18n.backHome}
              </Button>
            }
          />
        </ErrorWrapper>
      </PageContainer>
    )
  }

  const editBreadcrumbItems = [
    { title: <><HomeOutlined /> 返回首页</>, path: '/dashboard' },
    ...detail.knowledgePath.map((node) => ({
      title: node.dirName,
      path: `/dashboard/directory/${node.dirId}`,
    })),
    { title: `${detail.name} (编辑中)` },
  ]

  return (
    <PageContainer>
      <TopBar>
        <TopBarLeft>
          <BackButton onClick={() => navigate('/dashboard')}>
            <ArrowLeftOutlined />
            {i18n.back}
          </BackButton>
          {isEditing ? (
            <TopBarTitle>{detail.name} (编辑中)</TopBarTitle>
          ) : (
            <Tooltip title={detail.name}>
              <TopBarTitle>{detail.name}</TopBarTitle>
            </Tooltip>
          )}
        </TopBarLeft>
        <TopBarRight>
          {isEditing ? (
            <>
              <Button onClick={handleCancelEdit}>取消</Button>
              <Button onClick={handleSaveDraft} loading={knowledgeEditStore.loading}>
                保存草稿
              </Button>
              <Button
                type="primary"
                onClick={handlePublish}
                loading={knowledgeEditStore.loading}
                disabled={!knowledgeEditStore.title.trim()}
              >
                发布
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={handleEnterEdit}>
                编辑
              </Button>
              <Button
                icon={<HomeOutlined />}
                type="text"
                onClick={() => navigate('/dashboard')}
              />
            </>
          )}
        </TopBarRight>
      </TopBar>
      <BodyContainer>
        <MainContent>
          <ContentCard>
            {isEditing ? (
              <>
                <EditBreadcrumbWrapper>
                  <Breadcrumb items={editBreadcrumbItems} />
                </EditBreadcrumbWrapper>
                <EditTitleInput>
                  <Input
                    value={knowledgeEditStore.title}
                    onChange={(e) => knowledgeEditStore.setTitle(e.target.value)}
                    placeholder="请输入知识标题"
                    maxLength={255}
                    size="large"
                  />
                </EditTitleInput>
                <EditAuthorInput>
                  <Input
                    value={knowledgeEditStore.author}
                    onChange={(e) => knowledgeEditStore.setAuthor(e.target.value)}
                    placeholder="请输入作者"
                    addonBefore="作者"
                  />
                </EditAuthorInput>
                <EditAbstractTextArea>
                  <Input.TextArea
                    value={knowledgeEditStore.abstract}
                    onChange={(e) => knowledgeEditStore.setAbstract(e.target.value)}
                    placeholder="请输入知识摘要"
                    rows={3}
                    maxLength={500}
                  />
                </EditAbstractTextArea>
                <EditContentWrapper>
                  <TiptapEditor
                    content={knowledgeEditStore.content}
                    onChange={(html) => knowledgeEditStore.setContent(html)}
                  />
                </EditContentWrapper>
                <EditActions>
                  <Button onClick={handleCancelEdit}>取消</Button>
                  <Button onClick={handleSaveDraft} loading={knowledgeEditStore.loading}>
                    保存草稿
                  </Button>
                  <Button
                    type="primary"
                    onClick={handlePublish}
                    loading={knowledgeEditStore.loading}
                    disabled={!knowledgeEditStore.title.trim()}
                  >
                    发布
                  </Button>
                </EditActions>
              </>
            ) : (
              <>
                <KnowledgeDetailHeader detail={detail} />
                <KnowledgeMeta detail={detail} />
                {detail.abstract && (
                  <AbstractBox>
                    <AbstractLabel>{i18n.abstract}</AbstractLabel>
                    <AbstractText>{detail.abstract}</AbstractText>
                  </AbstractBox>
                )}
                <RichContentRenderer content={detail.content} />
              </>
            )}
          </ContentCard>
          {!isEditing && (
            <KnowledgeComments
              knowledgeId={detail.id}
              comments={comments}
              loading={commentsLoading}
              error={commentsError}
              hasMore={commentsHasMore}
              onAddComment={handleAddComment}
              onLoadMore={handleLoadMoreComments}
            />
          )}
        </MainContent>
        <SidebarContainer>
          <RelatedKnowledge items={relatedItems} loading={relatedLoading} />
          <KnowledgeSidebar detail={detail} />
        </SidebarContainer>
      </BodyContainer>
    </PageContainer>
  )
})

export default KnowledgeDetailPage
