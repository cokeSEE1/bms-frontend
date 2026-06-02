// src/stores/knowledgeStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import {
  getDirectoryTree,
  createDirectoryNode,
  renameDirectoryNode,
  deleteDirectoryNode,
  moveDirectoryNode,
  searchDirectoryNodes,
} from '../service/home'
import type { TreeNode, MovePosition, DirectorySearchItem } from '../service/home'
import { getKnowledgeList, searchKnowledge, type KnowledgeItem } from '../service/knowledge'

const MAX_TREE_LEVEL = 5

const SORT_CONFIG: Record<string, { sortField?: string; sortOrder?: 'ascend' | 'descend' }> = {
  recommend: { sortField: 'viewCount', sortOrder: 'descend' },
  likes: { sortField: undefined, sortOrder: 'descend' },
  latest: { sortField: 'updateTime', sortOrder: 'descend' },
}

class KnowledgeStore {
  cards: KnowledgeItem[] = []
  loading = false
  sortBy: 'recommend' | 'likes' | 'latest' = 'recommend'
  selectedDirId = 0
  directoryTreeRaw: TreeNode[] = []
  directoryTree: TreeNode[] = []
  rootId: string | null = null
  directorySearchResults: DirectorySearchItem[] = []
  directorySearching = false
  searchQuery = ''
  searchResults: KnowledgeItem[] = []
  searchLoading = false
  private searchTimer: ReturnType<typeof setTimeout> | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setSortBy(sort: 'recommend' | 'likes' | 'latest') {
    this.sortBy = sort
  }

  setSelectedDirId(dirId: number) {
    this.selectedDirId = dirId
  }

  async loadCards() {
    this.loading = true
    try {
      const conf = SORT_CONFIG[this.sortBy]
      const data = await getKnowledgeList({
        dirId: this.selectedDirId || 0,
        page: 1,
        pageSize: 20,
        sortField: conf.sortField,
        sortOrder: conf.sortOrder,
      })
      runInAction(() => {
        this.cards = data.items
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async loadDirectoryTree() {
    const data = await getDirectoryTree()
    runInAction(() => {
      this.directoryTreeRaw = data
      this.rootId = data.length > 0 ? data[0].key : null
      this.directoryTree = data.length > 0 ? (data[0].children || []) : []
    })
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  clearSearch() {
    this.searchQuery = ''
    this.searchResults = []
  }

  get filteredCards(): KnowledgeItem[] {
    if (this.searchQuery.trim()) {
      return this.searchResults
    }
    return this.cards
  }

  async searchByKeyword(keyword: string) {
    const trimmed = keyword.trim()
    if (!trimmed) {
      this.clearSearch()
      return
    }

    this.searchQuery = trimmed

    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
    }

    this.searchLoading = true

    this.searchTimer = setTimeout(async () => {
      try {
        const data = await searchKnowledge(trimmed)
        runInAction(() => {
          this.searchResults = data.items
          this.searchLoading = false
        })
      } catch {
        runInAction(() => {
          this.searchResults = []
          this.searchLoading = false
        })
      }
    }, 300)
  }

  async addNode(parentId: number, dirName: string) {
    await createDirectoryNode({ parent_id: parentId, dir_name: dirName })
    await this.loadDirectoryTree()
  }

  async renameNode(dirId: number, dirName: string) {
    await renameDirectoryNode({ dir_id: dirId, dir_name: dirName })
    runInAction(() => {
      this.directoryTreeRaw = this._mapTree(this.directoryTreeRaw, (node) =>
        node.key === String(dirId) ? { ...node, title: dirName } : node,
      )
      this.directoryTree = this.directoryTreeRaw[0]?.children || []
    })
  }

  async deleteNode(dirId: number) {
    await deleteDirectoryNode(dirId)
    await this.loadDirectoryTree()
  }

  async moveNode(dirId: number, targetId: number, position: MovePosition) {
    await moveDirectoryNode({ dir_id: dirId, target_id: targetId, position })
    await this.loadDirectoryTree()
  }

  async searchDirectory(keyword: string) {
    const trimmed = keyword.trim()
    if (!trimmed) {
      runInAction(() => {
        this.directorySearchResults = []
        this.directorySearching = false
      })
      return
    }
    this.directorySearching = true
    try {
      const data = await searchDirectoryNodes(trimmed)
      runInAction(() => {
        this.directorySearchResults = data.items
        this.directorySearching = false
      })
    } catch {
      runInAction(() => {
        this.directorySearchResults = []
        this.directorySearching = false
      })
    }
  }

  clearDirectorySearch() {
    this.directorySearchResults = []
    this.directorySearching = false
  }

  getNodeLevel(tree: TreeNode[], targetKey: string, level = 0): number {
    for (const node of tree) {
      if (node.key === targetKey) return level
      if (node.children) {
        const found = this.getNodeLevel(node.children, targetKey, level + 1)
        if (found >= 0) return found
      }
    }
    return -1
  }

  findNodeById(key: string): TreeNode | null {
    const search = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.key === key) return node
        if (node.children) {
          const found = search(node.children)
          if (found) return found
        }
      }
      return null
    }
    return search(this.directoryTreeRaw)
  }

  getNodePath(key: string): { title: string; key: string }[] {
    const path: { title: string; key: string }[] = []
    const search = (nodes: TreeNode[], ancestors: { title: string; key: string }[]): boolean => {
      for (const node of nodes) {
        const current = [...ancestors, { title: node.title, key: node.key }]
        if (node.key === key) {
          path.push(...current)
          return true
        }
        if (node.children && search(node.children, current)) {
          return true
        }
      }
      return false
    }
    search(this.directoryTreeRaw, [])
    return path
  }

  isDescendantOf(ancestorKey: string, descendantKey: string): boolean {
    const findChildren = (nodes: TreeNode[]): boolean => {
      for (const node of nodes) {
        if (node.key === ancestorKey) {
          return this._nodeExistsInSubtree(node, descendantKey)
        }
        if (node.children && findChildren(node.children)) return true
      }
      return false
    }
    return findChildren(this.directoryTreeRaw)
  }

  private _nodeExistsInSubtree(parent: TreeNode, targetKey: string): boolean {
    if (!parent.children) return false
    for (const child of parent.children) {
      if (child.key === targetKey) return true
      if (this._nodeExistsInSubtree(child, targetKey)) return true
    }
    return false
  }

  private _mapTree(nodes: TreeNode[], fn: (node: TreeNode) => TreeNode): TreeNode[] {
    return nodes.map((node) => {
      const updated = fn(node)
      return updated.children
        ? { ...updated, children: this._mapTree(updated.children, fn) }
        : updated
    })
  }

  private _filterTree(
    nodes: TreeNode[],
    targetKey: string,
    onRemove?: (node: TreeNode) => void,
  ): TreeNode[] {
    return nodes.reduce<TreeNode[]>((acc, node) => {
      if (node.key === targetKey) {
        onRemove?.(node)
        return acc
      }
      if (node.children) {
        const filtered = this._filterTree(node.children, targetKey, onRemove)
        acc.push({ ...node, children: filtered.length > 0 ? filtered : undefined })
      } else {
        acc.push(node)
      }
      return acc
    }, [])
  }
}

export { MAX_TREE_LEVEL }
export const knowledgeStore = new KnowledgeStore()
