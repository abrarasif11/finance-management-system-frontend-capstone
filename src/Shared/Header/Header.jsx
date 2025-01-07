import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  const menuItems = (
    <>
      <li className="font-medium font-poppins text-center text-white">
        <Link to="/pricing">Pricing</Link>
      </li>
      <li className="font-medium font-poppins text-white">
        <Link to="/service">About Us</Link>
      </li>
      <li className="font-medium font-poppins text-white">
        <Link to="/testimonial">Contact Us</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#21304E] flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn text-white btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#21304E] rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <div className="flex items-center">
          <Link
            to="/"
            className="btn btn-ghost text-white font-poppins font-semibold normal-case text-2xl"
          >
            FMS
          </Link>
        </div>
      </div>

      <div className="navbar-start hidden lg:flex lg:justify-between">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        {!user ? (
          <Link
            to="/login"
            className="font-medium btn-hidden px-5 py-2  bg-[#EF4E5D] hover:bg-[#ef3648] rounded-badge font-poppins text-white"
          >
            Login
          </Link>
        ) : (
          <>
            <div
              className="tooltip ml-4 mb-1 lg:tooltip-left md:tooltip-right mt-1 dropdown dropdown-bottom dropdown-end"
              data-tip={user.displayName || "Profile"}
            >
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="m-1 flex items-center"
                >
                  <label tabIndex={0}>
                    {user.photoURL ? (
                      <img
                        className="w-[36px] h-[36px] rounded-full"
                        src={user.photoURL}
                        alt="Profile"
                      />
                    ) : (
                      <FaUserCircle className="w-[30px] h-[30px] text-white" />
                    )}
                  </label>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li className="font-medium font-poppins text-black">
                    <Link to={"/dashboard/expenses"}>Dashboard</Link>
                  </li>
                  <li>
                    <button
                      className="font-medium font-poppins text-black"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
