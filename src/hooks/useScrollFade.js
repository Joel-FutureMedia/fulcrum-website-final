import { useEffect } from 'react';

export function useScrollFade(activePage) {
  useEffect(() => {
    function updateFades() {
      const vh = window.innerHeight;
      const sections = document.querySelectorAll('.page.active #hero, .page.active .section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distFromCenter = Math.abs(sectionCenter - vh / 2);
        const opacity = Math.max(0, Math.min(1, 1 - (distFromCenter - vh * 0.25) / (vh * 0.4)));
        section.style.opacity = opacity;
      });
    }

    window.addEventListener('scroll', updateFades, { passive: true });
    updateFades();

    return () => window.removeEventListener('scroll', updateFades);
  }, [activePage]);
}
