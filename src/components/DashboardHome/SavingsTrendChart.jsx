import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle } from "../ui/card";

const SavingsTrendChart = ({ savingsData }) => {
  // State for filters
  const [selectedPeriod, setSelectedPeriod] = useState("Jan-June");
  const [selectedYear, setSelectedYear] = useState("2025");

  // Available years (extracted from data, hardcoded as 2025 for now)
  const years = ["2025"];

  // Process data based on filters
  const chartData = useMemo(() => {
    // Define months for the selected period
    const months =
      selectedPeriod === "Jan-June"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        : ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Initialize monthly savings
    const monthlySavings = Array(6).fill(0);

    // Process all goal entries
    savingsData.forEach((goal) => {
      goal.goal_entries.forEach((entry) => {
        const entryDate = new Date(entry.entry_date);
        const entryYear = entryDate.getFullYear().toString();
        const entryMonth = entryDate.getMonth(); // 0-based (0 = Jan, 11 = Dec)

        // Check if entry matches selected year and period
        if (entryYear === selectedYear) {
          if (selectedPeriod === "Jan-June" && entryMonth < 6) {
            monthlySavings[entryMonth] += entry.amount;
          } else if (selectedPeriod === "July-Dec" && entryMonth >= 6) {
            monthlySavings[entryMonth - 6] += entry.amount;
          }
        }
      });
    });

    // Calculate cumulative savings
    let cumulative = 0;
    const data = months.map((month, index) => {
      cumulative += monthlySavings[index];
      return { month, savings: cumulative };
    });

    return data;
  }, [selectedPeriod, selectedYear]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <CardTitle className={"text-black"}>
          Savings Trend
        </CardTitle>
        <div className="flex items-center">
          <div>
            <label>Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
            >
              <option value="Jan-June">Jan-June</option>
              <option value="July-Dec">July-Dec</option>
            </select>
          </div>
          <div>
            <label>Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <LineChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Card>
  );
};

export default SavingsTrendChart;
