import React, { useState, useEffect } from "react";
import GoalsTableFilter from "./GoalsTableFilter";
import GoalsTableBody from "./GoalsTableBody";
import EditGoalModal from "./EditGoalModal";
import AddGoalModal from "./AddGoalModal";
import AddEntryModal from "./AddEntryModal";
import UpdateEntryModal from "./UpdateEntryModal";
import EntriesDrawer from "./EntriesDrawer";
import { useUser } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";

const GoalsTable = ({ goals, onAddNew }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateEntryModalOpen, setIsUpdateEntryModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [sortOption, setSortOption] = useState("date-newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [reportFormat, setReportFormat] = useState("PDF");

  // Dynamically generate years based on the data
  const years = goals.length
    ? [
        "All",
        ...Array.from(
          new Set(goals.map((goal) => new Date(goal.start_date).getFullYear()))
        ).sort((a, b) => a - b),
      ]
    : ["All"];
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
  const statuses = ["All", "In Progress", "Completed", "Cancelled"];

  // Filter and sort goals
  useEffect(() => {
    let temp = [...goals];

    if (filterStatus !== "All") {
      temp = temp.filter((goal) => goal.status === filterStatus);
    }

    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((goal) => {
        const startDate = new Date(goal.start_date);
        return startDate.getMonth() === monthIndex;
      });
    }

    if (filterYear !== "All") {
      temp = temp.filter((goal) => {
        const startDate = new Date(goal.start_date);
        return startDate.getFullYear() === parseInt(filterYear);
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (goal) =>
          goal.title?.toLowerCase().includes(query) ||
          goal.description?.toLowerCase().includes(query) ||
          goal.start_date?.toLowerCase().includes(query) ||
          (goal.end_date && goal.end_date?.toLowerCase().includes(query))
      );
    }

    switch (sortOption) {
      case "amount-asc":
        temp.sort((a, b) => a.target_amount - b.target_amount);
        break;
      case "amount-desc":
        temp.sort((a, b) => b.target_amount - a.target_amount);
        break;
      case "date-newest":
        temp.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        break;
      case "date-oldest":
        temp.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        break;
    }

    setFilteredGoals(temp);
  }, [goals, filterStatus, filterMonth, filterYear, sortOption, searchQuery]);

  // Edit Modal Functions
  const handleOpen = (goal) => {
    setSelectedGoalId(goal.id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedGoalId(null);
  };

  // Delete Function
  const handleDelete = async (goalId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${goalId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Goal deleted successfully");
      } else {
        toast.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Error deleting goal");
    }
  };

  // Add Modal Functions
  const handleAddNewOpen = () => setIsAddModalOpen(true);
  const handleAddNewClose = () => setIsAddModalOpen(false);

  // Add Entry Modal Functions
  const handleAddEntryOpen = (goal) => {
    setSelectedGoal(goal);
    setIsAddEntryModalOpen(true);
  };
  const handleAddEntryClose = () => {
    setIsAddEntryModalOpen(false);
    setSelectedGoal(null);
  };

  // Drawer Functions
  const handleOpenDrawer = (goal) => {
    setSelectedGoal(goal);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedGoal(null);
  };

  // Update Entry Modal Functions
  const handleOpenUpdateEntryModal = () => setIsUpdateEntryModalOpen(true);
  const handleCloseUpdateEntryModal = () => setIsUpdateEntryModalOpen(false);

  // Generate Report
  const generateReport = () => {
    const reportData = filteredGoals.map((goal) => ({
      Title: goal.title,
      "Target Amount": `৳${goal.target_amount.toLocaleString()}`,
      "Current Amount": `৳${goal.current_amount.toLocaleString()}`,
      Progress: `${Math.min(
        (goal.current_amount / goal.target_amount) * 100,
        100
      ).toFixed(1)}%`,
      "Start Date": goal.start_date,
      "End Date": goal.end_date || "—",
      Status: goal.status,
    }));
    if (reportFormat === "PDF") {
      const doc = new jsPDF();
      doc.text("Savings Goals Report", 14, 20);
      autoTable(doc, {
        startY: 30,
        head: [
          [
            "Title",
            "Target Amount",
            "Current Amount",
            "Progress",
            "Start Date",
            "End Date",
            "Status",
          ],
        ],
        body: reportData.map((row) => Object.values(row)),
        theme: "striped",
        headStyles: { fillColor: [22, 160, 220] },
      });
      doc.save("goals_report.pdf");
    } else if (reportFormat === "Excel") {
      const ws = XLSX.utils.json_to_sheet(reportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Goals");
      XLSX.writeFile(wb, "goals_report.xlsx");
    } else if (reportFormat === "CSV") {
      const headers = [
        "Title",
        "Target Amount",
        "Current Amount",
        "Progress",
        "Start Date",
        "End Date",
        "Status",
      ];
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
      link.setAttribute("download", "goals_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <GoalsTableFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        reportFormat={reportFormat}
        setReportFormat={setReportFormat}
        generateReport={generateReport}
        handleAddNewOpen={handleAddNewOpen}
        statuses={statuses}
        months={months}
        years={years}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Target Amount</th>
              <th className="px-4 py-3">Current Amount</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <GoalsTableBody
            filteredGoals={filteredGoals}
            handleOpen={handleOpen}
            handleDelete={handleDelete}
            handleAddEntryOpen={handleAddEntryOpen}
            handleOpenDrawer={handleOpenDrawer}
          />
        </table>
      </div>
      <EditGoalModal
        isOpen={isOpen}
        handleClose={handleClose}
        selectedGoalId={selectedGoalId}
        user={user}
        onAddNew={onAddNew}
      />
      <AddGoalModal
        isAddModalOpen={isAddModalOpen}
        handleAddNewClose={handleAddNewClose}
        onAddNew={onAddNew}
      />
      <AddEntryModal
        isAddEntryModalOpen={isAddEntryModalOpen}
        handleAddEntryClose={handleAddEntryClose}
        selectedGoal={selectedGoal}
        user={user}
        onAddNew={onAddNew}
      />
      <UpdateEntryModal
        isUpdateEntryModalOpen={isUpdateEntryModalOpen}
        handleCloseUpdateEntryModal={handleCloseUpdateEntryModal}
        selectedGoal={selectedGoal}
        onAddNew={onAddNew}
      />
      <EntriesDrawer
        isDrawerOpen={isDrawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedGoal={selectedGoal}
        handleOpenUpdateEntryModal={handleOpenUpdateEntryModal}
        onAddNew={onAddNew}
      />
    </div>
  );
};

export default GoalsTable;
