import client from './client'

export interface KnowledgeItem {
  id: number
  name: string
  abstract: string
  author: string
  createTime: string
  updateTime: string
  viewCount: number
  likeCount: number
  dirType: number
  tags: string[]
  status: number
}

export interface KnowledgeListParams {
  dirId: number
  page: number
  pageSize: number
  sortField?: string
  sortOrder?: 'ascend' | 'descend'
}

export interface KnowledgeListResponse {
  items: KnowledgeItem[]
  total: number
}

interface KnowledgeItemBackend {
  id: number
  name: string
  abstract: string | null
  author: string | null
  create_time: string
  update_time: string
  view_count: number
  like_count: number
  dir_type: number
  tag_ids: string | null
  status: number
}

interface KnowledgeListBackendResponse {
  total: number
  items: KnowledgeItemBackend[]
}

const SORT_FIELD_MAP: Record<string, number> = {
  updateTime: 3,
  viewCount: 4,
  name: 5,
}

const mapItem = (raw: KnowledgeItemBackend): KnowledgeItem => ({
  id: raw.id,
  name: raw.name,
  abstract: raw.abstract ?? '',
  author: raw.author ?? '',
  createTime: raw.create_time,
  updateTime: raw.update_time,
  viewCount: raw.view_count,
  likeCount: raw.like_count,
  dirType: raw.dir_type,
  tags: raw.tag_ids ? raw.tag_ids.split(',').filter(Boolean) : [],
  status: raw.status,
})

export const getKnowledgeList = async (params: KnowledgeListParams): Promise<KnowledgeListResponse> => {
  const sort_by = params.sortField ? SORT_FIELD_MAP[params.sortField] ?? 3 : 3
  const order_by = params.sortOrder === 'ascend' ? 1 : 0

  const { data } = await client.get<KnowledgeListBackendResponse>('/v1/knowledge/list', {
    params: {
      cate_id: params.dirId,
      page: params.page,
      page_size: params.pageSize,
      sort_by,
      order_by,
    },
  })

  return {
    items: data.items.map(mapItem),
    total: data.total,
  }
}

// --- Knowledge Detail ---

export interface KnowledgeDetail {
  id: number
  appid: number
  kbId: number
  cateId: number | null
  name: string
  content: string | null
  abstract: string | null
  author: string | null
  creator: string
  lastModifyUser: string | null
  version: number
  maxVersion: number
  status: number
  isOnline: number
  firstReleaseTime: string | null
  lastReleaseTime: string | null
  viewCount: number
  likeCount: number
  favoriteCount: number
  shareNum: number
  downloadNum: number
  isTop: number
  sortOrder: number | null
  nameSortKey: string | null
  knowledgeType: number
  dirType: number
  tagIds: string | null
  attachmentIds: string | null
  createTime: string
  updateTime: string
  kbName: string
  knowledgePath: { dirId: number; dirName: string; dirType: number }[]
  creatorUserInfo: { username: string } | null
  lastModifyUserInfo: { username: string } | null
  tagNames: string[] | null
  isEdit: boolean
  isDownload: boolean
}

interface KnowledgeDetailBackend {
  id: number
  appid: number
  kb_id: number
  cate_id: number | null
  name: string
  content: string | null
  abstract: string | null
  author: string | null
  creator: string
  last_modify_user: string | null
  version: number
  max_version: number
  status: number
  is_online: number
  first_release_time: string | null
  last_release_time: string | null
  view_count: number
  like_count: number
  favorite_count: number
  share_num: number
  download_num: number
  is_top: number
  sort_order: number | null
  name_sort_key: string | null
  knowledge_type: number
  dir_type: number
  tag_ids: string | null
  attachment_ids: string | null
  create_time: string
  update_time: string
  kb_name: string
  knowledge_path: { dir_id: number; dir_name: string; dir_type: number }[]
  creator_user_info: { username: string } | null
  last_modify_user_info: { username: string } | null
  tag_names: string[] | null
  is_edit: boolean
  is_download: boolean
}

const mapDetail = (raw: KnowledgeDetailBackend): KnowledgeDetail => ({
  id: raw.id,
  appid: raw.appid,
  kbId: raw.kb_id,
  cateId: raw.cate_id,
  name: raw.name,
  content: raw.content,
  abstract: raw.abstract,
  author: raw.author,
  creator: raw.creator,
  lastModifyUser: raw.last_modify_user,
  version: raw.version,
  maxVersion: raw.max_version,
  status: raw.status,
  isOnline: raw.is_online,
  firstReleaseTime: raw.first_release_time,
  lastReleaseTime: raw.last_release_time,
  viewCount: raw.view_count,
  likeCount: raw.like_count,
  favoriteCount: raw.favorite_count,
  shareNum: raw.share_num,
  downloadNum: raw.download_num,
  isTop: raw.is_top,
  sortOrder: raw.sort_order,
  nameSortKey: raw.name_sort_key,
  knowledgeType: raw.knowledge_type,
  dirType: raw.dir_type,
  tagIds: raw.tag_ids,
  attachmentIds: raw.attachment_ids,
  createTime: raw.create_time,
  updateTime: raw.update_time,
  kbName: raw.kb_name,
  knowledgePath: raw.knowledge_path.map((p) => ({
    dirId: p.dir_id,
    dirName: p.dir_name,
    dirType: p.dir_type,
  })),
  creatorUserInfo: raw.creator_user_info,
  lastModifyUserInfo: raw.last_modify_user_info,
  tagNames: raw.tag_names,
  isEdit: raw.is_edit,
  isDownload: raw.is_download,
})

export const getKnowledgeDetail = async (knowledgeId: number): Promise<KnowledgeDetail> => {
  const { data } = await client.get<KnowledgeDetailBackend>('/v1/knowledge/detail', {
    params: { knowledge_id: knowledgeId },
  })
  return mapDetail(data)
}

export const searchKnowledge = async (
  keyword: string,
  page = 1,
  pageSize = 20,
): Promise<KnowledgeListResponse> => {
  const { data } = await client.get<any>('/v1/knowledge/search', {
    params: { keyword, page, page_size: pageSize, status: 3 },
  })
  return {
    items: data.items.map(mapItem),
    total: data.total,
  }
}

export const deleteKnowledgeItem = async (itemId: number): Promise<void> => {
  await client.delete(`/v1/knowledge/item/${itemId}`)
}

export const updateKnowledgeItem = async (itemId: number, body: Record<string, unknown>): Promise<void> => {
  await client.put(`/v1/knowledge/item/${itemId}`, body)
}

export const likeItem = async (itemId: number, action: 'like' | 'unlike'): Promise<void> => {
  await client.post(`/v1/knowledge/item/${itemId}/like`, { action })
}

export const favoriteItem = async (itemId: number, action: 'favorite' | 'unfavorite'): Promise<void> => {
  await client.post(`/v1/knowledge/item/${itemId}/favorite`, { action })
}

export const shareItem = async (itemId: number): Promise<void> => {
  await client.post(`/v1/knowledge/item/${itemId}/share`)
}

// --- Comments ---

export interface CommentItem {
  id: number
  knowledge_id: number
  user_id: number
  content: string
  create_time: string
}

export interface CommentListResponse {
  total: number
  items: CommentItem[]
}

export const getComments = async (knowledgeId: number, page = 1, pageSize = 20): Promise<CommentListResponse> => {
  const { data } = await client.get<CommentListResponse>('/v1/comments', {
    params: { knowledge_id: knowledgeId, page, page_size: pageSize },
  })
  return data
}

export const postComment = async (knowledgeId: number, content: string): Promise<CommentItem> => {
  const { data } = await client.post<CommentItem>('/v1/comments', {
    knowledge_id: knowledgeId,
    content,
  })
  return data
}

// --- Create Knowledge ---

export interface CreateKnowledgeParams {
  kb_id: number
  cate_id?: number | null
  name: string
  content?: string | null
  abstract?: string | null
  author?: string | null
  status?: number
  knowledge_type?: number
  dir_type?: number
  tag_ids?: string | null
}

export const createKnowledgeItem = async (body: CreateKnowledgeParams): Promise<KnowledgeDetail> => {
  const { data } = await client.post<KnowledgeDetailBackend>('/v1/knowledge/item', body)
  return mapDetail(data)
}
