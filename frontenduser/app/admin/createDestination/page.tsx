"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { sendRequest } from "@/lib/SendRequest";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [vibesAvailable, setVibesAvailable] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currency, setCurrency] = useState('$');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await sendRequest.get("/company");
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
      const response = await sendRequest.post("/destination/create", {
        name,
        company,
        description,
        cost,
        vibesAvailable,
        image,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Destination created successfully!");
        setName("");
        setCompany("");
        setDescription("");
        setCost("");
        setVibesAvailable([]);
        setImage("");
        setLatitude("");
        setLongitude("");
        window.location.reload();
      }
    } catch (err) {
      setError("Failed to create destination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Create New Destination</h2>
      <form onSubmit={handleCreateDestination} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900">Destination Name *</label>
          <input
            type="text"
            placeholder="Enter destination name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Select Company *</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" disabled>Select a company...</option>
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
            className="w-full border rounded-md px-3 py-2 mt-1 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Cost</label>
          <div className="flex items-center space-x-2 mt-1">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-md px-2 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="¥">¥ (JPY)</option>
              <option value="₽">₽ (RUB)</option>
              <option value="元">元 (CNY)</option>
              <option value="₩">₩ (KRW)</option>
            </select>

            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                {currency}
              </span>
              <input
                type="text"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
                className="w-full border rounded-md pl-7 pr-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Vibes Available</label>
          <input
            type="text"
            placeholder="Enter vibes (comma separated)"
            value={vibesAvailable.join(", ")}
            onChange={(e) => setVibesAvailable(e.target.value.split(",").map((v) => v.trim()))}
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Image Upload</label>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(results: any) => {
              if (results.info?.secure_url) {
                setImage(results.info.secure_url);
              }
            }}
          >
            {({ open }) => (
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => open()}
                  className="relative w-full h-28 overflow-hidden border-2 border-gray-300 shadow-md hover:opacity-80 transition rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
                >
                  {image ? (
                    <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            )}
          </CldUploadWidget>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Location Coordinates *</label>
          <div className="flex space-x-4 mt-1">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              className="w-1/2 border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              className="w-1/2 border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
