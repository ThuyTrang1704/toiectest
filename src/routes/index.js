import MainLayout from "../lib/layouts";
import TestLayoutUser from "../lib/layouts/layout.test";
import MainLayoutAdmin from "../lib/layouts/layouts.admin";
import MainLayoutUser from "../lib/layouts/layouts.user";
import Admin from "./admin";
import Homepage from "./hompage";
import Hello from "./test/Hello";
import Test from "./test/Test";
import User from "./user";

export const publicRoutes = [
  {
    path: "/",
    component: Homepage,
    layout: MainLayout,
  },
  {
    path: "/user",
    component: User,
    layout: MainLayoutUser,
  },
  {
    path: "/admin",
    component: Admin,
    layout: MainLayoutAdmin,
  },
  {
    path: "/test",
    component: Hello,
    layout: Test,
  },
];
