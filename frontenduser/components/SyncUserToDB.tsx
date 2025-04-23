"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { sendRequest } from "@/lib/SendRequest";

export default function SyncUserToDB() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        console.log(user.username);
        
        const name =
          user.username ??
          `${user.firstName || ""} ${user.lastName || ""}`.trim();

          console.log(name);
          
        try {
          await sendRequest.post("/clerk-user/create", {
            name,
            email: user.primaryEmailAddress?.emailAddress,
          });
          console.log("User synced to DB successfully");
        } catch (error) {
          console.error("Failed to sync user to DB", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
}
