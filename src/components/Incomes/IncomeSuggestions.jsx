import React, { useState } from "react";

const IncomeSuggestions = ({ suggestions }) => {
  const [isOpen, setIsOpen] = useState(!!suggestions);

  // Render nothing if no suggestions or modal is closed
  if (!suggestions || suggestions.length === 0)
    return <div>Your data is not enough matured to get suggestions!</div>;
  return (
    <div className=" p-1 rounded-lg w-full max-h-[80vh] overflow-y-auto">
      <ul className="list-disc pl-5 space-y-4">
        {suggestions?.map((item, index) => (
          <li key={index} className="text-gray-700 text-base leading-relaxed">
            {item.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeSuggestions;
