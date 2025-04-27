import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
import Pricing from "../pages/Pricing/Pricing";
import PrivateRoute from "../Shared/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import Expenses from "../pages/Expenses";
import AboutUs from "../pages/AboutUs/AboutUs";
import Features from "../components/Features/Features";
import Incomes from "../pages/Incomes";
import Dashboard from "../pages/Dashboard";
import SavingsGoals from "../pages/SavingsGoals";
import Budget from "../pages/Budget";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/services",
        element: <Features />,
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
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/analytics",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/expenses",
        element: <Expenses />,
      },
      {
        path: "/dashboard/incomes",
        element: <Incomes />,
      },
      {
        path: "/dashboard/saving-goals",
        element: <SavingsGoals />,
      },
      {
        path: "/dashboard/budgets",
        element: <Budget />,
      },
    ],
  },
]);
