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
      <Hero />
      <div id="experiences">
        <ExperienceList />
      </div>
      <div id="planner">
        <TripPlannerForm />
      </div>
      <TripSection />
      <PostIcon />
    </div>
  );
}
