import { useEffect } from "react";
import gsap from "gsap";

export const useReveal = () => {
  useEffect(() => {
    // Respect user's reduced motion preference
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Subtle entrance reveals for sections and titles
    const elementsToReveal = document.querySelectorAll<HTMLElement>("section h2, article");

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
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elementsToReveal.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
