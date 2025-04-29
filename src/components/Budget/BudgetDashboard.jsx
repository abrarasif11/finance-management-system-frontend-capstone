import { useState, useEffect } from "react";
import BudgetSummary from "./BudgetSummary";
import BudgetTable from "./BudgetTable";
import { useUser } from "../../contexts/AuthContext";

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const { user } = useUser();
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/personal/budgets?user_id=${
        user?.user?.id
      }&type=`
    )
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data.data);
        setFilteredBudgets(data.data);
      });
  }, []);
  console.log(budgets);
  
  const handleFilterChange = (type) => {
    setTypeFilter(type);
    if (type === "All") {
      setFilteredBudgets(budgets);
    } else {
      setFilteredBudgets(budgets.filter((b) => b.type === type));
    }
  };

  return (
    <div className="p-6">
      {/* <BudgetFilters onFilterChange={handleFilterChange} typeFilter={typeFilter} /> */}
      <BudgetSummary budgets={filteredBudgets} />
      <BudgetTable budgets={filteredBudgets} />
    </div>
  );
};

export default BudgetDashboard;
