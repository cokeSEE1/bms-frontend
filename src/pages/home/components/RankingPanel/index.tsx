// src/pages/home/components/RankingPanel/index.tsx
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Badge } from 'antd'
import { rankingStore } from '../../../../stores/rankingStore'
import home from '../../../../i18n/locales/zh-CN/home'
import type { RankUser } from '../../../../service/home'
import {
  PanelContainer,
  Section,
  SectionTitle,
  RankItem,
  RankBadge,
  RankInfo,
  RankName,
  RankDept,
  RankCount,
  NotifItem,
  NotifTime,
} from './style'

function RankList({ title, users }: { title: string; users: RankUser[] }) {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {users.map((user) => (
        <RankItem key={user.rank}>
          <RankBadge rank={user.rank}>{user.rank}</RankBadge>
          <RankInfo>
            <RankName>{user.name}</RankName>
            <RankDept>{user.department}</RankDept>
          </RankInfo>
          <RankCount>{user.count}</RankCount>
        </RankItem>
      ))}
    </Section>
  )
}

function RankingPanel() {
  useEffect(() => {
    rankingStore.loadAll()
  }, [])

  return (
    <PanelContainer>
      <RankList title={home.ranking.studyStar} users={rankingStore.studyStars} />
      <RankList title={home.ranking.originalStar} users={rankingStore.originalStars} />
      <RankList title={home.ranking.hotStar} users={rankingStore.hotStars} />

      <Section>
        <SectionTitle>
          {home.ranking.notification}
          {rankingStore.notifications.some((n) => !n.isRead) && (
            <Badge
              count={rankingStore.notifications.filter((n) => !n.isRead).length}
              size="small"
              style={{ marginLeft: 8 }}
            />
          )}
        </SectionTitle>
        {rankingStore.notifications.map((item) => (
          <NotifItem key={item.id} isRead={item.isRead}>
            {item.title}
            <NotifTime>{item.time}</NotifTime>
          </NotifItem>
        ))}
      </Section>
    </PanelContainer>
  )
}

export default observer(RankingPanel)
