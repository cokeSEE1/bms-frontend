import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, App } from 'antd'
import { authStore } from '../../../../stores/authStore'
import personal from '../../../../i18n/locales/zh-CN/personal'
import PersonalContent from '../../components/PersonalContent'

interface SecurityForm {
  old_password: string
  new_password: string
  confirm_password: string
}

const SecurityPage = observer(() => {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const [form] = Form.useForm<SecurityForm>()

  const onFinish = async (values: SecurityForm) => {
    if (values.new_password !== values.confirm_password) {
      message.warning(personal.security.passwordMismatch)
      return
    }
    try {
      await authStore.changePassword({
        old_password: values.old_password,
        new_password: values.new_password,
      })
      message.success(personal.security.success)
      form.resetFields()
      authStore.logout()
      navigate('/login', { replace: true })
    } catch {
      message.error(personal.security.oldPasswordError)
    }
  }

  return (
    <PersonalContent title={personal.security.title}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={{ maxWidth: 650 }} onFinish={onFinish}>
        <Form.Item label={personal.security.oldPassword} name="old_password" rules={[{ required: true, message: personal.security.oldPasswordRequired }]}>
          <Input.Password placeholder={personal.security.oldPasswordRequired} />
        </Form.Item>
        <Form.Item label={personal.security.newPassword} name="new_password" rules={[{ required: true, message: personal.security.newPasswordRequired }]}>
          <Input.Password placeholder={personal.security.newPasswordRequired} />
        </Form.Item>
        <Form.Item label={personal.security.confirmPassword} name="confirm_password" rules={[{ required: true, message: personal.security.confirmPasswordRequired }]}>
          <Input.Password placeholder={personal.security.confirmPasswordRequired} />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            {personal.security.submit}
          </Button>
        </Form.Item>
      </Form>
    </PersonalContent>
  )
})

export default SecurityPage
