import { FaFilter } from "react-icons/fa";
import { getCurrentMonthRecords } from "../utils/categoryWiseAmounts";
import { getTotalOfRecords } from "../utils/totalAmount";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/ui/card";

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

  const handleSelectChange = (e) => {
    const days = parseInt(e.target.value);
    setSelectedRange(days);
    setFilterOpen(false);
    setCurrentPage(1);
  };

  const thisMonthData = getCurrentMonthRecords(records);
  const thisMonthTotal = getTotalOfRecords(thisMonthData.data);

  return (
    <Card className="bg-white border-2 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Total {title}</h2>
        <div className="">
          <select
            onChange={handleSelectChange}
            value={selectedRange}
            className="text-sm text-black p-2 rounded-full bg-green-200 border border-green-500"
          >
            <option value={0}>All</option>
            <option value={7}>Last 7 Days</option>
            <option value={15}>Last 15 Days</option>
            <option value={30}>Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-20">
        <p className="text-6xl font-medium">{total}</p>
        <p className="text-4xl font-light my-2">BDT</p>
      </div>

      <div className="flex flex-col items-center justify-center pt-5">
        <p className="text-sm bg-green-200 px-3 py-2 rounded-full border-2 border-green-500">
          {thisMonthData?.month}'{thisMonthData?.year}: {thisMonthTotal} BDT
        </p>
      </div>
    </Card>
  );
};

export default TotalEstimateBlock;
