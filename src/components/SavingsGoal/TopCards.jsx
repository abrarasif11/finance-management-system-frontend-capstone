import React from "react";

const TopCards = ({ totalGoals, completedGoals, inProgressGoals }) => {
  const cardData = [
    { label: "Total Goals", value: totalGoals, bg: "bg-blue-100", text: "text-blue-800" },
    { label: "Completed", value: completedGoals, bg: "bg-green-100", text: "text-green-800" },
    { label: "In Progress", value: inProgressGoals, bg: "bg-yellow-100", text: "text-yellow-800" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg shadow ${card.bg}`}>
          <p className="text-sm font-medium text-gray-600">{card.label}</p>
          <p className={`text-2xl font-semibold ${card.text}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default TopCards;
