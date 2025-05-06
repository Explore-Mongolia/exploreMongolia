"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { Loader2 } from "lucide-react";

export const AiInput = ({
  setTripPlan,
  travelType,
}: {
  setTripPlan: (value: any) => void;
  travelType: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    groupType: "",
    budget: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendRequest.post("/ai/generate-trip", {
        ...form,
        type: travelType,
      });
      setTripPlan(res.data.tripPlan);
    } catch (err) {
      console.error("Trip generation failed:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="groupType"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
        required
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
        required
      >
        <option value="" disabled>
          Select Budget
        </option>
        <option value="low">Under $500</option>
        <option value="medium">$500–$1500</option>
        <option value="high">Over $1500</option>
      </select>


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
