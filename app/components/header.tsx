import { Link } from "@remix-run/react";
import { useTheme } from "~/providers/theme";
import Icon from "./icon";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <header className="flex min-h-[4rem] w-full flex-row items-center justify-between border-b border-b-neutral-300 dark:border-b-neutral-700">
      <nav className="flex items-center space-x-3">
        {[
          { href: "/", text: "Home" },
          { href: "/resume", text: "Resume" },
          { href: "/blog", text: "Blog" },
        ].map(({ href, text }) => (
          <Link
            key={href}
            to={href}
            className="text-primary-blue text-xl cursor-pointer transition-all border-b-solid border-b-transparent border-b-2 hover:border-b-primary-blue focus-visible:border-b-primary-blue"
          >
            {text}
          </Link>
        ))}
      </nav>
      <div className="flex items-center">
        <button aria-label="Change theme" onClick={() => theme?.toggleTheme()}>
          <Icon
            type={theme?.isDarkMode ? "sun" : "moon"}
            size="lg"
            className={
              theme?.isDarkMode
                ? "transition dark:hover:text-yellow-600"
                : "transition hover:text-gray-400"
            }
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
