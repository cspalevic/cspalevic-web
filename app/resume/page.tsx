import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { workExperiences, skills } from "./data";

export const metadata: Metadata = {
  title: "Charlie Spalevic - Resume",
};

interface SectionProps {
  header: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ header, children }) => (
  <Card className="w-full">
    <CardHeader className="bg-primary-blue text-white">
      <CardTitle className="text-center">{header}</CardTitle>
    </CardHeader>
    <CardContent className="p-5">{children}</CardContent>
  </Card>
);

export default function Resume() {
  return (
    <div id="resume" className="flex w-full flex-col space-y-6">
      <div className="flex flex-col items-center justify-center pb-5 text-center">
        <h1>Charlie Spalevic</h1>
        <h3>Chicago, IL</h3>
      </div>
      <Section header="Summary">
        <p>
          Distinguished Software Engineer who excels at coding, testing, and
          troubleshooting. Scrum lead that pushes for best practices and team
          collaboration. Team player who is always willing to help guide
          teammates to solve their problems and provide clean coding solutions.
          Interested in building amazing customer experiences and designing
          architectural solutions that scale.
        </p>
      </Section>
      <Section header="Education">
        <div className="flex flex-col items-center justify-center">
          <b>BS in Computer Science</b>
          <p>Illinois State University, Normal IL (2017)</p>
        </div>
      </Section>
      <Section header="Work Experience">
        {workExperiences.map((work, index) => (
          <div key={index}>
            <div className="flex flex-col justify-between">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h4 className="underline underline-offset-4">
                    {work.company}
                  </h4>
                  <p className="py-1 font-bold">{work.jobTitle}</p>
                </div>
                <i>{work.timePeriod}</i>
              </div>
              <div className="flex flex-col">
                <p>{work.summary}</p>
                {work.accomplishments && (
                  <ul className="mb-0 pb-0">
                    {work.accomplishments.map((accomplishment, index) => (
                      <li key={index}>{accomplishment}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {index < workExperiences.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </Section>
      <Section header="Skills">
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </Section>
    </div>
  );
}
