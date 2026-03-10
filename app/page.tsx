import { Timeline } from "@/components/timeline";
import { Github, Twitter, FileText } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Charlie Spalevic
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-6">
          Engineer. Builder. Curious human trying to decode how the world works.
        </p>
        <p className="text-sm md:text-base text-zinc-500 max-w-lg mb-12 leading-relaxed">
          Scroll through my journey — from a kid who had never written a line of
          code to shipping an AI-powered fitness app used by real people.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/cspalevic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/cspalevic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <Link
            href="/resume"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Resume"
          >
            <FileText className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
}
