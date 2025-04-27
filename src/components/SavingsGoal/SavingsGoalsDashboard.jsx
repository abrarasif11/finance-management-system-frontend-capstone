// src/components/Dashboard/SavingsGoalsDashboard.jsx
import React, { useEffect, useState } from "react";
import { fakeSavingsGoals } from "../constants/FakeGoals";
import TopCards from "./TopCards";

import GoalsTable from "./GoalsTable";
import PieChart from "./PieChart";
import { useUser } from "../../contexts/AuthContext";

const SavingsGoalsDashboard = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `https://api-financial-management-system.vercel.app/api/v1/personal/savings-goals?user_id=${user?.user?.id}`
        );

        const data = await response.json();
        setGoals(data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching goals:", error);
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user?.user?.id]);
  console.log(goals);
  if (loading) {
    return <div>Loading...</div>;
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
      <PieChart
        completedGoals={completedGoals}
        inProgressGoals={inProgressGoals}
        canceledGoals={canceledGoals}
      />
      <GoalsTable goals={goals} />
    </div>
  );
};

export default SavingsGoalsDashboard;
