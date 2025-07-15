import React, { useState, useEffect } from "react";
import { Target, CheckCircle, Clock } from "lucide-react";
import { useUser } from "../../contexts/AuthContext";
import SavingsSuggestionsDrawer from "./SavingsSuggestionsDrawer";
import axios from "axios";

const TopCards = ({ totalGoals, completedGoals, inProgressGoals, goals }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date("2025-07-14T22:02:00+06:00"); // Current date and time
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const [filterYear, setFilterYear] = useState(currentYear.toString());
  const [filterMonth, setFilterMonth] = useState(currentMonth);

  // Generate unique years from goals
  const years = Array.from(
    new Set(goals.map((goal) => new Date(goal.start_date).getFullYear()))
  ).sort((a, b) => a - b);

  // List of months
  const months = [
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

  // Filter goals based on year and month
  const filteredGoals = goals.filter((goal) => {
    const goalDate = new Date(goal.start_date);
    const goalYear = goalDate.getFullYear();
    const goalMonth = goalDate.toLocaleString("en-US", { month: "long" });
    return (
      (!filterYear || goalYear === parseInt(filterYear)) &&
      (!filterMonth || goalMonth === filterMonth)
    );
  });

  const filteredTotalGoals = filteredGoals.length;
  const filteredCompletedGoals = filteredGoals.filter(
    (goal) => goal.remaining <= 0
  ).length;
  const filteredInProgressGoals = filteredGoals.filter(
    (goal) => goal.remaining > 0
  ).length;

  // const getSuggestionsOnRecentLoans = async () => {
  //   try {
  //     setLoading(true);
  //     // Placeholder for API call - adjust URL and data as needed
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_SUGGESTION_API_URL}/savings/suggestions/`,
  //       goals
  //     );
  //     setIsOpen(true);
  //   } catch (e) {
  //     console.log(e.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const cardData = [
    {
      label: "Total Goals",
      value: filteredTotalGoals,
      bg: "bg-green-50",
      border: "border-green-100",
      icon: Target,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Completed",
      value: filteredCompletedGoals,
      bg: "bg-red-50",
      border: "border-red-100",
      icon: CheckCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      label: "In Progress",
      value: filteredInProgressGoals,
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md mb-3">
      {/* Filter Section */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <p className="text-2xl text-shadow-lg text-black font-bold">Goals</p>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Year
              </label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Month
              </label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {loading ? (
              <button
                className="flex items-center justify-center px-4 py-2 text-white uppercase bg-blue-400 rounded-full shadow-lg"
                disabled
              >
                Getting Suggestions ...
              </button>
            ) : (
              <button
                className="px-4 py-2 text-white uppercase bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg"
                onClick={()=>setIsOpen(true)}
              >
                Get Suggestions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg ${card.bg} ${card.border} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center">
              <div className={`p-3 ${card.iconBg} rounded-full mr-4`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.label}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SavingsSuggestionsDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={user?.user?.id}
        goals={goals}
      />
    </div>
  );
};

export default TopCards;
