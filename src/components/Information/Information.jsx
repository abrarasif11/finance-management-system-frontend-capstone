import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../contexts/AuthContext";

const Information = () => {
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
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
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
                {user.user.first_name}
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Last Name
              </label>
              <br />
              <label htmlFor="username" className="text-sm ">
                {user.user.last_name}
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Email
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                {user.user.email}
              </label>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="website" className="text-sm font-semibold">
                Phone
              </label>
              <br />
              <label htmlFor="username" className="text-sm">
                {user.user.phone_number}
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
        <button className="p-2" onClick={handleOpen}>
          <FaEdit />
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[480px]">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Edit Personal Information</h2>
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
                   First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-1 bg-white p-2 border rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm  font-medium text-gray-700"
                  >
                   Last Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter Last Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="w-full mt-1 p-2 border bg-white rounded focus:ring focus:ring-blue-300"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    You Bio
                  </label>
                  <input
                    type="text"
                    id="bio"
                    name="Bio"
                    className="w-full mt-1 p-2 border rounded  bg-white focus:ring focus:ring-blue-300"
                    placeholder="Enter You Bio"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 font-semibold to-green-800 text-white rounded  transition"
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

export default Information;
