import React, { useEffect, useState } from "react";
import Filters from "../components/Dashboard/Filters";
import StatsCards from "../components/Dashboard/StatsCard";
import ChartsSection from "../components/Dashboard/ChartsSection";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import { useUser } from "../contexts/AuthContext";
import { getTotalOfRecords } from "../utils/totalAmount";
import axios from "axios";
import { sortByDate } from "../utils/sorter";

const Dashboard = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const USERS_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}`;

  const USERS_INCOMES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes?user_id=${user?.user?.id}`;

  useEffect(() => {
    const fetchData = async () => {
      const expenses = await axios.get(USERS_EXPENSES_API_URL);
      const incomes = await axios.get(USERS_INCOMES_API_URL);

      setExpenses(expenses?.data?.data);
      setIncomes(incomes?.data?.data);
    };
    fetchData();
  }, []);

  const totalExpenses = getTotalOfRecords(expenses);
  const totalIncomes = getTotalOfRecords(incomes);

  const recentTransactions = [...expenses, ...incomes];
  const transactionsSortedByDate = sortByDate(recentTransactions);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-black text-3xl font-bold mb-4">
        Income & Expense Dashboard
      </h1>

      {/* Date Filters */}
      {/* <Filters /> */}

      {/* Key Stats Cards */}
      <StatsCards props={{ totalExpenses, totalIncomes }} />

      {/* Charts Section */}
      <ChartsSection props={{ incomes, expenses }} />

      {/* Recent Transactions Table */}
      <RecentTransactions props={{ transactions: transactionsSortedByDate }} />
    </div>
  );
};

export default Dashboard;
