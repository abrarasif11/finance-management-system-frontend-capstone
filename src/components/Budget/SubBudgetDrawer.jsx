import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "../ui/Button";

const SubBudgetDrawer = ({ isOpen, onClose, budget}) => {
  const [subBudgets, setSubBudgets] = useState([]);
  const [newSubBudget, setNewSubBudget] = useState({
    title: "",
    amount: "",
    date: "",
    budget_id: budget?.id,
  });
  const [loading, setLoading] = useState(false);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  // Generate list of years from sub-budget dates and current year
  const getYears = () => {
    const years = new Set();
    subBudgets.forEach((sub) => {
      const year = new Date(sub.date).getFullYear();
      years.add(year);
    });
    years.add(new Date().getFullYear()); // Include current year
    return ["All", ...Array.from(years).sort((a, b) => b - a)];
  };

  // Generate list of months
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
    if (isOpen && budget) {
      setSubBudgets(budget?.subEvents || []);
      setNewSubBudget({ ...newSubBudget, budget_id: budget.id });
    }
  }, [isOpen, budget]);

  useEffect(() => {
    let temp = [...(budget?.subEvents || [])];
    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((sub) => {
        const subDate = new Date(sub.date);
        return subDate.getMonth() === monthIndex;
      });
    }
    if (filterYear !== "All") {
      temp = temp.filter((sub) => {
        const subDate = new Date(sub.date);
        return subDate.getFullYear() === parseInt(filterYear);
      });
    }
    setSubBudgets(temp);
  }, [filterMonth, filterYear, budget?.subEvents || []]);

  const handleDeleteSubBudget = async (subId) => {
    if (!subId) return;
    if (!confirm(`Are you sure you want to delete this sub-budget?`)) return;
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/personal/budgets/sub-events/${subId}`
      );
      if (res.status === 200) {
        const deletedSub = budget.subEvents.find((sb) => sb.id === subId);
        const updatedSubBudgets = budget.subEvents.filter((sb) => sb.id !== subId);
        setSubBudgets(updatedSubBudgets);
        toast.success("Sub-Budget Deleted Successfully!");
      } else {
        toast.error("Failed to delete sub-budget!");
      }
    } catch (error) {
      toast.error(`Error deleting sub-budget!`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-1/3 h-full p-6 overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">{budget.title} Entries</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="mb-4 flex gap-2">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="text-sm text-black px-2 rounded-full bg-green-200 border border-green-500"
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
            className="text-sm text-black px-2 rounded-full bg-green-200 border border-green-500"
          >
            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : subBudgets.length > 0 ? (
          <ul className="space-y-4 mb-6">
            {subBudgets.map((sub) => (
              <li
                key={sub.id}
                className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="text-black font-medium">{sub.title}</p>
                  <p className="text-sm text-gray-600">
                    Amount: {sub.amount} | Date: {sub.date}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSubBudget(sub.id)}
                  disabled={loading}
                >
                  <Trash2 size={18} />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No sub-budgets available.</p>
        )}
      </div>
    </div>
  );
};

export default SubBudgetDrawer;