import React from "react";
import Filters from "../components/Dashboard/Filters";
import StatsCards from "../components/Dashboard/StatsCard";
import ChartsSection from "../components/Dashboard/ChartsSection";
import RecentTransactions from "../components/Dashboard/RecentTransactions";


const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-black text-3xl font-bold mb-4">Income & Expense Dashboard</h1>

      {/* Date Filters */}
      {/* <Filters /> */}

      {/* Key Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <ChartsSection />

      {/* Recent Transactions Table */}
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
