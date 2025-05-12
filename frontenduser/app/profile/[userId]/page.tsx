"use client";

import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ProfileSkeleton } from "./_components/Skeleton";
import MainContent from "./_components/MainContent";
import SideBar from "./_components/SideBar";
import { useUserStore } from "@/store/userStore";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileDialog from "./_components/EditProfileDialog"

export default function ProfilePage() {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useUser(userId as string);
  const { mongoUserId } = useUserStore();
  const isOwner = mongoUserId === userId;

  const [openDialog, setOpenDialog] = useState(false);

  if (isLoading) return <ProfileSkeleton />;

  if (error || !user) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load user data.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <img
                  src={user.profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isOwner && (
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="absolute bottom-0 left-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Pencil className="w-5 h-5 text-gray-700" />
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">
                  Member since{" "}
                  {new Date(user.accountCreated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SideBar user={user} editable={isOwner} />
        <MainContent user={user} editable={isOwner} />
      </div>

      <EditProfileDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        user={user}
      />
    </div>
  );
}
