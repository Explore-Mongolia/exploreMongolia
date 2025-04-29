"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateExperienceForm() {
  const [formData, setFormData] = useState({
    name: "",
    visitedPlaces: "",
    description: "",
    user: "",
  });

  const [isClient, setIsClient] = useState(false); 
  const router = useRouter(); 

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/experience/create", {
        name: formData.name,
        visitedPlaces: formData.visitedPlaces.split(",").map(p => p.trim()), 
        description: formData.description,
        user: formData.user,
      });
      alert("Experience created successfully!");

      if (isClient) {
        router.push("/experience");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create experience.");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="name" className="mb-2 text-lg font-medium text-gray-700">Experience Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Enter experience name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="visitedPlaces" className="mb-2 text-lg font-medium text-gray-700">Visited Places (comma separated)</label>
      <input
        id="visitedPlaces"
        type="text"
        name="visitedPlaces"
        placeholder="e.g., Paris, Tokyo"
        value={formData.visitedPlaces}
        onChange={handleChange}
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="description" className="mb-2 text-lg font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Provide a short description of the experience"
        value={formData.description}
        onChange={handleChange}
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="user" className="mb-2 text-lg font-medium text-gray-700">User ID</label>
      <input
        id="user"
        type="text"
        name="user"
        placeholder="Enter User ID"
        value={formData.user}
        onChange={handleChange}
        className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
    >
      Create Experience
    </button>
  </form>
);
}