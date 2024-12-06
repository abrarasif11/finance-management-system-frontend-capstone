import React from 'react';
import { FaEdit } from "react-icons/fa";

const Address = () => {
        return (
                <div className="h-full p-3 ml-5 mr-5 space-y-2 w-ful border-4 rounded-lg border-[#DFE2E7] bg-white flex justify-between text-black">
      <div className="flex items-center p-2 space-x-4">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Address </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm font-semibold">
              Country
              </label>
              <br />
              <label htmlFor="username" className="text-sm ">
                Bangladesh
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
              City / State
              </label>
              <br />
              <label htmlFor="username" className="text-sm ">
                Dhaka
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Postal Code
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                1219
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Tax ID 
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                007
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <button className="p-2">
          <FaEdit />
        </button>
      </div>
    </div>
        );
};

export default Address;