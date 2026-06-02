import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import PersonalSider from '../PersonalSider'
import { StyledContainer, StyledInner } from './style'

const PersonalLayout = () => {
  return (
    <StyledContainer>
      <StyledInner>
        <PersonalSider />
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledInner>
    </StyledContainer>
  )
}

const StyledContent = styled.div`
  width: 0;
  height: 100%;
  flex: 1;
  overflow: hidden;
`

export default PersonalLayout
