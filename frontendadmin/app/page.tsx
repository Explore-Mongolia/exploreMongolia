"use client";

import React, { useState } from "react";
import axios from "axios";
import CreateDestination from "./createDestination/page";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:9000/company/create", {
        name,
        description,
        contact: {
          phoneNumber,
          email,
          website,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Company created successfully!");
        setName("");
        setDescription("");
        setPhoneNumber("");
        setEmail("");
        setWebsite("");
      }
    } catch (err) {
      console.error("Create company error:", err);
      setError("Failed to create company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateCompany}>
        <h2>Create New Company</h2>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Company"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
      <CreateDestination />

    </div>

  );
};

export default CreateCompany;
