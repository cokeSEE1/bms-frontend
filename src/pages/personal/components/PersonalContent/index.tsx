import { ReactNode } from 'react'
import { StyledContainer, StyledHeader, StyledContent, StyledInner } from './style'

interface PersonalContentProps {
  title?: ReactNode
  extra?: ReactNode
  children: ReactNode
}

const PersonalContent = ({ title, extra, children }: PersonalContentProps) => {
  return (
    <StyledContainer>
      {(title || extra) && (
        <StyledHeader>
          <span>{title}</span>
          <span>{extra}</span>
        </StyledHeader>
      )}
      <StyledContent>
        <StyledInner>{children}</StyledInner>
      </StyledContent>
    </StyledContainer>
  )
}

export default PersonalContent
