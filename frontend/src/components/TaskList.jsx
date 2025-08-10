
import React, { useState } from "react";
import { usePaginatedTasks } from "../hooks/usePaginatedTask";
import UpdateTaskForm from "./updatedTaskForm";
import {useDeleteTask} from "../hooks/usetask"

const TaskList = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  const { data, isLoading, isError, isFetching } = usePaginatedTasks(page);
  const deleteTask = useDeleteTask();

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks.</p>;

// Filter Code and Logic

  const filteredTasks =
    filterStatus === "all"
      ? data.tasks
      : data.tasks.filter((task) => task.status === filterStatus);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-gray-900 rounded shadow text-gray-200">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "completed", "pending", "incomplete"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1 rounded font-semibold text-sm ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>


      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-700 rounded p-4 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold text-lg">{task.name}</p>
              <p className="text-gray-400">{task.body}</p>
              <p className="mt-1 text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    task.status === "completed"
                      ? "text-green-400"
                      : task.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {task.status}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => setEditingTask(task)}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-black font-semibold w-full sm:w-auto text-center"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask.mutate(task._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold w-full sm:w-auto text-center"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}


      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-700 px-3 py-1 rounded text-white disabled:opacity-50 w-full sm:w-auto"
        >
          Previous
        </button>

        <p>
          Page {data?.currentPage} of {data?.totalPages}
        </p>

        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, data.totalPages))}
          className="bg-gray-700 px-3 py-1 rounded text-white disabled:opacity-50 w-full sm:w-auto"
        >
          Next
        </button>
      </div>

      {isFetching && (
        <p className="mt-2 text-sm text-yellow-400">Loading new page...</p>
      )}

      {editingTask && (
        <UpdateTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
