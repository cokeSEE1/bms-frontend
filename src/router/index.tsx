import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import RegisterPage from '../pages/register'

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
    element: <DashboardPage />,
  },
])

export default router
