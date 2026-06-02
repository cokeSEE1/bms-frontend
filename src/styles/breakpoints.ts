/** 响应式布局断点 (px)，供 Emotion @media 查询使用 */
export const BREAKPOINTS = {
  /** 侧边栏首次访问时若视口小于此值自动折叠 */
  sidebarCollapse: 1366,
  /** 右侧面板（RankingPanel）在此宽度以下隐藏 */
  rightPanelHide: 1440,
  /** 紧凑布局调整 */
  compact: 1200,
} as const
