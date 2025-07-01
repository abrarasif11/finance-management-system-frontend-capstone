import React, { useState, useEffect } from "react";
import LoanTableFilter from "./LoanTableFilter";
import LoanTableBody from "./LoanTableBody";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useUser } from "../../contexts/AuthContext";
import { generateReport } from "../../utils/generateReport";
import AddLoanModal from "./AddLoanModal";
import Pagination from "../../Shared/Pagination";

const LoanTable = ({ loans, onAddNew }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [sortOption, setSortOption] = useState("date-newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [reportFormat, setReportFormat] = useState("PDF");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Dynamically generate years based on the data
  const years = loans.length
    ? [
        "All",
        ...Array.from(
          new Set(loans.map((loan) => new Date(loan.start_date).getFullYear()))
        ).sort((a, b) => a - b),
      ]
    : ["All"];
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const statuses = ["All", "Active", "Paid", "Overdue"];

  // Filter and sort loans
  useEffect(() => {
    let temp = [...loans];

    if (filterStatus !== "All") {
      temp = temp.filter((loan) => {
        const today = new Date();
        const nextPaymentDate = new Date(loan.next_payment_date);
        if (loan.due > 0) {
          if (filterStatus === "Active") return true;
          if (filterStatus === "Overdue" && nextPaymentDate < today)
            return true;
        } else if (filterStatus === "Paid") return true;
        return false;
      });
    }

    if (filterMonth !== "All") {
      const monthIndex = months.indexOf(filterMonth) - 1;
      temp = temp.filter((loan) => {
        const startDate = new Date(loan.start_date);
        return startDate.getMonth() === monthIndex;
      });
    }

    if (filterYear !== "All") {
      temp = temp.filter((loan) => {
        const startDate = new Date(loan.start_date);
        return startDate.getFullYear() === parseInt(filterYear);
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter(
        (loan) =>
          loan.loan_type?.toLowerCase().includes(query) ||
          loan.lender_name?.toLowerCase().includes(query) ||
          loan.notes?.toLowerCase().includes(query) ||
          loan.start_date?.toLowerCase().includes(query) ||
          loan.next_payment_date?.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "amount-asc":
        temp.sort((a, b) => a.principal_amount - b.principal_amount);
        break;
      case "amount-desc":
        temp.sort((a, b) => b.principal_amount - a.principal_amount);
        break;
      case "date-newest":
        temp.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        break;
      case "date-oldest":
        temp.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        break;
    }

    setFilteredLoans(temp);
    setCurrentPage(1); // Reset to first page when filters change
  }, [loans, filterStatus, filterMonth, filterYear, sortOption, searchQuery]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentLoans = filteredLoans.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredLoans.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Edit Modal Functions
  const handleOpen = (loan) => {
    setSelectedLoanId(loan.id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedLoanId(null);
  };

  const handleGenerateReport = () => {
    generateReport("loans", filteredLoans, filterMonth, filterYear, reportFormat);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <LoanTableFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        reportFormat={reportFormat}
        setReportFormat={setReportFormat}
        generateReport={handleGenerateReport}
        handleAddNewOpen={() => setIsOpen(true)}
        statuses={statuses}
        months={months}
        years={years}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="px-4 py-3">Loan Type</th>
              <th className="px-4 py-3">Lender</th>
              <th className="px-4 py-3">Principal</th>
              <th className="px-4 py-3">Total Payable</th>
              <th className="px-4 py-3">Total Paid</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Interest Rate</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Next Payment</th>
              <th className="px-4 py-3">Frequency</th>
              <th className="px-4 py-3">Status</th>
              
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <LoanTableBody
            currentLoans={currentLoans}
          />
        </table>
        {/* Pagination */}
        <Pagination props={{ currentPage, setCurrentPage, totalPages }} />
      </div>
      <AddLoanModal
        isOpen={isOpen}
        onClose={handleClose}
        onAddSuccess={() => {
          if (onAddNew) onAddNew(); // Refresh loans if provided
        }}
      />
    </div>
  );
};

export default LoanTable;
