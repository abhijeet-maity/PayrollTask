import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from "./utils/pagePath";
import PublicRoute from "./auth-routes/PublicRoute";
import Login from "./pages/Login/Login";
import PreLogin from "./layouts/PreLogin/PreLogin";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: PATH.DEFAULT,
    element: <Navigate to={PATH.LOGIN} />,
  },
  {
    element: <PublicRoute component={<PreLogin />} />,
    children: [
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    element: <PublicRoute component={<AppLayout />} />,
    children: [
      {
        path: PATH.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
]);
