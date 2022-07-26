import { Link } from "@remix-run/react";
import Image from "./image";

interface Props {
  to: string;
  imagePath: string;
  alt: string;
  title: string;
  subTitle: string;
}

// Extra card styles are applied as tailwindcss custom components
// found in styles/custom.js
const Card: React.FC<Props> = ({ to, imagePath, alt, title, subTitle }) => (
  <Link to={to} className="card flex flex-col max-w-[450px]">
    <Image
      path={imagePath}
      alt={alt}
      transformations={{
        crop: true,
        width: "450",
        height: "450",
      }}
      className="card-img bg-gray-200 border-2 border-gray-200 rounded"
      width="450"
      height="450"
    />
    <div className="card-body flex flex-col p-1 space-y-1 border-2 border-transparent">
      <h3>{title}</h3>
      <span>{subTitle}</span>
    </div>
  </Link>
);

export default Card;
