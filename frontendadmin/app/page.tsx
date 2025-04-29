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

export default function NavbarDemo() {
  const router = useRouter();
  const navItems = [
    { name: "Companies", link: "#companies" },
    { name: "Destinations", link: "#destinations" },
    { name: "Users", link: "#users" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: companies = [], isLoading, error } = useCompanies();

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" onClick={() => router.push("/createDestination")}>
              Create Destination
            </NavbarButton>
            <NavbarButton variant="primary" onClick={() => router.push("/createCompany")}>
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
                onClick={() => setIsMobileMenuOpen(false)}
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

      <DummyContent companies={companies} isLoading={isLoading} error={error?.message || null} />
    </div>
  );
}

interface Company {
  id: number;
  name: string;
  description: string;
  profileImage: string;
}

interface DummyContentProps {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

export const DummyContent = ({ companies, isLoading, error }: DummyContentProps) => {
  return (
    <div className="container mx-auto p-8 pt-24">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {companies.length > 0 ? (
            companies.map((company: Company) => (
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
                  <h2 className="text-md text-neutral-600 dark:text-neutral-300">
                    Description: {company.description}
                  </h2>
                </div>
              </div>
            ))
          )
            : (
              <p className="text-center col-span-full text-neutral-500">No companies found.</p>
            )}
        </div>
      )}
    </div>
  );
};
