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
  } from "@/components/ui/resizable-navbarAdmin";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  
  export default function NavBarAdmin({
    navItems,
    onItemClick,
  }: {
    navItems: { name: string; link: string }[];
    onItemClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }) {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    return (
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} onItemClick={onItemClick} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              onClick={() => router.push("/admin/createDestination")}
            >
              Create Destination
            </NavbarButton>
            <NavbarButton
              variant="primary"
              onClick={() => router.push("/admin/createCompany")}
            >
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
  
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  onItemClick(e);
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
    );
  }
  