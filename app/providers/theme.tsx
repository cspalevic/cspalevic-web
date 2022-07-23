import { createContext, useContext, useState } from "react";
import { THEME_COOKIE, setCookie } from "~/utils/cookies";
import { Theme } from "~/models/session/types";

import type { FC, ReactNode } from "react";

type Context = {
  value: Theme;
  toggleTheme: Function;
};

const ThemeContext = createContext<Context | undefined>(undefined);

interface Props {
  theme?: Theme;
  children: ReactNode;
}

const getDefaultValue = (theme?: Theme) =>
  theme === Theme.Dark ? Theme.Dark : Theme.Light;

const ThemeProvider: FC<Props> = ({ theme, children }) => {
  const [value, setValue] = useState(getDefaultValue(theme));

  const toggleTheme = () => {
    const newTheme = value === Theme.Dark ? Theme.Light : Theme.Dark;
    setCookie(THEME_COOKIE, newTheme);
    setValue(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ value, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Context => {
  const theme = useContext<Context>(ThemeContext);
  return theme;
};

export default ThemeProvider;
