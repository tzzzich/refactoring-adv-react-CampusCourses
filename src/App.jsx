import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Root } from './routes/root';
import { ROUTES } from './utils/constants/router';  
import Home from './routes/home';
import RegistrationPage from './routes/registration';
import LoginPage from './routes/login';
import ProfilePage from './routes/profile';
import GroupsPage from './routes/groups';
import GroupDetail from './routes/group-detail';

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
        element: <GroupDetail />
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
