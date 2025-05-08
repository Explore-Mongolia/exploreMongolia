"use client";

import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import { ProfileSkeleton } from "./_components/Skeleton";
import MainContent from "./_components/MainContent";
import SideBar from "./_components/SideBar";

export default function ProfilePage() {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useUser(userId as string);

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
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {/* Cover photo placeholder */}
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <img
                  src={user.profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h1>
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
        <SideBar user={user} />
        <MainContent user={user} />
      </div>
    </div>
  );
}
