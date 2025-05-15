"use client";

import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ProfileSkeleton } from "./_components/Skeleton";
import MainContent from "./_components/MainContent";
import SideBar from "./_components/SideBar";
import { useUserStore } from "@/store/userStore";
import { Pencil, ArrowLeft, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileDialog from "./_components/EditProfileDialog";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useUser(userId as string);
  const { mongoUserId } = useUserStore();
  const isOwner = mongoUserId === userId;
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState(user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  if (isLoading || !userData) return <ProfileSkeleton />;
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load user data.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2 group transition-all mb-4"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </Button>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-4 md:mt-0 space-y-4 md:space-y-0">
              <div className="flex flex-col items-center md:flex-row md:items-end md:space-x-4">
                <div className="relative shrink-0 w-32 h-32">
                  <img
                    src={userData.profileImage || "/default-profile.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  {isOwner && (
                    <button
                      onClick={() => setOpenDialog(true)}
                      className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <Pencil className="w-5 h-5 text-gray-700" />
                    </button>
                  )}
                </div>
                <div className="text-center md:text-left mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Member since{" "}
                    {new Date(userData.accountCreated).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="md:hidden flex justify-end">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition"
                >
                  {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <div className={`lg:block ${sidebarOpen ? "block" : "hidden"} md:block`}>
            <SideBar user={userData} editable={isOwner} />
          </div>

          <div className="lg:col-span-3">
            <MainContent user={userData} editable={isOwner} />
          </div>
        </div>

        <EditProfileDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          user={userData}
        />
      </div>
    </div>
  );
}
