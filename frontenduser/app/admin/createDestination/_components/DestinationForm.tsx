import React, { useState } from "react";
import CompanySelect from "../../../admin/createDestination/_components/CompanySelect";
import CostInput from "../../../admin/createDestination/_components/CostInput";
import VibesInput from "./VibesInput";
import LocationInput from "./LocationInput";
import ImageUpload from "./ImageUpload";
import { sendRequest } from "@/lib/SendRequest";
import { toast } from "sonner";

interface DestinationFormProps {
  companies: any[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const DestinationForm: React.FC<DestinationFormProps> = ({
  companies,
  loading,
  error,
  success,
}) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [vibesAvailable, setVibesAvailable] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currency, setCurrency] = useState("$");

const handleCreateDestination = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    const res = await sendRequest.post("/destination/create", {
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

    if (res.status === 201) {
      toast.success("Destination created successfully!");
    } else {
      toast.error("Failed to create destination");
    }
  } catch (err) {
    console.error("Failed to create destination:", err);
    toast.error("An error occurred while creating the destination.");
  }
};


  return (
    <form onSubmit={handleCreateDestination} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-900">
          Destination Name *
        </label>
        <input
          type="text"
          placeholder="Enter destination name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <CompanySelect
        company={company}
        companies={companies}
        setCompany={setCompany}
      />

      <div>
        <label className="block text-sm font-semibold text-gray-900">
          Description
        </label>
        <textarea
          placeholder="Add a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded-md px-3 py-2 mt-1 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <CostInput
        cost={cost}
        currency={currency}
        setCost={setCost}
        setCurrency={setCurrency}
      />

      <VibesInput
        vibesAvailable={vibesAvailable}
        setVibesAvailable={setVibesAvailable}
      />

      <ImageUpload image={image} setImage={setImage} />

      <LocationInput
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />

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
