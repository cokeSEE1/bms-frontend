import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../pages/home'

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
    ],
  },
])

export default router
