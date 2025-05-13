import { NavbarDemo } from "@/components/Navbar";
import TripPlannerForm from "@/components/GenerateTrip";
import ExperienceList from "@/components/ExperienceSection";
import TripSection from "@/components/TripSection";
import Hero from "@/components/Hero";
import FloatingHoverActions from "@/components/FloatingButton";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <NavbarDemo />
      <Hero />
      <div id="experiences">
        <ExperienceList />
      </div>
      <div id="planner">
        <TripPlannerForm />
      </div>
      <TripSection />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 p-4 z-50">
        <FloatingHoverActions/>
      </div>
    </div>
  );
}
