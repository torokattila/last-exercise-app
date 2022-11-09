import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import AuthGuard from '../guards/AuthGuard';

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
          <Home />
        </AuthGuard>
      ),
    },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Home = Loadable(lazy(() => import('../pages/Home')));
