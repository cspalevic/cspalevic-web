import { Timeline } from "@/components/timeline";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Profile Picture */}
        <div className="h-28 w-28 rounded-full overflow-hidden mb-6 ring-2 ring-zinc-700">
          <CloudinaryImage
            path="me.jpg"
            alt="Charlie Spalevic"
            width={112}
            height={112}
            className="object-contain w-full h-full"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Charlie Spalevic
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-12">
          Engineer. Builder. Curious human trying to decode how the world works.
        </p>

        {/* Scroll CTA */}
        <div className="flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-sm tracking-widest uppercase">
            Scroll down to get a glimpse of my journey
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />
    </div>
  );
}
