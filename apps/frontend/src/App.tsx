import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import ErrorFallback from "./components/ErrorFallback";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import { ThemeProvider } from "./components/ThemeProvider";
import PostWithComments from "./features/posts/PostWithComments";

const router = createBrowserRouter([
  { path: "/login", element: <Login />, errorElement: <ErrorFallback /> },

  {
    element: (
      <ProtectedRoute>
        <AppLayout showAvatar showFooterNavbar />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/search", element: <Search /> },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <AppLayout showBackButton />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "/profile/:profileId", element: <Profile /> },
      { path: "/post/:postId", element: <PostWithComments /> },
    ],
  },

  {
    path: "/new",
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global default of 20 seconds
      staleTime: 1000 * 20,

      // Error Boundaries cannot catch async errors because they don't
      // occur during rendering. So, React Query can catch errors and
      // rethrow in the next render cycle for Error Boundary to pick up.

      // Note: React Router's errorElement CAN catch async errors. But
      // only those thrown in loaders and actions. NOT from React Query.
      // throwOnError enables React Router to catch these as well.
      throwOnError: true,
    },
  },

  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
        console.error(error);
      }
    },
  }),
});

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
