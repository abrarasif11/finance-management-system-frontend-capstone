import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Your provided data
const goalsData = [
  {
    id: 4,
    title: "Home Renovation 2",
    target_amount: 80000,
    current_amount: 20000,
    start_date: "2025-04-01",
    end_date: "2025-10-01",
  },
  {
    id: 6,
    title: "Wedding Savings",
    target_amount: 100000,
    current_amount: 60000,
    start_date: "2025-01-01",
    end_date: "2025-12-01",
  },
  {
    id: 7,
    title: "Education Fund",
    target_amount: 120000,
    current_amount: 30000,
    start_date: "2025-02-10",
    end_date: "2026-02-10",
  },
  {
    id: 8,
    title: "Fitness Equipment",
    target_amount: 25000,
    current_amount: 10000,
    start_date: "2025-05-01",
    end_date: "2025-09-01",
  },
];

const years = goalsData.flatMap((item) => [
  new Date(item.start_date).getFullYear(),
  new Date(item.end_date).getFullYear(),
]);
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

// Step 2: Build filter options dynamically
const filterOptions = [];

for (let year = minYear; year <= maxYear; year++) {
  filterOptions.push(
    {
      label: `Jan-June ${year}`,
      start: `${year}-01-01`,
      end: `${year}-06-30`,
    },
    {
      label: `July-Dec ${year}`,
      start: `${year}-07-01`,
      end: `${year}-12-31`,
    }
  );
}

const BiYearlyGoalsBar = () => {
  const [selectedRange, setSelectedRange] = useState(filterOptions[0]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    generateChartData();
  }, [selectedRange]);

  const generateChartData = () => {
    const start = new Date(selectedRange.start);
    const end = new Date(selectedRange.end);

    // Prepare months
    const months = [];
    let temp = new Date(start);
    while (temp <= end) {
      months.push({
        month:
          temp.toLocaleString("default", { month: "short" }) +
          " " +
          temp.getFullYear(),
        total: 0,
        dateKey: new Date(temp),
      });
      temp.setMonth(temp.getMonth() + 1);
    }

    goalsData.forEach((goal) => {
      const goalStart = new Date(goal.start_date);

      if (goalStart >= start && goalStart <= end) {
        const monthIndex =
          goalStart.getMonth() -
          start.getMonth() +
          (goalStart.getFullYear() - start.getFullYear()) * 12;
        if (monthIndex >= 0 && monthIndex < months.length) {
          months[monthIndex].total += goal.target_amount;
        }
      }
    });

    setChartData(months);
  };

  return ( 
    <div className="p-6 rounded-lg bg-white shadow-xl col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Goal Amounts (Last 6 Months)</h2>
        <select
          value={selectedRange.label}
          onChange={(e) => {
            const range = filterOptions.find((r) => r.label === e.target.value);
            setSelectedRange(range);
          }}
          className="text-sm p-2 rounded border bg-gray-100 text-black"
        >
          {filterOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiYearlyGoalsBar;
