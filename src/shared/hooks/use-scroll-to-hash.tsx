import { useEffect } from "react";
import { useLocation } from "react-router";

export function useScrollToHash(
  delay = 0,
  behavior: ScrollBehavior = "smooth"
) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scroll = () => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior });
        }
      };

      if (delay > 0) {
        const timer = setTimeout(scroll, delay);
        return () => clearTimeout(timer);
      } else {
        scroll();
      }
    }
  }, [location, delay, behavior]);
}
