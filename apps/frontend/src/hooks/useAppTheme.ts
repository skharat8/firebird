import { useMediaQuery } from "usehooks-ts";

import { useTheme } from "@/components/ThemeProvider";

function useAppTheme({
  lightModeVariable,
  darkModeVariable,
}: {
  lightModeVariable: string;
  darkModeVariable: string;
}) {
  const themeContext = useTheme(); // check app theme
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)"); // check system theme

  let variable;
  if (themeContext.theme === "dark") {
    variable = darkModeVariable;
  } else if (themeContext.theme === "light") {
    variable = lightModeVariable;
  } else {
    // If app theme is set to system, check the system theme
    variable = isDarkTheme ? darkModeVariable : lightModeVariable;
  }

  return variable;
}

export default useAppTheme;
