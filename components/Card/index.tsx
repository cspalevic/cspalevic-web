import { CloudinaryImage } from "@/components/CloudinaryImage";
import Link from "next/link";

type CardProps = {
  to: string;
  imagePath: string;
  alt: string;
  title: string;
  subTitle: string;
};

export const Card = ({ to, imagePath, alt, title, subTitle }: CardProps) => (
  <Link href={to} className="group flex flex-col max-w-[450px]">
    <CloudinaryImage
      path={imagePath}
      alt={alt}
      className="bg-gray-200 border-2 border-gray-200 rounded group-hover:border-primary-blue"
      width={450}
      height={450}
    />
    <div className="card-body flex flex-col p-1 space-y-1 border-2 border-transparent group-focus-visible:border-primary-blue">
      <h3>{title}</h3>
      <span>{subTitle}</span>
    </div>
  </Link>
);
