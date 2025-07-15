import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "../ui/Button";
import DeletionConfirmationModal from "../ui/DeletionConfirmationModal";

const LoanPaymentDrawer = ({ isOpen, onClose, loan }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  console.log(payments);

  // Generate list of years from payment dates and current year
  const getYears = () => {
    const years = new Set();
    payments?.forEach((payment) => {
      const year = new Date(payment.payment_date).getFullYear();
      years.add(year);
    });
    years.add(new Date().getFullYear()); // Include current year (2025 as of 04:55 PM +06, July 15, 2025)
    return ["All", ...Array.from(years).sort((a, b) => b - a)];
  };

  // Generate list of months
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (isOpen && loan) {
      fetchPayments();
    }
  }, [isOpen, loan]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${loan.id}/payment`
      );
      console.log(response?.data?.data)
      setPayments(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let temp = [...(loan?.payments || [])];
    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((payment) => {
        const paymentDate = new Date(payment.payment_date);
        return !isNaN(paymentDate) && paymentDate.getMonth() === monthIndex;
      });
    }
    if (filterYear !== "All") {
      temp = temp.filter((payment) => {
        const paymentDate = new Date(payment.payment_date);
        return (
          !isNaN(paymentDate) &&
          paymentDate.getFullYear() === parseInt(filterYear)
        );
      });
    }
    setPayments(temp);
  }, [filterMonth, filterYear]);

  const handleDeletePayment = async (paymentId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${
          loan.id
        }/payment/${paymentId}`
      );
      if (response.status === 200) {
        setPayments(payments.filter((p) => p.id !== paymentId));
        toast.success("Payment deleted successfully");
        setDeleteModalOpen(false);
      } else {
        toast.error("Failed to delete payment");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Error deleting payment");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (paymentId) => {
    setPaymentToDelete(paymentId);
    setDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
    setPaymentToDelete(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
        <div className="bg-white w-1/3 h-full p-6 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">
              {loan.loan_type} Payments
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="mb-4 flex gap-2">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="text-sm text-black px-2 rounded-full bg-green-200 border border-green-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="text-sm text-black px-2 rounded-full bg-green-200 border border-green-500"
            >
              {getYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : payments.length > 0 ? (
            <ul className="space-y-4 mb-6">
              {payments.map((payment) => (
                <li
                  key={payment.id}
                  className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="text-black font-medium">
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Amount: ৳{payment.amount_paid.toLocaleString()} | Balance:
                      ৳{payment.remaining_balance.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleOpenDelete(payment.id)}
                    disabled={loading}
                  >
                    <Trash2 size={18} />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No payments available.</p>
          )}
        </div>
        <DeletionConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDelete}
        onConfirm={() => handleDeletePayment(paymentToDelete)}
        itemName="this payment"
      />
      </div>
      
    </>
  );
};

export default LoanPaymentDrawer;
