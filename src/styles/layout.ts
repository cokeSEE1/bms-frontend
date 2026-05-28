import styled from '@emotion/styled'
import { COLOR_BG_LAYOUT, COLOR_BG_CONTAINER } from '../theme/colors'

export const DashboardShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${COLOR_BG_LAYOUT};
`

export const DashboardBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

export const SidebarArea = styled.div`
  flex: 0 0 280px;
  overflow-y: auto;
  background: ${COLOR_BG_CONTAINER};
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`

export const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px;
`
