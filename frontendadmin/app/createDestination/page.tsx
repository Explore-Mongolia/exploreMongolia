"use client";

import React, { useState } from "react";
import axios from "axios";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateDestination = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:9000/destination/create", {
        name,
        company,
        description
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
    <form onSubmit={handleCreateDestination}>
      <h2>Create New Destination</h2>
      <input
        type="text"
        placeholder="Destination Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company ID"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Destination"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default CreateDestination;