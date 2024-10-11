import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className=" mx-auto navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm text-lg font-semibold  dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a className="text-lg font-semibold font-poppins ">Pricing</a></li>
            <li>
              <a className="text-lg font-semibold">About Us</a>
            </li>
            <li><a className="text-lg font-semibold">Contact Us</a></li>
          </ul>
        </div>
        <Link
        to="/"
          className="btn btn-ghost text-lg font-semibold ">FMS
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
       
      <Link
        to="/"
          className="btn btn-ghost text-lg font-semibold ">Pricing
        </Link>
        <Link
        to="/"
          className="btn btn-ghost text-lg font-semibold ">Contact
        </Link>
        <Link
        to="/"
          className="btn btn-ghost text-lg font-semibold ">About Us
        </Link>
        
      </div>
      <div className="navbar-end gap-4">
        <Link
          to="/"
          className="px-3 py-1 text-lg font-semibold font-poppins border rounded-badge border-black">Register
        </Link>
        <Link
          to="/login"
          className="px-3 py-1  text-lg font-semibold font-poppins border rounded-badge bg-[#DFE2E7] ">Log In
        </Link>
      </div>
    </div>
  );
};

export default Header;
