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
    age: "",
    groupType: "",
    budget: "",
    preferences: "",
    days: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
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
      <select
        name="age"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          Select Age Group
        </option>
        <option value="under 18">Under 18</option>
        <option value="18-30">18-30</option>
        <option value="31-50">31-50</option>
        <option value="51+">51+</option>
      </select>

      <select
        name="groupType"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          Select Group Type
        </option>
        <option value="solo">Solo</option>
        <option value="couple">Couple</option>
        <option value="family">Family</option>
        <option value="friends">Friends</option>
      </select>

      <select
        name="budget"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          Select Budget
        </option>
        <option value="low">Under $500</option>
        <option value="medium">$500–$1500</option>
        <option value="high">Over $1500</option>
      </select>

      <select
        name="days"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          Number of Days
        </option>
        <option value="1-3">1–3 days</option>
        <option value="4-7">4–7 days</option>
        <option value="8-16">8-16 days</option>
        <option value="16-32">16-32 days</option>
      </select>

      <textarea
        name="preferences"
        placeholder="Preferences (e.g. adventure, relaxation, history)"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
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
