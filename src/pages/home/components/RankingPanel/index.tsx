// src/pages/home/components/RankingPanel/index.tsx
// import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
// import { rankingStore } from '../../../../stores/rankingStore'
// import home from '../../../../i18n/locales/zh-CN/home'
// import type { RankUser } from '../../../../service/home'
// import medalStudyIcon from '../../../../assets/icons/medal-study.svg'
// import medalOriginalIcon from '../../../../assets/icons/medal-original.svg'
// import medalHotIcon from '../../../../assets/icons/medal-hot.svg'
// import {
//   PanelContainer,
//   StarSection,
//   StarHeader,
//   StarTitle,
//   StarLink,
//   StarContent,
//   RankItem,
//   MedalIcon,
//   RankInfo,
//   RankName,
//   RankDept,
//   RankCount,
//   NotifSection,
//   NotifHeader,
//   NotifTitle,
//   NotifList,
//   NotifItem,
//   NotifInner,
//   NotifText,
//   NotifInfo,
// } from './style'
//
// const MEDAL_ICONS: Record<string, string> = {
//   studyStar: medalStudyIcon,
//   originalStar: medalOriginalIcon,
//   hotStar: medalHotIcon,
// }
//
// const RANK_SECTIONS: { key: 'studyStars' | 'originalStars' | 'hotStars'; title: string }[] = [
//   { key: 'studyStars', title: home.ranking.studyStar },
//   { key: 'originalStars', title: home.ranking.originalStar },
//   { key: 'hotStars', title: home.ranking.hotStar },
// ]
//
// const RankUserItem = React.memo(({ user, sectionKey }: { user: RankUser; sectionKey: string }) => {
//   return (
//     <RankItem>
//       <MedalIcon src={MEDAL_ICONS[sectionKey]} alt="" />
//       <RankInfo>
//         <RankName>{user.name}</RankName>
//         <RankDept>{user.department}</RankDept>
//       </RankInfo>
//       <RankCount>{user.count}</RankCount>
//     </RankItem>
//   )
// })

const RankingPanel = () => {
  // useEffect(() => {
  //   rankingStore.loadAll()
  // }, [])

  // 本期先不做知识之星和消息通知，暂时隐藏整个面板
  // return (
  //   <PanelContainer>
  //     <StarSection>
  //       <StarHeader>
  //         <StarTitle>{home.ranking.knowledgeStar}</StarTitle>
  //         <StarLink>{home.ranking.learnMore}</StarLink>
  //       </StarHeader>
  //       <StarContent>
  //         {RANK_SECTIONS.map((section) => {
  //           const users = rankingStore[section.key]
  //           if (users.length === 0) return null
  //           return (
  //             <RankUserItem
  //               key={section.key}
  //               user={users[0]}
  //               sectionKey={section.key}
  //             />
  //           )
  //         })}
  //       </StarContent>
  //     </StarSection>
  //
  //     <NotifSection>
  //       <NotifHeader>
  //         <NotifTitle>{home.ranking.notification}</NotifTitle>
  //         <StarLink>{home.ranking.viewAll}</StarLink>
  //       </NotifHeader>
  //       <NotifList>
  //         {rankingStore.notifications.map((item) => (
  //           <NotifItem key={item.id}>
  //             <NotifInner>
  //               <NotifText isRead={item.isRead}>{item.title}</NotifText>
  //             </NotifInner>
  //             <NotifInfo>{item.time}</NotifInfo>
  //           </NotifItem>
  //         ))}
  //       </NotifList>
  //     </NotifSection>
  //   </PanelContainer>
  // )

  return null
}

export default observer(RankingPanel)
