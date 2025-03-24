// src/components/Dashboard/RecentTransactions.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const RecentTransactions = () => {
  const transactions = [
    { id: 1, title: "Groceries", amount: "৳3,000", type: "Expense", date: "2025-02-22" },
    { id: 2, title: "Salary", amount: "৳20,000", type: "Income", date: "2025-02-01" },
    { id: 3, title: "Rent", amount: "৳7,000", type: "Expense", date: "2025-02-10" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-black text-xl font-semibold mb-2">Recent Transactions</h2>
      <table className="text-black w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trx) => (
            <tr key={trx.id} className="border-t">
              <td className="p-2">{trx.title}</td>
              <td className="p-2">{trx.amount}</td>
              <td className={`p-2 ${trx.type === "Income" ? "text-green-500" : "text-red-500"}`}>
                {trx.type}
              </td>
              <td className="p-2">{trx.date}</td>
              <td className="p-2 flex gap-2">
                <FaEdit className="text-blue-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
