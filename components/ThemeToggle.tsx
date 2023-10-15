"use client";

import { toggleTheme } from "@/lib/theme/toggle";
import { Theme } from "@/types/theme";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export type ThemeToggleProps = {
  theme: Theme;
};

export const ThemeToggle = ({
  theme: serverDetectedTheme,
}: ThemeToggleProps) => {
  const [showToggle, setShowToggle] = useState(false);
  const [theme, setTheme] = useState(serverDetectedTheme);

  const isDarkMode = theme === Theme.Dark;

  const changeTheme = () => {
    const toggledTheme = toggleTheme();
    if (toggledTheme === Theme.Dark)
      document.body.parentElement?.classList.add("dark");
    else document.body.parentElement?.classList.remove("dark");
    setTheme(toggledTheme);
  };

  useEffect(() => {
    if (navigator.cookieEnabled) setShowToggle(true);
  }, []);

  if (!showToggle) return null;
  return (
    <div className="flex items-center">
      <button aria-label="Change theme" onClick={() => changeTheme()}>
        <Icon
          type={isDarkMode ? "sun" : "moon"}
          size="lg"
          className={
            isDarkMode
              ? "transition dark:hover:text-yellow-600"
              : "transition hover:text-gray-400"
          }
        />
      </button>
    </div>
  );
};
