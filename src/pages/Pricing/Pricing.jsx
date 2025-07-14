import React, { useState } from "react";
import axios from "axios";
import Packages from "../../components/Pricing/Packages";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useLoading } from "../../contexts/LoadingProvider";

const Pricing = () => {
  const { loading, setLoading } = useLoading();
  const [options, setOptions] = useState(null);
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-financial-management-system.vercel.app/api/v1/financial-services"
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!options) {
    fetchPrices();
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="py-20 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
                Choose Your
                <span className="bg-green-500 font-semibold to-green-800 text-transparent bg-clip-text">
                  {" "}
                  Best Plan
                </span>
              </h1>
            </div>
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => setBillingCycle("Monthly")}
                className={`px-8 py-4 rounded-l-2xl text-xl ${
                  billingCycle === "Monthly"
                    ? "bg-gradient-to-r from-green-500 to-green-800 border border-green-500 transition duration-200 tracking-tight text-white"
                    : "border-l border-t border-b border-green-500 text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("Yearly")}
                className={`px-8 py-4 rounded-r-2xl text-xl ${
                  billingCycle === "Yearly"
                    ? "bg-gradient-to-r from-green-500 to-green-800 border border-green-500 transition duration-200 tracking-tight text-white"
                    : "border-r border-t border-b border-green-500 text-white"
                }`}
              >
                Yearly
              </button>
            </div>
            <div className="flex flex-wrap items-stretch -mx-4">
              {options?.data?.map((option) => (
                <Packages
                  key={option.id}
                  option={option}
                  billingCycle={billingCycle}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Pricing;
