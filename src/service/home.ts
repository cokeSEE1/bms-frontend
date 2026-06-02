// src/service/home.ts
import client from './client'

export interface KnowledgeCard {
  id: string
  title: string
  description: string
  tags: string[]
  docType: 'richtext' | 'pdf' | 'word' | 'excel'
  author: { name: string; avatar?: string }
  views: number
  likes: number
  createdAt: string
  isLocked: boolean
}

export interface RankUser {
  rank: 1 | 2 | 3
  name: string
  department: string
  count: number
}

export interface NotificationItem {
  id: string
  title: string
  time: string
  isRead: boolean
}

export interface TreeNode {
  title: string
  key: string
  children?: TreeNode[]
  tag?: string
  dirType: number
}

interface DirectoryTreeNodeBackend {
  id: number
  dir_name: string
  dir_type: number
  level: number
  parent_id: number | null
  children: DirectoryTreeNodeBackend[]
}

export type GetKnowledgeCardsParams = {
  tab: 'push' | 'trajectory'
  subTab: string
  sortBy: 'recommend' | 'likes' | 'latest'
}

const SORT_BY_MAP: Record<string, number> = {
  recommend: 0,
  likes: 1,
  latest: 2,
}

interface KnowledgeListRawItem {
  id: number
  name: string
  abstract: string | null
  author: string | null
  tag_ids: string | null
  knowledge_type: number
  view_count: number
  like_count: number
  create_time: string
  status: number
}

const mapToCard = (raw: KnowledgeListRawItem): KnowledgeCard => ({
  id: String(raw.id),
  title: raw.name,
  description: raw.abstract ?? '',
  tags: raw.tag_ids ? raw.tag_ids.split(',').filter(Boolean) : [],
  docType: 'richtext',
  author: { name: raw.author ?? '' },
  views: raw.view_count,
  likes: raw.like_count,
  createdAt: raw.create_time,
  isLocked: false,
})

export const getKnowledgeCards = async (params: GetKnowledgeCardsParams): Promise<KnowledgeCard[]> => {
  const { data } = await client.get<{ total: number; items: KnowledgeListRawItem[] }>('/v1/knowledge/list', {
    params: {
      page: 1,
      page_size: 20,
      sort_by: SORT_BY_MAP[params.sortBy] ?? 0,
      order_by: 0,
      status: 3,
    },
  })
  return data.items.map(mapToCard)
}
// TODO: implement notifications API
const mockNotifications: NotificationItem[] = [
  { id: 'n1', title: '系统将于本周六进行维护升级', time: '2026-05-27 14:00', isRead: false },
  { id: 'n2', title: '新版本知识库功能已上线', time: '2026-05-26 09:00', isRead: false },
  { id: 'n3', title: '请完成本季度知识贡献目标', time: '2026-05-25 16:00', isRead: true },
  { id: 'n4', title: '知识库使用培训通知', time: '2026-05-24 10:00', isRead: true },
]

interface RankUserBackend {
  rank: number
  name: string
  department: string
  count: number
}

const mapRankUser = (raw: RankUserBackend): RankUser => ({
  rank: raw.rank as 1 | 2 | 3,
  name: raw.name,
  department: raw.department,
  count: raw.count,
})

const mapDirectoryTreeNode = (backendNode: DirectoryTreeNodeBackend): TreeNode => {
  return {
    title: backendNode.dir_name,
    key: String(backendNode.id),
    dirType: backendNode.dir_type,
    tag: backendNode.dir_type === 1 ? '分组' : undefined,
    children: backendNode.children?.map(mapDirectoryTreeNode),
  }
}

export const getDirectoryTree = async (): Promise<TreeNode[]> => {
  const { data } = await client.get<DirectoryTreeNodeBackend[]>('/v1/directory/trees')
  return data.map(mapDirectoryTreeNode)
}

export const getStudyStars = async (): Promise<RankUser[]> => {
  const { data } = await client.get<{ items: RankUserBackend[] }>('/v1/rankings/reading-stars', {
    params: { limit: 3 },
  })
  return data.items.map(mapRankUser)
}

export const getOriginalStars = async (): Promise<RankUser[]> => {
  const { data } = await client.get<{ items: RankUserBackend[] }>('/v1/rankings/original-stars', {
    params: { limit: 3 },
  })
  return data.items.map(mapRankUser)
}

export const getHotStars = async (): Promise<RankUser[]> => {
  const { data } = await client.get<{ items: RankUserBackend[] }>('/v1/rankings/hot-stars', {
    params: { limit: 3 },
  })
  return data.items.map(mapRankUser)
}

export const getNotifications = async (): Promise<NotificationItem[]> => {
  return Promise.resolve(mockNotifications)
}

export const createDirectoryNode = async (params: { parent_id: number; dir_name: string; dir_type?: number; km_id?: number | null }): Promise<TreeNode> => {
  const { data } = await client.post<DirectoryTreeNodeBackend>('/v1/directory/node', {
    parent_id: params.parent_id,
    dir_name: params.dir_name,
    dir_type: params.dir_type ?? 0,
    km_id: params.km_id ?? null,
  })
  return mapDirectoryTreeNode(data)
}

export const renameDirectoryNode = async (params: { dir_id: number; dir_name: string }): Promise<void> => {
  await client.put('/v1/directory/node', params)
}

export const deleteDirectoryNode = async (dir_id: number): Promise<void> => {
  await client.delete('/v1/directory/node', {
    data: { dir_id, delete_type: 1 },
  })
}

export type MovePosition = 'left' | 'right' | 'first-child' | 'last-child'

export const moveDirectoryNode = async (params: { dir_id: number; target_id: number; position: MovePosition }): Promise<void> => {
  await client.put('/v1/directory/node/move', {
    source_id: params.dir_id,
    target_id: params.target_id,
    position: params.position,
  })
}

// Directory search
export interface DirectorySearchItem {
  id: number
  dir_name: string
  dir_type: number
  level: number
  parent_id: number | null
  tree_id: number
}

export interface DirectorySearchResponse {
  total: number
  items: DirectorySearchItem[]
}

export const searchDirectoryNodes = async (keyword: string, limit = 20, offset = 0): Promise<DirectorySearchResponse> => {
  const { data } = await client.get<DirectorySearchResponse>('/v1/directory/search', {
    params: { keyword, limit, offset },
  })
  return data
}

// Directory favorites
export interface DirectoryFavoriteItem {
  id: number
  cate_id: number
  cate_name: string
  count: number
  create_time: string
}

export interface DirectoryFavoriteListResponse {
  items: DirectoryFavoriteItem[]
}

const mockDirectoryFavorites: DirectoryFavoriteItem[] = [
  { id: 1, cate_id: 101, cate_name: '前端技术文档', count: 12, create_time: '2026-05-20T08:00:00Z' },
  { id: 2, cate_id: 102, cate_name: '后端架构设计', count: 8, create_time: '2026-05-18T10:30:00Z' },
  { id: 3, cate_id: 103, cate_name: '产品需求规范', count: 5, create_time: '2026-05-15T14:00:00Z' },
  { id: 4, cate_id: 104, cate_name: '测试流程与规范', count: 3, create_time: '2026-05-12T09:00:00Z' },
  { id: 5, cate_id: 105, cate_name: 'UI设计系统', count: 15, create_time: '2026-05-08T11:00:00Z' },
  { id: 6, cate_id: 106, cate_name: '数据接口文档', count: 7, create_time: '2026-04-28T09:30:00Z' },
  { id: 7, cate_id: 107, cate_name: '运维部署手册', count: 4, create_time: '2026-04-15T16:00:00Z' },
  { id: 8, cate_id: 108, cate_name: '安全规范文档', count: 6, create_time: '2026-04-10T14:00:00Z' },
]

export const getDirectoryFavoriteList = async (): Promise<DirectoryFavoriteListResponse> => {
  return Promise.resolve({ items: mockDirectoryFavorites })
}

// ── User Stats ──

export interface UserStats {
  readCount: number
  originalCount: number
  totalReadCount: number
}

export interface ParticipatedItem {
  id: number
  name: string
  updateTime: string
}

export const getUserStats = async (): Promise<UserStats> => {
  const { data } = await client.get<any>('/v1/user/stats')
  return {
    readCount: data.read_count,
    originalCount: data.original_count,
    totalReadCount: data.total_read_count,
  }
}

export const getParticipated = async (): Promise<ParticipatedItem[]> => {
  const { data } = await client.get<any>('/v1/user/participated')
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    updateTime: item.update_time,
  }))
}
