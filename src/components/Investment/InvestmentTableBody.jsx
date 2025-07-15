import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Edit, Plus, Trash, X } from "lucide-react";
import toast from "react-hot-toast";

const InvestmentTableBody = ({ currentInvestments }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [investmentToDelete, setInvestmentToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [investmentToEdit, setInvestmentToEdit] = useState(null);

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

  // Open edit modal and set investment data
  const handleOpenEdit = (investment) => {
    setInvestmentToEdit({ ...investment });
    setEditModalOpen(true);
  };

  // Handle update submission
  const handleUpdateInvestment = async () => {
    if (!investmentToEdit?.id) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/investments/${investmentToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: investmentToEdit.title,
            investment_type: investmentToEdit.investment_type,
            institution: investmentToEdit.institution,
            initial_amount: parseFloat(investmentToEdit.initial_amount),
            current_value: parseFloat(investmentToEdit.current_value),
            start_date: investmentToEdit.start_date,
            end_date: investmentToEdit.end_date || null,
            status: investmentToEdit.status,
            notes: investmentToEdit.notes || "",
          }),
        }
      );
      if (response.ok) {
        toast.success("Investment updated successfully");
        setEditModalOpen(false);
        setInvestmentToEdit(null);
      } else {
        console.log(response);
        toast.error("Failed to update investment");
      }
    } catch (error) {
      console.error("Error updating investment:", error);
      toast.error("Error updating investment");
    }
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
                onClick={() => handleOpenEdit(investment)}
              >
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
      {editModalOpen && investmentToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                Edit Investment
              </h2>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                <X size={18} />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateInvestment();
              }}
              className="space-y-4 w-full max-w-xl"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={investmentToEdit.title}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Investment Type *
                </label>
                <select
                  value={investmentToEdit.investment_type}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      investment_type: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                >
                  <option value="Stock">Stock</option>
                  <option value="MutualFund">Mutual Fund</option>
                  <option value="FixedDeposit">Fixed Deposit</option>
                  <option value="Bond">Bond</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution *
                </label>
                <input
                  type="text"
                  value={investmentToEdit.institution || ""}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      institution: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={investmentToEdit.initial_amount}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      initial_amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Value *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={investmentToEdit.current_value}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      current_value: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    value={investmentToEdit.start_date}
                    onChange={(e) =>
                      setInvestmentToEdit({
                        ...investmentToEdit,
                        start_date: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={investmentToEdit.end_date || ""}
                    onChange={(e) =>
                      setInvestmentToEdit({
                        ...investmentToEdit,
                        end_date: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  value={investmentToEdit.status}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                >
                  <option value="Active">Active</option>
                  <option value="Matured">Matured</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={investmentToEdit.notes || ""}
                  onChange={(e) =>
                    setInvestmentToEdit({
                      ...investmentToEdit,
                      notes: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-black border"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  variant="outline"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Investment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentTableBody;