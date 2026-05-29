import styled from '@emotion/styled'
import { COLOR_BG_LAYOUT, COLOR_PRIMARY, COLOR_BG_CONTAINER } from '../theme/colors'

export const DashboardShell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${COLOR_BG_LAYOUT};
`

export const DashboardBody = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

export const SidebarArea = styled.div<{ collapsed?: boolean }>`
  flex: ${({ collapsed }) => (collapsed ? '0 0 0px' : '0 0 296px')};
  overflow: hidden;
  background: ${COLOR_BG_LAYOUT};
  padding: ${({ collapsed }) => (collapsed ? '0' : '8px 0 8px 12px')};
  transition: flex 0.25s ease, padding 0.25s ease;
`

export const SidebarHandle = styled.div<{ collapsed?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ collapsed }) => (collapsed ? '6px' : '302px')};
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 40px;
  cursor: pointer;
  border-radius: 6px;
  background: rgba(26, 58, 74, 0.06);
  color: #999;
  font-size: 8px;
  z-index: 1;
  transition: left 0.25s ease, background 0.15s, color 0.15s;

  &:hover {
    background: rgba(26, 58, 74, 0.08);
    color: ${COLOR_PRIMARY};
  }
`

export const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: ${COLOR_BG_CONTAINER};
`

export const PanelArea = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  flex: 0 0 338px;
  overflow: hidden;

  @media (max-width: 1440px) {
    flex: 0 0 300px;
  }
  @media (max-width: 1366px) {
    flex: 0 0 260px;
  }
`
