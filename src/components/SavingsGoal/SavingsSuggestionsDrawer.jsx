import React, { useState, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const SavingsSuggestionsDrawer = ({ isOpen, onClose, userId, goals }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      fetchSuggestions();
    }
  }, [isOpen, userId]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SUGGESTION_API_URL}/savings/suggestions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goals), // Replace with actual goals data
        }
      );
      const data = await response.json();
      console.log(data);
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching savings suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-1/3 h-full p-6 overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black first-letter:text-xl font-bold">
            Savings Suggestions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : suggestions.length > 0 ? (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="text-black p-2 bg-green-100 rounded-md shadow-sm hover:bg-gray-200 transition"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default SavingsSuggestionsDrawer;
