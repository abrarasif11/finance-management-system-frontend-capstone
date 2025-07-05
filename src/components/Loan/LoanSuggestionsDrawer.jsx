import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

const LoanSuggestionsDrawer = ({ suggestions: initialSuggestions, isOpen, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const closeDrawer = () => setIsOpen(false);

  // Filter suggestions based on search term
  const filteredSuggestions = initialSuggestions.filter((loan) =>
    loan.loan_id.toString().includes(searchTerm.toLowerCase()) ||
    loan.lender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loan_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-4xl bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-96 overflow-y-auto z-50`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Loan Suggestions</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by ID, Name, or Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 border rounded-lg text-sm bg-white text-black focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <Button
              variant="outline"
              onClick={closeDrawer}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        <hr className="mb-3" />
        {filteredSuggestions.length === 0 ? (
          <p className="text-gray-500">
            {searchTerm ? "No matching suggestions found." : "No suggestions available."}
          </p>
        ) : (
          <div>
            {filteredSuggestions.map((loan) => (
              <div key={loan.loan_id} className="mb-6 border-b pb-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {loan.lender_name} - {loan.loan_type}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ID: {loan.loan_id} | Start: {loan.start_date?.split("T")[0]} | End:{" "}
                    {loan.end_date?.split("T")[0]}
                  </p>
                </div>
                <ul className="mt-2 space-y-2">
                  {loan.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`p-3 rounded-lg ${
                        suggestion.type === "increase"
                          ? "bg-green-100 text-green-800"
                          : suggestion.type === "early"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {suggestion.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanSuggestionsDrawer;