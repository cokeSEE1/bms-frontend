import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Skeleton } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import home from '../../../../i18n/locales/zh-CN/home'
import { getUserStats, getParticipated, type UserStats, type ParticipatedItem } from '../../../../service/home'
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

const STAT_CONFIGS = [
  { key: 'readCount', label: home.ranking.readingCount, bg: 'rgba(21, 124, 211, 0.08)' },
  { key: 'originalCount', label: home.ranking.originalCount, bg: 'rgba(241, 94, 0, 0.08)' },
  { key: 'totalReadCount', label: home.ranking.readCount, bg: 'rgba(71, 165, 80, 0.08)' },
] as const

const formatUpdateTime = (iso: string): string => {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `更新日期：${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const PersonalWorkspace = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [participated, setParticipated] = useState<ParticipatedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchData = async () => {
      setLoading(true)
      try {
        const [statsData, participatedData] = await Promise.all([
          getUserStats(),
          getParticipated(),
        ])
        if (!cancelled) {
          setStats(statsData)
          setParticipated(participatedData)
        }
      } catch {
        // silently ignore — the API will 401 if not authenticated,
        // and the interceptor clears the token
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  const handleCreateKnowledge = () => {
    navigate('/knowledge/new')
  }

  if (loading) {
    return (
      <Container>
        <Title>{home.workspace.title}</Title>
        <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 24, xl: 32, xxl: 32 }}>
          <DataCol xl={8} xxl={8} md={24} lg={24} sm={24} xs={24}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </DataCol>
          <PartCol xl={16} xxl={16} md={24} lg={24} sm={24} xs={24}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </PartCol>
        </Row>
      </Container>
    )
  }

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
                <StatValue>{stats?.[cfg.key] ?? 0}</StatValue>
                <StatLabel>{cfg.label}</StatLabel>
              </StatCard>
            ))}
          </StatCards>
          <CreateBtn onClick={handleCreateKnowledge}>
            {home.workspace.createKnowledge}
            <RightOutlined style={{ fontSize: 14 }} />
          </CreateBtn>
        </DataCol>

        <PartCol xl={16} xxl={16} md={24} lg={24} sm={24} xs={24}>
          <PartHeader>
            <PartTitle>{home.workspace.myParticipation}</PartTitle>
          </PartHeader>
          <PartGrid>
            {participated.map((item) => (
              <PartCard key={item.id}>
                <PartCardTitle>{item.name}</PartCardTitle>
                <PartCardDesc>{formatUpdateTime(item.updateTime)}</PartCardDesc>
              </PartCard>
            ))}
          </PartGrid>
        </PartCol>
      </Row>
    </Container>
  )
}

export default PersonalWorkspace
