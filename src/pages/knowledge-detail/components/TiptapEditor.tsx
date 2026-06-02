import { useEffect, useState, useCallback, useRef } from 'react'
import styled from '@emotion/styled'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import ImageExt from '@tiptap/extension-image'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import { Tooltip, Input, Button, Popover, message } from 'antd'
import { uploadImage } from '../../../service/upload'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  CodeOutlined,
  LinkOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  MinusOutlined,
  UndoOutlined,
  RedoOutlined,
  FontSizeOutlined,
} from '@ant-design/icons'

const EditorWrapper = styled.div`
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: visible;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #4a90d9;
    box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.1);
  }
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding: 6px 10px;
  background: #fafafa;
  border-bottom: 1px solid #d9d9d9;
  position: sticky;
  top: 0;
  z-index: 10;
`

const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

const ToolbarSeparator = styled.div`
  width: 1px;
  height: 20px;
  background: #d9d9d9;
  margin: 0 6px;
`

const ToolbarSpacer = styled.div`
  flex: 1;
`

const ToolButton = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  background: ${(p) => (p.active ? '#4a90d9' : 'transparent')};
  color: ${(p) => (p.active ? '#fff' : '#595959')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${(p) => (p.active ? '#3a7bc8' : '#e6e6e6')};
    color: ${(p) => (p.active ? '#fff' : '#262626')};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const HeadingButton = styled(ToolButton)<{ level: number }>`
  font-size: ${(p) => (p.level === 1 ? 13 : p.level === 2 ? 12 : 11)}px;
  font-weight: 700;
  width: auto;
  padding: 0 5px;
  min-width: 30px;
`

const WordCount = styled.span`
  font-size: 12px;
  color: #8c8c8c;
  user-select: none;
  white-space: nowrap;
`

const ContentArea = styled.div`
  .tiptap-content {
    padding: 20px 24px;
    min-height: 400px;
    font-size: 15px;
    line-height: 28px;
    color: #262626;
    outline: none;
    display: flex;
    flex-direction: column;

    .ProseMirror {
      flex: 1;
      min-height: 400px;
      outline: none;

      &:focus {
        outline: none;
      }
    }

    p {
      margin: 0 0 8px;

      &.is-editor-empty:first-of-type::after {
        content: attr(data-placeholder);
        color: #bfbfbf;
        pointer-events: none;
        float: inline-start;
        height: 0;
      }
    }

    h1 { font-size: 26px; font-weight: 700; margin: 24px 0 12px; line-height: 1.3; }
    h2 { font-size: 22px; font-weight: 600; margin: 20px 0 10px; line-height: 1.35; }
    h3 { font-size: 18px; font-weight: 600; margin: 16px 0 8px; line-height: 1.4; }

    blockquote {
      border-left: 3px solid #d9d9d9;
      padding-left: 16px;
      margin: 12px 0;
      color: #8c8c8c;
    }

    ul, ol { padding-left: 24px; margin: 8px 0; }
    li { margin-bottom: 4px; }

    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.9em;
    }

    pre {
      background: #1e1e1e;
      padding: 16px 20px;
      border-radius: 8px;
      overflow-x: auto;

      code { background: none; padding: 0; color: #d4d4d4; font-size: 13px; }
    }

    hr { border: none; border-top: 1px solid #e8e8e8; margin: 24px 0; }

    img {
      max-width: 100%;
      border-radius: 8px;
      margin: 12px 0;
    }

    a {
      color: #4a90d9;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

const BubbleContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
  transform: translate(-50%, -100%);
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  z-index: 100;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #1e1e1e;
  }
`

const BubbleButton = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: ${(p) => (p.active ? 'rgba(74, 144, 217, 0.3)' : 'transparent')};
  color: ${(p) => (p.active ? '#fff' : '#bfbfbf')};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.12s;

  &:hover {
    background: ${(p) => (p.active ? 'rgba(74, 144, 217, 0.4)' : 'rgba(255,255,255,0.1)')};
    color: #fff;
  }
`

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number } | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)
  const uploadingRef = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: '请输入知识内容...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      ImageExt.configure({
        allowBase64: true,
      }),
      CharacterCount,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'prose-mirror-full',
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      setWordCount(editor.storage.characterCount?.characters?.() ?? editor.getText().length)
    },
    onCreate: ({ editor }) => {
      setWordCount(editor.storage.characterCount?.characters?.() ?? 0)
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Bubble menu position tracking
  const bubblePosRef = useRef<{ x: number; y: number } | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!editor) return
    const updateBubble = () => {
      const { from, to, empty } = editor.state.selection
      if (empty || from === to) {
        bubblePosRef.current = null
        setBubblePos(null)
        return
      }
      const wrapperRect = editorRef.current?.getBoundingClientRect()
      if (!wrapperRect) return
      try {
        const start = editor.view.coordsAtPos(from)
        const end = editor.view.coordsAtPos(to)
        const x = Math.round((start.left + end.right) / 2 - wrapperRect.left)
        const y = Math.round(start.top - wrapperRect.top - 10)
        if (
          bubblePosRef.current &&
          bubblePosRef.current.x === x &&
          bubblePosRef.current.y === y
        ) return
        bubblePosRef.current = { x, y }
        setBubblePos({ x, y })
      } catch {
        bubblePosRef.current = null
        setBubblePos(null)
      }
    }

    const handleMouseUp = () => {
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(updateBubble, 50)
    }

    const handleSelectionChange = () => {
      if (!editor.view.hasFocus()) {
        bubblePosRef.current = null
        setBubblePos(null)
      }
    }

    const dom = editor.view.dom
    dom.addEventListener('mouseup', handleMouseUp)
    dom.addEventListener('keyup', handleMouseUp as EventListener)
    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      dom.removeEventListener('mouseup', handleMouseUp)
      dom.removeEventListener('keyup', handleMouseUp as EventListener)
      document.removeEventListener('selectionchange', handleSelectionChange)
      clearTimeout(debounceRef.current)
    }
  }, [editor])

  // Focus the editor when clicking anywhere in the content area (even empty space)
  useEffect(() => {
    if (!editor) return
    const dom = editor.view.dom
    const handleMouseDown = () => {
      if (!editor.view.hasFocus()) {
        editor.view.focus()
      }
    }
    dom.addEventListener('mousedown', handleMouseDown, true)
    return () => dom.removeEventListener('mousedown', handleMouseDown, true)
  }, [editor])

  // Image paste handler
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (!editor || uploadingRef.current) return
      const items = e.clipboardData.items
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          if (!file) continue
          uploadingRef.current = true
          uploadImage(file)
            .then((res) => {
              editor.chain().focus().setImage({ src: res.url }).run()
            })
            .catch(() => {
              message.error('图片上传失败')
            })
            .finally(() => {
              uploadingRef.current = false
            })
          return
        }
      }
    },
    [editor],
  )

  // Image drop handler
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (!editor || uploadingRef.current) return
      const files = e.dataTransfer.files
      if (files.length === 0) return
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          e.preventDefault()
          const coords = editor.view.posAtCoords({ left: e.clientX, top: e.clientY })
          const pos: number = coords && 'from' in coords ? (coords as { from: number }).from : editor.state.selection.to
          uploadingRef.current = true
          uploadImage(file)
            .then((res) => {
              editor.chain().focus().setTextSelection(pos).setImage({ src: res.url }).run()
            })
            .catch(() => {
              message.error('图片上传失败')
            })
            .finally(() => {
              uploadingRef.current = false
            })
          return
        }
      }
    },
    [editor],
  )

  // Image upload via file picker
  const handleImageUpload = useCallback(() => {
    if (!editor || uploadingRef.current) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file || !editor) return
      uploadingRef.current = true
      uploadImage(file)
        .then((res) => {
          editor.chain().focus().setImage({ src: res.url }).run()
        })
        .catch(() => {
          message.error('图片上传失败')
        })
        .finally(() => {
          uploadingRef.current = false
        })
    }
    input.click()
  }, [editor])

  // Link insertion
  const handleSetLink = useCallback(() => {
    if (!editor) return
    const url = linkUrl.trim()
    if (!url) {
      editor.chain().focus().unsetLink().run()
      setLinkPopoverOpen(false)
      setLinkUrl('')
      return
    }
    const href = /^(https?:\/\/|mailto:|tel:)/i.test(url) ? url : `https://${url}`
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setLinkPopoverOpen(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const openLinkPopover = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href || ''
    setLinkUrl(prev)
    setLinkPopoverOpen(true)
  }, [editor])

  if (!editor) {
    return null
  }

  const TOOLTIP_ITEMS = [
    { key: 'bold', icon: <BoldOutlined />, label: '加粗', shortcut: 'Ctrl+B', action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    { key: 'italic', icon: <ItalicOutlined />, label: '斜体', shortcut: 'Ctrl+I', action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic') },
    { key: 'underline', icon: <UnderlineOutlined />, label: '下划线', shortcut: 'Ctrl+U', action: () => editor.chain().focus().toggleUnderline().run(), isActive: () => editor.isActive('underline') },
    { key: 'strike', icon: <StrikethroughOutlined />, label: '删除线', shortcut: '', action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike') },
    { key: 'code', icon: <CodeOutlined />, label: '行内代码', shortcut: 'Ctrl+E', action: () => editor.chain().focus().toggleCode().run(), isActive: () => editor.isActive('code') },
    { key: 'link', icon: <LinkOutlined />, label: '插入链接', shortcut: '', action: openLinkPopover, isActive: () => editor.isActive('link') },
    { key: 'image', icon: <PictureOutlined />, label: '插入图片', shortcut: '', action: handleImageUpload, isActive: () => false },
    { key: 'bulletList', icon: <UnorderedListOutlined />, label: '无序列表', shortcut: '', action: () => editor.chain().focus().toggleBulletList().run(), isActive: () => editor.isActive('bulletList') },
    { key: 'orderedList', icon: <OrderedListOutlined />, label: '有序列表', shortcut: '', action: () => editor.chain().focus().toggleOrderedList().run(), isActive: () => editor.isActive('orderedList') },
    { key: 'blockquote', icon: <FontSizeOutlined style={{ transform: 'rotate(180deg)' }} />, label: '引用块', shortcut: '', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: () => editor.isActive('blockquote') },
    { key: 'hr', icon: <MinusOutlined />, label: '分割线', shortcut: '', action: () => editor.chain().focus().setHorizontalRule().run(), isActive: () => false },
    { key: 'undo', icon: <UndoOutlined />, label: '撤销', shortcut: 'Ctrl+Z', action: () => editor.chain().focus().undo().run(), isActive: () => false, disabled: !editor.can().undo() },
    { key: 'redo', icon: <RedoOutlined />, label: '重做', shortcut: 'Ctrl+Y', action: () => editor.chain().focus().redo().run(), isActive: () => false, disabled: !editor.can().redo() },
  ]

  const BUBBLE_ITEMS = [
    { key: 'bold', icon: <BoldOutlined />, label: '加粗', action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold') },
    { key: 'italic', icon: <ItalicOutlined />, label: '斜体', action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic') },
    { key: 'underline', icon: <UnderlineOutlined />, label: '下划线', action: () => editor.chain().focus().toggleUnderline().run(), isActive: () => editor.isActive('underline') },
    { key: 'strike', icon: <StrikethroughOutlined />, label: '删除线', action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike') },
    { key: 'code', icon: <CodeOutlined />, label: '行内代码', action: () => editor.chain().focus().toggleCode().run(), isActive: () => editor.isActive('code') },
    { key: 'link', icon: <LinkOutlined />, label: '链接', action: openLinkPopover, isActive: () => editor.isActive('link') },
  ]

  const headingGroups = ([1, 2, 3] as const).map((level) => ({
    level: level as 1 | 2 | 3,
    action: () => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: () => editor.isActive('heading', { level }),
  }))

  return (
    <EditorWrapper
      ref={editorRef}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Floating bubble menu on text selection */}
      {bubblePos && (
        <BubbleContainer x={bubblePos.x} y={bubblePos.y}>
          {BUBBLE_ITEMS.map((item) => (
            <Tooltip key={item.key} title={item.label} placement="top" mouseLeaveDelay={0}>
              <BubbleButton
                type="button"
                active={item.isActive()}
                onMouseDown={(e) => {
                  e.preventDefault()
                  item.action()
                }}
              >
                {item.icon}
              </BubbleButton>
            </Tooltip>
          ))}
        </BubbleContainer>
      )}

      {/* Main toolbar */}
      <Toolbar>
        <ToolbarGroup>
          {headingGroups.map((h) => (
            <Tooltip key={`h${h.level}`} title={`标题 ${h.level}`} placement="top" mouseLeaveDelay={0}>
              <HeadingButton
                type="button"
                level={h.level}
                active={h.isActive()}
                onClick={h.action}
              >
                H{h.level}
              </HeadingButton>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {TOOLTIP_ITEMS.filter((i) => ['bold', 'italic', 'underline', 'strike', 'code'].includes(i.key)).map((item) => (
            <Tooltip key={item.key} title={`${item.label}${item.shortcut ? ` (${item.shortcut})` : ''}`} placement="top" mouseLeaveDelay={0}>
              <ToolButton
                type="button"
                active={item.isActive()}
                onClick={item.action}
              >
                {item.icon}
              </ToolButton>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {TOOLTIP_ITEMS.filter((i) => ['link', 'image'].includes(i.key)).map((item) => (
            <Tooltip key={item.key} title={item.label} placement="top" mouseLeaveDelay={0}>
              <ToolButton
                type="button"
                active={item.isActive()}
                onClick={item.action}
              >
                {item.icon}
              </ToolButton>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {TOOLTIP_ITEMS.filter((i) => ['bulletList', 'orderedList', 'blockquote', 'hr'].includes(i.key)).map((item) => (
            <Tooltip key={item.key} title={item.label} placement="top" mouseLeaveDelay={0}>
              <ToolButton
                type="button"
                active={item.isActive()}
                onClick={item.action}
              >
                {item.icon}
              </ToolButton>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSpacer />

        <ToolbarGroup>
          {TOOLTIP_ITEMS.filter((i) => ['undo', 'redo'].includes(i.key)).map((item) => (
            <Tooltip key={item.key} title={`${item.label}${item.shortcut ? ` (${item.shortcut})` : ''}`} placement="top" mouseLeaveDelay={0}>
              <ToolButton
                type="button"
                disabled={item.disabled}
                onClick={item.action}
              >
                {item.icon}
              </ToolButton>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <WordCount>{wordCount} 字</WordCount>
      </Toolbar>

      {/* Link popover */}
      <Popover
        content={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Input
              size="small"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="输入链接地址..."
              onPressEnter={handleSetLink}
              style={{ width: 240 }}
            />
            <Button size="small" type="primary" onClick={handleSetLink}>确定</Button>
            {editor.isActive('link') && (
              <Button
                size="small"
                danger
                onClick={() => {
                  editor.chain().focus().unsetLink().run()
                  setLinkPopoverOpen(false)
                  setLinkUrl('')
                }}
              >
                移除
              </Button>
            )}
          </div>
        }
        title="插入链接"
        trigger="click"
        open={linkPopoverOpen}
        onOpenChange={setLinkPopoverOpen}
      >
        <span style={{ display: 'none' }} />
      </Popover>

      {/* Editor content */}
      <ContentArea onPaste={handlePaste}>
        <EditorContent editor={editor} className="tiptap-content" />
      </ContentArea>
    </EditorWrapper>
  )
}

export default TiptapEditor
