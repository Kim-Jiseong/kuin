import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";
import type { Tables } from "@/types/database.types";

interface AuthState {
  user: User | null;
  profile: Tables<"profile"> | null;
  projectList: Tables<"project">[] | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Tables<"profile"> | null) => void;
  setProjectList: (projects: Tables<"project">[] | null) => void;
  setIsLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      projectList: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setProjectList: (projectList) => set({ projectList }),
      setIsLoading: (isLoading) => set({ isLoading }),
      clearAuth: () => set({ user: null, profile: null, projectList: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user ? { id: state.user.id, email: state.user.email } : null,
      }),
    }
  )
);

