import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";

const ChartsSection = () => {
  const incomeExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        data: [12000, 15000, 17000, 14000, 18000, 19000],
      },
      {
        label: "Expenses",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        data: [8000, 9000, 12000, 11000, 15000, 16000],
      },
    ],
  };

  const categoryData = {
    labels: ["Food", "Transport", "Entertainment", "Health", "Others"],
    datasets: [
      {
        data: [5000, 3000, 2000, 1000, 4000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-black text-xl font-semibold mb-2">Income vs Expenses</h2>
        <Bar data={incomeExpenseData} />
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-black text-xl font-semibold mb-2" >Category Breakdown</h2>
        <Pie style={{ width: "300px", height: "300px" }} className="mx-auto" data={categoryData} />
      </div>
    </div>
  );
};

export default ChartsSection;
