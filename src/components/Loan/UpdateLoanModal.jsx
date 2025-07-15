import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

const UpdateLoanModal = ({ isOpen, onClose, loan }) => {
  const [formData, setFormData] = useState({
    loan_type: "",
    lender_name: "",
    principal_amount: 0,
    total_payable: 0,
    interest_rate: 0,
    start_date: "",
    end_date: "",
    payment_frequency: "Monthly",
    number_of_payments: 0,
    remaining_payments: 0,
  });
  const [loading, setLoading] = useState(false);

  // Update formData when loan prop changes
  useEffect(() => {
    if (loan) {
      setFormData({
        loan_type: loan.loan_type || "",
        lender_name: loan.lender_name || "",
        principal_amount: loan.principal_amount || 0,
        total_payable: loan.total_payable || 0,
        interest_rate: loan.interest_rate || 0,
        start_date: loan.start_date || "",
        end_date: loan.end_date || "",
        payment_frequency: loan.payment_frequency || "Monthly",
        number_of_payments: loan.number_of_payments || 0,
        remaining_payments: loan.remaining_payments || 0,
      });
    }
  }, [loan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${loan.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Loan updated successfully");
        onClose();
      } else {
        toast.error("Failed to update loan");
      }
    } catch (error) {
      console.error("Error updating loan:", error);
      toast.error("Error updating loan");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
        <h2 className="text-black text-lg font-semibold">Update Loan</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loan Type
          </label>
          <input
            type="text"
            placeholder="Loan Type"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.loan_type}
            onChange={(e) =>
              setFormData({ ...formData, loan_type: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lender Name
          </label>
          <input
            type="text"
            placeholder="Lender Name"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.lender_name}
            onChange={(e) =>
              setFormData({ ...formData, lender_name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Principal Amount
          </label>
          <input
            type="number"
            placeholder="Principal Amount"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.principal_amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                principal_amount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Payable
          </label>
          <input
            type="number"
            placeholder="Total Payable"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.total_payable}
            onChange={(e) =>
              setFormData({
                ...formData,
                total_payable: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interest Rate (%)
          </label>
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.interest_rate}
            onChange={(e) =>
              setFormData({
                ...formData,
                interest_rate: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="w-full flex items-center justify-between gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={formData.end_date || ""}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              value={formData.payment_frequency}
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              onChange={(e) =>
                setFormData({ ...formData, payment_frequency: e.target.value })
              }
            >
              <option value="Weekly">Weekly</option>
              <option value="BiWeekly">BiWeekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Payments
            </label>
            <input
              type="number"
              placeholder="Number of Payments"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={formData.number_of_payments}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  number_of_payments: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remaining Payments
            </label>
            <input
              type="number"
              placeholder="Remaining Payments"
              className="w-full block text-black bg-white border border-gray-400 outline-none input"
              value={formData.remaining_payments}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remaining_payments: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLoanModal;
