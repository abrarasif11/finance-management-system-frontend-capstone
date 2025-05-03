import React from "react";

const TopCards = ({ totalGoals, completedGoals, inProgressGoals }) => {
  const cardData = [
    { label: "Total Goals", value: totalGoals, bg: "bg-green-500", text: "text-white" },
    { label: "Completed", value: completedGoals, bg: "bg-red-500", text: "text-white" },
    { label: "In Progress", value: inProgressGoals, bg: "bg-blue-500", text: "text-white" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg shadow-xl ${card.bg}`}>
          <p className="text-sm font-medium text-white">{card.label}</p>
          <p className={`text-2xl font-semibold ${card.text}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TopCards;
