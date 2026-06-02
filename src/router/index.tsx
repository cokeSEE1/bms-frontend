import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../pages/home'
import DirectoryDetailPage from '../pages/directory-detail'
import KnowledgeDetailPage from '../pages/knowledge-detail'
import KnowledgeNewPage from '../pages/knowledge-new'
import PersonalPage from '../pages/personal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/knowledge/new',
    element: <KnowledgeNewPage />,
  },
  {
    path: '/knowledge/:knowledgeId',
    element: <KnowledgeDetailPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'directory/:dirId',
        element: <DirectoryDetailPage />,
      },
      {
        path: 'personal/*',
        element: <PersonalPage />,
      },
    ],
  },
])

export default router
