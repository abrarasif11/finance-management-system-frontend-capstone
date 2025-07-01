import { Edit, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";

const LoanTableBody = ({ currentLoans, handleOpen, handleDelete }) => {
  return (
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
              <td className="px-4 py-3">৳{loan.total_paid.toLocaleString()}</td>
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
                <Button variant="outline" className="text-green-500 hover:text-green-700">
                  <Plus size={18} />
                </Button>
                <Button variant="outline" onClick={() => handleOpen(loan)}>
                  <Edit size={18} />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(loan.id)}
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
  );
};

export default LoanTableBody;
