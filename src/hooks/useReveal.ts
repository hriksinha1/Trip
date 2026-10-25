import { useEffect } from "react";
import gsap from "gsap";

export const useReveal = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Strict reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observedSet = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const observeNewElements = () => {
      const candidates = document.querySelectorAll<HTMLElement>("section h2, article");
      candidates.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial query
    observeNewElements();

    // Mutation observer so elements added or re-rendered later (e.g. filtered destinations) are revealed
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
