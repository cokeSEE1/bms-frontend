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
}

interface DirectoryTreeNodeBackend {
  id: number
  dir_name: string
  dir_type: number
  level: number
  parent_id: number | null
  children: DirectoryTreeNodeBackend[]
}

const mockCards: KnowledgeCard[] = [
  {
    id: '1',
    title: '知识库使用指南与最佳实践',
    description: '本文档介绍了知识库的基本使用方法，包括知识创建、分类管理、权限设置等核心功能，帮助团队快速上手并规范知识管理流程。',
    tags: ['置顶', '必读'],
    docType: 'richtext',
    author: { name: '张三' },
    views: 1256,
    likes: 89,
    createdAt: '2026-05-20T08:00:00Z',
    isLocked: true,
  },
  {
    id: '2',
    title: '2026年Q2技术分享计划',
    description: '本季度技术分享安排包括前端性能优化实践、后端微服务架构演进、AI在知识管理中的应用等主题，欢迎报名参加。',
    tags: ['热门', '订阅'],
    docType: 'pdf',
    author: { name: '李四' },
    views: 892,
    likes: 56,
    createdAt: '2026-05-18T10:30:00Z',
    isLocked: false,
  },
  {
    id: '3',
    title: '产品需求文档模板与规范',
    description: '标准化的产品需求文档模板，包含需求背景、功能描述、交互流程、验收标准等章节，适用于所有产品线。',
    tags: ['第三方系统'],
    docType: 'word',
    author: { name: '王五' },
    views: 654,
    likes: 42,
    createdAt: '2026-05-15T14:00:00Z',
    isLocked: false,
  },
  {
    id: '4',
    title: '前端代码规范与审查清单',
    description: '团队前端开发规范文档，涵盖命名规范、组件设计原则、状态管理最佳实践、代码审查要点等内容。',
    tags: ['热门'],
    docType: 'richtext',
    author: { name: '赵六' },
    views: 431,
    likes: 35,
    createdAt: '2026-05-12T09:00:00Z',
    isLocked: true,
  },
  {
    id: '5',
    title: 'Q1数据分析报告汇总',
    description: '第一季度各业务线关键数据指标汇总分析，涵盖用户增长、内容消费、搜索转化等维度的数据洞察。',
    tags: ['订阅'],
    docType: 'excel',
    author: { name: '孙七' },
    views: 321,
    likes: 28,
    createdAt: '2026-05-10T16:00:00Z',
    isLocked: false,
  },
]

const mockStudyStars: RankUser[] = [
  { rank: 1, name: '张伟', department: '技术部', count: 328 },
  { rank: 2, name: '李娜', department: '产品部', count: 256 },
  { rank: 3, name: '王强', department: '运营部', count: 189 },
]

const mockOriginalStars: RankUser[] = [
  { rank: 1, name: '陈明', department: '技术部', count: 45 },
  { rank: 2, name: '刘洋', department: '设计部', count: 32 },
  { rank: 3, name: '周洁', department: '产品部', count: 21 },
]

const mockHotStars: RankUser[] = [
  { rank: 1, name: '李四', department: '技术部', count: 892 },
  { rank: 2, name: '张三', department: '技术部', count: 756 },
  { rank: 3, name: '王五', department: '产品部', count: 654 },
]

const mockNotifications: NotificationItem[] = [
  { id: 'n1', title: '系统将于本周六进行维护升级', time: '2026-05-27 14:00', isRead: false },
  { id: 'n2', title: '新版本知识库功能已上线', time: '2026-05-26 09:00', isRead: false },
  { id: 'n3', title: '请完成本季度知识贡献目标', time: '2026-05-25 16:00', isRead: true },
  { id: 'n4', title: '知识库使用培训通知', time: '2026-05-24 10:00', isRead: true },
]

export type GetKnowledgeCardsParams = {
  tab: 'push' | 'trajectory'
  subTab: string
  sortBy: 'recommend' | 'likes' | 'latest'
}

export async function getKnowledgeCards(_params: GetKnowledgeCardsParams): Promise<KnowledgeCard[]> {
  return Promise.resolve(mockCards)
}

function mapDirectoryTreeNode(backendNode: DirectoryTreeNodeBackend): TreeNode {
  return {
    title: backendNode.dir_name,
    key: String(backendNode.id),
    tag: backendNode.dir_type === 1 ? '分组' : undefined,
    children: backendNode.children?.map(mapDirectoryTreeNode),
  }
}

export async function getDirectoryTree(): Promise<TreeNode[]> {
  const { data } = await client.post<DirectoryTreeNodeBackend>('/v1/directory/tree', {
    dir_id: 0,
    level: -1,
  })
  return [mapDirectoryTreeNode(data)]
}

export async function getStudyStars(): Promise<RankUser[]> {
  return Promise.resolve(mockStudyStars)
}

export async function getOriginalStars(): Promise<RankUser[]> {
  return Promise.resolve(mockOriginalStars)
}

export async function getHotStars(): Promise<RankUser[]> {
  return Promise.resolve(mockHotStars)
}

export async function getNotifications(): Promise<NotificationItem[]> {
  return Promise.resolve(mockNotifications)
}
