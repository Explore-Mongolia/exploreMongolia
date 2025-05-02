"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanies } from "@/hooks/useCompanies";
import { sendRequest } from "@/lib/SendRequest";

interface Company {
  id: number;
  name: string;
  description: string;
  profileImage: string;
}

interface Destination {
  _id: string;
  name: string;
  description: string;
  cost: string;
  vibesAvailable: string[];
  image: string;
}

export default function NavbarDemo() {
  const router = useRouter();
  const navItems = [
    { name: "Companies", link: "#companies" },
    { name: "Destinations", link: "#destinations" },
    { name: "Users", link: "#users" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("Companies");

  const { data: companies = [], isLoading, error } = useCompanies();

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

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const name = e.currentTarget.textContent;
    if (!name) return;

    setSelectedSection(name);

    if (name === "Destinations") {
      fetchDestinations();
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={handleNavItemClick} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" onClick={() => router.push("/admin/createDestination")}>
              Create Destination
            </NavbarButton>
            <NavbarButton variant="primary" onClick={() => router.push("/admin/createCompany")}>
              Create Company
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNavItemClick(e);
                }}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/createDestination");
                }}
                variant="primary"
                className="w-full"
              >
                Create Destination
              </NavbarButton>
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/createCompany");
                }}
                variant="primary"
                className="w-full"
              >
                Create Company
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {selectedSection === "Destinations" ? (
        <DestinationContent
          destinations={destinations}
          isLoading={loadingDestinations}
          error={destinationsError}
        />
      ) : (
        <DummyContent companies={companies} isLoading={isLoading} error={error?.message || null} />
      )}
    </div>
  );
}

const DummyContent = ({
  companies,
  isLoading,
  error,
}: {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <div className="container mx-auto p-8 pt-24">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company.id}
                className="md:col-span-1 h-60 bg-neutral-100 dark:bg-neutral-800 flex flex-col p-4 rounded-lg shadow-sm relative"
              >
                {company.profileImage && (
                  <img
                    src={company.profileImage}
                    alt={`${company.name} logo`}
                    className="w-12 h-12 object-cover rounded-full absolute top-4 left-4 border border-neutral-300"
                  />
                )}
                <div className="mt-16 px-2">
                  <h2 className="text-xl font-medium">Company: {company.name}</h2>
                  <p className="text-md text-neutral-600 dark:text-neutral-300 line-clamp-2">
                    Description: {company.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-neutral-500">No companies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const DestinationContent = ({
  destinations,
  isLoading,
  error,
}: {
  destinations: Destination[];
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <div className="container mx-auto p-8 pt-24">
      {isLoading && <p>Loading destinations...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {destinations.length > 0 ? (
            destinations.map((destination) => (
              <div
                key={destination._id}
                className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow-sm flex flex-col"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-32 w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold">{destination.name}</h2>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {destination.description}
                </p>
                <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                  Cost: {destination.cost}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {destination.vibesAvailable.slice(0, 3).map((vibe, index) => (
                    <span
                      key={index}
                      className="bg-white dark:bg-neutral-700 text-xs text-neutral-800 dark:text-neutral-100 px-2 py-1 rounded-full"
                    >
                      {vibe}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-neutral-500">No destinations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

