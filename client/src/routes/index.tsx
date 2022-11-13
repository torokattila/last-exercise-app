import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import AuthGuard from '../guards/AuthGuard';
import Layout from '../components/shared/Layout';

export default function Router(): React.ReactElement | null {
  return useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Login />,
    },
    {
      path: '',
      element: (
        <AuthGuard>
          <Layout>
            <Home />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: '/profile',
      element: (
        <AuthGuard>
          <Layout>
            <Profile />
          </Layout>
        </AuthGuard>
      ),
    },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Home = Loadable(lazy(() => import('../pages/Home')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
