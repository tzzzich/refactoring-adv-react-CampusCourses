import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Root } from "./pages/root";
import { ROUTES } from "./utils/constants/router";
import Home from "./pages/home";
import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import GroupsPage from "./pages/groups";
import GroupCourses from "./pages/group-courses";
import CoursePage from "./pages/course";
import UserCoursesPage from "./pages/user-courses";
import { useEffect, useState } from "react";
import { getProfile } from "./utils/api/requests";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: ROUTES.ROOT,
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
          element: isAuthenticated ? <ProfilePage /> : <LoginPage />,
        },
        {
          path: ROUTES.GROUPS,
          element: isAuthenticated ? <GroupsPage /> : <LoginPage />,
        },
        {
          path: ROUTES.GROUP,
          element: isAuthenticated ? <GroupCourses /> : <LoginPage />,
        },
        {
          path: ROUTES.COURSE,
          element: isAuthenticated ? <CoursePage /> : <LoginPage />,
        },
        {
          path: ROUTES.MY_COURSES,
          element: isAuthenticated ? (
            <UserCoursesPage title="my" />
          ) : (
            <LoginPage />
          ),
        },
        {
          path: ROUTES.TEACHING_COURSES,
          element: isAuthenticated ? (
            <UserCoursesPage title="teaching" />
          ) : (
            <LoginPage />
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const response = await getProfile();
        console.log(response.data);
        setIsAuthenticated(response.data != undefined && response.data != null);
      } catch {
        setIsAuthenticated(false);
      }
    }
    getUserProfile();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
