import { useEffect, useState } from "react";
import Card from "./Card";
import { getTodayDailyRainSummary } from "../../services/weather";
import { getRainEmoji } from "../../utils/common";

interface NearestMarketCardProps {
  imageUrl?: string | undefined;
  title: string;
  distance?: string;
  handleClick?: () => void;
  latitude: number;
  longitude: number;
}

export default function NearestMarketCard({
  imageUrl,
  title,
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
        const info = `Average possibility of rain - ${getRainEmoji(data?.avgPrecipitationProbability)} ${
          data?.avgPrecipitationProbability
        }%`;
        setRainInfo(info)
      }
      fetchHourlyRain();
    }
  }, [latitude, longitude]);
  return (
    <Card
      title={title}
      subtitle={distance}
      imageUrl={imageUrl}
      handleClick={handleClick}
      info={rainInfo}
    />
  );
}
