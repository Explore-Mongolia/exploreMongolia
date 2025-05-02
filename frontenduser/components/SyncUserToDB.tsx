"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { sendRequest } from "@/lib/SendRequest";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function SyncUserToDB() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { setMongoUserId } = useUserStore();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        const role = user.publicMetadata?.role;

        if (role !== "admin") {
          const name =
            user.username ??
            `${user.firstName || ""} ${user.lastName || ""}`.trim();

          try {
            const response = await sendRequest.post(
              "/clerk-user/create",
              {
                name,
                email: user.primaryEmailAddress?.emailAddress,
              }
            );

            const mongoUserId = response.data.userId;
            setMongoUserId(mongoUserId);
            console.log(
              "User synced to DB successfully. MongoDB User ID:",
              mongoUserId
            );
          } catch (error) {
            console.error("Failed to sync user to DB", error);
          }
        } else {
          console.log("Admin detected. No need to sync to DB.");
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
}
