"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/SendRequest";


export default function TripPlannerForm() {
  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    origin: "",
    age: "",
    groupType: "",
    budget: "",
    preferences: "",
    days: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await sendRequest.post(
      "/ai/generate-trip",
      form
    );
    setTripPlan(res.data.tripPlan);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="origin" placeholder="Origin" onChange={handleChange} />
        <input name="age" placeholder="Age" onChange={handleChange} />
        <input
          name="groupType"
          placeholder="Group Type"
          onChange={handleChange}
        />
        <input
          name="budget"
          placeholder="Budget (USD)"
          onChange={handleChange}
        />
        <input name="days" placeholder="days" onChange={handleChange} />
        <textarea
          name="preferences"
          placeholder="Preferences"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>
      {tripPlan && (
        <div className="mt-6 p-4 border">
          <h2 className="text-xl font-bold">Trip Plan:</h2>
          <pre className="whitespace-pre-wrap">{tripPlan}</pre>
        </div>
      )}
    </div>
  );
}
