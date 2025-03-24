import React from "react";
import DashboardHeader from "../Shared/Header/DashboardHeader";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const links = [
    {
      title: "Dashboard",
      to: "/dashboard/analytics",
    },
    {
      title: "Expenses",
      to: "/dashboard/expenses",
    },
    {
      title: "Incomes",
      to: "/dashboard/incomes",
    },
  ];
  return (
    <div>
      <DashboardHeader />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-5 overflow-y-auto">
          <Outlet />
        </div>
        <div className="drawer-side h-screen overflow-y-scroll">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay lg:hidden"
          ></label>
          <ul className="menu p-4 w-60 min-h-full text-lg bg-[#36454F] mt-20 lg:mt-0 lg:">
            {links.map((link, i) => (
              <li key={i} className="mb-3">
                <NavLink
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-1 ${
                      isActive
                        ? "text-green-500 bg-white"
                        : "bg-gray-500 text-white"
                    }`
                  }
                  to={link.to}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
