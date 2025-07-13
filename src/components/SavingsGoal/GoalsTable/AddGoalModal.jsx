import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../../contexts/AuthContext";

const AddGoalModal = ({ isAddModalOpen, handleAddNewClose, onAddNew }) => {
  const { user } = useUser();
  const [newGoalData, setNewGoalData] = useState({
    title: "",
    target_amount: "",
    current_amount: "",
    description: "",
    start_date: "",
    end_date: "",
    user_id: user?.user?.id,
  });

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData({ ...newGoalData, [name]: value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGoalData),
        }
      );
      if (response.ok) {
        toast.success("New goal added successfully");
        handleAddNewClose();
      } else {
        toast.error("Failed to add new goal");
      }
    } catch (error) {
      console.error("Add new goal error:", error);
      toast.error("Error adding new goal");
    }
  };

  if (!isAddModalOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-black font-bold">Add New Goal</h2>
          <button
            onClick={handleAddNewClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            name="title"
            value={newGoalData.title}
            onChange={handleAddInputChange}
            placeholder="Enter goal title"
            className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="target_amount"
            value={newGoalData.target_amount}
            onChange={handleAddInputChange}
            placeholder="Enter target amount"
            className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="current_amount"
            value={newGoalData.current_amount}
            onChange={handleAddInputChange}
            placeholder="Enter current amount"
            className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="description"
            value={newGoalData.description}
            onChange={handleAddInputChange}
            placeholder="Enter description"
            className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
          />
          <div>
            <label htmlFor="" className="text-sm text-black">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={newGoalData.start_date || new Date().toISOString().split("T")[0]}
              onChange={handleAddInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm text-black">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={newGoalData.end_date}
              onChange={handleAddInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
          >
            Add Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
