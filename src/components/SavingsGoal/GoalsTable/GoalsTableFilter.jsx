import React from "react";
import { Button } from "../../ui/Button";


const GoalsTableFilter = ({
  filterStatus,
  setFilterStatus,
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  reportFormat,
  setReportFormat,
  generateReport,
  handleAddNewOpen,
  statuses,
  months,
  years,
}) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-800">Savings Goals</h2>
    <div className="flex gap-3 items-center">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
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
      <input
        type="text"
        placeholder="Search goals..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
      />
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
      <Button onClick={handleAddNewOpen} className="py-2">
        Add New Goal
      </Button>
    </div>
  </div>
);

export default GoalsTableFilter;
