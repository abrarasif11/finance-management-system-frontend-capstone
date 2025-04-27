import { useState, useEffect } from "react";
import Pagination from "../../Shared/Pagination";
import { Button } from "../ui/Button";
import { Edit, Edit2, Plus, Trash2 } from "lucide-react";

const BudgetTable = ({
  budgets,
  onAddNew,
  onUpdate,
  onDelete,
  onAddSubEvent,
}) => {
  const [filterType, setFilterType] = useState("All");
  const [sortOption, setSortOption] = useState("amount-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    let temp = [...budgets];

    // Filter by type
    if (filterType !== "All") {
      temp = temp.filter((budget) => budget.type === filterType);
    }

    // Search across title, type, start_date, end_date
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (budget) =>
          budget.title.toLowerCase().includes(query) ||
          budget.type.toLowerCase().includes(query) ||
          budget.start_date.toLowerCase().includes(query) ||
          budget.end_date.toLowerCase().includes(query)
      );
    }

    // Sort
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [budgets, filterType, sortOption, searchQuery]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBudgets.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredBudgets.length / rowsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-2">
        {/* Left: Filter + Sort */}
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

        {/* Middle: Search */}
        <div>
          <input
            type="text"
            placeholder="Search budgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
          />
        </div>

        {/* Right: Add Button */}
        <div>
          <button
            onClick={onAddNew}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add New Budget
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b text-left">Remaining</th>
              <th className="py-2 px-4 border-b text-left">Progress</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Start Date</th>
              <th className="py-2 px-4 border-b text-left">End Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((budget) => {
              const progress =
                ((budget.total_amount - budget.remaining) /
                  budget.total_amount) *
                100;

              return (
                <tr key={budget.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {budget.title}
                  </td>
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
                  <td className="px-4 py-3">{budget.end_date.split(" ")[0]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${
                        budget?.total_amount == budget?.remaining
                          ? "bg-red-600"
                          : budget?.total_amount > budget?.remaining &&
                            budget?.total_amount != budget?.remaining
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {budget?.total_amount == budget?.remaining
                        ? "Assigned"
                        : budget?.total_amount > budget?.remaining &&
                          budget?.total_amount != budget?.remaining
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => onAddSubEvent(budget)}
                      className="text-green-600 hover:underline"
                      title="Add New Entry"
                    >
                      <Plus size={18} />
                    </Button>
                    <Button variant="outline" onClick={() => onUpdate(budget)}>
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(budget)}
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

      {/* Pagination Controls */}
      <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
    </div>
  );
};

export default BudgetTable;
