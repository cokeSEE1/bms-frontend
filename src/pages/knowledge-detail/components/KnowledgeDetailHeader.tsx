import { Breadcrumb, Button, Modal, message } from 'antd'
import {
  StarOutlined,
  StarFilled,
  ShareAltOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { knowledgeDetailStore } from '../../../stores/knowledgeDetailStore'
import { HeaderContainer, BreadcrumbWrapper, TitleRow, Title, ActionButtons } from '../style'
import i18n from '../../../i18n/locales/zh-CN/knowledgeDetail'
import type { KnowledgeDetail } from '../../../service/knowledge'

interface KnowledgeDetailHeaderProps {
  detail: KnowledgeDetail
}

const KnowledgeDetailHeader = observer(({ detail }: KnowledgeDetailHeaderProps) => {
  const navigate = useNavigate()
  const {
    isFavorited,
    isLiked,
    displayFavoriteCount,
    displayLikeCount,
    displayShareNum,
  } = knowledgeDetailStore

  const breadcrumbItems = [
    { title: i18n.backHome, href: '/dashboard' },
    ...detail.knowledgePath.map((node) => ({
      title: node.dirName,
      href: `/dashboard/directory/${node.dirId}`,
    })),
    { title: detail.name },
  ]

  const handleFavorite = () => {
    knowledgeDetailStore.toggleFavorite()
    if (knowledgeDetailStore.isFavorited) {
      message.success(i18n.star)
    } else {
      message.info(i18n.unstar)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      message.success(i18n.shareSuccess)
      knowledgeDetailStore.incrementShare()
    })
  }

  const handleLike = () => {
    knowledgeDetailStore.toggleLike()
  }

  const handleDelete = () => {
    Modal.confirm({
      title: i18n.delete,
      content: i18n.deleteConfirm,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await knowledgeDetailStore.deleteKnowledge(detail.id)
          message.success(i18n.deleteSuccess)
          navigate('/dashboard')
        } catch {
          message.error(i18n.deleteFailed)
        }
      },
    })
  }

  return (
    <HeaderContainer>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumbItems} />
      </BreadcrumbWrapper>
      <TitleRow>
        <Title>{detail.name}</Title>
        <ActionButtons>
          <Button
            icon={isLiked ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
            type="text"
            onClick={handleLike}
          >
            {displayLikeCount > 0 ? displayLikeCount : i18n.likes}
          </Button>
          <Button
            icon={isFavorited ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
            type="text"
            onClick={handleFavorite}
          >
            {displayFavoriteCount > 0 ? displayFavoriteCount : i18n.star}
          </Button>
          <Button
            icon={<ShareAltOutlined />}
            type="text"
            onClick={handleShare}
          >
            {displayShareNum > 0 ? displayShareNum : i18n.share}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="text"
            danger
            onClick={handleDelete}
          />
        </ActionButtons>
      </TitleRow>
    </HeaderContainer>
  )
})

export default KnowledgeDetailHeader
