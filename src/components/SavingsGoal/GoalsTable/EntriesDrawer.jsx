import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../../ui/Button";

const EntriesDrawer = ({
  isDrawerOpen,
  handleCloseDrawer,
  selectedGoal,
  handleOpenUpdateEntryModal,
  onAddNew,
}) => {
  const [goalEntries, setGoalEntries] = useState([]);

  useEffect(() => {
    if (isDrawerOpen && selectedGoal) {
      const fetchEntries = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoal.id}/entries`
          );
          if (response.ok) {
            const data = await response.json();
            setGoalEntries(data.entries || []);
          } else {
            toast.error("Failed to fetch entries");
            setGoalEntries([]);
          }
        } catch (error) {
          console.error("Fetch entries error:", error);
          toast.error("Error fetching entries");
          setGoalEntries([]);
        }
      };
      fetchEntries();
    }
  }, [isDrawerOpen, selectedGoal]);

  const handleDeleteEntry = async (entryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoal.id}/entries/${entryId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Entry deleted successfully");
        const entriesResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${selectedGoal.id}/entries`
        );
        if (entriesResponse.ok) {
          const data = await entriesResponse.json();
          setGoalEntries(data.entries || []);
        }
        onAddNew();
      } else {
        toast.error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Delete entry error:", error);
      toast.error("Error deleting entry");
    }
  };

  if (!isDrawerOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/10" onClick={handleCloseDrawer}></div>
      <div
        className="bg-white w-96 h-full shadow-lg p-6 overflow-y-auto transition-transform duration-300"
        style={{ transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Entries for {selectedGoal?.title}</h2>
          <button onClick={handleCloseDrawer} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {goalEntries.length > 0 ? (
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goalEntries.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">৳{entry.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{entry.entry_date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenUpdateEntryModal()}
                      className="p-1"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEntry(entry.id)}
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
          <p>No entries found for this goal.</p>
        )}
      </div>
    </div>
  );
};

export default EntriesDrawer;