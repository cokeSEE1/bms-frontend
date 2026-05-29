import { Row } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import home from '../../../../i18n/locales/zh-CN/home'
import {
  Container,
  Title,
  DataCol,
  PartCol,
  DataHeader,
  DataTitle,
  DetailLink,
  StatCards,
  StatCard,
  StatValue,
  StatLabel,
  CreateBtn,
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

const PersonalWorkspace = () => {
  return (
    <Container>
      <Title>{home.workspace.title}</Title>
      <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 32, xxl: 32 }}>
        <DataCol xl={8} xxl={8} md={24} lg={24} sm={24} xs={24}>
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
        </DataCol>

        <PartCol xl={16} xxl={16} md={24} lg={24} sm={24} xs={24}>
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
        </PartCol>
      </Row>
    </Container>
  )
}

export default PersonalWorkspace
