// src/pages/home/components/KnowledgeWaterfall/index.tsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Empty, Spin, Tag } from 'antd'
import {
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  LockOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { KnowledgeCard } from '../../../../service/home'
import {
  WaterfallContainer,
  SortTabs,
  SortTab,
  CardList,
  Card,
  CardTags,
  CardTitle,
  CardDesc,
  CardMeta,
  MetaItem,
} from './style'

const SORT_OPTIONS: { key: typeof knowledgeStore.sortBy; label: string }[] = [
  { key: 'recommend', label: home.waterfall.recommend },
  { key: 'likes', label: home.waterfall.mostLikes },
  { key: 'latest', label: home.waterfall.latest },
]

const TAG_COLORS: Record<string, string> = {
  '置顶': 'red',
  '必读': 'blue',
  '热门': 'orange',
  '订阅': 'purple',
  '第三方系统': 'geekblue',
}

const DOC_ICON_MAP: Record<KnowledgeCard['docType'], React.ReactNode> = {
  richtext: <FileTextOutlined />,
  pdf: <FilePdfOutlined />,
  word: <FileWordOutlined />,
  excel: <FileExcelOutlined />,
}

function KnowledgeCardItem({ card }: { card: KnowledgeCard }) {
  return (
    <Card>
      <CardTags>
        {card.tags.map((tag) => (
          <Tag key={tag} color={TAG_COLORS[tag] || 'default'}>
            {tag}
          </Tag>
        ))}
      </CardTags>
      <CardTitle href="#">{card.title}</CardTitle>
      <CardDesc>{card.description}</CardDesc>
      <CardMeta>
        <MetaItem>{DOC_ICON_MAP[card.docType]}</MetaItem>
        <MetaItem>
          <UserOutlined />
          {card.author.name}
        </MetaItem>
        <MetaItem>
          <ClockCircleOutlined />
          {dayjs(card.createdAt).format('YYYY-MM-DD')}
        </MetaItem>
        <MetaItem>
          <EyeOutlined />
          {card.views}
        </MetaItem>
        <MetaItem>
          <LikeOutlined />
          {card.likes}
        </MetaItem>
        {card.isLocked && (
          <MetaItem>
            <LockOutlined />
          </MetaItem>
        )}
      </CardMeta>
    </Card>
  )
}

function KnowledgeWaterfall() {
  useEffect(() => {
    knowledgeStore.loadCards({ tab: 'push', subTab: 'mustread', sortBy: knowledgeStore.sortBy })
  }, [knowledgeStore.sortBy])

  return (
    <WaterfallContainer>
      <SortTabs>
        {SORT_OPTIONS.map((opt) => (
          <SortTab
            key={opt.key}
            active={knowledgeStore.sortBy === opt.key}
            onClick={() => knowledgeStore.setSortBy(opt.key)}
          >
            {opt.label}
          </SortTab>
        ))}
      </SortTabs>

      <Spin spinning={knowledgeStore.loading}>
        <CardList>
          {knowledgeStore.cards.length === 0 ? (
            <Empty description={home.waterfall.empty} />
          ) : (
            knowledgeStore.cards.map((card) => <KnowledgeCardItem key={card.id} card={card} />)
          )}
        </CardList>
      </Spin>
    </WaterfallContainer>
  )
}

export default observer(KnowledgeWaterfall)
