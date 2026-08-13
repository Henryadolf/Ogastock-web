import { useEffect, useRef } from 'react';

// Ports the original page's single shared IntersectionObserver pattern into
// a per-element hook: each ".reveal" element gets its own ref + observer,
// adds the "in" class once it scrolls into view, then unobserves itself.
// No JS-level prefers-reduced-motion check needed - index.css already
// forces .reveal to render fully visible with no transition under that
// media query, so this hook doesn't need to duplicate that logic.
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
