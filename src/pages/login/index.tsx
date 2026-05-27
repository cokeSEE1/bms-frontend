import BrandPanel from './BrandPanel'
import LoginForm from './LoginForm'
import { PageContainer, FormPanelWrapper } from './style'

function LoginPage() {
  return (
    <PageContainer>
      <BrandPanel />
      <FormPanelWrapper>
        <LoginForm />
      </FormPanelWrapper>
    </PageContainer>
  )
}

export default LoginPage
