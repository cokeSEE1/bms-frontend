import { Outlet } from 'react-router-dom'
import HomeHeader from '../pages/home/components/HomeHeader'
import HomeSidebar from '../pages/home/components/HomeSidebar'
import { DashboardShell, DashboardBody, SidebarArea, MainArea } from '../styles/layout'

function DashboardLayout() {
  return (
    <DashboardShell>
      <HomeHeader />
      <DashboardBody>
        <SidebarArea>
          <HomeSidebar />
        </SidebarArea>
        <MainArea>
          <Outlet />
        </MainArea>
      </DashboardBody>
    </DashboardShell>
  )
}

export default DashboardLayout
