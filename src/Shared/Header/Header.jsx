import { Link } from "react-router-dom";
import React from 'react';

const Header = () => {
  // const { user, logOut } = useContext(AuthContext);
  // const [isAdmin] = useAdmin(user?.email)
  // const navigate = useNavigate();
  // const handleLogOut = () => {
  //   logOut(navigate);
  // };
  const menuItems = (
    <>
        <li className="font-medium font-poppins text-center text-white">
          <Link to="/appointment">Pricing</Link>
        </li>
        <li className="font-medium font-poppins text-white">
          <Link to="/service">About Us</Link>
        </li>
        <li className="font-medium font-poppins text-white">
          <Link to="/testimonial">Contact Us</Link>
        </li>
        <li className="font-medium btn-hidden px-2 py-0 bg-[#DFE2E7]  rounded-badge font-poppins text-black">
          <Link to="/login">Login</Link>
        </li>
      
      {/* {isAdmin && (
        <li className="font-medium font-poppins text-white"
        >
          <Link
            to="/dashboard" >
            Dashboard
          </Link>
        </li>
      )}
      {user?.uid ? (
        <li
          className="font-medium font-poppins text-white"
          onClick={handleLogOut}
        >
          <button>Logout</button>
        </li>
      ) : (
        <li className="font-medium font-poppins text-white">
          <Link to="/login">Login</Link>
        </li>
      )}
      {user?.uid && (
        <div
          className="tooltip ml-4 mb-1 lg:tooltip-left md:tooltip-right mt-1 dropdown dropdown-bottom dropdown-end"
          data-tip={user?.displayName}
        >
          <label tabIndex={0}>
            {

              user?.photoURL ?
                <img
                  className="w-[36px] h-[36px] rounded-full mr-5"
                  src={user?.photoURL}
                  alt=""
                />
                :
                <FaUserCircle className=" w-[30px] mt-1 mr-2 h-[40px]"></FaUserCircle>
            }

          </label>

        </div>
      )} */}
    </>
  );

  return (
    <div className="navbar bg-[#3D3CF9] flex justify-between">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#3D3CF9] rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <div className="flex  items-center">

          <Link
            to="/"
            className="btn btn-ghost text-white font-poppins font-semibold normal-case text-2xl"
          >
            FMS
          </Link>
        </div>
      </div>


      <div className=" navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>

    </div>
  );
};

export default Header;
