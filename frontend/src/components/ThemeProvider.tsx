import { createContext, useContext, useEffect, useMemo } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeContext = createContext(initialState);

function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage("ui-theme", defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    if (typeof theme === "string") root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      // NO_LINT
      // @ts-expect-error Value type is correct
      value={useMemo(() => ({ theme, setTheme }), [theme, setTheme])}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTheme was used outside of ThemeProvider");

  return context;
}

// NO_LINT
// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, useTheme };
