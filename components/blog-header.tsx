import { parseAndFormat } from "@/lib/date";

interface BlogHeaderProps {
  title: string;
  date: string;
}

export function BlogHeader({ title, date }: BlogHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h1>
      <time className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {parseAndFormat(date)}
      </time>
    </header>
  );
}
