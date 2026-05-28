import styled from '@emotion/styled'
import KnowledgeWaterfall from './components/KnowledgeWaterfall'
import RankingPanel from './components/RankingPanel'

const HomeRow = styled.div`
  display: flex;
  height: 100%;
  gap: 0;
`

const HomeMain = styled.div`
  flex: 1;
  min-width: 0;
`

function HomePage() {
  return (
    <HomeRow>
      <HomeMain>
        <KnowledgeWaterfall />
      </HomeMain>
      <RankingPanel />
    </HomeRow>
  )
}

export default HomePage
