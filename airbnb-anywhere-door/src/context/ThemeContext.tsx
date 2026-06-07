"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";
type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  resetToSystem: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  isSystemTheme: true,
  resetToSystem: () => {},
  themeMode: "system",
  setThemeMode: () => {},
});

const STORAGE_KEY = "airbnb-theme-preference";

/**
 * Reads the effective theme from localStorage + system preference.
 * Returns { theme, isSystem }.
 * Safe to call server-side (returns dark defaults).
 */
function resolveInitialTheme(): { theme: Theme; isSystem: boolean } {
  if (typeof window === "undefined") return { theme: "dark", isSystem: true };

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") {
      return { theme: saved, isSystem: false };
    }
  } catch {
    // localStorage blocked
  }

  // Fall back to system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return { theme: prefersDark ? "dark" : "light", isSystem: true };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Apply theme attribute to <html>
  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  // On mount: resolve initial theme
  useEffect(() => {
    const { theme: initial, isSystem } = resolveInitialTheme();
    setTheme(initial);
    setIsSystemTheme(isSystem);
    applyTheme(initial);
    setMounted(true);
  }, [applyTheme]);

  // Listen to OS theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const systemTheme: Theme = e.matches ? "dark" : "light";
        setTheme(systemTheme);
        setIsSystemTheme(true);
        applyTheme(systemTheme);
      }
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      setIsSystemTheme(false);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, [applyTheme]);

  const resetToSystem = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme: Theme = prefersDark ? "dark" : "light";
    setTheme(systemTheme);
    setIsSystemTheme(true);
    applyTheme(systemTheme);
  }, [applyTheme]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    if (mode === "system") {
      resetToSystem();
    } else {
      setTheme(mode);
      setIsSystemTheme(false);
      applyTheme(mode);
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // ignore
      }
    }
  }, [applyTheme, resetToSystem]);

  // Prevent rendering children until theme is resolved
  if (!mounted) return null;

  const themeMode: ThemeMode = isSystemTheme ? "system" : theme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isSystemTheme, resetToSystem, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
