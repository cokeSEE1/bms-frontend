import { ContentWrapper, EmptyContent } from '../style'

interface RichContentRendererProps {
  content: string | null
}

const RichContentRenderer = ({ content }: RichContentRendererProps) => {
  if (!content) {
    return <EmptyContent>暂无内容</EmptyContent>
  }

  return (
    <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default RichContentRenderer
