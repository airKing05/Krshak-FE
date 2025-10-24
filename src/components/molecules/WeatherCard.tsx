import Text from "../atoms/Text";

interface WeatherCardProps {
  day: string;
  icon: string;
  rainChance: string;
  rainAmount: string;
}

export default function WeatherCard({
  day,
  icon,
  rainChance,
  rainAmount
}: WeatherCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-2 bg-white rounded-lg shadow-md w-32 min-w-min flex-shrink-0">
      <Text
        variant="h3"
        className="text-lg font-semibold text-gray-900 truncate"
      >
        {day}
      </Text>
      <Text variant="h4">{icon}</Text>
      <Text className="text-sm font-semibold text-gray-900 truncate">
        {rainChance}
      </Text>
      <Text className="text-sm text-gray-900 truncate">
        {rainAmount}
      </Text>
    </div>
  );
}
