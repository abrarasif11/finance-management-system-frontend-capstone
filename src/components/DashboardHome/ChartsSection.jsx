import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  calculateCategoryTotals,
  splitKeysAndValues,
} from "../../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../../utils/totalAmount";
import { Card } from "../ui/card";
import { Car } from "lucide-react";
import IncomeExpenseChartComponent from "./IncomeExpenseChartComponent";
import IncomeExpenseChartData from "./IncomeExpenseCartData";

const ChartsSection = ({ props }) => {
  const { incomes, expenses } = props;
  const [selectedData, setSelectedData] = useState("Expenses");

  // Categorised Calculation For Pie
  const categoryWiseIncomes = calculateCategoryTotals(incomes);
  const metaDataForIncomes = splitKeysAndValues(categoryWiseIncomes);

  const categoryWiseExpenses = calculateCategoryTotals(expenses);
  const metaDataForExpenses = splitKeysAndValues(categoryWiseExpenses);

  // Prepare chart data
  const categoryDataForIncomes = {
    labels: metaDataForIncomes.keys,
    datasets: [
      {
        data: metaDataForIncomes.values,
        backgroundColor: metaDataForIncomes.colors,
      },
    ],
  };

  const categoryDataForExpense = {
    labels: metaDataForExpenses.keys,
    datasets: [
      {
        data: metaDataForExpenses.values,
        backgroundColor: metaDataForExpenses.colors,
      },
    ],
  };

  // Calculation of Income vs Expense chart starts here
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
    const incomeTotals = calculateMonthlyTotals(incomes, true);
    const expenseTotals = calculateMonthlyTotals(expenses, false);

    setIncomeExpenseData((prev) => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: incomeTotals },
        { ...prev.datasets[1], data: expenseTotals },
      ],
    }));
  }, [incomes, expenses]);

  const handleSelectChange = (e) => setSelectedData(e.target.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-black text-xl font-semibold mb-2">
          Income vs Expenses
        </h2>
        <IncomeExpenseChartComponent data={incomeExpenseData} />
      </Card>

      <Card className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-black text-xl font-semibold mb-2">
            Category Breakdown
          </h2>
          <select
            className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
            value={selectedData}
            onChange={handleSelectChange}
          >
            <option value="Expenses">Expenses</option>
            <option value="Incomes">Incomes</option>
          </select>
        </div>
        <Pie
          style={{ width: "400px", height:"400px" }}
          className="mx-auto"
          data={
            selectedData === "Expenses"
              ? categoryDataForExpense
              : categoryDataForIncomes
          }
        />
      </Card>
    </div>
  );
};

export default ChartsSection;
