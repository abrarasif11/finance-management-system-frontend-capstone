import { useState, useEffect } from 'react';
import BudgetSummary from './BudgetSummary';
import BudgetFilters from './BudgetFilters';
import BudgetList from './BudgetList';
import BudgetChart from './BudgetChart';
import BudgetTypeDistribution from './BudgetTypeDistribution';
import BudgetTable from './BudgetTable';

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/personal/budgets?user_id=14&type=')
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data.data);
        setFilteredBudgets(data.data);
      });
  }, []);
  console.log(budgets)
  const handleFilterChange = (type) => {
    setTypeFilter(type);
    if (type === 'All') {
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
