"use client";

import React, { useState } from "react";
import axios from "axios";
import CreateDestination from "./createDestination/page";
import { CldUploadWidget } from "next-cloudinary";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendRequest } from "@/lib/SendRequest";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [rating, setRating] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [tags, setTags] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => phone && phone.length > 0;

  const handleCreateCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    try {
      const response = await sendRequest.post("/company/create", {
        name,
        description,
        contact: {
          phoneNumber,
          email,
          website,
        },
        rating: rating ? Number(rating) : undefined,
        priceRange,
        tags: tags.split(",").map(tag => tag.trim()),
        profileImage,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Company created successfully!");
        setName("");
        setDescription("");
        setPhoneNumber("");
        setEmail("");
        setWebsite("");
        setRating("");
        setPriceRange("");
        setTags("");
        setProfileImage("");

  
        window.location.reload();
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
      <form onSubmit={handleCreateCompany} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900">Company Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter the company name"
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Enter a brief description of the company"
            className="w-full border rounded-md px-3 py-2 mt-1 resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900">Phone Number *</label>
            <PhoneInput
              international
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value || "")}
              placeholder="Enter phone number"
              className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter company website URL"
            className="w-full border rounded-md px-3 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Img Upload</label>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(results: any) => {
              if (results.info?.secure_url) {
                setProfileImage(results.info?.secure_url); 
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
            {loading ? "Creating..." : "Create Company"}
          </button>
        </div>

        {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
        {success && <p className="text-green-600 font-medium mt-2">{success}</p>}
      </form>

      <div className="mt-10">
        <CreateDestination />
      </div>
    </div>
  );
};

export default CreateCompany;
