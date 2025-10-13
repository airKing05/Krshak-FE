// components/CurrentWeather.tsx
type Props = {
  current: any;
  daily: any;
};

const getWeatherBackground = (code: number) => {
  if (code < 3) return 'bg-gradient-to-r from-sky-200 to-sky-400';
  if (code < 50) return 'bg-gray-200';
  if (code < 80) return 'bg-gray-400';
  return 'bg-blue-900 text-white';
};

const CurrentWeather = ({ current, daily }: Props) => {
  console.log("current, daily", current, daily)
  const bgClass = '' //getWeatherBackground(current.weathercode);

  return (
    <div className={`p-6 rounded-md ${bgClass}`}>
      <div className="text-xl font-bold mb-2">Current Weather</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>🌡️ Temp: {current.temperature}°C</div>
        <div>💨 Wind: {current.windspeed} km/h</div>
        <div>💧 Humidity: {current.humidity_2m}%</div>
        <div>☁️ Fog: {current.fog ? 'Yes' : 'No'}</div>
        <div>🌧️ Rain: {current.precipitation} mm</div>
        <div>🌨️ Snow: {current.snowfall} mm</div>
        <div>🌅 Sunrise: {daily.sunrise[0].split('T')[1]}</div>
        <div>🌄 Sunset: {daily.sunset[0].split('T')[1]}</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
