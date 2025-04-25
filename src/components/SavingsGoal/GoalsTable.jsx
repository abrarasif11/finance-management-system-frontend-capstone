// src/components/Dashboard/GoalsTable.jsx
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import { useUser } from "../../contexts/AuthContext";

const GoalsTable = ({ goals }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [editGoalData, setEditGoalData] = useState({});
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const handleOpen = (goal) => {
    setEditGoalData(goal);
    setSelectedGoalId(goal.id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditGoalData({});
    setSelectedGoalId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditGoalData({ ...editGoalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(
        `https://api-financial-management-system.vercel.app/api/v1/personal/savings-goals/${selectedGoalId}?user_id=${user?.user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editGoalData),
        }
      );

      if (response.status == parseInt(200)) {
        toast.success("Goal updated successfully");
        handleClose();
      } else {
        toast.error("Failed to update goal");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating goal");
    }
  };

  const handleDelete = async (goalId) => {
    try {
      const response = await fetch(
        `https://api-financial-management-system.vercel.app/api/v1/personal/savings-goals/${goalId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Goal deleted successfully");
      } else {
        toast.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Error deleting goal");
    }
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
                    <Button
                      onClick={() => handleOpen(goal)}
                      variant="outline"
                      className="mx-1"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(goal.id)}
                      variant="destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
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
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <small className="text-gray-500">
                  Current: {editGoalData.title}
                </small>
                <input
                  type="text"
                  name="title"
                  value={editGoalData.title || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
                  placeholder="Enter goal title"
                />
              </div>

              {/* Target Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Amount
                </label>
                <small className="text-gray-500">
                  Current: {editGoalData.target_amount}
                </small>
                <input
                  type="number"
                  name="target_amount"
                  value={editGoalData.target_amount || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
                  placeholder="50000"
                />
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={editGoalData.description || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
                  placeholder="e.g. Buying a 4060 GPU"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={editGoalData.start_date || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded bg-white focus:ring text-black focus:ring-blue-300"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={editGoalData.end_date || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded bg-white focus:ring text-black focus:ring-blue-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 font-semibold text-white rounded transition hover:bg-green-600"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsTable;
