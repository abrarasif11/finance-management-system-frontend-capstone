import React from "react";
import { Button } from "./Button";

const DeletionConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "This action cannot be undone.",
  itemName = "this item",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-4">Are you sure you want to delete {itemName}? {message}</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletionConfirmationModal;