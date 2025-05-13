"use client";

import { Tab } from "@headlessui/react";
import { Experience, TripPlan } from "@/lib/types";
import { useState } from "react";
import EditTripPlanDialog from "./EditTripPlanDialog";
import { Pencil } from "lucide-react";

interface MainContentProps {
  user: {
    experiences: Experience[];
    tripPlans: TripPlan[];
  };
  editable: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ user, editable }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TripPlan | null>(null);
  const [tripPlans, setTripPlans] = useState<TripPlan[]>(user.tripPlans);

  const handleEdit = (plan: TripPlan) => {
    setSelectedPlan(plan);
    setOpenDialog(true);
  };

  return (
    <div className="lg:col-span-3">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
          {["Experiences", "Trip Plans"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                ${
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {/* Experiences Tab */}
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Experiences
              </h2>

              {user.experiences && user.experiences.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 overflow-hidden shadow-md bg-gray-50"
                    >
                      {exp.images?.[0] && (
                        <img
                          src={exp.images[0]}
                          alt={exp.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4 space-y-2">
                        <h3 className="text-xl font-semibold text-blue-800">
                          {exp.name}
                        </h3>

                        <p className="text-sm text-gray-600">
                          <strong>Visited Places:</strong> {exp.visitedPlaces}
                        </p>

                        {exp.tripDates && (
                          <p className="text-sm text-gray-600">
                            <strong>Trip Dates:</strong> {exp.tripDates}
                          </p>
                        )}

                        <p className="text-sm text-gray-600">
                          {exp.description}
                        </p>

                        {exp.highlights && (
                          <p className="text-sm text-green-700">
                            <strong>Highlights:</strong> {exp.highlights}
                          </p>
                        )}

                        {exp.vibes && (
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mt-1">
                            {exp.vibes}
                          </span>
                        )}

                        {exp.totalCost && (
                          <p className="text-sm text-gray-600">
                            <strong>Total Cost:</strong> ${exp.totalCost}
                          </p>
                        )}

                        {exp.tips && (
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-gray-800 rounded mt-2">
                            <strong>Tips:</strong> {exp.tips}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No experiences shared yet.</p>
              )}
            </div>
          </Tab.Panel>

          {/* Trip Plans Tab */}
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Trip Plans</h2>
              {tripPlans.length > 0 ? (
                tripPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4 shadow-sm bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-blue-800">
                        {plan.title}
                      </h3>
                      {editable && (
                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit Trip Plan"
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Destinations:</strong>{" "}
                      {plan.destinations.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Transportation:</strong> {plan.transportation}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Accommodations:</strong>{" "}
                      {plan.accommodations.map((a) => a.name).join(", ")}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-md font-medium text-gray-700">
                        Daily Plan:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {plan.plan.map((day) => (
                          <div
                            key={`day-${index}`}
                            className="p-3 border rounded-md bg-white shadow-sm"
                          >
                            <h5 className="font-semibold text-blue-700 mb-1">
                              Day {day.day}
                            </h5>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                              {day.activities.map((act, i) => (
                                <li key={i}>{act}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {plan.notes && (
                      <div className="mt-4 p-3 border-l-4 border-yellow-400 bg-yellow-50 text-sm text-gray-800 rounded">
                        <strong>Note:</strong> {plan.notes}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No trip plans available yet.</p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <EditTripPlanDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        tripPlan={selectedPlan}
        onUpdate={(updatedPlan) => {
          const updatedPlans = tripPlans.map((p) =>
            p._id === updatedPlan._id ? updatedPlan : p
          );
          setTripPlans(updatedPlans);
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

export default MainContent;
