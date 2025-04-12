// src/components/Dashboard/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ completedGoals, inProgressGoals, canceledGoals }) => {
  const data = {
    labels: ["Completed", "In Progress", "Canceled"],
    datasets: [
      {
        label: "Goal Status",
        data: [completedGoals, inProgressGoals, canceledGoals],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#059669", "#D97706", "#DC2626"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-black mb-2">Goals Overview</h2>
      <Pie data={data}  style={{ width: "300px", height: "300px" }}/>
    </div>
  );
};

export default PieChart;
