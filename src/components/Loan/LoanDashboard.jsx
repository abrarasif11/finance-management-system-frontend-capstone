import React, { useEffect, useState } from "react";
import LoanTable from "./LoanTable";
import { useUser } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import LoanAnalytics from "./LoanAnalytics";

const LoanDashboard = () => {
  const { user } = useUser();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/personal/loans/user/${
            user?.user?.id
          }`
        );

        const data = await response.json();
        setLoans(data.data);
      } catch (error) {
        console.error("Error fetching Loans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
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
      <LoanAnalytics loans={loans} />
      <LoanTable loans={loans} />
    </div>
  );
};

export default LoanDashboard;
