import React, { useState } from "react";
import toast from "react-hot-toast";

const AddEntryModal = ({
  isAddEntryModalOpen,
  handleAddEntryClose,
  selectedGoal,
  user,
}) => {
  const [newEntryData, setNewEntryData] = useState({
    amount: "",
    entry_date: new Date().toISOString().split("T")[0],
  });

  const handleAddEntryInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntryData({ ...newEntryData, [name]: value });
  };
  const handleAddEntrySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/goal-entry/${
          selectedGoal?.id
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newEntryData, user_id: user?.user?.id }),
        }
      );
      if (response.ok) {
        toast.success("Entry added successfully");
        handleAddEntryClose();
      } else {
        toast.error("Failed to add entry");
      }
    } catch (error) {
      console.error("Add entry error:", error);
      toast.error("Error adding entry");
    }
  };

  if (!isAddEntryModalOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">
            Add Entry to {selectedGoal?.title}
          </h2>
          <button
            onClick={handleAddEntryClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleAddEntrySubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={newEntryData.amount}
              onChange={handleAddEntryInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Entry Date
            </label>
            <input
              type="date"
              name="entry_date"
              value={newEntryData.entry_date}
              onChange={handleAddEntryInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;
