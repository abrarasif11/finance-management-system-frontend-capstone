import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/AuthContext";
import GenericModal from "../ui/GenericModal";
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";

const BudgetSuggestionModal = ({ isOpen, onClose, budgets }) => {
  const { user } = useUser();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(user);

  useEffect(() => {
    if (isOpen && user?.user?.id) {
      getSuggestions();
    }
  }, [isOpen, user?.user?.id]);

  const getSuggestions = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SUGGESTION_API_URL}/budget/suggestions/`,
        budgets
      );
      console.log("API Response:", res.data); // Log the raw response
      setSuggestions(res?.data);
    } catch (e) {
      console.log("Error:", e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title={"Budget Related Suggestions"}>
      {loading? <LoadingSpinner/>:<div className="space-y-4">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">
                {suggestion.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {suggestion.description}
              </p>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    suggestion.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {suggestion.priority} Priority
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Generated: {new Date(suggestion.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No suggestions available.</p>
        )}
      </div>}
    </GenericModal>
  );
};

export default BudgetSuggestionModal;
