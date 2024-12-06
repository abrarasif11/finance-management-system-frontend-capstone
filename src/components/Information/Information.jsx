import React from "react";
import { FaEdit } from "react-icons/fa";

const Information = () => {
  return (
    <div className="h-full p-3 ml-5 mr-5 space-y-2 w-ful border-4 rounded-lg border-[#DFE2E7] bg-white flex justify-between text-black">
      <div className="flex items-center p-2 space-x-4">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Information </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm font-semibold">
                First Name
              </label>
              <br />
              <label htmlFor="username" className="text-sm ">
                Asif
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Last Name
              </label>
              <br />
              <label htmlFor="username" className="text-sm ">
                Abrar
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Email
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                abrar@gmail.com
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Phone
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                01696969699
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Bio
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                Gamer
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

export default Information;
