// src/pages/home/components/HomeSidebar/index.tsx
import { useEffect, useState, useCallback, useRef } from 'react'
import { Input, Modal, Form, Dropdown, App } from 'antd'
import type { MenuProps } from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore, MAX_TREE_LEVEL } from '../../../../stores/knowledgeStore'
import type { TreeNode, DirectoryFavoriteItem } from '../../../../service/home'
import { getDirectoryFavoriteList } from '../../../../service/home'
import home from '../../../../i18n/locales/zh-CN/home'
import mustreadIcon from '../../../../assets/icons/sidebar/mustread.svg'
import subscribeIcon from '../../../../assets/icons/sidebar/subscribe.svg'
import favoriteIcon from '../../../../assets/icons/sidebar/favorite.svg'
import readIcon from '../../../../assets/icons/sidebar/read.svg'
import arrowRightIcon from '../../../../assets/icons/sidebar/arrow-right.svg'
import folderIcon from '../../../../assets/icons/sidebar/folder.svg'
import folderOpenIcon from '../../../../assets/icons/sidebar/folder-open.svg'
import {
  SidebarContainer,
  ActionSection,
  TabCard,
  TabCardTitle,
  TabCardRow,
  IconItem,
  IconLabel,
  CatalogSection,
  CatalogHeader,
  CatalogTitle,
  ExpandBtn,
  SearchWrapper,
  TreeList,
  TreeItem,
  TreeItemText,
  TreeItemTag,
  TreeItemActions,
  TreeItemActionBtn,
  FavoriteSection,
  FavHeader,
  FavTitle,
  FavToggle,
  FavContent,
  FavItem,
  FavItemIcon,
  FavItemName,
  FavItemCount,
  FavEmpty,
} from './style'

interface TreeNodeDialogProps {
  visible: boolean
  value: string
  onClose: () => void
  onSubmit: (value: string) => void
}

const TreeNodeDialog = ({ visible, value, onClose, onSubmit }: TreeNodeDialogProps) => {
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const { name } = await form.validateFields()
      onSubmit(name)
    } catch {
      // validation failed
    }
  }

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ name: value })
    }
  }, [form, value, visible])

  return (
    <Modal
      title={value ? home.sidebar.renameFolder : home.sidebar.addFolder}
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      destroyOnHidden
    >
      <Form form={form}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: value ? home.sidebar.renameFolderPlaceholder : home.sidebar.addFolderPlaceholder }]}
        >
          <Input
            maxLength={100}
            placeholder={value ? home.sidebar.renameFolderPlaceholder : home.sidebar.addFolderPlaceholder}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

interface CatalogNodeProps {
  node: TreeNode
  level: number
  expandedKeys: string[]
  dragOverKey: string | null
  dropPosition: 'before' | 'inside' | 'after' | null
  onToggleExpand: (key: string) => void
  onDragStart: (key: string) => void
  onDragOver: (e: React.DragEvent, key: string) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent, targetKey: string) => void
  onAdd: (parentId: string) => void
  onRename: (id: string, currentTitle: string) => void
  onDelete: (id: string, title: string) => void
  navigate: (path: string) => void
}

const CatalogNode = ({
  node,
  level,
  expandedKeys,
  dragOverKey,
  dropPosition,
  onToggleExpand,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onAdd,
  onRename,
  onDelete,
  navigate,
}: CatalogNodeProps) => {
  const expanded = expandedKeys.includes(node.key)
  const [hovering, setHovering] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = homeStore.selectedCatalogKey === node.key
  const canAddChild = level < MAX_TREE_LEVEL

  const handleClick = useCallback(() => {
    homeStore.setSelectedCatalogKey(node.key)
    if (hasChildren) {
      onToggleExpand(node.key)
    }
    navigate(`/dashboard/directory/${node.key}`)
  }, [node.key, hasChildren, onToggleExpand, navigate])

  const moreMenuItems: MenuProps['items'] = [
    {
      key: 'rename',
      icon: <EditOutlined />,
      label: home.sidebar.renameFolder,
      onClick: () => onRename(node.key, node.title),
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: home.sidebar.deleteFolder,
      danger: true,
      onClick: () => onDelete(node.key, node.title),
    },
  ]

  return (
    <>
      <TreeItem
        level={level}
        selected={isSelected}
        isDropTarget={dragOverKey === node.key}
        dropPosition={dragOverKey === node.key ? dropPosition : null}
        draggable
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = 'move'
          onDragStart(node.key)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          onDragOver(e, node.key)
        }}
        onDragLeave={onDragLeave}
        onDrop={(e) => {
          e.preventDefault()
          onDrop(e, node.key)
        }}
      >
        {hasChildren ? (
          <img
            className={`arrow-icon${expanded ? ' expanded' : ''}`}
            src={arrowRightIcon}
            alt=""
          />
        ) : (
          <span style={{ width: 20, flexShrink: 0 }} />
        )}
        <img src={expanded && hasChildren ? folderOpenIcon : folderIcon} alt="" />
        <TreeItemText>{node.title}</TreeItemText>
        {node.tag && <TreeItemTag>{node.tag}</TreeItemTag>}
        {hovering && (
          <TreeItemActions>
            {canAddChild && (
              <TreeItemActionBtn
                onClick={(e) => {
                  e.stopPropagation()
                  onAdd(node.key)
                }}
              >
                <PlusOutlined />
              </TreeItemActionBtn>
            )}
            <Dropdown menu={{ items: moreMenuItems }} trigger={['click']} placement="bottomRight">
              <TreeItemActionBtn onClick={(e) => e.stopPropagation()}>
                <MoreOutlined />
              </TreeItemActionBtn>
            </Dropdown>
          </TreeItemActions>
        )}
      </TreeItem>
      {hasChildren && expanded && node.children!.map((child) => (
        <CatalogNode
          key={child.key}
          node={child}
          level={level + 1}
          expandedKeys={expandedKeys}
          dragOverKey={dragOverKey}
          dropPosition={dropPosition}
          onToggleExpand={onToggleExpand}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onAdd={onAdd}
          onRename={onRename}
          onDelete={onDelete}
          navigate={navigate}
        />
      ))}
    </>
  )
}

function HomeSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const { message, modal } = App.useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogValue, setDialogValue] = useState('')
  const [dialogTargetId, setDialogTargetId] = useState('')
  const [dialogMode, setDialogMode] = useState<'create' | 'rename'>('create')
  const [dragKey, setDragKey] = useState<string | null>(null)
  const [dragOverKey, setDragOverKey] = useState<string | null>(null)
  const [dropPosition, setDropPosition] = useState<'before' | 'inside' | 'after' | null>(null)
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [favCollapsed, setFavCollapsed] = useState(true)
  const [favoriteDirectories, setFavoriteDirectories] = useState<DirectoryFavoriteItem[]>([])

  useEffect(() => {
    knowledgeStore.loadDirectoryTree()
  }, [])

  useEffect(() => {
    if (expandedKeys.length === 0 && knowledgeStore.directoryTree.length > 0) {
      setExpandedKeys(knowledgeStore.directoryTree.map((n) => n.key))
    }
  }, [knowledgeStore.directoryTree, expandedKeys.length])

  useEffect(() => {
    getDirectoryFavoriteList().then((res) => {
      setFavoriteDirectories(res.items)
    })
  }, [])

  useEffect(() => {
    const match = location.pathname.match(/^\/dashboard\/directory\/(\d+)$/)
    if (match) {
      homeStore.setSelectedCatalogKey(match[1])
    }
  }, [location.pathname])

  const handleToggleExpand = useCallback((key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }, [])

  const pushActive = homeStore.activePushTab
  const trajectoryActive = homeStore.activeTrajectoryTab
  const keyword = homeStore.catalogSearchKeyword

  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!keyword.trim()) {
      knowledgeStore.clearDirectorySearch()
      return
    }
    debounceRef.current = setTimeout(() => {
      knowledgeStore.searchDirectory(keyword)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [keyword])

  const onDialogClose = () => {
    setDialogVisible(false)
    setDialogValue('')
    setDialogTargetId('')
  }

  const onDialogSubmit = async (value: string) => {
    onDialogClose()
    try {
      if (dialogMode === 'create') {
        await knowledgeStore.addNode(Number(dialogTargetId), value)
        message.success(home.sidebar.createSuccess)
        if (!expandedKeys.includes(dialogTargetId)) {
          setExpandedKeys([...expandedKeys, dialogTargetId])
        }
      } else {
        await knowledgeStore.renameNode(Number(dialogTargetId), value)
        message.success(home.sidebar.renameSuccess)
      }
    } catch {
      // error handled by store
    }
  }

  const onAdd = (parentId: string) => {
    setDialogMode('create')
    setDialogTargetId(parentId)
    setDialogValue('')
    setDialogVisible(true)
  }

  const onRename = (id: string, currentTitle: string) => {
    setDialogMode('rename')
    setDialogTargetId(id)
    setDialogValue(currentTitle)
    setDialogVisible(true)
  }

  const onDelete = (id: string, title: string) => {
    modal.confirm({
      title: home.sidebar.deleteFolder,
      content: home.sidebar.deleteConfirm.replace('{name}', title),
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await knowledgeStore.deleteNode(Number(id))
          message.success(home.sidebar.deleteSuccess)
        } catch {
          // error handled by store
        }
      },
    })
  }

  const onDragStart = (key: string) => {
    setDragKey(key)
  }

  const onDragOver = (e: React.DragEvent, key: string) => {
    if (!dragKey || dragKey === key) return
    if (knowledgeStore.isDescendantOf(dragKey, key)) return
    setDragOverKey(key)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const h = rect.height
    if (y < h / 3) setDropPosition('before')
    else if (y > (h * 2) / 3) setDropPosition('after')
    else setDropPosition('inside')
  }

  const onDragLeave = () => {
    setDragOverKey(null)
    setDropPosition(null)
  }

  const onDrop = (_e: React.DragEvent, targetKey: string) => {
    setDragOverKey(null)
    setDropPosition(null)
    setDragKey(null)
    if (!dragKey || dragKey === targetKey) return
    if (knowledgeStore.isDescendantOf(dragKey, targetKey)) return
    const position = dropPosition === 'before' ? 'left' : dropPosition === 'after' ? 'right' : 'first-child'
    knowledgeStore.moveNode(Number(dragKey), Number(targetKey), position).then(() => {
      message.success(home.sidebar.moveSuccess)
    })
  }

  if (collapsed) return null

  return (
    <SidebarContainer>
      <ActionSection>
        <TabCard>
          <TabCardTitle>{home.sidebar.knowledgePush}</TabCardTitle>
          <TabCardRow>
            <IconItem active={pushActive === 'mustread'} onClick={() => homeStore.setActivePushTab('mustread')}>
              <img src={mustreadIcon} alt="" />
              <IconLabel>{home.sidebar.mustRead}</IconLabel>
            </IconItem>
            <IconItem active={pushActive === 'subscribe'} onClick={() => homeStore.setActivePushTab('subscribe')}>
              <img src={subscribeIcon} alt="" />
              <IconLabel>{home.sidebar.subscribe}</IconLabel>
            </IconItem>
          </TabCardRow>
        </TabCard>

        <TabCard>
          <TabCardTitle>{home.sidebar.knowledgeTrajectory}</TabCardTitle>
          <TabCardRow>
            <IconItem active={trajectoryActive === 'favorite'} onClick={() => homeStore.setActiveTrajectoryTab('favorite')}>
              <img src={favoriteIcon} alt="" />
              <IconLabel>{home.sidebar.favorite}</IconLabel>
            </IconItem>
            <IconItem active={trajectoryActive === 'read'} onClick={() => homeStore.setActiveTrajectoryTab('read')}>
              <img src={readIcon} alt="" />
              <IconLabel>{home.sidebar.read}</IconLabel>
            </IconItem>
          </TabCardRow>
        </TabCard>
      </ActionSection>

      <FavoriteSection>
        <FavHeader>
          <FavTitle>{home.sidebar.favoriteDirectories}</FavTitle>
          {favoriteDirectories.length > 6 && (
            <FavToggle onClick={() => setFavCollapsed(!favCollapsed)}>
              {favCollapsed ? home.sidebar.expand : home.sidebar.collapse}
            </FavToggle>
          )}
        </FavHeader>
        {favoriteDirectories.length > 0 ? (
          <FavContent collapsed={favCollapsed}>
            {favoriteDirectories
              .slice(0, favCollapsed ? 6 : favoriteDirectories.length)
              .map((dir) => {
                const isSelected = homeStore.selectedCatalogKey === String(dir.cate_id)
                return (
                  <FavItem
                    key={dir.id}
                    selected={isSelected}
                    onClick={() => {
                      homeStore.setSelectedCatalogKey(String(dir.cate_id))
                      navigate(`/dashboard/directory/${dir.cate_id}`)
                    }}
                  >
                    <FavItemIcon>
                      <StarFilled />
                    </FavItemIcon>
                    <FavItemName selected={isSelected} title={dir.cate_name}>
                      {dir.cate_name}
                    </FavItemName>
                    <FavItemCount>{dir.count} 条内容</FavItemCount>
                  </FavItem>
                )
              })}
          </FavContent>
        ) : (
          <FavEmpty>{home.sidebar.favoriteEmpty}</FavEmpty>
        )}
      </FavoriteSection>

      <CatalogSection>
        <CatalogHeader>
          <CatalogTitle>{home.sidebar.directory}</CatalogTitle>
          <ExpandBtn onClick={() => onAdd(knowledgeStore.rootId || '0')}>
            <PlusOutlined style={{ fontSize: 16, color: '#5B6275' }} />
          </ExpandBtn>
        </CatalogHeader>

        <SearchWrapper>
          <Input
            prefix={<SearchOutlined />}
            placeholder={home.sidebar.searchCatalog}
            value={keyword}
            onChange={(e) => homeStore.setCatalogSearchKeyword(e.target.value)}
            variant="borderless"
          />
        </SearchWrapper>

        <TreeList>
          {keyword.trim()
            ? knowledgeStore.directorySearchResults.map((item) => (
                <TreeItem
                  key={item.id}
                  level={0}
                  selected={homeStore.selectedCatalogKey === String(item.id)}
                  onClick={() => {
                    homeStore.setSelectedCatalogKey(String(item.id))
                    homeStore.setCatalogSearchKeyword('')
                    knowledgeStore.clearDirectorySearch()
                    navigate(`/dashboard/directory/${item.id}`)
                  }}
                >
                  <img src={folderIcon} alt="" />
                  <TreeItemText>{item.dir_name}</TreeItemText>
                  {item.dir_type === 1 && <TreeItemTag>分组</TreeItemTag>}
                </TreeItem>
              ))
            : knowledgeStore.directoryTree.map((node) => (
                <CatalogNode
                  key={node.key}
                  node={node}
                  level={0}
                  expandedKeys={expandedKeys}
                  dragOverKey={dragOverKey}
                  dropPosition={dropPosition}
                  onToggleExpand={handleToggleExpand}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onAdd={onAdd}
                  onRename={onRename}
                  onDelete={onDelete}
                  navigate={navigate}
                />
              ))}
        </TreeList>
      </CatalogSection>

      <TreeNodeDialog
        visible={dialogVisible}
        value={dialogValue}
        onClose={onDialogClose}
        onSubmit={onDialogSubmit}
      />
    </SidebarContainer>
  )
}

export default observer(HomeSidebar)
