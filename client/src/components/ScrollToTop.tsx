import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  showBelow: number;
}

const ScrollToTop = ({ showBelow }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events with requestAnimationFrame throttling and passive listener for performance
  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const checkScrollHeight = () => {
      try {
        if (!showBelow) return;

        const docEl = document.documentElement;
        const scrollHeight = docEl.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Calculate scroll progress percentage as integer to avoid sub-pixel re-render spam
        const maxScroll = scrollHeight - windowHeight;
        const progress = maxScroll > 0 ? Math.min(Math.round((scrollY / maxScroll) * 100), 100) : 0;
        setScrollProgress(prev => (prev !== progress ? progress : prev));

        // Functional state update avoids re-subscribing scroll listener on visibility toggle
        const shouldBeVisible = scrollY > showBelow;
        setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));
      } finally {
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(checkScrollHeight);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkScrollHeight();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [showBelow]);

  // Scroll to top when clicking the button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`
            fixed bottom-12 right-6 z-40 bg-purple-600 text-white p-3 rounded-full 
            shadow-lg transition-all duration-300 hover:bg-purple-700 hover-float 
            scroll-to-top-button focus:outline-none focus:ring-2 focus:ring-purple-400 
            focus:ring-opacity-50
          `}
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;