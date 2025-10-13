import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getRainEmoji } from "../../utils/common";

type Props = {
  hourly: any;
};

const HourlyForecastCarousel = ({ hourly }: Props) => {
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
        className="bg-white border border-gray-200 shadow rounded-xl p-4 w-full max-w-[160px] mx-auto"
      >
        <div className="text-sm text-gray-500">{hour}</div>
        <div className="text-2xl font-semibold text-gray-800 mt-1">
          🌡️ {temp}°C
        </div>
        <div className="text-sm text-blue-600 mt-1">{getRainEmoji(rain)} {rain}% rain</div>
      </div>
    );
  });

  return (
    <div className="mt-8 px-4 md:px-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Hourly Forecast
      </h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={2500}
        transitionTime={600}
        stopOnHover={true}
        swipeable
        emulateTouch
        centerMode
        centerSlidePercentage={30}
        className="w-full"
      >
        {hourlyItems}
      </Carousel>
    </div>
  );
};

export default HourlyForecastCarousel;
