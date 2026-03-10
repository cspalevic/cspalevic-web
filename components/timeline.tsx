"use client";

import { useEffect, useRef } from "react";

const milestones = [
  {
    emoji: "🍼",
    date: "May 27, 1995",
    title: "Hello, World.",
    description:
      "Born and raised in the Midwest. The beginning of a story I had no idea I was writing.",
  },
  {
    emoji: "🎓",
    date: "2013",
    title: "A CS major who had never written code.",
    description:
      "Enrolled at Illinois State University as a Computer Science major — despite having zero coding experience. What could go wrong?",
  },
  {
    emoji: "💥",
    date: "December 2013",
    title: "I failed my first CS class.",
    description:
      "Turns out, showing up and hoping for the best is not a strategy. This was the moment I realized I actually had to try.",
  },
  {
    emoji: "🔥",
    date: "January 2014",
    title: "Wait... this is actually fun.",
    description:
      "Something clicked. I started coding for hours, not because I had to, but because I wanted to. It stopped feeling like work.",
  },
  {
    emoji: "📚",
    date: "2016",
    title: "From student to TA.",
    description:
      "Took a job as a Teaching Assistant, which led to a Research Assistant role. Teaching others turned out to be one of the best ways to learn.",
  },
  {
    emoji: "🌐",
    date: "2017",
    title: "WordPress, PHP, and figuring it out.",
    description:
      "Started building real websites for real people. Scrappy, messy, and exactly what I needed.",
  },
  {
    emoji: "🎉",
    date: "December 2017",
    title: "I made it.",
    description:
      "Graduated from Illinois State University with a degree in Computer Science. Four years, a lot of late nights, and one failed class.",
  },
  {
    emoji: "🚀",
    date: "January 2018",
    title: "The startup attempt.",
    description:
      "Co-founded a startup right out of college. Learned a lot. Fast.",
  },
  {
    emoji: "💼",
    date: "April 2018",
    title: "Time to get a real job.",
    description:
      "Realized I had no idea what I was doing and needed income. Joined K-Rise Systems as my first full-time engineering job.",
  },
  {
    emoji: "🏭",
    date: "January 2019",
    title: "Spraying Systems Co.",
    description:
      "Moved to Spraying Systems Co. as a Software Engineer. Kept learning, kept building.",
  },
  {
    emoji: "💳",
    date: "April 2021",
    title: "Joined PayPal.",
    description:
      "Joined PayPal as a Software Engineer. Big company, big scale, big lessons.",
  },
  {
    emoji: "🤖",
    date: "2025",
    title: "Released Chavo.",
    description:
      "Released Chavo on the App Store. An AI-powered fitness app built entirely on my own.",
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-10");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isAlt = index % 2 === 1;

  return (
    <section
      ref={ref}
      className={`flex flex-col items-center justify-center px-6 py-24 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out ${
        isAlt ? "bg-zinc-900" : "bg-black"
      }`}
    >
      <span className="text-[6rem] leading-none mb-6 animate-bounce-slow">
        {milestone.emoji}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
        {milestone.date}
      </span>
      <h3 className="text-2xl font-bold text-white mb-3 max-w-xl">
        {milestone.title}
      </h3>
      <p className="text-zinc-400 max-w-lg leading-relaxed">
        {milestone.description}
      </p>
    </section>
  );
}

export function Timeline() {
  return (
    <div>
      {milestones.map((milestone, index) => (
        <MilestoneCard key={index} milestone={milestone} index={index} />
      ))}
    </div>
  );
}
