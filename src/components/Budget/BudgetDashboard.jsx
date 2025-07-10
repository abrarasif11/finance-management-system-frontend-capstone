import { useState, useEffect } from "react";
import BudgetSummary from "./BudgetSummary";
import BudgetTable from "./BudgetTable";
import { useUser } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingProvider";
import LoadingSpinner from "../ui/LoadingSpinner";

const BudgetDashboard = () => {
  const { loading, setLoading } = useLoading();
  const { user } = useUser();
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_BASE_URL}/personal/budgets?user_id=${
        user?.user?.id
      }&type=`
    )
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data.data);
        setFilteredBudgets(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const handleFilterChange = (type) => {
    setTypeFilter(type);
    if (type === "All") {
      setFilteredBudgets(budgets);
    } else {
      setFilteredBudgets(budgets.filter((b) => b.type === type));
    }
  };

  

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="p-6">
      
      <BudgetSummary budgets={filteredBudgets} />
      <BudgetTable budgets={filteredBudgets} />
    </div>
  );
};

export default BudgetDashboard;
