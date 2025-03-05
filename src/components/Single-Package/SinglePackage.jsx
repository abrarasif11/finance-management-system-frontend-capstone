import React from "react";
import { CircleCheck } from "lucide-react";
const SinglePackage = ({ priced }) => {
  const { title, facilities , price, session_type } = priced;
  const allFacilities = facilities.split(",");
  console.log(allFacilities);
  return (
    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
      <div className="flex flex-grow flex-col p-6 space-y-6   sm:p-8 border border-neutral-700 rounded-xl text-gray-50">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold">{title}</h4>
          <span className="text-6xl font-bold">
          {price} 
            <span className="text-sm tracking-wide">&#2547; {session_type}</span>
          </span>
        </div>
        
        <ul className="flex-1 space-y-2">
          {allFacilities.map((facility,i) => (
            <li key={i} className="flex items-center space-x-2">
               <CircleCheck>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </CircleCheck>
              <span>{facility}</span>
            </li>
          ))}
        </ul>
        
        <a
          rel="noopener noreferrer"
          href="#"
          className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-gradient-to-r from-green-500 to-green-800 border border-green-500 rounded-lg transition duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default SinglePackage;
