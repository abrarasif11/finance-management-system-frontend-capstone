// src/components/Dashboard/SavingsGoalsDashboard.jsx
import React, { useEffect, useState } from "react";
import { fakeSavingsGoals } from "../constants/FakeGoals";
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
          `${import.meta.env.VITE_BASE_URL}/personal/savings-goals?user_id=${user?.user?.id}`
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

  return (
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
  );
};

export default SavingsGoalsDashboard;
