import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/AuthContext";
import { getTotalOfRecords } from "../../utils/totalAmount";

const StatsCards = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const USERS_EXPENSES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/expenses?user_id=${user?.user?.id}`;

  const USERS_INCOMES_API_URL = `${
    import.meta.env.VITE_BASE_URL
  }/personal/incomes?user_id=${user?.user?.id}`;

  useEffect(() => {
    const fetchData = async () => {
      const expenses = await axios.get(USERS_EXPENSES_API_URL);
      const incomes = await axios.get(USERS_INCOMES_API_URL);

      setExpenses(expenses?.data?.data);
      setIncomes(incomes?.data?.data);
    };
    fetchData()
  }, []);

  const totalExpenses = getTotalOfRecords(expenses);
  const totalIncomes = getTotalOfRecords(incomes);

  const stats = [
    { label: "Total Income", value: `৳${totalIncomes}`, color: "bg-green-500" },
    {
      label: "Total Expenses",
      value: `৳${totalExpenses}`,
      color: "bg-red-500",
    },
    {
      label: "Net Balance",
      value: `৳${totalIncomes - totalExpenses}`,
      color: "bg-blue-500",
    },
    { label: "Savings Rate", value: "37.5%", color: "bg-yellow-500" },
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
