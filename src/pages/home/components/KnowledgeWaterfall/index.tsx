// src/pages/home/components/KnowledgeWaterfall/index.tsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Empty, Spin, Tag } from 'antd'
import { UserOutlined, ClockCircleOutlined, EyeOutlined, LikeOutlined, LockOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import { homeStore } from '../../../../stores/homeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { KnowledgeCard } from '../../../../service/home'
import docRichtextIcon from '../../../../assets/icons/doc-richtext.svg'
import docPdfIcon from '../../../../assets/icons/doc-pdf.svg'
import docWordIcon from '../../../../assets/icons/doc-word.svg'
import docExcelIcon from '../../../../assets/icons/doc-excel.svg'
import {
  Container,
  Header,
  Title,
  SortTabs,
  SortTab,
  CardList,
  Card,
  CardTop,
  DocIcon,
  CardTitleArea,
  CardTitleText,
  CardMeta,
  MetaLeft,
  MetaRight,
  MetaItem,
  EmptyWrapper,
  SearchIndicator,
  SearchInfo,
  ClearButton,
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

function KnowledgeCardItem({ card }: { card: KnowledgeCard }) {
  return (
    <Card>
      <CardTop>
        <DocIcon src={DOC_ICON_MAP[card.docType]} alt="" />
        <CardTitleArea>
          <CardTitleText href="#">{card.title}</CardTitleText>
          {card.tags.map((tag) => (
            <Tag key={tag} color={TAG_COLORS[tag] || 'default'} style={{ margin: 0, flexShrink: 0 }}>
              {tag}
            </Tag>
          ))}
        </CardTitleArea>
      </CardTop>
      <CardMeta>
        <MetaLeft>
          <MetaItem>
            <UserOutlined />
            {card.author.name}
          </MetaItem>
          <MetaItem>
            <ClockCircleOutlined />
            {dayjs(card.createdAt).format('YYYY-MM-DD')}
          </MetaItem>
        </MetaLeft>
        <MetaRight>
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
        </MetaRight>
      </CardMeta>
    </Card>
  )
}

const DOC_ICON_MAP: Record<KnowledgeCard['docType'], string> = {
  richtext: docRichtextIcon,
  pdf: docPdfIcon,
  word: docWordIcon,
  excel: docExcelIcon,
}

function KnowledgeWaterfall() {
  useEffect(() => {
    knowledgeStore.loadCards({ tab: 'push', subTab: 'mustread', sortBy: knowledgeStore.sortBy })
  }, [knowledgeStore.sortBy])

  return (
    <Container>
      <Header>
        <Title>{home.waterfall.title}</Title>
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
      </Header>

      <Spin spinning={knowledgeStore.loading}>
        {knowledgeStore.searchQuery && (
          <SearchIndicator>
            <SearchInfo>
              {home.waterfall.searchResult}：{knowledgeStore.filteredCards.length} 条
            </SearchInfo>
            <ClearButton
              onClick={() => {
                knowledgeStore.clearSearch()
                homeStore.setSearchKeyword('')
              }}
            >
              {home.waterfall.clearSearch}
            </ClearButton>
          </SearchIndicator>
        )}
        {knowledgeStore.filteredCards.length === 0 ? (
          <EmptyWrapper>
            <Empty description={home.waterfall.empty} />
          </EmptyWrapper>
        ) : (
          <CardList>
            {knowledgeStore.filteredCards.map((card) => <KnowledgeCardItem key={card.id} card={card} />)}
          </CardList>
        )}
      </Spin>
    </Container>
  )
}

export default observer(KnowledgeWaterfall)
