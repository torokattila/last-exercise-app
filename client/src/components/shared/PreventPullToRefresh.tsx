import { useEffect } from "react";

const PreventPullToRefresh = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;

      // Prevent pull-to-refresh when scrolling up from the very top
      if (window.scrollY === 0 && currentY > touchStartY) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <>{children}</>;
};

export default PreventPullToRefresh;
