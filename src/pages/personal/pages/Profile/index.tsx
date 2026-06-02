import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Descriptions } from 'antd'
import { authStore } from '../../../../stores/authStore'
import personal from '../../../../i18n/locales/zh-CN/personal'
import PersonalContent from '../../components/PersonalContent'

const ProfilePage = observer(() => {
  useEffect(() => {
    if (!authStore.user || authStore.user.id === 0) {
      authStore.fetchMe()
    }
  }, [])

  return (
    <PersonalContent title={personal.profile.title}>
      <Descriptions column={1} bordered size="middle" style={{ maxWidth: 600 }}>
        <Descriptions.Item label={personal.profile.id}>{authStore.user?.id}</Descriptions.Item>
        <Descriptions.Item label={personal.profile.username}>{authStore.user?.username}</Descriptions.Item>
        <Descriptions.Item label={personal.profile.createdAt}>{authStore.user?.created_at}</Descriptions.Item>
      </Descriptions>
    </PersonalContent>
  )
})

export default ProfilePage
