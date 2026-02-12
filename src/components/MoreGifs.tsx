"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import type { Gif, GifsResult } from "@/types/Gif";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { GifPreview } from "@/components/GifPreview";
import { Loading } from "./Loeding";
import { toast } from "sonner";

export const MoreGifs = ({
  searchTerm,
  initialResult,
  onMoreGifs,
}: {
  searchTerm?: string;
  initialResult: GifsResult;
  onMoreGifs: (next?: string) => Promise<GifsResult>;
}) => {
  const [next, setNext] = useState<string | undefined>(initialResult.next);
  const onLoadMoreRef = useRef<() => void>(null);
  const [intersectionRef, isIntersecting] =
    useIntersectionObserver<HTMLDivElement>();

  const [gifs, onLoadMore, isPending] = useActionState<Gif[]>(
    async (previousState) => {
      try {
        const newGifsResult = await onMoreGifs(next);

        setNext(newGifsResult.next);
        return [...previousState, ...newGifsResult.gifs];
      } catch {
        toast.error("Failed to load more!", {
          description: "No more GIFs could be loaded",
          duration: 300000,
          action: {
            label: "Try again",
            onClick: () => onLoadMoreRef.current?.(),
          },
        });

        return previousState;
      }
    },
    [],
  );

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const handleIntersection = useEffectEvent(
    (interSectionTriggered: boolean) => {
      if (!interSectionTriggered || !isIntersecting || isPending || !next)
        return;

      startTransition(onLoadMore);
    },
  );

  useEffect(() => {
    handleIntersection(isIntersecting);
  }, [isIntersecting]);

  return (
    <>
      {gifs.map((gif, index) => (
        <GifPreview
          key={`${gif.id}-${index}`}
          gif={gif}
          searchTerm={searchTerm}
        />
      ))}
      <div ref={intersectionRef} className="flex justify-center w-full p-8">
        <Loading isLoading={isPending} />
      </div>
    </>
  );
};
