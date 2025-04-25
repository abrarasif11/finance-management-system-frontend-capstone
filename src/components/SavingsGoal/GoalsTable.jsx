// src/components/Dashboard/GoalsTable.jsx
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/Button";

const GoalsTable = ({ goals }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    handleClose();
  };
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
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => {
              const progress = Math.min(
                (goal.current_amount / goal.target_amount) * 100,
                100
              );
              return (
                <tr key={goal.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {goal.title}
                  </td>
                  <td className="px-4 py-3">
                    ৳{goal.target_amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    ৳{goal.current_amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {progress.toFixed(1)}%
                    </span>
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
                  <td>
                    <Button  onClick={handleOpen} variant="outline" className="mx-1">
                      <Edit size={16} />
                    </Button>
                    {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Update Savings Goal</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                   Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-1 bg-white p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Vacation Fund"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm  font-medium text-gray-700"
                  >
                   Target Amount
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="50000"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Amount
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="10000"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="2025-09-01"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="Bio"
                    className="w-full mt-1 p-2 border rounded  bg-white focus:ring focus:ring-blue-300"
                    placeholder="2025-09-01"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 font-semibold to-green-800 text-white rounded  transition"
                >
                  Update 
                </button>
              </form>
            </div>
          </div>
        )}
                    <Button variant="destructive">
                      <Trash2 size={16} />
                    </Button>
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
