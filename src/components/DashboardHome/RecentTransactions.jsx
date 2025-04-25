// src/components/Dashboard/RecentTransactions.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../Shared/Pagination";

const RecentTransactions = ({ props }) => {
  const { transactions } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Calculate indexes
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = transactions.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(transactions.length / recordsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-black text-xl font-semibold mb-2">
        Recent Transactions
      </h2>
      <table className="text-black w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Type</th>
            <th className="p-2">Title/Source</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((trx) => (
            <tr key={trx.id} className="border-t text-center">
              <td
                className={`p-2 ${
                  (trx.source && "text-green-500") ||
                  (trx.title && "text-red-500")
                }`}
              >
                {(trx.source && "Income") || (trx.title && "Expense")}
              </td>
              <td className="p-2">{trx.title ? trx.title : trx.source}</td>
              <td className="p-2">৳{trx.amount}</td>
              <td className="p-2">{trx.category}</td>
              <td className="p-2">{trx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
    </div>
  );
};

export default RecentTransactions;
  