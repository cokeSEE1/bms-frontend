// src/pages/home/components/HomeHeader/index.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Avatar, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import home from '../../../../i18n/locales/zh-CN/home'
import { homeStore } from '../../../../stores/homeStore'
import {
  HeaderBar,
  LeftSection,
  Logo,
  NavTabs,
  NavTab,
  SearchWrapper,
  RightSection,
} from './style'

function HomeHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: home.header.logout,
      onClick: handleLogout,
    },
  ]

  return (
    <HeaderBar>
      <LeftSection>
        <Logo>KMS</Logo>
        <NavTabs>
          <NavTab active={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
            {home.header.home}
          </NavTab>
          <NavTab active={isActive('/dashboard/community')} onClick={() => navigate('/dashboard/community')}>
            {home.header.community}
          </NavTab>
          <NavTab active={isActive('/dashboard/personal')} onClick={() => navigate('/dashboard/personal')}>
            {home.header.personal}
          </NavTab>
        </NavTabs>
      </LeftSection>

      <SearchWrapper>
        <Input.Search
          placeholder={home.header.searchPlaceholder}
          value={homeStore.searchKeyword}
          onChange={(e) => homeStore.setSearchKeyword(e.target.value)}
          onSearch={() => {}}
        />
      </SearchWrapper>

      <RightSection>
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <Avatar size="small" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </RightSection>
    </HeaderBar>
  )
}

export default HomeHeader
