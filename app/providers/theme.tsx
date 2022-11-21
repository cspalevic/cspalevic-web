import { createContext, useContext, useState } from "react";

type Context = {
  isDarkMode: boolean;
  toggleTheme: Function;
};

const ThemeContext = createContext<Context | undefined>(undefined);

interface Props {
  theme?: Theme;
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === "dark");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    fetch("/actions/theme", {
      method: "POST",
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Context => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme() must be inside a Provider with a value");
  }
  return theme;
};

export default ThemeProvider;
