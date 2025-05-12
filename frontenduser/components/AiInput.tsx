"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AiInput = ({
  setTripPlan,
  travelType,
}: {
  setTripPlan: (value: any) => void;
  travelType: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendRequest.post("/ai/generate-trip", {
        budget: Number(budget),
        type: travelType,
      });

      setTripPlan(res.data.tripPlan);

      
      toast.success("Trip generated successfully!");
    } catch (err: any) {
      if (err.response?.status === 429) {
        toast.warning("Another trip is being generated. Please wait and try again.");
      } else {
        toast.error("Failed to generate trip. Try again later.");
        console.error("Trip generation failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="budget"
        onChange={(e) => setBudget(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        defaultValue=""
        required
      >
        <option value="" disabled>
          Select Budget
        </option>
        <option value="500">Under $500</option>
        <option value="1000">$500–$1000</option>
        <option value="2000">Over $1000</option>
      </select>

      <button
        type="submit"
        disabled={loading || !travelType || !budget} 
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
