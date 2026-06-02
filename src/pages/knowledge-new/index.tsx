import { useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { Input, Button, Breadcrumb, message } from 'antd'
import { knowledgeEditStore } from '../../stores/knowledgeEditStore'
import TiptapEditor from '../knowledge-detail/components/TiptapEditor'
import {
  PageContainer,
  TopBar,
  TopBarLeft,
  TopBarRight,
  BackButton,
  TopBarTitle,
  BodyContainer,
  FormCard,
  FormItem,
  FormLabel,
  ContentEditorWrapper,
  FormActions,
} from './style'

const KnowledgeNewPage = observer(() => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { title, content, abstract, author, loading, editId, submitted } = knowledgeEditStore

  useEffect(() => {
    knowledgeEditStore.reset()
    const cateId = searchParams.get('cateId')
    if (cateId) {
      knowledgeEditStore.setCateId(Number(cateId))
    }
  }, [])

  useEffect(() => {
    if (submitted && editId !== null) {
      message.success('知识创建成功')
      navigate(`/knowledge/${editId}`)
    }
  }, [submitted, editId, navigate])

  const handleSaveDraft = useCallback(() => {
    knowledgeEditStore.status = 1
    knowledgeEditStore.submit()
  }, [])

  const handlePublish = useCallback(() => {
    knowledgeEditStore.status = 3
    knowledgeEditStore.submit()
  }, [])

  return (
    <PageContainer>
      <TopBar>
        <TopBarLeft>
          <BackButton onClick={() => navigate('/dashboard')}>
            <ArrowLeftOutlined />
            返回
          </BackButton>
          <TopBarTitle>创建知识</TopBarTitle>
        </TopBarLeft>
        <TopBarRight>
          <Button
            icon={<HomeOutlined />}
            type="text"
            onClick={() => navigate('/dashboard')}
          />
        </TopBarRight>
      </TopBar>
      <BodyContainer>
        <FormCard>
          <Breadcrumb
            items={[
              { title: <><HomeOutlined /> 返回首页</>, path: '/dashboard' },
              { title: '创建知识' },
            ]}
            style={{ marginBottom: 24 }}
          />
          <FormItem>
            <FormLabel>
              <span className="required">标题</span>
            </FormLabel>
            <Input
              value={title}
              onChange={(e) => knowledgeEditStore.setTitle(e.target.value)}
              placeholder="请输入知识标题"
              maxLength={255}
            />
          </FormItem>
          <FormItem>
            <FormLabel>作者</FormLabel>
            <Input
              value={author}
              onChange={(e) => knowledgeEditStore.setAuthor(e.target.value)}
              placeholder="请输入作者"
            />
          </FormItem>
          <FormItem>
            <FormLabel>摘要</FormLabel>
            <Input.TextArea
              value={abstract}
              onChange={(e) => knowledgeEditStore.setAbstract(e.target.value)}
              placeholder="请输入知识摘要"
              rows={3}
              maxLength={500}
            />
          </FormItem>
          <FormItem>
            <FormLabel>
              <span className="required">内容</span>
            </FormLabel>
            <ContentEditorWrapper>
              <TiptapEditor
                content={content}
                onChange={(html) => knowledgeEditStore.setContent(html)}
              />
            </ContentEditorWrapper>
          </FormItem>
          <FormActions>
            <Button onClick={() => navigate('/dashboard')}>取消</Button>
            <Button onClick={handleSaveDraft} loading={loading}>
              保存草稿
            </Button>
            <Button
              type="primary"
              onClick={handlePublish}
              loading={loading}
              disabled={!title.trim()}
            >
              发布
            </Button>
          </FormActions>
        </FormCard>
      </BodyContainer>
    </PageContainer>
  )
})

export default KnowledgeNewPage
