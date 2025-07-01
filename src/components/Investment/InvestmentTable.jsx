import React, { useState, useEffect } from "react";
import InvestmentTableFilter from "./InvestmentTableFilter";
import InvestmentTableBody from "./InvestmentTableBody";
import toast from "react-hot-toast";
import InvestmentAnalytics from "./InvestmentAnalytics";
import AddInvestmentModal from "./AddInvestmentModal";
import { useUser } from "../../contexts/AuthContext";
import { generateReport } from "../../utils/generateReport";
import Pagination from "../../Shared/Pagination";

const InvestmentTable = ({ investments, onAddNew }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date-newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [reportFormat, setReportFormat] = useState("PDF");
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    let temp = [...investments];

    // Apply search filter
    if (searchQuery) {
      temp = temp.filter((investment) =>
        investment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investment.institution.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (filterYear) {
      temp = temp.filter((investment) => {
        const investmentDate = new Date(investment.start_date);
        return investmentDate.getFullYear() === parseInt(filterYear);
      });
    }

    // Apply month filter
    if (filterMonth) {
      const monthIndex = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ].indexOf(filterMonth);
      temp = temp.filter((investment) => {
        const investmentDate = new Date(investment.start_date);
        return investmentDate.getMonth() === monthIndex;
      });
    }

    // Apply status filter
    if (filterStatus && filterStatus !== "All") {
      temp = temp.filter((investment) => investment.status === filterStatus);
    }

    // Apply sorting
    temp.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      const amountA = a.initial_amount;
      const amountB = b.initial_amount;

      switch (sortOption) {
        case "date-oldest":
          return dateA - dateB;
        case "amount-asc":
          return amountA - amountB;
        case "amount-desc":
          return amountB - amountA;
        case "date-newest":
        default:
          return dateB - dateA;
      }
    });

    setFilteredInvestments(temp);
    setCurrentPage(1);
  }, [investments, filterYear, filterMonth, filterStatus, sortOption, searchQuery]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentInvestments = filteredInvestments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredInvestments.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGenerateReport = () => {
      generateReport("investments", filteredInvestments, filterMonth, filterYear, reportFormat);
    };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      
      <InvestmentTableFilter
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
      />
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Institution</th>
              <th className="px-4 py-3">Initial Amount</th>
              <th className="px-4 py-3">Current Value</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <InvestmentTableBody currentInvestments={currentInvestments} />
        </table>
        <Pagination props={{currentPage, setCurrentPage, totalPages}}/>
      </div>
      <AddInvestmentModal
        isOpen={isOpen}
        onClose={handleClose}
        onAddSuccess={() => { if (onAddNew) onAddNew(); }}
      />
    </div>
  );
};

export default InvestmentTable;