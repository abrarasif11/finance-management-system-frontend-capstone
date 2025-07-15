import React, { useState } from "react";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import DeletionConfirmationModal from "../ui/DeletionConfirmationModal";
import UpdateLoanModal from "./UpdateLoanModal";
import AddPaymentModal from "./AddPaymentModal";
import LoanPaymentDrawer from "./LoanPaymentDrawer";
import { Edit, Plus, Trash } from "lucide-react";

const LoanTableBody = ({ currentLoans, handleOpen, }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);

  // Delete Function
  const handleDelete = async (loanId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${loanId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Loan deleted successfully");
        // Refresh data
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

  // Handle Edit click
  const handleEdit = (loan) => {
    console.log(loan)
    setSelectedLoan(loan);
    setUpdateModalOpen(true);
  };

  // Handle Add Payment click
  const handleAddPayment = (loan) => {
    setSelectedLoan(loan);
    setPaymentModalOpen(true);
  };

  // Handle Row Click to open payment drawer
  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
    setPaymentDrawerOpen(true);
  };

  return (
    <>
      <tbody>
        {currentLoans.length > 0 ? (
          currentLoans
            .slice()
            .reverse()
            .map((loan) => (
              <tr
                key={loan.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(loan)}
              >
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleAddPayment(loan);
                    }}
                  >
                    <Plus size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleEdit(loan);
                    }}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleOpenDelete(loan.id);
                    }}
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
      <DeletionConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={() => handleDelete(loanToDelete)}
        itemName="this loan"
      />
      <UpdateLoanModal
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        loan={selectedLoan}
        
      />
      <AddPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        loanId={selectedLoan?.id}
      />
      <LoanPaymentDrawer
        isOpen={paymentDrawerOpen}
        onClose={() => setPaymentDrawerOpen(false)}
        loan={selectedLoan}
      />
    </>
  );
};

export default LoanTableBody;