import axios from "axios";
import React, { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddExpensesModal = ({ props }) => {
  const { user, refetch } = props;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef();

  const submitHandler = async (data) => {
    try {
      if (!data) return;
      setLoading(true);
      data.user_id = user?.user?.id;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/personal/expenses`,
        data
      );

      if (parseInt(res?.status) === 201) {
        toast.success("New expense saved!", {
          duration: 2000,
          position: "top-right",
        });
        formRef.current.reset();
        document.getElementById("addExpenseModal").close();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="addExpenseModal" className="modal">
      <div className="modal-box max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Expense
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          ref={formRef}
          className="space-y-4"
        >
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-black font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full mt-1 p-2 border bg-white text-black rounded-md ${
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
            <label htmlFor="amount" className="block text-black font-medium">
              Amount (BDT)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              className={`w-full mt-1 p-2 border bg-white text-black rounded-md ${
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
            <label htmlFor="category" className="block text-black font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className={`w-full mt-1 p-2 border bg-white text-black rounded-md ${
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
            <label htmlFor="date" className="block text-black font-medium">
              Date
            </label>
            <input
              id="date"
              type="datetime-local"
              {...register("date", { required: "Date is required" })}
              className={`w-full mt-1 p-2 border bg-white text-black rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {loading ? (
            <button
              type="submit"
              className="w-full bg-green-200 text-white p-3 rounded-md font-medium hover:bg-hoversec transition"
              disabled
            >
              Adding Expense....
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-medium hover:bg-hoversec transition"
            >
              Add Expense
            </button>
          )}
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddExpensesModal;
