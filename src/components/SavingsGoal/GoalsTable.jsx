// src/components/Dashboard/GoalsTable.jsx
import React from "react";

const GoalsTable = ({ goals }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Savings Goals</h2>
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
            </tr>
          </thead>
          <tbody>
            {goals.map(goal => {
              const progress = Math.min((goal.current_amount / goal.target_amount) * 100, 100);
              return (
                <tr key={goal.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{goal.title}</td>
                  <td className="px-4 py-3">৳{goal.target_amount.toLocaleString()}</td>
                  <td className="px-4 py-3">৳{goal.current_amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{progress.toFixed(1)}%</span>
                  </td>
                  <td className="px-4 py-3">{goal.start_date}</td>
                  <td className="px-4 py-3">{goal.end_date || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${
                        goal.status === "Completed"
                          ? "bg-green-600"
                          : goal.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {goal.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoalsTable;
