import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "../axios";

const CreateTaskForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    status: "incomplete",
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/task/createtask", formData);

      setFormData({ name: "", body: "", status: "incomplete" });

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg
                    bg-gradient-to-br from-gray-900 via-purple-900 to-black
                    text-gray-200 space-y-8 animate-fadeIn">
      

      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white animate-pulse">
          Welcome, <span className="text-purple-400">User!</span>
        </h1>
        <p className="text-md md:text-lg text-gray-300 animate-bounce">
          Create your first task
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg animate-pulse">
          Create New Task
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="w-full border border-gray-600 bg-gray-800 text-gray-100
                     px-4 py-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     transition duration-300 ease-in-out"
        />

        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Task Description"
          required
          className="w-full border border-gray-600 bg-gray-800 text-gray-100
                     px-4 py-2 rounded-md resize-none
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     transition duration-300 ease-in-out"
          rows={4}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-600 bg-gray-800 text-gray-100
                     px-4 py-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     transition duration-300 ease-in-out"
        >
          <option value="incomplete" className="bg-gray-900 text-yellow-400 font-semibold">
            Incomplete
          </option>
          <option value="pending" className="bg-gray-900 text-blue-400 font-semibold">
            Pending
          </option>
          <option value="completed" className="bg-gray-900 text-green-400 font-semibold">
            Completed
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700
                     text-white font-bold py-3 rounded-md
                     shadow-lg
                     transform hover:scale-105 transition-transform duration-300"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
