import type { IconType } from "~/components/icon";
import Error from "~/components/error";
import Icon from "~/components/icon";
import Image from "~/components/image";

export const ErrorBoundary = ({ error }) => <Error error={error} />;

interface Info {
  text: string;
  iconType: IconType;
}

const info: Info[] = [
  { text: "Chicago, IL", iconType: "place" },
  { text: "Illinois State University", iconType: "school" },
  { text: "Software Engineer, PayPal", iconType: "office" },
  { text: "hey@cspalevic.com", iconType: "email" },
];

const Index: React.FC = () => {
  return (
    <div className="flex h-full flex-col md:flex-row md:items-center md:justify-center">
      <div className="relative flex-row pb-10 pt-5">
        <Image
          path="me.jpg"
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
          {info.map(({ text, iconType }) => (
            <div key={text} className="flex flex-row items-center">
              <Icon type={iconType} />
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
