// src/pages/home/components/PersonalWorkspace/index.tsx
import { RightOutlined } from '@ant-design/icons'
import home from '../../../../i18n/locales/zh-CN/home'
import {
  Container,
  Title,
  Content,
  DataSection,
  DataHeader,
  DataTitle,
  DetailLink,
  StatCards,
  StatCard,
  StatValue,
  StatLabel,
  CreateBtn,
  ParticipationSection,
  PartHeader,
  PartTitle,
  PartGrid,
  PartCard,
  PartCardTitle,
  PartCardDesc,
} from './style'

const MOCK_STATS: Record<string, number> = {
  readingCount: 128,
  originalCount: 36,
  readCount: 520,
}

const STAT_CONFIGS = [
  { key: 'readingCount', label: home.ranking.readingCount, bg: 'rgba(21, 124, 211, 0.08)' },
  { key: 'originalCount', label: home.ranking.originalCount, bg: 'rgba(241, 94, 0, 0.08)' },
  { key: 'readCount', label: home.ranking.readCount, bg: 'rgba(71, 165, 80, 0.08)' },
] as const

const MOCK_PARTICIPATED = [
  { id: '1', title: '前端开发规范 V3.0', desc: '更新日期：2026-05-20' },
  { id: '2', title: '后端API设计文档', desc: '更新日期：2026-05-18' },
  { id: '3', title: '数据库设计规范', desc: '更新日期：2026-05-15' },
  { id: '4', title: '测试流程文档', desc: '更新日期：2026-05-12' },
]

function PersonalWorkspace() {
  return (
    <Container>
      <Title>{home.workspace.title}</Title>
      <Content>
        <DataSection>
          <DataHeader>
            <DataTitle>{home.workspace.data}</DataTitle>
            <DetailLink>{home.workspace.viewDetail}</DetailLink>
          </DataHeader>
          <StatCards>
            {STAT_CONFIGS.map((cfg) => (
              <StatCard key={cfg.key} bg={cfg.bg}>
                <StatValue>{MOCK_STATS[cfg.key]}</StatValue>
                <StatLabel>{cfg.label}</StatLabel>
              </StatCard>
            ))}
          </StatCards>
          <CreateBtn>
            {home.workspace.createKnowledge}
            <RightOutlined style={{ fontSize: 14 }} />
          </CreateBtn>
        </DataSection>

        <ParticipationSection>
          <PartHeader>
            <PartTitle>{home.workspace.myParticipation}</PartTitle>
          </PartHeader>
          <PartGrid>
            {MOCK_PARTICIPATED.map((item) => (
              <PartCard key={item.id}>
                <PartCardTitle>{item.title}</PartCardTitle>
                <PartCardDesc>{item.desc}</PartCardDesc>
              </PartCard>
            ))}
          </PartGrid>
        </ParticipationSection>
      </Content>
    </Container>
  )
}

export default PersonalWorkspace
