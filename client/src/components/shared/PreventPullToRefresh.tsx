import { useEffect } from 'react';

const PreventPullToRefresh = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  useEffect(() => {
    if (!enabled) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1 || window.scrollY === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [enabled]);

  return <>{children}</>;
};

export default PreventPullToRefresh;
