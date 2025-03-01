import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import { ThemeProvider } from "./components/ThemeProvider";
import PostWithComments from "./features/posts/PostWithComments";

const router = createBrowserRouter([
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, errorElement: <ErrorPage /> },
      { path: "/profile", element: <Profile />, errorElement: <ErrorPage /> },
      { path: "/search", element: <Search />, errorElement: <ErrorPage /> },
    ],
  },

  {
    path: "/profile/:profileId",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/post/:postId",
    element: (
      <ProtectedRoute>
        <PostWithComments />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/new",
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
