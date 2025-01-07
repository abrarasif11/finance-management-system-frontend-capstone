import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AddExpensesModal from "./AddExpensesModal";
import { FaFilter } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/AuthContext";

// Register components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ExpenseDashboard = () => {
  const { user } = useUser();

  // State to manage filter
  const [selectedRange, setSelectedRange] = useState(30);
  const [filterOpen, setFilterOpen] = useState(false);

  const EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}&days=${selectedRange}`;

  const { data: expenses = [], isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await fetch(EXPENSES_API_URL);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data.data;
    },
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });
  console.log(expenses);

  // Prepare chart data
  const categoryData = {
    labels: ["Food", "Utilities", "Health"],
    datasets: [
      {
        data: [230, 300, 50],
        backgroundColor: ["#f97316", "#60a5fa", "#34d399"],
      },
    ],
  };

  //   Monthly Bar Data
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [5800, 6770, 1200, 5000, 4000],
        backgroundColor: "#9333ea",
      },
    ],
  };

  // Function to filter expenses by date range
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const filterExpenses = (days) => {
    const today = new Date();
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const timeDifference = (today - expenseDate) / (1000 * 60 * 60 * 24);
      return timeDifference <= days;
    });
    setFilteredExpenses(filtered);
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    const days = parseInt(e.target.value);
    setSelectedRange(days);
    filterExpenses(days);
    setFilterOpen(false); // Close dropdown after selection
  };
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Category-wise Expenses</h2>
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={categoryData} />
          </div>
        </div>
        {/* Bar Chart */}
        <div className="rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
          <div>
            <Bar data={monthlyData} />
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="rounded-xl shadow-xl p-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
            {/* Filter Icon and Dropdown */}
            <div className="relative">
              <button
                className="text-secondary text-lg mb-3"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FaFilter />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-4">
                  <h3 className="text-sm font-bold mb-2">Filter by Date:</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dateFilter"
                        value="7"
                        checked={selectedRange === 7}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      Last 7 Days
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dateFilter"
                        value="15"
                        checked={selectedRange === 15}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      Last 15 Days
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="dateFilter"
                        value="30"
                        checked={selectedRange === 30}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      Last 30 Days
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="text-sm font-bold mb-4 text-white bg-secondary hover:bg-hoversec px-5 py-2 rounded-lg"
            onClick={() =>
              document.getElementById("addExpenseModal").showModal()
            }
          >
            Add New
          </button>
          <AddExpensesModal />
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) ? (
              expenses?.map((expense) => (
                <tr key={expense.id}>
                  <td className="py-2 px-4 border">{expense.title}</td>
                  <td className="py-2 px-4 border">${expense.amount}</td>
                  <td className="py-2 px-4 border">{expense.category}</td>
                  <td className="py-2 px-4 border">{expense.date}</td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
