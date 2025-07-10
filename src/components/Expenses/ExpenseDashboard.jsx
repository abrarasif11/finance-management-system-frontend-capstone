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
import LoadingSpinner from "../ui/LoadingSpinner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Card } from "../ui/card";

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

const ExpenseDashboard = () => {
  const { user } = useUser();

  // State to manage filter, sort, search, and modals
  const [selectedRange, setSelectedRange] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("date-newest");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [reportFormat, setReportFormat] = useState("PDF");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
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
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenses", selectedRange, user?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        selectedRange ? RANGED_EXPENSES_API_URL : USERS_EXPENSES_API_URL
      );
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const data = await res.json();
      return data.data;
    },
    enabled: !!user?.user?.id, // Only fetch when user ID is available
    refetchOnMount: false,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Memoize the filtered and sorted expenses to prevent unnecessary re-computations
  const filteredExpenses = useMemo(() => {
    let temp = [...expenses];

    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === monthIndex;
      });
    }

    if (filterYear !== "All") {
      temp = temp.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === parseInt(filterYear);
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (expense) =>
          expense.title.toLowerCase().includes(query) ||
          expense.category.toLowerCase().includes(query) ||
          expense.date.toLowerCase().includes(query)
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
  }, [expenses, filterMonth, filterYear, sortOption, searchQuery]);

  // Reset current page when filteredExpenses changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExpenses]);

  // Dynamically generate years based on the data
  const years = expenses.length
    ? [
        "All",
        ...Array.from(
          new Set(
            expenses.map((expense) => new Date(expense.date).getFullYear())
          )
        ).sort((a, b) => a - b),
      ]
    : ["All"];

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

  // Paginate filtered expenses
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredExpenses.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredExpenses.length / recordsPerPage);

  // Handle delete confirmation
  const handleDeleteExpense = async () => {
    if (expenseToDelete) {
      await deleteRecord(
        `${import.meta.env.VITE_BASE_URL}/personal/expenses/${
          expenseToDelete.id
        }`
      );
      refetch();
      setShowDeleteModal(false);
      setExpenseToDelete(null);
    }
  };

  // Generate report
  const generateReport = () => {
    const reportData = filteredExpenses.map((expense) => ({
      Title: expense.title,
      Amount: `${expense.amount} BDT`,
      Category: expense.category,
      Date: expense.date,
    }));

    if (reportFormat === "PDF") {
      const doc = new jsPDF();
      doc.text("Expense Report", 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [["Title", "Amount", "Category", "Date"]],
        body: reportData.map((row) => Object.values(row)),
        theme: "striped",
        headStyles: { fillColor: [22, 160, 220] },
      });
      doc.save("expense_report.pdf");
    } else if (reportFormat === "Excel") {
      const ws = XLSX.utils.json_to_sheet(reportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Expenses");
      XLSX.writeFile(wb, "expense_report.xlsx");
    } else if (reportFormat === "CSV") {
      const headers = ["Title", "Amount", "Category", "Date"];
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
      link.setAttribute("download", "expense_report.csv");
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
            apiUrl: USERS_EXPENSES_API_URL,
            filterOpen: false,
            setFilterOpen: () => {},
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
      <Card className="bg-white">
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
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
            />
          </div>
          <div className="space-x-2">
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
                document.getElementById("addExpenseModal").showModal()
              }
              className="py-2"
            >
              Add Expense
            </Button>
          </div>
          <AddExpensesModal props={{ user, refetch }} />
        </div>

        {currentRecords?.length !== 0 ? (
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
                  <td className="py-2 px-4">{expense.title}</td>
                  <td className="py-2 px-4">{expense.amount} BDT</td>
                  <td className="py-2 px-4">{expense.category}</td>
                  <td className="py-2 px-4">
                    {expense.date.split(" ")[0]} | {expense.date.split(" ")[1]}
                  </td>
                  <td className="flex gap-4 justify-center items-center py-3 px-4">
                    <Button variant="outline" className="mx-1">
                      <Edit
                        size={16}
                        onClick={async () => {
                          setSelectedId(expense.id);
                          document
                            .getElementById("updateExpenseModal")
                            .showModal();
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
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setExpenseToDelete(expense);
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

        <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the expense '
              {expenseToDelete?.title}'?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setExpenseToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteExpense}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
