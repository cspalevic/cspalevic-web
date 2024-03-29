type WorkExperience = {
  company: string;
  jobTitle: string;
  timePeriod: string;
  summary: string;
  accomplishments?: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    company: "PayPal",
    jobTitle: "Software Engineer 2",
    timePeriod: "2021 - Present",
    summary:
      "Software Engineer working on core Checkout UI and experiences. Formerly a part of Global Pay Later (GPL) products. Contributor for frontend and backend applications. Worked with NIAB partners to design and implement new pages and experiences. Designed new GraphQL queries to support new features. Worked as a scrum master and improved processes to get new items to market faster.",
    accomplishments: [
      "Designed and implemented a system to suggest normalized addresses to buyers in order to improve address quality and confidence in address mailability.",
      "Created core components and foundational UI structure for a new GPL initiative - Pay Later to Go",
    ],
  },
  {
    company: "Spraying Systems",
    jobTitle: "Application Developer",
    timePeriod: "2019 - 2021",
    summary:
      "Coding and maintaining business applications, troubleshooting and solving software issues and bugs, and participating in an agile development environment including daily scrum, sprint planning, retrospectives, and performing peer code reviews.",
    accomplishments: [
      "Designed and implemented a .NET MVC application for processing new leads into the CRM system",
      "Assisted in a ReactJS application that displays information within CRM",
      "Created new assets, handled metadata for each asset, and detected duplicates in DAM by developing a DAM frontend and backend application to manage operations",
    ],
  },
  {
    company: "K-Rise Systems",
    jobTitle: "Application Developer",
    timePeriod: "2018 - 2019",
    summary:
      "Implemented features for a .NET development platform application. Developed and integrated web pages for client web applications. Built out SQL queries for data analysis and extraction.",
    accomplishments: [
      "Improved search performance by six seconds and provided users with suggestions and spellchecking via Apache Solr",
      "Integrated a quote feature for clients allowing quote requests and creation",
    ],
  },
  {
    company: "Innov8tek",
    jobTitle: "Web Development Intern",
    timePeriod: "2017 - 2018",
    summary:
      "Created unique and eye-catching websites using HTML, CSS, JavaScript, and PHP.",
    accomplishments: [
      "Revitalized a website for johnbielskilaw.com – a law firm.",
    ],
  },
  {
    company: "Illinois State University",
    jobTitle: "Research Assistant - Social Media Data Collection Program",
    timePeriod: "2016 - 2017",
    summary:
      "Built a job to scrape social media data to run semantic analysis. Utilized Twitter API, Google Maps API and Stanford CoreNLP API.",
  },
  {
    company: "Illinois State University",
    jobTitle: "Teaching Assistant",
    timePeriod: "2016 - 2017",
    summary:
      "Developed sample programs demonstrating good practice and well-structured code. Helped students with their programming assignments and projects.",
  },
];

export const skills: string[] = [
  "JavaScript",
  "ReactJS",
  "GraphQL",
  "Python",
  "C#",
  "SQL",
];
