import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from "./utils/pagePath";
import PublicRoute from "./auth-routes/PublicRoute";
import PrivateRoute from "./auth-routes/PrivateRoute";
import Login from "./pages/Login/Login";
import PreLogin from "./layouts/PreLogin/PreLogin";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Dashboard from "./pages/OtherPages/Dashboard";
import MyTeam from "./pages/OtherPages/MyTeam";
import MyTask from "./pages/MyTask/MyTask";
import Billing from "./pages/OtherPages/Billing";
import Settings from "./pages/OtherPages/Settings";

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
    element: <PrivateRoute component={<AppLayout />} />,
    children: [
      {
        path: PATH.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PATH.MYTEAM,
        element: <MyTeam />,
      },
      {
        path: PATH.MYTASK,
        element: <MyTask />,
      },
      {
        path: PATH.BILLING,
        element: <Billing />,
      },
      {
        path: PATH.SETTINGS,
        element: <Settings />,
      },
    ],
  },
]);
