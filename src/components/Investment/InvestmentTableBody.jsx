import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Edit, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

const InvestmentTableBody = ({ currentInvestments }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [investmentToDelete, setInvestmentToDelete] = useState(null);
  // Delete Function
  const handleDelete = async (investmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/investments/${investmentId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Investment deleted successfully");
        setDeleteModalOpen(false);
      } else {
        console.log(response);
        toast.error("Failed to delete investment");
      }
    } catch (error) {
      console.error("Error deleting investment:", error);
      toast.error("Error deleting investment");
    }
  };

  // Open deletion confirmation modal
  const handleOpenDelete = (investmentId) => {
    setInvestmentToDelete(investmentId);
    setDeleteModalOpen(true);
  };

  // Close deletion confirmation modal
  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
    setInvestmentToDelete(null);
  };
  return (
    <>
      <tbody>
        {currentInvestments.map((investment) => (
          <tr key={investment.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3">{investment.title}</td>
            <td className="px-4 py-3">{investment.investment_type}</td>
            <td className="px-4 py-3">{investment.institution}</td>
            <td className="px-4 py-3">
              BDT {investment.initial_amount.toLocaleString()}
            </td>
            <td className="px-4 py-3">
              BDT {investment.current_value.toLocaleString()}
            </td>
            <td className="px-4 py-3">
              {new Date(investment.start_date).toLocaleDateString()}
            </td>
            <td className="px-4 py-3">
              {investment.end_date
                ? new Date(investment.end_date).toLocaleDateString()
                : "—"}
            </td>
            <td className="px-4 py-3">{investment.status}</td>
            <td className="px-4 py-3 space-x-2">
              <Button
                variant="outline"
                className="text-green-500 hover:text-green-700"
              >
                <Plus size={18} />
              </Button>
              <Button variant="outline" onClick={() => handleOpen(investment)}>
                <Edit size={18} />
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleOpenDelete(investment.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the investment titled{" "}
              {currentInvestments.find((inv) => inv.id === investmentToDelete)
                ?.title || "this investment"}
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={handleCloseDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(investmentToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentTableBody;
