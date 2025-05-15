"use client";

import React, { useState, useEffect } from "react";
import DestinationForm from "./_components/DestinationForm";
import { sendRequest } from "@/lib/SendRequest";

const CreateDestinationPage = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await sendRequest.get("/company");
        setCompanies(response.data.companies || []);
      } catch (err) {
        setError("Failed to fetch companies.");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Create New Destination</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <DestinationForm companies={companies} />
    </div>
  );
};

export default CreateDestinationPage;
