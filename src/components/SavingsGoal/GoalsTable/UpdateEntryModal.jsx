import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateEntryModal = ({ isUpdateEntryModalOpen, handleCloseUpdateEntryModal, selectedGoal, onAddNew }) => {
  const [updateEntryData, setUpdateEntryData] = useState({
    amount: "",
    entry_date: "",
    id: null,
  });

  const handleUpdateEntryInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEntryData({ ...updateEntryData, [name]: value });
  };

  const handleUpdateEntrySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoal.id}/entries/${updateEntryData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(updateEntryData.amount), entry_date: updateEntryData.entry_date }),
        }
      );
      if (response.ok) {
        toast.success("Entry updated successfully");
        handleCloseUpdateEntryModal();
        onAddNew();
      } else {
        toast.error("Failed to update entry");
      }
    } catch (error) {
      console.error("Update entry error:", error);
      toast.error("Error updating entry");
    }
  };

  if (!isUpdateEntryModalOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Update Entry</h2>
          <button onClick={handleCloseUpdateEntryModal} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <form onSubmit={handleUpdateEntrySubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={updateEntryData.amount}
              onChange={handleUpdateEntryInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Entry Date</label>
            <input
              type="date"
              name="entry_date"
              value={updateEntryData.entry_date}
              onChange={handleUpdateEntryInputChange}
              className="w-full mt-1 p-2 border rounded text-black bg-white focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 font-semibold text-white rounded hover:bg-blue-700"
          >
            Update Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEntryModal;