import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API function to fetch expenses
const fetchExpenses = async () => {
  const { data } = await axios.get("/api/expenses");
  return data;
};

// Custom hook to get expenses
export const useExpensesQuery = () => {
  return useQuery(["expenses"], fetchExpenses, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
