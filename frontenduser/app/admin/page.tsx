"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import NavBarAdmin from "./_components/NavbarAdmin";
import CompanyList from "./_components/CompanyList";
import DestinationList from "./_components/DestiantionList";

import { useCompanies } from "@/hooks/useCompanies";
import { sendRequest } from "@/lib/SendRequest";
import { Company, Destination } from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();

  const navItems = [
    { name: "Companies", link: "#companies" },
    { name: "Destinations", link: "#destinations" },
    { name: "Users", link: "#users" },
  ];

  const [selectedSection, setSelectedSection] = useState("Companies");
  const { data: rawCompanies = [], isLoading, error } = useCompanies();
  const companies: Company[] = rawCompanies.map((c: any) => ({
    id: c._id,
    name: c.name,
    description: c.description,
    contact: c.contact,
    profileImage: c.profileImage,
    averageRating: c.averageRating,
    tags: c.tags,
  }));

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(false);
  const [destinationsError, setDestinationsError] = useState<string | null>(null);

  const fetchDestinations = async () => {
    setLoadingDestinations(true);
    setDestinationsError(null);
    try {
      const response = await sendRequest.get("/destination");
      setDestinations(response.data.destinations);
    } catch (err: any) {
      setDestinationsError("Failed to load destinations.");
    } finally {
      setLoadingDestinations(false);
    }
  };

  const handleNavItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const name = e.currentTarget.textContent?.trim();
    if (!name) return;

    setSelectedSection(name);

    if (name === "Destinations") {
      fetchDestinations();
    }
  };

  return (
    <div className="relative w-full">
      <NavBarAdmin navItems={navItems} onItemClick={handleNavItemClick} />

      {selectedSection === "Destinations" ? (
        <DestinationList
          destinations={destinations}
          isLoading={loadingDestinations}
          error={destinationsError}
        />
      ) : (
        <CompanyList
          companies={companies}
          isLoading={isLoading}
          error={error?.message || null}
        />
      )}
    </div>
  );
}
