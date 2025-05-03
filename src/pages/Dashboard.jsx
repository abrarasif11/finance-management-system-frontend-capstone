import React, { useEffect, useState } from "react";
import StatsCards from "../components/DashboardHome/StatsCard";
import ChartsSection from "../components/DashboardHome/ChartsSection";
import RecentTransactions from "../components/DashboardHome/RecentTransactions";
import { useUser } from "../contexts/AuthContext";
import { getTotalOfRecords } from "../utils/totalAmount";
import axios from "axios";
import { sortByDate } from "../utils/sorter";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingProvider";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Dashboard = () => {
  const { user } = useUser();
  const { loading, setLoading } = useLoading();
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
      try {
        setLoading(true);
        const expenses = await axios.get(USERS_EXPENSES_API_URL);
        const incomes = await axios.get(USERS_INCOMES_API_URL);

        setExpenses(expenses?.data?.data);
        setIncomes(incomes?.data?.data);
      } catch (error) {
        toast.error("Something went wrong! Please wait");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalExpenses = getTotalOfRecords(expenses);
  const totalIncomes = getTotalOfRecords(incomes);

  const recentTransactions = [...expenses, ...incomes];
  const transactionsSortedByDate = sortByDate(recentTransactions);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
          <RecentTransactions
            props={{ transactions: transactionsSortedByDate }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
