import Link from "next/link";

export const Header = () => {
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
            className="text-primary-blue text-xl cursor-pointer transition-all border-b-solid border-b-transparent border-b-2 hover:border-b-primary-blue focus-visible:border-b-primary-blue"
          >
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
};
