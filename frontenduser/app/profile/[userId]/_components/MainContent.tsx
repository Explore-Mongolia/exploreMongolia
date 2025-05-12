import { Tab } from "@headlessui/react";
import { Experience } from "@/lib/types";
import { TripPlan } from "@/lib/types";

interface MainContentProps {
  user: {
    experiences: Experience[];
    tripPlans: TripPlan[];
  };
  editable: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ user }) => {
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
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Experiences
              </h2>
              {user.experiences && user.experiences.length > 0 ? (
                user.experiences.map((exp, index) => (
                  <div key={index} className="border-b py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {exp.name}
                    </h3>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No experiences shared yet.</p>
              )}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Trip Plans
              </h2>
              {user.tripPlans && user.tripPlans.length > 0 ? (
                user.tripPlans.map((plan, index) => (
                  <div key={index} className="border-b py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Destinations: {plan.destinations.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Transportation: {plan.transportation}
                    </p>
                    <p className="text-sm text-gray-600">
                      Accommodation:{" "}
                      {plan.accommodations
                        .map((accom) => accom.name)
                        .join(", ")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No trip plans available.</p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MainContent;
