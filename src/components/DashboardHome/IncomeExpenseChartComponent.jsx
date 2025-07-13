import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const IncomeExpenseChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data.datasets[0].data.map((income, i) => ({
        name: data.labels[i],
        Income: income,
        Expenses: data.datasets[1].data[i],
      }))}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Income" fill="rgba(54, 162, 235, 0.6)" />
      <Bar dataKey="Expenses" fill="rgba(255, 99, 132, 0.6)" />
    </BarChart>
  </ResponsiveContainer>
);

export default IncomeExpenseChartComponent;
