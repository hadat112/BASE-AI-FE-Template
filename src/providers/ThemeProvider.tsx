import { useThemeSettings } from "@/hooks/useThemeSettings";
import { createContext, ReactNode, useContext, useState } from "react";

export type ThemeType = "light" | "dark";

type ThemeContextType = {
  themeType: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeType, setThemeType] = useState<ThemeType>("light");

  useThemeSettings({
    themeType,
    setTheme: (theme: ThemeType) => setThemeType(theme as ThemeType),
  });

  return (
    <ThemeContext.Provider
      value={{
        themeType,
        setTheme: setThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
