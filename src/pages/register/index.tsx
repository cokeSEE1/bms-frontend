import BrandPanel from '../login/BrandPanel'
import RegisterForm from './RegisterForm'
import { PageContainer, FormPanelWrapper } from './style'

function RegisterPage() {
  return (
    <PageContainer>
      <BrandPanel />
      <FormPanelWrapper>
        <RegisterForm />
      </FormPanelWrapper>
    </PageContainer>
  )
}

export default RegisterPage
