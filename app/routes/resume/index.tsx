import type { MetaFunction } from "@remix-run/node";
import { workExperiences, skills } from "./data";

export const meta: MetaFunction = () => ({
  title: "Resume",
});

interface SectionProps {
  header: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ header, children }) => (
  <>
    <h3 className="w-full bg-primary-blue p-2 text-center text-white">
      {header}
    </h3>
    <div className="p-5">{children}</div>
  </>
);

const Resume: React.FC = () => {
  return (
    <div id="resume" className="flex w-full flex-col">
      <div className="w-100 relative flex flex-col items-center justify-center pb-5">
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
          <div key={index} className="flex flex-col justify-between">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h4 className="underline underline-offset-4">{work.company}</h4>
                <p className="py-1 font-bold">{work.jobTitle}</p>
              </div>
              <i>{work.timePeriod}</i>
            </div>
            <div className="mb-5 flex flex-col">
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
        ))}
      </Section>
      <Section header="Skills">
        <div className="text-center">
          <p>{skills.join(" | ")}</p>
        </div>
      </Section>
    </div>
  );
};

export default Resume;
