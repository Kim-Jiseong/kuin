import { create } from "zustand";

interface UIState {
  isProfileModalOpen: boolean;
  isMarkdownTutorialOpen: boolean;
  isMobileMenuOpen: boolean;
  setProfileModalOpen: (isOpen: boolean) => void;
  setMarkdownTutorialOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProfileModalOpen: false,
  isMarkdownTutorialOpen: false,
  isMobileMenuOpen: false,
  setProfileModalOpen: (isOpen) => set({ isProfileModalOpen: isOpen }),
  setMarkdownTutorialOpen: (isOpen) => set({ isMarkdownTutorialOpen: isOpen }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));

