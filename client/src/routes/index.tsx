import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import AuthGuard from '../guards/AuthGuard';
import Layout from '../components/shared/Layout';
import CalendarPage from '../pages/Calendar';

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
    {
      path: '/calendar',
      element: (
        <AuthGuard>
          <Layout>
            <CalendarPage />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: '/exercises',
      children: [
        {
          path: 'add',
          element: (
            <AuthGuard>
              <Layout>
                <AddExercise />
              </Layout>
            </AuthGuard>
          ),
        },
        {
          path: ':exerciseId',
          children: [
            {
              path: 'edit',
              element: (
                <AuthGuard>
                  <Layout>
                    <EditExercise />
                  </Layout>
                </AuthGuard>
              ),
            },
            {
              path: '',
              element: (
                <AuthGuard>
                  <Layout>
                    <Exercise />
                  </Layout>
                </AuthGuard>
              ),
            },
          ],
        },
      ],
    },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Home = Loadable(lazy(() => import('../pages/Home')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const AddExercise = Loadable(lazy(() => import('../pages/AddExercise')));
const Exercise = Loadable(lazy(() => import('../pages/Exercise')));
const EditExercise = Loadable(lazy(() => import('../pages/EditExercise')));
