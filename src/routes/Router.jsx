import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
//import Login from "../pages/Login/Login";
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register";
import UserProfile from "../components/UserProfile/UserProfile";
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
          path : '/login',
          element : <Login/>
        },
        {
          path : '/register',
          element : <Register/>
        },
        {
          path : '/profile/:email',
          element : <UserProfile/>
        },
      ]
    },
  ]);