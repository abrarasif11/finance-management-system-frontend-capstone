import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
//import Login from "../pages/Login/Login";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
import Pricing from "../pages/Pricing/Pricing";
import PrivateRoute from "../Shared/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Expenses from "../pages/Expenses";
import Incomes from "../pages/Incomes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/expenses",
        element: <Expenses />,
      },
      {
        path: "/dashboard/incomes",
        element: <Incomes />,
      },
    ],
  },
]);
