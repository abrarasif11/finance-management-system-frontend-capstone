import React from "react";
import DashboardHeader from "../Shared/Header/DashboardHeader";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
          <ul className="menu p-4 w-80 min-h-full text-lg bg-[#6e7482] mt-20 lg:mt-0 lg:">
            <li>
              <Link
                className="bg-white rounded-sm text-black active:text-white"
                to="/dashboard/expenses"
              >
                Expenses
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
