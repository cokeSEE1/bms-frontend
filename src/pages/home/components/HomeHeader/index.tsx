// src/pages/home/components/HomeHeader/index.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined, FolderOutlined, SearchOutlined, CaretDownFilled } from '@ant-design/icons'
import { useLogout } from '../../../../service'
import home from '../../../../i18n/locales/zh-CN/home'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import logoUrl from '../../../../assets/logo.svg'
import {
  HeaderBar,
  NavTabs,
  NavTab,
  SearchWrapper,
  RightSection,
  AvatarIcon,
  VerticalDivider,
  UserDropdown,
  Username,
} from './style'

const HomeHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const username = localStorage.getItem('username') || ''

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  const { logout } = useLogout()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      navigate('/login', { replace: true })
    }
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
      <NavTabs>
        <NavTab active={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
          <img src={logoUrl} alt="" />
          {home.header.home}
        </NavTab>
        <NavTab active={isActive('/dashboard/community')} onClick={() => navigate('/dashboard/community')}>
          <FolderOutlined />
          {home.header.community}
        </NavTab>
        <NavTab active={isActive('/dashboard/personal')} onClick={() => navigate('/dashboard/personal')}>
          {home.header.personal}
        </NavTab>
      </NavTabs>

      <SearchWrapper>
        <Input
          prefix={<SearchOutlined />}
          placeholder={home.header.searchPlaceholder}
          value={homeStore.searchKeyword}
          onChange={(e) => {
            homeStore.setSearchKeyword(e.target.value)
            if (knowledgeStore.searchQuery) {
              knowledgeStore.clearSearch()
            }
          }}
          onPressEnter={() => knowledgeStore.setSearchQuery(homeStore.searchKeyword)}
          variant="borderless"
        />
      </SearchWrapper>

      <RightSection>
        <AvatarIcon>
          <UserOutlined />
        </AvatarIcon>
        <VerticalDivider />
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <UserDropdown>
            <Username>{username || '用户'}</Username>
            <CaretDownFilled style={{ fontSize: 12 }} />
          </UserDropdown>
        </Dropdown>
      </RightSection>
    </HeaderBar>
  )
}

export default HomeHeader
