import styled from '@emotion/styled'
import PersonalWorkspace from './components/PersonalWorkspace'
import KnowledgeWaterfall from './components/KnowledgeWaterfall'
import RankingPanel from './components/RankingPanel'

const HomeMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: #ffffff;
  min-width: 0;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  background: #ffffff;
  border-radius: 8px;
  min-height: 0;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
`

const HomePage = () => {
  return (
    <HomeMain>
      <ContentWrapper>
        <PersonalWorkspace />
        <KnowledgeWaterfall />
      </ContentWrapper>
    </HomeMain>
  )
}

export { RankingPanel }
export default HomePage
