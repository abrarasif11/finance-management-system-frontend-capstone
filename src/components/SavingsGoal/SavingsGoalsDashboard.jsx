// src/components/Dashboard/SavingsGoalsDashboard.jsx
import React, { useEffect, useState } from "react";
import TopCards from "./TopCards";

import GoalsTable from "./GoalsTable/GoalsTable";
import PieChart from "./PieChart";
import { useUser } from "../../contexts/AuthContext";
import BiYearlyGoalsBar from "./BiYearlyGoalsBar";
import LoadingSpinner from "../ui/LoadingSpinner";

const SavingsGoalsDashboard = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/personal/savings-goals?user_id=${
            user?.user?.id
          }`
        );

        const data = await response.json();
        setGoals(data.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user?.user?.id]);

  // Loading Component
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;
  const inProgressGoals = goals.filter(
    (goal) => goal.status === "In Progress"
  ).length;
  const canceledGoals = goals.filter(
    (goal) => goal.status === "Canceled"
  ).length;

  const getSuggestionsOnRecentLoans = async () => {
    try {
      setLoading(true);
      // const res = await axios.post(
      //   `${import.meta.env.VITE_SUGGESTION_API_URL}/loan/optimize-payments`,
      //   loans
      // );
      // setLoanSuggestions(res?.data);
      setIsOpen(true);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="flex justify-end mb-2">
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
            onClick={getSuggestionsOnRecentLoans}
          >
            {" "}
            Get Suggestions
          </button>
        )}
      </div>
      <div className="grid gap-6">
        <TopCards
          totalGoals={totalGoals}
          completedGoals={completedGoals}
          inProgressGoals={inProgressGoals}
        />
        <div className="grid grid-cols-3">
          <PieChart
            completedGoals={completedGoals}
            inProgressGoals={inProgressGoals}
            canceledGoals={canceledGoals}
          />
          <BiYearlyGoalsBar />
        </div>
        <GoalsTable goals={goals} />
      </div>
    </div>
  );
};

export default SavingsGoalsDashboard;
