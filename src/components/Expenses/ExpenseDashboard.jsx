import React, { useState, useEffect } from "react";
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
import {
  calculateCategoryTotals,
  splitKeysAndValues,
} from "../../utils/expenses/categoryWiseAmounts";
import { getTotalExpenses } from "../../utils/totalAmount";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}&days=${selectedRange}`;

  const {
    data: expenses = [],
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["expenses", selectedRange],
    queryFn: async () => {
      const res = await fetch(EXPENSES_API_URL);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [selectedRange]);

  const categoryWiseIncome = calculateCategoryTotals(expenses);
  const { keys, values, colors } = splitKeysAndValues(categoryWiseIncome);
  const totalExpenses = getTotalExpenses(expenses);

  // Prepare chart data
  const categoryData = {
    labels: keys,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  // Paginate expenses
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentExpenses = expenses.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle radio button change
  const handleRadioChange = (e) => {
    const days = parseInt(e.target.value);
    setSelectedRange(days);
    setFilterOpen(false); // Close dropdown after selection
    setCurrentPage(1); // Reset to first page after filter
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="rounded-xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-4">Total Expenses</h2>
            <div className="relative">
              <button
                className="text-secondary text-lg mb-3"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FaFilter />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded-lg shadow-lg p-4">
                  <h3 className="text-sm font-bold mb-2">Filter by Date:</h3>
                  <div className="space-y-2">
                    {[7, 15, 30].map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="radio"
                          name="dateFilter"
                          value={day}
                          checked={selectedRange === day}
                          onChange={handleRadioChange}
                          className="mr-2"
                        />
                        Last {day} Days
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-6xl font-medium">{totalExpenses}</p>
            <p className="text-4xl font-light">BDT</p>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Category-wise Expenses</h2>
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={categoryData} />
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
          <CirclePlus
            onClick={() =>
              document.getElementById("addExpenseModal").showModal()
            }
          />
          <AddExpensesModal props={{ user, refetch }} />
        </div>
        <table className="min-w-full bg-white border text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="py-2 px-4 border">{expense.title}</td>
                <td className="py-2 px-4 border">{expense.amount} BDT</td>
                <td className="py-2 px-4 border">{expense.category}</td>
                <td className="py-2 px-4 border">{expense.date.split("T")[0]} | {expense.date.split("T")[1]}</td>
                <td className="flex gap-2 justify-center items-center my-1">
                <Pencil color="#0a54ff" size={20}/>
                <Trash2 color="#ff2424" size={20}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({
            length: Math.ceil(expenses.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-secondary text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
