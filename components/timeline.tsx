"use client";

import { useState } from "react";

const milestones = [
  {
    date: "May 27, 1995",
    title: "Born",
    description: "",
  },
  {
    date: "2013",
    title: "Started at Illinois State University",
    description:
      "Began as a Computer Science major — never having written a single line of code before.",
  },
  {
    date: "December 2013",
    title: "Failed my first CS class",
    description: "A wake up call.",
  },
  {
    date: "January 2014",
    title: "Locked in",
    description:
      "Realized I actually liked coding — and it was fun.",
  },
  {
    date: "2016",
    title: "Teaching & Research Assistant",
    description:
      "Took a job as Teaching Assistant, which led to a Research Assistant role.",
  },
  {
    date: "2017",
    title: "First web projects",
    description: "Started building WordPress and PHP sites.",
  },
  {
    date: "December 2017",
    title: "Graduated",
    description: "Graduated from Illinois State University.",
  },
  {
    date: "January 2018",
    title: "Co-founded a startup",
    description: "Learned a lot. Fast.",
  },
  {
    date: "April 2018",
    title: "Joined K-Rise Systems",
    description:
      "Realized I had no idea what I was doing and needed income. Joined K-Rise Systems as first full-time engineering job.",
  },
  {
    date: "January 2019",
    title: "Spraying Systems Co.",
    description: "Moved to Spraying Systems Co. as a Software Engineer.",
  },
  {
    date: "April 2021",
    title: "Joined PayPal",
    description: "Joined PayPal as a Software Engineer.",
  },
  {
    date: "2025",
    title: "Released Chavo",
    description:
      "Released Chavo on the App Store. An AI-powered fitness app built entirely on my own.",
  },
];

export function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-12">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

      <div className="space-y-8 md:space-y-12">
        {milestones.map((milestone, index) => {
          const isExpanded = expandedIndex === index;
          const isLeft = index % 2 === 0;
          const hasDescription = milestone.description.length > 0;

          return (
            <div
              key={index}
              className={`relative flex items-start ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div
                className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2"
                style={{ top: "0.35rem" }}
              >
                <button
                  onClick={() => hasDescription && toggle(index)}
                  className={`h-3.5 w-3.5 rounded-full border-2 border-foreground/40 transition-colors ${
                    isExpanded
                      ? "bg-foreground"
                      : "bg-background hover:bg-foreground/20"
                  } ${hasDescription ? "cursor-pointer" : "cursor-default"}`}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:mr-auto md:pr-4 md:text-right" : "md:ml-auto md:pl-4 md:text-left"
                }`}
              >
                <button
                  onClick={() => hasDescription && toggle(index)}
                  className={`w-full text-left ${isLeft ? "md:text-right" : "md:text-left"} ${
                    hasDescription ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {milestone.date}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                </button>

                {hasDescription && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p
                      className={`text-sm text-muted-foreground ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      {milestone.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
