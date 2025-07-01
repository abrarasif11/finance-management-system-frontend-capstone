import React from "react";

const LoanTableFilter = ({
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
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
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
      </div>

      {/* Search and Sort */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search loans..."
          className="bg-white text-black border border-gray-400 p-2 rounded w-72 outline-none"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
        >
          <option value="date-newest">Date (Newest)</option>
          <option value="date-oldest">Date (Oldest)</option>
          <option value="amount-asc">Amount (Low to High)</option>
          <option value="amount-desc">Amount (High to Low)</option>
        </select>
      </div>

      {/* Report and Add New */}
      <div className="flex flex-wrap gap-4">
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
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Report
        </button>
        <button
          onClick={handleAddNewOpen}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Loan
        </button>
      </div>
    </div>
  );
};

export default LoanTableFilter;