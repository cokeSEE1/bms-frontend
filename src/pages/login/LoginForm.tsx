import { Form, Input, Button, Checkbox, Typography, App } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import loginTexts from '../../i18n/locales/zh-CN/login'
import useLoginForm, { USERNAME_PATTERN } from '../../hooks/useLoginForm'
import { FormContainer, FormTitle, RowBetween, BottomLink } from './style'

const { Link } = Typography

function LoginForm() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { isSubmitting, handleSubmit } = useLoginForm()

  const onFinish = async () => {
    try {
      await handleSubmit()
      message.success(loginTexts.login_success)
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch {
      message.error(loginTexts.login_failed)
    }
  }

  return (
    <FormContainer>
      <FormTitle>{loginTexts.form_title}</FormTitle>
      <Form
        onFinish={onFinish}
        disabled={isSubmitting}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: loginTexts.username_required },
            { pattern: USERNAME_PATTERN, message: loginTexts.username_format },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={loginTexts.username_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: loginTexts.password_required },
            { min: 6, message: loginTexts.password_min },
            { max: 32, message: loginTexts.password_max },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={loginTexts.password_placeholder}
          />
        </Form.Item>

        <Form.Item>
          <RowBetween>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{loginTexts.remember_me}</Checkbox>
            </Form.Item>
            <Link>{loginTexts.forgot_password}</Link>
          </RowBetween>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
          >
            {isSubmitting ? loginTexts.login_loading : loginTexts.login_button}
          </Button>
        </Form.Item>
      </Form>

      <BottomLink>
        {loginTexts.no_account}
        <Link underline>&nbsp;{loginTexts.register}</Link>
      </BottomLink>
    </FormContainer>
  )
}

export default LoginForm
