import { CloudinaryImage } from "@/components/cloudinary-image";
import { Timeline, type Milestone } from "@/components/timeline";

const milestones: Milestone[] = [
  // Hero section
  {
    component: (
      <div className="flex flex-col items-center justify-center text-center">
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
        <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
          Engineer. Builder. Curious human trying to decode how the world works.
        </p>
      </div>
    ),
  },

  // Timeline milestones
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
    lottie: "/lottie/trophy.json",
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
      "I'd been using ChatGPT to plan my workouts for months — typing in my lifts, asking for progressions, building programs manually. It worked, but it was clunky. I wanted something that actually knew me, remembered my history, and could coach me in real time. So I started building it.",
  },
  {
    lottie: "/lottie/sunrise.json",
    date: "Today",
    title: "Enjoying the ride. Awaiting the singularity.",
    description:
      "Life is good. I build things I care about, spend time with people I love, and watch the future arrive faster than anyone expected. The singularity is coming — I plan to be ready.",
  },
];

export default function HomePage() {
  return <Timeline milestones={milestones} />;
}
