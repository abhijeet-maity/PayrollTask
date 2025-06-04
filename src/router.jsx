import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from "./utils/pagePath";
import PublicRoute from "./auth-routes/PublicRoute";
import PrivateRoute from "./auth-routes/PrivateRoute";
import ErrorBoundary from "./components/CommonComponents/ErrorBoundary";
import { CircularProgress } from "@mui/material";
// import Login from "./pages/Login/Login";
// import PreLogin from "./layouts/PreLogin/PreLogin";
// import AppLayout from "./layouts/AppLayout/AppLayout";
// import Dashboard from "./pages/OtherPages/Dashboard";
// import MyTeam from "./pages/OtherPages/MyTeam";
// import MyTask from "./pages/MyTask/MyTask";
// import Billing from "./pages/OtherPages/Billing";
// import Settings from "./pages/OtherPages/Settings";

//Lazy Layouts
const PreLogin = lazy(() => import("./layouts/PreLogin/PreLogin"));
const AppLayout = lazy(() => import("./layouts/AppLayout/AppLayout"));

// Pages
const Login = lazy(() => import("./pages/Login/Login"));
const Dashboard = lazy(() => import("./pages/OtherPages/Dashboard"));
const MyTeam = lazy(() => import("./pages/OtherPages/MyTeam"));
const MyTask = lazy(() => import("./pages/MyTask/MyTask"));
const Billing = lazy(() => import("./pages/OtherPages/Billing"));
const Settings = lazy(() => import("./pages/OtherPages/Settings"));

const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size="3rem" />
      </div>
    }
  >
    <ErrorBoundary>{Component}</ErrorBoundary>
  </Suspense>
);


export const router = createBrowserRouter([
  {
    path: PATH.DEFAULT,
    element: <Navigate to={PATH.LOGIN} />,
  },
  {
    element: withSuspense(<PublicRoute component={<PreLogin />} />),
    children: [
      {
        path: PATH.LOGIN,
        element: withSuspense(<Login />),
      },
    ],
  },
  {
    element: withSuspense(<PrivateRoute component={<AppLayout />} />),
    children: [
      {
        path: PATH.DASHBOARD,
        element: withSuspense(<Dashboard />),
      },
      {
        path: PATH.MYTEAM,
        element: withSuspense(<MyTeam />),
      },
      {
        path: PATH.MYTASK,
        element: withSuspense(<MyTask />),
      },
      {
        path: PATH.BILLING,
        element: withSuspense(<Billing />),
      },
      {
        path: PATH.SETTINGS,
        element: withSuspense(<Settings />),
      },
    ],
  },
]);
