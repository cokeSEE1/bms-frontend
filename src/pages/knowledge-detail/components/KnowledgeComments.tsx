import { useState, useCallback } from 'react'
import { Input, Button, Skeleton, message } from 'antd'
import type { CommentItem } from '../../../stores/knowledgeDetailStore'
import i18n from '../../../i18n/locales/zh-CN/knowledgeDetail'
import {
  CommentsSection,
  CommentsTitle,
  CommentInputWrapper,
  CommentItem as CommentItemStyled,
  CommentHeader,
  CommentAuthor,
  CommentTime,
  CommentBody,
  CommentsEmpty,
} from '../style'

const { TextArea } = Input

interface KnowledgeCommentsProps {
  knowledgeId: number
  comments: CommentItem[]
  loading: boolean
  error: string | null
  hasMore: boolean
  onAddComment: (content: string) => Promise<void>
  onLoadMore: () => void
}

const KnowledgeComments = ({
  comments,
  loading,
  error,
  hasMore,
  onAddComment,
  onLoadMore,
}: KnowledgeCommentsProps) => {
  const [inputValue, setInputValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setSubmitting(true)
    try {
      await onAddComment(trimmed)
      setInputValue('')
      message.success(i18n.commentSuccess)
    } catch {
      message.error('评论发送失败')
    } finally {
      setSubmitting(false)
    }
  }, [inputValue, onAddComment])

  const commentCount = comments.length

  return (
    <CommentsSection>
      <CommentsTitle>
        {i18n.comments}{commentCount > 0 ? ` (${commentCount})` : ''}
      </CommentsTitle>

      <CommentInputWrapper>
        <TextArea
          rows={3}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={i18n.commentPlaceholder}
          maxLength={500}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={submitting}
          disabled={!inputValue.trim()}
          style={{ marginTop: 8 }}
        >
          {i18n.publishComment}
        </Button>
      </CommentInputWrapper>

      {loading && comments.length === 0 && <Skeleton active paragraph={{ rows: 3 }} />}

      {error && comments.length === 0 && <CommentsEmpty>{i18n.commentsFailed}</CommentsEmpty>}

      {!loading && !error && comments.length === 0 && (
        <CommentsEmpty>{i18n.commentsEmpty}</CommentsEmpty>
      )}

      {comments.map((comment) => (
        <CommentItemStyled key={comment.id}>
          <CommentHeader>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentTime>{comment.createdAt}</CommentTime>
          </CommentHeader>
          <CommentBody>{comment.content}</CommentBody>
        </CommentItemStyled>
      ))}

      {hasMore && comments.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button loading={loading} onClick={onLoadMore}>
            加载更多
          </Button>
        </div>
      )}
    </CommentsSection>
  )
}

export default KnowledgeComments
