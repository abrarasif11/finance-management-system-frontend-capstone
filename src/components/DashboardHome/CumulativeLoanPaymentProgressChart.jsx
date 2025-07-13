import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Utility: Format to "MMM 'YY"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", { month: "short" })} '${date
    .getFullYear()
    .toString()
    .slice(2)}`;
};

const CumulativeLoanProgressChart = ({ loans }) => {
  // Build cumulative chart data
  const chartData = useMemo(() => {
    const sortedLoans = [...loans].sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );

    let cumulative = 0;
    return sortedLoans.map((loan) => {
      cumulative += parseFloat(loan.total_paid || 0);
      return {
        date: formatDate(loan.start_date),
        cumulative_paid: cumulative,
      };
    });
  }, [loans]);

  return (
    <Card >
      <h2 className="text-lg font-bold mb-4">Cumulative Loan Payments</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value) => `${value} BDT`} />
          <Area
            type="monotone"
            dataKey="cumulative_paid"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CumulativeLoanProgressChart;
