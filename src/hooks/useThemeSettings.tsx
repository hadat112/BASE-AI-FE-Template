"use client";

import { ThemeType } from "@/providers/ThemeProvider";
import { useEffect, useLayoutEffect, useState } from "react";

// Utility for safe client-side-only layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const THEME_STORAGE_KEY = "app-theme";

export function useThemeSettings({
  themeType,
  setTheme,
}: {
  themeType: ThemeType;
  setTheme: (theme: ThemeType) => void;
}) {
  const [mounted, setMounted] = useState(false);

  // Handle initialization and system preference only on client-side
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Only set theme based on system preference if no theme is saved in store
    const handleChange = (e: MediaQueryListEvent) => {
      // Check if localStorage has a theme value to avoid overriding user preference
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!savedTheme) {
        // Always default to dark theme regardless of system preference
        setTheme("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Use dark theme on first mount if no saved preference
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      setTheme("dark");
    }

    // Sync with current theme applied by the script
    // In case the script applied a theme that's different from what's in the store
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (
      currentTheme &&
      (currentTheme === "light" || currentTheme === "dark") &&
      currentTheme !== themeType
    ) {
      setTheme(currentTheme as "light" | "dark");
    }

    setMounted(true);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme, themeType]);

  // Apply theme to document and save to localStorage - client-side only
  useIsomorphicLayoutEffect(() => {
    if (mounted && typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", themeType);

      try {
        localStorage.setItem(THEME_STORAGE_KEY, themeType);
      } catch (e) {
        console.error("Failed to save theme to localStorage:", e);
      }
    }
  }, [themeType, mounted]);

  return {
    themeType,
    setTheme,
    mounted,
  };
}
