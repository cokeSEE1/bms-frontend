// src/pages/home/components/KnowledgeWaterfall/index.tsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Button, Empty, Spin, Tag } from 'antd'
import { UserOutlined, ClockCircleOutlined, EyeOutlined, LikeOutlined, FileTextOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import { homeStore } from '../../../../stores/homeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { KnowledgeItem } from '../../../../service/knowledge'
import {
  Container,
  Header,
  Title,
  SortTabs,
  SortTab,
  SpinWrapper,
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

const KnowledgeCardItem = React.memo(({ card }: { card: KnowledgeItem }) => {
  return (
    <Card>
      <CardTop>
        <DocIcon>
          <FileTextOutlined />
        </DocIcon>
        <CardTitleArea>
          <CardTitleText to={`/knowledge/${card.id}`}>{card.name}</CardTitleText>
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
            {card.author}
          </MetaItem>
          <MetaItem>
            <ClockCircleOutlined />
            {dayjs(card.createTime).format('YYYY-MM-DD')}
          </MetaItem>
        </MetaLeft>
        <MetaRight>
          <MetaItem>
            <EyeOutlined />
            {card.viewCount}
          </MetaItem>
          <MetaItem>
            <LikeOutlined />
            {card.likeCount}
          </MetaItem>
        </MetaRight>
      </CardMeta>
    </Card>
  )
})

const KnowledgeWaterfall = () => {
  const navigate = useNavigate()

  useEffect(() => {
    knowledgeStore.loadCards()
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

      <SpinWrapper>
        <Spin spinning={knowledgeStore.loading || knowledgeStore.searchLoading}>
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
              <Empty description={home.waterfall.empty}>
                <Button type="primary" onClick={() => navigate('/knowledge/new')}>
                  {home.workspace.createKnowledge}
                </Button>
              </Empty>
            </EmptyWrapper>
          ) : (
            <CardList>
              {knowledgeStore.filteredCards.map((card) => <KnowledgeCardItem key={card.id} card={card} />)}
            </CardList>
          )}
        </Spin>
      </SpinWrapper>
    </Container>
  )
}

export default observer(KnowledgeWaterfall)
