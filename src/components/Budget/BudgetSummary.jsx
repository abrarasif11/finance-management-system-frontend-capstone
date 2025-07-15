import { useState, useEffect } from "react";
import { DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { useLoading } from "../../contexts/LoadingProvider";
import axios from "axios";
import GenericModal from "../ui/GenericModal";
import BudgetSuggestionModal from "./BudgetSuggestionModal";

const BudgetSummary = ({ budgets }) => {
  const currentDate = new Date("2025-07-14T21:47:00+06:00"); // Current date and time
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const [filterYear, setFilterYear] = useState(currentYear.toString());
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const { loading, setLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);

  // Generate unique years from budgets
  const years = Array.from(
    new Set(budgets?.map((budget) => new Date(budget.start_date).getFullYear()))
  ).sort((a, b) => a - b);

  // List of months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter budgets based on year and month
  useEffect(() => {
    const filtered = budgets.filter((budget) => {
      const budgetDate = new Date(budget.start_date);
      const budgetYear = budgetDate.getFullYear();
      const budgetMonth = budgetDate.toLocaleString("en-US", { month: "long" });
      return (
        (!filterYear || budgetYear === parseInt(filterYear)) &&
        (!filterMonth || budgetMonth === filterMonth)
      );
    });
    setFilteredBudgets(filtered);
  }, [filterYear, filterMonth, budgets]);

  const totalBudget = filteredBudgets.reduce(
    (sum, budget) => sum + budget.total_amount,
    0
  );
  const totalRemaining = filteredBudgets.reduce(
    (sum, budget) => sum + budget.remaining,
    0
  );
  const totalCompleted = filteredBudgets.filter(
    (budget) => budget.remaining <= 0
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md mb-3">
      {/* Filter Section */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <p className="text-2xl text-shadow-lg text-black font-bold">Budgets</p>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Year
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Month
              </label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {loading ? (
              <button
                className="flex items-center justify-center px-4 py-2 text-white uppercase bg-blue-400 rounded-full shadow-lg"
                disabled
              >
                Getting Suggestions ...
              </button>
            ) : (
              <button
                className="px-4 py-2 text-white uppercase bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                Get Suggestions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Total Budget Card */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">
                ৳{totalBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Remaining Card */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Remaining
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ৳{totalRemaining.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Completed Card */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Completed
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalCompleted}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Suggestions Modal */}
      <BudgetSuggestionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        budgets={budgets}
      />
    </div>
  );
};

export default BudgetSummary;
