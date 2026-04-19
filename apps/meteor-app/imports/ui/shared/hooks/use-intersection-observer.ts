import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

type IProps = {
  options?: UseIntersectionObserverOptions;
  callback: (isIntersecting: boolean) => void;
};

export function useIntersectionObserver({
  options = {
    threshold: 0,
    root: null,
    rootMargin: "0px",
    freezeOnceVisible: true,
  },
  callback,
}: IProps): React.RefObject<HTMLDivElement> {
  const { threshold, root, rootMargin, freezeOnceVisible } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (freezeOnceVisible && frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        callback(isIntersecting);

        if (isIntersecting && freezeOnceVisible) {
          frozen.current = true;
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return elementRef;
}
