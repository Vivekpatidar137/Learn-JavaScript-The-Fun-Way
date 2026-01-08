// lib/store.js
// Zustand store for managing user progress and preferences
// This keeps track of which concepts users have completed

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Main store for the application
export const useAppStore = create(
  persist(
    (set, get) => ({
      // ===== STATE =====

      // Completed concepts (array of concept slugs)
      completedConcepts: [],

      // Bookmarked concepts (array of concept slugs)
      bookmarkedConcepts: [],

      // User preferences
      preferences: {
        theme: "dark", // 'light' or 'dark'
        showHints: true,
        soundEnabled: false,
      },

      // Current learning path
      currentPath: null, // 'beginner', 'intermediate', 'advanced'

      // Time spent on each concept (object: { slug: minutes })
      timeSpent: {},

      // ===== ACTIONS =====

      // Mark a concept as completed
      completeConcept: (slug) => {
        set((state) => {
          const isAlreadyCompleted = state.completedConcepts.includes(slug);
          return {
            completedConcepts: isAlreadyCompleted
              ? state.completedConcepts.filter((s) => s !== slug)
              : [...state.completedConcepts, slug],
          };
        });
      },

      // Remove concept from completed
      uncompleteConcept: (slug) => {
        set((state) => ({
          completedConcepts: state.completedConcepts.filter((s) => s !== slug),
        }));
      },

      // Toggle bookmark
      toggleBookmark: (slug) => {
        set((state) => ({
          bookmarkedConcepts: state.bookmarkedConcepts.includes(slug)
            ? state.bookmarkedConcepts.filter((s) => s !== slug)
            : [...state.bookmarkedConcepts, slug],
        }));
      },

      // Update preferences
      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      // Set learning path
      setLearningPath: (path) => {
        set({ currentPath: path });
      },

      // Track time spent on a concept
      addTimeSpent: (slug, minutes) => {
        set((state) => ({
          timeSpent: {
            ...state.timeSpent,
            [slug]: (state.timeSpent[slug] || 0) + minutes,
          },
        }));
      },

      // Reset all progress
      resetProgress: () => {
        set({
          completedConcepts: [],
          bookmarkedConcepts: [],
          timeSpent: {},
          currentPath: null,
        });
      },

      // ===== COMPUTED VALUES / GETTERS =====

      // Check if concept is completed
      isConceptCompleted: (slug) => {
        return get().completedConcepts.includes(slug);
      },

      // Check if concept is bookmarked
      isConceptBookmarked: (slug) => {
        return get().bookmarkedConcepts.includes(slug);
      },

      // Get completion percentage (0-100)
      getCompletionPercentage: (totalConcepts) => {
        const completed = get().completedConcepts.length;
        return totalConcepts > 0
          ? Math.round((completed / totalConcepts) * 100)
          : 0;
      },

      // Get total time spent (in minutes)
      getTotalTimeSpent: () => {
        const timeSpent = get().timeSpent;
        return Object.values(timeSpent).reduce((sum, time) => sum + time, 0);
      },
    }),
    {
      name: "learn-js-storage", // localStorage key
      // Only persist these fields (not computed values)
      partialize: (state) => ({
        completedConcepts: state.completedConcepts,
        bookmarkedConcepts: state.bookmarkedConcepts,
        preferences: state.preferences,
        currentPath: state.currentPath,
        timeSpent: state.timeSpent,
      }),
    }
  )
);

// Example usage in components:
//
// import { useAppStore } from '@/lib/store'
//
// function MyComponent() {
//   const completedConcepts = useAppStore(state => state.completedConcepts)
//   const completeConcept = useAppStore(state => state.completeConcept)
//   const isCompleted = useAppStore(state => state.isConceptCompleted('closures'))
//
//   return (
//     <button onClick={() => completeConcept('closures')}>
//       Mark as Complete
//     </button>
//   )
// }
