import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ props }) => {
  const { currentPage, setCurrentPage, totalPages } = props;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="flex justify-center items-center gap-4 mt-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-300"
            : "bg-green-500 text-white hover:bg-green-700"
        }`}
      >
        <ChevronLeft
          className={`${currentPage === 1 ? "text-green-500" : "text-white"}`}
        />
      </button>
      <span className="text-black font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300"
            : "bg-green-500 text-white hover:bg-green-700"
        }`}
      >
        <ChevronRight
          className={`${
            currentPage === totalPages ? "text-green-500" : "text-white"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
