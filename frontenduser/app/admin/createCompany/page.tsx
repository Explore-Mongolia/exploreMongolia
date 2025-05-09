"use client";

import { useState } from "react";
import CompanyForm from "./_components/CompanyForm";
import { sendRequest } from "@/lib/SendRequest";

export default function CreateCompanyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateCompany = async (formData: {
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    website?: string;
    rating?: number;
    priceRange?: string;
    tags: string[];
    profileImage: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await sendRequest.post("/company/create", {
        ...formData,
        tags: formData.tags.map((tag) => tag.trim()),
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Company created successfully!");
      }
    } catch (err) {
      console.error("Create company error:", err);
      setError("Failed to create company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Create New Company</h2>
      
      <CompanyForm onSubmit={handleCreateCompany} loading={loading} error={error} success={success} />
    </div>
  );
}
