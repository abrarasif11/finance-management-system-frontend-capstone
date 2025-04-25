// src/components/Dashboard/SavingsGoalsDashboard.jsx
import React from "react";
import { fakeSavingsGoals } from "../constants/FakeGoals";
import TopCards from "./TopCards";

import GoalsTable from "./GoalsTable";
import PieChart from "./PieChart";

const SavingsGoalsDashboard = () => {
  const goals = fakeSavingsGoals.data;
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === "Completed").length;
  const inProgressGoals = goals.filter(goal => goal.status === "In Progress").length;
  const canceledGoals = goals.filter(goal => goal.status === "Canceled").length;

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
