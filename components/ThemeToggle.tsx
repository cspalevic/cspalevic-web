"use client";

import { Theme } from "@/types/theme";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export type ThemeToggleProps = {
    theme: Theme;
}

export const ThemeToggle = ({ theme: _theme }: ThemeToggleProps) => {
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [theme, setTheme] = useState(_theme);
    const isDarkMode = theme === Theme.Dark;

    useEffect(() => {
        if(navigator.cookieEnabled) setShowThemeToggle(true);
    }, [])

    const toggleTheme = async () => {
        const response = await fetch("/api/theme", { method: "POST" });
        const json = await response.json();
        const updatedTheme = json.theme as Theme;
        if(updatedTheme === Theme.Dark) {
            document.body.parentElement?.classList.add("dark");
        } else {
            document.body.parentElement?.classList.remove("dark");
        }
        setTheme(updatedTheme);
    }

    if(!showThemeToggle) return null;
    return (
        <div className="flex items-center">
        <button aria-label="Change theme" onClick={() => toggleTheme()}>
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
    )
}