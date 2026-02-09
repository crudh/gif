/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const ImageWithPreview = ({
  src,
  previewSrc,
  alt,
  className,
}: {
  src: string;
  previewSrc: string;
  alt?: string;
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    if (imageRef.current.complete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoaded(true);
      return;
    }

    const onLoad = () => {
      setIsLoaded(true);
      imageRef.current?.removeEventListener("load", onLoad);
    };

    imageRef.current.addEventListener("load", onLoad);
  }, []);

  return (
    <>
      <img
        src={previewSrc}
        alt={alt}
        className={cn(className, {
          hidden: isLoaded,
        })}
      />
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(className, {
          hidden: !isLoaded,
        })}
      />
    </>
  );
};
