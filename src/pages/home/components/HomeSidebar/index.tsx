// src/pages/home/components/HomeSidebar/index.tsx
import { useEffect, useMemo, useState, useCallback } from 'react'
import { Input } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import type { TreeNode } from '../../../../service/home'
import home from '../../../../i18n/locales/zh-CN/home'
import mustreadIcon from '../../../../assets/icons/sidebar/mustread.svg'
import subscribeIcon from '../../../../assets/icons/sidebar/subscribe.svg'
import favoriteIcon from '../../../../assets/icons/sidebar/favorite.svg'
import readIcon from '../../../../assets/icons/sidebar/read.svg'
import arrowRightIcon from '../../../../assets/icons/sidebar/arrow-right.svg'
import folderIcon from '../../../../assets/icons/sidebar/folder.svg'
import folderOpenIcon from '../../../../assets/icons/sidebar/folder-open.svg'
import fileIcon from '../../../../assets/icons/sidebar/file.svg'
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
} from './style'

function filterTree(keyword: string, nodes: TreeNode[]): TreeNode[] {
  if (!keyword) return nodes
  const lower = keyword.toLowerCase()
  return nodes.reduce<TreeNode[]>((acc, node) => {
    const titleMatch = node.title.toLowerCase().includes(lower)
    const filteredChildren = node.children ? filterTree(keyword, node.children) : []
    if (titleMatch || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children })
    }
    return acc
  }, [])
}

interface CatalogNodeProps {
  node: TreeNode
  level: number
}

function CatalogNode({ node, level }: CatalogNodeProps) {
  const [expanded, setExpanded] = useState(level === 0)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = homeStore.selectedCatalogKey === node.key

  const handleClick = useCallback(() => {
    homeStore.setSelectedCatalogKey(node.key)
    if (hasChildren) {
      setExpanded((prev) => !prev)
    }
  }, [node.key, hasChildren])

  const isFileNode = !hasChildren

  return (
    <>
      <TreeItem level={level} selected={isSelected} onClick={handleClick}>
        {hasChildren && (
          <img
            className={`arrow-icon${expanded ? ' expanded' : ''}`}
            src={arrowRightIcon}
            alt=""
          />
        )}
        {!hasChildren && <span style={{ width: 20, flexShrink: 0 }} />}
        <img src={expanded && hasChildren ? folderOpenIcon : isFileNode ? fileIcon : folderIcon} alt="" />
        <TreeItemText>{node.title}</TreeItemText>
        {(node as TreeNode & { tag?: string }).tag && (
          <TreeItemTag>{(node as TreeNode & { tag?: string }).tag}</TreeItemTag>
        )}
      </TreeItem>
      {hasChildren && expanded && node.children!.map((child) => (
        <CatalogNode key={child.key} node={child} level={level + 1} />
      ))}
    </>
  )
}

function HomeSidebar() {
  useEffect(() => {
    knowledgeStore.loadDirectoryTree()
  }, [])

  const pushActive = homeStore.activePushTab
  const trajectoryActive = homeStore.activeTrajectoryTab
  const keyword = homeStore.catalogSearchKeyword

  const filteredTree = useMemo(
    () => filterTree(keyword, knowledgeStore.directoryTree),
    [keyword, knowledgeStore.directoryTree],
  )

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

      <CatalogSection>
        <CatalogHeader>
          <CatalogTitle>{home.sidebar.directory}</CatalogTitle>
          <ExpandBtn>
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
          {filteredTree.map((node) => (
            <CatalogNode key={node.key} node={node} level={0} />
          ))}
        </TreeList>
      </CatalogSection>
    </SidebarContainer>
  )
}

export default observer(HomeSidebar)
