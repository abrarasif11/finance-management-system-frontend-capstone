import React, { useState, useEffect } from "react";
import { DollarSign, AlertCircle, CheckCircle } from "lucide-react";

const LoanAnalytics = ({ loans }) => {
  const currentDate = new Date("2025-07-02T00:40:00+06:00"); // Current date and time
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });

  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterMonth, setFilterMonth] = useState(currentMonth);

  // Generate unique years from loans
  const years = Array.from(
    new Set(loans.map((loan) => new Date(loan.start_date).getFullYear()))
  ).sort((a, b) => a - b);

  // List of months
  const months = [
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

  // Filter loans based on year and month
  const filteredLoans = loans.filter((loan) => {
    const loanDate = new Date(loan.start_date);
    const loanYear = loanDate.getFullYear();
    const loanMonth = loanDate.toLocaleString("en-US", { month: "long" });
    return (
      (!filterYear || loanYear === parseInt(filterYear)) &&
      (!filterMonth || loanMonth === filterMonth)
    );
  });

  const totalLoan = filteredLoans.reduce((sum, loan) => sum + (loan.principal_amount || 0), 0);
  const totalDue = filteredLoans.reduce((sum, loan) => sum + (loan.due || 0), 0);
  const clearedLoans = filteredLoans.filter((loan) => loan.due <= 0).length;

  return (
    <div className="bg-white rounded-lg shadow-md mb-3">
      {/* Filter Section */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <p className="text-2xl text-shadow-lg text-black font-bold">Loans</p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">Filter by Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">Filter by Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Total Loan Card */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Loan</p>
              <p className="text-2xl font-semibold text-gray-900">৳{totalLoan.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Due Card */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Due</p>
              <p className="text-2xl font-semibold text-gray-900">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Cleared Loans Card */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cleared Loans</p>
              <p className="text-2xl font-semibold text-gray-900">{clearedLoans}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAnalytics;