import { Form, Input, Button, Typography, App } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import registerTexts from '../../i18n/locales/zh-CN/register'
import useRegisterForm, { USERNAME_PATTERN } from '../../hooks/useRegisterForm'
import { FormContainer, FormTitle, BottomLink } from './style'

const { Link } = Typography

function RegisterForm() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { isSubmitting, handleSubmit } = useRegisterForm()

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await handleSubmit(values)
      message.success(registerTexts.register_success)
      navigate('/login')
    } catch {
      message.error(registerTexts.register_failed)
    }
  }

  return (
    <FormContainer>
      <FormTitle>{registerTexts.form_title}</FormTitle>
      <Form
        onFinish={onFinish}
        disabled={isSubmitting}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: registerTexts.username_required },
            { pattern: USERNAME_PATTERN, message: registerTexts.username_format },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={registerTexts.username_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: registerTexts.password_required },
            { min: 6, message: registerTexts.password_min },
            { max: 32, message: registerTexts.password_max },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={registerTexts.password_placeholder}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: registerTexts.confirm_password_required },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(registerTexts.confirm_password_mismatch))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={registerTexts.confirm_password_placeholder}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
          >
            {isSubmitting ? registerTexts.register_loading : registerTexts.register_button}
          </Button>
        </Form.Item>
      </Form>

      <BottomLink>
        {registerTexts.has_account}
        <Link underline onClick={() => navigate('/login')}>
          &nbsp;{registerTexts.to_login}
        </Link>
      </BottomLink>
    </FormContainer>
  )
}

export default RegisterForm
