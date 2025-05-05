
import { create } from 'zustand';

type SectionStore = {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
};

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
}));