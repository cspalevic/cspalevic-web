import { CloudinaryImage } from "@/components/cloudinary-image";
import { WebGPUFeatures } from "./_components/web-gpu-features";

function StyledLink({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-4 hover:no-underline"
    >
      {text}
    </a>
  );
}

export default function HomePage() {
  return (
    <>
      <WebGPUFeatures />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <article className="space-y-6 text-base leading-relaxed text-secondary-foreground">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <CloudinaryImage
                path="me.jpg"
                alt="Charlie Spalevic"
                width={160}
                height={160}
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">About</h1>
          </div>

          <p>
            Hello, I'm Charlie Spalevic - a senior software engineer based in
            Chicago with about a decade of experience. I consider myself as a
            generalist. I'm equally interested in building web apps, mobile
            apps, and AI agents.
          </p>

          <p>
            I studied Computer Science at{" "}
            <StyledLink
              text="Illinois State University"
              href="https://illinoisstate.edu"
            />
            , where I also worked as a TA and as a research assistant on a
            social media data collection program. I built pipelines around the
            Twitter API, Google Maps API, and Stanford CoreNLP for semantic
            analysis.
          </p>

          <p>
            After college I took a swing at starting my own company. It didn't
            quite work, and I also quickly realized I didn't really know what I
            was doing yet. I decided I needed real-world experience before I
            could build something meaningful on my own.
          </p>

          <p>
            I gained a ton of experience at a manufacturing company called{" "}
            <StyledLink text="Spraying Systems" href="https://www.spray.com" />.
            It was a small team that shipped a ton of software around internal
            DAM, ERP and CRM systems. I worked with .NET, Azure, and SQL Server.
          </p>

          <p>
            From there I joined{" "}
            <StyledLink text="PayPal" href="https://www.paypal.com" />, where
            I'm now a Senior Software Engineer on Checkout. I started on the
            Global Pay Later team building virtual card experiences. Then moved
            to Checkout and grew into lead roles on some of its larger
            initiatives. I helped modernize PayPal Checkout onto Next.js — a
            surface that handles millions of transactions globally. Along the
            way I've spent a lot of time on A/B experimentation, performance,
            observability with Datadog, and more recently building AI-powered
            agents that analyze and debug user sessions to cut down
            time-to-resolution on production issues.
          </p>

          <p>
            Outside of my day job I've been working on{" "}
            <StyledLink text="Chavo" href="https://chavo.app/" />. The basic
            idea is to have a personal trainer in my pocket. Previously, I would
            have Claude/ChatGPT to build my workout plans and I wanted to have
            an all-in-one app to help build, track and analyze my workouts.
          </p>

          <p>
            Outside of code, I spend a lot of my time on health and fitness,
            following sports, reading, and tinkering with whatever new tool or
            idea has my attention that week.
          </p>
        </article>
      </div>
    </>
  );
}
