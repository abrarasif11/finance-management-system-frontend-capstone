import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const DashboardHeader = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const handleLogOut = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };
  const menuItems = <li>Hello</li>;
  return (
    <nav className="sticky top-0 z-50   py-3 backdrop-blur-lg border-[#1A2C2A]">
    <div className="container px-4 mx-auto relative lg:text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-shrink-0">
          {/* <img className="h-10 w-10 mr-2" src={logo} alt="Logo" /> */}
          <a href="/">
            <span className="text-2xl font-semibold text-green-500 tracking-tight">
              BudgetBuddy
            </span>
          </a>
        </div>
        
        <div className="hidden lg:flex justify-center space-x-12 items-center">
          {user ? (
            <label tabIndex={0}>
              {
                <div className="dropdown  dropdown-end">
                  <div tabIndex={0} role="button" className=" ">
                    {" "}
                    <CircleUser
                    className=" 
                    text-green-500
                    "/>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-green-500 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                      <Link to='/dashboard/expenses'>Dashboard</Link>
                    </li>
                    <li
                    onClick={handleLogOut}
                    >
                       <a>Logout</a>
                    </li>
                  </ul>
                </div>
              }
            </label>
          ) : (
            <a
              href="/login"
              className="py-2 px-3 bg-gradient-to-r from-green-500 to-green-800 rounded-md"
            >
              Sign In
            </a>
          )}
          {/* <a
            href="/register"
            className="bg-[#3EAC91] py-2 px-3 rounded-md"
          >
            Create an account
          </a> */}
        </div>
        <div className="lg:hidden md:flex flex-col justify-end">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className="fixed right-0 z-20 bg-neutral-900 text-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
          
          <div className="flex space-x-6">
            <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a
              href="#"
              className="py-2 px-3 rounded-md bg-gradient-to-r from-green-500 to-green-800"
            >
              Create an account
            </a>
          </div>
        </div>
      )}
    </div>
  </nav>
  );
};

export default DashboardHeader;
