import React, { useState } from "react";
import CompanySelect from '../../../admin/createDestination/_components/CompanySelect';
import CostInput from '../../../admin/createDestination/_components/CostInput';
import VibesInput from './VibesInput';
import LocationInput from './LocationInput';
import ImageUpload from './ImageUpload';

interface DestinationFormProps {
  companies: any[];
}

const DestinationForm: React.FC<DestinationFormProps> = ({ companies }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [vibesAvailable, setVibesAvailable] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currency, setCurrency] = useState('$');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setCompany("");
    setDescription("");
    setCost("");
    setVibesAvailable([]);
    setImage("");
    setLatitude("");
    setLongitude("");
    setCurrency("$");
  };

  const handleCreateDestination = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const destinationData = {
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
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/destination/create`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to create destination");
      }

      console.log("Destination created successfully!", result);
      setSuccess("Destination created successfully!");
      resetForm();
    } catch (err: any) {
      console.error("Failed to create destination:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <CompanySelect company={company} companies={companies} setCompany={setCompany} />

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

      <CostInput cost={cost} currency={currency} setCost={setCost} setCurrency={setCurrency} />
      <VibesInput vibesAvailable={vibesAvailable} setVibesAvailable={setVibesAvailable} />
      <ImageUpload image={image} setImage={setImage} />
      <LocationInput latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />

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
  );
};

export default DestinationForm;
