"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [vibesAvailable, setVibesAvailable] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:9000/company/companies");
        setCompanies(response.data.companies || []);
      } catch (error) {
        setError("Failed to fetch companies.");
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
        cost,
        vibesAvailable,
        image,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Destination created successfully!");
        setName("");
        setCompany("");
        setDescription("");
        setCost("");
        setVibesAvailable([]);
        setImage("");
      }
    } catch (err) {
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
            <option value="" disabled>
              Select a company...
            </option>
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
          <label className="block text-sm font-semibold text-gray-900">Cost</label>
          <input
            type="text"
            placeholder="Enter cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Vibes Available</label>
          <input
            type="text"
            placeholder="Enter vibes (comma separated)"
            value={vibesAvailable.join(", ")}
            onChange={(e) => setVibesAvailable(e.target.value.split(", ").map((v) => v.trim()))}
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Img Upload</label>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(results: any) => {
              if (results.info?.secure_url) {
                setImage(results.info?.secure_url); 
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-md hover:opacity-80 transition"
              >
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm">
                  Upload
                </div>
              </button>
            )}
          </CldUploadWidget>
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
