"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

type Milestone = {
  lottie?: string;   // path to /public/lottie/*.json
  emoji?: string;    // fallback emoji
  image?: string;    // for Chavo — actual app icon
  date: string;
  title: string;
  description: string;
};

const milestones: Milestone[] = [
  {
    lottie: "/lottie/born.json",
    date: "May 27, 1995",
    title: "Hello, World.",
    description:
      "Born and raised in the Midwest. The beginning of a story I had no idea I was writing.",
  },
  {
    lottie: "/lottie/graduation.json",
    date: "2013",
    title: "A CS major who had never written code.",
    description:
      "Enrolled at Illinois State University as a Computer Science major — despite having zero coding experience. What could go wrong?",
  },
  {
    lottie: "/lottie/collision.json",
    date: "December 2013",
    title: "I failed my first CS class.",
    description:
      "Turns out, showing up and hoping for the best is not a strategy. This was the moment I realized I actually had to try.",
  },
  {
    lottie: "/lottie/fire.json",
    date: "January 2014",
    title: "Wait... this is actually fun.",
    description:
      "Something clicked. I started coding for hours, not because I had to, but because I wanted to. It stopped feeling like work.",
  },
  {
    lottie: "/lottie/books.json",
    date: "2016",
    title: "From student to TA.",
    description:
      "Took a job as a Teaching Assistant, which led to a Research Assistant role. Teaching others turned out to be one of the best ways to learn.",
  },
  {
    lottie: "/lottie/globe.json",
    date: "2017",
    title: "WordPress, PHP, and figuring it out.",
    description:
      "Started building real websites for real people. Scrappy, messy, and exactly what I needed.",
  },
  {
    lottie: "/lottie/party.json",
    date: "December 2017",
    title: "I made it.",
    description:
      "Graduated from Illinois State University with a degree in Computer Science. Four years, a lot of late nights, and one failed class.",
  },
  {
    lottie: "/lottie/rocket.json",
    date: "January 2018",
    title: "The startup attempt.",
    description:
      "Co-founded a startup right out of college. Learned a lot. Fast.",
  },
  {
    lottie: "/lottie/briefcase.json",
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
    lottie: "/lottie/paypal.json",
    date: "April 2021",
    title: "Joined PayPal.",
    description:
      "Joined PayPal as a Software Engineer. Big company, big scale, big lessons.",
  },
  {
    image: "/chavo-icon.jpg",
    date: "2025",
    title: "Released Chavo.",
    description:
      "I'd been using ChatGPT to plan my workouts for months — typing in my lifts, asking for progressions, building programs manually. It worked, but it was clunky. I wanted something that actually knew me, remembered my history, and could coach me in real time. So I started building it. Chavo is an AI-powered fitness app on the App Store — adaptive workouts, intelligent coaching, and a community. Built entirely on my own. This one means everything.",
  },
  {
    lottie: "/lottie/sunrise.json",
    date: "Today",
    title: "Enjoying the ride. Awaiting the singularity.",
    description:
      "Life is good. I build things I care about, spend time with people I love, and watch the future arrive faster than anyone expected. The singularity is coming — I plan to be ready.",
  },
];

function MilestoneIcon({ milestone }: { milestone: Milestone }) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!milestone.lottie) return;
    fetch(milestone.lottie)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [milestone.lottie]);

  if (milestone.image) {
    return (
      <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <Image
          src={milestone.image}
          alt="Chavo app icon"
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (milestone.lottie && animationData) {
    return (
      <div className="w-32 h-32 mb-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    );
  }

  // Emoji fallback (also shown while Lottie loads)
  return (
    <span className="text-[6rem] leading-none mb-6 animate-bounce-slow block">
      {milestone.emoji ?? "⭐"}
    </span>
  );
}

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isAlt = index % 2 === 1;

  return (
    <section
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.92) translateY(40px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
      className={`flex flex-col items-center justify-center px-6 py-24 text-center ${
        isAlt ? "bg-zinc-900" : "bg-black"
      }`}
    >
      <MilestoneIcon milestone={milestone} />
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
