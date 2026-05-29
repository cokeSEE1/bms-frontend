import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../pages/home'
import DirectoryDetailPage from '../pages/directory-detail'

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
    ],
  },
])

export default router
