import { NavbarDemo } from "@/components/Navbar";
import TripPlannerForm from "@/components/GenerateTrip";
import ExperienceList from "@/components/ExperienceSection";
import TripSection from "@/components/TripSection";
import PostIcon from "@/components/PostIcon";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <NavbarDemo />
      <Hero/>
      <TripPlannerForm />
      <ExperienceList />
      <TripSection />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 p-4 z-50">
        <PostIcon />
      </div>
    </div>
  );
}
