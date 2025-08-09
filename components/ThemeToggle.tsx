"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";

  const changeTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <button aria-label="Change theme" onClick={changeTheme}>
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
