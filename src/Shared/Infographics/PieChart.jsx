import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ props }) => {
  const { categoryData, title } = props;
  return (
    <section>
      <div className="border-2 rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Category-wise {title}</h2>
        <div style={{ width: "300px", height: "300px" }} className="mx-auto">
          <Pie data={categoryData} />
        </div>
      </div>
    </section>
  );
};

export default PieChart;
