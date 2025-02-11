import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { navItems } from "../../components/constants/index";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
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
      {!user ? (
        <li className="font-medium btn-hidden px-2 py-0 bg-[#EF4E5D] rounded-badge font-poppins text-white">
          <Link to="/login">Login</Link>
        </li>
      ) : (
        <>
          <li className="font-medium font-poppins text-white">
            <button onClick={handleLogOut}>Logout</button>
          </li>
          <div
            className="tooltip ml-4 mb-1 lg:tooltip-left md:tooltip-right mt-1 dropdown dropdown-bottom dropdown-end"
            data-tip={user.displayName || "Profile"}
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
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50   py-3 backdrop-blur-lg border-[#1A2C2A]">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            {/* <img className="h-10 w-10 mr-2" src={logo} alt="Logo" /> */}
            <a href="/">
            <span className="text-xl text-[#3EAC91] tracking-tight">FMS</span>
            </a>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="/login"  className="py-2 px-3 border bg-[#3EAC91]  rounded-md">
              Sign In
            </a>
            {/* <a
              href="/register"
              className="bg-[#3EAC91] py-2 px-3 rounded-md"
            >
              Create an account
            </a> */}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 text-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-[#3EAC91]"
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

export default Header;
