import styled from '@emotion/styled'
import PersonalWorkspace from './components/PersonalWorkspace'
import KnowledgeWaterfall from './components/KnowledgeWaterfall'
import RankingPanel from './components/RankingPanel'

const HomeMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  background: #ffffff;
  min-width: 0;
  overflow-y: auto;
`

function HomePage() {
  return (
    <HomeMain>
      <PersonalWorkspace />
      <KnowledgeWaterfall />
    </HomeMain>
  )
}

export { RankingPanel }
export default HomePage
