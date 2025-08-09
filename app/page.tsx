import type { IconType } from "@/components/Icon";
import { Icon } from "@/components/Icon";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WebGPUEarth from "@/components/web-gpu-earth";

type Info = {
  text: string;
  iconType: IconType;
};

const info: Info[] = [
  { text: "Chicago, IL", iconType: "place" },
  { text: "Illinois State University", iconType: "school" },
  { text: "Software Engineer, PayPal", iconType: "office" },
  { text: "hey@cspalevic.com", iconType: "email" },
];

export default function HomePage() {
  return (
    <div className="relative">
      <WebGPUEarth />
      <div className="relative z-10 flex h-full flex-col md:flex-row md:items-center md:justify-center">
        <div className="relative flex-row pb-10 pt-5">
          <Avatar className="w-[15rem] h-[15rem] border-2 border-sky-500">
            <AvatarImage asChild>
              <CloudinaryImage
                path="me.jpg"
                alt="Me, smiling in Hawaii"
                transformations={{
                  cropMode: "crop",
                }}
                width={325}
                height={325}
              />
            </AvatarImage>
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
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
            {`Hey, I'm Charlie Spalevic. I'm a brother, son, friend, engineer and
          golf maniac.`}
          </p>
          <p>
            {`I'm another tech geek interested in web technologies, machine
          learning, 3d printing and trying to figure out how this crazy thing
          called the internet works.`}
          </p>
          <p>
            {`I've built this site so I can share my thoughts with the world and so
          the world can get a peak at who I am.`}
          </p>
          <p>Thanks for checking this out. Have a great day!</p>
        </div>
      </div>
    </div>
  );
}
