import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "../../lib/components/Loader";

import Homepage from "../hompage";
import MainLayoutAdmin from "../../lib/layouts/layouts.admin";
import CreateUser from "../admin/User/createUser";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import DialogLogin from "../hompage/DialogLogin";
import Login from "../hompage/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Suspense fallback={<Loader />}>
          <Homepage />
        </Suspense>
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login></Login>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <PrivateRoute allowedRoles={["Role_Admin"]}>
        <Suspense fallback={<Loader />}>
          <MainLayoutAdmin />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <CreateUser />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
