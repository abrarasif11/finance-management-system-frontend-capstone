import { FaFilter } from "react-icons/fa";
import { getCurrentMonthRecords } from "../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../utils/totalAmount";
import { useQuery } from "@tanstack/react-query";

const TotalEstimateBlock = ({ props }) => {
  const {
    apiUrl,
    filterOpen,
    setFilterOpen,
    selectedRange,
    setSelectedRange,
    total,
    setCurrentPage,
    title,
  } = props;

  const {
    data: records = [],
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["records"],
    queryFn: async () => {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch incomes");
      const data = await res.json();
      return data.data;
    },
  });


  const handleRadioChange = (e) => {
    const days = parseInt(e.target.value);
    setSelectedRange(days);
    setFilterOpen(false);
    setCurrentPage(1); 
  };

  const thisMonthData = getCurrentMonthRecords(records);
  const thisMonthTotal = getTotalOfRecords(thisMonthData.data);

  return (
    <div className="border-2 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">Total {title}</h2>
        <div className="relative ">
          <button
            className="text-lg mb-3 flex items-center gap-3"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <p className="text-sm">
              {selectedRange
                ? `Last : ${selectedRange} days`
                : `Total Expenses`}
            </p>
            <FaFilter className="text-green-500" />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded-lg shadow-lg p-4">
              <h3 className="text-sm font-bold mb-2">Filter by Date:</h3>
              <div className="space-y-2">
                {[0, 7, 15, 30].map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="radio"
                      name="dateFilter"
                      value={day}
                      checked={selectedRange === day}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    {day === 0 ? "No Filter" : `Last ${day} Days`}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-20">
        <p className="text-6xl font-medium">{total}</p>
        <p className="text-4xl font-light my-2">BDT</p>
      </div>
      <div className="flex flex-col items-center justify-center pt-5 ">
        <p className="text-sm bg-green-200 px-3 py-2 rounded-full border-2 border-green-500">
          {thisMonthData?.month}'{thisMonthData?.year}: {thisMonthTotal} BDT
        </p>
      </div>
    </div>
  );
};

export default TotalEstimateBlock;
