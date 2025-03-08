import React, { useState } from "react";
import axios from "axios";
import SinglePackage from "../../components/Single-Package/SinglePackage";

const Pricing = () => {
  const [prices, setPrices] = useState(null);

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        "https://api-financial-management-system.vercel.app/api/v1/financial-services"
      );
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    }
  };

  if (!prices) {
    fetchPrices();
  }

  return (
    <div>
      <section className="py-20 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold  text-center tracking-wide">
        Choose Your
        <span className="bg-green-500 font-semibold to-green-800 text-transparent bg-clip-text">
          {" "}
         Best Plan
        </span>
      </h1>
          </div>
          <div className="flex flex-wrap items-stretch -mx-4">
            {prices?.data?.map((pricer) => (
              <SinglePackage key={pricer.id} priced={pricer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
