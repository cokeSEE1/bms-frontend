import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'

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
    path: '/dashboard',
    element: <DashboardPage />,
  },
])

export default router
