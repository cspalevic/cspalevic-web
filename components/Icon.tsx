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
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@heroicons/react/outline";
import React from "react";

const iconMap = {
  sun: SunIcon,
  moon: MoonIcon,
  place: LocationMarkerIcon,
  school: AcademicCapIcon,
  office: OfficeBuildingIcon,
  email: AtSymbolIcon,
  code: CodeIcon,
  link: ExternalLinkIcon,
  download: DownloadIcon,
  pencil: PencilIcon,
  add: PlusIcon,
  close: XIcon,
  zoomIn: ZoomInIcon,
  zoomOut: ZoomOutIcon,
};

const iconSize = {
  sm: "w-8",
  lg: "w-10",
};

export type IconType = keyof typeof iconMap;
export type IconSize = keyof typeof iconSize;

type IconProps = {
  type: IconType;
  size?: IconSize;
  className?: string;
  [rest: string]: any;
};

const classes = "text-gray-800 dark:text-gray-50";

export const Icon = ({ type, size = "sm", className, ...rest }: IconProps) => {
  if (!(type in iconMap)) return null;

  const Component = iconMap[type];
  let componentClassNames = `${iconSize[size]} ${classes}`;
  if (className) componentClassNames += ` ${className}`;
  return <Component className={componentClassNames} {...rest} />;
};
