import type { Metadata } from "next";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { workExperiences, skills, personalInfo } from "./_data";

export const metadata: Metadata = {
  title: "Charlie Spalevic - Resume",
};

export default function Resume() {
  return (
    <div
      id="resume"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8"
    >
      {/* Header Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden">
              <CloudinaryImage
                path="me.jpg"
                alt="Me, smiling in Hawaii"
                transformations={{
                  cropMode: "crop",
                }}
                width={325}
                height={325}
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {personalInfo.title}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center justify-center gap-1">
                  📧 {personalInfo.email}
                </span>
                <span className="flex items-center justify-center gap-1">
                  📍 {personalInfo.location}
                </span>
                <span className="flex items-center justify-center gap-1">
                  🎓 {personalInfo.education.degree},{" "}
                  {personalInfo.education.year}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Professional Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
            <span>📝</span>
            Professional Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">
            {personalInfo.summary}
          </p>
        </CardContent>
      </Card>
      {/* Professional Experience */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
            <span>💼</span>
            Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="space-y-4 sm:space-y-6">
            {workExperiences.map((work, index) => (
              <div key={index} className="group">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                      <div className="space-y-1 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                          {work.company}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-foreground">
                          {work.jobTitle}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="w-fit self-start text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      >
                        {work.timePeriod}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {work.summary}
                  </p>
                  {work.accomplishments && (
                    <div className="mt-3">
                      <h4 className="text-xs sm:text-sm font-medium mb-2 text-foreground">
                        Key Accomplishments:
                      </h4>
                      <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        {work.accomplishments.map(
                          (accomplishment, accIndex) => (
                            <li
                              key={accIndex}
                              className="flex items-start gap-2"
                            >
                              <span className="text-primary mt-0.5 sm:mt-1 text-xs flex-shrink-0">
                                •
                              </span>
                              <span className="flex-1 leading-relaxed">
                                {accomplishment}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {index < workExperiences.length - 1 && (
                  <Separator className="my-4 sm:my-6" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Technical Skills */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
            <span>⚡</span>
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge
                key={skill}
                variant={
                  index % 3 === 0
                    ? "default"
                    : index % 3 === 1
                    ? "secondary"
                    : "outline"
                }
                className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 hover:scale-105 transition-transform cursor-default touch-manipulation"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
