// src/pages/home/components/HomeSidebar/style.ts
import styled from '@emotion/styled'
import { COLOR_TEXT, COLOR_PRIMARY } from '../../../../theme/colors'

export const SidebarContainer = styled.aside`
  padding: 20px 16px;
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR_TEXT};
  margin-bottom: 12px;
`

export const SubTabRow = styled.div`
  display: flex;
  gap: 8px;
`

export const SubTab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? COLOR_PRIMARY : COLOR_TEXT)};
  background: ${({ active }) => (active ? 'rgba(26, 58, 74, 0.08)' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    color: ${COLOR_PRIMARY};
    background: rgba(26, 58, 74, 0.06);
  }
`

export const TreeWrapper = styled.div`
  .ant-tree {
    background: transparent;
    font-size: 13px;
    color: ${COLOR_TEXT};

    .ant-tree-node-content-wrapper {
      padding: 2px 4px;
    }

    .ant-tree-title {
      font-size: 13px;
    }
  }
`
