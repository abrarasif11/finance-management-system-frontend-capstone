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
import { CirclePlus, Edit, Pencil, Trash2 } from "lucide-react";
import TotalEstimateBlock from "../../Shared/TotalEstimateBlock";
import PieChart from "../../Shared/Infographics/PieChart";
import { deleteRecord } from "../../utils/API_Operations/apiOperations";
import UpdateIncomeModal from "./UpdateIncomesModal";
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

const IncomeDashboard = () => {
  const { user } = useUser();

  // State to manage filter
  const [selectedId, setSelectedId] = useState();
  const [selectedRange, setSelectedRange] = useState(30);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const RANGED_INCOMES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes?user_id=${user?.user?.id}&days=${selectedRange}`;

  const USERS_INCOMES_API_URL = `${
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
        selectedRange ? RANGED_INCOMES_API_URL : USERS_INCOMES_API_URL
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
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = incomes.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(incomes.length / recordsPerPage);

  return (
    <div className="bg-white text-black p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Total Estimates */}
        <TotalEstimateBlock
          props={{
            apiUrl: USERS_INCOMES_API_URL,
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
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr className="text-center">
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((income) => (
              <tr key={income.id} className="text-center border-b hover:bg-gray-50">
                <td className="px-4 py-3">{income.source}</td>
                <td className="px-4 py-3">{income.amount} BDT</td>
                <td className="px-4 py-3">{income.category}</td>
                <td className="px-4 py-3">
                  {income.date.split(" ")[0]} | {income.date.split(" ")[1]}
                </td>
                <td className="flex gap-4 justify-center items-center py-3 px-4 ">
                  
                  <UpdateIncomeModal
                    props={{
                      userId: user?.user?.id,
                      id: selectedId,
                      records: incomes,
                      refetch,
                    }}
                  />
                  
                    <Button variant="outline">
                      <Edit
                    
                    size={16}
                    onClick={async () => {
                      setSelectedId(income.id);
                      document.getElementById("updateIncomeModal").open = true;
                    }}
                  />
                    </Button>
                    <Button variant="destructive" className="mx-1">
                   <Trash2
                    size={16}
                    onClick={async () => {
                      await deleteRecord(
                        `${import.meta.env.VITE_BASE_URL}/personal/incomes/${
                          income?.id
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

        {/* Pagination */}
        <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      </div>
    </div>
  );
};

export default IncomeDashboard;
