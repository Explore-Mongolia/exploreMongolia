"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

type UserContextType = {
  userId: string | null;
  email: string | null;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  email: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  const userId = isLoaded && user ? user.id : null;
  const email = isLoaded && user ? user.primaryEmailAddress?.emailAddress ?? null : null;

  return (
    <UserContext.Provider value={{ userId, email }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
