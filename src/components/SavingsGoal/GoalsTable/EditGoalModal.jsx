import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditGoalModal = ({ isOpen, handleClose, selectedGoalId, user, onAddNew }) => {
  const [editGoalData, setEditGoalData] = useState({});

  useEffect(() => {
    if (selectedGoalId && user) {
      const fetchGoalData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoalId}`
          );
          if (response.ok) {
            const data = await response.json();
            
            setEditGoalData(data || {});
          } else {
            toast.error("Failed to fetch goal data");
          }
        } catch (error) {
          console.error("Fetch goal error:", error);
          toast.error("Error fetching goal data");
        }
      };
      fetchGoalData();
    }
  }, [selectedGoalId, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditGoalData({ ...editGoalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoalId}?user_id=${user?.user?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editGoalData),
        }
      );
      if (response.status === 200) {
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

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
        <div className="flex justify-between items-center">
          <h2 className="text-black text-lg font-semibold">Update Savings Goal</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={editGoalData.title || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
              placeholder="Enter goal title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Amount</label>
            <input
              type="number"
              name="target_amount"
              value={editGoalData.target_amount || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={editGoalData.description || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
              placeholder="e.g. Buying a GPU"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={editGoalData.start_date?.split(" "[0]) || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="end_date"
              value={editGoalData.end_date?.split(" "[0]) || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 font-semibold text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGoalModal;