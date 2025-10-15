// components/HourlyForecastCarousel.tsx

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getRainEmoji } from "../../utils/common";
import { useResponsiveSlidePercentage } from "../../hooks/useResponsiveSlidePercentage";

type Props = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };
};

const HourlyForecastCarousel: React.FC<Props> = ({ hourly }) => {
  const slidePercentage = useResponsiveSlidePercentage();

  const hourlyItems = hourly.time.slice(0, 24).map((time: string, idx: number) => {
    const hour = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const temp = hourly.temperature_2m[idx];
    const rain = hourly.precipitation_probability[idx];

    return (
      <div
        key={idx}
        className="bg-white border border-gray-200 shadow-sm rounded-xl py-4 px-0 w-full max-w-[110px] mx-auto"
      >
        <div className="text-sm text-gray-500 text-center">{hour}</div>
        <div className="text-xl font-semibold text-gray-800 mt-1 text-center">
          🌡️ {temp}°C
        </div>
        <div className="text-sm text-blue-600 mt-1 text-center">
          {getRainEmoji(rain)} {rain}% rain
        </div>
      </div>
    );
  });

  return (
    <div className="mt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Hourly Forecast
      </h3>

      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={2500}
        transitionTime={600}
        stopOnHover
        swipeable
        emulateTouch
        centerMode
        centerSlidePercentage={slidePercentage}
        className="w-full"
      >
        {hourlyItems}
      </Carousel>
    </div>
  );
};

export default HourlyForecastCarousel;
