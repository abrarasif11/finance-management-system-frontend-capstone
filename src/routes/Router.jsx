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
            path: '/pricing',
            loader : () => fetch('https://api-financial-management-system.vercel.app/api/v1/financial-services'),
            element: <Pricing/>
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
    path: "/dashboard/expenses",
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
    ],
  },
]);
