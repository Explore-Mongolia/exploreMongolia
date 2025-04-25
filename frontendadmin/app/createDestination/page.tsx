"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:9000/company/all");
        console.log("Fetched companies:", response.data);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    

    fetchCompanies();
  }, []);

  const handleCreateDestination = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:9000/destination/create", {
        name,
        company,
        description,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Destination created successfully!");
        setName("");
        setCompany("");
        setDescription("");
      }
    } catch (err) {
      console.error("Create destination error:", err);
      setError("Failed to create destination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Destination</h2>
      <form onSubmit={handleCreateDestination} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900">Destination Name *</label>
          <input
            type="text"
            placeholder="Enter destination name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Select Company *</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">-- Select a Company --</option>
            {companies.map((comp) => (
              <option key={comp._id} value={comp._id}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Description</label>
          <textarea
            placeholder="Add a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-md px-3 py-2 mt-1 resize-none text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Creating..." : "Create Destination"}
          </button>
        </div>

        {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
        {success && <p className="text-green-600 font-medium mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default CreateDestination;
