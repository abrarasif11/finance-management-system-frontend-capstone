import React, { useState } from "react";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

const AddPaymentModal = ({ isOpen, onClose, loanId}) => {
  const [formData, setFormData] = useState({
    payment_date: new Date().toISOString().split("T")[0], // Default to today in YYYY-MM-DD
    amount_paid: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert payment_date to ISO-8601 DateTime by appending time (e.g., 00:00:00Z)
    const isoDateTime = `${formData.payment_date}T00:00:00.000Z`;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/${loanId}/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, payment_date: isoDateTime }),
        }
      );
      if (response.ok) {
        toast.success("Payment added successfully");
        onClose();
      } else {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        toast.error("Failed to add payment");
      }
    } catch (error) {
      console.error("Error adding payment:",error);
      toast.error("Error adding payment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
        <h2 className="text-black text-lg font-semibold">Add Payment</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Date</label>
          <input
            type="date"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.payment_date}
            onChange={(e) =>
              setFormData({ ...formData, payment_date: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
          <input
            type="number"
            placeholder="Amount Paid"
            className="w-full block text-black bg-white border border-gray-400 outline-none input"
            value={formData.amount_paid}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount_paid: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            placeholder="Notes"
            className="w-full block text-black bg-white border border-gray-400 outline-none input h-24 resize-none"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;