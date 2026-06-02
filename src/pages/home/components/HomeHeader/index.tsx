// src/pages/home/components/HomeHeader/index.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { Input, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined, FolderOutlined, SearchOutlined, CaretDownFilled } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import home from '../../../../i18n/locales/zh-CN/home'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import { authStore } from '../../../../stores/authStore'
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

const HomeHeader = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const username = authStore.user?.username || ''

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await authStore.logout()
      navigate('/login', { replace: true })
    } catch {
      // API call failed, but still clear local state
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
          onPressEnter={() => knowledgeStore.searchByKeyword(homeStore.searchKeyword)}
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
})

export default HomeHeader
