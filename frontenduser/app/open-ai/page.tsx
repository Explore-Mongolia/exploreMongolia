"use client";

import { useState } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { Loader2 } from "lucide-react";

const TripPlannerForm = () => {
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
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Trip Planner</h1>

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

      {tripPlan && typeof tripPlan === "object" && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow space-y-4">
          <h2 className="text-2xl font-bold">{tripPlan.title}</h2>
          <div>
            <strong>Destinations:</strong>{" "}
            <span className="text-gray-800">
              {tripPlan.destinations.join(", ")}
            </span>
          </div>

          <div>
            <strong>Transportation:</strong>{" "}
            <span className="text-gray-800">{tripPlan.transportation}</span>
          </div>

          <div>
            <strong>Accommodations:</strong>
            <ul className="list-disc list-inside text-gray-700">
              {tripPlan.accommodations.map((acc: any, idx: number) => (
                <li key={idx}>
                  {acc.name} – {acc.address}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Notes:</strong>
            <p className="text-gray-700">{tripPlan.notes}</p>
          </div>

          <div>
            <strong>Daily Plan:</strong>
            <ul className="space-y-2">
              {tripPlan.plan.map((day: any) => (
                <li key={day.day} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Day {day.day}</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {day.activities.map((activity: string, i: number) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlannerForm;
