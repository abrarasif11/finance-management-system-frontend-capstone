import { useState, useEffect } from "react";
import { useLoading } from "../../contexts/LoadingProvider";

const BudgetSummary = ({ budgets }) => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [filteredBudgets, setFilteredBudgets] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (typeFilter === "All") {
      setFilteredBudgets(budgets);
    } else {
      const filtered = budgets.filter((budget) => budget.type === typeFilter);
      setFilteredBudgets(filtered);
    }
  }, [typeFilter, budgets]);

  const totalBudget = filteredBudgets.reduce(
    (sum, budget) => sum + budget.total_amount,
    0
  );
  const totalRemaining = filteredBudgets.reduce(
    (sum, budget) => sum + budget.remaining,
    0
  );
  const totalCompleted = filteredBudgets.filter(
    (budget) => budget.remaining <= 0
  ).length;

  const getSuggestionsOnRecentLoans = async () => {
    try {
      setLoading(true);
      // const res = await axios.post(
      //   `${import.meta.env.VITE_SUGGESTION_API_URL}/loan/optimize-payments`,
      //   loans
      // );
      // setLoanSuggestions(res?.data);
      setIsOpen(true);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p- rounded-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black text-xl font-bold">Budget Summary</h2>
        <div className="flex items-center gap-2">
          <select
            className="text-black p-2 rounded-full bg-green-200 border border-green-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
          <div className="flex justify-end">
            {loading ? (
              <button
                className="flex items-center justify-center px-4 py-2 text-white uppercase bg-blue-400 rounded-full shadow-lg"
                disabled
              >
                Getting Suggestions ...
              </button>
            ) : (
              <button
                className="px-4 py-2 text-white uppercase bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg"
                onClick={getSuggestionsOnRecentLoans}
              >
                {" "}
                Get Suggestions
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="shadow-xl bg-blue-500 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Budget</h3>
          <p className="text-2xl font-bold mt-2">
            ৳ {totalBudget.toLocaleString()}
          </p>
        </div>
        <div className="shadow-xl bg-green-500 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Remaining</h3>
          <p className="text-2xl font-bold mt-2">
            ৳ {totalRemaining.toLocaleString()}
          </p>
        </div>
        <div className="shadow-xl bg-purple-500 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Completed</h3>
          <p className="text-2xl font-bold mt-2">{totalCompleted}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
