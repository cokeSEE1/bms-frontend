import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authStore } from '../../../../stores/authStore'
import personal from '../../../../i18n/locales/zh-CN/personal'
import { StyledSider, StyledHeader, StyledAvatar, StyledUsername, StyledMenu, StyledMenuItem, StyledMenuIcon, StyledMenuName } from './style'

export interface PersonalSiderMenu {
  path: string
  name: string
  icon: React.ReactNode
}

const MENUS: PersonalSiderMenu[] = [
  { path: '/dashboard/personal/profile', name: personal.sider.profile, icon: <UserOutlined /> },
  { path: '/dashboard/personal/security', name: personal.sider.security, icon: <LockOutlined /> },
]

const PersonalSider = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const onClick = (menu: PersonalSiderMenu) => {
    navigate(menu.path)
  }

  return (
    <StyledSider>
      <StyledHeader>
        <StyledAvatar>
          <UserOutlined style={{ fontSize: 20 }} />
        </StyledAvatar>
        <StyledUsername>{authStore.user?.username || '用户'}</StyledUsername>
      </StyledHeader>
      <StyledMenu>
        {MENUS.map((menu) => (
          <StyledMenuItem key={menu.path} active={isActive(menu.path)} onClick={() => onClick(menu)}>
            <StyledMenuIcon>{menu.icon}</StyledMenuIcon>
            <StyledMenuName>{menu.name}</StyledMenuName>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </StyledSider>
  )
})

export default PersonalSider
