"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { Loader2 } from "lucide-react";

export const AiInput = ({
  setTripPlan,
}: {
  setTripPlan: (value: any) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    origin: "",
    age: "",
    groupType: "",
    budget: "",
    preferences: "",
    days: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendRequest.post("/ai/generate-trip", form);
    setTripPlan(res.data.tripPlan);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="origin"
        placeholder="Your Origin"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="age"
        placeholder="Your Age"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="groupType"
        placeholder="Group Type (e.g. solo, couple, family)"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="budget"
        placeholder="Budget in USD"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="days"
        placeholder="Number of Days"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="preferences"
        placeholder="Preferences (e.g. adventure, relaxation, history)"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Generating...
          </>
        ) : (
          "Generate Trip"
        )}
      </button>
    </form>
  );
};
