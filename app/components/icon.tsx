import {
  SunIcon,
  MoonIcon,
  LocationMarkerIcon,
  AcademicCapIcon,
  OfficeBuildingIcon,
  AtSymbolIcon,
  CodeIcon,
  ExternalLinkIcon,
  DownloadIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/outline";

import type { FC, ElementType } from "react";

export enum IconName {
  Sun,
  Moon,
  Place,
  School,
  Office,
  Email,
  Code,
  ExternalLink,
  Download,
  Pencil,
  Add,
}

type IconSize = "sm" | "lg";

interface Props {
  as: IconName;
  size?: IconSize;
  className?: string;
  [rest: string]: any;
}

const iconMap: { [key in IconName]: ElementType } = {
  [IconName.Sun]: SunIcon,
  [IconName.Moon]: MoonIcon,
  [IconName.Place]: LocationMarkerIcon,
  [IconName.School]: AcademicCapIcon,
  [IconName.Office]: OfficeBuildingIcon,
  [IconName.Email]: AtSymbolIcon,
  [IconName.Code]: CodeIcon,
  [IconName.ExternalLink]: ExternalLinkIcon,
  [IconName.Download]: DownloadIcon,
  [IconName.Pencil]: PencilIcon,
  [IconName.Add]: PlusIcon,
};

const iconSize: { [key in IconSize]: string } = {
  sm: "w-8",
  lg: "w-10",
};

const classes = "text-gray-800 dark:text-gray-50";

const Icon: FC<Props> = ({ as, size = "sm", className, ...rest }) => {
  if (!(as in iconMap)) return null;

  const Component = iconMap[as];
  let componentClassNames = `${iconSize[size]} ${classes}`;
  if (className) componentClassNames += ` ${className}`;
  return <Component className={componentClassNames} {...rest} />;
};

export default Icon;
