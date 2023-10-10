import { Theme } from "@/types/theme";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export type HeaderProps = {
  theme: Theme;
}

export const Header = ({ theme }: HeaderProps) => {
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
            href={href}
            className="text-xl transition-all border-b-2 cursor-pointer text-primary-blue border-b-solid border-b-transparent hover:border-b-primary-blue focus-visible:border-b-primary-blue"
          >
            {text}
          </Link>
        ))}
      </nav>
      <ThemeToggle theme={theme} />
    </header>
  );
};
