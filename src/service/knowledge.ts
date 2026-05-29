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

const mockItems: KnowledgeItem[] = [
  {
    id: 1, name: '前端性能优化实践指南', abstract: '详细介绍前端性能优化的各个方面，包括资源加载优化、渲染性能优化、JavaScript执行效率提升等内容。',
    author: '张三', createTime: '2026-05-18T10:00:00Z', updateTime: '2026-05-28T10:00:00Z', viewCount: 1256, likeCount: 89, dirType: 2, tags: ['前端', '性能'], status: 3,
  },
  {
    id: 2, name: 'React 18 新特性详解', abstract: '深入解析 React 18 的 Concurrent Mode、Automatic Batching、Transitions 等新特性的使用方法和原理。',
    author: '李四', createTime: '2026-05-17T14:30:00Z', updateTime: '2026-05-27T14:30:00Z', viewCount: 892, likeCount: 56, dirType: 2, tags: ['React', '前端'], status: 3,
  },
  {
    id: 3, name: 'TypeScript 类型体操入门', abstract: '从基础到进阶，涵盖泛型、条件类型、映射类型等 TypeScript 高级类型系统的使用技巧。',
    author: '王五', createTime: '2026-05-16T09:00:00Z', updateTime: '2026-05-26T09:00:00Z', viewCount: 654, likeCount: 42, dirType: 2, tags: ['TypeScript'], status: 3,
  },
  {
    id: 4, name: '微服务架构设计模式', abstract: '总结微服务架构中的常见设计模式，包括服务发现、API网关、熔断器、事件驱动等模式。',
    author: '赵六', createTime: '2026-05-15T16:00:00Z', updateTime: '2026-05-25T16:00:00Z', viewCount: 431, likeCount: 35, dirType: 2, tags: ['后端', '架构'], status: 3,
  },
  {
    id: 5, name: '数据库索引优化策略', abstract: '深入分析 B+Tree 索引原理，分享 SQL 查询优化、索引设计的最佳实践和常见误区。',
    author: '孙七', createTime: '2026-05-14T11:00:00Z', updateTime: '2026-05-24T11:00:00Z', viewCount: 321, likeCount: 28, dirType: 2, tags: ['数据库', '后端'], status: 3,
  },
  {
    id: 6, name: 'CSS Grid 布局完全指南', abstract: '全面介绍 CSS Grid 布局的使用方法，包含实际案例和响应式布局的最佳实践。',
    author: '周八', createTime: '2026-05-13T08:30:00Z', updateTime: '2026-05-23T08:30:00Z', viewCount: 567, likeCount: 67, dirType: 2, tags: ['CSS', '前端'], status: 3,
  },
  {
    id: 7, name: 'Docker 容器化部署实战', abstract: '从 Docker 基础概念到多容器编排，涵盖 Dockerfile 编写、镜像优化、Compose 使用等内容。',
    author: '吴九', createTime: '2026-05-12T13:00:00Z', updateTime: '2026-05-22T13:00:00Z', viewCount: 743, likeCount: 51, dirType: 2, tags: ['Docker', '运维'], status: 3,
  },
  {
    id: 8, name: 'Python 异步编程详解', abstract: '深入理解 asyncio 事件循环、协程、Task 等概念，掌握 Python 异步编程的核心原理。',
    author: '郑十', createTime: '2026-05-11T15:30:00Z', updateTime: '2026-05-21T15:30:00Z', viewCount: 289, likeCount: 19, dirType: 2, tags: ['Python', '后端'], status: 3,
  },
  {
    id: 9, name: 'Git 工作流最佳实践', abstract: '介绍 Git Flow、GitHub Flow、Trunk-Based Development 等主流工作流及其适用场景。',
    author: '张三', createTime: '2026-05-10T10:00:00Z', updateTime: '2026-05-20T10:00:00Z', viewCount: 876, likeCount: 73, dirType: 2, tags: ['Git', '工具'], status: 3,
  },
  {
    id: 10, name: 'Web 安全防护手册', abstract: '覆盖 XSS、CSRF、SQL注入、点击劫持等常见Web安全漏洞的防护方案和最佳实践。',
    author: '李四', createTime: '2026-05-09T09:00:00Z', updateTime: '2026-05-19T09:00:00Z', viewCount: 512, likeCount: 44, dirType: 2, tags: ['安全', 'Web'], status: 3,
  },
  {
    id: 11, name: 'GraphQL API 设计指南', abstract: '从 Schema 设计到查询优化，掌握 GraphQL API 的完整设计流程和最佳实践。',
    author: '王五', createTime: '2026-05-08T14:00:00Z', updateTime: '2026-05-18T14:00:00Z', viewCount: 345, likeCount: 23, dirType: 2, tags: ['GraphQL', 'API'], status: 3,
  },
  {
    id: 12, name: 'Redis 缓存架构设计', abstract: '深入 Redis 数据结构、持久化、集群模式，分享高并发场景下的缓存架构设计方案。',
    author: '赵六', createTime: '2026-05-07T11:30:00Z', updateTime: '2026-05-17T11:30:00Z', viewCount: 678, likeCount: 58, dirType: 2, tags: ['Redis', '后端'], status: 3,
  },
  {
    id: 13, name: 'UI 设计系统构建实践', abstract: '从设计 Token 到组件库，完整记录企业级设计系统的构建过程和关键决策。',
    author: '孙七', createTime: '2026-05-06T10:00:00Z', updateTime: '2026-05-16T10:00:00Z', viewCount: 234, likeCount: 31, dirType: 2, tags: ['设计', 'UI'], status: 3,
  },
  {
    id: 14, name: 'Kubernetes 入门与实践', abstract: '面向初学者的 K8s 教程，涵盖 Pod、Service、Deployment 等核心概念和实操练习。',
    author: '周八', createTime: '2026-05-05T08:00:00Z', updateTime: '2026-05-15T08:00:00Z', viewCount: 987, likeCount: 82, dirType: 2, tags: ['K8s', '运维'], status: 3,
  },
  {
    id: 15, name: '算法与数据结构面试精讲', abstract: '整理常见算法题目的解题思路和代码模板，帮助准备技术面试中的算法环节。',
    author: '吴九', createTime: '2026-05-04T16:30:00Z', updateTime: '2026-05-14T16:30:00Z', viewCount: 1456, likeCount: 112, dirType: 2, tags: ['算法', '面试'], status: 3,
  },
  {
    id: 16, name: 'Node.js 性能调优实践', abstract: '分享 Node.js 应用的性能分析方法、内存泄漏排查、集群模式等实战经验。',
    author: '郑十', createTime: '2026-05-03T12:00:00Z', updateTime: '2026-05-13T12:00:00Z', viewCount: 423, likeCount: 37, dirType: 2, tags: ['Node.js', '后端'], status: 3,
  },
  {
    id: 17, name: '移动端适配方案总结', abstract: '对比 rem、vw、媒体查询等多种移动端适配方案的优缺点和使用场景。',
    author: '张三', createTime: '2026-05-02T09:30:00Z', updateTime: '2026-05-12T09:30:00Z', viewCount: 567, likeCount: 45, dirType: 2, tags: ['移动端', '前端'], status: 3,
  },
  {
    id: 18, name: '消息队列技术选型对比', abstract: '深入对比 Kafka、RabbitMQ、RocketMQ 等主流消息队列的特性、性能和适用场景。',
    author: '李四', createTime: '2026-05-01T14:00:00Z', updateTime: '2026-05-11T14:00:00Z', viewCount: 389, likeCount: 29, dirType: 2, tags: ['消息队列', '后端'], status: 3,
  },
  {
    id: 19, name: '前端测试策略与实践', abstract: '从单元测试到 E2E 测试，介绍前端测试金字塔和各层测试的工具选型和编写技巧。',
    author: '王五', createTime: '2026-04-30T11:00:00Z', updateTime: '2026-05-10T11:00:00Z', viewCount: 298, likeCount: 22, dirType: 2, tags: ['测试', '前端'], status: 3,
  },
  {
    id: 20, name: 'Linux 常用命令速查手册', abstract: '整理开发运维中常用的 Linux 命令，包括文件操作、进程管理、网络诊断等分类。',
    author: '赵六', createTime: '2026-04-29T08:00:00Z', updateTime: '2026-05-09T08:00:00Z', viewCount: 1123, likeCount: 95, dirType: 2, tags: ['Linux', '工具'], status: 3,
  },
  {
    id: 21, name: '设计模式在业务中的应用', abstract: '通过真实业务案例讲解策略模式、观察者模式、装饰器模式等常见设计模式的实际应用。',
    author: '孙七', createTime: '2026-04-28T10:30:00Z', updateTime: '2026-05-08T10:30:00Z', viewCount: 456, likeCount: 38, dirType: 2, tags: ['设计模式'], status: 3,
  },
  {
    id: 22, name: 'CI/CD 流水线搭建指南', abstract: '基于 GitLab CI/Jenkins 的持续集成与持续部署流水线搭建教程，包含自动化测试和部署配置。',
    author: '周八', createTime: '2026-04-27T15:00:00Z', updateTime: '2026-05-07T15:00:00Z', viewCount: 534, likeCount: 41, dirType: 2, tags: ['CI/CD', '运维'], status: 3,
  },
  {
    id: 23, name: 'RESTful API 设计规范', abstract: '制定统一的 API 设计规范，包括 URL 命名、状态码使用、版本管理、错误处理等内容。',
    author: '吴九', createTime: '2026-04-26T09:00:00Z', updateTime: '2026-05-06T09:00:00Z', viewCount: 678, likeCount: 54, dirType: 2, tags: ['API', '规范'], status: 3,
  },
  {
    id: 24, name: '敏捷开发流程实践', abstract: '分享 Scrum 和 Kanban 在团队中的落地经验，包括站会、回顾、计划会议的高效执行方法。',
    author: '郑十', createTime: '2026-04-25T13:30:00Z', updateTime: '2026-05-05T13:30:00Z', viewCount: 234, likeCount: 17, dirType: 2, tags: ['敏捷', '管理'], status: 3,
  },
  {
    id: 25, name: 'WebAssembly 入门指南', abstract: '了解 WebAssembly 的基本概念、工具链和在前端高性能计算场景中的应用案例。',
    author: '张三', createTime: '2026-04-24T16:00:00Z', updateTime: '2026-05-04T16:00:00Z', viewCount: 345, likeCount: 26, dirType: 2, tags: ['WASM', '前端'], status: 3,
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getKnowledgeList = async (params: KnowledgeListParams): Promise<KnowledgeListResponse> => {
  let filtered = [...mockItems]

  if (params.sortField) {
    const order = params.sortOrder === 'ascend' ? 1 : -1
    filtered.sort((a, b) => {
      if (params.sortField === 'name') {
        return order * a.name.localeCompare(b.name, 'zh-Hans-CN')
      }
      if (params.sortField === 'createTime') {
        return order * (new Date(a.createTime).getTime() - new Date(b.createTime).getTime())
      }
      if (params.sortField === 'updateTime') {
        return order * (new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime())
      }
      if (params.sortField === 'viewCount') {
        return order * (a.viewCount - b.viewCount)
      }
      return 0
    })
  }

  const total = filtered.length
  const start = (params.page - 1) * params.pageSize
  const items = filtered.slice(start, start + params.pageSize)

  await delay(300)
  return { items, total }
}
