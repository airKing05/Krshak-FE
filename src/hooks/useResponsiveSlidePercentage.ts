import { useEffect, useState } from "react";

/**
 * Hook to return responsive slide percentage for centerMode carousels.
 * You can use it with react-responsive-carousel or similar libs.
 */
export const useResponsiveSlidePercentage = (): number => {
  const [slidePercentage, setSlidePercentage] = useState<number>(35); // default for mobile

  useEffect(() => {
    const updatePercentage = (): void => {
      const width = window.innerWidth;

      if (width < 340 ) {
        // small 
        setSlidePercentage(40);
      } else if (width < 576) {
        // Mobile
        setSlidePercentage(35);
      } else if (width >= 576 && width < 992) {
        // Tablet
        setSlidePercentage(25);
      } else if (width >= 992 && width < 1200) {
        // Laptop
        setSlidePercentage(20);
      } else {
        // Large Desktop
        setSlidePercentage(16.66);
      }
    };

    updatePercentage(); // initial call
    window.addEventListener("resize", updatePercentage);
    return () => window.removeEventListener("resize", updatePercentage);
  }, []);

  return slidePercentage;
};
