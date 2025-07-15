import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useUser } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

const schema = yup.object().shape({
  title: yup.string().required("Please enter the investment title"),
  investment_type: yup
    .string()
    .oneOf(
      ["MutualFund", "Stock", "Bond"],
      "Please select a valid investment type"
    )
    .required("Please select an investment type"),
  institution: yup.string().required("Please enter the institution name"),
  initial_amount: yup
    .number()
    .positive("Initial amount must be greater than zero")
    .required("Please enter the initial amount"),
  current_value: yup
    .number()
    .positive("Current value must be greater than zero")
    .required("Please enter the current value"),
  start_date: yup
    .date()
    .required("Please select a start date")
    .max(new Date(), "Start date cannot be in the future"),
  status: yup
    .string()
    .oneOf(["Active", "Closed"], "Please select a valid status")
    .required("Please select a status"),
});

const AddInvestmentModal = ({ isOpen, onClose, onAddSuccess }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      investment_type: "MutualFund",
      institution: "",
      initial_amount: "",
      current_value: "",
      start_date: "",
      end_date: "",
      status: "Active",
      user_id: user?.user?.id || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      const currentDateTime = new Date().toISOString().slice(0, 16); // Format: "2025-07-16T01:39"
      reset({
        title: "",
        investment_type: "MutualFund",
        institution: "",
        initial_amount: "",
        current_value: "",
        start_date: currentDateTime,
        end_date: "",
        status: "Active",
        user_id: user?.user?.id || "",
      });
    }
  }, [isOpen, reset, user?.user?.id]);

  const onSubmit = async (data) => {
    const investmentData = {
      ...data,
      initial_amount: parseFloat(data.initial_amount),
      current_value: parseFloat(data.current_value),
      start_date: new Date(data.start_date).toISOString(),
      end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/investments/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(investmentData),
        }
      );
      if (response.ok) {
        toast.success("Investment added successfully");
        onAddSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        toast.error("Failed to add investment");
      }
    } catch (error) {
      console.error("Error adding investment:", error);
      toast.error("An error occurred while adding the investment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Investment
          </h2>
          <Button variant="outline" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-2xl h-full max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investment Type *
            </label>
            <select
              {...register("investment_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            >
              <option value="Stock">Stock</option>
              <option value="MutualFund">Mutual Fund</option>
              <option value="Bond">Bond</option>
              <option value="FixedDeposit">Fixed Deposit</option>
            </select>
            {errors.investment_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.investment_type.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Institution *
            </label>
            <input
              type="text"
              {...register("institution")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.institution && (
              <p className="text-red-500 text-xs mt-1">
                {errors.institution.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Initial Amount *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("initial_amount")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.initial_amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.initial_amount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Value *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("current_value")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.current_value && (
              <p className="text-red-500 text-xs mt-1">
                {errors.current_value.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status *
            </label>
            <select
              {...register("status")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            >
              <option value="Active">Active</option>
              <option value="Matured">Matured</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-1">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date *
              </label>
              <input
                type="datetime-local"
                {...register("start_date")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
              {errors.start_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.start_date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date (Optional)
              </label>
              <input
                type="datetime-local"
                {...register("end_date")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Investment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvestmentModal;
