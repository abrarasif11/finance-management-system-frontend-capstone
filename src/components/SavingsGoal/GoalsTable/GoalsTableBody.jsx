import React from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/Button";

const GoalsTableBody = ({
  filteredGoals,
  handleOpen,
  handleDelete,
  handleAddEntryOpen,
  handleOpenDrawer,
}) => (
  <tbody>
    {filteredGoals.map((goal) => {
      const progress = Math.min(
        (goal.current_amount / goal.target_amount) * 100,
        100
      );
      return (
        <tr
          key={goal.id}
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => handleOpenDrawer(goal)}
        >
          <td className="px-4 py-3 font-medium text-gray-900">{goal.title}</td>
          <td className="px-4 py-3">৳{goal.target_amount.toLocaleString()}</td>
          <td className="px-4 py-3">৳{goal.current_amount.toLocaleString()}</td>
          <td className="px-4 py-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">
              {progress.toFixed(1)}%
            </span>
          </td>
          <td className="px-4 py-3">{goal.start_date}</td>
          <td className="px-4 py-3">{goal.end_date || "—"}</td>
          <td className="px-4 py-3">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${
                goal.status == "Completed"
                  ? "bg-green-600"
                  : goal.status == "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {goal.status}
            </span>
          </td>
          <td className="flex items-center gap-2 my-4">
            <Button
              variant="outline"
              title="Add New Entry"
              onClick={(e) => {
                e.stopPropagation();
                handleAddEntryOpen(goal);
              }}
            >
              <Plus size={16} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleOpen(goal);
              }}
              variant="outline"
              className="mx-1"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(goal.id);
              }}
              variant="destructive"
            >
              <Trash2 size={16} />
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
);

export default GoalsTableBody;
