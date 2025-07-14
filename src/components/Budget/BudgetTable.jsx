import { useState, useEffect } from "react";
import Pagination from "../../Shared/Pagination";
import { Button } from "../ui/Button";
import { Edit, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import SubBudgetDrawer from "./SubBudgetDrawer";

const BudgetTable = ({
  budgets,
  onDelete,
}) => {
  const { user } = useUser();
  const [filterType, setFilterType] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [sortOption, setSortOption] = useState("amount-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubBudgetModal, setShowSubBudgetModal] = useState(false);
  const [reportFormat, setReportFormat] = useState("PDF");
  const [newBudget, setNewBudget] = useState({
    title: "",
    total_amount: "",
    remaining: "",
    type: "Monthly",
    start_date: "",
    end_date: "",
    user_id: parseInt(user?.user?.id),
  });
  const [editBudget, setEditBudget] = useState(null);
  const [newSubBudget, setNewSubBudget] = useState({
    title: "",
    amount: "",
    date: "",
    budget_id: null,
  });
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  const currentYear = new Date().getFullYear();
  const years = ["All", ...Array.from({ length: 6 }, (_, i) => currentYear - i)];
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

  useEffect(() => {
    let temp = [...budgets];

    if (filterType !== "All") {
      temp = temp.filter((budget) => budget.type === filterType);
    }

    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((budget) => {
        const startDate = new Date(budget.start_date);
        return startDate.getMonth() === monthIndex;
      });
    }

    if (filterYear !== "All") {
      temp = temp.filter((budget) => {
        const startDate = new Date(budget.start_date);
        return startDate.getFullYear() === parseInt(filterYear);
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (budget) =>
          budget.title.toLowerCase().includes(query) ||
          budget.type.toLowerCase().includes(query) ||
          budget.start_date.toLowerCase().includes(query) ||
          budget.end_date?.toLowerCase().includes(query) || ""
      );
    }

    switch (sortOption) {
      case "amount-asc":
        temp.sort((a, b) => a.total_amount - b.total_amount);
        break;
      case "amount-desc":
        temp.sort((a, b) => b.total_amount - a.total_amount);
        break;
      case "date-newest":
        temp.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        break;
      case "date-oldest":
        temp.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        break;
      default:
        break;
    }

    setFilteredBudgets(temp);
    setCurrentPage(1);
  }, [budgets, filterType, filterMonth, filterYear, sortOption, searchQuery]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBudgets.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredBudgets.length / rowsPerPage);

  const handleAddNewBudget = async () => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/personal/budgets`,
      {
        title: newBudget.title,
        total_amount: newBudget.total_amount,
        remaining: newBudget.remaining,
        type: newBudget.type,
        start_date: newBudget.start_date,
        end_date: newBudget.end_date || null, // Ensure end_date is sent, even if empty
        user_id: parseInt(user?.user?.id),
      }
    );
    if (res.status === 201) {
      toast.success("New Budget Added Successfully!");
      
      setShowAddModal(false);
      setNewBudget({
        title: "",
        total_amount: "",
        remaining: "",
        type: "Monthly",
        start_date: "",
        end_date: "",
        user_id: parseInt(user?.user?.id),
      });
    } else {
      toast.error("Failed to add new budget!");
    }
  } catch (error) {
    toast.error(`Error adding budget!`);
  } finally {
    setLoading(false);
  }
};

  const handleEditBudget = async () => {
    if (!editBudget?.id) return;
    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/personal/budgets/${editBudget.id}`,
        editBudget
      );
      if (res.status === 200) {
        toast.success("Budget Updated Successfully!");
        setShowEditModal(false);
        setEditBudget(null);
      } else {
        toast.error("Failed to update budget!");
      }
    } catch (error) {
      toast.error(`Error updating budget!`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (budget) => {
    if (!budget?.id) return;
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/personal/budgets/${budget.id}`
      );
      if (res.status === 200) {
        toast.success("Budget Deleted Successfully!");
      } else {
        toast.error("Failed to delete budget!");
      }
    } catch (error) {
      toast.error(`Error deleting budget!`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubBudget = async () => {
    if (!newSubBudget.budget_id) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/personal/budgets/${newSubBudget.budget_id}/sub-events`,
        {
          title: newSubBudget.title,
          amount: parseFloat(newSubBudget.amount),
          date: newSubBudget.date,
          created_at: new Date().toISOString(),
        }
      );
      if (res.status === 201) {
        toast.success("Sub-Budget Added Successfully!");
        const updatedBudget = { ...budgets.find(b => b.id === newSubBudget.budget_id), remaining: (budgets.find(b => b.id === newSubBudget.budget_id).remaining - parseFloat(newSubBudget.amount)) };
        setShowSubBudgetModal(false);
        setNewSubBudget({ title: "", amount: "", date: "", budget_id: null });
      } else {
        toast.error("Failed to add sub-budget!");
      }
    } catch (error) {
      toast.error(`Error adding sub-budget!`);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    console.log("Filtered Budgets for Report:", filteredBudgets);
    const reportData = filteredBudgets.map((budget) => ({
      Title: budget.title,
      Total: budget.total_amount,
      Remaining: budget.remaining,
      Progress: `${
        ((budget.total_amount - budget.remaining) / budget.total_amount) * 100
      }%`,
      Type: budget.type,
      "Start Date": budget.start_date.split(" ")[0],
      "End Date": budget.end_date?.split(" ")[0] || "",
      Status:
        budget.total_amount === budget.remaining
          ? "Assigned"
          : budget.total_amount > budget.remaining
          ? "In Progress"
          : "Completed",
    }));

    if (reportFormat === "PDF") {
      const doc = new jsPDF();
      doc.text("Budget Report", 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [
          [
            "Title",
            "Total",
            "Remaining",
            "Progress",
            "Type",
            "Start Date",
            "End Date",
            "Status",
          ],
        ],
        body: reportData.map((row) => Object.values(row)),
        theme: "striped",
        headStyles: { fillColor: [22, 160, 220] },
      });
      doc.save("budget_report.pdf");
    } else if (reportFormat === "Excel") {
      const ws = XLSX.utils.json_to_sheet(reportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Budgets");
      XLSX.writeFile(wb, "budget_report.xlsx");
    } else if (reportFormat === "CSV") {
      const headers = [
        "Title",
        "Total",
        "Remaining",
        "Progress",
        "Type",
        "Start Date",
        "End Date",
        "Status",
      ];
      const csvContent = [
        headers.join(","),
        ...reportData.map((row) =>
          headers
            .map((header) => `"${row[header]}"`)
            .join(",")
        ),
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "budget_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    toast.success(`${reportFormat} report generated successfully!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
          >
            <option value="All">All Types</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
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
            <option value="date-newest">Newest Date</option>
            <option value="date-oldest">Oldest Date</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search budgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={reportFormat}
            onChange={(e) => setReportFormat(e.target.value)}
            className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
            <option value="CSV">CSV</option>
          </select>
          <button
            onClick={generateReport}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Generate Report
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add New Budget
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Remaining</th>
              <th className="py-2 px-4 border-b">Progress</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((budget) => {
              const progress =
                ((budget.total_amount - budget.remaining) /
                  budget.total_amount) *
                100;
              return (
                <tr
                  key={budget.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBudget(budget)}
                >
                  <td className="px-4 py-3">{budget.title}</td>
                  <td className="px-4 py-3">{budget.total_amount}</td>
                  <td className="px-4 py-3">{budget.remaining}</td>
                  <td className="flex items-center gap-1 px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {progress.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">{budget.type}</td>
                  <td className="px-4 py-3">
                    {budget.start_date.split(" ")[0]}
                  </td>
                  <td className="px-4 py-3">{budget.end_date?.split(" ")[0] || ""}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${
                        budget.total_amount === budget.remaining
                          ? "bg-red-600"
                          : budget.total_amount > budget.remaining
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {budget.total_amount === budget.remaining
                        ? "Assigned"
                        : budget.total_amount > budget.remaining
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-2 flex">
                    <Button
                      variant="outline"
                      title="Add New Entry"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewSubBudget({ ...newSubBudget, budget_id: budget.id });
                        setShowSubBudgetModal(true);
                      }}
                    >
                      <Plus size={18} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditBudget({ ...budget });
                        setShowEditModal(true);
                      }}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBudget(budget);
                      }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
            <h2 className="text-black text-lg font-semibold">Add New Budget</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newBudget.title}
              onChange={(e) =>
                setNewBudget({ ...newBudget, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Total Amount"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newBudget.total_amount}
              onChange={(e) =>
                setNewBudget({
                  ...newBudget,
                  total_amount: parseFloat(e.target.value) || 0,
                })
              }
            />
            <input
              type="number"
              placeholder="Remaining"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newBudget.remaining}
              onChange={(e) =>
                setNewBudget({
                  ...newBudget,
                  remaining: parseFloat(e.target.value) || 0,
                })
              }
            />
            <select
              value={newBudget.type}
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              onChange={(e) =>
                setNewBudget({ ...newBudget, type: e.target.value })
              }
            >
              <option>Monthly</option>
              <option>Annually</option>
            </select>
            <div className="w-full flex items-center justify-between gap-4">
              <input
                type="date"
                className="w-full block text-black bg-white border border-gray-400 outline-none input"
                value={newBudget.start_date}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, start_date: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full block text-black bg-white border border-gray-400 outline-none input"
                value={newBudget.end_date || ""}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, end_date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNewBudget} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && editBudget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
            <h2 className="text-lg font-semibold">Edit Budget</h2>
            <input
              type="text"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={editBudget.title}
              onChange={(e) =>
                setEditBudget({ ...editBudget, title: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={editBudget.total_amount}
              onChange={(e) =>
                setEditBudget({
                  ...editBudget,
                  total_amount: parseFloat(e.target.value) || 0,
                })
              }
            />
            <input
              type="number"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={editBudget.remaining}
              onChange={(e) =>
                setEditBudget({
                  ...editBudget,
                  remaining: parseFloat(e.target.value) || 0,
                })
              }
            />
            <input
              type="date"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={editBudget.end_date || ""}
              onChange={(e) =>
                setEditBudget({ ...editBudget, end_date: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditBudget} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      )}
      {showSubBudgetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
            <h2 className="text-black text-lg font-semibold">Add Sub-Budget</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newSubBudget.title}
              onChange={(e) =>
                setNewSubBudget({ ...newSubBudget, title: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newSubBudget.amount}
              onChange={(e) =>
                setNewSubBudget({
                  ...newSubBudget,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
            />
            <input
              type="date"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={newSubBudget.date}
              onChange={(e) =>
                setNewSubBudget({ ...newSubBudget, date: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSubBudgetModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubBudget} disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <SubBudgetDrawer
        isOpen={!!selectedBudget}
        onClose={() => setSelectedBudget(null)}
        budget={selectedBudget}
      />
    </div>
  );
};

export default BudgetTable;