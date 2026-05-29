// src/stores/knowledgeStore.ts
import { makeAutoObservable, runInAction } from 'mobx'
import {
  getKnowledgeCards,
  getDirectoryTree,
  createDirectoryNode,
  renameDirectoryNode,
  deleteDirectoryNode,
  moveDirectoryNode,
  searchDirectoryNodes,
} from '../service/home'
import type { KnowledgeCard, TreeNode, GetKnowledgeCardsParams, MovePosition, DirectorySearchItem } from '../service/home'

const MAX_TREE_LEVEL = 5

class KnowledgeStore {
  cards: KnowledgeCard[] = []
  loading = false
  sortBy: 'recommend' | 'likes' | 'latest' = 'recommend'
  directoryTree: TreeNode[] = []
  directorySearchResults: DirectorySearchItem[] = []
  directorySearching = false
  searchQuery = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSortBy(sort: 'recommend' | 'likes' | 'latest') {
    this.sortBy = sort
  }

  async loadCards(params: GetKnowledgeCardsParams) {
    this.loading = true
    try {
      const data = await getKnowledgeCards(params)
      runInAction(() => {
        this.cards = data
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
      this.directoryTree = data
    })
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  clearSearch() {
    this.searchQuery = ''
  }

  get filteredCards(): KnowledgeCard[] {
    const query = this.searchQuery.trim()
    if (!query) {
      return this.cards
    }
    const lower = query.toLowerCase()
    return this.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(lower) ||
        card.author.name.toLowerCase().includes(lower),
    )
  }

  async addNode(parentId: number, dirName: string) {
    await createDirectoryNode({ parent_id: parentId, dir_name: dirName })
    await this.loadDirectoryTree()
  }

  async renameNode(dirId: number, dirName: string) {
    await renameDirectoryNode({ dir_id: dirId, dir_name: dirName })
    runInAction(() => {
      this.directoryTree = this._mapTree(this.directoryTree, (node) =>
        node.key === String(dirId) ? { ...node, title: dirName } : node,
      )
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
    return search(this.directoryTree)
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
    search(this.directoryTree, [])
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
    return findChildren(this.directoryTree)
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
