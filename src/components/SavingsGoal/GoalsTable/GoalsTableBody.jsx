import React, { useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/Button";
import DeletionConfirmationModal from "../../ui/DeletionConfirmationModal";
import toast from "react-hot-toast";

const GoalsTableBody = ({
  filteredGoals,
  handleOpen,
  handleAddEntryOpen,
  handleOpenDrawer,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  // Delete Function
  const handleDelete = async (goalId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/savings-goals/${goalId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Goal deleted successfully");
      } else {
        toast.error("Failed to delete goal");
      }
    } catch (error) {
      toast.error("Error deleting goal");
    }finally{
      setIsDeleteModalOpen(false)
    }
  };
  
  return (
    <>
      <tbody>
        {filteredGoals.map((goal) => {
          const progress = Math.min(
            (goal.current_amount / goal.target_amount) * 100,
            100
          );
          return (
            <tr
              key={goal.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => handleOpenDrawer(goal)}
            >
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
                    goal.status == "Completed"
                      ? "bg-green-600"
                      : goal.status == "In Progress"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {goal.status}
                </span>
              </td>
              <td className="flex items-center gap-2 my-4">
                <Button
                  variant="outline"
                  title="Add New Entry"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddEntryOpen(goal);
                  }}
                >
                  <Plus size={16} />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(goal);
                  }}
                  variant="outline"
                  className="mx-1"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemToDelete(goal.id);
                    setIsDeleteModalOpen(true);
                  }}
                  variant="destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeletionConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemName="goal"
        onConfirm={() => handleDelete(itemToDelete)}
      />
    </>
  );
};

export default GoalsTableBody;
