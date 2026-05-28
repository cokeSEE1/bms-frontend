// src/pages/home/components/HomeSidebar/index.tsx
import { useEffect } from 'react'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import {
  BookOutlined,
  StarOutlined,
  HeartOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  CaretDownFilled,
} from '@ant-design/icons'
import { homeStore } from '../../../../stores/homeStore'
import { knowledgeStore } from '../../../../stores/knowledgeStore'
import home from '../../../../i18n/locales/zh-CN/home'
import { SidebarContainer, Section, SectionTitle, SubTabRow, SubTab, TreeWrapper } from './style'

function HomeSidebar() {
  useEffect(() => {
    knowledgeStore.loadDirectoryTree()
  }, [])

  const pushActive = homeStore.activePushTab
  const trajectoryActive = homeStore.activeTrajectoryTab

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>{home.sidebar.knowledgePush}</SectionTitle>
        <SubTabRow>
          <SubTab active={pushActive === 'mustread'} onClick={() => homeStore.setActivePushTab('mustread')}>
            <BookOutlined />
            {home.sidebar.mustRead}
          </SubTab>
          <SubTab active={pushActive === 'subscribe'} onClick={() => homeStore.setActivePushTab('subscribe')}>
            <StarOutlined />
            {home.sidebar.subscribe}
          </SubTab>
        </SubTabRow>
      </Section>

      <Section>
        <SectionTitle>{home.sidebar.knowledgeTrajectory}</SectionTitle>
        <SubTabRow>
          <SubTab active={trajectoryActive === 'favorite'} onClick={() => homeStore.setActiveTrajectoryTab('favorite')}>
            <HeartOutlined />
            {home.sidebar.favorite}
          </SubTab>
          <SubTab active={trajectoryActive === 'read'} onClick={() => homeStore.setActiveTrajectoryTab('read')}>
            <EyeOutlined />
            {home.sidebar.read}
          </SubTab>
        </SubTabRow>
      </Section>

      <Section>
        <SectionTitle>{home.sidebar.directory}</SectionTitle>
        <TreeWrapper>
          <Tree
            showIcon
            defaultExpandAll
            treeData={knowledgeStore.directoryTree}
            switcherIcon={<CaretDownFilled style={{ fontSize: 10 }} />}
            icon={({ expanded }) => <FolderOpenOutlined style={{ color: expanded ? '#c8a96e' : undefined }} />}
          />
        </TreeWrapper>
      </Section>
    </SidebarContainer>
  )
}

export default observer(HomeSidebar)
