"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type MilestoneCardProps = {
  lottie?: string;
  emoji?: string;
  image?: string;
  date?: string;
  title?: string;
  description?: string;
};

function MilestoneIcon({
  lottie,
  emoji,
  image,
  title,
}: Pick<MilestoneCardProps, "lottie" | "emoji" | "image" | "title">) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!lottie) return;
    fetch(lottie)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [lottie]);

  if (image) {
    return (
      <div className="w-28 h-28 rounded-2xl overflow-hidden mb-6 shadow-lg">
        <Image
          src={image}
          alt={title ?? ""}
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (lottie && animationData) {
    return (
      <div className="w-32 h-32 mb-6">
        <Lottie animationData={animationData} loop autoplay />
      </div>
    );
  }

  if (emoji) {
    return (
      <span className="text-[6rem] leading-none mb-6 animate-bounce-slow block">
        {emoji}
      </span>
    );
  }

  return null;
}

export function MilestoneCard({
  lottie,
  emoji,
  image,
  date,
  title,
  description,
}: MilestoneCardProps) {
  return (
    <>
      <MilestoneIcon lottie={lottie} emoji={emoji} image={image} title={title} />
      {date && (
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
          {date}
        </span>
      )}
      {title && (
        <h3 className="text-2xl font-bold text-white mb-3 max-w-xl">{title}</h3>
      )}
      {description && (
        <p className="text-zinc-400 max-w-lg leading-relaxed">{description}</p>
      )}
    </>
  );
}
