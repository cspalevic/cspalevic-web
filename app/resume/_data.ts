type WorkExperience = {
  company: string;
  jobTitle: string;
  timePeriod: string;
  summary: string;
  accomplishments?: string[];
};

type PersonalInfo = {
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  summary: string;
  education: {
    degree: string;
    school: string;
    year: string;
  };
};

export const personalInfo: PersonalInfo = {
  name: "Charlie Spalevic",
  title: "Senior Software Engineer",
  location: "Chicago, IL",
  email: "charlie@spalevic.com",
  website: "spalevic.com",
  summary:
    "Senior Software Engineer with a proven record of delivering high-impact products and driving modernization of large-scale systems. Led key initiatives at PayPal including Pay Later virtual card launches, high-conversion A/B experiments, and the Quantum Leap rebuild of Checkout into a Next.js platform. Skilled in architecting scalable frontend and backend systems, enhancing observability with Datadog, and building AI-driven tools to accelerate debugging and analysis. Passionate about crafting seamless customer experiences, optimizing performance, and building solutions that scale globally.",
  education: {
    degree: "BS in Computer Science",
    school: "Illinois State University, Normal IL",
    year: "2017",
  },
};

export const workExperiences: WorkExperience[] = [
  {
    company: "PayPal",
    jobTitle: "Senior Software Engineer",
    timePeriod: "2021 - Present",
    summary:
      "Lead engineer on PayPal’s Global Pay Later and Checkout products, delivering end-to-end solutions across frontend, backend, experimentation, and observability. Played a founding role in the Quantum Leap program to modernize PayPal Checkout with Next.js.",
    accomplishments: [
      "Promoted to Senior Software Engineer for driving critical product and architecture initiatives across GPL and Checkout teams.",
      "Developed Pay Later Virtual Card application, including core UI components and backend service integrations.",
      "Designed and launched multiple high-impact A/B experiments to improve conversion and checkout performance.",
      "Founding member of Quantum Leap, leading early architecture, performance optimization, and component development for a complete Next.js rebuild of PayPal Checkout.",
      "Implemented observability best practices with Datadog Metrics and RUM to monitor performance, detect bottlenecks, and improve production reliability.",
      "Built AI-powered agents using Mastra to analyze and debug user sessions, reducing time-to-resolution for critical issues.",
    ],
  },
  {
    company: "Spraying Systems",
    jobTitle: "Application Developer",
    timePeriod: "2019 - 2021",
    summary:
      "Developed and maintained enterprise web applications, integrating CRM, DAM, and custom solutions to improve operational efficiency.",
    accomplishments: [
      "Designed and implemented a .NET MVC application for processing new leads into the CRM system, streamlining sales operations.",
      "Contributed to a ReactJS CRM dashboard to display and manage business-critical data.",
      "Developed DAM frontend/backend tools to manage metadata, detect duplicates, and maintain asset integrity.",
    ],
  },
  {
    company: "K-Rise Systems",
    jobTitle: "Application Developer",
    timePeriod: "2018 - 2019",
    summary:
      "Built and optimized features for a .NET development platform and client-facing applications.",
    accomplishments: [
      "Improved search performance by six seconds using Apache Solr, adding intelligent suggestions and spellchecking.",
      "Integrated a quote feature for clients, enabling faster and more accurate quote generation.",
    ],
  },
  {
    company: "Innov8tek",
    jobTitle: "Web Development Intern",
    timePeriod: "2017 - 2018",
    summary:
      "Developed responsive, client-focused websites using HTML, CSS, JavaScript, and PHP.",
    accomplishments: [
      "Redesigned johnbielskilaw.com for improved user experience and engagement.",
    ],
  },
  {
    company: "Illinois State University",
    jobTitle: "Research Assistant - Social Media Data Collection Program",
    timePeriod: "2016 - 2017",
    summary:
      "Created data pipelines to collect and analyze social media content for semantic analysis, leveraging Twitter API, Google Maps API, and Stanford CoreNLP.",
  },
  {
    company: "Illinois State University",
    jobTitle: "Teaching Assistant",
    timePeriod: "2016 - 2017",
    summary:
      "Developed example programs, assisted students with programming assignments, and provided mentorship in coding best practices.",
  },
];

export const skills: string[] = [
  "JavaScript / TypeScript",
  "ReactJS / Next.js",
  "GraphQL",
  "Node.js",
  "Python",
  "C# / .NET",
  "SQL",
  "Datadog (Metrics, RUM)",
  "A/B Experimentation",
  "AI Agent Development (Mastra)",
];
