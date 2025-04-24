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

import HomeSection from "@/app/home/HomeSection";
import ExperienceSection from "@/app/experience/ExperienceSection";
import TravelSection from "@/app/travel/TravelSection";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#Home" },
    { name: "Experience", link: "#Experience" },
    { name: "Travel", link: "#Travel" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
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

      <div className="pt-24">
        <HomeSection />
        <ExperienceSection />
        <TravelSection />
      </div>
    </div>
  );
}
