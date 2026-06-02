import { Route, Routes, Navigate } from 'react-router-dom'
import PersonalLayout from './components/PersonalLayout'
import ProfilePage from './pages/Profile'
import SecurityPage from './pages/Security'

const PersonalPage = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route index element={<Navigate to="profile" replace />} />
      </Route>
    </Routes>
  )
}

export default PersonalPage
