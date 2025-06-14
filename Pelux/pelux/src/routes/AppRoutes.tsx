import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import OverlayPage from '../pages/OverlayPage'; // <-- LA LIGNE MANQUANTE ETAIT ICI

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Route non protégée
      {
        path: '/login',
        element: <LoginPage />,
      },
      
      // --- Routes protégées ---
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profil',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Route PUBLIQUE pour l'overlay, SANS le MainLayout
  {
    path: '/overlay/:userId',
    element: <OverlayPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;