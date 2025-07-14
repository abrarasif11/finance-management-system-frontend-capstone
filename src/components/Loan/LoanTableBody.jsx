import { Edit, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

const LoanTableBody = ({ currentLoans, handleOpen }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);
  // Delete Function
  const handleDelete = async (loanId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${loanId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Loan deleted successfully");
        setDeleteModalOpen(false);
      } else {
        console.log(response);
        toast.error("Failed to delete Loan");
      }
    } catch (error) {
      console.error("Error deleting Loan:", error);
      toast.error("Error deleting Loan");
    }
  };

  // Open deletion confirmation modal
  const handleOpenDelete = (loanId) => {
    setLoanToDelete(loanId);
    setDeleteModalOpen(true);
  };

  // Close deletion confirmation modal
  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
    setLoanToDelete(null);
  };
  return (
    <>
      <tbody>
        {currentLoans.length > 0 ? (
          currentLoans
            .slice()
            .reverse()
            .map((loan) => (
              <tr key={loan.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{loan.loan_type}</td>
                <td className="px-4 py-3">{loan.lender_name}</td>
                <td className="px-4 py-3">
                  ৳{loan.principal_amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ৳{loan.total_payable.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ৳{loan.total_paid.toLocaleString()}
                </td>
                <td className="px-4 py-3">৳{loan.due.toLocaleString()}</td>
                <td className="px-4 py-3">{loan.interest_rate}%</td>
                <td className="px-4 py-3">
                  {new Date(loan.start_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {loan.end_date
                    ? new Date(loan.end_date).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  {new Date(loan.next_payment_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{loan.payment_frequency}</td>
                <td className="px-4 py-3">
                  {loan.due > 0
                    ? new Date(loan.next_payment_date) < new Date()
                      ? "Overdue"
                      : "Active"
                    : "Paid"}
                </td>

                <td className="flex gap-2 px-4 py-3">
                  <Button
                    variant="outline"
                    className="text-green-500 hover:text-green-700"
                  >
                    <Plus size={18} />
                  </Button>
                  <Button variant="outline" onClick={() => handleOpen(loan)}>
                    <Edit size={18} />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleOpenDelete(loan.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={18} />
                  </Button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="14" className="px-4 py-3 text-center text-gray-500">
              No loans found.
            </td>
          </tr>
        )}
      </tbody>
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the Loan titled{" "}
              {currentLoans.find((inv) => inv.id === loanToDelete)
                ?.title || "this Loan"}
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
                onClick={() => handleDelete(loanToDelete)}
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

export default LoanTableBody;
