import type { ThemeConfig } from 'antd'
import {
  COLOR_PRIMARY,
  COLOR_LINK,
  COLOR_BG_LAYOUT,
  COLOR_BG_CONTAINER,
  COLOR_ERROR,
  COLOR_TEXT,
  COLOR_TEXT_SECONDARY,
} from './colors'

const theme: ThemeConfig = {
  token: {
    colorPrimary: COLOR_PRIMARY,
    colorLink: COLOR_LINK,
    colorBgLayout: COLOR_BG_LAYOUT,
    colorBgContainer: COLOR_BG_CONTAINER,
    colorError: COLOR_ERROR,
    colorText: COLOR_TEXT,
    colorTextSecondary: COLOR_TEXT_SECONDARY,
    borderRadius: 6,
  },
}

export default theme
