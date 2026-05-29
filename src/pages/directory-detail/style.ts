// src/pages/directory-detail/style.ts
import styled from '@emotion/styled'
import { COLOR_BG_LAYOUT } from '../../theme/colors'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

export const PageBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: ${COLOR_BG_LAYOUT};
  border-radius: 12px;
`
