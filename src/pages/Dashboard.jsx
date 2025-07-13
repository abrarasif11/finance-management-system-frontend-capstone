import { useEffect, useState } from "react";
import StatsCards from "../components/DashboardHome/StatsCard";
import ChartsSection from "../components/DashboardHome/ChartsSection";
import RecentTransactions from "../components/DashboardHome/RecentTransactions";
import { useUser } from "../contexts/AuthContext";
import {
  calculateAverageMonthlyExpense,
  calculateAverageMonthlyIncome,
} from "../utils/totalAmount";
import axios from "axios";
import { sortByDate } from "../utils/sorter";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingProvider";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SavingsTrendChart from "../components/DashboardHome/SavingsTrendChart";
import CumulativeLoanProgressChart from "../components/DashboardHome/CumulativeLoanProgressChart";
import InvestmentBarChart from "../components/DashboardHome/InvestmentBarChart";

const Dashboard = () => {
  const { user } = useUser();
  const { loading, setLoading } = useLoading();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loans, setLoans] = useState([]);
  const [investments, setInvestments] = useState([]);

  const USERS_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses/user/${user?.user?.id}`;

  const USERS_INCOMES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes/user/${user?.user?.id}`;

  const USERS_SAVINGS_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/savings-goals/user/${user?.user?.id}`;

  const USERS_LOANS_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/loans/user/${user?.user?.id}`;

  const USERS_INVESTMENTS_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/investments/user/${user?.user?.id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const expenses = await axios.get(USERS_EXPENSES_API_URL);
        const incomes = await axios.get(USERS_INCOMES_API_URL);
        const savings = await axios.get(USERS_SAVINGS_API_URL);
        const loans = await axios.get(USERS_LOANS_API_URL);
        const investments = await axios.get(USERS_INVESTMENTS_API_URL);

        setExpenses(expenses?.data?.data);
        setIncomes(incomes?.data?.data);
        setSavings(savings?.data?.data);
        setLoans(loans?.data?.data);
        setInvestments(investments?.data?.data);
      } catch (error) {
        toast.error("Something went wrong! Please wait");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const averageIncome = calculateAverageMonthlyIncome(incomes);
  const averageExpense = calculateAverageMonthlyExpense(expenses);

  const recentTransactions = [...expenses, ...incomes];
  const transactionsSortedByDate = sortByDate(recentTransactions);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Key Stats Cards */}
          <StatsCards props={{ averageIncome, averageExpense }} />

          {/* Charts Section */}
          <ChartsSection props={{ incomes, expenses }} />

          {/* Recent Transactions Table */}
          <RecentTransactions
            props={{ transactions: transactionsSortedByDate }}
          />

          {/* Savings Trend Chart */}
          <div className="grid grid-cols-2 gap-4">
            <SavingsTrendChart savingsData={savings} />
            <CumulativeLoanProgressChart loans={loans} />
          </div>

          <div>
            <InvestmentBarChart data={investments} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
