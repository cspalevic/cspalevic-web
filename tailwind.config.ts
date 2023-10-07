import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
import autoprefixer from "autoprefixer";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0078d4",
      },
    },
  },
  plugins: [autoprefixer() as unknown as PluginCreator],
};

export default config;
