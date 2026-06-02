import styled from '@emotion/styled'
import { COLOR_BG_CONTAINER, COLOR_SURFACE_COOL } from '../../../../theme/colors'

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: ${COLOR_SURFACE_COOL};
`

export const StyledInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${COLOR_BG_CONTAINER};
  overflow: hidden;
`
