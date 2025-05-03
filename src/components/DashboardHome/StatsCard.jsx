import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/AuthContext";
import { getTotalOfRecords } from "../../utils/totalAmount";

const StatsCards = ({ props }) => {
  const { totalExpenses, totalIncomes } = props;
  const savingsRate = totalIncomes
    ? ((totalIncomes - totalExpenses) / totalIncomes) * 100
    : 0;
  const netBalance = totalIncomes - totalExpenses;
  const stats = [
    {
      label: "Total Income",
      value: `৳${totalIncomes.toFixed(2)}`,
      color: "bg-green-500",
    },
    {
      label: "Total Expenses",
      value: `৳${totalExpenses.toFixed(2)}`,
      color: "bg-red-500",
    },
    {
      label: "Net Balance",
      value: `৳${netBalance.toFixed(2)}`,
      color: "bg-blue-500",
    },
    {
      label: "Savings Rate",
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
