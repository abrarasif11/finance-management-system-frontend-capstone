// src/components/Dashboard/Filters.jsx
import React from "react";

const Filters = () => {
  return (
    <div className="mb-4">
      <button className="bg-gray-700 text-white px-4 py-2 rounded mr-2">Today</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded mr-2">This Week</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded mr-2">This Month</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded">Custom Range</button>
    </div>
  );
};

export default Filters;
