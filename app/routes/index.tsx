import Icon, { IconName } from "~/components/icon";
import Image from "~/components/image";
import Error from "~/components/error";

import type { FC } from "react";

export const ErrorBoundary = ({ error }) => <Error error={error} />;

const Index: FC = () => {
  return (
    <div className="flex h-full flex-col md:flex-row md:items-center md:justify-center">
      <div className="relative flex-row pb-10 pt-5">
        <Image
          filename="me.jpg"
          alt="Me, smiling in Hawaii"
          transformations={{
            crop: true,
            width: "325",
          }}
          className="max-w-325 h-auto w-[15rem] rounded-full border-2 border-sky-500"
          width="325"
          height="auto"
          loading="eager"
        />
        <div className="space-y-3 pt-5">
          {[
            { text: "Chicago, IL", iconName: IconName.Place },
            { text: "Illinois State University", iconName: IconName.School },
            { text: "Software Engineer, PayPal", iconName: IconName.Office },
            { text: "hey@cspalevic.com", iconName: IconName.Email },
          ].map(({ text, iconName }) => (
            <div key={text} className="flex flex-row items-center">
              <Icon as={iconName} />
              <span className="pl-3">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:ml-5 space-y-3">
        <p>
          Hey, I'm Charlie Spalevic. I'm a brother, son, friend, engineer and
          golf maniac.
        </p>
        <p>
          I'm another tech geek interested in web technologies, machine
          learning, 3d printing and trying to figure out how this crazy thing
          called the internet works.
        </p>
        <p>
          I've built this site so I can share my thoughts with the world and so
          the world can get a peak at who I am.
        </p>
        <p>Thanks for checking this out. Have a great day!</p>
      </div>
    </div>
  );
};

export default Index;
