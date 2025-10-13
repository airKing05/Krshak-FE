// pages/WeatherPage.tsx
import { useEffect, useState } from 'react';
import { getWeatherData } from '../services/weather';
import CurrentWeather from '../components/organisms/CurrentWeather';
import HourlyForecastCarousel from '../components/organisms/HourlyForecastCarousel';
import DailyForecastAccordion from '../components/organisms/DailyForecastAccordion';

const WeatherPage = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 40.7128;
        const lng = -74.0060;
        const data = await getWeatherData(lat, lng);

        // Find current hour index in hourly data
        const now = new Date();
        const currentHour = now.toISOString().slice(0, 13); // 'YYYY-MM-DDTHH'
        const index = data.hourly.time.findIndex((t: string) => t.startsWith(currentHour));

        // Safeguard fallback
        const idx = index !== -1 ? index : 0;

        console.log("index",currentHour, index, idx)

        const extendedCurrent = {
          time: data.current_weather.time,
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          weathercode: data.current_weather.weathercode,
          humidity: data.hourly.relative_humidity_2m[idx],
        //   fog: data.hourly.fog[idx],
          precipitation: data.hourly.precipitation[idx],
          snowfall: data.hourly.snowfall[idx],
          precipitation_probability: data.hourly.precipitation_probability[idx],
        };

        console.log("extendedCurrent", extendedCurrent)


        setWeather({
          current: extendedCurrent,
          hourly: data.hourly,
          daily: data.daily,
        });

      } catch (error) {
        console.error(error);
      }
    }

    fetchWeather();
  }, []);

  console.log("weather", weather)

  if (!weather) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <CurrentWeather current={weather.current} daily={weather.daily} />
      <HourlyForecastCarousel hourly={weather.hourly} />
      <DailyForecastAccordion daily={weather.daily} />
    </div>
  );
};

export default WeatherPage;
