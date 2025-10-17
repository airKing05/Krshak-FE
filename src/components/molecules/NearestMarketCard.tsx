import { useEffect, useState } from "react";
import Card from "./Card";
import { getTodayDailyRainSummary } from "../../services/weather";
import { getRainEmoji } from "../../utils/common";
import Text from "../atoms/Text";

interface NearestMarketCardProps {
  imageUrl?: string | undefined;
  title: string;
  city: string;
  distance?: string;
  handleClick?: () => void;
  latitude: number;
  longitude: number;
}

export default function NearestMarketCard({
  title,
  city,
  distance,
  handleClick,
  latitude,
  longitude
}: NearestMarketCardProps) {
    const [rainInfo, setRainInfo] = useState('')
  useEffect(() => {
    if (latitude && longitude) {
      async function fetchHourlyRain() {
        const data = await getTodayDailyRainSummary(latitude, longitude);
        const info = `Possibility of rain - ${getRainEmoji(data?.avgPrecipitationProbability)} ${
          data?.avgPrecipitationProbability
        }%`;
        setRainInfo(info)
      }
      fetchHourlyRain();
    }
  }, [latitude, longitude]);

  const bgCard = () => {
    return <div className="w-48 h-24 max-w-48 rounded-md bg-amber-100 flex justify-center items-center">
      <Text className="capitalize">{city}</Text>
    </div>
  }
  return (
    <Card
      title={title}
      subtitle={distance}
      handleClick={handleClick}
      info={rainInfo}
      bgCard={bgCard}
    />
  );
}
