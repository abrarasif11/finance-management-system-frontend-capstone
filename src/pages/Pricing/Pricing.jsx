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
            <span className="text-4xl font-bold lg:text-5xl">Pricing</span>
            <h2 className="text-3xl text-white font-bold lg:text-4xl">
              Choose your best plan
            </h2>
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
