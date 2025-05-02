
import { create } from "zustand";

type UserState = {
  mongoUserId: string | null;
  setMongoUserId: (id: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  mongoUserId: null,
  setMongoUserId: (id) => set({ mongoUserId: id }),
}));
