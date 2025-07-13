import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardTitle } from "../ui/card";
import { ClockArrowDown } from "lucide-react";

const InvestmentBarChart = ({ data: initialData }) => {
  // State for filters
  const [filters, setFilters] = useState({
    investmentType: "",
    status: "",
    institution: "",
    startDate: "",
    endDate: "",
    valueRange: "",
  });

  // Process data based on filters
  const filteredData = initialData.filter((investment) => {
    const matchesType =
      !filters.investmentType ||
      investment.investment_type === filters.investmentType;
    const matchesStatus =
      !filters.status || investment.status === filters.status;
    const matchesInstitution =
      !filters.institution || investment.institution === filters.institution;
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate
      ? new Date(filters.endDate)
      : new Date("2025-07-13"); // Default to today
    const investmentStartDate = new Date(investment.start_date);
    const matchesDate =
      (!startDate || investmentStartDate >= startDate) &&
      (!endDate || investmentStartDate <= endDate);
    const currentValue = investment.current_value;
    const [minValue, maxValue] = filters.valueRange
      ? filters.valueRange.split("-").map(Number)
      : [0, Infinity];
    const matchesValue =
      currentValue >= minValue && currentValue <= (maxValue || Infinity);

    return (
      matchesType &&
      matchesStatus &&
      matchesInstitution &&
      matchesDate &&
      matchesValue
    );
  });

  // Process filtered data to group by investment_type and sum current_value
  const processedData = filteredData.reduce((acc, investment) => {
    const type = investment.investment_type;
    const existing = acc.find((item) => item.name === type);
    if (existing) {
      existing.value += investment.current_value;
    } else {
      acc.push({ name: type, value: investment.current_value });
    }
    return acc;
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className={"my-6"}>
      <div className="flex items-center justify-between">
        <CardTitle>Investment Distribution</CardTitle>

        {/* Filter Panel */}
        <div className="space-x-3">
          <select
            name="investmentType"
            value={filters.investmentType}
            onChange={handleFilterChange}
            className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
          >
            <option value="">All Types</option>
            <option value="MutualFund">Mutual Fund</option>
            <option value="FixedDeposit">Fixed Deposit</option>
            <option value="Bond">Bond</option>
            <option value="Stock">Stock</option>
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Matured">Matured</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            name="institution"
            value={filters.institution}
            onChange={handleFilterChange}
            className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
          >
            <option value="">All Institutions</option>
            <option value="Investment Corporation of Bangladesh">
              Investment Corporation of Bangladesh
            </option>
            <option value="Sonali Bank">Sonali Bank</option>
            <option value="Bangladesh Bank">Bangladesh Bank</option>
            <option value="Dhaka Stock Exchange">Dhaka Stock Exchange</option>
            <option value="Janata Bank">Janata Bank</option>
            <option value="Brac Bank">Brac Bank</option>
          </select>

          <select
            name="valueRange"
            value={filters.valueRange}
            onChange={handleFilterChange}
            className="text-black text-sm bg-green-200 px-2 py-1 rounded-full border-2 border-green-500"
          >
            <option value="">All Values</option>
            <option value="0-25000">0 - 25,000 BDT</option>
            <option value="25000-50000">25,000 - 50,000 BDT</option>
            <option value="50000-100000">50,000 - 100,000 BDT</option>
            <option value="100000+">100,000+ BDT</option>
          </select>
        </div>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={processedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Current Value (BDT)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default InvestmentBarChart;
