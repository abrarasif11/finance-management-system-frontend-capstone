// src/components/Dashboard/RecentTransactions.jsx
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../Shared/Pagination";
import { Button } from "../ui/Button";

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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Recent Transactions
      </h2>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 uppercase text-xs text-gray-600">
          <tr className="text-center border-b hover:bg-gray-50">
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Title/Source</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((trx) => (
            <tr key={trx.id} className="border-t text-center border-b hover:bg-gray-50">
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
              <td>
                    <Button variant="outline" className="mx-1">
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive">
                      <Trash2 size={16} />
                    </Button>
                  </td>
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
