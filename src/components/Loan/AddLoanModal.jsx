import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useUser } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

const schema = yup.object().shape({
  lender_name: yup.string().required("Please enter the lender's name"),
  principal_amount: yup
    .number()
    .positive("Principal amount must be greater than zero")
    .required("Please enter the principal amount"),
  total_paid: yup
    .number()
    .positive("Total paid must be greater than zero")
    .nullable()
    .transform((value) => (isNaN(value) ? null : value)),
  interest_rate: yup
    .number()
    .min(0, "Interest rate cannot be negative")
    .required("Please enter the interest rate"),
  number_of_payments: yup
    .number()
    .positive("Number of payments must be greater than zero")
    .required("Please enter the number of payments"),
  remaining_payments: yup
    .number()
    .min(-4, "Remaining payments must be at least -4")
    .required("Please enter the remaining payments"),
  start_date: yup
    .date()
    .required("Please select a start date")
    .min(new Date("2020-01-01"), "Start date must be after January 1, 2020")
    .max(new Date(), "Start date cannot be in the future"),
  end_date: yup
    .date()
    .required("Please select an end date")
    .min(yup.ref("start_date"), "End date must be after start date"),
  next_payment_date: yup
    .date()
    .required("Please select the next payment date")
    .min(yup.ref("start_date"), "Next payment date must be after start date")
    .max(yup.ref("end_date"), "Next payment date must be before end date"),
  payment_frequency: yup
    .string()
    .oneOf(
      ["Monthly", "Quarterly", "Annually"],
      "Please select a valid payment frequency"
    )
    .required("Please select a payment frequency"),
  notes: yup.string().nullable(),
});

const AddLoanModal = ({ isOpen, onClose, onAddSuccess }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      loan_type: "Personal Loan",
      lender_name: "",
      principal_amount: "",
      total_paid: "",
      interest_rate: "",
      number_of_payments: "",
      remaining_payments: "",
      start_date: "",
      end_date: "",
      next_payment_date: "",
      payment_frequency: "Monthly",
      notes: "",
      user_id: user?.user?.id || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        loan_type: "",
        lender_name: "",
        principal_amount: "",
        total_paid: "",
        interest_rate: "",
        number_of_payments: "",
        remaining_payments: "",
        start_date: "",
        end_date: "",
        next_payment_date: "",
        payment_frequency: "Monthly",
        notes: "",
        user_id: user?.user?.id || "",
      });
    }
  }, [isOpen, reset, user?.user?.id]);

  const onSubmit = async (data) => {
    const loanData = {
      ...data,
      principal_amount: parseFloat(data.principal_amount),
      total_paid: data.total_paid ? parseFloat(data.total_paid) : null,
      interest_rate: parseFloat(data.interest_rate),
      number_of_payments: parseInt(data.number_of_payments),
      remaining_payments: parseInt(data.remaining_payments),
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      next_payment_date: new Date(data.next_payment_date).toISOString(),
      status:
        data?.total_paid === data?.principal_amount ? "PaidOff" : "Active",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/personal/loans/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loanData),
        }
      );
      if (response.ok) {
        toast.success("Loan added successfully");
        onAddSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        toast.error("Failed to add loan");
        console.log(errorData);
      }
    } catch (error) {
      console.error("Error adding loan:", error);
      toast.error("An error occurred while adding the loan");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6  max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Loan</h2>
          <Button variant="outline" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-xl h-full max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loan Type
            </label>
            <input
              type="text"
              {...register("loan_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lender Name *
            </label>
            <input
              type="text"
              {...register("lender_name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.lender_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lender_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Principal Amount *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("principal_amount")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.principal_amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.principal_amount.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Paid (Optional)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("total_paid")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interest Rate (%)*
              </label>
              <input
                type="number"
                step="0.01"
                {...register("interest_rate")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
              {errors.interest_rate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.interest_rate.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Payments *
              </label>
              <input
                type="number"
                {...register("number_of_payments")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
              {errors.number_of_payments && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.number_of_payments.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Remaining Payments *
              </label>
              <input
                type="number"
                {...register("remaining_payments")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
              {errors.remaining_payments && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.remaining_payments.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 ">
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
                End Date *
              </label>
              <input
                type="datetime-local"
                {...register("end_date")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              />
              {errors.end_date && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.end_date.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Next Payment Date *
            </label>
            <input
              type="datetime-local"
              {...register("next_payment_date")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            />
            {errors.next_payment_date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.next_payment_date.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Frequency *
            </label>
            <select
              {...register("payment_frequency")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
            >
              <option value="Monthly">Monthly</option>
              <option value="BiWeekly">BiWeekly</option>
              <option value="Weekly">Weekly</option>
            </select>
            {errors.payment_frequency && (
              <p className="text-red-500 text-xs mt-1">
                {errors.payment_frequency.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1 px-2 dark:bg-white text-black border"
              rows="3"
            />
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
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Loan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoanModal;
