import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
//import Login from "../pages/Login/Login";
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
import Pricing from "../pages/Pricing/Pricing";
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/pricing',
            loader : () => fetch('https://api-financial-management-system.vercel.app/api/v1/financial-services'),
            element: <Pricing/>
        },
        {
          path : '/login',
          element : <Login/>
        },
        {
          path : '/register',
          element : <Register/>
        },
        {
          path : '/profile',
          element : <UserProfile/>
        },
      ]
    },
  ]);