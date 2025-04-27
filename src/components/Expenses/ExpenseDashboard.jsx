import React, { useState, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/AuthContext";
import {
  calculateCategoryTotals,
  splitKeysAndValues,
} from "../../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../../utils/totalAmount";
import { CirclePlus, Edit, Pencil, Trash2 } from "lucide-react";
import TotalEstimateBlock from "../../Shared/TotalEstimateBlock";
import PieChart from "../../Shared/Infographics/PieChart";
import { deleteRecord } from "../../utils/API_Operations/apiOperations";
import UpdateExpenseModal from "./UpdateExpensesModal";
import Pagination from "../../Shared/Pagination";
import { Button } from "../ui/Button";

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
  const [rangedExpenses, setRangedExpenses] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [selectedRange, setSelectedRange] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const RANGED_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}&days=${selectedRange}`;

  const USERS_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}`;

  const {
    data: expenses = [],
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["expenses", selectedRange],
    queryFn: async () => {
      const res = await fetch(
        selectedRange ? RANGED_EXPENSES_API_URL : USERS_EXPENSES_API_URL
      );
      if (!res.ok) throw new Error("Failed to fetch incomes");
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [selectedRange]);

  // Categorised Calculation
  const categoryWiseIncome = calculateCategoryTotals(expenses);
  const { keys, values, colors } = splitKeysAndValues(categoryWiseIncome);
  const totalExpenses = getTotalOfRecords(expenses);

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
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = expenses.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(expenses.length / recordsPerPage);

  return (
    <div className="bg-white  text-black p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Total Estimates */}
        <TotalEstimateBlock
          props={{
            apiUrl: USERS_EXPENSES_API_URL,
            filterOpen,
            setFilterOpen,
            selectedRange,
            setSelectedRange,
            total: totalExpenses,
            setCurrentPage,
            title: "Expenses",
          }}
        />
        {/* Pie Chart */}
        <PieChart props={{ categoryData, title: "Expenses" }} />
      </div>

      {/* Expense Table */}
      <div className="border-2 rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
          <CirclePlus
            onClick={() =>
              document.getElementById("addExpenseModal").showModal()
            }
          />
          <AddExpensesModal props={{ user, refetch }} />
        </div>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr className="text-center">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((expense) => (
              <tr
                key={expense.id}
                className="text-center border-b hover:bg-gray-50"
              >
                <td className="py-2 px-4 ">{expense.title}</td>
                <td className="py-2 px-4 ">{expense.amount} BDT</td>
                <td className="py-2 px-4 ">{expense.category}</td>
                <td className="py-2 px-4 ">
                  {expense.date.split(" ")[0]} | {expense.date.split(" ")[1]}
                </td>
                <td className="flex gap-4 justify-center items-center py-3 px-4 ">
                  <Button variant="outline" className="mx-1">
                    <Edit
                      
                      size={16}
                      onClick={async () => {
                        setSelectedId(expense.id);
                        document.getElementById(
                          "updateExpenseModal"
                        ).open = true;
                      }}
                    />
                  </Button>
                  <UpdateExpenseModal
                    props={{
                      userId: user?.user?.id,
                      id: selectedId,
                      records: expenses,
                      refetch,
                    }}
                  />

                  <Button variant="destructive">
                    <Trash2
                     
                      size={16}
                      onClick={async () => {
                        await deleteRecord(
                          `${import.meta.env.VITE_BASE_URL}/personal/expenses/${
                            expense?.id
                          }`
                        );
                        refetch();
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      </div>
    </div>
  );
};

export default ExpenseDashboard;
