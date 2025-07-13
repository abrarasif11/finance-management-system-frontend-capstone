import React, { useState, useEffect } from "react";

const IncomeExpenseChartData = ({ incomeData, expenseData }) => {
  const [incomeExpenseData, setIncomeExpenseData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        data: [],
      },
      {
        label: "Expenses",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        data: [],
      },
    ],
  });

  console.log(incomeData, expenseData)

  useEffect(() => {
    // Function to calculate monthly totals
    const calculateMonthlyTotals = (data, isIncome) => {
      const monthlyTotals = {
        "2025-01": 0,
        "2025-02": 0,
        "2025-03": 0,
        "2025-04": 0,
        "2025-05": 0,
        "2025-06": 0,
        "2025-07": 0,
      };
      data?.forEach((entry) => {
        const date = new Date(entry.date);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        if (monthlyTotals[monthYear] !== undefined) {
          monthlyTotals[monthYear] += isIncome ? entry.amount : entry.amount;
        }
      });
      return Object.values(monthlyTotals);
    };

    // Update datasets with calculated totals
    const incomeTotals = calculateMonthlyTotals(incomeData, true);
    const expenseTotals = calculateMonthlyTotals(expenseData, false);

    setIncomeExpenseData((prev) => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: incomeTotals },
        { ...prev.datasets[1], data: expenseTotals },
      ],
    }));
  }, [incomeData, expenseData]);

  return incomeExpenseData;
};

export default IncomeExpenseChartData;
