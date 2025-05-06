"use client";

import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";

export default function ProfilePage() {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useUser(userId as string);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading user...</p>;

  if (error || !user)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load user data.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-6">
        <img
          src={user.profileImage || "/default-profile.png"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          {user.bio && <p className="text-sm text-gray-500 mt-2">{user.bio}</p>}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-gray-700 leading-relaxed">
          {user.about || "This user hasn't added any info yet."}
        </p>
      </div>
    </div>
  );
}
