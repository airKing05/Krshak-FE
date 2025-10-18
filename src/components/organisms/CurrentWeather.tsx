import Text from "../atoms/Text";

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
  const bgClass = getWeatherBackground(current.precipitation);

  return (
    <div className={`p-6 ${bgClass}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Text variant="h5">🌡️ Temp: {current.temperature}°C</Text>
        <Text variant="h5">💨 Wind: {current.windspeed} km/h</Text>
        {/* <div>💧 Humidity: {current.humidity_2m}%</div> */}
        <Text variant="h5">☁️ Fog: {current.fog ? 'Yes' : 'No'}</Text>
        <Text variant="h5">🌧️ Rain: {current.precipitation} mm</Text>
        <Text variant="h5">🌨️ Snow: {current.snowfall} mm</Text>
        <Text variant="h5">🌅 Sunrise: {daily.sunrise[0].split('T')[1]}</Text>
        <Text variant="h5">🌄 Sunset: {daily.sunset[0].split('T')[1]}</Text>
      </div>
    </div>
  );
};

export default CurrentWeather;
