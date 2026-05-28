// src/i18n/locales/zh-CN/home.ts
const home = {
  header: {
    home: '首页',
    community: '知识社区',
    personal: '个人中心',
    searchPlaceholder: '搜索你想要的任何知识...',
    logout: '退出登录',
  },
  sidebar: {
    knowledgePush: '知识推送',
    mustRead: '必读',
    subscribe: '订阅',
    knowledgeTrajectory: '知识轨迹',
    favorite: '收藏',
    read: '读过',
    directory: '知识目录',
  },
  waterfall: {
    recommend: '推荐排序',
    mostLikes: '最多点赞',
    latest: '最新发布',
    empty: '暂无知识内容',
  },
  ranking: {
    studyStar: '学习之星',
    originalStar: '原创之星',
    hotStar: '热门之星',
    notification: '消息通知',
    readingCount: '阅读量',
    originalCount: '原创量',
    readCount: '被阅读量',
  },
} as const

export default home
