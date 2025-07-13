import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../ui/Button";
import DeletionConfirmationModal from "../../ui/DeletionConfirmationModal";

const EntriesDrawer = ({
  isDrawerOpen,
  handleCloseDrawer,
  selectedGoal,
  handleOpenUpdateEntryModal,
  onAddNew,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [entryIdToDelete, setEntryIdToDelete] = useState(null);
  
  const handleDeleteEntry = async (entryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${
          selectedGoal.id
        }/goal-entry/${entryId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Entry deleted successfully");
        setShowDeleteConfirm(false); // Close modal on success
      } else {
        toast.error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Delete entry error:", error);
      toast.error("Error deleting entry");
    }finally{
      handleCloseDrawer()
    }
  };

  const handleConfirmDelete = (entryId) => {
    console.log(entryId)
    setEntryIdToDelete(entryId);
    setShowDeleteConfirm(true);
  };

  if (!isDrawerOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/10" onClick={handleCloseDrawer}></div>
      <div
        className="bg-white w-full max-w-lg h-full shadow-lg p-6 overflow-y-auto transition-transform duration-300"
        style={{
          transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">
            Entries for {selectedGoal?.title}
          </h2>
          <button
            onClick={handleCloseDrawer}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {selectedGoal?.goal_entries?.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedGoal?.goal_entries?.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    ৳{entry.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{entry.entry_date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleConfirmDelete(entry.id)}
                      className="p-1"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">No entries found for this goal.</p>
        )}
        {showDeleteConfirm && (
          <DeletionConfirmationModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            itemName="goal entry"
            onConfirm={() => handleDeleteEntry(entryIdToDelete)}
          />
        )}
      </div>
    </div>
  );
};

export default EntriesDrawer;
