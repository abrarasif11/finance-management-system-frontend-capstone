import React, { useState, useEffect, useMemo } from "react";
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
import { CirclePlus, Edit, Trash2 } from "lucide-react";
import TotalEstimateBlock from "../../Shared/TotalEstimateBlock";
import PieChart from "../../Shared/Infographics/PieChart";
import { deleteRecord } from "../../utils/API_Operations/apiOperations";
import UpdateIncomeModal from "./UpdateIncomesModal";
import Pagination from "../../Shared/Pagination";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LoadingSpinner from "../ui/LoadingSpinner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

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

const months = [
  "All",
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

const IncomeDashboard = () => {
  const { user } = useUser();

  // State to manage filter, sort, search, and modals
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRange, setSelectedRange] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("date-newest");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [reportFormat, setReportFormat] = useState("PDF");
  const [loading, setLoading] = useState(false);
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
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["incomes", selectedRange, user?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        selectedRange ? RANGED_INCOMES_API_URL : USERS_INCOMES_API_URL
      );
      if (!res.ok) throw new Error("Failed to fetch incomes");
      const data = await res.json();
      return data.data;
    },
    enabled: !!user?.user?.id, // Only fetch when user ID is available
    refetchOnMount: false,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Memoize the filtered and sorted incomes to prevent unnecessary re-computations
  const filteredIncomes = useMemo(() => {
    let temp = [...incomes];

    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((income) => {
        const incomeDate = new Date(income.date);
        return incomeDate.getMonth() === monthIndex;
      });
    }

    if (filterYear !== "All") {
      temp = temp.filter((income) => {
        const incomeDate = new Date(income.date);
        return incomeDate.getFullYear() === parseInt(filterYear);
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (income) =>
          income.source.toLowerCase().includes(query) ||
          income.category.toLowerCase().includes(query) ||
          income.date.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "amount-asc":
        temp.sort((a, b) => a.amount - b.amount);
        break;
      case "amount-desc":
        temp.sort((a, b) => b.amount - a.amount);
        break;
      case "date-newest":
        temp.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "date-oldest":
        temp.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
    }

    return temp;
  }, [incomes, filterMonth, filterYear, sortOption, searchQuery]);

  // Reset current page when filteredIncomes changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredIncomes]);

  // Dynamically generate years based on the data
  const years = incomes.length
    ? [
        "All",
        ...Array.from(
          new Set(incomes.map((income) => new Date(income.date).getFullYear()))
        ).sort((a, b) => a - b),
      ]
    : ["All"];

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

  // Paginate filtered incomes
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredIncomes.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredIncomes.length / recordsPerPage);

  // Handle delete confirmation
  const handleDeleteIncome = async () => {
    if (incomeToDelete) {
      await deleteRecord(
        `${import.meta.env.VITE_BASE_URL}/personal/incomes/${incomeToDelete.id}`
      );
      refetch();
      setShowDeleteModal(false);
      setIncomeToDelete(null);
    }
  };

  // Generate report
  const generateReport = () => {
    const reportData = filteredIncomes.map((income) => ({
      Source: income.source,
      Amount: `${income.amount} BDT`,
      Category: income.category,
      Date: income.date,
    }));

    if (reportFormat === "PDF") {
      const doc = new jsPDF();
      doc.text("Income Report", 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [["Source", "Amount", "Category", "Date"]],
        body: reportData.map((row) => Object.values(row)),
        theme: "striped",
        headStyles: { fillColor: [22, 160, 220] },
      });
      doc.save("income_report.pdf");
    } else if (reportFormat === "Excel") {
      const ws = XLSX.utils.json_to_sheet(reportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Incomes");
      XLSX.writeFile(wb, "income_report.xlsx");
    } else if (reportFormat === "CSV") {
      const headers = ["Source", "Amount", "Category", "Date"];
      const csvContent = [
        headers.join(","),
        ...reportData.map((row) =>
          headers.map((header) => `"${row[header]}"`).join(",")
        ),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "income_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getSuggestionsOnRecentLoans = async () => {
    try {
      setLoading(true);
      // const res = await axios.post(
      //   `${import.meta.env.VITE_SUGGESTION_API_URL}/loan/optimize-payments`,
      //   loans
      // );
      // setLoanSuggestions(res?.data);
      setIsOpen(true);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return isLoading && isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="text-black p-6 rounded-lg">
      <div className="flex justify-end mb-2">
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
            onClick={getSuggestionsOnRecentLoans}
          >
            {" "}
            Get Suggestions
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Total Estimates */}
        <TotalEstimateBlock
          props={{
            apiUrl: USERS_INCOMES_API_URL,
            filterOpen: false, // Removed unused state
            setFilterOpen: () => {}, // No-op function
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
      <Card>
        <div className="flex justify-between items-center gap-3 mb-4">
          <div className="space-x-2">
            {/* Filter and Sort Options */}
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              <option value="amount-asc">Amount Ascending</option>
              <option value="amount-desc">Amount Descending</option>
              <option value="date-newest">Nearest Date</option>
              <option value="date-oldest">Oldest Date</option>
            </select>
          </div>
          <div className="space-x-2">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search incomes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
            />
          </div>
          <div className="flex space-x-2">
            {/* Report Generation */}
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
            <Button onClick={generateReport} className="py-2">
              Generate Report
            </Button>
            <Button
              onClick={() =>
                document.getElementById("addIncomeModal").showModal()
              }
              className="font-normal flex justify-between items-center gap-2 py-2"
            >
              <CirclePlus />
              New Income
            </Button>
          </div>
          <AddIncomesModal props={{ user, refetch }} />
        </div>
        <CardContent>
          {currentRecords?.length !== 0 ? (
            <table className="min-w-full text-sm text-left text-black">
              <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                <tr>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((income) => (
                  <tr key={income.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{income.source}</td>
                    <td className="px-4 py-3">{income.amount} BDT</td>
                    <td className="px-4 py-3">{income.category}</td>
                    <td className="px-4 py-3">
                      {income.date.split(" ")[0]} | {income.date.split(" ")[1]}
                    </td>
                    <td className="flex gap-4 justify-start items-center py-3 px-4">
                      <Button variant="outline" className="mx-1">
                        <Edit
                          size={16}
                          onClick={async () => {
                            setSelectedId(income.id);
                            document
                              .getElementById("updateIncomeModal")
                              .showModal();
                          }}
                        />
                      </Button>
                      <UpdateIncomeModal
                        props={{
                          userId: user?.user?.id,
                          id: selectedId,
                          records: incomes,
                          refetch,
                        }}
                      />
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setIncomeToDelete(income);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-md my-10">No Data Found</div>
          )}
        </CardContent>

        {/* Pagination */}
        <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the income '
              {incomeToDelete?.source}'?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setIncomeToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteIncome}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeDashboard;
