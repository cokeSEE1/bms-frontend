import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import HomeHeader from '../pages/home/components/HomeHeader'
import HomeSidebar from '../pages/home/components/HomeSidebar'
import { RankingPanel } from '../pages/home'
import { homeStore } from '../stores/homeStore'
import { DashboardShell, DashboardBody, SidebarArea, SidebarHandle, MainArea, PanelArea } from '../styles/layout'

const DashboardLayout = observer(() => {
  const rankingVisible = false

  return (
    <DashboardShell>
      <HomeHeader />
      <DashboardBody>
        <SidebarArea collapsed={homeStore.sidebarCollapsed}>
          <HomeSidebar collapsed={homeStore.sidebarCollapsed} />
        </SidebarArea>
        <MainArea>
          <Outlet />
        </MainArea>
        <PanelArea visible={rankingVisible}>
          <RankingPanel />
        </PanelArea>
        <SidebarHandle collapsed={homeStore.sidebarCollapsed} onClick={() => homeStore.toggleSidebar()}>
          {homeStore.sidebarCollapsed ? <RightOutlined /> : <LeftOutlined />}
        </SidebarHandle>
      </DashboardBody>
    </DashboardShell>
  )
})

export default DashboardLayout
