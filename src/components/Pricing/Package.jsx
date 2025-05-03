import React from "react";
import { CircleCheck } from "lucide-react";
const Package = ({ option, billingCycle }) => {
  const { title, facilities, price, session_type } = option;
  const allFacilities = facilities.split(",");

  const yearlyPrice = price * 12;
  let discountedYearlyPrice, discount;
  if (title == "Silver") {
    discount = 16;
    discountedYearlyPrice = yearlyPrice - yearlyPrice * (discount / 100);
  } else {
    discount = 20;
    discountedYearlyPrice = yearlyPrice - yearlyPrice * (discount / 100);
  }
  return (
    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
      <div
        className={`flex flex-grow flex-col p-6 space-y-6 sm:p-8 border border-neutral-700 rounded-xl ${
          title == "Silver" && "border-green-700 shadow-2xl shadow-green-500"
        }`}
      >
        <div className="flex flex-col justify-center items-center space-y-2">
          <h4 className="text-2xl font-bold">{title}</h4>
          {billingCycle == "Monthly" ? (
            <span className="text-6xl font-bold bg-green-500 to-green-800 text-transparent bg-clip-text">
              {price == 0 ? "Free" : price}
              {price != 0 && (
                <span className="text-sm tracking-wide">&#2547;</span>
              )}
            </span>
          ) : (
            <div className="flex items-center gap-3 font-bold">
              {yearlyPrice != 0 && (
                <p className="text-4xl">
                  <span className="line-through decoration-red-500 decoration-4 dec">
                    {yearlyPrice == 0 ? "Free" : yearlyPrice}
                  </span>
                  <span className="text-sm tracking-wide">&#2547;</span>
                </p>
              )}
              <p className="text-6xl font-bold bg-green-500 to-green-800 text-transparent bg-clip-text">
                <span>
                  {discountedYearlyPrice == 0
                    ? "Free"
                    : parseInt(discountedYearlyPrice)}
                </span>
                {discountedYearlyPrice != 0 && (
                  <span className="text-sm tracking-wide">&#2547;</span>
                )}
              </p>
            </div>
          )}
        </div>

        <ul className="flex-1 space-y-2">
          {allFacilities.map((facility, i) => (
            <li key={i} className="flex items-center space-x-2">
              <CircleCheck />
              <span>{facility}</span>
            </li>
          ))}
        </ul>

        <button
          rel="noopener noreferrer"
          href="#"
          className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-gradient-to-r from-green-500 to-green-800 border border-green-500 rounded-lg transition duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Package;
