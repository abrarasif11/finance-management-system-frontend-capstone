import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/AuthContext";
import { getTotalOfRecords } from "../../utils/totalAmount";

const StatsCards = ({ props }) => {
  const { averageExpense, averageIncome } = props;
  const savingsRate = averageIncome
    ? ((averageIncome - averageExpense) / averageIncome) * 100
    : 0;
  const netBalance = averageIncome - averageExpense;
  const stats = [
    {
      label: "Average Monthly Income",
      value: `৳${averageIncome}`,
      color: "bg-green-500",
    },
    {
      label: "Average Monthly Expenses",
      value: `৳${averageExpense}`,
      color: "bg-red-500",
    },
    {
      label: "Average Net Balance",
      value: `৳${netBalance}`,
      color: "bg-blue-500",
    },
    {
      label: "Average Savings Rate",
      value: `${savingsRate.toFixed(2)}%`,
      color: "bg-yellow-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg text-white ${stat.color} shadow-md`}
        >
          <h2 className="text-lg">{stat.label}</h2>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
