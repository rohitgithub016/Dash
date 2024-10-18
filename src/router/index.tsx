import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React, { Suspense } from "react";
import Loader from "../components/Loader";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const App = React.lazy(() => import("../App"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
