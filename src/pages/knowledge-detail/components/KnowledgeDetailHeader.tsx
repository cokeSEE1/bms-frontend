import { Breadcrumb, Button } from 'antd'
import { StarOutlined, DownloadOutlined } from '@ant-design/icons'
import { HeaderContainer, BreadcrumbWrapper, TitleRow, Title, ActionButtons } from '../style'
import type { KnowledgeDetail } from '../../../service/knowledge'

interface KnowledgeDetailHeaderProps {
  detail: KnowledgeDetail
}

const KnowledgeDetailHeader = ({ detail }: KnowledgeDetailHeaderProps) => {
  const breadcrumbItems = [
    { title: '首页', href: '/dashboard' },
    ...detail.knowledgePath.map((node) => ({
      title: node.dirName,
      href: `/dashboard/directory/${node.dirId}`,
    })),
    { title: detail.name },
  ]

  return (
    <HeaderContainer>
      <BreadcrumbWrapper>
        <Breadcrumb items={breadcrumbItems} />
      </BreadcrumbWrapper>
      <TitleRow>
        <Title>{detail.name}</Title>
        <ActionButtons>
          <Button icon={<StarOutlined />} type="text">
            收藏
          </Button>
          {detail.isDownload && (
            <Button icon={<DownloadOutlined />} type="text">
              下载
            </Button>
          )}
        </ActionButtons>
      </TitleRow>
    </HeaderContainer>
  )
}

export default KnowledgeDetailHeader
