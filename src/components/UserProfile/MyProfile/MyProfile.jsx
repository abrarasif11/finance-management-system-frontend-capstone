import React from "react";
import user from "../../../assets/459809096_1213306209810555_1832615970736443789_n.jpg";
import { FaEdit } from "react-icons/fa";


const MyProfile = () => {
  return (
    <div className="h-full p-3 ml-5 mr-5 space-y-2 w-ful border-4 rounded-lg border-[#DFE2E7] bg-white flex justify-between text-black">
      <div className="flex items-center p-2 space-x-4">
        <img
          src={user}
          alt=""
          className="w-12 h-12 rounded-full dark:bg-gray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <h2 className="text-sm font-semibold">Leroy Jenkins</h2>
          <h2 className="text-sm font-semibold">Leroy Jenkins</h2>
        </div>
      </div>
      <div>
        <button className="p-2">
        <FaEdit />
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
