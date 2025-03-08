import React from "react";
import { useForm } from "react-hook-form";

const AddExpensesModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <dialog id="addExpenseModal" className="modal">
      <div className="modal-box max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Expense
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Family dinner"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-medium">
              Amount (BDT)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: 1200"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Food"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium">
              Date
            </label>
            <input
              id="date"
              type="datetime-local"
              {...register("date", { required: "Date is required" })}
              className={`w-full mt-1 p-2 border rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-white p-3 rounded-md font-medium hover:bg-hoversec transition"
          >
            Add Expense
          </button>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddExpensesModal;
