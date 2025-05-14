"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AiInput } from "./AiInput";
import { TripPlan } from "@/lib/types";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import MapRoute from "./MapRoute";
import { useParams } from "next/navigation";
import { useDestination } from "@/hooks/useDestination";

const travelTypes = [
  "Nature & Scenery",
  "Historical & Cultural",
  "Adventure (Hiking, Trekking)",
  "Nomadic Lifestyle",
  "Desert Experience",
  "Luxury & Relaxation",
];

const TripPlannerForm = () => {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [selectedTravelType, setSelectedTravelType] = useState("");
  const tripRef = useRef<HTMLDivElement>(null);
  const userId = useUserStore((state) => state.mongoUserId);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!tripRef.current) {
      toast.error("Trip plan is not ready to download.");
      return;
    }

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(tripRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("trip-plan.pdf");

      toast.success("Trip PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF download error:", err);
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false); // reset loading

      setIsDownloading(false);
    }
  };

   const { id } = useParams();
    const destinationId = Array.isArray(id) ? id[0] : id;

   const { data, isLoading, error } = destinationId
      ? useDestination(destinationId)
      : { data: null, isLoading: false, error: "Invalid destination ID" };
  const destination = data?.destination;

  const handleSaveToAccount = async () => {
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const res = await sendRequest.post(
        `/ai/save-trip?userId=${userId}`,
        tripPlan
      );

      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.data.error || "Something went wrong");
      }

      toast.success("Trip saved to your account!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save trip.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Trip Planner</h1>

      <div className="mb-6">
        <label htmlFor="travelType" className="block font-medium">
          Travel Type
        </label>
        <select
          id="travelType"
          value={selectedTravelType}
          onChange={(e) => setSelectedTravelType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">-- Select Travel Type --</option>
          {travelTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <AiInput setTripPlan={setTripPlan} travelType={selectedTravelType} />

      {tripPlan && (
        <>
          <div
            ref={tripRef}
            className="mt-8 p-6 bg-white rounded-2xl shadow space-y-4"
          >
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
                {tripPlan.accommodations.map((acc, idx) => (
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
                {tripPlan.plan.map((day) => (
                  <li key={day.day} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold">Day {day.day}</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {day.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
          >
            Download PDF
          </button>
          <button
            onClick={handleSaveToAccount}
            className="bg-green-600 ml-3 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-green-700 transition"
          >
            Save to Account
          </button>
        
          <MapRoute
            lng={106.9177016}
            lat={47.9184676}
            destinationName={"Destination Name"}
            markers={[]}
          />
          
        </>
      )}
    </div>
  );
};

export default TripPlannerForm;
