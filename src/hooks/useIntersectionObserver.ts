import { RefObject, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(): [
  ref: RefObject<T>,
  isIntersecting: boolean
] => {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    const storedRef = ref.current;

    return () => {
      if (!storedRef) return;
      observer.unobserve(storedRef);
    };
  }, [ref]);

  return [ref, isIntersecting];
};
