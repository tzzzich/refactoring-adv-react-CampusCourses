import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Root } from './pages/root';
import { ROUTES } from './utils/constants/router';  
import Home from './pages/home';
import RegistrationPage from './pages/registration';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import GroupsPage from './pages/groups';
import GroupCourses from './pages/group-courses';

const router = createBrowserRouter([
  {
    path:  ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <Home />,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.GROUPS,
        element: <GroupsPage />,
      },
      {
        path: ROUTES.GROUP,
        element: <GroupCourses />
      },
    ],
  },
  
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
