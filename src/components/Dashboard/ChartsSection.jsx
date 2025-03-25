import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  calculateCategoryTotals,
  splitKeysAndValues,
} from "../../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../../utils/totalAmount";

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

  const handleSelectChange = (e) => setSelectedData(e.target.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-black text-xl font-semibold mb-2">
          Income vs Expenses
        </h2>
        <Bar data={incomeExpenseData} />
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
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
          style={{ width: "300px"}}
          className="mx-auto"
          data={
            selectedData === "Expenses"
              ? categoryDataForExpense
              : categoryDataForIncomes
          }
        />
      </div>
    </div>
  );
};

export default ChartsSection;
