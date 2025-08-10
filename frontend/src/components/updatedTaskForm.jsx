import React, { useState } from "react";
import { useUpdateTask } from "../hooks/usetask";

const UpdateTaskForm = ({ task, onClose }) => {
  const [formData, setFormData] = useState({
    name: task.name,
    body: task.body,
    status: task.status,
  });

  const mutation = useUpdateTask();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: task._id, updatedData: formData });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded mt-6">
      <h2 className="text-lg font-bold text-gray-200">Update Task</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <textarea
        name="body"
        value={formData.body}
        onChange={handleChange}
        required
        rows={4}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="incomplete">Incomplete</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;
