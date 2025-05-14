"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExperienceSection from "@/components/ExperienceSection";
import TripSection from "@/components/TripSection";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", key: "home" },
    { name: "Experience", key: "experience" },
    { name: "Destination", key: "trip" },
  ];

  const [activeSection, setActiveSection] = useState<null | string>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      // case "home":
      //   return <HomeSection />;
      case "experience":
        return <ExperienceSection />;
      case "trip":
        return <TripSection />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems.map(({ name, key }) => ({
              name,
              link: "#",
              onClick: () => {
                setActiveSection(key);
              },
            }))}
            className="cursor-pointer"
          />

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <NavbarButton variant="secondary">Login</NavbarButton>
              </SignInButton>
              <SignUpButton>
                <NavbarButton variant="primary">Sign-Up</NavbarButton>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
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

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map(({ name, key }, idx) => (
              <button
                key={`mobile-link-${idx}`}
                onClick={() => {
                  setActiveSection(key);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-left text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{name}</span>
              </button>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <NavbarButton variant="secondary" className="w-full">
                    Login
                  </NavbarButton>
                </SignInButton>
                <SignUpButton mode="modal">
                  <NavbarButton variant="primary" className="w-full">
                    Sign-Up
                  </NavbarButton>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="w-full flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="pt-8">
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {renderSection()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
