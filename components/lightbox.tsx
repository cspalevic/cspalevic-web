"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "cnfast";
import { RotateCcwIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

type LightboxProps = React.ComponentProps<typeof Image>;

function LightboxImage({ src, alt, ...props }: LightboxProps) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <>
      <div className="z-10 absolute top-8 right-8 flex items-center gap-1 bg-background/90 rounded-md">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Zoom out"
          onClick={() => zoomOut()}
        >
          <ZoomOutIcon className="size-6" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Zoom in"
          onClick={() => zoomIn()}
        >
          <ZoomInIcon className="size-6" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Reset zoom"
          onClick={() => resetTransform()}
        >
          <RotateCcwIcon className="size-6" />
        </Button>
        <DialogClose asChild>
          <Button variant="ghost" size="icon" aria-label="Close">
            <XIcon className="size-6" />
          </Button>
        </DialogClose>
      </div>

      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", cursor: "zoom-in" }}
        contentStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          {...props}
          className="h-full w-full object-contain"
        />
      </TransformComponent>
    </>
  );
}

export function Lightbox({ src, alt, className, ...props }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className={cn("cursor-pointer", className)}
        {...props}
      />
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(false);
          }
        }}
      >
        <TransformWrapper centerOnInit centerZoomedOut>
          <DialogContent
            showCloseButton={false}
            aria-describedby={undefined}
            className="inset-0 flex h-dvh max-h-none w-full max-w-none translate-none flex-col justify-center overflow-hidden rounded-none border-0 bg-black/95 p-6 shadow-none sm:max-w-none"
          >
            <DialogTitle className="sr-only">
              {alt || "Image preview"}
            </DialogTitle>
            {isOpen && <LightboxImage src={src} alt={alt} {...props} />}
          </DialogContent>
        </TransformWrapper>
      </Dialog>
    </>
  );
}
