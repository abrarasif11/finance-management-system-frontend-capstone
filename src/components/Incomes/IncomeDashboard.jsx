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
import AddIncomesModal from "./AddIncomesModal";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/AuthContext";
import {
  calculateCategoryTotals,
  splitKeysAndValues,
} from "../../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../../utils/totalAmount";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import TotalEstimateBlock from "../../Shared/TotalEstimateBlock";
import PieChart from "../../Shared/Infographics/PieChart";
import { deleteRecord } from "../../utils/API_Operations/apiOperations";
import UpdateIncomeModal from "./UpdateIncomesModal";

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

const IncomeDashboard = () => {
  const { user } = useUser();

  // State to manage filter
  const [selectedId, setSelectedId] = useState();
  const [selectedRange, setSelectedRange] = useState(30);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const RANGED_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes?user_id=${user?.user?.id}&days=${selectedRange}`;

  const USERS_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes?user_id=${user?.user?.id}`;

  const {
    data: incomes = [],
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["incomes", selectedRange],
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
  const categoryWiseIncome = calculateCategoryTotals(incomes);
  const { keys, values, colors } = splitKeysAndValues(categoryWiseIncome);
  const totalIncomes = getTotalOfRecords(incomes);

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

  // Paginate incomes
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentIncomes = incomes.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white text-black p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Total Estimates */}
        <TotalEstimateBlock
          props={{
            apiUrl: USERS_EXPENSES_API_URL,
            filterOpen,
            setFilterOpen,
            selectedRange,
            setSelectedRange,
            total: totalIncomes,
            setCurrentPage,
            title: "Incomes",
          }}
        />
        {/* Pie Chart */}
        <PieChart props={{ categoryData, title: "Incomes" }} />
      </div>

      {/* Income Table */}
      <div className="border-2 rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Recent Incomes</h2>
          <CirclePlus
            onClick={() =>
              document.getElementById("addIncomeModal").showModal()
            }
          />
          <AddIncomesModal props={{ user, refetch }} />
        </div>
        <table className="min-w-full bg-white text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Source</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentIncomes.map((income) => (
              <tr key={income.id}>
                <td className="py-2 px-4 border">{income.source}</td>
                <td className="py-2 px-4 border">{income.amount} BDT</td>
                <td className="py-2 px-4 border">{income.category}</td>
                <td className="py-2 px-4 border">
                  {income.date.split(" ")[0]} | {income.date.split(" ")[1]}
                </td>
                <td className="flex gap-4 justify-center items-center py-3 px-4 border">
                  <Pencil
                    className="text-blue-600 hover:text-blue-400"
                    size={20}
                    onClick={async () => {
                      setSelectedId(income.id);
                      document.getElementById("updateIncomeModal").open = true;
                    }}
                  />
                  <UpdateIncomeModal
                    props={{
                      userId: user?.user?.id,
                      id: selectedId,
                      records: incomes,
                      refetch,
                    }}
                  />
                  <Trash2
                    className="text-red-600 hover:text-red-400"
                    size={20}
                    onClick={async () => {
                      await deleteRecord(
                        `${import.meta.env.VITE_BASE_URL}/personal/incomes/${
                          income?.id
                        }`
                      );
                      refetch();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({
            length: Math.ceil(incomes.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 hover:bg-gray-200"
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

export default IncomeDashboard;
