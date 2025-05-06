"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { useUserStore } from "@/store/userStore";

export default function SyncUserToDB() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { setMongoUserId } = useUserStore();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user && isLoaded) {
        const role = user.publicMetadata?.role;


        if (role !== "admin") {
          const name =
            user.username ??
            `${user.firstName || ""} ${user.lastName || ""}`.trim();

          const profileImage = user.imageUrl || "/default-profile.png"; 
          const email = user.primaryEmailAddress?.emailAddress;
          if (!email) {
            console.error("No email found for the user");
            return;
          }

          try {
            const response = await sendRequest.post("/clerk-user/create", {
              name,
              email,
              profileImage,
            });

            const mongoUserId = response.data.userId;
            setMongoUserId(mongoUserId);

            console.log("User synced to DB successfully. MongoDB User ID:", mongoUserId);
          } catch (error) {
            console.error("Failed to sync user to DB", error);
          }
        } else {
          console.log("Admin detected. No need to sync to DB.");
        }
      }
    };

    syncUser();
  }, [isSignedIn, user, isLoaded, setMongoUserId]);

  return null; 
}
