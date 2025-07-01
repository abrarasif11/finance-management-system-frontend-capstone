import React, { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useUser } from "../../contexts/AuthContext";
import InvestmentAnalytics from "./InvestmentAnalytics";
import InvestmentTable from "./InvestmentTable";

const InvestmentDashboard = () => {
  const { user } = useUser();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/personal/investments/user/${
            user?.user?.id
          }`
        );

        const data = await response.json();
        setInvestments(data.data);
      } catch (error) {
        console.error("Error fetching Investments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [user?.user?.id]);

  // Loading Component
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <InvestmentAnalytics investments={investments} />
      <InvestmentTable investments={investments} />
    </div>
  );
};

export default InvestmentDashboard;
