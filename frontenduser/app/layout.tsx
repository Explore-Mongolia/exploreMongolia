import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUserToDB from "@/components/SyncUserToDB";
import { UserProvider } from "@/lib/UserContext";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import AnimatedLayout from "@/components/AnimatedLayout";
import "leaflet/dist/leaflet.css";  


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explore Mongolia",
  description: "Discover Mongolia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <UserProvider>
            <SyncUserToDB />
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                classNames: {
                  toast: "rounded-xl shadow-lg px-4 py-3 font-medium",
                  success: "bg-green-600 text-white",
                  error: "bg-red-600 text-white",
                },
                style: {
                  borderRadius: "12px",
                  padding: "12px 16px",
                },
                duration: 3000,
              }}
            />
            <Providers>
              <AnimatedLayout>{children}</AnimatedLayout>
            </Providers>
          </UserProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
