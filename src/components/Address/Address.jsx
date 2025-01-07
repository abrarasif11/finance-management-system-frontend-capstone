import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../contexts/AuthContext";

const Address = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    handleClose();
  };
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
        <button className="p-2" onClick={handleOpen}>
          <FaEdit />
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Edit Country Details</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country 
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter Country Name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City / State
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter City / State Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter Postal Code"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tax ID
                  </label>
                  <input
                    type="text"
                    id="tax"
                    name="tax"
                    className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter Tax ID"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#EF4E5D] text-white rounded  transition"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
